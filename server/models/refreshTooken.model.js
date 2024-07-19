import mongoose from "mongoose";


const RefresheSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
        unique: true
    }
}, {
    timestamps:true
})

const RefreshToken = mongoose.model("RefreshToken", RefresheSchema)
export default RefreshToken