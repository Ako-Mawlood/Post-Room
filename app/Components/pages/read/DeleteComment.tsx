import { CiTrash as DeleteIcon } from "react-icons/ci";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import axiosInstance from "@/libs/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/Hooks/use-toast";
import { ImSpinner8 as Spinner } from "react-icons/im";
import { getCookie } from "cookies-next";
import { Button } from "../../ui/button";

type Props = {
  commentId: number;
  setIsCommentMenuOpen: Dispatch<SetStateAction<boolean>>;
};
const DeleteComment = ({ commentId, setIsCommentMenuOpen }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const queryClient = useQueryClient();
  async function handleDeleteComment() {
    try {
      setIsPending(true);
      await axiosInstance.delete(`/api/blog/comment/${commentId}`, {
        headers: { Authorization: getCookie("token") },
      });
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      setIsCommentMenuOpen(false);
      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted.",
      });
      setIsAlertOpen(false);
    } catch (err: any) {
      console.log("Error deleting comment: unexpected error occurred.");
      toast({
        variant: "destructive",
        title: "Failed to Delete Comment",
        description: "unexpected error occurred.",
      });
    } finally {
      setIsPending(false);
    }
  }
  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-1">
          <DeleteIcon className="mr-2 size-6" />
          <span>Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-80">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
          <AlertDialogDescription>
            Delete your comment permanently?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="w-20"
            disabled={isPending}
            type="button"
            onClick={handleDeleteComment}
          >
            {isPending ? (
              <Spinner className="animate-spin" />
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComment;
