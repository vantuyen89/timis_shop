import mongoose from "mongoose";

const orderItem = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
        required: true
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    items: [orderItem],
    orderNumber: {
        type: String,
        auto: true,
        unique: true,
        default: () => `ORD-${Math.floor(100 + Math.random() * 900) }`
    },
    customInfor: {
        type: {
            name: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            district: {
                type: String,
                required: true
            },
            commune: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            payment: {
                type: String,
                default: "Thanh toán khi nhận hàng"
            }
        },
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirm", "shipped", "delivered", "canceled"],
        default: "pending"
    }
},
    {
        timestamps: true,
        versionKey: false
    })

const Order = mongoose.model('Order', orderSchema)
export default Order