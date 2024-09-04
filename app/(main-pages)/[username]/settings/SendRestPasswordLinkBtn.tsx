"use client";

import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/Hooks/use-toast";

import axiosInstance from "@/libs/axiosInstance";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const SendResetLinkBtn = () => {
  const [isPending, setIsPending] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = getCookie("token");
        const currentUser = await getCurrentUser(token as string);
        setUserEmail(currentUser.email);
      } catch (error) {
        console.error("Failed to fetch user email", error);
      }
    };

    fetchUserEmail();
  }, []);

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
      className="rounded-md"
      onClick={handleSendResetPasswordLink}
      disabled={isPending}
      variant="secondary"
    >
      {isPending ? "Sending..." : "Send"}
    </Button>
  );
};

export default SendResetLinkBtn;