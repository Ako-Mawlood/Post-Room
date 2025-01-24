"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/app/components/ui/sheet";
import axiosInstance from "@/libs/axiosInstance";
import { useContext, useState } from "react";
import { LuMessageCircle as CommentIcon } from "react-icons/lu";
import { Button } from "@/app/components/ui/button";
import AddComment from "./AddComment";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { CommentType } from "@/app/types/commentType";
import { CurrentUserContext } from "@/app/providers/CurrentUserProvider";

type Props = {
  blogId: string;
  fullname: string;
  imageUrl: string;
  authorId: number;

  handleOpenAuthModal: (isNewUser: boolean) => void;
};

const CommentSideBar = ({ blogId, authorId }: Props) => {
  const [editCommentIndex, setEditCommentIndex] = useState<null | number>(null);
  const currentUser = useContext(CurrentUserContext);
  const { data: comments } = useQuery<CommentType[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosInstance(`api/blog/${blogId}/comment`);
      return res.data;
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border-none" size="sm" variant="ghost">
          <CommentIcon size={20} />
          {comments?.length}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col items-start justify-start gap-4 overflow-auto"
        side="right"
      >
        <SheetTitle>Comments</SheetTitle>
        {currentUser && (
          <AddComment
            currentUser={currentUser}
            comments={comments}
            blogId={blogId}
          />
        )}

        <section className="w-full">
          {comments &&
            comments.map((comment, index) => {
              const isCommentOwner = comment.author.id === currentUser?.id;
              const isBlogAuthor = authorId === currentUser?.id;
              const isEditingComment = editCommentIndex === index;

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
