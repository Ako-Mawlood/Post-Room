import {Card, CardHeader, CardTitle, CardDescription} from "./card"
import Image from "next/image"
import {blogType} from "@/app/types/blogType"
import {Button} from "../ui/button"
import SaveBlogBtn from "../SaveBlogBtn"
import {formatDate} from "@/libs/utils"
import Link from "next/link"
import SigninModal from "../pages/Landing/SigninModal"

export const ProfileBlogCard = ({blog}: {blog: blogType}) => (
  <>
    {blog && (
      <Card
        key={blog.id}
        className="flex flex-col items-center flex-wrap w-[400px] border-none shadow-md hover:shadow-lg rounded-3xl p-4"
      >
        <div className="relative w-full h-60 rounded-3xl">
          <Image
            className="rounded-3xl object-cover"
            src={
              blog.imageUrl ||
              "https://as1.ftcdn.net/v2/jpg/06/34/27/22/1000_F_634272206_DUqxTFpMbqXaKd9ybufi43Dp53nLoy1u.jpg"
            }
            sizes="400px"
            layout="fill"
            alt="Blog image"
          />
        </div>
        <div className="flex items-start justify-between w-full mt-4 ">
          <div className="flex flex-col items-start 1overflow-hidden">
            <span className="text-xs font-semibold p-1 px-3 mb-1 bg-violet-200 text-violet-600 rounded-lg">
              Category
            </span>
            <span className="font-semibold text-base">Published {formatDate(blog.createdAt)}</span>
          </div>
          <SaveBlogBtn blogId={blog.blogId} />
        </div>
        <CardHeader className="gap-2 px-0">
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription className="line-clamp-3">{blog.content}</CardDescription>
        </CardHeader>
        <Link href={"/"} className="w-full">
          <Button className="rounded-lg">View</Button>
        </Link>
      </Card>
    )}
  </>
)
