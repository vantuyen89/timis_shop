import { StatusCodes } from "http-status-codes";
import ProductComing from "../models/productComing.js";
import Product from "../models/product.model.js";

export const postProductComing = async (req, res) => {
    try {
        const { product, date, active } = req.body;

        if (!product) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chưa chọn sản phẩm" })
        if (!date) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chưa nhập ngày đăng sản phẩm" })
        if (typeof active !== "boolean") return res.status(StatusCodes.BAD_REQUEST).json({ message: "Trạng thái phải là boolean" })

        const existingActiveProduct = await ProductComing.findOne({
            active: true
        });
        const finalActiveState = !existingActiveProduct ? true : active;
        if (finalActiveState) {
            await ProductComing.updateMany(
                { _id: { $ne: null } },
                { $set: { active: false } }
            );
        }
        const productComing = await ProductComing.create({
            productId: product,
            comingDate: date,
            active: finalActiveState
        });

        return res.status(StatusCodes.CREATED).json({
            message: "Tạo sản phẩm sắp ra mắt thành công",
            data: productComing
        });

    } catch (error) {
        console.error('Error creating product coming:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Có lỗi xảy ra khi tạo sản phẩm sắp ra mắt",
            error: error.message
        })
    }
}

export const getProductComings = async (req, res) => {
    try {
        const productComing = await ProductComing.findOne({
            active: true
        }).populate(
            "productId"
        )
        if (!productComing) return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy sản phẩm sắp ra mắt hiện tại" })
        return res.status(StatusCodes.OK).json({
            message: "Lấy thông tin sản phẩm sắp ra mắt",
            data: productComing
        })
    } catch (error) {
        console.error('Error getting product coming:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Có lỗi xảy ra khi lấy thông tin sản phẩm sắp ra mắt",
            error: error.message
        })

    }
}

export const getAllProductComings = async (req, res) => {
    try {
        const productComings = await ProductComing.find({}).populate(
            "productId"
        )
        return res.status(StatusCodes.OK).json({
            message: "Lấy tất cả sản phẩm sắp ra mắt",
            data: productComings
        })
    } catch (error) {
        console.error('Error getting all product coming:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Có lỗi xảy ra khi lấy tất cả sản phẩm sắp ra mắt",
            error: error.message
        })
    }
}

export const updateProductComing = async (req, res) => {
    try {
        const { id } = req.params;
        const { product, date, active } = req.body;
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chưa chọn sản phẩm cần cập nhật" })
        if (typeof active !== "boolean") return res.status(StatusCodes.BAD_REQUEST).json({ message: "Trạng thái phải là boolean" })

        if (active === true) {
            await ProductComing.updateMany(
                { _id: { $ne: null } },
                { $set: { active: false } }
            );
        }
        const productComing = await ProductComing.findByIdAndUpdate(
            id,
            { productId: product, comingDate: date, active: active },
            { new: true }
        ).populate("productId");
        return res.status(StatusCodes.OK).json({
            message: "Cập nhật thành công",
            data: productComing
        })
    } catch (error) {
        console.error('Error updating product coming:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Có lỗi xảy ra khi cập nhật sản phẩm sắp ra mắt",
            error: error.message
        })
    }
}

export const getProductComingById = async (req, res) => {
    try {
        const { id } = req.params
        const productComing = await ProductComing.findById(id).populate(
            "productId"
        )
        if (!productComing) return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy sản phẩm sắp ra mắt với id: " + id })
        return res.status(StatusCodes.OK).json({
            message: "Lấy thông tin sản phẩm sắp ra mắt",
            data: productComing
        })

    } catch (error) {
        console.error('Error getting product coming by id:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Có l��i xảy ra khi lấy thông tin sản phẩm sắp ra mắt ",
            error: error.message
        })

    }

}