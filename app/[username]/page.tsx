import Navbar from "../Components/Navbar"
import {Button} from "../Components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "../Components/ui/avatar"
import {IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import UserBlogsList from "../Components/pages/profile/UserBlogsList"
import SavedBlogsList from "../Components/pages/profile/SavedBlogsList"
import axios from "@/libs/axiosInstance"
import ProfileSkeleton from "../Components/pages/profile/ProfileSkeleton"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"
import ProfileTabs from "../Components/pages/profile/ProfileTabs"

async function getCurrentUser() {
  const res = await axiosInstance("/api/me", {headers: {Authorization: getCookie("token", {cookies})}})
  return res.data
}

async function getProfileUser(username: string) {
  const res = await axios(`/api/user/${username.substring(3)}`, {
    headers: {Authorization: getCookie("token", {cookies})},
  })
  return res.data
}

const ProfilePage = async ({
  searchParams,
  params,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
  params: {username: string}
}) => {
  const currentUser = await getCurrentUser()
  const profileUser = await getProfileUser(params.username)

  const validTaps = ["blogs", "saved-blogs", "drafts"]
  const tab =
    validTaps.includes(searchParams?.tab as string) && currentUser?.username === profileUser?.username
      ? searchParams?.tab
      : "blogs"
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
      <ProfileTabs tab={tab} profileUser={profileUser} currentUser={currentUser} />
      {tab === "blogs" && profileUser && <UserBlogsList profileUserBlogs={profileUser.blogs} />}
      {tab === "saved-blogs" && currentUser?.username === profileUser?.username && <SavedBlogsList />}
      {tab === "drafts" && currentUser?.username === profileUser?.username && <h1>drafts</h1>}
    </>
  )
}

export default ProfilePage
