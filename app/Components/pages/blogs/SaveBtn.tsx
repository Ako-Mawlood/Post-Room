"use client";

import { Button } from "../../ui/button";
import { LuBookmark as SaveIcon } from "react-icons/lu";
import { IoBookmark as SavedIcon } from "react-icons/io5";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { useState, useCallback } from "react";
import clsx from "clsx";

const SaveBtn = ({
  isSaved,
  blogId,
  isMyBlog,
}: {
  isSaved: boolean;
  blogId: string;
  isMyBlog: boolean;
}) => {
  const [isBlogSaved, setIsBlogSaved] = useState(isSaved);
  const [isPending, setIsPending] = useState(false);
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

  if (isBlogSaved) {
    return (
      <Button
        onClick={handleUnSaveBlog}
        disabled={isPending}
        size="sm"
        variant="outline"
        className={clsx("disabled:opacity-100", { hidden: isMyBlog })}
      >
        <SavedIcon size={20} />
        <span className="hidden sm:block">Saved</span>
      </Button>
    );
  }
  return (
    <Button
      onClick={handleSaveBlog}
      disabled={isPending}
      size="sm"
      variant="outline"
      className={clsx("disabled:opacity-100", { hidden: isMyBlog })}
    >
      <SaveIcon size={20} />
      <span className="hidden sm:block">Save</span>
    </Button>
  );
};

export default SaveBtn;
