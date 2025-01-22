"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getInitials } from "@/libs/utils";
import { blogType } from "@/app/types/blogType";

function BlogItem({ blog }: { blog: blogType }) {
  return (
    <div className="flex w-full items-center gap-4 rounded-md">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={blog.imageUrl as string}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <Link
            href={`/read/${blog.blogId}`}
            className="block text-lg font-medium leading-tight hover:underline"
          >
            {blog.title}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {blog.content.slice(0, 100)}
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Avatar className="size-8">
            <AvatarImage
              src={blog.author.imageUrl}
              alt={blog.author.fullname}
            />
            <AvatarFallback>{getInitials(blog.author.fullname)}</AvatarFallback>
          </Avatar>
          <p className="text-xs text-muted-foreground">
            {blog.author.fullname}
          </p>
        </div>
      </div>
    </div>
  );
}

// Blog List Component
function TopBlogsList({ blogs }: { blogs: blogType[] }) {
  return (
    <div className="w-full space-y-4">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

// Loading Skeleton Component
function TopBlogsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-stretch space-x-4 rounded-md p-5 shadow-md"
        >
          <Skeleton className="h-20 w-1/4 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%]" />
            <div className="flex items-center space-x-2 pt-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main Component
export default function TopBlogs() {
  const [blogs, setBlogs] = useState<blogType[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/api/blog/top", {
          headers: { Authorization: getCookie("token") },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Card className="mx-auto w-full max-w-2xl p-5">
      <h1 className="mb-4 text-2xl font-semibold">Top Blogs</h1>
      <CardContent className="p-0">
        {loading ? (
          <TopBlogsLoading />
        ) : blogs && blogs.length > 0 ? (
          <TopBlogsList blogs={blogs} />
        ) : (
          <p className="text-center text-muted-foreground">
            No blogs found. Check back later!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
