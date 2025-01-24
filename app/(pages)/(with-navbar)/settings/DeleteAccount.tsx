"use client";

import { Button } from "@/app/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import React, { useState } from "react";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { DialogHeader } from "@/app/components/ui/dialog";
import { toast } from "@/app/Hooks/use-toast";

type Props = {
  email: string;
};

const DeleteAccount = ({ email }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDeleteAccount() {
    try {
      setIsPending(true);
      axiosInstance.delete("/api/user", {
        headers: { Authorization: getCookie("token") },
      });
      toast({
        title: `Email sent to ${email}`,
        description: "Check your inbox to confirm account deletion.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to send email",
        description:
          "We couldn't send the confirmation email. Try again later.",
      });
      console.error("Failed to send deletion email");
    } finally {
      setIsPending(false);
      setIsModalOpen(false);
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 md:p-8">
      <div className="flex flex-col justify-between gap-2">
        <h1 className="font-semibold">Delete Your Account</h1>
        <p className="mr-10 text-sm text-muted-foreground">
          For security purposes and to prevent accidental deletion, we will send
          a confirmation link to your email. You must verify the link to delete
          your account permanently.
        </p>
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* Updated variable name */}
        <AlertDialogTrigger>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <DialogHeader className="text-left">
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              A confirmation link will be sent to your email. Please verify the
              link to proceed with deleting your account. This action is
              irreversible.
            </AlertDialogDescription>
          </DialogHeader>
          <AlertDialogFooter className="flex flex-row items-center justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send Email"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAccount;
