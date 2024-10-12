"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { formatDate, getInitials } from "@/libs/utils";
import { CommentType } from "@/app/types/commentType";
import { EditComment } from "./EditComment";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import {
  CiMenuKebab as MenuIcon,
  CiEdit as EditIcon,
  CiTrash as DeleteIcon,
} from "react-icons/ci";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

type Props = {
  isCurrentUsersComment: boolean;
  index: number;
  comment: CommentType;
  isEditingComment: boolean;
  editCommentIndex: number | null;
  setEditCommentIndex: Dispatch<SetStateAction<number | null>>;
};
const Comment = ({
  isCurrentUsersComment,
  index,
  comment,
  isEditingComment,
  editCommentIndex,
  setEditCommentIndex,
}: Props) => {
  return (
    <div className="relative">
      {isCurrentUsersComment && (
        <Popover>
          <PopoverTrigger className="absolute right-4 top-4">
            <MenuIcon size={20} />
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col gap-2 border bg-card p-3 text-sm shadow-sm"
            align="end"
          >
            <button
              className="flex items-center gap-1"
              onClick={() => setEditCommentIndex(index)}
            >
              <EditIcon className="mr-2 size-6" />
              <span>Edit</span>
            </button>

            <button className="flex items-center gap-1">
              <DeleteIcon className="mr-2 size-6" />
              <span>Delete</span>
            </button>
          </PopoverContent>
        </Popover>
      )}

      <div
        className={clsx("flex w-full flex-col gap-3 border-b py-4", {
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
            <p className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>
        {isEditingComment ? (
          <EditComment
            editCommentIndex={editCommentIndex}
            setEditCommentIndex={setEditCommentIndex}
            initialCommentContent={comment.content}
            commentId={comment.id}
          />
        ) : (
          <p className="text-sm">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
