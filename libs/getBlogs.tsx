import axiosInstance from "./axiosInstance";
import { getCookie } from "cookies-next";

export async function getBlogs(url: string) {
  try {
    const res = await axiosInstance(url, {
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
