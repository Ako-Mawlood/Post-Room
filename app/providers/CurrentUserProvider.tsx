"use client";

import { createContext, useEffect, useState } from "react";
import axios from "../../libs/axiosInstance";
import { currentUserType } from "../types/currentUserType";
import { getCookie } from "cookies-next";

export const CurrentUserContext = createContext<currentUserType | null>(null);
export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);
  const token = getCookie("token");

  if (!token) return;
  async function getCurrentUser() {
    try {
      const res = await axios("/api/me", { headers: { Authorization: token } });

      setCurrentUser(res.data);
    } catch (err: any) {
      console.error(err.response.data || "Failed to get user data");
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
