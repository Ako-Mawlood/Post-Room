import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";
import { Button } from "@/app/components/ui/button";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { useQueryClient } from "@tanstack/react-query";
import { ImSpinner8 as SpinnerIcon } from "react-icons/im";

import { toast } from "@/app/Hooks/use-toast";

type Props = {
  setHasEdited: Dispatch<SetStateAction<boolean>>;
  editCommentIndex: number | null;
  setEditCommentIndex: Dispatch<SetStateAction<number | null>>;
  initialCommentContent: string;
  commentId: number;
};

export const EditComment = ({
  setHasEdited,
  initialCommentContent,
  setEditCommentIndex,
  commentId,
}: Props) => {
  const [commentContent, setCommentContent] = useState(initialCommentContent);
  const [isPending, setIsPending] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();

  async function handleEditComment(e: FormEvent) {
    e.preventDefault();

    try {
      setIsPending(true);
      await axiosInstance.put(
        `/api/blog/comment/${commentId}`,
        { content: commentContent },
        { headers: { Authorization: getCookie("token") } },
      );
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      setEditCommentIndex(null);
      setHasEdited(true);
    } catch (err) {
      console.error("Failed to Edit comment", err);
      toast({
        variant: "destructive",
        title: "Edit Failed",
        description:
          "Something went wrong while Editing your comment. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  }

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textAreaRef.current) {
      const length = textAreaRef.current.value.length;

      textAreaRef.current?.focus();
      textAreaRef.current?.setSelectionRange(length, length);
    }
  }, []);

  return (
    <form onSubmit={handleEditComment}>
      <textarea
        className="h-[20vh] w-full resize-none border-none bg-transparent py-4 text-sm outline-none md:h-[15vh]"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="What are your thoughts"
        ref={textAreaRef}
      />
      <div className="flex w-full justify-end gap-2">
        <Button
          onClick={() => setEditCommentIndex(null)}
          variant="outline"
          type="reset"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          type="submit"
          disabled={
            isPending ||
            commentContent.length === 0 ||
            commentContent === initialCommentContent
          }
        >
          {isPending ? <SpinnerIcon className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};
