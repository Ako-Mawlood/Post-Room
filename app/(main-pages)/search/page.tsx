import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import BlogCard from "@/app/components/ui/BlogCard";
import { blogType } from "@/app/types/blogType";

async function getBlogs(q: string) {
  const token = getCookie("token", { cookies });
  try {
    const res = await axiosInstance(`/api/search?query=${q}`, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

const BlogsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const q = (searchParams && searchParams.q) || "";
  console.log({ q });
  const blogs = await getBlogs(q as string);
  console.log(blogs);
  return (
    <div className="w-full">
      <main className="mt-20 flex w-full items-start justify-center">
        {blogs && (
          <section className="flex w-3/6 flex-col gap-5 border-r border-primary pr-20">
            <h1 className="text-4xl text-primary">
              {blogs.length ? (
                <span className="text-4xl text-muted-foreground">
                  Result for{" "}
                </span>
              ) : (
                <span className="text-4xl text-muted-foreground">
                  No result for{" "}
                </span>
              )}

              {q}
            </h1>
            <>
              {blogs.length !== 0 && (
                <section className="relative flex w-full flex-col items-center gap-5 p-5 md:w-[728px]">
                  {blogs.map((blog: blogType) => (
                    <div key={blog.id} className="animate-strech h-52 w-full">
                      <BlogCard
                        title={blog.title}
                        author={blog.author.fullname}
                        authorImageUrl={blog.author.imageUrl}
                        blogId={blog.blogId}
                        blogImageUrl={blog.imageUrl}
                        categories={blog.categories}
                        content={blog.content}
                        createdAt={blog.createdAt}
                        stars={blog._count.stars}
                      />
                    </div>
                  ))}
                </section>
              )}
            </>
          </section>
        )}
        <section className="w-2/6 rounded-lg bg-black"></section>
      </main>
    </div>
  );
};

export default BlogsPage;
