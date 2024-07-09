import mongoose, { Schema } from "mongoose";


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true,
    versionKey: false,
})


const Category = mongoose.model('Category', CategorySchema)

export default Category;