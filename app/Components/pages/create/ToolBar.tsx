"use client";

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import toolBarButtons from "@/constants/toolBarButtons";
import { LuLink as Link } from "react-icons/lu";
import { LuYoutube as Video } from "react-icons/lu";
import { LuImage as Image } from "react-icons/lu";
import { ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { ToggleGroup } from "@/app/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import AddResource from "./AddResource";
import TextAlignBtn from "./TextAlignBtn";
import { useState } from "react";

function ToolBar({ editor }: { editor: Editor | null }) {
  const [url, setUrl] = useState<string>("");
  if (!editor) {
    return null;
  }
  const buttons = toolBarButtons(editor);

  return (
    <ToggleGroup
      type="multiple"
      className="fixed left-1/2 top-14 z-40 flex w-full -translate-x-1/2 flex-wrap justify-center p-1 lg:top-3 lg:w-fit lg:flex-nowrap"
    >
      {buttons.map((button) => (
        <ToggleGroupItem
          key={button.name}
          variant={editor.isActive(button.name) ? "outline" : "default"}
          onClick={(e) => {
            e.preventDefault();
            button.action(editor);
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          value="bold"
          aria-label={button.label}
        >
          <button.icon className="size-5 sm:size-6" />
        </ToggleGroupItem>
      ))}

      <TextAlignBtn
        alignment="left"
        editor={editor}
        Icon={<AlignLeft className="size-5 sm:size-6" />}
      />

      <TextAlignBtn
        alignment="center"
        editor={editor}
        Icon={<AlignCenter className="size-5 sm:size-6" />}
      />

      <TextAlignBtn
        alignment="right"
        editor={editor}
        Icon={<AlignRight className="size-5 sm:size-6" />}
      />

      <AddResource
        Icon={<Image />}
        label="Image url"
        url={url}
        setUrl={setUrl}
        description="add the url of the iamge you wish to imbel"
        action={() => {
          editor.chain().focus().setImage({ src: url }).run();
        }}
      />
      <AddResource
        Icon={<Video />}
        label="Vido url"
        url={url}
        setUrl={setUrl}
        description="add the url of the Video you wish to imbel"
        action={() => {
          editor.commands.setYoutubeVideo({
            src: url,
          });
        }}
      />
      <AddResource
        Icon={<Link />}
        label="Link url"
        url={url}
        setUrl={setUrl}
        description="add the url of the Link you wish to imbel"
        action={() =>
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run()
        }
      />
    </ToggleGroup>
  );
}

export default ToolBar;
