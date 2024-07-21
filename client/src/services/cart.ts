import instance from "@/config/instance"
import { ICart } from "@/interfaces/ICart";

export const getCartByUserId = async (pageIndex?:number,pageSize?:number) => {
  try {
    const { data } = await instance.post(`/cart/getCart`, {
      pageSize: pageSize,
      pageIndex: pageIndex
    })
    return data
  } catch (error) {
    console.log(error);
    
  }
}


export const addtoCartById = async ({ productId, color, size, quantity }: ICart) => {
  try {
    const { data } = await instance.post(`/cart/addProductToCart`, {
      productId: productId,
      color: color,
      size: size,
      quantity: quantity
    })
    return data
  } catch (error) {
    console.log(error)
  }
}


export const removeItemFromCart = async ({ productId, color, size }: ICart) => { 
  try {
    const { data } = await instance.post(`/cart/removeCart`, {
      productId: productId,
      color: color,
      size: size
    })
    return data
  } catch (error) {
    console.log(error)
  }
}



export const incrementItemCart = async ({ productId, color, size }: ICart) => {
  try {
    const { data } = await instance.post(`/cart/increment`, {
      productId: productId,
      color: color,
      size: size
    })
    return data
  } catch (error) {
    console.log(error)
  }
}


export const decrementItemCart = async ({ productId, color, size }: ICart) => {
  try {
    const { data } = await instance.post(`/cart/decrement`, {
      productId: productId,
      color: color,
      size: size
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getCartAllUser = async () => {
  try {
    const { data } = await instance.get(`/cart/cartUser`)
    return data
  } catch (error) {
    console.log(error)
  }
  
}