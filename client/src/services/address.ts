
import axios from 'axios'

export const callDistrict = async (idProvince: string) => {
  const data = await axios.get(
    `https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district?idProvince=${idProvince}`
  )
  return data
}

export const callCommune = async (idDistrict: string) => {
  const data = await axios.get(
    `https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=${idDistrict}`
  )
  return data
}

export const callCity = async () => {
  const data = await axios.get('https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province')
  return data
}

