import { currentUserType } from "@/app/types/currentUserType";
import axiosInstance from "./axiosInstance";

export async function getCurrentUser(token: string) {
  if (token) {
    const res = await axiosInstance("/api/me", {
      headers: { Authorization: token },
    });
    return res.data;
  }
}
