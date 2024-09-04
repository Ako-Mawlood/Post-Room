"use client";

import UserDetailEditor from "@/app/components/pages/settings/UserDetailEditor";
import { fullnameValidation, usernameValidation } from "@/libs/validations";
import ProfileImageUpdater from "@/app/components/ProfileImageUpdater";
import { useEffect, useState } from "react";
import { getUserByUsername } from "@/libs/getUserByUsername";
import { getCookie } from "cookies-next";
import DeleteAccount from "./DeleteAccount";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import SendRestPasswordLinkBtn from "./SendRestPasswordLinkBtn";

const validateUsername = () => usernameValidation;
const validateFullname = () => fullnameValidation;

const Settings = ({ params }: { params: { username: string } }) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userInfo) {
    return <p>User not found.</p>;
  }

  return (
    <main className="mx-auto my-10 flex w-1/2 flex-col gap-8">
      <div className="mt-6 flex w-full items-center gap-2 border-b py-4 text-4xl font-semibold">
        <SettingsIcon />
        Settings
      </div>
      <h1 className="text-2xl font-semibold">Personal Information</h1>
      <section className="flex flex-col gap-3 border p-4">
        <ProfileImageUpdater form={undefined} profileOwner={userInfo} />
        <UserDetailEditor
          label="fullname"
          currentValue={userInfo.fullname}
          schemaFactory={validateFullname}
          url="/api/user"
        />
        <UserDetailEditor
          label="username"
          currentValue={userInfo.username}
          schemaFactory={validateUsername}
          url="/api/user"
        />
        <UserDetailEditor
          label="bio"
          currentValue={userInfo.bio}
          schemaFactory={validateUsername}
          url="/api/user"
        />
      </section>
      <h1 className="text-2xl font-semibold">Account Management</h1>
      <section className="flex flex-col gap-3 border p-4">
        <div className="flex items-center justify-between p-3">
          <div className="flex flex-col justify-between gap-2">
            <h1 className="font-semibold">Update Password</h1>
            <p className="text-sm text-muted-foreground">
              Click send, and we will email you a link to reset your password.
            </p>
          </div>
          <SendRestPasswordLinkBtn />
        </div>
      </section>

      <DeleteAccount />
    </main>
  );
};

export default Settings;
