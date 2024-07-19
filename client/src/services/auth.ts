import instance from "@/config/instance"

export const registerAuth = async (value : any) => {
  const data = await instance.post(`/auth/signup`, value)
  return data
}