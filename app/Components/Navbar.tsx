"use client"

import Search from "./pages/blogs/Search"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"
import {CgEricsson} from "react-icons/cg"
import {Button} from "./ui/button"
import {PiNotePencilLight as WriteIcon} from "react-icons/pi"
import {IoIosLogOut as LogoutIcon} from "react-icons/io"
import {IoPersonOutline as ProfileIcon} from "react-icons/io5"
import {IoBookmarkOutline as BookmarkIcon, IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import {ModeToggle} from "./ui/ModeToggle"
import axios from "../../libs/axios"
import {DropdownMenuGroup} from "@radix-ui/react-dropdown-menu"
import {currentUserType} from "../types/currentUserType"
import {useRouter} from "next/navigation"
import {Skeleton} from "../Components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {useEffect, useState} from "react"

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<currentUserType>()
  const router = useRouter()
  useEffect(() => {
    axios("/api/me", {headers: {Authorization: localStorage.getItem("token")}}).then((res) => {
      setCurrentUser(res.data)
    })
  }, [])

  return (
    <nav className="flex justify-between items-center h-14 text-foreground px-2 md:px-6 border-b border-border">
      <div className="flex items-center gap-4">
        <Link href="/blogs" className="flex items-center text-primary font-bold font-PT text-md sm:text-2xl">
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>
        <Search />
      </div>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button>
          <Link className="flex gap-2 px-1 items-center font-semibold" href="/write">
            Create
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {currentUser ? (
              <Avatar className=" cursor-pointer">
                <AvatarFallback>
                  {currentUser?.fullname
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => {
                      return word[0]
                    })
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-6">
            <DropdownMenuLabel className="text-center text-lg pb-0">
              {currentUser?.fullname}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs truncate py-0 font-normal text-center">
              {currentUser?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push(`/@${currentUser?.username}`)}>
                <ProfileIcon className="size-6 mr-2" /> <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/write")}>
                <WriteIcon className="size-6 mr-2" /> <span>Write blog</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push(`/@${currentUser?.username}?tab=saved-blogs`)}>
                <BookmarkIcon className="size-6 mr-2" /> <span>Saved blogs</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center">
                  <SettingsIcon className="size-6 mr-2" /> <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                localStorage.clear()
                router.push("/")
              }}
            >
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
