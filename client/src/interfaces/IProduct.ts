export interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  images: { url: string }[]
  category: string
  countInStock: number
  discount: number
  featured: boolean
  quantity: number
  variants: any[]
  thumbnail: string
  createdAt: string
  updatedAt: string
}

export interface IProductComingPost {
  productId: IProduct
  comingDate: string
  active: boolean
}

export interface IProductComing extends IProductComingPost {
  _id: string
}
