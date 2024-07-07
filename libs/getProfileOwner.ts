import {getCookie} from "cookies-next"
import axiosInstance from "./axiosInstance"
import {cookies} from "next/headers"

export async function getProfileOwner(username: string) {
  const res = await axiosInstance(`/api/user/${username}`, {
    headers: {Authorization: getCookie("token", {cookies})},
  })
  return res.data
}
