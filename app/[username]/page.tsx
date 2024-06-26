"use client"

import Navbar from "../Components/Navbar"
import {Button} from "../Components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "../Components/ui/avatar"
import {IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import clsx from "clsx"
import UserBlogsList from "../Components/pages/profile/UserBlogsList"
import SavedBlogsList from "../Components/pages/profile/SavedBlogsList"
import axios from "@/libs/axios"
import {useRouter, useSearchParams} from "next/navigation"
import {useContext} from "react"
import ProfileSkeleton from "../Components/pages/profile/ProfileSkeleton"
import {CurrentUserContext} from "../providers/CurrentUserProvider"
import {useQuery} from "@tanstack/react-query"

const ProfilePage = ({params}: {params: {username: string}}) => {
  const currentUser = useContext(CurrentUserContext)
  const {data: profileUser, error} = useQuery({
    queryKey: ["user", params.username],
    queryFn: async () => {
      const res = await axios(`/api/user/${params.username.substring(3)}`, {
        headers: {Authorization: localStorage.getItem("token")},
      })
      return res.data
    },
  })

  const searchParams = useSearchParams()
  const validTaps = ["blogs", "saved-blogs", "drafts"]
  const tab =
    validTaps.includes(searchParams.get("tab") as string) && currentUser?.username === profileUser?.username
      ? searchParams.get("tab")
      : "blogs"
  const router = useRouter()
  return (
    <>
      <Navbar />
      {profileUser ? (
        <>
          <section className="flex items-center w-full h-[40vh] relative px-6 border-b border-border">
            <h1 className="text-7xl md:text-[8.5vw] font-PT">{profileUser.fullname}</h1>
            <div className="flex items-center gap-2 absolute left-6 bottom-4">
              <Avatar className="flex justify-center items-center gap-2 font-semibold">
                <AvatarImage src={profileUser.imageUrl} />
                <AvatarFallback>
                  {profileUser?.fullname
                    .split(" ")
                    .slice(0, 2)
                    .map((word: string) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="flex items-center text-sm font-semibold">@ {profileUser.username}</span>
            </div>
            {currentUser?.username === profileUser.username && (
              <>
                <Button className="absolute right-6 bottom-4">Edit Profile</Button>
                <SettingsIcon className="absolute right-6 top-4 cursor-pointer" size={20} />
              </>
            )}
          </section>
          <section className="flex flex-col md:flex-row w-full font-semibold text-xs text-gray-700 dark:text-gray-200">
            <ul className="flex gap-3 items-start w-full md:w-1/3 px-6 py-4 border-b md:border-none border-border">
              <li>
                <span className="font-semibold text-primary">{profileUser.blogs.length}</span> Blogs
              </li>
              <li>
                <span className="font-semibold text-primary">{profileUser._count.followers}</span> Followers
              </li>
              {/* <li>
                <span className="font-semibold text-primary">{profileUser._count.following}</span>{" "}
                Following
              </li> */}
            </ul>
            <div className="flex justify-start items-start md:w-2/3 text-primary leading-7 text-2xl font-semibold px-6 py-4 border-b md:border-none border-border">
              {profileUser.bio}
            </div>
          </section>
        </>
      ) : (
        <ProfileSkeleton />
      )}
      <section className="">
        <ul className="flex justify-start gap-8 w-full h-7 px-6 mt-5 md:mt-20 font-semibold text-xs sm:text-sm text-foreground border-b border-border">
          <li
            onClick={() => router.push(`/@${profileUser?.username}?tab=blogs`, {scroll: false})}
            className={clsx("cursor-pointer", {
              "text-primary border-b-2 border-primary": tab === "blogs",
            })}
          >
            Blogs
          </li>
          {currentUser?.username === profileUser?.username && (
            <div className="flex gap-8">
              <li
                onClick={() => router.push(`/@${profileUser.username}?tab=saved-blogs`, {scroll: false})}
                className={clsx("cursor-pointer", {
                  "text-primary border-b-2 border-primary": tab === "saved-blogs",
                })}
              >
                Saved Blogs
              </li>
              <li
                onClick={() => router.push(`/@${profileUser.username}?tab=drafts`, {scroll: false})}
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
      {tab === "blogs" && profileUser && <UserBlogsList profileUserBlogs={profileUser.blogs} error={error} />}
      {tab === "saved-blogs" && currentUser?.username === profileUser?.username && <SavedBlogsList />}
      {tab === "drafts" && currentUser?.username === profileUser?.username && <h1>drafts</h1>}
    </>
  )
}

export default ProfilePage
