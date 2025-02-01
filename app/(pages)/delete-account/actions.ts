// app/deleteAccount/actions.ts
"use server";

import axiosInstance from "@/libs/axiosInstance";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteAccount(token: string, userToken: string) {
  try {
    // Attempt to delete the account
    await axiosInstance.delete(`/api/user/${token}`, {
      headers: { Authorization: userToken },
    });

    // Delete the token cookie
    deleteCookie("token", { cookies });

    // Redirect to the home page
    redirect("/");
  } catch (err: any) {
    // Handle errors
    const errorMessage =
      err.response?.data?.message ||
      "Could not delete your account. An unexpected error occurred.";
    console.error(err.message);
    return errorMessage;
  }
}
