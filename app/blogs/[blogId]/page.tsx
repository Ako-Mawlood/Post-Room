import Navbar from "@/app/Components/Navbar"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"
import Image from "next/image"
import parse from "html-react-parser"
import InteractionBar from "@/app/Components/pages/blogs/InteractionBar"
import {isMe} from "@/libs/isMe"

type blogPageTypes = {
  params: {blogId: string}
}

async function getBlog(blogId: string) {
  try {
    const res = await axiosInstance(`/api/blog/${blogId}`, {
      headers: {Authorization: getCookie("token", {cookies})},
    })
    return res.data
  } catch (err: any) {
    console.log(err.message)
  }
}

const BlogPage = async ({params}: blogPageTypes) => {
  const blog = await getBlog(params.blogId)
  const isMyBlog = await isMe(blog.author.id)
  return (
    <>
      <Navbar />
      <div className="w-full md:w-10/12 mx-auto p-6">
        <h1 className="text-accent-foreground text-5xl py-4 mt-6 border-b-2 font-PT">
          {blog.title}
        </h1>
        <InteractionBar blog={blog} isMyBlog={isMyBlog} />
        <section>
          <div className="w-full h-[90vh] relative overflow-hidden">
            <Image
              className="object-cover rounded-lg "
              src={blog.imageUrl}
              fill={true}
              quality={100}
              alt="Blog image"
            />
          </div>
          <p>{parse(blog.content)}</p>
        </section>
        <InteractionBar blog={blog} isMyBlog={isMyBlog} />
      </div>
    </>
  )
}

export default BlogPage
