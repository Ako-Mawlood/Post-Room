"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";

const BlogCardSkeleton = () => {
  return (
    <div className="h-52 w-full animate-pulse">
      <Card className="flex h-full w-full items-start gap-1 rounded-xl border-none bg-background p-2">
        <div className="flex h-full w-4/6 flex-col justify-between p-2 font-semibold">
          <CardHeader className="flex w-full flex-row gap-1 space-y-0 p-0">
            <span className="h-4 w-12 rounded-lg bg-muted"></span>
            <span className="h-4 w-16 rounded-lg bg-muted"></span>
            <span className="h-4 w-10 rounded-lg bg-muted"></span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 overflow-hidden p-0">
            <CardTitle className="h-6 w-5/6 rounded-lg bg-muted"></CardTitle>
            <div className="h-4 w-3/4 rounded-lg bg-muted"></div>
            <div className="h-4 w-2/4 rounded-lg bg-muted"></div>
          </CardContent>
          <CardFooter className="flex w-full items-center justify-between gap-2 p-0 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted"></div>
              <span className="h-4 w-16 rounded-lg bg-muted"></span>
            </div>
            <span className="h-4 w-12 rounded-lg bg-muted"></span>
            <span className="h-4 w-16 rounded-lg bg-muted"></span>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded bg-muted"></span>
              <span className="h-4 w-8 rounded-lg bg-muted"></span>
            </div>
          </CardFooter>
        </div>
        <div className="relative h-full w-2/6 rounded-xl bg-muted"></div>
      </Card>
    </div>
  );
};

export default BlogCardSkeleton;
