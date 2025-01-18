import axiosInstance from "@/libs/axiosInstance";
import { cookies } from "next/headers";
import Image from "next/image";
import blogWhite from "@/public/assets/blogWhite.svg";
import blogBlack from "@/public/assets/blogBlack.svg";
import { blogType } from "@/app/types/blogType";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { getInitials, formatDate } from "@/libs/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";

async function getDraftedBlogs() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance("/api/blog/draft", {
    headers: { Authorization: token },
  });
  return res.data;
}

const DraftBlogList = async () => {
  const draftedBlogs = await getDraftedBlogs();

  if (!draftedBlogs || draftedBlogs.length === 0) {
    return (
      <div className="mb-7 flex flex-col items-center justify-center opacity-30">
        <div className="my-10 w-72">
          <Image
            draggable={false}
            src={blogWhite}
            className="hidden dark:block"
            width={0}
            height={250}
            alt="No blog vector"
          />
          <Image
            src={blogBlack}
            draggable={false}
            className="dark:hidden"
            width={0}
            height={250}
            alt="No blog vector"
          />
        </div>
        <h1 className="text-center font-PT text-4xl font-semibold">
          No drafted blogs yet.
        </h1>
      </div>
    );
  }
  return (
    <>
      {draftedBlogs && (
        <div className="mx-auto flex w-full flex-wrap justify-start gap-10 p-6">
          {draftedBlogs.map((blog: blogType) => (
            <Link
              href={`/create/${blog.blogId}`}
              key={blog.id}
              className="h-52 w-full md:w-4/5 lg:w-[47%]"
            >
              <Card className="flex h-full w-full items-start gap-1 rounded-lg border-none duration-150 hover:bg-accent">
                <div className="flex h-full w-4/6 flex-col justify-between p-2 font-semibold">
                  <CardHeader className="flex w-full flex-row gap-1 space-y-0 p-0">
                    {blog.categories.map(
                      (category: { category: { name: string } }) => (
                        <span
                          key={category.category.name}
                          className="truncate rounded-lg p-1 text-xs"
                        >
                          #{category.category.name}
                        </span>
                      ),
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2 overflow-hidden p-0">
                    <CardTitle className="line-clamp-2 font-PT text-xl md:text-2xl">
                      {blog.title}
                    </CardTitle>
                  </CardContent>
                  <CardFooter className="flex w-full items-center justify-between gap-2 p-0 text-xs">
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(blog.author.fullname)}
                        </AvatarFallback>
                        <AvatarImage src={blog.author.imageUrl as string} />
                      </Avatar>
                      <span className="ml-2 hidden truncate sm:block md:w-32">
                        {blog.author.fullname}
                      </span>
                    </div>
                    <span className="w-fit">{formatDate(blog.createdAt)}</span>
                  </CardFooter>
                </div>
                <div className="relative h-full w-2/6 rounded-lg">
                  <Image
                    className="rounded-r-md object-cover"
                    src={
                      blog.imageUrl ||
                      "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                    }
                    sizes="230px"
                    fill={true}
                    alt="Blog image"
                  />

                  <Badge className="absolute right-2 top-2 bg-card text-card-foreground opacity-90 hover:bg-card">
                    Draft
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default DraftBlogList;
