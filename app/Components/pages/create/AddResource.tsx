"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import React from "react";
import { IconType } from "react-icons/lib";

type addResourceProps = {
  type: string;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  action: () => void;
  Icon: IconType;
};
const AddResource = ({ type, url, setUrl, action, Icon }: addResourceProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    setUrl("");
  }, [isPopoverOpen, setUrl]);

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <Icon className="size-9 p-2 text-accent-foreground hover:bg-muted sm:size-10" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <h1>{type} url</h1>
          <p className="text-sm text-muted-foreground">
            Add the {type} you want to embed.
          </p>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button
            className="my-2 h-8 w-20"
            type="button"
            onClick={() => {
              action();
              setIsPopoverOpen(false);
            }}
          >
            Add
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddResource;
