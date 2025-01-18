"use client";

import Link from "next/link";
import { LuDot as Dot } from "react-icons/lu";
import FollowBtn from "@/app/components/pages/read/FollowBtn";
import StarBtn from "@/app/components/pages/read/StarBtn";
import SaveBtn from "@/app/components/pages/read/SaveBtn";
import ShareBtn from "@/app/components/pages/read/ShareBtn";
import { formatDate, getInitials } from "@/libs/utils";
import { calculateReadingTime } from "@/libs/utils";
import { Dispatch, SetStateAction } from "react";
import { blogType } from "@/app/types/blogType";
import { getCookie } from "cookies-next";
import { LuPencil as EditIcon } from "react-icons/lu";
import { CircleEllipsis as MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import CommentSideBar from "./CommentSideBar";
import DeleteBlogBtn from "./DeleteBlogBtn";
import { Button } from "../../ui/button";

const InteractionBar = ({
  blog,
  isMyBlog,
  handleOpenAuthModal,
  isBlogStarred,
  setIsBlogStarred,
  starCount,
  setStarCount,
  isFollowed,
  setIsFollowed,
}: {
  blog: blogType;
  isMyBlog: boolean;
  handleOpenAuthModal: (isNewUser: boolean) => void;
  isBlogStarred: boolean;
  setIsBlogStarred: Dispatch<SetStateAction<boolean>>;
  isFollowed: boolean;
  setIsFollowed: Dispatch<SetStateAction<boolean>>;
  starCount: number;
  setStarCount: Dispatch<SetStateAction<number>>;
}) => {
  const token = getCookie("token");
  return (
    <section className="flex flex-col gap-4 py-6 sm:flex-row sm:justify-between md:items-center">
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
                  isFollowed={isFollowed}
                  setIsFollowed={setIsFollowed}
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
      <div className="flex items-center border-y py-4 text-accent-foreground sm:border-none">
        <StarBtn
          blogId={blog.blogId}
          isBlogStarred={isBlogStarred}
          setIsBlogStarred={setIsBlogStarred}
          starCount={starCount}
          setStarCount={setStarCount}
          handleOpenAuthModal={handleOpenAuthModal}
        />
        {token && (
          <CommentSideBar
            blogId={blog.blogId}
            fullname={blog.author.fullname}
            authorId={blog.author.id}
            imageUrl={blog.author.imageUrl}
            handleOpenAuthModal={handleOpenAuthModal}
          />
        )}

        <SaveBtn
          isSaved={blog.saved}
          blogId={blog.blogId}
          handleOpenAuthModal={handleOpenAuthModal}
        />
        <ShareBtn blogId={blog.blogId} />
        {isMyBlog && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-auto md:ml-0">
                <MenuIcon size={20} />
                <span className="hidden md:block">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 md:mr-0">
              <DropdownMenuItem>
                <Link className="flex gap-4" href={`/create/${blog.blogId}`}>
                  <EditIcon size={20} />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteBlogBtn blogId={blog.blogId} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </section>
  );
};

export default InteractionBar;
