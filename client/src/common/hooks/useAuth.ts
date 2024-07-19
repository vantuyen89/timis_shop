import { AuthContext } from "@/pages/auth/AuthContext"
import { useContext } from "react"


export const useAuth = () => {
  return useContext(AuthContext)
}