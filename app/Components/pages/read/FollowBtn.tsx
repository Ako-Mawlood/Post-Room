"use client";

import axiosInstance from "@/libs/axiosInstance";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { useCallback, useState,Dispatch, SetStateAction } from "react";
import { Button } from "../../ui/button";


const FollowBtn = ({
  isFollowed,
  setIsFollowed,
  username,
  isMyBlog,
  handleOpenAuthModal,
}: {
  isFollowed: boolean;
  setIsFollowed: Dispatch<SetStateAction<boolean>>
  username: string;
  isMyBlog: boolean;
  handleOpenAuthModal: (isNewUser: boolean) => void;
}) => {

  const [isPending, setIsPending] = useState(false);
  const token = getCookie("token");
  const handleFollow = useCallback(async () => {
    try {
      setIsFollowed(true);
      setIsPending(true);
      await axiosInstance.post(
        `/api/follow/${username}`,
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        },
      );
    } catch (err) {
      setIsFollowed(false);
    } finally {
      setIsPending(false);
    }
  }, [username]);

  const handleUnFollow = useCallback(async () => {
    try {
      setIsFollowed(false);
      setIsPending(true);
      await axiosInstance.delete(`/api/follow/${username}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
    } catch (err) {
      setIsFollowed(true);
    } finally {
      setIsPending(false);
    }
  }, [username]);

  if (isFollowed) {
    return (
      <button
        onClick={token ? handleUnFollow : () => handleOpenAuthModal(true)}
        disabled={isPending}
        className={clsx(
          "h-7 rounded-full text-sm duration-200 disabled:opacity-100",
          {
            hidden: isMyBlog,
          },
        )}
      >
        Followed
      </button>
    );
  }

  return (
    <Button
      onClick={token ? handleFollow : () => handleOpenAuthModal(true)}
      disabled={isPending}
      className={clsx(
        "h-7 rounded-full text-sm duration-200 disabled:opacity-100",
        {
          hidden: isMyBlog,
        },
      )}
    >
      Follow
    </Button>
  );
};

export default FollowBtn;
