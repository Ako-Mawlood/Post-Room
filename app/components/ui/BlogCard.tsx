"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { formatDate, getInitials } from "@/libs/utils";
import { Button } from "@/app/components/ui/button";
import SaveBtn from "../pages/read/SaveBtn";
import Link from "next/link";
import BlogContent from "../shared/BlogContent";

type BlogCardPropsType = {
  author: string;
  username: string;
  authorId?: number;
  authorImageUrl: string | null;
  blogId: string;
  isSaved: boolean;
  blogImageUrl: string | null;
  categories: { category: { name: string } }[];
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
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*{1,2}|~{2})(.*?)\1/g, "$2")
    .replace(/\[([^\]]+)]\([^\)]+\)/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\$+.*?\$+/g, "")
    .replace(/^>\s+/gm, "")
    .replace(/^([-*+]|\d+\.)\s+/gm, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const previewContent = sanitizedContent.slice(0, 200);
  const blogCard = (
    <Card className="flex h-72 w-full flex-col items-start justify-between rounded-xl border border-border bg-background">
      <CardHeader className="flex w-full flex-row items-center justify-start gap-2">
        <Avatar>
          <AvatarFallback>{getInitials(author)}</AvatarFallback>
          <AvatarImage src={authorImageUrl || ""} />
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="font-semibold">{author}</span>
          <span className="text-sm text-muted-foreground">
            @{username} · {formatDate(createdAt)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex h-full w-full justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link href={`/read/${blogId}`}>
            <h1 className="text-lg font-bold hover:underline">{title}</h1>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {previewContent}
          </p>
        </div>
        {blogImageUrl && (
          <div className="relative h-24 w-96 rounded-lg">
            <Image
              className="w-96 rounded-lg object-cover"
              src={blogImageUrl}
              sizes="96px"
              fill
              alt="Blog image"
            />
          </div>
        )}
      </CardContent>

      <div className="flex w-full items-center justify-between p-4 text-xs">
        <div className="flex items-center gap-1">
          <span>{stars}</span> Stars
          <SaveBtn isSaved={isSaved} blogId={blogId} />
        </div>

        <div className="flex gap-2 md:hidden">
          {categories.slice(0, 2).map(({ category }) => (
            <Button
              key={category.name}
              variant="secondary"
              size="sm"
              className="truncate rounded-full py-1 text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="hidden gap-2 md:flex">
          {categories.map(({ category }) => (
            <Button
              key={category.name}
              variant="secondary"
              size="sm"
              className="truncate rounded-full py-1 text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
  return (
    <>
      <Link className="w-full md:hidden" href={`/read/${blogId}`}>
        {blogCard}
      </Link>
      <div className="hidden md:block">{blogCard}</div>
    </>
  );
};

export default BlogCard;
