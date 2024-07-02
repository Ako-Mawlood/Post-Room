import {Card, CardHeader, CardTitle, CardFooter} from "./card"
import Image from "next/image"
import {blogType} from "@/app/types/blogType"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "./avatar"

const ProfileBlogCard = ({blog}: {blog: blogType}) => (
  <>
    {blog && (
      <Link href={`/blogs/${blog.blogId}`}>
        <Card key={blog.id} className="flex flex-col items-start gap-1 w-full sm:w-[400px] rounded-xl pb-2">
          <div className="relative w-full h-80 rounded-xl">
            <Image
              className="rounded-t-xl object-cover"
              src={
                blog.imageUrl ||
                "https://as1.ftcdn.net/v2/jpg/06/34/27/22/1000_F_634272206_DUqxTFpMbqXaKd9ybufi43Dp53nLoy1u.jpg"
              }
              sizes="400px"
              fill={true}
              alt="Blog image"
            />
          </div>
          <div className="flex flex-col justify-start p-2">
            <CardTitle className="text-base">{blog.title}</CardTitle>
          </div>
        </Card>
      </Link>
    )}
  </>
)

export default ProfileBlogCard
