"use client";

import { Button } from "../../ui/button";
import { LuBookmark as SaveIcon } from "react-icons/lu";
import { IoBookmark as SavedIcon } from "react-icons/io5";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { useState, useCallback } from "react";

const SaveBtn = ({
  isSaved,
  blogId,
  handleOpenAuthModal = () => {},
}: {
  isSaved: boolean;
  blogId: string;
  handleOpenAuthModal?: (isNewUser: boolean) => void;
}) => {
  const [isBlogSaved, setIsBlogSaved] = useState(isSaved);
  const [isPending, setIsPending] = useState(false);
  const token = getCookie("token");
  const handleSaveBlog = useCallback(async () => {
    try {
      setIsBlogSaved(true);
      setIsPending(true);
      await axiosInstance.post(
        `/api/list/blog/${blogId}`,
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        },
      );
    } catch (err) {
      setIsBlogSaved(false);
    } finally {
      setIsPending(false);
    }
  }, [blogId]);

  const handleUnSaveBlog = useCallback(async () => {
    try {
      setIsBlogSaved(false);
      setIsPending(true);
      await axiosInstance.delete(`/api/list/blog/${blogId}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
    } catch (err) {
      setIsBlogSaved(true);
    } finally {
      setIsPending(false);
    }
  }, [blogId]);

  if (!token) {
    return (
      <Button
        onClick={() => handleOpenAuthModal(true)}
        disabled={isPending}
        size="sm"
        variant="ghost"
        className="text-xs disabled:opacity-100"
      >
        <SaveIcon size={20} />
        <span className="hidden sm:block">Save</span>
      </Button>
    );
  }

  if (isBlogSaved) {
    return (
      <Button
        onClick={handleUnSaveBlog}
        disabled={isPending}
        variant="ghost"
        size="sm"
        className="disabled:opacity-100"
      >
        <SavedIcon size={20} />
        Saved
      </Button>
    );
  }

  return (
    <Button
      onClick={handleSaveBlog}
      disabled={isPending}
      variant="ghost"
      size="sm"
      className="disabled:opacity-100"
    >
      <SaveIcon size={20} />
      Save
    </Button>
  );
};

export default SaveBtn;
