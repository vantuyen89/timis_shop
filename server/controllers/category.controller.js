
import Category from "../models/category.model.js";
import { StatusCodes } from "http-status-codes"
// import Product from "../models/product.schema.js";
import slugify from "slugify"
import { categoryValidate } from "../validation/product.validation.js";
export const createCategory = async (req, res) => {
    try {
        const { error } = categoryValidate.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(item => item.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errors })
        }
        const category = await Category.create({ ...req.body, slug: slugify(req.body.name) });
        res.status(StatusCodes.CREATED).json({ message: "Category created successfully", data: category })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}
export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find({});
        if (category.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json(category)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

// export const getProductById1 = async (req,res)=>{
//     try {
//         const category = await Category.findOne({slug:req.params.slug});
//         if (!category) {
//             return  res.status(StatusCodes.NOT_FOUND).json({message:"Category not found"})
//         }
//         res.status(StatusCodes.OK).json({message:"Category get successfully",data:category})
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error})
//     }
// }
// export const getCategoryById = async (req, res) => {
//     try {
//         const product = await Product.find({ category: req.params.id })
//         const category = await Category.findById(req.params.id);
//         if (!category) {
//             return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" })
//         }
//         res.status(StatusCodes.OK).json({ category, product })
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
//     }
// }
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" })
        }
        res.status(StatusCodes.OK).json({ message: "Category delete successfully", data: category })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" })
        }
        res.status(StatusCodes.OK).json({ message: "Category update successfully", data: category })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

