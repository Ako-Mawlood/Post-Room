import Navbar from "@/app/Components/Navbar";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Image from "next/image";
import InteractionBar from "@/app/Components/pages/blogs/InteractionBar";
import { isMe } from "@/libs/isMe";
import { backgroundColors } from "@/constants/backgroundColors";
import { marked } from "marked";
import parse from "html-react-parser";

type blogPageTypes = {
  params: { blogId: string };
};

async function getBlog(blogId: string) {
  try {
    const res = await axiosInstance(`/api/blog/${blogId}`, {
      headers: { Authorization: getCookie("token", { cookies }) },
    });
    return res.data;
  } catch (err: any) {
    console.log(err.message);
  }
}

const BlogPage = async ({ params }: blogPageTypes) => {
  const blog = await getBlog(params.blogId);
  const isMyBlog = await isMe(blog.author.id);
  const htmlContent = marked(blog.content) as string;

  return (
    <>
      <Navbar />
      {blog && (
        <div className="mx-auto w-full p-6 lg:w-10/12">
          <h1 className="mt-6 border-b-2 py-4 font-PT text-5xl text-accent-foreground">
            {blog.title}
            {blog.categories && (
              <ul className="mt-2 flex gap-3 text-sm">
                {blog.categories.map((category: any, index: number) => (
                  <div className="flex gap-1">
                    <span
                      style={{
                        color: `rgb(${backgroundColors[index + 1]},0.9)`,
                      }}
                    >
                      #
                    </span>
                    <span className="text-primary">
                      {category.category.name}
                    </span>
                  </div>
                ))}
              </ul>
            )}
          </h1>

          <InteractionBar blog={blog} isMyBlog={isMyBlog} />
          <section>
            <div className="relative h-[90vh] w-full overflow-hidden">
              <Image
                className="rounded-lg object-cover"
                src={
                  blog.imageUrl ||
                  "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                }
                fill={true}
                quality={100}
                alt="Blog image"
              />
            </div>
            <div className="lg:mx-32">
              <h1 className="mt-6 border-b-2 py-4 font-PT text-5xl text-accent-foreground">
                {blog.title}
              </h1>
              <div className="prose my-10">{parse(htmlContent)}</div>
            </div>
          </section>
          <InteractionBar blog={blog} isMyBlog={isMyBlog} />
        </div>
      )}
    </>
  );
};

export default BlogPage;
