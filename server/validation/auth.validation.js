import Joi from "joi";


export const authValidate = Joi.object({
    username: Joi.string().min(3).max(100).required().messages({
        "string.min": "Tên đăng nhập quá ngắn",
        "string.max": "Tên đăng nhạp quá dài",
        "any.required": "Trường username là bắt buộc",
        "string.empty": "Trường username không được để trống"
    }),
    password: Joi.string().min(6).max(50).required().messages({
        "string.min": "Password quá ngắn",
        "string.max": "Password quá dài",
        "any.required": "Password là bắt buộc",
        "string.empty": "Password không được để trống"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng",
        "any.required": "Email là bắt buộc"
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.required": "Xác nhận mật khẩu là bắt buộc",
        "string.empty": "Xác nhận mật khẩu không được để trống",
        "any.only": "Xác nhận mật khẩu không đúng",
    }),
    avatar: Joi.string().uri().messages({
        "string.uri": "Avatar không đúng định dạng",
    })
})

export const LoginValidate = Joi.object({
    password: Joi.string().min(6).max(50).required().messages({
        "string.min": "Password quá ngắn",
        "string.max": "Password quá dài",
        "any.required": "Password là bắt buộc",
        "string.empty": "Password không được để trống"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng",
        "any.required": "Email là bắt buộc"
    }),
})


export const socialUserValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Bạn chưa nhập email",
        "string.email": "Email không đúng định dạng",
    }),
    first_name: Joi.string().required().messages({
        "any.required": "Bạn chưa nhập họ ",
    }),
    last_name: Joi.string().required().messages({
        "any.required": "Bạn chưa nhập tên",
    }),
    full_name: Joi.string().required().messages({
        "any.required": "Bạn chưa nhập họ tên",
    }),
    picture: Joi.string().required().messages({
        "any.required": "Bạn chưa nhập ảnh",
    }),
    uid: Joi.string().required().messages({
        "any.required": "Bạn chưa nhập uuid",
    }),
    provider: Joi.string().required().messages({
        "any.required": "Bạn chưa nhập loại đăng nhập",
    }),
});

