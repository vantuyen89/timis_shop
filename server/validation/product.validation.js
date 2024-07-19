import Joi from "joi";


export const categoryValidate = Joi.object({
    name: Joi.string().required().messages(),
    imageUrl: Joi.string().required().messages(),
    description: Joi.string().required().messages()
})


export const sizeValidate = Joi.object({
    name: Joi.string().required().messages(),
})


export const colorValidate = Joi.object({
    name: Joi.string().required().messages(),
    code: Joi.string().required().messages()
})


export const productValidate = Joi.object({
    name: Joi.string().required().messages(),
    category: Joi.string().required().messages(),
    price: Joi.number().required().messages(),
    description: Joi.string().required().messages(),
    thumbnail:Joi.string().required().messages(),
    images: Joi.array().items(Joi.string().required().messages()).required().messages(),
    featured:Joi.boolean().messages(),
    variants: Joi.array().items(Joi.object().required().messages()).required().messages(),
    discount: Joi.number().required().messages(),
    countInstock: Joi.number().required().messages(),
    quantity: Joi.number().required().messages(),
    
})