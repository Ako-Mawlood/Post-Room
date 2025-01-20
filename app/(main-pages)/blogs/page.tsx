import React from "react";
import BlogsList from "../../components/pages/blogs/BlogsList";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Button } from "@/app/components/ui/button";
import Navbar from "@/app/components/Navbar";
import Search from "@/app/components/pages/search/Search";

const BlogsPage = async () => {
  return (
    <>
      <aside className="flex flex-col p-5 md:w-[45rem]">
        <h1 className="font-Pt my-10 text-5xl">Explore blogs</h1>
        <BlogsList url={`/api/blog`} />
      </aside>
    </>
  );
};

export default BlogsPage;
