import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";


export const getCartByUser = async (req, res) => {
    const { userId } = req.params;
    const { pageIndex = 1, pageSize } = req.body;
    let limit = pageSize || 5;
    let skip = (pageIndex - 1) * limit || 0;
    try {
        const cart = await Cart.findOne({ userId: userId }).populate("items.productId")

        const paginatedItems = cart.items.slice(skip, skip + limit);

        const cartLength = await Cart.findOne({ userId: userId })

        const totalPage = cartLength.items.length === 0 ? 0 : Math.ceil(cartLength.items.length / limit);

        const totalOptionPage = cart.length;

        const totalAllOptions = cartLength.items.length;

        const cartData = {
            products: paginatedItems.map((item) => ({
                productId: item.productId._id,
                image: item.productId.thumbnail,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity
            }))
        }
        
        const result = {
            pageIndex: pageIndex,
            pageSize: limit,
            totalPage,
            totalOptionPage,
            totalAllOptions,
            content: cartData.products,
        };
        console.log(result);
        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}


export const addItemCart = async (req, res) => {
    const { user, productId, quantity } = req.body
    try {
        console.log(req.body);
        // Kiểm tra giỏ hàng đã có sản phẩm hay chưa ? theo userId
        let cart = await Cart.findOne({ user:user })
        // Nếu chưa có thì tạo mới giỏ hàng
        if (!cart) {
            cart = new Cart({ user, items: [] })
        }
        console.log(cart);
        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng hay không 
        const existProduct = cart.items.findIndex((item) => item.productId.toString() == productId)
        console.log(existProduct);
        // Nếu tồn tại thì tăng số lượng
        if (existProduct !== -1) {
            cart.items[existProduct].quantity += quantity
        } else {
            cart.items.push({ productId: productId, quantity: quantity })
        }
        await cart.save()
        return res.status(StatusCodes.OK).json({ cart })
        // Nếu chưa tồn tại thì tạo mới sản phẩm trong giỏ hàng
        // Lưu giỏ hàng vào database
        // Lấy giỏ hàng ra và trả về cho người dùng
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}