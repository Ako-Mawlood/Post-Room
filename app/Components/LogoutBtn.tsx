"use client"

import {IoIosLogOut as LogoutIcon} from "react-icons/io"
import {useRouter} from "next/navigation"
import {DropdownMenuItem} from "./ui/dropdown-menu"
import {deleteCookie} from "cookies-next"

const LogoutBtn = () => {
  const router = useRouter()
  return (
    <DropdownMenuItem
      onClick={() => {
        deleteCookie("token")
        router.push("/")
      }}
    >
      <LogoutIcon className="size-6 mr-2" />
      <span>Log Out</span>
    </DropdownMenuItem>
  )
}

export default LogoutBtn
