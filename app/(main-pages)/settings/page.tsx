"use client";

import { useState, useEffect } from "react";
import {
  bioValidation,
  fullnameValidation,
  usernameValidation,
} from "@/libs/validations";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import SendRestPasswordLinkBtn from "./SendRestPasswordLinkBtn";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { getCookie } from "cookies-next";
import { getUserByUsername } from "@/libs/getUserByUsername";
import DeleteAccount from "./DeleteAccount";
import { profileOwnerType } from "../../types/profileOwnerType";
import UserDetailEditorSkeleton from "@/app/components/pages/settings/UserDetailEditorSkeleto";
import UserDetailEditor from "@/app/components/pages/settings/UserDetailEditor";

const validateUsername = () => usernameValidation;
const validateFullname = () => fullnameValidation;
const validateBio = () => bioValidation;

const Settings = () => {
  const [userInfo, setUserInfo] = useState<profileOwnerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie("token");
      const currentUser = await getCurrentUser(token as string);
      const userInfo = await getUserByUsername(
        currentUser.username,
        token as string,
      );
      setUserInfo(userInfo);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <main className="my-10 flex w-full flex-col gap-8 px-4 md:mx-auto md:w-3/5 lg:w-1/2">
      <div className="mt-6 flex w-full items-center gap-2 border-b py-4 text-4xl font-semibold">
        <SettingsIcon />
        Settings
      </div>
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Personal Information</h1>
        <div className="flex flex-col gap-3 border p-4">
          {loading ? (
            <UserDetailEditorSkeleton />
          ) : (
            <>
              <UserDetailEditor
                label="Fullname"
                type="fullname"
                defaultValue={userInfo?.fullname as string}
                schemaFactory={validateFullname}
              />
              <UserDetailEditor
                label="Username"
                type="username"
                defaultValue={userInfo?.username as string}
                schemaFactory={validateUsername}
              />
              <UserDetailEditor
                label="Bio"
                type="bio"
                defaultValue={userInfo?.bio as string}
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
            <h1 className="font-semibold">Update Your Password</h1>
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
