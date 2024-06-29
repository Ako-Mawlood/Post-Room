import ProfileBlogCard from "../../ui/ProfileBlogCard"
import noBlogVector from "../../../../public/no blog.png"
import Image from "next/image"
import {blogType} from "@/app/types/blogType"

type profileUserBlogsListType = {
  profileUserBlogs: blogType[]
}
const ProfileUserBlogsList = ({profileUserBlogs}: profileUserBlogsListType) => {
  if (!profileUserBlogs || profileUserBlogs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center mb-7 opacity-85 dark:opacity-70">
        <Image src={noBlogVector} width={0} height={250} alt="No blog vector" />
        <h1 className="text-4xl font-PT font-semibold text-center">No blogs yet.</h1>
      </div>
    )
  }

  return (
    <div className="flex justify-center flex-wrap gap-10 w-full p-6 mx-auto">
      {profileUserBlogs.map((blog: blogType) => (
        <ProfileBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default ProfileUserBlogsList
