"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
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

type BlogCardPropsType = {
  blogId: string;
};

type BlogData = {
  author: string;
  username: string;
  authorImageUrl: string | null;
  isSaved: boolean;
  blogImageUrl: string | null;
  categories: { category: { name: string } }[];
  title: string;
  content: string;
  createdAt: string;
  stars: number;
};

const BlogCard = ({ blogId }: BlogCardPropsType) => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/blogs/${blogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog data.");
        }

        const data: BlogData = await response.json();
        setBlogData(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!blogData) {
    return <p>No blog data available.</p>;
  }

  const {
    author,
    username,
    authorImageUrl,
    isSaved,
    blogImageUrl,
    categories,
    title,
    content,
    createdAt,
    stars,
  } = blogData;

  const sanitizedContent = content
    .replace(
      /[#*_~`>\-\+$begin:math:display$$end:math:display$$begin:math:text$$end:math:text$!]/g,
      "",
    )
    .replace(/\\n|\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const previewContent = sanitizedContent.slice(0, 200);

  return (
    <Card className="flex h-72 w-full flex-col items-start justify-between rounded-xl border border-border bg-background p-4">
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
            <h1 className="line-clamp-2 text-lg font-bold hover:underline">
              {title}
            </h1>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {previewContent}
          </p>
        </div>
        {blogImageUrl && (
          <div className="relative h-24 w-24 rounded-lg">
            <Image
              className="rounded-lg object-cover"
              src={blogImageUrl}
              sizes="96px"
              fill
              alt="Blog image"
            />
          </div>
        )}
      </CardContent>

      <div className="flex w-full items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span>{stars}</span> Stars
          <SaveBtn isSaved={isSaved} blogId={blogId} />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.category.name}
              variant="secondary"
              size="sm"
              className="truncate rounded-full py-1 text-xs"
            >
              {category.category.name}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
