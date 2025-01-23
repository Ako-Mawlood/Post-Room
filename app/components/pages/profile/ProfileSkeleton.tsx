"use client";

import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";
import { Skeleton } from "@/app/components/ui/skeleton";

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

      {/* Profile Tabs Section */}
      <section className="mt-5 flex h-7 w-full items-center justify-start gap-8 border-b border-border px-6 font-semibold text-foreground max-sm:text-sm md:mt-20">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </section>

      {/* Blog Cards Section */}
      <div className="mx-auto flex w-full flex-wrap justify-center gap-10 p-6">
        <div className="w-full md:w-[40rem] lg:w-[45%]">
          <BlogCardSkeleton />
        </div>
        <div className="w-full md:w-[40rem] lg:w-[45%]">
          <BlogCardSkeleton />
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
