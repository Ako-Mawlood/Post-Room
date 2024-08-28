import { Editor } from "@tiptap/react";
import { IconType } from "react-icons/lib";
import { LuLink as Link } from "react-icons/lu";
import { LuYoutube as Video } from "react-icons/lu";
import { LuImage as Image } from "react-icons/lu";

type resourcesType = {
  id: number;
  type: string;
  icon: IconType;
  action: () => void;
}[];

export function getResources(editor: Editor, url: string) {
  const resources: resourcesType = [
    {
      id: 1,
      type: "Link",
      icon: Link,
      action: () => {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      },
    },
    {
      id: 2,
      type: "Image",
      icon: Image,
      action: () => {
        editor.chain().focus().setImage({ src: url }).run();
      },
    },
    {
      id: 3,
      type: "Video",
      icon: Video,
      action: () => {
        editor.commands.setYoutubeVideo({
          src: url,
        });
      },
    },
  ];
  return resources;
}
