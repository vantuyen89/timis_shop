import instance from '@/config/instance'
import axios from 'axios'
import { IoMdDisc } from 'react-icons/io'

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

