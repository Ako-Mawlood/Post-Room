"use client"

import Search from "./Search"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar"
import {CgEricsson} from "react-icons/cg"
import {Button} from "../ui/button"
import {PiNotePencilLight as WriteIcon} from "react-icons/pi"
import {IoIosLogOut as LogoutIcon} from "react-icons/io"
import {IoPersonOutline as ProfileIcon} from "react-icons/io5"
import {IoBookmarkOutline as BookmarkIcon, IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import {ModeToggle} from "../ui/ModeToggle"
import {DropdownMenuGroup} from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-14 text-foreground font-PT px-6 border-b border-border">
      <div className="flex items-center gap-4">
        <Link href="/blogs" className="flex items-center text-primary font-bold text-md sm:text-2xl">
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>
        <Search />
      </div>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button variant="ghost">
          <Link className="flex gap-2 items-center font-normal" href="/">
            <WriteIcon size={20} />
            Write
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className=" cursor-pointer">
              <AvatarImage src="https://scontent.febl5-2.fna.fbcdn.net/v/t39.30808-6/274879156_2177696605718753_4655404325092292858_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LDZ-1TfT64AQ7kNvgEPvJNF&_nc_ht=scontent.febl5-2.fna&oh=00_AYCJP1XZLdZ3WLgvJJ4sm0igh_QZOpCnJE2osYXn1CL2FA&oe=66666DAA" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-6">
            <DropdownMenuLabel className="text-center text-lg pb-0">Sangar Mawlood</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs truncate py-0 font-normal text-center">
              Sangar.mawlood@gmail.com
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="profile" className="flex items-center">
                  <ProfileIcon className="size-6 mr-2" /> <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="write" className="flex items-center">
                  <WriteIcon className="size-6 mr-2" /> <span>Write blog</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="profile" className="flex items-center">
                  <BookmarkIcon className="size-6 mr-2" /> <span>Saved blogs</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="settings" className="flex items-center">
                  <SettingsIcon className="size-6 mr-2" /> <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogoutIcon className="size-6 mr-2" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
