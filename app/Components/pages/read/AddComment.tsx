"use client";

import { getCookie } from "cookies-next";
import axiosInstance from "@/libs/axiosInstance";
import { Dispatch, SetStateAction, useState, FormEvent } from "react";
import { Button } from "../../ui/button";
import { getInitials } from "@/libs/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { ImSpinner8 as Spinner } from "react-icons/im";
import { toast } from "@/app/Hooks/use-toast";
import { CommentType } from "@/app/types/commentType";
import { useQueryClient } from "@tanstack/react-query";
import { currentUserType } from "@/app/types/currentUserType";

type Props = {
  currentUser: currentUserType | undefined;
  comments: CommentType[] | undefined;
  blogId: string;
};

const AddComment = ({ currentUser, blogId }: Props) => {
  const token = getCookie("token");
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  async function addComment(e: FormEvent) {
    e.preventDefault();
    try {
      setIsPending(true);

      await axiosInstance.post(
        `/api/blog/${blogId}/comment`,
        { content: commentContent },
        { headers: { Authorization: token } },
      );

      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      setCommentContent("");
    } catch (err) {
      console.error("Failed to add comment", err);
      toast({
        variant: "destructive",
        title: "Comment Failed",
        description:
          "Something went wrong while adding your comment. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  }
  if (!token) {
    return null;
  }

  return (
    <>
      <form
        onSubmit={addComment}
        className="m-2 flex w-full flex-col gap-4 bg-background p-4 shadow-md"
      >
        <div className="flex w-full flex-row items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {getInitials(currentUser?.fullname as string)}
            </AvatarFallback>
            {/* ToDo:Add imageUrl to currentUser in backend */}
            <AvatarImage src={""} />
          </Avatar>
          <span className="text-sm">{currentUser?.fullname}</span>
        </div>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="What are your thoughts?"
          className="resize-none bg-background p-2 text-sm outline-none"
          rows={4}
        ></textarea>
        <Button
          className="ml-auto w-24"
          disabled={isPending || !commentContent}
          type="submit"
        >
          {isPending ? (
            <Spinner className="animate-spin" />
          ) : (
            <span>Comment</span>
          )}
        </Button>
      </form>
    </>
  );
};

export default AddComment;
