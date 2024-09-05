import React from "react";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";

const UserDetailEditorSkeleto = () => {
  return (
    <>
      <div className="flex items-center justify-between md:p-3">
        <div className="flex flex-col justify-between">
          <h1 className="font-semibold">Fullname</h1>

          <Skeleton className="h-3 w-28" />
        </div>

        <Button variant="secondary">Edit</Button>
      </div>
      <div className="flex items-center justify-between md:p-3">
        <div className="flex flex-col justify-between">
          <h1 className="font-semibold">Username</h1>

          <Skeleton className="h-3 w-28" />
        </div>

        <Button variant="secondary">Edit</Button>
      </div>
      <div className="flex w-full items-center justify-between md:p-3">
        <div className="flex w-full flex-col justify-between">
          <h1 className="font-semibold">Bio</h1>

          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="my-2 h-3 w-10/12" />
          <Skeleton className="h-3 w-3/12" />
        </div>

        <Button variant="secondary">Edit</Button>
      </div>
    </>
  );
};

export default UserDetailEditorSkeleto;
