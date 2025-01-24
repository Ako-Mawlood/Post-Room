"use client";

import { CiLogout as LogoutIcon } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/app/components/ui/dropdown-menu";
import { deleteCookie } from "cookies-next";

const LogoutBtn = () => {
  const router = useRouter();

  const deleteAllCookies = () => {
    const cookies = document.cookie.split("; ");
    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0];
      deleteCookie(cookieName);
    });
  };

  return (
    <DropdownMenuItem
      onClick={() => {
        deleteAllCookies();
        router.push("/");
      }}
    >
      <LogoutIcon className="mr-2 size-6" />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
};

export default LogoutBtn;
