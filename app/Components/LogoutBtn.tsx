"use client";

import { CiLogout as LogoutIcon } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { deleteCookie } from "cookies-next";

const LogoutBtn = () => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => {
        deleteCookie("token");
        router.push("/");
      }}
    >
      <LogoutIcon className="mr-2 size-6" />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
};

export default LogoutBtn;
