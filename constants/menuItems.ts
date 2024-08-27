import {currentUserType} from "@/app/types/currentUserType"
import { CiUser as Profile,CiEdit as Write,CiBookmark as Saved,CiSettings as Settings } from "react-icons/ci";

export const getMenuItems = (currentUser: currentUserType) => [
  {
    href: `/@${currentUser?.username}`,
    icon: Profile,
    label: "Profile",
  },
  {
    href: "/create",
    icon: Write,
    label: "Create Blog",
  },
  {
    href: `/@${currentUser?.username}?tab=saved-blogs`,
    icon: Saved,
    label: "Saved Blogs",
  },
  {
    href: `/@${currentUser?.username}/settings`,
    icon: Settings,
    label: "Settings",
  },
]
