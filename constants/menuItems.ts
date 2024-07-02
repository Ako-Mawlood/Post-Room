import {currentUserType} from "@/app/types/currentUserType"

export const getMenuItems = (currentUser: currentUserType) => [
  {
    href: `/@${currentUser?.username}`,
    icon: "/assets/profile.svg",
    label: "Profile",
  },
  {
    href: "/write",
    icon: "/assets/write.svg",
    label: "Write blog",
  },
  {
    href: `/@${currentUser?.username}?tab=saved-blogs`,
    icon: "/assets/save.svg",
    label: "Saved blogs",
  },
  {
    href: `/@${currentUser?.username}?tab=drafts`,
    icon: "/assets/drafts.svg",

    label: "My Drafts",
  },
  {
    href: `/@${currentUser?.username}/settings`,
    icon: "/assets/settings.svg",
    label: "Settings",
  },
]
