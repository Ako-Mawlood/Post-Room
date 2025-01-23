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

  async function getCurrentUser() {
    try {
      if (token) {
        const res = await axios("/api/me", {
          headers: { Authorization: token },
        });

        setCurrentUser(res.data);
      }
    } catch (err: any) {
      console.error("Failed to get user data");
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
