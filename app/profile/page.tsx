"use client"

import Navbar from "../Components/Navbar"
import {Button} from "../Components/ui/button"
import {previewBlogs} from "@/StaticData/previewBlogs"
import {Avatar, AvatarFallback, AvatarImage} from "../Components/ui/avatar"
import {IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import Link from "next/link"
import clsx from "clsx"
import {useSearchParams} from "next/navigation"
import StoriesList from "../Components/pages/profile/StoriesList"
import SavedStoriesList from "../Components/pages/profile/SavedStoriesList"

const ProfilePage = () => {
  const user = previewBlogs[0]
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "stories"
  return (
    <>
      <Navbar />
      <section className="flex items-center w-screen h-[40vh] relative px-6 border-b border-border">
        <h1 className="text-7xl md:text-[8.5vw] font-PT">{user.fullName}</h1>
        <div className="flex gap-2 absolute left-6 bottom-4">
          <Avatar className="flex justify-center items-center gap-2 font-semibold">
            <AvatarImage src="https://scontent.febl5-2.fna.fbcdn.net/v/t39.30808-6/274879156_2177696605718753_4655404325092292858_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LDZ-1TfT64AQ7kNvgEPvJNF&_nc_ht=scontent.febl5-2.fna&oh=00_AYCJP1XZLdZ3WLgvJJ4sm0igh_QZOpCnJE2osYXn1CL2FA&oe=66666DAA" />
            <AvatarFallback>
              {user.fullName
                .split("")
                .splice(0, 2)
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="flex items-center text-sm font-semibold">@Sangar839</span>
        </div>
        <Button className="absolute right-6 bottom-4">Edit Profile</Button>
        <SettingsIcon className="absolute right-6 top-4 cursor-pointer" size={20} />
      </section>
      <section className="flex flex-col md:flex-row w-screen font-semibold text-xs text-gray-700 dark:text-gray-200">
        <ul className="flex gap-3 items-start w-full md:w-1/3 px-6 py-4 border-b md:border-none border-border">
          <li>
            <span className="font-semibold text-primary">16</span> Stories
          </li>
          <li>
            <span className="font-semibold text-primary">6</span> Followers
          </li>
          <li>
            <span className="font-semibold text-primary">2</span> Following
          </li>
        </ul>

        <div className="flex justify-start items-start md:w-2/3 text-primary leading-7 text-2xl font-semibold px-6 py-4 border-b md:border-none border-border">
          Author | Accountant | English Teacher Capturing stories, crunching numbers, and inspiring minds.
          Passionate about education, finance, and writing. Making an impact one word and number at a time.
        </div>
      </section>
      <section>
        <ul className="flex justify-start gap-8 w-full h-7 font-semibold px-6 mt-5 md:mt-20 text-sm text-foreground border-b border-border">
          <li className={clsx({"text-primary border-b-2 border-primary": tab === "stories"})}>
            <Link href="?tab=stories">Stories</Link>
          </li>

          <li
            className={clsx({
              "text-primary border-b-2 border-primary": tab === "saved-stories",
            })}
          >
            <Link href="?tab=saved-stories">Saved stories</Link>
          </li>
          <li className={clsx({"text-primary border-b-2 border-primary": tab === "drafts"})}>
            <Link href="?tab=drafts">My Drafts</Link>
          </li>
        </ul>
        {tab === "stories" && <StoriesList />}
        {tab === "saved-stories" && <SavedStoriesList />}
        {tab === "drafts" && <h1>This is drafts tap</h1>}
      </section>
    </>
  )
}

export default ProfilePage
