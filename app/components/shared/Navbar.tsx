"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CgEricsson as Logo } from "react-icons/cg";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutBtn from "./LogoutBtn";
import { getMenuItems } from "@/constants/menuItems";
import { getInitials } from "@/libs/utils";
import { getCookie } from "cookies-next";
import NotificationLog from "@/app/components/shared/NotificationLog";
import { CurrentUserContext } from "@/app/providers/CurrentUserProvider";

const Navbar = () => {
  const currentUser = useContext(CurrentUserContext);
  const token = getCookie("token");
  if (!token || !currentUser) return;
  const menuItems = getMenuItems(currentUser);
  return (
    <nav className="left-0 top-0 z-50 flex h-[5.5rem] w-full items-center justify-between border-b border-border bg-background p-6 md:px-6">
      <Link
        href="/blogs"
        className="text-mda flex items-center font-PT font-bold text-primary sm:text-2xl"
      >
        <Logo size={25} />
        <h1>Post-Room</h1>
      </Link>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <NotificationLog />
        <Button className="hidden sm:flex">
          <Link
            className="flex items-center gap-2 px-1 font-semibold"
            href="/create/"
          >
            Create
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={currentUser.imageUrl} />
              <AvatarFallback>
                {getInitials(currentUser.fullname)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 w-56">
            <DropdownMenuLabel className="pb-0 text-center text-lg">
              {currentUser.fullname}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="truncate py-0 text-center text-xs font-normal">
              {currentUser.email}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <DropdownMenuItem>
                    <item.icon className="size-8" />
                    <span className="ml-2">{item.label}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator />
              <LogoutBtn />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
