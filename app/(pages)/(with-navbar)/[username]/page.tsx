"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import SavedBlogsList from "@/app/components/pages/profile/SavedBlogsList";
import ProfileSkeleton from "@/app/components/pages/profile/ProfileSkeleton";
import ProfileTabs from "@/app/components/pages/profile/ProfileTabs";
import EditProfileModal from "@/app/components/pages/profile/EditProfileModal";
import { profileOwnerType } from "@/app/types/profileOwnerType";
import { getInitials } from "@/libs/utils";
import ProfileOwnerBlogsList from "@/app/components/pages/profile/ProfileOwnerBlogsList";
import { notFound } from "next/navigation";
import { getCookie } from "cookies-next";
import Link from "next/link";
import DraftBlogList from "@/app/components/pages/profile/DraftBlogList";
import { useContext } from "react";
import { CurrentUserContext } from "@/app/providers/CurrentUserProvider";
import axiosInstance from "@/libs/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = ({
  searchParams,
  params,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { username: string };
}) => {
  const currentUser = useContext(CurrentUserContext);

  const token = getCookie("token");

  if (!token || !params.username) {
    notFound();
  }

  const {
    data: profileOwner,
    isLoading,
    isError,
    error,
  } = useQuery<profileOwnerType, { response?: { status: number } }>({
    queryKey: ["profileOwner"],
    queryFn: async () => {
      const res = await axiosInstance(
        `/api/user/${params.username.substring(3)}`,
        {
          headers: { Authorization: token },
        },
      );
      return res.data;
    },
  });

  if (isError) {
    if (error.response?.status === 404) {
      return notFound();
    } else {
      console.error("An error occurred: ", error);
      return <div>An error occurred while fetching the profile data.</div>;
    }
  }

  const isCurrentUserProfile =
    (currentUser && profileOwner && currentUser.id === profileOwner.id) ||
    false;
  const validTabs = ["blogs", "saved-blogs", "drafts"];
  const tabQueryParam =
    validTabs.includes(searchParams?.tab as string) && isCurrentUserProfile
      ? searchParams?.tab
      : "blogs";

  return (
    <>
      {!isLoading && profileOwner ? (
        <>
          <section className="relative flex h-[40vh] w-full items-center border-b border-border px-6">
            <h1 className="line-clamp-2 font-PT text-7xl md:line-clamp-1 md:text-[8.5vw]">
              {profileOwner.fullname}
            </h1>
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <Avatar className="flex size-16 items-center justify-center gap-2 font-semibold">
                <AvatarImage src={profileOwner.imageUrl} />
                <AvatarFallback>
                  {getInitials(profileOwner.fullname)}
                </AvatarFallback>
              </Avatar>
              <span className="flex items-center text-sm font-semibold">
                @ {profileOwner.username}
              </span>
            </div>
            {isCurrentUserProfile && (
              <>
                <EditProfileModal profileOwner={profileOwner} />
                <Link href={`/settings`}>
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
                </span>
                <span className="text-gray-2 ml-1">Following</span>
              </li>
            </ul>
            <div className="flex items-start justify-start px-6 py-4 text-2xl font-semibold leading-7 md:w-1/2">
              {profileOwner.bio}
            </div>
          </section>
          <ProfileTabs
            tabQueryParam={tabQueryParam}
            profileOwnerUsername={profileOwner.username}
            isCurrentUserProfile={isCurrentUserProfile}
          />
        </>
      ) : (
        <ProfileSkeleton />
      )}

      {tabQueryParam === "blogs" && profileOwner && (
        <ProfileOwnerBlogsList profileOwner={profileOwner} />
      )}
      {tabQueryParam === "saved-blogs" && isCurrentUserProfile && (
        <SavedBlogsList />
      )}
      {tabQueryParam === "drafts" && isCurrentUserProfile && <DraftBlogList />}
    </>
  );
};

export default ProfilePage;
