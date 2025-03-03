"use client";

import axiosInstance from "@/libs/axiosInstance";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get("access_token");

        if (token) {
          axiosInstance
            .post("api/oauth", { token, provider: "google" })
            .then((res) => {
              const isAccountExist = !!res.data.username;

              setCookie("token", res.headers.authorization, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
              });
              if (isAccountExist) {
                router.push("/blogs");
              } else {
                router.push("/account-setup");
              }
            })
            .catch((err) => {
              console.error("Error during authentication:", err);
            });
        }
      }
    }
  }, [router]);
};

export default AuthCallback;
