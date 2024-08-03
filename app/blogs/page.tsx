import React from "react";
import Navbar from "../components/Navbar";
import { getBlogs } from "@/libs/getBlogs";

import BlogsList from "../components/pages/blogs/BlogsList";
const BlogsPage = async ({}) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="mt-20 flex w-full items-start justify-center">
        <BlogsList />
        <section className="w-2/6 rounded-lg bg-black"></section>
      </main>
    </div>
  );
};

export default BlogsPage;
