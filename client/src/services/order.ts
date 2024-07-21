import instance from "@/config/instance"
interface Order {
  items: [],
  totalPrice: number,
  customInfor : {}

}

export const createOrder = async (order:any) => {
  try {
    const { data } = await instance.post(`/order`, order)
    return data
  } catch (error) {
    console.log(error)
  }
 
}