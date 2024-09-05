"use client";

import UserDetailEditor from "@/app/components/pages/settings/UserDetailEditor";
import {
  bioValidation,
  fullnameValidation,
  usernameValidation,
} from "@/libs/validations";
import { useEffect, useState } from "react";
import { getUserByUsername } from "@/libs/getUserByUsername";
import { getCookie } from "cookies-next";
import DeleteAccount from "./DeleteAccount";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import SendRestPasswordLinkBtn from "./SendRestPasswordLinkBtn";
import UserDetailEditorSkeleton from "@/app/components/pages/settings/UserDetailEditorSkeleto";
const validateUsername = () => usernameValidation;
const validateFullname = () => fullnameValidation;
const validateBio = () => bioValidation;

const Settings = ({ params }: { params: { username: string } }) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getCookie("token");
        const user = await getUserByUsername(
          params.username.substring(3),
          token as string,
        );
        setUserInfo(user);
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.username]);

  return (
    <main className="my-10 flex w-full flex-col gap-8 px-4 md:mx-auto md:w-3/5 lg:w-1/2">
      <div className="mt-6 flex w-full items-center gap-2 border-b py-4 text-4xl font-semibold">
        <SettingsIcon />
        Settings
      </div>
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Personal Information</h1>
        <div className="flex flex-col gap-3 border p-4">
          {!userInfo ? (
            <UserDetailEditorSkeleton />
          ) : (
            <>
              <UserDetailEditor
                label="Fullname"
                type="fullname"
                defaultValue={userInfo?.fullname}
                schemaFactory={validateFullname}
              />
              <UserDetailEditor
                label="Username"
                type="username"
                defaultValue={userInfo?.username}
                schemaFactory={validateUsername}
              />
              <UserDetailEditor
                label="Bio"
                type="bio"
                defaultValue={userInfo?.bio}
                schemaFactory={validateBio}
              />
            </>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Account</h1>

        <div className="flex items-center justify-between border p-4 md:p-8">
          <div className="flex flex-col justify-between gap-2">
            <h1 className="font-semibold">Update Password</h1>
            <p className="mr-5 text-sm text-muted-foreground">
              Click send, and we will email you a link to reset your password.
            </p>
          </div>
          <SendRestPasswordLinkBtn />
        </div>

        <DeleteAccount />
      </section>
    </main>
  );
};

export default Settings;
