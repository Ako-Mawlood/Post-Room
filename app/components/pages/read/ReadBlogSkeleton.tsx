import { Skeleton } from "@/app/components/ui/skeleton";

const ReadBlogSkeleton = () => {
  return (
    <section className="mx-auto mt-10 w-full px-6 md:mt-16 md:w-[45rem]">
      {/* Title Skeleton */}
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-4 w-full md:h-9 md:w-5/6" />
        <Skeleton className="h-4 w-5/6 md:h-9" />
        <Skeleton className="h-4 w-2/6 md:h-9" />
      </div>

      {/* Author and Interaction Bar Skeleton */}
      <section className="flex w-full flex-col items-start justify-between gap-4 py-6 sm:flex-row">
        {/* Author Info */}
        <div className="flex w-full items-center gap-4 sm:w-fit">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 sm:w-40" />
            <div className="flex gap-2 text-xs text-muted-foreground">
              {[...Array(2)].map((_, index) => (
                <Skeleton key={index} className="h-3 w-16" />
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Bar */}
        <div className="flex w-full items-center gap-3 border-y py-4 sm:w-fit sm:border-none">
          <>
            <Skeleton className="h-8 w-10 rounded-full" />
            <Skeleton className="h-8 w-10 rounded-full" />
            <Skeleton className="h-8 w-10 rounded-full sm:w-16" />
            <Skeleton className="h-8 w-10 rounded-full sm:w-14" />
          </>
        </div>
      </section>

      {/* Blog Image Skeleton */}
      <Skeleton className="h-[40vh] w-full sm:h-[50vh]" />

      {/* Blog Content Skeleton */}
      <section className="flex flex-col gap-3 py-10">
        {[...Array(10)].map((_, index) => (
          <Skeleton
            key={index}
            className={`h-4 w-${index % 2 === 0 ? "full" : "3/4"} sm:w-${
              index % 2 === 0 ? "[90%]" : "[75%]"
            }`}
          />
        ))}
      </section>
    </section>
  );
};

export default ReadBlogSkeleton;
