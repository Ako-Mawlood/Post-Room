import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import BlogsList from "../../components/pages/blogs/BlogsList";

async function getBlogs(q: string) {
  const token = getCookie("token", { cookies });
  const query = q;
  console.log(query);
  const res = await axiosInstance(`/api/search?query=${q}`, {
    headers: { Authorization: token },
  });
  return res.data;
}

const BlogsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const q = (searchParams && searchParams.q) || "";

  const blogs = await getBlogs(q as string);

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
            <BlogsList url={`/api/search?q=${q}`} />
          </section>
        )}
        <section className="w-2/6 rounded-lg bg-black"></section>
      </main>
    </div>
  );
};

export default BlogsPage;
