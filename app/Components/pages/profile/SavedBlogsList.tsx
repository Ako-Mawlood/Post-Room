import ProfileBlogCard from "../../ui/ProfileBlogCard"
import Image from "next/image"
import noBlogVector from "@/public/assets/no-blog.png"
import {blogType} from "@/app/types/blogType"
import {ImSpinner2 as Spinner} from "react-icons/im"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"

async function getSavedBlogs() {
  const res = await axiosInstance("/api/list", {headers: {Authorization: getCookie("token", {cookies})}})
  return res.data
}
const SavedBlogsList = async () => {
  const savedBlogs = await getSavedBlogs()
  if (!savedBlogs) {
    return (
      <div className="flex justify-center items-start w-full h-[30rem] mt-8">
        <Spinner className="size-10 text-slate-300 font-extrathin animate-spin" />
      </div>
    )
  }

  if (!savedBlogs || savedBlogs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center mb-7 opacity-85 dark:opacity-70">
        <Image src={noBlogVector} width={250} height={250} alt="No blog vector" />
        <h1 className="text-4xl font-PT font-semibold text-center">No saved blogs.</h1>
      </div>
    )
  }

  return (
    <>
      {savedBlogs && (
        <div className="flex justify-center flex-wrap gap-10 w-full p-6 mx-auto">
          {savedBlogs.map((blog: {blog: blogType}) => {
            return <ProfileBlogCard key={blog.blog.id} blog={blog.blog} />
          })}
        </div>
      )}
    </>
  )
}

export default SavedBlogsList
