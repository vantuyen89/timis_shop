import instance from '@/config/instance'
import { typeSearch } from '@/pages/admin/auth/AuthAdmin'

export const registerAuth = async (value: any) => {
  const data = await instance.post(`/auth/signup`, value)
  return data
}

export const signinAuth = (dataForm: Object) => {
  const data = instance.post(`/auth/signin`, dataForm)
  return data
}

export const getUserAdmin = () => {
  const data = instance.get(`/auth/getAdmin`)
  return data
}

export const authCurrent = () => {
  const data = instance.get(`/auth/curent-user`)
  return data
}

export const updateInformation = (dataCate: Object) => {
  const data = instance.post(`auth/updateUser`, dataCate)
  return data
}

export const logout = () => {
  const data = instance.post(`/auth/logout`)
  return data
}

export const userChat = () => {
  const data = instance.get(`/auth/userChat`)
  return data
}

export const authPaging = (searchObject: typeSearch) => {
  const data = instance.post(`auth/paging`, searchObject)
  return data
}

export const banUser = (id: string) => {
  const data = instance.post(`/auth/banUser`, { userId: id })
  return data
}

export const unbanUser = (id: string) => {
  const data = instance.post(`/auth/unBanUser`, { userId: id })
  return data
}

export const loginWithGoogle = (payload: any) => {
  const data = instance.post(`/auth/loginGG`, payload)
  return data
}
