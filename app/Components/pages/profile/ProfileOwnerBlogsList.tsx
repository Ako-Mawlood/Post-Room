import BlogCard from "../../ui/BlogCard"
import noBlogVector from "@/public/assets/no-blog.png"
import Image from "next/image"
import {blogType} from "@/app/types/blogType"
import {profileOwnerType} from "@/app/types/profileOwnerType"

type profileOwnerBlogsListType = {
  profileOwner: profileOwnerType
}

const ProfileUserBlogsList = ({profileOwner}: profileOwnerBlogsListType) => {
  if (!profileOwner || profileOwner.blogs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center mb-7 opacity-85 dark:opacity-70">
        <Image src={noBlogVector} width={0} height={250} alt="No blog vector" />
        <h1 className="text-4xl font-PT font-semibold text-center">No blogs yet.</h1>
      </div>
    )
  }

  return (
    <div className="flex justify-center flex-wrap gap-4 w-full p-6">
      {profileOwner.blogs.map((blog: blogType) => (
        <div className="w-full md:w-4/5 lg:w-[47%] h-56">
          <BlogCard
            author={profileOwner.fullname}
            authorImageUrl={profileOwner.imageUrl}
            blogId={blog.blogId}
            blogImageUrl={blog.imageUrl}
            categories={blog.categories}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
            stars={blog._count.stars}
          />
        </div>
      ))}
    </div>
  )
}

export default ProfileUserBlogsList
