"use client";

import { createContext } from "react";

import { currentUserType } from "../types/currentUserType";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";

export const CurrentUserContext = createContext<currentUserType | null>(null);

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: currentUser,
    isError,
    error,
  } = useQuery<currentUserType | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = getCookie("token");
      if (!token) return null;
      const res = await axiosInstance("/api/me", {
        headers: { Authorization: token },
      });
      return res.data;
    },
    staleTime: 1 * 60 * 1000,
  });

  if (isError) {
    console.error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser ?? null}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
