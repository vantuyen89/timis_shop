import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiveId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
   
}, {
    timestamps: true
})

const Message = mongoose.model('Message', MessageSchema)
export default Message