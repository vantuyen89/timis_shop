import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";


export const getCartByUser = async (req, res) => {
    try {
        const pageIndex = parseInt(req.body.pageIndex) || 1;
        const pageSize = parseInt(req.body.pageSize) || 5;
        const skip = (pageIndex - 1) * pageSize;

        let cart = await Cart.findOne({ user: req.user._id })
            .populate("items.productId")
            .populate("items.color")
            .populate("items.size");

        if (!cart) {
            cart = await Cart.create({ user: req.user._id });
        }

        const totalItems = cart.items.length;
        const paginatedItems = cart.items.slice(skip, skip + pageSize);

        // Format tất cả sản phẩm
        const allProducts = cart.items.map(item => ({
            productId: item.productId._id,
            image: item.productId.thumbnail,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            totalPrice: item.productId.price * item.quantity,
        }));

        // Format sản phẩm đã phân trang
        const cartData = {
            products: paginatedItems.map(item => ({
                productId: item.productId._id,
                image: item.productId.thumbnail,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity,
                color: item.color,
                size: item.size,
                totalPrice: item.productId.price * item.quantity,
            }))
        };

        // Tính tổng giá của toàn bộ giỏ hàng
        const cartTotal = allProducts.reduce((sum, item) => sum + item.totalPrice, 0);

        return res.status(StatusCodes.OK).json({
            pageIndex,
            pageSize,
            totalPage: totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize),
            totalItems,
            content: cartData.products,
            allProducts, // Thêm trường chứa tất cả sản phẩm
            cartTotal, // Thêm tổng giá của giỏ hàng
        });

    } catch (error) {
        console.error('Error in getCartByUser:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'An error occurred while fetching cart data'
        });
    }
};


export const addItemCart = async (req, res) => {
    const { productId, quantity, color, size } = req.body
    try {
        // console.log(req.body);
        // console.log(req.user);
        // Kiểm tra giỏ hàng đã có sản phẩm hay chưa ? theo userId
        let cart = await Cart.findOne({ user: req.user._id })
        // Nếu chưa có thì tạo mới giỏ hàng
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] })
        }
        // console.log(cart);
        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng hay không 
        const existProduct = cart.items.findIndex((item) => item.productId.toString() == productId && item.color.toString() == color && item.size.toString() == size)
        console.log(existProduct);
        // Nếu tồn tại thì tăng số lượng
        if (existProduct !== -1) {
            cart.items[existProduct].quantity += quantity
        } else {
            cart.items.push({ productId: productId, quantity: quantity, color: color, size: size })
        }
        await cart.save()
        return res.status(StatusCodes.OK).json({ cart })
        // Nếu chưa tồn tại thì tạo mới sản phẩm trong giỏ hàng
        // Lưu giỏ hàng vào database
        // Lấy giỏ hàng ra và trả về cho người dùng
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const removeCart = async (req, res) => {
    const { productId, color, size } = req.body;
    console.log(req.body);
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter((product) => !(product.productId.toString() === productId && product.color.toString() === color && product.size.toString() === size))

        await cart.save()
        return res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export const updateProductCart = async (req, res) => {
    const { productId, quantity, size, color } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
        }
        const existProduct = cart.items.find((item) => item.productId.toString() == productId && item.color.toString() !== color.toString && item.size.toString() !== size.toString)
        if (!existProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        existProduct.quantity = quantity
        await cart.save()
        return res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

}


export const increaseQuantity = async (req, res) => {
    const { productId, color, size } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
        }
        const product = cart.items.find((item) => (item.productId.toString() === productId && item.color.toString() === color && item.size.toString() === size));
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        product.quantity++;
        await cart.save();
        return res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}


export const decreaseQuantity = async (req, res) => {
    const { productId, color, size } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
        }
        const product = cart.items.find((product) => (product.productId.toString() === productId && product.color.toString() === color && product.size.toString() === size))
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        console.log('ahihihihihihihihihihiproduct', product);
        if (product.quantity > 1) {
            product.quantity--
        }
        await cart.save();
        return res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}


export const getAllCartUser = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.productId").populate("items.color").populate("items.size")
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
        }
        return res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)

    }
}