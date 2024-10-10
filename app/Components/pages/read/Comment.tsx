"use client";

import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import axiosInstance from "@/libs/axiosInstance";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LuMessageCircle as CommentIcon } from "react-icons/lu";
import { Button } from "../../ui/button";
import AddComment from "./AddComment";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { formatDate, getInitials } from "@/libs/utils";
import { useQuery } from "@tanstack/react-query";

type Props = {
  blogId: string;
  commentCount: number;
  setCommentCount: Dispatch<SetStateAction<number>>;
  fullname: string;
  imageUrl: string;
  handleOpenAuthModal: (isNewUser: boolean) => void;
};

const Comment = ({ blogId, commentCount, setCommentCount }: Props) => {
  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosInstance(`api/blog/${blogId}/comment`);
      return res.data;
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <CommentIcon size={20} />
          <span>{commentCount}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex h-full w-[400px] flex-col items-start justify-start gap-4 overflow-auto"
        side="right"
      >
        <h1 className="text-2xl">Comments</h1>
        <AddComment
          commentCount={commentCount}
          comments={comments}
          setCommentCount={setCommentCount}
          blogId={blogId}
        />
        <section className="w-full">
          {comments &&
            [...comments].reverse().map((comment) => (
              <div
                className="flex w-full flex-col gap-3 border-b py-4"
                key={comment.id}
              >
                <div className="flex gap-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={comment.author.imageUrl} />
                    <AvatarFallback>
                      {getInitials(comment.author.fullname)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{comment.author.fullname}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default Comment;
