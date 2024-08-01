import instance from "@/config/instance"


export const productFeature = (pageSize:number) => {
  const data = instance.post(`product/productFeatured`, { pageSize })
  return data
}

export const getProductPrice = (pageSize: number) => { 
  const data = instance.post(`product/productPrice`, { pageSize })
  return data
}

export const productMax = () => {
  const data = instance.get(`product/productPriceMax`)
  return data
}

export const getALlSize = () => {
  const data = instance.get(`/size/getAllSize`)
  return data
}

export const getAllColor = () => {
  const data = instance.get(`/color/getAllColor`)
  return data
}

export const getProductShop = (paramsObject : Object) => {
  const data = instance.post(`/product/shop`, paramsObject)
  return data
}

export const getProductById = (id: string) => {
  const data = instance.get(`/product/getProductById/${id}`)
  return data
}

export const related = ({ category, pageSize ,id} : any) => {
  const data = instance.post(`/product/productRelated`, {
    categoryId: category,
    pageSize: pageSize,
    idProduct: id
  })
}


