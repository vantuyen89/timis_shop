import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import vnpay from "../payment/vnpay.js";
import { ProductCode, VnpLocale } from "vnpay";


export const createOrder = async (req, res) => {
    try {
        const { items, totalPrice, customInfor, paymentMethod } = req.body;
        if (!items) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Không có sản phẩm nào" })

        }
        if (!customInfor) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chưa nhập địa chỉ nhận hàng" })
        }

        if (!paymentMethod) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chưa chọn hình thức thanh toán" })
        }

        if (paymentMethod !== 1) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Đã xảy ra lỗi khi thanh toán" })

        }
        const order = await Order.create({ user: req.user._id, items, totalPrice, customInfor, paymentMethod });
        const cart = await Cart.updateOne({ user: req.user._id }, { items: [] })
        res.status(StatusCodes.CREATED).json({ data: order, message: "Bạn đã đặt hàng thành công " })
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
        const order = await Order.findByIdAndUpdate({ _id: orderId }, { status: status }, { new: true });
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
        const { status } = req.body
        const order = await Order.find({ status: status }).sort({ createdAt: -1 }).populate("items.color").populate("items.size");
        return res.status(StatusCodes.OK).json({ data: order });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
}


export const createOrderPaymentVNPAY = async (req, res) => {
    try {
        const { items, totalPrice, customInfor, paymentMethod, returnUrl } = req.body;
        if (!items) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Không có sản phẩm nào" })

        }
        if (!customInfor) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chưa nhập địa chỉ nhận hàng" })
        }

        if (!paymentMethod) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chưa chọn hình thức thanh toán" })
        }

        if (paymentMethod !== 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Đã xảy ra lỗi khi thanh toán" })

        }
        if (!returnUrl) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Thiếu đường dẫn trả về" });
        }
        const order = await Order.create({ user: req.user._id, items, totalPrice, customInfor, paymentMethod });
        console.log("order", order);

        if (!order || !order._id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Tạo đơn hàng thất bại",
            });
        }
        const ipAddress = (
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.ip
        );
        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_Amount: order?.totalPrice * 1000,
            vnp_IpAddr: ipAddress,
            vnp_TxnRef: `${order?._id}`,
            vnp_OrderInfo: "Donhang" + order?._id,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: `${returnUrl}`,
            vnp_Locale: VnpLocale.VN,
        });
        return res.status(StatusCodes.OK).json({ paymentUrl });


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi tạo URL thanh toán",
        });
    }
}

export const returnUrlVNPAY = async (req, res) => {
    try {
        const {
            vnp_Amount,
            vnp_BankCode,
            vnp_BankTranNo,
            vnp_CardType,
            vnp_OrderInfo,
            vnp_PayDate,
            vnp_ResponseCode = "02",
            vnp_TmnCode,
            vnp_TransactionNo,
            vnp_TransactionStatus,
            vnp_TxnRef,
            vnp_SecureHash,
        } = req.query;
        console.log("query", req.query);


        if (
            !vnp_Amount ||
            !vnp_BankCode ||
            !vnp_CardType ||
            !vnp_OrderInfo ||
            !vnp_TmnCode ||
            !vnp_TransactionNo ||
            !vnp_TransactionStatus ||
            !vnp_TxnRef ||
            !vnp_SecureHash
        ) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Giao dịch bất ổn xin mời về trang chủ",
                url: "/",
                type: 1,
            });
        }
        const queryReturn = {
            vnp_Amount: vnp_Amount,
            vnp_BankCode: vnp_BankCode,
            vnp_BankTranNo: vnp_BankTranNo,
            vnp_CardType: vnp_CardType,
            vnp_OrderInfo: vnp_OrderInfo,
            vnp_PayDate: vnp_PayDate,
            vnp_ResponseCode: vnp_ResponseCode,
            vnp_TmnCode: vnp_TmnCode,
            vnp_TransactionNo: vnp_TransactionNo,
            vnp_TransactionStatus: vnp_TransactionStatus,
            vnp_TxnRef: vnp_TxnRef,
            vnp_SecureHash: vnp_SecureHash,
        };
        console.log(queryReturn);

        let verify = vnpay.verifyReturnUrl(queryReturn);
        if (!verify.isVerified) {
            const existingOrder = await Order.findById(vnp_TxnRef);
            if (existingOrder) {
                await Order.findByIdAndDelete(existingOrder._id)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Quá trình giao dịch đã bị chỉnh sửa đơn hàng sẽ bị hủy",
                    type: 2,
                    url: `/`,
                });
            }
        }
        if (!verify.isSuccess) {
            const existingOrder = await Order.findById(vnp_TxnRef);
            if (existingOrder) {
                await Order.findByIdAndDelete(existingOrder._id)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Quá trình giao dịch đã bị chỉnh sửa đơn hàng sẽ bị hủy",
                    type: 2,
                    url: `/`,
                });
            }
        }
        const cart = await Cart.updateOne({ user: req.user._id }, { items: [] })
        return res.status(StatusCodes.OK).json({
            message: "Đơn hàng giao dịch thành công",
            type: 3,
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi xử lý giao dịch",
            type: 1,
        })
    }
}




