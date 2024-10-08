import { profileOwnerType } from "@/app/types/profileOwnerType";
import { getUserByUsername } from "@/libs/getUserByUsername";
import { getInitials } from "@/libs/utils";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FollowBtn from "./FollowBtn";

const AuthorBlogs = ({
  authorUsername,
  handleOpenAuthModal,
  isFollowed,
  isMyBLog,
}: {
  authorUsername: string;
  handleOpenAuthModal: (isNewUser: boolean) => void;
  isFollowed: boolean;
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

  if (!authorInfo?.blogs) {
    return null;
  }

  return (
    <main className="mx-auto flex w-full flex-col gap-6 p-6 md:w-[880px]">
      <h1 className="text-3xl text-muted-foreground">
        All from <span className="text-primary">{authorInfo.fullname}</span>
      </h1>
      <section className="flex w-full flex-wrap justify-center gap-4">
        {authorInfo.blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/read/${blog.blogId}`}
            className="relative flex h-80 w-full flex-col gap-2 p-4 hover:bg-accent md:w-[24rem]"
          >
            <div className="relative h-80 w-full">
              <Image
                className="rounded-lg object-cover"
                src={
                  blog.imageUrl ||
                  "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                }
                fill={true}
                quality={100}
                alt="Blog image"
              />
            </div>
            <div className="flex gap-2 text-sm">
              {blog.categories.map((category) => (
                <span className="truncate" key={category.blogId}>
                  #{category.category.name}
                </span>
              ))}
            </div>

            <h1 className="font-PT text-xl">{blog.title}</h1>
          </Link>
        ))}
      </section>
      <section className="my-6 mt-6 flex items-center justify-around gap-3 rounded-lg border-b py-6">
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
                  handleOpenAuthModal={handleOpenAuthModal}
                  isFollowed={isFollowed}
                  isMyBlog={isMyBLog}
                />
              </div>

              <div className="flex w-full items-center justify-between gap-2 text-sm">
                <p className="truncate text-muted-foreground">
                  {authorInfo._count.followers} Followers
                </p>{" "}
                <p className="mr-auto truncate text-muted-foreground">
                  {authorInfo._count.followed} Followings
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foregoround w-80">{authorInfo.bio}</p>
      </section>
    </main>
  );
};

export default AuthorBlogs;
