import { StatusCodes } from "http-status-codes";
import Size from "../models/size.model.js";
import { sizeValidate } from "../validation/product.validation.js";



export const createSize = async (req, res) => {
    try {
        const { error } = sizeValidate.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(item => item.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errors })
        }
        const sizeCheck = await Size.findOne({ name: req.body.name });
        if (sizeCheck) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Tên size đã tồn tại" })
        }
        const size = await Size.create(req.body);
        res.status(StatusCodes.CREATED).json({ message: "Size created successfully", data: size })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
        
    }
}

export const getAllSize = async (req, res) => {
    try {
        const size = await Size.find({});
        if (size.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(StatusCodes.OK).json(size)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}


