import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: "../images/avtDefault.png"
    }
}, {
    timestamps: true,
    versionKey: false
})

const Auth = mongoose.model("Auth", authSchema)

export default Auth;