"use client";

import { Button } from "../../ui/button";
import { LuStar as StarIcon } from "react-icons/lu";
import { GoStarFill as StaredIcon } from "react-icons/go";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { useState, useCallback, SetStateAction, Dispatch } from "react";

type starBtnPropsType = {
  isBlogStarred: boolean;
  setIsBlogStarred: Dispatch<SetStateAction<boolean>>;
  starCount: number;
  setStarCount: Dispatch<SetStateAction<number>>;
  blogId: string;
};
const StarBtn = ({
  isBlogStarred,
  setIsBlogStarred,
  starCount,
  setStarCount,
  blogId,
}: starBtnPropsType) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStar = useCallback(async () => {
    setIsLoading(true);
    setIsBlogStarred(true);
    setStarCount((prevCount) => prevCount + 1);
    try {
      await axiosInstance.post(
        `/api/blog/star/${blogId}`,
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        },
      );
    } catch (err) {
      setIsBlogStarred(false);
      setStarCount((prevCount) => prevCount - 1);
    } finally {
      setIsLoading(false);
    }
  }, [blogId]);

  const handleUnStar = useCallback(async () => {
    setIsLoading(true);
    setIsBlogStarred(false);
    setStarCount((prevCount) => prevCount - 1);
    try {
      await axiosInstance.delete(`/api/blog/star/${blogId}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
    } catch (err) {
      setIsBlogStarred(true);
      setStarCount((prevCount) => prevCount + 1);
    } finally {
      setIsLoading(false);
    }
  }, [blogId]);

  return (
    <Button
      onClick={isBlogStarred ? handleUnStar : handleStar}
      size="sm"
      variant="outline"
      disabled={isLoading}
      className="disabled:opacity-100"
    >
      {isBlogStarred ? <StaredIcon size={20} /> : <StarIcon size={20} />}
      <span>{starCount}</span>
    </Button>
  );
};

export default StarBtn;
