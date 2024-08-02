import axiosInstance from "./axiosInstance";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export async function getBlogs(skip: number) {
  try {
    const res = await axiosInstance(`/api/blog?skip=${skip}`, {
      headers: { Authorization: getCookie("token", { cookies }) },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    if (err) {
      console.log(err);
    }
  }
}
