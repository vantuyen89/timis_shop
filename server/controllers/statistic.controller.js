import { StatusCodes } from "http-status-codes"
import Auth from "../models/auth.model.js"
import Order from "../models/order.model.js"
import Product from "../models/product.model.js"
import moment from "moment/moment.js"

export const statistic = async (req, res) => {
    try {
        const totalUser = await Auth.countDocuments()
        const totalOrder = await Order.countDocuments()
        const totalProduct = await Product.countDocuments()
        res.status(StatusCodes.OK).json({
            data: {
                totalUser,
                totalOrder,
                totalProduct
            },
            message: "Lấy thông tin thống kê thành công"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const totalOrder = async (req, res) => {
    try {
        const endDate = moment();
        const startDate = moment().subtract(7, "months");

        // Lấy dữ liệu từ MongoDB
        const rawData = await Order.aggregate([
            {
                $match: {
                    status: { $in: ["delivered", "canceled"] },
                    createdAt: {
                        $gte: startDate.toDate(),
                        $lte: endDate.toDate(),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },
        ]);

        // Tạo danh sách 8 tháng gần nhất
        const result = Array.from({ length: 8 }).map((_, index) => {
            const date = moment().subtract(7 - index, "months");
            const year = date.year();
            const month = date.month() + 1;

            const delivered = rawData.find(
                (item) =>
                    item._id.year === year &&
                    item._id.month === month &&
                    item._id.status === "delivered"
            )?.count || 0;

            const canceled = rawData.find(
                (item) =>
                    item._id.year === year &&
                    item._id.month === month &&
                    item._id.status === "canceled"
            )?.count || 0;

            return {
                month: `${month}/${year}`,
                delivered,
                canceled,
            };
        });

        res.status(StatusCodes.OK).json({ data: result, message: "Lấy thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
