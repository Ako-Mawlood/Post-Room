"use client";

import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/Hooks/use-toast";
import { currentUserType } from "@/app/types/currentUserType";
import axiosInstance from "@/libs/axiosInstance";
import { useState } from "react";
import { ImSpinner8 as Spinner } from "react-icons/im";

type Props = {
  currentUser: currentUserType;
};
const SendResetLinkBtn = ({ currentUser }: Props) => {
  const [isPending, setIsPending] = useState(false);

  const { toast } = useToast();
  if (!currentUser) return null;
  const userEmail = currentUser.email;

  const handleSendResetPasswordLink = async () => {
    setIsPending(true);
    try {
      await axiosInstance.post("/api/user/reset-password", {
        email: userEmail,
      });
      toast({
        title: "Link Sent",
        description: `We have sent a reset link to ${userEmail}. Please check your inbox.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send the reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      className="rounded-full"
      onClick={handleSendResetPasswordLink}
      disabled={isPending}
      variant="secondary"
    >
      {isPending ? <Spinner className="animate-spin" /> : "Send"}
    </Button>
  );
};

export default SendResetLinkBtn;
