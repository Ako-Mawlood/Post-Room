"use client";

import { Card, CardHeader, CardContent } from "./card";
import { Avatar, AvatarFallback } from "./avatar";
import { Button } from "./button";

const BlogCardSkeleton = () => {
  return (
    <Card className="flex h-72 w-full animate-pulse flex-col items-start justify-between rounded-xl border border-border bg-background">
      {/* Card Header */}
      <CardHeader className="flex w-full flex-row items-center justify-start gap-2">
        <Avatar>
          <AvatarFallback className="h-8 w-8 rounded-full bg-muted"></AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="h-4 w-24 rounded-lg bg-muted"></span>
          <span className="h-3 w-32 rounded-lg bg-muted"></span>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex h-fit w-full justify-between gap-4">
        {/* Left Content */}
        <div className="flex flex-grow flex-col gap-2">
          <div className="h-6 w-3/4 rounded-lg bg-muted"></div>
          <div className="h-4 w-full rounded-lg bg-muted"></div>
          <div className="h-4 w-2/3 rounded-lg bg-muted"></div>
        </div>

        {/* Right Image Placeholder */}
        <div className="relative h-24 w-[11rem] rounded-lg bg-muted"></div>
      </CardContent>

      {/* Footer Section */}
      <div className="flex w-full items-center justify-between gap-2 px-5 pb-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-4 w-10 rounded-lg bg-muted"></div>
          <div className="h-4 w-6 rounded-lg bg-muted"></div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="truncate rounded-full bg-muted py-1 text-xs font-normal text-transparent"
          >
            <span className="h-4 w-10"></span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="truncate rounded-full bg-muted py-1 text-xs font-normal text-transparent"
          >
            <span className="h-4 w-12"></span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BlogCardSkeleton;
