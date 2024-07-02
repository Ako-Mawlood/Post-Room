import Search from "./pages/blogs/Search"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"
import {CgEricsson as Logo} from "react-icons/cg"
import {Button} from "./ui/button"
import {PiNotePencilLight as WriteIcon} from "react-icons/pi"
import {IoPersonOutline as ProfileIcon} from "react-icons/io5"
import {IoBookmarkOutline as BookmarkIcon, IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import {ModeToggle} from "./ui/ModeToggle"
import axiosInstance from "@/libs/axiosInstance"
import {Skeleton} from "../Components/ui/skeleton"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import LogoutBtn from "./LogoutBtn"
import {getMenuItems} from "@/constants/menuItems"
import {currentUserType} from "../types/currentUserType"

async function getCurrentUser() {
  const res = await axiosInstance("/api/me", {headers: {Authorization: getCookie("token", {cookies})}})
  return res.data
}
const Navbar = async () => {
  const currentUser: currentUserType = await getCurrentUser()
  const menuItems = getMenuItems(currentUser)
  return (
    <nav className="flex justify-between items-center w-full h-14 text-foreground px-2 md:px-6 border-b border-border">
      <div className="flex items-center gap-4">
        <Link href="/blogs" className="flex items-center text-primary font-bold font-PT text-md sm:text-2xl">
          <Logo size={25} />
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
          <DropdownMenuTrigger>
            {currentUser ? (
              <Avatar className=" cursor-pointer">
                <AvatarImage src="/" />
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
          <DropdownMenuContent className="mr-6">
            <DropdownMenuLabel className="text-center text-lg pb-0">
              {currentUser?.fullname}
            </DropdownMenuLabel>

            <DropdownMenuLabel className="text-xs truncate py-0 font-normal text-center">
              {currentUser?.email}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            {/*Todo:Make drop down menu items constant */}
            <DropdownMenuGroup>
              {menuItems.map((item) => (
                <Link href={item.href}>
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
  )
}

export default Navbar
