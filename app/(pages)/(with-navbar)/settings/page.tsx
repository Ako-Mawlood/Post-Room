"use client";

import { useContext } from "react";
import {
  bioValidation,
  fullnameValidation,
  usernameValidation,
} from "@/libs/validations";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import SendRestPasswordLinkBtn from "./SendRestPasswordLinkBtn";
import { getCookie } from "cookies-next";
import DeleteAccount from "./DeleteAccount";
import { profileOwnerType } from "@/app/types/profileOwnerType";
import UserDetailEditorSkeleton from "@/app/components/pages/settings/UserDetailEditorSkeleton";
import UserDetailEditor from "@/app/components/pages/settings/UserDetailEditor";
import { CurrentUserContext } from "@/app/providers/CurrentUserProvider";
import axiosInstance from "@/libs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

const validateUsername = usernameValidation;
const validateFullname = fullnameValidation;
const validateBio = bioValidation;

const Settings = () => {
  const currentUser = useContext(CurrentUserContext);

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery<profileOwnerType>({
    queryKey: ["profileOwner"],
    queryFn: async () => {
      const token = getCookie("token");
      if (!token || !currentUser?.username) {
        throw new Error("Unauthorized or missing user data");
      }
      const res = await axiosInstance(`/api/user/${currentUser?.username}`, {
        headers: { Authorization: token },
      });
      return res.data;
    },
    enabled: Boolean(currentUser?.username), // Only fetch when username exists
  });

  if (isError) {
    notFound();
  }

  return (
    <>
      <main className="my-10 flex w-full flex-col gap-8 px-4 md:mx-auto md:w-3/5 lg:w-1/2">
        <div className="mt-6 flex w-full items-center gap-2 border-b py-4 text-4xl font-semibold">
          <SettingsIcon />
          Settings
        </div>
        <section className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Personal Information</h1>
          <div className="flex flex-col gap-3 rounded-lg border p-4">
            {isLoading || !currentUser ? (
              <UserDetailEditorSkeleton />
            ) : (
              userInfo && (
                <>
                  <UserDetailEditor
                    label="Fullname"
                    type="fullname"
                    defaultValue={userInfo.fullname}
                    schemaFactory={() => validateFullname}
                  />
                  <UserDetailEditor
                    label="Username"
                    type="username"
                    defaultValue={userInfo.username}
                    schemaFactory={() => validateUsername}
                  />
                  <UserDetailEditor
                    label="Bio"
                    type="bio"
                    defaultValue={userInfo.bio}
                    schemaFactory={() => validateBio}
                  />
                </>
              )
            )}
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Account</h1>
          <div className="flex items-center justify-between rounded-lg border p-4 md:p-8">
            <div className="flex flex-col justify-between gap-2">
              <h1 className="font-semibold">Update Your Password</h1>
              <p className="mr-5 text-sm text-muted-foreground">
                Click send, and we will email you a link to reset your password.
              </p>
            </div>
            {currentUser && (
              <SendRestPasswordLinkBtn currentUser={currentUser} />
            )}
          </div>
          {<DeleteAccount email={currentUser?.username as string} />}
        </section>
      </main>
    </>
  );
};

export default Settings;
