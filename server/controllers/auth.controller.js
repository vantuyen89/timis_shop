import Auth from "../models/auth.model.js";
import { LoginValidate, authValidate } from "../validation/auth.validation.js";
import { StatusCodes } from "http-status-codes"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
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
        const role = await Auth.countDocuments({}) === 0 ? "admin" : "user"

        const newUser = await Auth.create({ ...req.body, password: hashPassword, role })
        res.status(StatusCodes.CREATED).json({ message: "Đăng ký thành công", data: newUser })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

}

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
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1h" })
        return res.status(StatusCodes.OK).json({ user, token })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Logout failed", error: err });
            } else {
                return res.status(StatusCodes.OK).json({ message: "Logout successful" });
            }
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
