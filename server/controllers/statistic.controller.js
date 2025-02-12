import { StatusCodes } from "http-status-codes"
import Auth from "../models/auth.model.js"
import Order from "../models/order.model.js"
import Product from "../models/product.model.js"
import moment from "moment/moment.js"
import { addDays, addMonths, endOfDay, endOfYear, format, startOfDay, startOfYear, subDays } from 'date-fns';

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


export const get7days = async (req, res) => {
    try {
        // Lấy ngày hôm nay và 7 ngày trước
        const today = endOfDay(new Date());
        const sevenDaysAgo = subDays(today, 6);

        // Truy vấn tất cả đơn hàng trong 7 ngày gần nhất
        const orders = await Order.find({
            status: { $in: ['delivered', 'cancelled'] },
            createdAt: { $gte: sevenDaysAgo, $lte: today },
        });

        // Tạo danh sách 7 ngày gần nhất với giá trị mặc định
        const result = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = format(addDays(sevenDaysAgo, i), 'yyyy-MM-dd');
            result.push({
                date: currentDate,
                delivered: 0,
                cancelled: 0,
            });
        }

        // Đếm số lượng đơn hàng theo ngày
        orders.forEach((order) => {
            const orderDate = format(order.createdAt, 'yyyy-MM-dd');
            const dayData = result.find((day) => day.date === orderDate);
            if (dayData) {
                if (order.status === 'delivered') {
                    dayData.delivered += 1;
                } else if (order.status === 'cancelled') {
                    dayData.cancelled += 1;
                }
            }
        });

        // Trả về kết quả
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}


export const get1year = async (req, res) => {
    try {
        // Lấy năm từ req.body, nếu không có thì mặc định là năm hiện tại
        const year = req.body.year || new Date().getFullYear();

        // Kiểm tra xem year có hợp lệ hay không
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            return res.status(400).json({ message: 'Năm không hợp lệ! Vui lòng cung cấp một năm hợp lệ từ 1900 đến năm hiện tại.' });
        }

        // Xác định ngày đầu và ngày cuối của năm
        const startOfYearDate = startOfYear(new Date(year, 0, 1));
        const endOfYearDate = endOfYear(startOfYearDate);

        // Truy vấn tất cả đơn hàng trong năm
        const orders = await Order.find({
            status: { $in: ['delivered', 'cancelled'] },
            createdAt: { $gte: startOfYearDate, $lte: endOfYearDate },
        });

        // Tạo danh sách 12 tháng với giá trị mặc định
        const result = [];
        for (let i = 0; i < 12; i++) {
            const monthDate = addMonths(startOfYearDate, i);
            result.push({
                month: format(monthDate, 'yyyy-MM'), // Định dạng năm-tháng
                delivered: 0,
                cancelled: 0,
            });
        }

        // Đếm số lượng đơn hàng theo tháng
        orders.forEach((order) => {
            const orderMonth = format(order.createdAt, 'yyyy-MM');
            const monthData = result.find((month) => month.month === orderMonth);
            if (monthData) {
                if (order.status === 'delivered') {
                    monthData.delivered += 1;
                } else if (order.status === 'cancelled') {
                    monthData.cancelled += 1;
                }
            }
        });

        // Trả về kết quả
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}
