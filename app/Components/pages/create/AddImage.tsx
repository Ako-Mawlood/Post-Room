import { LuImage as Image } from "react-icons/lu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "../../ui/button";
import { Input } from "@/app/components/ui/input";
import { useEffect, useState } from "react";
const AddImage = ({ editor }: { editor: any }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    setImageUrl("");
  }, [isPopoverOpen]);
  function addImage() {
    editor.chain().focus().setImage({ src: imageUrl }).run();
  }
  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <Image className="m-1 size-5" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <h1>Image Url</h1>
          <p className="text-sm text-muted-foreground">
            Provide the URL of the Image you wish to embed.
          </p>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button type="button" onClick={addImage}>
            Add
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddImage;
