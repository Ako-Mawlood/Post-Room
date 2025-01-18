import { Trash as DeleteIcon } from "lucide-react";

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
        description: "The comment has been deleted successfully.",
      });
      setIsAlertOpen(false);
    } catch (err: any) {
      console.log("Error deleting comment: unexpected error occurred.");
      toast({
        variant: "destructive",
        title: "Failed to Delete Comment",
        description: "An unexpected error occurred while deleting the comment.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex justify-start rounded-sm font-normal text-red-500"
        >
          <DeleteIcon size={20} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="fw-80">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently delete this comment?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsCommentMenuOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending}
            type="button"
            variant="destructive"
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
