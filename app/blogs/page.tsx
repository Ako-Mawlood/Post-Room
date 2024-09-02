import React from "react";
import Navbar from "../components/Navbar";

import BlogsList from "../components/pages/blogs/BlogsList";
const BlogsPage = async ({}) => {
  return (
    <>
      <Navbar />
      <main className="mx-6 flex w-full justify-evenly lg:mx-10">
        <BlogsList url={`/api/blog`} />
        <section className="hidden w-[368px] border-l border-border p-10 md:block"></section>
      </main>
    </>
  );
};

export default BlogsPage;
