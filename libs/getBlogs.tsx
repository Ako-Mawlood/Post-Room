import axiosInstance from "./axiosInstance";
import { getCookie } from "cookies-next";

export async function getBlogs(url: string, data: any = []) {
  try {
    const res = await axiosInstance(url, {
      params: data,
      headers: { Authorization: getCookie("token") },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    if (err) {
      console.log(err);
    }
  }
}
