"use client";

import Link from "next/link";
import { LuMessageCircle as CommentIcon, LuDot as Dot } from "react-icons/lu";
import FollowBtn from "@/app/components/pages/read/FollowBtn";
import StarBtn from "@/app/components/pages/read/StarBtn";
import SaveBtn from "@/app/components/pages/read/SaveBtn";
import ShareBtn from "@/app/components/pages/read/ShareBtn";
import { formatDate, getInitials } from "@/libs/utils";
import { calculateReadingTime } from "@/libs/utils";
import { Dispatch, SetStateAction } from "react";
import { blogType } from "@/app/types/blogType";
import { getCookie } from "cookies-next";
import Comment from "./Comment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

const InteractionBar = ({
  blog,
  isMyBlog,
  handleOpenAuthModal,
  isBlogStarred,
  setIsBlogStarred,
  starCount,
  setStarCount,
  commentCount,
  setCommentCount,
}: {
  blog: blogType;
  isMyBlog: boolean;
  handleOpenAuthModal: (isNewUser: boolean) => void;
  isBlogStarred: boolean;
  setIsBlogStarred: Dispatch<SetStateAction<boolean>>;
  starCount: number;
  setStarCount: Dispatch<SetStateAction<number>>;
  commentCount: number;
  setCommentCount: Dispatch<SetStateAction<number>>;
}) => {
  const token = getCookie("token");
  return (
    <section className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Link
          onClick={() => !token && handleOpenAuthModal(true)}
          href={token ? `/@${blog.author.username}` : "#"}
        >
          <Avatar>
            <AvatarFallback>{getInitials(blog.author.fullname)}</AvatarFallback>
            <AvatarImage src={blog.author.imageUrl} />
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link
              className="text-xs font-semibold hover:underline"
              onClick={() => !token && handleOpenAuthModal(true)}
              href={token ? `/@${blog.author.username}` : "#"}
            >
              {blog.author.fullname}
            </Link>

            {!isMyBlog && (
              <>
                <Dot size={20} className="text-blue-500" />
                <FollowBtn
                  isFollowed={blog.following}
                  username={blog.author.username}
                  isMyBlog={isMyBlog}
                  handleOpenAuthModal={handleOpenAuthModal}
                />
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{formatDate(blog.createdAt)}</span>
            <Dot size={20} className="text-blue-500" />
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
          handleOpenAuthModal={handleOpenAuthModal}
        />
        <Comment
          blogId={blog.blogId}
          commentCount={commentCount}
          fullname={blog.author.fullname}
          imageUrl={blog.author.imageUrl}
          setCommentCount={setCommentCount}
          handleOpenAuthModal={handleOpenAuthModal}
        />
        <SaveBtn
          isSaved={blog.saved}
          blogId={blog.blogId}
          handleOpenAuthModal={handleOpenAuthModal}
        />
        <ShareBtn blogId={blog.blogId} />
      </div>
    </section>
  );
};

export default InteractionBar;
