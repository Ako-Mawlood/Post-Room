"use client";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import axiosInstance from "@/libs/axiosInstance";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LuMessageCircle as CommentIcon } from "react-icons/lu";
import { Button } from "../../ui/button";
import { getInitials } from "@/libs/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { getCookie } from "cookies-next";
import { ImSpinner8 as Spinner } from "react-icons/im";

const Comment = ({
  blogId,
  commentCount,
  setCommentCount,
  fullname,
  imageUrl,
}: {
  blogId: string;
  commentCount: number;
  setCommentCount: Dispatch<SetStateAction<number>>;
  fullname: string;
  imageUrl: string;
  handleOpenAuthModal: (isNewUser: boolean) => void;
}) => {
  const [comments, setComments] = useState<undefined>(undefined);
  const [commentContent, setCommentContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const token = getCookie("token");
  useEffect(() => {
    axiosInstance(`api/blog/${blogId}/comment`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  function handleAddComment(e: FormEvent) {
    if (!token) {
      return null;
    }
    e.preventDefault();
    setIsPending(true);
    axiosInstance
      .post(
        `/api/blog/${blogId}/comment`,
        { content: commentContent },
        { headers: { Authorization: getCookie("token") } },
      )
      .then(() => {
        setCommentCount((prevcommentCount) => prevcommentCount + 1);
        setCommentContent("");
      })
      .catch(() => {
        setCommentCount((prevcommentCount) => prevcommentCount - 1);
      })
      .finally(() => {
        setIsPending(false);
      });
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <CommentIcon size={20} />
          <span>{commentCount}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex h-full w-[400px] flex-col items-start justify-start gap-4"
        side="right"
      >
        <h1 className="text-2xl">Comments</h1>
        {token && (
          <form
            onSubmit={handleAddComment}
            className="m-2 flex w-full flex-col gap-4 bg-card p-4 shadow-md"
          >
            <div className="flex w-full flex-row items-center gap-3">
              <Avatar>
                <AvatarFallback>{getInitials(fullname)}</AvatarFallback>
                <AvatarImage src={imageUrl} />
              </Avatar>
              <span className="text-sm">{fullname}</span>
            </div>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="What are your thoughts?"
              className="resize-none p-2 text-sm outline-none"
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
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Comment;
