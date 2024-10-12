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
  commentCount: number;
  setCommentCount: Dispatch<SetStateAction<number>>;
  fullname: string;
  imageUrl: string;
  handleOpenAuthModal: (isNewUser: boolean) => void;
};

const CommentSideBar = ({ blogId, commentCount, setCommentCount }: Props) => {
  const [editCommentIndex, setEditCommentIndex] = useState<null | number>(null);
  const { data: comments } = useQuery<CommentType[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosInstance(`api/blog/${blogId}/comment`);
      return res.data.reverse();
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
          currentUser={currentUser}
          commentCount={commentCount}
          comments={comments}
          setCommentCount={setCommentCount}
          blogId={blogId}
        />
        <section className="w-full">
          {comments &&
            comments.map((comment, index) => {
              const isCurrentUsersComment =
                comment.author.id === currentUser?.id;
              const isEditingComment = editCommentIndex === index;
              return (
                <Comment
                  isCurrentUsersComment={isCurrentUsersComment}
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
