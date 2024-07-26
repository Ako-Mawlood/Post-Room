import { LuLink as Link } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "../../ui/button";
import { Input } from "@/app/components/ui/input";
import { useEffect, useState } from "react";
import { ToggleGroupItem } from "../../ui/toggle-group";
const AddLink = ({ editor }: { editor: any }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    setLinkUrl("");
  }, [isPopoverOpen]);
  function addLink() {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
  }
  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          {/* <Button
            variant={editor.isActive("link") ? "outline" : "default"}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleLink({ href: linkUrl }).run();
            }}
            disabled={
              !editor.can().chain().focus().toggleLink({ href: linkUrl }).run()
            }
            value="link"
            aria-label="Toggle link"
          ></Button> */}
          <Link />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <h1>Link Url</h1>
          <p className="text-sm text-muted-foreground">
            Provide the URL of the website you wish to embed.
          </p>
          <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
          <Button type="button" onClick={addLink}>
            Add
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddLink;
