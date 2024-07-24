import {getCookie} from "cookies-next"
import axiosInstance from "./axiosInstance"
import {cookies} from "next/headers"
import { notFound } from "next/navigation"

export async function getProfileOwner(username: string) {
  try{
  const res = await axiosInstance(`/api/user/${username}`, {
    headers: {Authorization: getCookie("token", {cookies})},
  })
  return res.data
  }catch (err:any){
    if(err.status===404){
      notFound()
    }
  }

}
