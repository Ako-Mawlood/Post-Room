"use client";

import axiosInstance from "@/libs/axiosInstance";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { useCallback, useState } from "react";

const FollowBtn = ({
  isFollowed,
  username,
  isMyBlog,
  handleOpenAuthModal,
}: {
  isFollowed: boolean;
  username: string;
  isMyBlog: boolean;
  handleOpenAuthModal: (isNewUser: boolean) => void;
}) => {
  const [isAuthorFollowed, setIsAuthorFollowed] = useState(isFollowed);
  const [isPending, setIsPending] = useState(false);
  const token = getCookie("token");
  const handleFollow = useCallback(async () => {
    try {
      setIsAuthorFollowed(true);
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
      setIsAuthorFollowed(false);
    } finally {
      setIsPending(false);
    }
  }, [username]);

  const handleUnFollow = useCallback(async () => {
    try {
      setIsAuthorFollowed(false);
      setIsPending(true);
      await axiosInstance.delete(`/api/follow/${username}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
    } catch (err) {
      setIsAuthorFollowed(true);
    } finally {
      setIsPending(false);
    }
  }, [username]);

  if (isAuthorFollowed) {
    return (
      <button
        onClick={token ? handleUnFollow : () => handleOpenAuthModal(true)}
        disabled={isPending}
        className={clsx(
          "h-8 rounded-full text-sm duration-200 disabled:opacity-100",
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
    <button
      onClick={token ? handleFollow : () => handleOpenAuthModal(true)}
      disabled={isPending}
      className={clsx(
        "h-8 text-sm text-blue-500 duration-200 disabled:opacity-100",
        {
          hidden: isMyBlog,
        },
      )}
    >
      Follow
    </button>
  );
};

export default FollowBtn;
