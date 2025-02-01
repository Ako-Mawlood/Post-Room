"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import axiosInstance from "@/libs/axiosInstance";

const DeleteAccountPage = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  useEffect(() => {
    const deleteAccount = async () => {
      const token = getCookie("token");

      await axiosInstance.delete(`/api/user/${params.token}`, {
        headers: { Authorization: token },
      });

      deleteCookie("token");
      router.push("/");
    };

    deleteAccount();
  }, [params.token, router]);
};

export default DeleteAccountPage;
