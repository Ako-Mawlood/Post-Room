"use client";

import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";

const ProfileSkeleton = () => {
  return (
    <>
      {/* Header Section */}
      <section className="relative flex h-[40vh] w-full flex-col justify-center border-b border-border px-6">
        <Skeleton className="mb-4 h-[8vw] w-[60%] max-w-[500px]" />
        <div className="absolute bottom-4 left-6 flex items-center gap-3">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-4">
          <Button variant="outline" disabled>
            Edit Profile
          </Button>
          <SettingsIcon className="text-muted-foreground" size={20} />
        </div>
      </section>

      {/* Info Section */}
      <section className="flex w-full flex-col md:flex-row">
        {/* Stats */}
        <ul className="flex w-full items-start gap-6 border-b border-border px-6 py-4 md:w-1/3 md:border-none">
          <li>
            <Skeleton className="h-5 w-14" />
          </li>
          <li>
            <Skeleton className="h-5 w-14" />
          </li>
          <li>
            <Skeleton className="h-5 w-14" />
          </li>
        </ul>

        {/* Bio Section */}
        <div className="flex w-full flex-col gap-3 px-6 py-4 md:w-2/3">
          <Skeleton className="h-5 w-[80%]" />
          <Skeleton className="h-5 w-[70%]" />
          <Skeleton className="h-5 w-[50%]" />
        </div>
      </section>
    </>
  );
};

export default ProfileSkeleton;
