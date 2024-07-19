import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type: Number,
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
        }
    ],
})


const Cart = mongoose.model("Cart", CartSchema)

export default Cart