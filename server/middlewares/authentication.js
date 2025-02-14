import jwt from "jsonwebtoken"
import Auth from "../models/auth.model.js";

const authentication = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập" });
        }
        jwt.verify(token, process.env.SECRET_ACCESSTOKEN, async (err, data) => {
            if (err) {
                console.log(err.message);
                if (err.message === "invalid token") {
                    return res.status(401).json({ message: "Invalid token" });
                }
                if (err.message === "jwt expired") {
                    return res.status(401).json({ message: "Token expired" });
                }
            }
            const dataUser = await Auth.findById(data._id)
            if (!dataUser) {
                return res.status(401).json({ message: "Tài khoản không tồn tại" });
            }
            if (dataUser?.block === true) {
                return res.status(401).json({ message: "Tài khoản đã bị khóa" });
            }
            console.log("dataUser", dataUser);

            req.user = dataUser
            next()
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi" });

    }
}

export default authentication;