import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true,
    versionKey: false,
})

const Color = mongoose.model('Color', ColorSchema);
export default Color;