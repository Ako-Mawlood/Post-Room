"use client";

import axiosInstance from "@/libs/axiosInstance";

import { getCookie } from "cookies-next";
import { useCallback, useState, useContext } from "react";
import { Button } from "../../ui/button";
import { FollowContext } from "@/app/providers/FollowProvider";

type Props = {
  userId: number;
  username: string;
  handleOpenAuthModal?: (isNewUser: boolean) => void;
};
const FollowBtn = ({
  userId,
  username,
  handleOpenAuthModal = () => {},
}: Props) => {
  const [isPending, setIsPending] = useState(false);
  const context = useContext(FollowContext);
  const isUserFollowed = context?.followedUsers[userId];

  const token = getCookie("token");
  const handleFollow = useCallback(async () => {
    try {
      context?.handleUpdateFollowedUsers(userId, true);
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
      context?.handleUpdateFollowedUsers(userId, false);
    } finally {
      setIsPending(false);
    }
  }, [username]);

  const handleUnFollow = useCallback(async () => {
    try {
      context?.handleUpdateFollowedUsers(userId, false);

      setIsPending(true);
      await axiosInstance.delete(`/api/follow/${username}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
    } catch (err) {
      context?.handleUpdateFollowedUsers(userId, true);
    } finally {
      setIsPending(false);
    }
  }, [username]);

  if (isUserFollowed) {
    return (
      <button
        onClick={token ? handleUnFollow : () => handleOpenAuthModal(true)}
        disabled={isPending}
        className="h-7 rounded-full text-sm duration-200 disabled:opacity-100"
      >
        Followed
      </button>
    );
  }

  return (
    <Button
      onClick={token ? handleFollow : () => handleOpenAuthModal(true)}
      disabled={isPending}
      className="h-7 rounded-full text-sm duration-200 disabled:opacity-100"
    >
      Follow
    </Button>
  );
};

export default FollowBtn;
