import { Skeleton } from "@/app/components/ui/skeleton";

const SheetSkeleton = () => {
  return (
    <div className="mt-32 flex min-h-[90vh] w-full flex-col gap-4 rounded-lg bg-gray-100 px-3 py-6 dark:bg-muted lg:mx-auto lg:w-[55rem] lg:px-14">
      <Skeleton className="h-10 w-40 bg-primary/15" />
      <div className="flex flex-col gap-3">
        <Skeleton className="min-h-96 w-full bg-primary/15" />
        <div className="flex gap-1">
          <Skeleton className="h-8 w-28 bg-primary/15" />
          <Skeleton className="h-8 w-28 bg-primary/15" />
          <Skeleton className="h-8 w-28 bg-primary/15" />
          <Skeleton className="h-8 w-28 bg-primary/15" />
        </div>
        <Skeleton className="h-10 w-2/3 bg-primary/15" />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <Skeleton className="h-10 w-full bg-primary/15" />
        <Skeleton className="h-3 w-full bg-primary/15" />
        <Skeleton className="h-3 w-full bg-primary/15" />
        <Skeleton className="h-3 w-3/4 bg-primary/15" />
        <Skeleton className="h-3 w-3/4 bg-primary/15" />
        <Skeleton className="h-3 w-1/4 bg-primary/15" />
      </div>
    </div>
  );
};

export default SheetSkeleton;
