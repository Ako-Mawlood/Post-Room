"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  IoBookmarkOutline as BookmarkIcon,
  IoBookmark as BookmarkedIcon,
} from "react-icons/io5";

type ProfileTabsProps = {
  tabQueryParam: string | string[] | undefined;
  profileOwnerUsername: string;
  isCurrentUserProfile: boolean;
};

const ProfileTabs = ({
  tabQueryParam,
  profileOwnerUsername,
  isCurrentUserProfile,
}: ProfileTabsProps) => {
  const router = useRouter();
  return (
    <section>
      <ul className="mt-5 flex h-7 w-full items-center justify-start gap-8 border-b border-border px-6 font-semibold text-foreground max-sm:text-sm md:mt-20">
        <li
          onClick={() =>
            router.push(`/@${profileOwnerUsername}?tab=blogs`, {
              scroll: false,
            })
          }
          className={clsx("cursor-pointer", {
            "border-b-2 border-primary text-primary": tabQueryParam === "blogs",
          })}
        >
          {isCurrentUserProfile ? "My Blogs" : "Blogs"}
        </li>

        {isCurrentUserProfile && (
          <div className="flex items-center gap-8">
            <li
              onClick={() =>
                router.push(`/@${profileOwnerUsername}?tab=saved-blogs`, {
                  scroll: false,
                })
              }
              className={clsx("flex cursor-pointer items-center gap-1", {
                "border-b-2 border-primary text-primary":
                  tabQueryParam === "saved-blogs",
              })}
            >
              {tabQueryParam === "saved-blogs" ? (
                <BookmarkedIcon size={18} />
              ) : (
                <BookmarkIcon size={18} />
              )}
              <span>Saved Blogs</span>
            </li>

            <li
              onClick={() =>
                router.push(`/@${profileOwnerUsername}?tab=drafts`, {
                  scroll: false,
                })
              }
              className={clsx("cursor-pointer", {
                "border-b-2 border-primary text-primary":
                  tabQueryParam === "drafts",
              })}
            >
              My Drafts
            </li>
          </div>
        )}
      </ul>
    </section>
  );
};

export default ProfileTabs;
