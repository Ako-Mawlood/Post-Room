"use client";

import UploadWidget from "./UploadWidget";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { profileOwnerType } from "../types/profileOwnerType";
import clsx from "clsx";
import { useState } from "react";
import { LuImagePlus as AddImage } from "react-icons/lu";

type profileImageEditerType = {
  form?: any;
  profileOwner: profileOwnerType;
};
const ProfileImageUpdater = ({
  form,
  profileOwner,
}: profileImageEditerType) => {
  const [profileImage, setProfileImage] = useState(
    profileOwner?.imageUrl || "",
  );

  function updateImageState(url: string) {
    setProfileImage(url);
    form.setValue("imageUrl", url);
  }
  return (
    <div className="my-5 flex w-full gap-8">
      <UploadWidget form={form} updateImageUrlState={updateImageState}>
        <Avatar className="size-16 cursor-pointer">
          <AvatarFallback>
            <AddImage
              className={clsx("size-6 text-muted", { hidden: profileImage })}
            />
          </AvatarFallback>
          <AvatarImage src={profileImage} />
        </Avatar>
      </UploadWidget>

      <div className="flex flex-col justify-between">
        <div className="flex gap-4 text-xs font-semibold">
          <UploadWidget form={form} updateImageUrlState={updateImageState}>
            <button type="button" className="text-green-600">
              {profileImage ? "Update" : "Upload"}
            </button>
          </UploadWidget>
          <button
            type="button"
            onClick={() => {
              setProfileImage("");
              form.setValue("imageUrl", "none");
            }}
            className={clsx("text-destructive", { hidden: !profileImage })}
          >
            Remove
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
        </p>
      </div>
    </div>
  );
};

export default ProfileImageUpdater;
