"use client";

import { Button } from "@/app/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axiosInstance from "@/libs/axiosInstance";
import { deleteCookie, getCookie } from "cookies-next";

const DeleteAccount = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  function handleDeleteAccount() {
    try {
      setIsPending(true);
      axiosInstance.delete("/suser", {
        headers: { Authorization: getCookie("token") },
      });
      deleteCookie("token");
      router.push("/");
    } catch (err) {
      console.log("Deletion aborted");
    } finally {
      setIsPending(false);
    }
  }
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Account Deletion</h1>

      <div className="flex items-center justify-between border p-7">
        <div className="flex flex-col justify-between gap-2">
          <h1 className="font-semibold">Delete your account</h1>
          <p className="mr-10 text-sm text-muted-foreground">
            By clicking delete, your account, along with all your blogs and
            associated content, will be permanently removed. This action is
            irreversible, and all your posts will be deleted from our platform.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isPending}
                className="bg-destructive"
              >
                {isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default DeleteAccount;