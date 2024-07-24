import Image from "next/image";
import noBlogVector from "@/public/assets/no-blog.png";
import { blogType } from "@/app/types/blogType";
import { ImSpinner2 as Spinner } from "react-icons/im";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import BlogCard from "../../ui/BlogCard";
import { cookies } from "next/headers";

interface savedBlogType extends blogType {
  author: {
    id: number;
    imageUrl: string;
    fullname: string;
    username: string;
  };
}

async function getSavedBlogs() {
  const res = await axiosInstance("/api/list", {
    headers: { Authorization: getCookie("token", { cookies }) },
  });
  return res.data;
}
const SavedBlogsList = async () => {
  const savedBlogs = await getSavedBlogs();

  if (!savedBlogs) {
    return (
      <div className="mt-8 flex h-[30rem] w-full items-start justify-center">
        <Spinner className="font-extrathin size-10 animate-spin text-slate-300" />
      </div>
    );
  }
  if (!savedBlogs || savedBlogs.length === 0) {
    return (
      <div className="mb-7 flex flex-col items-center justify-center opacity-85 dark:opacity-70">
        <Image
          src={noBlogVector}
          width={250}
          height={250}
          alt="No blog vector"
        />
        <h1 className="text-center font-PT text-4xl font-semibold">
          No saved blogs.
        </h1>
      </div>
    );
  }

  return (
    <>
      {savedBlogs && (
        <div className="mx-auto flex w-full flex-wrap justify-start gap-10 p-6">
          {savedBlogs.map((blog: { blog: savedBlogType }) => {
            return (
              <div className="h-52 w-full md:w-4/5 lg:w-[47%]">
                <BlogCard
                  author={blog.blog.author?.fullname}
                  authorImageUrl={blog.blog.author?.imageUrl}
                  blogId={blog.blog.blogId}
                  blogImageUrl={blog.blog.imageUrl}
                  categories={blog.blog.categories}
                  title={blog.blog.title}
                  content={blog.blog.content}
                  createdAt={blog.blog.createdAt}
                  stars={blog.blog._count.stars}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SavedBlogsList;
