import {useQuery} from "@tanstack/react-query"
import axios from "../../../../libs/axios"
import ProfileBlogCard from "../../ui/ProfileBlogCard"
import Image from "next/image"
import noBlogVector from "../../../../public/no blog.png"
import {blogType} from "@/app/types/blogType"
import {ImSpinner2 as Spinner} from "react-icons/im"

const SavedBlogsList = () => {
  const {
    data: savedBlogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["savedBlogs"],
    queryFn: () => {
      return axios.get("/api/list", {headers: {Authorization: localStorage.getItem("token")}})
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-start w-full h-[30rem] mt-8">
        <Spinner className="size-10 text-slate-300 font-extrathin animate-spin" />
      </div>
    )
  }

  if (isError) {
    return <span>{error.message}</span>
  }

  if (!savedBlogs?.data || savedBlogs.data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center mb-7 opacity-85 dark:opacity-70">
        <Image src={noBlogVector} width={250} height={250} alt="No blog vector" />
        <h1 className="text-4xl font-PT font-semibold text-center">No saved blogs.</h1>
      </div>
    )
  }

  return (
    <>
      {savedBlogs.data && (
        <div className="flex justify-center flex-wrap gap-10 w-full p-6 mx-auto">
          {savedBlogs.data.map((blog: {blog: blogType}) => {
            return <ProfileBlogCard key={blog.blog.id} blog={blog.blog} />
          })}
        </div>
      )}
    </>
  )
}

export default SavedBlogsList
