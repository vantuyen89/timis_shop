import Auth from "../models/auth.model.js";
import { LoginValidate, authValidate } from "../validation/auth.validation.js";
import { StatusCodes } from "http-status-codes"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import RefreshToken from "../models/refreshTooken.model.js";
export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        console.log(req.body);
        const { error } = authValidate.validate(req.body, {
            abortEarly: false
        })
        if (error) {
            const errors = error.details.map(item => item.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errors })
        }
        const existEmail = await Auth.findOne({ email });
        if (existEmail) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email đã tồn tại" })
        }
        const hashPassword = await bcryptjs.hash(password, 10)
        const is_admin = await Auth.countDocuments({}) === 0 ? true : false

        const newUser = await Auth.create({ ...req.body, password: hashPassword, is_admin })
        res.status(StatusCodes.CREATED).json({ message: "Đăng ký thành công", data: newUser })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

}
const generateAccessToken = async (value) => {
    return jwt.sign(value, process.env.SECRET_ACCESSTOKEN, {
        expiresIn: "1h"
    })
}

const generateRefereshToken = async (value) => {
    return jwt.sign(value, process.env.SECRET_REFRESHTOKEN, {
        expiresIn: "1d"
    })
}
//     async generateRefreshToken(value) {
//     return jwt.sign(value, process.env.SECRET_REFRESHTOKEN, {
//         expiresIn: "1d"
//     })
// }
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = LoginValidate.validate(req.body, {
            abortEarly: false
        })
        if (error) {
            const errors = error.details.map(item => item.message)
            return res.status(StatusCodes.BAD_REQUEST).json(errors)
        }
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email không tồn tại" })
        }
        const checkPassword = await bcryptjs.compare(password, user.password)
        if (!checkPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Mật khẩu không đúng" })
        }
        const accessToken = await generateAccessToken({
            _id: user._id,
            username: user.username,
            email: user.email,
            is_admin: user.isAdmin
        })
        const refreshToken = await generateRefereshToken({
            _id: user._id,
            username: user.username,
            email: user.email,
            is_admin: user.isAdmin
        })
        // const existingRefreshToken = await RefreshToken.findOne({
        //     user: user._id
        // })
        // if (!existingRefreshToken) {
        //     await RefreshToken.create({
        //         user: user._id,
        //         token: refreshToken
        //     })
        // } else {
        //     await RefreshToken.findOneAndUpdate({
        //         user: user._id,
        //         token: refreshToken
        //     })
        // }
        res.cookie("token", refreshToken, {
            maxAge: 1000 * 60 * 24 * 60,
            httpOnly: true,
            path: "/",
        });
        delete user._doc.password
        // const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1h" })
        return res.status(StatusCodes.OK).json({
            message: "Đăng nhập thành công",
            data: {
                user: user,
                accessToken: accessToken
            }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Bạn chưa đăng nhập" });
        }
        jwt.verify(token, process.env.SECRET_REFRESHTOKEN, async (err, data) => {
            if (err) {
                return res.status(403).json({ message: "Phiên đăng nhập hết hạn mời bạn đăng nhập lại" });
            }
            const user = await Auth.findById(data._id);
            if (!user) {
                return res.status(403).json({ message: "không có ng dùng" });
            }
            const newAccessToken = await generateAccessToken({
                _id: user._id,
                username: user.username,
                email: user.email,
                is_admin: user.isAdmin
            });
            const newRefreshToken = await generateRefereshToken({
                _id: user._id,
                username: user.username,
                email: user.email,
                is_admin: user.isAdmin
            });
            const existingRefreshToken = await RefreshToken.findOneAndUpdate(
                { user: user._id },
                { token: newRefreshToken },
                { upsert: true, new: true }
            );
            res.cookie("token", newRefreshToken, {
                maxAge: 1000 * 60 * 24 * 60,
                httpOnly: true,
                path: "/",
                sameSite: "none",
                secure: true,
            })

            return res.status(StatusCodes.OK).json({
                message: "Phiên đăng nhập đã được cập nhật",
                accessToken: newAccessToken
            })
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message })
    }
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.token;
        console.log(refreshToken);
        if (!refreshToken) {
            return res.status(403).json({ message: "Bạn chưa đăng nhập" });
        }
        jwt.verify(refreshToken, process.env.SECRET_REFRESHTOKEN,
            async (err, data) => {
            if (err) {
                res.cookie("token", "", {
                    maxAge: 0
                })
                return res.status(StatusCodes.OK).json({ message: "Đăng xuất thành công" });
            }
            await RefreshToken.findOneAndDelete({
                user: data._id 
            })
                res.cookie("token", "", {
                    maxAge: 0,
                });
            return res.status(StatusCodes.OK).json({
                message: "Đăng xuất thành công"
            })
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};


export const curentUser = async (req, res) => {
    try {
        const user = req.user;
        const inforUser = await Auth.findOne(user._id).select("-password")

        if (!inforUser) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Không xác định" });

        }
        res.status(StatusCodes.OK).json({ message: "Thông tin người dùng", data: inforUser });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);

    }
}
