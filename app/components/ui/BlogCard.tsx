"use client";

import { Card, CardHeader, CardContent } from "./card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { formatDate, getInitials } from "@/libs/utils";
import { Button } from "./button";
import SaveBtn from "../pages/read/SaveBtn";
import Link from "next/link";

type BlogCardPropsType = {
  author: string;
  username: string;
  authorId?: number;
  authorImageUrl: string | null;
  blogId: string;
  isSaved: boolean;
  blogImageUrl: string | null;
  categories: any;
  title: string;
  content: string;
  createdAt: string;
  stars: number;
};

const BlogCard = ({
  author,
  username,
  authorImageUrl,
  blogId,
  isSaved,
  blogImageUrl,
  categories,
  title,
  content,
  createdAt,
  stars,
}: BlogCardPropsType) => {
  const sanitizedContent = content
    .replace(/[#*_~`>\-\+\[\]\(\)!]/g, "")
    .replace(/\\n|\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const previewContent = sanitizedContent.slice(0, 200);
  return (
    <Card className="flex h-72 w-full flex-col items-start justify-between rounded-xl border border-border bg-background">
      <CardHeader className="flex w-full flex-row items-center justify-start gap-2">
        <Avatar>
          <AvatarFallback>{getInitials(author)}</AvatarFallback>
          <AvatarImage src={authorImageUrl || ""} />
        </Avatar>
        <div className="flex flex-col items-start justify-between">
          <span>{author}</span>
          <div className="flex gap-3">
            <span className="text-sm font-normal text-muted-foreground">
              @{username} . {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex h-fit w-full justify-between gap-4">
        <div className="flex flex-grow flex-col gap-2">
          <Link href={`/read/${blogId}`}>
            <h1 className="line-clamp-2 font-PT text-xl hover:underline md:text-2xl">
              {title}
            </h1>
          </Link>

          <p className="line-clamp-2 font-normal text-muted-foreground">
            {previewContent}
          </p>
        </div>
        {blogImageUrl && (
          <div className="relative h-24 w-[500px] rounded-lg">
            <Image
              className="rounded-lg object-cover"
              src={blogImageUrl}
              sizes="230px"
              fill={true}
              alt="Blog image"
            />
          </div>
        )}
      </CardContent>
      <div className="flex w-full items-center justify-between gap-2 px-5 pb-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="flex h-full w-fit items-center gap-1 text-sm">
            <span>{stars}</span>
            {" Stars"}
            <SaveBtn isSaved={isSaved} blogId={blogId} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {categories.map((category: { category: { name: string } }) => (
            <Button
              key={category.category.name}
              variant="secondary"
              size="sm"
              className="truncate rounded-full py-1 text-xs font-normal"
            >
              {category.category.name}
            </Button>
          ))}
        </div>
      </div>
      {/* 
     
        */}
    </Card>
  );
};

export default BlogCard;
