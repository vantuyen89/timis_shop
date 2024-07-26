export interface IProduct {
  _id: string,
  name: string,
  description: string,
  price: number,
  images: string[],
  category: string,
  countInStock: number,
  discount: number,
  featured: boolean,
  quantity: number,
  variants: any[],
  thumbnail: string
  createdAt: string
  updatedAt: string

}