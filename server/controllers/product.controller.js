import { StatusCodes } from "http-status-codes";
import Category from "../models/category.model.js";
import Color from "../models/color.model.js";
import Product from "../models/product.model.js";
import Size from "../models/size.model.js";
import { productValidate } from "../validation/product.validation.js";
import slugify from "slugify";

export const getAllproducts = async (req, res) => {
    try {
        const product = await Product.find({}).populate("variants").populate([{
            path: "variants",
            model: "Variant",
            populate: {
                path: "size",
                model: "Size"
            }
        }]).populate([{
            path: "variants",
            model: "Variant",
            populate: {
                path: "color",
                model: "Color"
            }
        }]).populate("category");
        if (product.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("variants").populate([{
            path: "variants",
            model: "Variant",
            populate: {
                path: "size",
                model: "Size"
            }
        }]).populate([{
            path: "variants",
            model: "Variant",
            populate: {
                path: "color",
                model: "Color"
            }
        }]).populate("category");
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
 }

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, thumbnail, images, discount, countInstock,quantity, featured, slug, variants } = req.body
        const { error } = productValidate.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(item => item.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errors })
        }
        const categoryId = await Category.findOne({ _id: category })
        if (!categoryId) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" })
        }
        const variantArray = await Promise.all(variants.map(async (variant) => {
            const size = await Size.findOne({ _id: variant.size });
            const color = await Color.findOne({ _id: variant.color });
            if (!size || !color) {
                throw new Error('Size or Color not found');
            }

            return {
                size: size._id,
                color: color._id,
                price: variant.priceVar
            };
        }));
        const seen = new Set();
        const uniqueVariants = variantArray.filter(variant => {
            const key = `${variant.size}-${variant.color}`;
            if (seen.has(key)) {
                return false;
            } else {
                seen.add(key);
                return true;
            }
        });
        console.log(uniqueVariants);

        const product = new Product({
            ...req.body,
            category: categoryId._id,
            variants: uniqueVariants,
            slug: slugify(req.body.name)
        });


        console.log("product:", product);
        const productAdd = await Product.create(product);
        res.status(StatusCodes.CREATED).json({ message: "Product created successfully", data: productAdd })

        await product.save();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })

    }
}

// export const getProductfeatured = (req, res) => {
//     try {
//         const product = await Product.find({ featured: true }).populate("variants").populate([{
//             path: "variants",
//             model: "Variant",
//             populate: {
//                 path: "size",
//                 model: "Size"
//             }
//         }]).populate([{
//             path: "variants",
//             model: "Variant",
//             populate: {
//                 path: "color",
//                 model: "Color"
//             }
//         }]).populate("category");
//         if (product.length === 0) {
//             return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
//         }
//         res.status(StatusCodes.OK).json(product)
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
//     }
// }



export const pagingProduct = async (req, res) => {
    try {
        const { pageIndex = 1, pageSize,color,size,price } = req.body;
        let limit = pageSize || 9;
        let skip = (pageIndex - 1) * limit || 0;
        if (color) {
            
        }
        const product = await Product.find()
            .skip(skip)
            .limit(limit)
        const productLength = await Product.countDocuments();
        console.log(productLength);

        const totalPage = productLength === 0 ? 0 : Math.ceil(productLength / limit);
        const totalOptionPage = product.length;
        const totalAllOptions = productLength;
        const result = {
            pageIndex: pageIndex,
            pageSize: limit,
            totalPage,
            totalOptionPage,
            totalAllOptions,
            content: product,
        };

        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}



export const getProductfeatured = async (req, res) => {
    try {
        const { pageSize } = req.body
        let limit = pageSize || 0;
        const product = await Product.find({ featured: false }).limit(limit).sort({
            featured:'asc'
        });
        if (product.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json({ message: "Product found successfully", data: product })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const getProductPrice = async (req, res) => {
    try {
        const { pageSize } = req.body
        let limit = pageSize || 0;
        const product = await Product.find().where('price').gte(200).lte(700).limit(limit).sort({
           price:1
        });
        if (product.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json({ message: "Product found successfully", data: product })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const getProductRelated = async (req, res) => {
    try {
        const { pageSize,categoryId } = req.body
        let limit = pageSize || 0;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" })
        }
        const product = await Product.find({category:categoryId}).limit(limit)
        if (product.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json({ message: "Product found successfully", data: product })
    } catch (error) {
        
    }
}
