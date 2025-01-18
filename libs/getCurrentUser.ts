import { getCookie } from "cookies-next";
import axiosInstance from "./axiosInstance";

export async function getCurrentUser() {
  const token = getCookie("token");
  if (token) {
    const res = await axiosInstance("/api/me", {
      headers: { Authorization: token },
    });
    return res.data;
  }
}
