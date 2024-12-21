import { StatusCodes } from "http-status-codes";
import Comment from "../models/comments.model"
import { commentValidate } from "../validation/product.validation";


export const postComment = async (req, res) => {
    try {
        const { productId } = req.params.id
        const user = req.user
        const { error } = commentValidate.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(item => item.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errors })
        }
        const data = await Comment.create(req.body)
        return res.status(StatusCodes.CREATED).json({ message: "Comment created successfully", data })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })

    }
}