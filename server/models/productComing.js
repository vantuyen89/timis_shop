import mongoose from "mongoose";

const ProductComingSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    comingDate: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

const ProductComing = mongoose.model("ProductComing", ProductComingSchema); // Sửa tên mô hình

export default ProductComing;