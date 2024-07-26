import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";


export const createOrder = async (req, res) => {
    try {
        const { items, totalPrice, customInfor } = req.body;
        const order = await Order.create({user:req.user._id, items, totalPrice, customInfor });
        const cart = await Cart.updateOne({user: req.user._id }, { items: [] })
        // cart.save()
        res.status(StatusCodes.CREATED).json({ data: order })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}


export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await Order.findOne({ _id: orderId }).populate("user").populate("items.color").populate("items.size")
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" })
        }
        return res.status(StatusCodes.OK).json({ data: order })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

export const getOrderByUserId = async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id })
        if (order.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" })
        }
        return res.status(StatusCodes.OK).json({ data: order })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findByIdAndUpdate({ _id: orderId }, {status:status }, { new: true });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
        }
        return res.status(StatusCodes.OK).json({ data: order });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
}

export const getOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.find({ user: req.user._id, status: status }).populate("items.color").populate("items.size");
        // if (order.length === 0) {
        //     return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
        // }
        return res.status(StatusCodes.OK).json({ data: order });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
}

export const getOrderAdminStatus = async (req, res) => {
    try {
        const {status} = req.body
        const order = await Order.find({ status: status }).sort({ createdAt: -1 }).populate("items.color").populate("items.size");
        return res.status(StatusCodes.OK).json({ data: order });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });   
    }
}





