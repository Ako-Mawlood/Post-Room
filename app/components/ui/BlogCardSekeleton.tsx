import { Card, CardHeader, CardContent, CardFooter } from "./card";
import { Skeleton } from "./skeleton";
import { Avatar } from "./avatar";

const BlogCardSkeleton = () => {
  return (
    <Card className="flex h-52 w-full items-start gap-1 rounded-lg border-none">
      <div className="flex h-full w-4/6 flex-col justify-between p-2">
        <CardHeader className="flex w-full flex-row gap-1 space-y-0 p-0">
          <Skeleton className="h-4 w-12 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-lg" />
          <Skeleton className="h-4 w-8 rounded-lg" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2 overflow-hidden p-0">
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-5 w-5/6 rounded" />
        </CardContent>
        <CardFooter className="flex w-full items-center justify-between gap-2 p-0 text-xs">
          <div className="flex items-center">
            <Avatar>
              <Skeleton className="h-8 w-8 rounded-full" />
            </Avatar>
            <Skeleton className="ml-2 h-4 w-20 rounded" />
          </div>
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
          <div className="flex w-fit items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-6 rounded" />
          </div>
        </CardFooter>
      </div>
      <div className="relative h-full w-2/6 rounded-lg">
        <Skeleton className="h-full w-full rounded-lg object-cover" />
      </div>
    </Card>
  );
};

export default BlogCardSkeleton;
