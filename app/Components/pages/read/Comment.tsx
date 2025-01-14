"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { formatDate, getInitials } from "@/libs/utils";
import { CommentType } from "@/app/types/commentType";
import { EditComment } from "./EditComment";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { CiMenuKebab as MenuIcon, CiEdit as EditIcon } from "react-icons/ci";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import DeleteComment from "./DeleteComment";

type Props = {
  isCommentOwner: boolean;
  isBlogAuthor: boolean;
  index: number;
  comment: CommentType;
  isEditingComment: boolean;
  editCommentIndex: number | null;
  setEditCommentIndex: Dispatch<SetStateAction<number | null>>;
};
const Comment = ({
  isCommentOwner,
  isBlogAuthor,
  index,
  comment,
  isEditingComment,
  editCommentIndex,
  setEditCommentIndex,
}: Props) => {
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [hasEdited, setHasEdited] = useState(
    comment.createdAt !== comment.updatedAt,
  );
  return (
    <div className="relative">
      {(isCommentOwner || isBlogAuthor) && (
        <Popover open={isCommentMenuOpen} onOpenChange={setIsCommentMenuOpen}>
          <PopoverTrigger className="absolute right-4 top-4">
            <MenuIcon size={20} />
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col gap-2 border bg-card p-3 text-sm shadow-sm"
            align="end"
          >
            {isCommentOwner && (
              <button
                className="flex items-center gap-1"
                onClick={() => setEditCommentIndex(index)}
              >
                <EditIcon className="mr-2 size-6" />
                <span>Edit</span>
              </button>
            )}

            <DeleteComment
              commentId={comment.id}
              setIsCommentMenuOpen={setIsCommentMenuOpen}
            />
          </PopoverContent>
        </Popover>
      )}

      <div
        className={clsx("flex w-full flex-col border-b py-4", {
          isEditingComment: "border-black bg-green-300 pb-0",
        })}
        key={comment.id}
      >
        <div className="flex gap-3">
          <Avatar className="cursor-pointer">
            <AvatarImage src={comment?.author?.imageUrl} />
            <AvatarFallback>
              {getInitials(comment.author.fullname)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              className="hover:underline"
              href={`/@${comment.author.username}`}
            >
              {comment.author.fullname}
            </Link>
            <div className="flex gap-3">
              <p className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </p>
              {hasEdited && (
                <p className="text-xs text-muted-foreground">(Edited)</p>
              )}
            </div>
          </div>
        </div>
        {isEditingComment ? (
          <EditComment
            setHasEdited={setHasEdited}
            editCommentIndex={editCommentIndex}
            setEditCommentIndex={setEditCommentIndex}
            initialCommentContent={comment.content}
            commentId={comment.id}
          />
        ) : (
          <>
            {showFullContent || comment.content.length <= 200 ? (
              <p className="mt-2 text-sm">{comment.content}</p>
            ) : (
              <p className="mt-2 text-sm">{comment.content.slice(0, 200)}...</p>
            )}

            {comment.content.length > 200 && (
              <button
                className="w-fit text-sm text-blue-500"
                onClick={() => setShowFullContent((prev) => !prev)}
              >
                {showFullContent ? "Show Less" : "Read More"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
