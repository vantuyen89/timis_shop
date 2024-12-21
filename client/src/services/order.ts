import instance from '@/config/instance'
// interface Order {
//   items: [],
//   totalPrice: number,
//   customInfor : {}

// }

export const createOrder = async (order: any) => {
  try {
    const { data } = await instance.post(`/order`, order)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateOrder = ({ id, status }: any) => {
  const data = instance.put(`/order/updateStatusOrder`, { orderId: id, status: status })
  return data
}

export const searchOrder = (paramsObject: any) => {
  const data = instance.post(`${process.env.HOST_SERVER}/api/v1/order/status`, paramsObject)
  return data
}

export const postOrderAdmin = (paramsObject: Object) => {
  const data = instance.post(`order/orderStatus`, paramsObject)
  return data
}

export const createOrderPaymentVNPAY = (paramsObject: Object) => {
  const data = instance.post(`order/createOrderPaymentVNPAY`, paramsObject)
  return data
}

export const returnUrlVnPay = (dataUrl: any) => {
  const data = instance.get(`/order/returnVnPay?${dataUrl}`)
  return data
}
