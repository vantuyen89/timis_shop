import instance from "@/config/instance"

export const getAllCategory = () => {
  const data = instance.get(`/category/getAll`)
  return data
}

export const getCategoryById = (id: string) => {
  const data = instance.get(`category/getCateById/${id}`)
  return data
}

export const updateCategory = ({id,dataCate}:any) => {
  const data = instance.put(`category/updateCateById/${id}`, dataCate)
  return data
}

export const postCategory = (dataCate:Object) => {
  const data = instance.post(`category/addCate`, dataCate)
  return data
}
