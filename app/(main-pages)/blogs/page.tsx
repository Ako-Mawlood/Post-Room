import React from "react";
import BlogsList from "../../components/pages/blogs/BlogsList";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Button } from "@/app/components/ui/button";
import Navbar from "@/app/components/Navbar";

type userTagType = {
  id: number;
  name: string;
  createdAt: string;
};
const getUserTags = async () => {
  const token = getCookie("token", { cookies });
  try {
    const res = await axiosInstance.get("/api/category", {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
const BlogsPage = async () => {
  const userTags: userTagType[] = await getUserTags();
  console.log(userTags);
  return (
    <>
      <Navbar />
      <main className="mx-6 flex w-full justify-evenly lg:mx-10">
        <BlogsList url={`/api/blog`} />
        <section className="hidden w-[368px] border-l border-border p-10 md:block">
          <div className="flex h-96 w-80 flex-col gap-4 rounded-2xl border px-3 pt-4">
            <h1 className="font-PT text-2xl font-semibold">Your tags</h1>
            <div className="flex w-full flex-wrap justify-center overflow-y-auto">
              {userTags?.map((tag) => {
                return (
                  <Button
                    key={tag.id}
                    variant="secondary"
                    size="sm"
                    className="m-1 h-8 text-center text-xs"
                  >
                    {tag.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogsPage;
