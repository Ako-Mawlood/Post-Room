"use client";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import React from "react";

const UserCategories = () => {
  axiosInstance("/api/user/categories", {
    headers: { Authorization: getCookie("token") },
  }).then((res) => {
    console.log(res.data);
  });

  return <div>UserCategories</div>;
};

export default UserCategories;
