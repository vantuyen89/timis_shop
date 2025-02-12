import mongoose from "mongoose";

const Variant = new mongoose.Schema({
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
        required: true
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
})

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true,
    },
    countInstock: {
        type: Number,
        required: true,
    },
    images: [
        {
            url: String,
        },
    ],
    featured: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    variants: [Variant]
}, {
    timestamps: true,
    versionKey: false
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;