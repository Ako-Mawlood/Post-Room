"use client";

import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import axiosInstance from "@/libs/axiosInstance";
import { Dispatch, SetStateAction, useState } from "react";
import { LuMessageCircle as CommentIcon } from "react-icons/lu";
import { Button } from "../../ui/button";
import AddComment from "./AddComment";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { getCookie } from "cookies-next";
import { currentUserType } from "@/app/types/currentUserType";
import { CommentType } from "@/app/types/commentType";

type Props = {
  blogId: string;
  fullname: string;
  imageUrl: string;
  authorId: number;
  handleOpenAuthModal: (isNewUser: boolean) => void;
};

const CommentSideBar = ({ blogId, authorId }: Props) => {
  const [editCommentIndex, setEditCommentIndex] = useState<null | number>(null);
  const { data: comments } = useQuery<CommentType[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosInstance(`api/blog/${blogId}/comment`);
      return res.data;
    },
  });
  const { data: currentUser } = useQuery<currentUserType>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosInstance("/api/me", {
        headers: { Authorization: getCookie("token") },
      });
      return res.data;
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border-none" size="sm" variant="ghost">
          <CommentIcon size={20} />
          <span>{comments?.length}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col items-start justify-start gap-4 overflow-auto"
        side="right"
      >
        <h1 className="text-2xl">Comments</h1>
        <AddComment
          currentUser={currentUser}
          comments={comments}
          blogId={blogId}
        />
        <section className="w-full">
          {comments &&
            comments.map((comment, index) => {
              const isCommentOwner = comment.author.id === currentUser?.id;
              const isBlogAuthor = authorId === currentUser?.id;
              const isEditingComment = editCommentIndex === index;
              console.log(comment);
              return (
                <Comment
                  key={comment.id}
                  isCommentOwner={isCommentOwner}
                  isBlogAuthor={isBlogAuthor}
                  index={index}
                  comment={comment}
                  isEditingComment={isEditingComment}
                  editCommentIndex={editCommentIndex}
                  setEditCommentIndex={setEditCommentIndex}
                />
              );
            })}
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSideBar;
