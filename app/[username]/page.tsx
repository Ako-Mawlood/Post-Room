import Navbar from "../Components/Navbar"
import {Avatar, AvatarFallback, AvatarImage} from "../Components/ui/avatar"
import {IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import SavedBlogsList from "../Components/pages/profile/SavedBlogsList"
import ProfileSkeleton from "../Components/pages/profile/ProfileSkeleton"
import ProfileTabs from "../Components/pages/profile/ProfileTabs"
import {currentUserType} from "../types/currentUserType"
import EditProfileModal from "../Components/pages/profile/EditProfileModal"
import EditProfileBtn from "../Components/pages/profile/EditProfileBtn"
import Link from "next/link"
import {profileOwnerType} from "../types/profileOwnerType"
import clsx from "clsx"
import {getInitials} from "@/libs/utils"
import {getProfileOwner} from "@/libs/getProfileOwner"
import {getCurrentUser} from "@/libs/getCurrentUser"
import ProfileOwnerBlogsList from "../Components/pages/profile/ProfileOwnerBlogsList"

const ProfilePage = async ({
  searchParams,
  params,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
  params: {username: string}
}) => {
  const currentUser: currentUserType = await getCurrentUser()
  const profileOwner: profileOwnerType = await getProfileOwner(params.username.substring(3))
  const validTabs = ["blogs", "saved-blogs", "drafts"]
  const tab =
    validTabs.includes(searchParams?.tab as string) && currentUser?.username === profileOwner?.username
      ? searchParams?.tab
      : "blogs"
  const edit = currentUser?.username === profileOwner?.username ? searchParams?.edit : ""
  return (
    <>
      <div className={clsx({"h-screen overflow-hidden fixed top-0 left-0 -z-10": edit === "t"})}>
        <Navbar />
        {profileOwner ? (
          <>
            <section className="flex items-center w-full h-[40vh] relative px-6 border-b border-border">
              <h1 className="text-7xl md:text-[8.5vw] font-PT">{profileOwner.fullname}</h1>
              <div className="flex items-center gap-2 absolute left-6 bottom-4">
                <Avatar className="flex justify-center items-center gap-2 font-semibold">
                  <AvatarImage src={profileOwner.imageUrl} />
                  <AvatarFallback>{getInitials(profileOwner?.fullname)}</AvatarFallback>
                </Avatar>
                <span className="flex items-center text-sm font-semibold">@ {profileOwner.username}</span>
              </div>
              {currentUser?.username === profileOwner.username && (
                <>
                  <EditProfileBtn searchParams={searchParams} />
                  <Link href={`/@${currentUser?.username}/settings`}>
                    <SettingsIcon
                      className="absolute right-6 top-4 cursor-pointer focus:animate-spin"
                      size={20}
                    />
                  </Link>
                </>
              )}
            </section>
            <section className="flex flex-col md:flex-row w-full font-semibold text-xs">
              <ul className="flex gap-3 items-start w-full md:w-1/3 px-6 py-4 border-b md:border-none border-border">
                <li>
                  <span className="font-semibold text-primary">{profileOwner.blogs.length}</span>
                  <span className="ml-1">Blogs</span>
                </li>
                <li>
                  <span className="font-semibold text-primary">{profileOwner._count.followers}</span>
                  <span className="ml-1">Followers</span>
                </li>

                <li>
                  <span className="font-semibold text-primary">{profileOwner._count.followed}</span>{" "}
                  <span className="text-gray-2 ml-1">Following</span>
                </li>
              </ul>
              <div className="flex justify-start items-start md:w-2/3 leading-7 text-2xl px-6 py-4 border-b md:border-none border-border font-semibold">
                {profileOwner.bio}
              </div>
            </section>
          </>
        ) : (
          <ProfileSkeleton />
        )}
        <ProfileTabs
          tab={tab}
          profileOwnerUsername={profileOwner.username}
          currentUserUsername={currentUser.username}
        />

        {tab === "blogs" && profileOwner && <ProfileOwnerBlogsList profileOwner={profileOwner} />}
        {tab === "saved-blogs" && currentUser?.username === profileOwner?.username && <SavedBlogsList />}
        {tab === "drafts" && currentUser?.username === profileOwner?.username && <h1>drafts</h1>}
      </div>
      {edit === "t" && (
        <EditProfileModal
          profileOwner={profileOwner}
          searchParams={searchParams}
          currentUserUsername={currentUser?.username}
        />
      )}
    </>
  )
}

export default ProfilePage
