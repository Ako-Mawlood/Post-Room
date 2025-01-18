"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { ImSpinner8 as Spinner } from "react-icons/im";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { LuTrash as DeleteIcon } from "react-icons/lu";
import axiosInstance from "@/libs/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "@/app/Hooks/use-toast";
import { getCookie } from "cookies-next";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogFooter } from "../../ui/dialog";

type Props = {
  blogId: string;
};
const DeleteBlogBtn = ({ blogId }: Props) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleDeleteBlog() {
    try {
      setIsPending(true);
      await axiosInstance.delete(`/api/blog/${blogId}`, {
        headers: { Authorization: getCookie("token") },
      });
      toast({
        title: "Blog deleted",
        description: "The blog has been deleted successfully.",
      });
      router.push("/blogs");
    } catch (err) {
      toast({
        title: "Could not delete blog",
        variant: "destructive",
        description: "An unexpected error occurred while deleting the blog.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex w-full gap-4 rounded-sm p-1 text-red-500 hover:bg-muted">
          <DeleteIcon size={20} />
          <span>Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently delete this blog?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            type="button"
            variant="destructive"
            onClick={handleDeleteBlog}
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

export default DeleteBlogBtn;
