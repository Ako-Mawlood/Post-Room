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
import {useEffect, useState} from "react"
import ProfileSkeleton from "../Components/pages/profile/ProfileSkeleton"

const ProfilePage = ({params}: {params: {username: string}}) => {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    axios(`api/user/${params.username.substring(3)}`, {
      headers: {Authorization: localStorage.getItem("token")},
    }).then((res) => {
      setUser(res.data)
    })
  }, [])
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "blogs"
  const router = useRouter()

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <section className="flex items-center w-screen h-[40vh] relative px-6 border-b border-border">
            <h1 className="text-7xl md:text-[8.5vw] font-PT">{user && user.fullname}</h1>
            <div className="flex items-center gap-2 absolute left-6 bottom-4">
              <Avatar className="flex justify-center items-center gap-2 font-semibold">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {user?.fullname
                    .split(" ")
                    .slice(0, 2)
                    .map((word: string) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="flex items-center text-sm font-semibold">@ {user.username}</span>
            </div>
            <Button className="absolute right-6 bottom-4">Edit Profile</Button>
            <SettingsIcon className="absolute right-6 top-4 cursor-pointer" size={20} />
          </section>
          <section className="flex flex-col md:flex-row w-screen font-semibold text-xs text-gray-700 dark:text-gray-200">
            <ul className="flex gap-3 items-start w-full md:w-1/3 px-6 py-4 border-b md:border-none border-border">
              <li>
                <span className="font-semibold text-primary">{user.blogs.length}</span> Stories
              </li>
              <li>
                <span className="font-semibold text-primary">{user._count.followers}</span> Followers
              </li>
              {/* <li>
            <span className="font-semibold text-primary">{user._count.following}</span>{" "}
            Following
          </li> */}
            </ul>
            <div className="flex justify-start items-start md:w-2/3 text-primary leading-7 text-2xl font-semibold px-6 py-4 border-b md:border-none border-border">
              {user.bio}
            </div>
          </section>
          <section></section>
        </>
      ) : (
        <ProfileSkeleton />
      )}
      <section>
        <ul className="flex justify-start gap-8 w-full h-7 font-semibold px-6 mt-5 md:mt-20 text-sm text-foreground border-b border-border">
          <li
            onClick={() => router.push(`/@${user.username}?tab=blogs`, {scroll: false})}
            className={clsx("cursor-pointer", {
              "text-primary border-b-2 border-primary": tab === "blogs",
            })}
          >
            Blogs
          </li>

          <li
            onClick={() => router.push(`/@${user.username}?tab=saved-blogs`, {scroll: false})}
            className={clsx("cursor-pointer", {
              "text-primary border-b-2 border-primary": tab === "saved-blogs",
            })}
          >
            Saved Blogs
          </li>
          <li
            onClick={() => router.push(`/@${user.username}?tab=drafts`, {scroll: false})}
            className={clsx("cursor-pointer", {
              "text-primary border-b-2 border-primary": tab === "drafts",
            })}
          >
            My Drafts
          </li>
        </ul>
        {tab === "blogs" && <UserBlogsList user={user} />}
        {tab === "saved-blogs" && <SavedBlogsList />}
        {tab === "drafts" && <h1>This is drafts tap</h1>}
      </section>
    </>
  )
}

export default ProfilePage
