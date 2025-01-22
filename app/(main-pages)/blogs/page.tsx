import React from "react";
import BlogsList from "../../components/pages/blogs/BlogsList";

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
