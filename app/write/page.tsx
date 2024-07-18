import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"
import {redirect} from "next/navigation"
const page = async () => {
  // Todo:handling error state.
  await axiosInstance
    .post(
      "/api/blog",
      {
        title: "Title",
        content: "Content",
        imageUrl: "/ImageUrl",
        categories: ["Categoires"],
      },
      {headers: {Authorization: getCookie("token", {cookies})}}
    )
    .then((res) => {
      redirect(`/write/${res.data.blogId}`)
    })
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      Creating blog...
    </div>
  )
}

export default page
