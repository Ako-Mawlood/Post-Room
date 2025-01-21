import React from "react";
import BlogsList from "../../components/pages/blogs/BlogsList";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Button } from "@/app/components/ui/button";
import Navbar from "@/app/components/shared/Navbar";
import Search from "@/app/components/pages/search/Search";

const BlogsPage = async () => {
  return (
    <>
      <aside className="order-2 flex w-full flex-col items-start justify-start md:order-1 md:w-[45rem]">
        <h1 className="font-Pt my-4 text-5xl md:my-10">Explore blogs</h1>

        <BlogsList />
      </aside>
    </>
  );
};

export default BlogsPage;
