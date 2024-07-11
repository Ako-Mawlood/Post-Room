import Navbar from "@/app/Components/Navbar"
import {Button} from "@/app/Components/ui/button"
import axiosInstance from "@/libs/axiosInstance"
import {Avatar, AvatarFallback, AvatarImage} from "@/app/Components/ui/avatar"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"
import Image from "next/image"
import Link from "next/link"
import {
  LuStar as StarIcon,
  LuMessageCircle as CommentIcon,
  LuBookmark as SaveIcon,
  LuShare as ShareIcon,
} from "react-icons/lu"
import {getInitials} from "@/libs/utils"
import clsx from "clsx"

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
  return (
    <>
      <Navbar />
      <div className="w-full md:w-10/12 mx-auto p-6">
        <h1 className="text-accent-foreground text-5xl py-4 mt-6 border-b-2 font-PT">{blog.title}</h1>
        <section className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href={`/@${blog.author.username}`}>
              <Avatar>
                <AvatarFallback>{getInitials(blog.author.fullname)}</AvatarFallback>
                <AvatarImage src={blog.author.imageUrl} />
              </Avatar>
            </Link>
            <Link href={`/@${blog.author.username}`} className="text-xs font-semibold hover:underline">
              {blog.author.fullname}
            </Link>
            <Button size="sm">Follow</Button>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <StarIcon size={20} />
              <span>{blog._count.stars}</span>
            </Button>
            <Button size="sm" variant="outline">
              <CommentIcon size={20} />
              <span>{blog._count.comments}</span>
            </Button>
            <Button className={clsx({hidden: blog.saved})} size="sm" variant="outline">
              <SaveIcon size={20} />
              <span>Save</span>
            </Button>
            <Button size="sm" variant="outline">
              <ShareIcon size={20} />
              <span>Share</span>{" "}
            </Button>
          </div>
        </section>
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
          <p>{blog.content}</p>
        </section>
      </div>
    </>
  )
}

export default BlogPage
