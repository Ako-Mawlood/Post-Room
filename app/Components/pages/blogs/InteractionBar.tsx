"use client";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/Components/ui/avatar";
import { Button } from "@/app/Components/ui/button";
import { LuMessageCircle as CommentIcon, LuDot as Dot } from "react-icons/lu";
import FollowBtn from "@/app/Components/pages/blogs/FollowBtn";
import StarBtn from "@/app/Components/pages/blogs/StarBtn";
import SaveBtn from "@/app/Components/pages/blogs/SaveBtn";
import ShareBtn from "@/app/Components/pages/blogs/ShareBtn";
import { formatDate, getInitials } from "@/libs/utils";
import { calculateReadingTime } from "@/libs/utils";
import { useState } from "react";

type BlogMetaProps = {
  blog: {
    author: {
      username: string;
      fullname: string;
      imageUrl: string;
      id: number;
    };
    following: boolean;
    blogId: string;
    starred: boolean;
    _count: {
      stars: number;
      comments: number;
    };
    saved: boolean;
  };
  isMyBlog: boolean;
};

const InteractionBar = ({ blog, isMyBlog }: BlogMetaProps) => {
  const [isBlogStarred, setIsBlogStarred] = useState(blog.starred);
  const [starCount, setStarCount] = useState(blog._count.stars);
  return (
    <section className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        {" "}
        <Link href={`/@${blog.author.username}`}>
          <Avatar>
            <AvatarFallback>{getInitials(blog.author.fullname)}</AvatarFallback>
            <AvatarImage src={blog.author.imageUrl} />
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link
              href={`/@${blog.author.username}`}
              className="text-xs font-semibold hover:underline"
            >
              {blog.author.fullname}
            </Link>
            <Dot className="text-blue-500" />
            <FollowBtn
              isFollowed={blog.following}
              username={blog.author.username}
              isMyBlog={isMyBlog}
            />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{formatDate(blog.createdAt)}</span>
            <Dot className="text-blue-500" />
            <span>{calculateReadingTime(blog.content)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StarBtn
          blogId={blog.blogId}
          isBlogStarred={isBlogStarred}
          setIsBlogStarred={setIsBlogStarred}
          starCount={starCount}
          setStarCount={setStarCount}
        />
        <Button size="sm" variant="outline">
          <CommentIcon size={20} />
          <span>{blog._count.comments}</span>
        </Button>
        <SaveBtn
          isSaved={blog.saved}
          blogId={blog.blogId}
          isMyBlog={isMyBlog}
        />
        <ShareBtn blogId={blog.blogId} />
      </div>
    </section>
  );
};

export default InteractionBar;
