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


export const related = ({ category, pageSize ,id} : any) => {
  const data = instance.post(`/product/productRelated`, {
    categoryId: category,
    pageSize: pageSize,
    idProduct: id
  })
  return data
}

export const postSize = (dataForm:Object) => {
  const data = instance.post(`size/addSize`, dataForm)
  return data
}

export const getSizeId = (id: string) => { 
  const data = instance.get(`size/getSizeId/${id}`)
  return data
}

export const updateSize = ({id,dataForm}:any) => {
  const data = instance.put(`size/updateSize/${id}`, dataForm)
  return data
}

export const postColor = (dataForm:Object) => {
  const data = instance.post(`color/addColor`, dataForm)
  return data
}

export const getColorId = (id: string) => { 
  const data = instance.get(`color/getColorId/${id}`)
  return data
}

export const updateCOlor = ({ id, dataForm }: any) => {
  const data = instance.put(`color/updateColor/${id}`, dataForm)
  return data
}

export const postProduct = (dataProduct:Object) => {
  const data = instance.post(`product/addProduct`, dataProduct)
  return data
}

export const getAllProducts = () => {
  const data = instance.get(`product/getAllProducts`)
  return data
}

export const getProductById = (id: string) => { 
  const data = instance.get(`/product/getProductById/${id}`)
  return data
}

export const updateProduct = ({id,dataProduct}:any) => {
  const data = instance.put(`product/productUpdated/${id}`, dataProduct)
  return data
}



