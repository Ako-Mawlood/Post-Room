import Search from "./pages/blogs/Search";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CgEricsson as Logo } from "react-icons/cg";
import { Button } from "./ui/button";
import { PiNotePencilLight as WriteIcon } from "react-icons/pi";
import { IoPersonOutline as ProfileIcon } from "react-icons/io5";
import {
  IoBookmarkOutline as BookmarkIcon,
  IoSettingsOutline as SettingsIcon,
} from "react-icons/io5";
import { ModeToggle } from "./ui/ModeToggle";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogoutBtn from "./LogoutBtn";
import { getMenuItems } from "@/constants/menuItems";
import { currentUserType } from "../types/currentUserType";
import { getInitials } from "@/libs/utils";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { profileOwnerType } from "../types/profileOwnerType";

import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getProfileOwner } from "@/libs/getProfileOwner";

const Navbar = async () => {
  const token = getCookie("token", { cookies });
  const currentUser: currentUserType = await getCurrentUser(token as string);
  const profileOwner: profileOwnerType = await getProfileOwner(
    currentUser.username,
    token as string,
  );
  const menuItems = getMenuItems(currentUser);
  return (
    <nav className="flex h-14 w-full items-center justify-between border-b border-border px-2 text-foreground md:px-6">
      <Link
        href="/blogs"
        className="text-md flex items-center font-PT font-bold text-primary sm:text-2xl"
      >
        <Logo size={25} />
        <h1>Post-Room</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Search />
        <ModeToggle />
        <Button>
          <Link
            className="flex items-center gap-2 px-1 font-semibold"
            href="/create"
          >
            Create
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentUser ? (
              <Avatar className="cursor-pointer">
                <AvatarImage src={profileOwner.imageUrl} />
                <AvatarFallback>
                  {getInitials(currentUser.fullname)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 w-56">
            <DropdownMenuLabel className="pb-0 text-center text-lg">
              {currentUser?.fullname}
            </DropdownMenuLabel>

            <DropdownMenuLabel className="truncate py-0 text-center text-xs font-normal">
              {currentUser?.email}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            {/*Todo:Make drop down menu items constant */}
            <DropdownMenuGroup>
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <DropdownMenuItem>
                    <Image src={item.icon} width={25} height={25} alt="Icon" />
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
