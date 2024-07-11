import {Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from "./card"
import Image from "next/image"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "./avatar"
import {CiStar as StarIcon} from "react-icons/ci"
import {calculateReadingTime, formatDate, getInitials} from "@/libs/utils"

type BlogCardPropsType = {
  author: string
  authorImageUrl: string | null
  blogId: string
  blogImageUrl: string | null
  categories: any
  title: string
  content: string
  createdAt: string
  stars: number
}

const BlogCard = ({
  author,
  authorImageUrl,
  blogId,
  blogImageUrl,
  categories,
  title,
  content,
  createdAt,
  stars,
}: BlogCardPropsType) => (
  <Link key={blogId} href={`/blogs/${blogId}`}>
    <Card className="flex items-start gap-1 w-full h-full rounded-lg hover:bg-accent duration-150">
      <div className="flex flex-col justify-between h-full w-4/6 p-2 font-semibold">
        <CardHeader className="flex flex-row gap-1 w-full p-0 space-y-0">
          {categories.map((category: {category: {name: string}}) => (
            <span key={category.category.name} className="w-fit p-1 rounded-lg text-xs">
              #{category.category.name}
            </span>
          ))}
        </CardHeader>{" "}
        <CardContent className="flex flex-col gap-2 p-0 overflow-hidden">
          <CardTitle className="text-xl md:text-2xl font-PT line-clamp-2">{title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2 text-accent-foreground">
            {content}{" "}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex items-cente justify-between gap-2 w-full p-0 text-xs">
          <div className="flex items-center">
            {" "}
            <Avatar>
              <AvatarFallback>{getInitials(author)}</AvatarFallback>
              <AvatarImage src={authorImageUrl as string} />
            </Avatar>
            <span className="ml-2 w-20 md:w-fit hidden sm:block">{author}</span>
          </div>

          <span className="w-fit">{formatDate(createdAt)}</span>
          <span className="w-fit">{calculateReadingTime(content)}</span>
          <div className="flex items-center gap-1 w-fit">
            <StarIcon className="size-5" />
            <span>{stars}</span>
          </div>
        </CardFooter>
      </div>
      <div className="relative w-2/6 h-full rounded-lg">
        <Image
          className="rounded-r-md object-cover"
          src={
            blogImageUrl ||
            "https://as1.ftcdn.net/v2/jpg/06/34/27/22/1000_F_634272206_DUqxTFpMbqXaKd9ybufi43Dp53nLoy1u.jpg"
          }
          sizes="400px"
          fill={true}
          alt="Blog image"
        />
      </div>
    </Card>
  </Link>
)

export default BlogCard
