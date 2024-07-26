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
        const { name, description, price, category, thumbnail, images, discount, countInstock, quantity, featured, slug, variants } = req.body
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
        const productAdd = await Product.create(product);
        res.status(StatusCodes.CREATED).json({ message: "Product created successfully", data: productAdd })
        await product.save();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        console.log('params', req.params._id);
        const { name, description, price, category, thumbnail, images, discount, countInstock, quantity, featured, slug, variants } = req.body
        console.log("reqbody", req.body);
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
            console.log("Variant", variant);
            console.log('priceVar', variant.priceVar);
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
        // console.log(variantArray);
        // return
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
        // console.log('unique',uniqueVariants);
        // return
        const product = ({
            ...req.body,
            category: categoryId._id,
            variants: uniqueVariants,
            slug: slugify(req.body.name)
        });
        console.log('Id Product', req.params.id);
        const productUpdate = await Product.findByIdAndUpdate(req.params.id, product, { new: true });
        if (!productUpdate) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })  // Product not found in database
        }
        res.status(StatusCodes.OK).json({ message: "Product update successfully", data: productUpdate })

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
        const { pageIndex = 1, pageSize, color, size, price } = req.body;
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
            featured: 'asc'
        }).populate("variants.color").populate("category").populate("variants.size");
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
            price: 1
        }).populate("variants.color").populate("category").populate("variants.size");
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
        const { pageSize, categoryId, idProduct } = req.body
        let limit = pageSize || 0;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" })
        }
        const product = await Product.find({ category: categoryId }).limit(limit).populate("variants.color").populate("category").populate("variants.size")
        const productRelated = product.filter((item) => {
            return (item._id.toString() !== idProduct.toString())
        })
        if (product.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json({ message: "Product found successfully", data: productRelated })
    } catch (error) {


    }
}


export const sortPagingProduct = async (req, res) => {
    try {
        const search = req.body.search
        const pageSize = req.body.pageSize
        const pageIndex = req.body.pageIndex || 1
        const color = req.body.color
        const size = req.body.size
        const priceMin = req.body.priceMin
        const priceMax = req.body.priceMax
        const sort = +req.body.sort || 1
        const category = req.body.category
        const data = {}
        if (search) {
            data.name = { '$regex': search, '$options': 'i' }
        }
        if (color) {
            data.variants = { '$elemMatch': { 'color': color } }
        }
        if (size || color) {
            if (size && color) {
                data.variants = {
                    '$elemMatch': {
                        'size': size,
                        'color': color
                    }
                };
            } else if (size) {
                data.variants = { '$elemMatch': { 'size': size } }
            } else if (color) {
                data.variants = { '$elemMatch': { 'color': color } }
            }
        }
        if (priceMin && priceMax) {
            data.price = { '$gte': priceMin, '$lte': priceMax }
        }

        // if (sort = 'asc') {
        //     sort = { price: 1 }
        // } else if (sort = 'desc') {
        //     sort = { price: -1 }
        // }

        if (category) {
            data.category = category
        }

        let limit = pageSize || 9
        let skip = (pageIndex - 1) * limit || 0
        const product = await Product.find(data).sort({ price: sort }).skip(skip).limit(limit).populate("variants.color").populate("category").populate("variants.size")
        const productLength = await Product.countDocuments(data);
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
        }
        return res.status(StatusCodes.OK).json(result);

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });

    }

}

export const getProductPriceMax = async (req, res) => {
    try {
        const product = await Product.find().sort({ price: -1 }).limit(1).populate("variants.color").populate("category").populate("variants.size");
        if (product.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json({ message: "Product found successfully", data: product[0].price })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }

}