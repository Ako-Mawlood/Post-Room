"use client"

import clsx from "clsx"
import {useRouter} from "next/navigation"
import {IoBookmarkOutline as BookmarkIcon, IoBookmark as BookmarkedIcon} from "react-icons/io5"

type ProfileTabsType = {
  tab: string | string[] | undefined
  profileUser: any
  currentUser: any
}

const ProfileTabs = ({tab, profileUser, currentUser}: ProfileTabsType) => {
  const router = useRouter()
  return (
    <section>
      <ul className="flex justify-start items-center gap-8 w-full h-7 px-6 mt-5 md:mt-20 font-semibold max-sm:text-sm text-foreground border-b border-border">
        <li
          onClick={() => router.push(`/@${profileUser?.username}?tab=blogs`, {scroll: false})}
          className={clsx("cursor-pointer", {
            "text-primary border-b-2 border-primary": tab === "blogs",
          })}
        >
          Blogs
        </li>

        {currentUser?.username === profileUser?.username && (
          <div className="flex items-center gap-8">
            <li
              onClick={() => router.push(`/@${profileUser?.username}?tab=saved-blogs`, {scroll: false})}
              className={clsx("flex items-center gap-1 cursor-pointer", {
                "text-primary border-b-2 border-primary": tab === "saved-blogs",
              })}
            >
              {tab === "saved-blogs" ? <BookmarkedIcon size={18} /> : <BookmarkIcon size={18} />}
              <span>Saved Blogs</span>
            </li>

            <li
              onClick={() => router.push(`/@${profileUser?.username}?tab=drafts`, {scroll: false})}
              className={clsx("cursor-pointer", {
                "text-primary border-b-2 border-primary": tab === "drafts",
              })}
            >
              My Drafts
            </li>
          </div>
        )}
      </ul>
    </section>
  )
}

export default ProfileTabs
