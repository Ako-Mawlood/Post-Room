import axiosInstance from "@/libs/axiosInstance";

import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
const TopBlogs = async () => {
  const token = getCookie("token", { cookies });
  await axiosInstance
    .get("/api/blog/top")
    .then((res) => {
      console.log(res.data);
    })

    .catch((err) => {
      console.log(err.response.data);
    });
  return <div>TopBlogs</div>;
};

export default TopBlogs;
