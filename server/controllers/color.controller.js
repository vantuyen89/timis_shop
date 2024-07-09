import { StatusCodes } from "http-status-codes";
import { colorValidate } from "../validation/product.validation.js";
import Color from "../models/color.model.js";



export const createColor = async (req, res) => {
    try {
        const { error } = colorValidate.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(item => item.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errors })
        }
        const colorCheckName = await Color.findOne({ name:req.body.name });
        if (colorCheckName) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Tên màu đã tồn tại" })
        }
        const colorCheckCode = await Color.findOne({ name: req.body.code });
        if (colorCheckCode) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Tên code màu đã tồn tại" })
        }
        const color = await Color.create(req.body);
        res.status(StatusCodes.CREATED).json({ message: "Color created successfully", data: color })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })

    }
}

export const getAllColor = async (req, res) => {
    try {
        const color = await Color.find({});
        if (color.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Color not found" })
        }
        res.status(StatusCodes.OK).json(color)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}


