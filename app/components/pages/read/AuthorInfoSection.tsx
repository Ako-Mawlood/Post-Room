import { profileOwnerType } from "@/app/types/profileOwnerType";

import { getInitials } from "@/libs/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { getCookie } from "cookies-next";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
import BlogCard from "../../ui/BlogCard";
import axiosInstance from "@/libs/axiosInstance";
import { notFound } from "next/navigation";

async function getUserByUsername(username: string, token: string) {
  try {
    const res = await axiosInstance(`/api/user/${username}`, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err: any) {
    if (err.status === 404) {
      notFound();
    }
  }
}
const AuthorInfoSection = ({
  authorUsername,
  handleOpenAuthModal,
}: {
  authorUsername: string;
  handleOpenAuthModal: (isNewUser: boolean) => void;
  isFollowed: boolean;
  setIsFollowed: Dispatch<SetStateAction<boolean>>;
  isMyBLog: boolean;
}) => {
  const [authorInfo, setAuthorInfo] = useState<profileOwnerType | undefined>(
    undefined,
  );
  const token = getCookie("token");

  useEffect(() => {
    getUserByUsername(authorUsername, token as string).then(
      (data: profileOwnerType) => {
        setAuthorInfo(data);
      },
    );
  }, [authorUsername, token]);
  if (!token) {
    return null;
  }
  return (
    authorInfo && (
      <section className="mx-auto mt-4 flex w-full flex-col gap-6">
        <h1 className="text-4xl">
          <span className="text-muted-foreground">Written by </span>
          {authorInfo.fullname}
        </h1>

        <section className="my-6 flex w-full flex-col items-start gap-3 rounded-lg py-6">
          <div className="flex flex-col gap-2">
            <div className="flex h-full items-center gap-5">
              <Link href={`/@${authorInfo.username}`}>
                <Avatar className="size-20">
                  <AvatarFallback>
                    {getInitials(authorInfo.fullname)}
                  </AvatarFallback>
                  <AvatarImage src={authorInfo.imageUrl} />
                </Avatar>
              </Link>
              <div className="flex flex-col items-start gap-5">
                <div className="flex w-full items-start gap-4">
                  <Link
                    className="truncate hover:underline"
                    href={`/@${authorInfo.username}`}
                  >
                    {authorInfo.fullname}
                  </Link>
                  <FollowBtn
                    username={authorInfo.username}
                    userId={authorInfo.id}
                    handleOpenAuthModal={handleOpenAuthModal}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 text-sm">
                  <p className="truncate text-muted-foreground">
                    {authorInfo._count.followers} Followers
                  </p>{" "}
                  <p className="text-muted-foreground">
                    {authorInfo._count.followed} Followings
                  </p>
                  <p className="text-muted-foreground">
                    {authorInfo.blogs.length} Blogs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foregoround">{authorInfo.bio}</p>
        </section>
        <h1 className="text-3xl text-muted-foreground">
          All from <span className="text-primary">{authorInfo.fullname}</span>
        </h1>
        <section className="flex w-full flex-col gap-4">
          {authorInfo.blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              author={authorInfo.fullname}
              authorImageUrl={authorInfo.imageUrl}
              blogId={blog.blogId}
              username={authorInfo.username}
              isSaved={blog.saved}
              blogImageUrl={blog.imageUrl}
              categories={blog.categories}
              title={blog.title}
              content={blog.content}
              createdAt={blog.createdAt}
              stars={blog._count.stars}
            />
          ))}
        </section>
      </section>
    )
  );
};

export default AuthorInfoSection;
