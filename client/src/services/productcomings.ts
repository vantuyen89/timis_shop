import instance from '@/config/instance'
import { IProductComingPost } from '@/interfaces/IProduct'

export const getProductComing = () => instance.get(`/productComing/productActive`)

export const postProductComing = (data: IProductComingPost) => instance.post(`/productComing`, data)

export const updateProductComing = ({ id, data }: { id: string; data: IProductComingPost }) =>
  instance.put(`/productComing/productActive/${id}`, data)

export const getAllComing = () => instance.get(`/productComing`)

export const getProductComingById = (id: string) => instance.get(`/productComing/productActive/${id}`)
