"use client"

import Navbar from "../Components/Navbar"
import {Button} from "../Components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "../Components/ui/avatar"
import {IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import clsx from "clsx"
import StoriesList from "../Components/pages/profile/BlogsList"
import SavedStoriesList from "../Components/pages/profile/SavedBlogsList"
import axios from "@/libs/axios"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"
import {Skeleton} from "../Components/ui/skeleton"

const ProfilePage = ({params}: {params: {username: string}}) => {
  const [user, setUser] = useState<any>()
  const token = localStorage.getItem("token")
  useEffect(() => {
    axios(`api/user/${params.username.substring(3)}`, {headers: {Authorization: token}}).then((res) => {
      setUser(res.data)
    })
  }, [])
  console.log(user)
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "stories"
  const router = useRouter()

  return (
    <>
      <Navbar />
      <section className="flex items-center w-screen h-[40vh] relative px-6 border-b border-border">
        <h1 className="text-7xl md:text-[8.5vw] font-PT">
          {user ? user.fullname : <Skeleton className="h-[130px] w-[900px] mb-4" />}
        </h1>
        <div className="flex items-center gap-2 absolute left-6 bottom-4">
          <Avatar className="flex justify-center items-center gap-2 font-semibold">
            {user ? (
              <>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {user?.fullname
                    .split(" ")
                    .slice(0, 2)
                    .map((word: string) => {
                      return word[0]
                    })
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </>
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}
          </Avatar>
          {user ? (
            <span className="flex items-center text-sm font-semibold">@ {user.username}</span>
          ) : (
            <Skeleton className="h-4 w-40" />
          )}
        </div>
        <Button className="absolute right-6 bottom-4">Edit Profile</Button>
        <SettingsIcon className="absolute right-6 top-4 cursor-pointer" size={20} />
      </section>
      <section className="flex flex-col md:flex-row w-screen font-semibold text-xs text-gray-700 dark:text-gray-200">
        <ul className="flex gap-3 items-start w-full md:w-1/3 px-6 py-4 border-b md:border-none border-border">
          {user ? (
            <>
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
            </>
          ) : (
            <>
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </>
          )}
        </ul>
        {user ? (
          <div className="flex justify-start items-start md:w-2/3 text-primary leading-7 text-2xl font-semibold px-6 py-4 border-b md:border-none border-border">
            {user.bio}
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-6">
            <Skeleton className="h-4 w-[800px]" />
            <Skeleton className="h-4 w-[700px]" />
            <Skeleton className="h-4 w-[400px]" />
          </div>
        )}
      </section>
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
        {tab === "blogs" && <StoriesList user={user} />}
        {tab === "saved-blogs" && <SavedStoriesList />}
        {tab === "drafts" && <h1>This is drafts tap</h1>}
      </section>
    </>
  )
}

export default ProfilePage
