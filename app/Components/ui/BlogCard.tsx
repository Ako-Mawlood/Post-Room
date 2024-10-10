import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CiStar as StarIcon } from "react-icons/ci";
import { calculateReadingTime, formatDate, getInitials } from "@/libs/utils";

type BlogCardPropsType = {
  author: string;
  authorId?: number;
  authorImageUrl: string | null;
  blogId: string;
  blogImageUrl: string | null;
  categories: any;
  title: string;
  content: string;
  createdAt: string;
  stars: number;
};

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
}: BlogCardPropsType) => {
  return (
    <Link
      className="h-52 w-full md:w-4/5 lg:w-[47%]"
      key={blogId}
      href={`/read/${blogId}`}
    >
      <Card className="flex h-full w-full items-start gap-1 rounded-lg border-none duration-150 hover:bg-accent">
        <div className="flex h-full w-4/6 flex-col justify-between p-2 font-semibold">
          <CardHeader className="flex w-full flex-row gap-1 space-y-0 p-0">
            {categories.map((category: { category: { name: string } }) => (
              <span
                key={category.category.name}
                className="truncate rounded-lg p-1 text-xs"
              >
                #{category.category.name}
              </span>
            ))}
          </CardHeader>{" "}
          <CardContent className="flex flex-col gap-2 overflow-hidden p-0">
            <CardTitle className="line-clamp-2 font-PT text-xl md:text-2xl">
              {title}
            </CardTitle>

            <div className="line-clamp-2 text-sm text-accent-foreground"></div>
          </CardContent>
          <CardFooter className="flex w-full items-center justify-between gap-2 p-0 text-xs">
            <div className="flex items-center">
              {" "}
              <Avatar>
                <AvatarFallback>{getInitials(author)}</AvatarFallback>
                <AvatarImage src={authorImageUrl as string} />
              </Avatar>
              <span className="ml-2 hidden truncate sm:block md:w-32">
                {author}
              </span>
            </div>

            <span className="w-fit">{formatDate(createdAt)}</span>
            <span className="w-fit">{calculateReadingTime(content)}</span>
            <div className="flex w-fit items-center gap-1">
              <StarIcon className="size-5" />
              <span>{stars}</span>
            </div>
          </CardFooter>
        </div>
        <div className="relative h-full w-2/6 rounded-lg">
          <Image
            className="rounded-r-md object-cover"
            src={
              blogImageUrl ||
              "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
            }
            sizes="230px"
            fill={true}
            alt="Blog image"
          />
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
