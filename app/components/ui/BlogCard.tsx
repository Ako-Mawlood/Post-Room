"use client";

import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { formatDate, getInitials } from "@/libs/utils";
import { Button } from "@/app/components/ui/button";
import SaveBtn from "@/app/components/pages/read/SaveBtn";
import Link from "next/link";
import { sanitizeContent } from "@/libs/utils";

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
  isDraft: boolean;
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
  isDraft,
}: BlogCardPropsType) => {
  const sanitizedContent = sanitizeContent(content);
  const previewContent = sanitizedContent.slice(0, 200);
  const blogCard = (
    <Card className="flex h-64 w-full flex-col items-start justify-between gap-2 overflow-hidden rounded-xl bg-background p-4 sm:h-72">
      <CardHeader className="flex w-full flex-row items-center justify-start gap-2 p-0">
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

      <CardContent className="flex h-full w-full items-center justify-between gap-4 p-0">
        <div className="flex w-full flex-col gap-2">
          <Link href={isDraft ? `/create/${blogId}` : `/read/${blogId}`}>
            <h1 className="line-clamp-2 text-lg font-bold hover:underline">
              {title}
            </h1>
          </Link>
          <p className="line-clamp-2 w-full text-sm text-muted-foreground">
            {previewContent}
          </p>
        </div>
        {blogImageUrl && (
          <div className="relative h-24 w-52 rounded-lg">
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={blogImageUrl}
              sizes="96px"
              fill
              alt="Blog image"
            />
          </div>
        )}
      </CardContent>

      <div className="flex w-full items-center justify-between text-xs">
        {!isDraft && (
          <div className="flex items-center gap-1">
            <span>{stars}</span> Stars
            <SaveBtn isSaved={isSaved} blogId={blogId} />
          </div>
        )}

        <div className="flex gap-2 lg:hidden">
          {categories.slice(0, 2).map(({ category }) => (
            <Button
              key={category.name}
              variant="secondary"
              size="sm"
              className="truncate rounded-full py-0.5 text-[0.7rem]"
            >
              {category.name.length > 15
                ? category.name.slice(0, 15) + "..."
                : category.name}
            </Button>
          ))}
        </div>
        <div className="hidden gap-2 lg:flex">
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
      <div className="w-full">{blogCard}</div>
    </>
  );
};

export default BlogCard;
