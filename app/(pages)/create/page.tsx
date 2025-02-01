import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  await axiosInstance
    .post(
      "/api/blog",
      {
        title: "Title",
        content: "Content",
        imageUrl: "/ImageUrl",
        categories: [""],
      },
      { headers: { Authorization: getCookie("token", { cookies }) } },
    )
    .then((res) => {
      redirect(`/create/${res.data.blogId}`);
    });
  return (
    <div className="w-ful h-full items-center justify-center font-PT text-3xl">
      <p>Creating...</p>
    </div>
  );
};

export default page;
