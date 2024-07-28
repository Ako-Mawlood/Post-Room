import { LuYoutube as Youtube } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "../../ui/button";
import { Input } from "@/app/components/ui/input";
import { useEffect, useState } from "react";
const AddVideo = ({ editor }: { editor: any }) => {
  const [videoURL, setVideoURL] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const addYoutubeVideo = () => {
    const url = videoURL;

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
      setVideoURL("");
      setIsPopoverOpen(false);
    }
  };
  useEffect(() => {
    setVideoURL("");
  }, [isPopoverOpen]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <Youtube className="size-9 p-2 text-accent-foreground hover:bg-muted sm:size-10" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <h1>Video Url</h1>
        <p className="text-sm text-muted-foreground">
          Provide the URL of the video you wish to embed.
        </p>
        <Input value={videoURL} onChange={(e) => setVideoURL(e.target.value)} />

        <Button type="button" onClick={addYoutubeVideo}>
          Add
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AddVideo;
