import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import SavedBlogsList from "../../components/pages/profile/SavedBlogsList";
import ProfileSkeleton from "../../components/pages/profile/ProfileSkeleton";
import ProfileTabs from "../../components/pages/profile/ProfileTabs";
import { currentUserType } from "../../types/currentUserType";
import EditProfileModal from "../../components/pages/profile/EditProfileModal";
import EditProfileBtn from "../../components/pages/profile/EditProfileBtn";
import { profileOwnerType } from "../../types/profileOwnerType";
import { getInitials } from "@/libs/utils";
import { getUserByUsername } from "@/libs/getUserByUsername";
import { getCurrentUser } from "@/libs/getCurrentUser";
import ProfileOwnerBlogsList from "../../components/pages/profile/ProfileOwnerBlogsList";
import { notFound } from "next/navigation";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import clsx from "clsx";
import Link from "next/link";
import DraftBlogList from "@/app/components/pages/profile/DraftBlogList";

const ProfilePage = async ({
  searchParams,
  params,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { username: string };
}) => {
  const token = getCookie("token", { cookies });
  const currentUser: currentUserType = await getCurrentUser(token as string);
  const profileOwner: profileOwnerType = await getUserByUsername(
    params.username.substring(3),
    token as string,
  );
  if (!profileOwner) notFound();
  const isCurrentUserProfile = currentUser.id === profileOwner.id;
  const validTabs = ["blogs", "saved-blogs", "drafts"];
  const tabQueryParam =
    validTabs.includes(searchParams?.tab as string) && isCurrentUserProfile
      ? searchParams?.tab
      : "blogs";
  const editQueryParam = isCurrentUserProfile ? searchParams?.edit : "";
  return (
    <>
      <div
        className={clsx({
          "fixed left-0 top-0 -z-10 h-screen overflow-hidden":
            editQueryParam === "t",
        })}
      >
        {profileOwner ? (
          <>
            <section className="relative flex h-[40vh] w-full items-center border-b border-border px-6">
              <h1 className="line-clamp-2 font-PT text-7xl md:line-clamp-1 md:text-[8.5vw]">
                {profileOwner.fullname}
              </h1>
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <Avatar className="flex items-center justify-center gap-2 font-semibold">
                  <AvatarImage src={profileOwner.imageUrl} />
                  <AvatarFallback>
                    {getInitials(profileOwner?.fullname)}
                  </AvatarFallback>
                </Avatar>
                <span className="flex items-center text-sm font-semibold">
                  @ {profileOwner.username}
                </span>
              </div>
              {isCurrentUserProfile && (
                <>
                  <EditProfileBtn searchParams={searchParams} />
                  <Link href={`/@${currentUser?.username}/settings`}>
                    <SettingsIcon
                      className="absolute right-6 top-4 cursor-pointer"
                      size={20}
                    />
                  </Link>
                </>
              )}
            </section>
            <section className="flex w-full flex-col text-xs font-semibold md:flex-row">
              <ul className="flex w-full items-start gap-3 border-b border-border px-6 py-4 md:w-1/3 md:border-none">
                <li>
                  <span className="font-semibold text-primary">
                    {profileOwner.blogs.length}
                  </span>
                  <span className="ml-1">Blogs</span>
                </li>
                <li>
                  <span className="font-semibold text-primary">
                    {profileOwner._count.followers}
                  </span>
                  <span className="ml-1">Followers</span>
                </li>

                <li>
                  <span className="font-semibold text-primary">
                    {profileOwner._count.followed}
                  </span>{" "}
                  <span className="text-gray-2 ml-1">Following</span>
                </li>
              </ul>
              <div className="flex items-start justify-start border-b border-border px-6 py-4 text-2xl font-semibold leading-7 md:w-1/2 md:border-none">
                {profileOwner.bio}
              </div>
            </section>
          </>
        ) : (
          <ProfileSkeleton />
        )}
        <ProfileTabs
          tabQueryParam={tabQueryParam}
          profileOwnerUsername={profileOwner.username}
          isCurrentUserProfile={isCurrentUserProfile}
        />

        {tabQueryParam === "blogs" && profileOwner && (
          <ProfileOwnerBlogsList profileOwner={profileOwner} />
        )}
        {tabQueryParam === "saved-blogs" && isCurrentUserProfile && (
          <SavedBlogsList />
        )}
        {tabQueryParam === "drafts" && isCurrentUserProfile && (
          <DraftBlogList />
        )}
      </div>
      {editQueryParam === "t" && (
        <EditProfileModal
          profileOwner={profileOwner}
          searchParams={searchParams}
          currentUserUsername={currentUser?.username}
        />
      )}
    </>
  );
};

export default ProfilePage;
