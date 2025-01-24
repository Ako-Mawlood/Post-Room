"use client";

import { createContext, useState } from "react";
type FollowedUsersType = Record<number, boolean>;

type FollowContextType = {
  followedUsers: FollowedUsersType;
  handleUpdateFollowedUsers: (userId: number, action: boolean) => void;
};
export const FollowContext = createContext<FollowContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
  defaultFollowedUsers: { [userId: number]: boolean };
};
const FollowProvider = ({ children, defaultFollowedUsers }: Props) => {
  if (FollowContext === undefined)
    throw new Error("useFollow must be used within a FollowProvider");

  const [followedUsers, setFollowedUsers] =
    useState<FollowedUsersType>(defaultFollowedUsers);
  function handleUpdateFollowedUsers(userId: number, action: boolean) {
    setFollowedUsers((prev) => {
      return { ...prev, [userId]: action };
    });
  }

  return (
    <FollowContext.Provider
      value={{ followedUsers, handleUpdateFollowedUsers }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export default FollowProvider;
