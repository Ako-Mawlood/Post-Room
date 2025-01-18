import axiosInstance from "./axiosInstance";
import { notFound } from "next/navigation";

export async function getUserByUsername(username: string, token: string) {
  try {
    const res = await axiosInstance(`/api/user/${username}`, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err: any) {
    if (err.status === 404) {
      notFound();
    }
  }
}
