"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import axiosInstance from "@/libs/axiosInstance";
import Image from "next/image";
import { getCookie } from "cookies-next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { blogType } from "@/app/types/blogType";
import { sanitizeContent } from "@/libs/utils";

const TopBlogs = () => {
  const [topBlogs, setTopBlogs] = useState<blogType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopBlogs = async () => {
      try {
        const token = getCookie("token");

        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const res = await axiosInstance.get("/api/blog/top", {
          headers: { Authorization: token },
        });

        setTopBlogs(res.data);
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch top blogs",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopBlogs();
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Top blogs</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="mb-4 flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-xl bg-red-50 text-red-800">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full rounded-xl bg-background text-accent-foreground">
      <CardHeader>
        <CardTitle>Popular blogs</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {topBlogs.map((blog) => {
          const sanitizedContent = sanitizeContent(blog.content);
          const previewContent = sanitizedContent.slice(0, 80);

          return (
            <div
              key={blog.blogId}
              className="flex w-full items-center justify-between gap-2"
            >
              <div className="flex flex-col items-start justify-between">
                <Link href={`/read/${blog.blogId}`}>
                  <h1 className="line-clamp-2 text-lg font-bold hover:underline">
                    {blog.title}
                  </h1>
                </Link>
                <p className="line-clamp-2 w-full text-sm text-muted-foreground">
                  {previewContent}...
                </p>
              </div>

              {blog.imageUrl && (
                <div className="relative h-12 w-[100px] rounded-lg">
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    src={blog.imageUrl}
                    sizes="40px"
                    fill
                    alt="Blog image"
                  />
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TopBlogs;
