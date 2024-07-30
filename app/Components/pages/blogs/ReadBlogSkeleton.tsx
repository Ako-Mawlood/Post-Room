import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Skeleton } from "../../ui/skeleton";
import { Dot } from "lucide-react";

const ReadBlogSkeleton = () => {
  return (
    <section className="w-full px-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="mt-10 w-96 py-5 md:w-1/2" />
        <ul className="flex gap-3">
          <li>
            <Skeleton className="h-4 w-14" />
          </li>{" "}
          <li>
            <Skeleton className="h-4 w-16" />
          </li>{" "}
          <li>
            <Skeleton className="h-4 w-20" />
          </li>{" "}
          <li>
            <Skeleton className="h-4 w-16" />
          </li>
        </ul>
      </div>

      <section className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-14 rounded-full" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </section>
      <Skeleton className="relative h-[90vh] w-full overflow-hidden"></Skeleton>
    </section>
  );
};

export default ReadBlogSkeleton;
