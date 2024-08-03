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

type addResourceProps = {
  label: string;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  description: string;
  action: () => void;
  Icon: React.ReactElement;
};
const AddResource = ({
  label,
  url,
  setUrl,
  description,
  action,
  Icon,
}: addResourceProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    setUrl("");
  }, [isPopoverOpen, setUrl]);

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          {React.cloneElement(Icon as React.ReactElement, {
            className:
              "size-9 p-2 text-accent-foreground hover:bg-muted sm:size-10",
          })}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <h1>{label}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button
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
