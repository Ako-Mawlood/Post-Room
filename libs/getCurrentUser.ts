import axiosInstance from "./axiosInstance"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"

export async function getCurrentUser() {
  const token = getCookie('token',{cookies})
  if(token){
      const res = await axiosInstance("/api/me", {headers: {Authorization: getCookie("token", {cookies})}})
  return res.data
  }

}
