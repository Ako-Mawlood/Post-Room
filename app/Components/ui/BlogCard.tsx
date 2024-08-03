import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./card";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CiStar as StarIcon } from "react-icons/ci";
import { calculateReadingTime, formatDate, getInitials } from "@/libs/utils";
import parse from "html-react-parser";
import { Badge } from "./badge";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { currentUserType } from "@/app/types/currentUserType";

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
  isDraft?: boolean;
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
  isDraft = false,
}: BlogCardPropsType) => {
  return (
    <Link key={blogId} href={`/read/${blogId}`}>
      <Card className="flex h-full w-full items-start gap-1 rounded-lg duration-150 hover:bg-accent">
        <div className="flex h-full w-4/6 flex-col justify-between p-2 font-semibold">
          <CardHeader className="flex w-full flex-row gap-1 space-y-0 p-0">
            {categories.map((category: { category: { name: string } }) => (
              <span
                key={category.category.name}
                className="w-fit rounded-lg p-1 text-xs"
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
          <CardFooter className="items-cente flex w-full justify-between gap-2 p-0 text-xs">
            <div className="flex items-center">
              {" "}
              <Avatar>
                <AvatarFallback>{getInitials(author)}</AvatarFallback>
                <AvatarImage src={authorImageUrl as string} />
              </Avatar>
              <span className="ml-2 hidden w-20 sm:block md:w-fit">
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
            sizes="400px"
            fill={true}
            alt="Blog image"
          />
          {isDraft && (
            <Badge className="absolute right-2 top-2 bg-card text-card-foreground opacity-90 hover:bg-card">
              Draft
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
