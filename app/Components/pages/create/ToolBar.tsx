"use client";

import toolBarButtons from "@/constants/toolBarButtons";
import { ToggleGroupItem, ToggleGroup } from "@/app/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import AddResource from "./AddResource";
import { useState } from "react";
import { getResources } from "@/constants/resources";

function ToolBar({ editor }: { editor: Editor | null }) {
  const [url, setUrl] = useState<string>("");
  if (!editor) {
    return null;
  }
  const buttons = toolBarButtons();
  const resources = getResources(editor, url);
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

      {/* Resource  buttons */}

      {resources.map((resource) => (
        <AddResource
          key={resource.id}
          Icon={resource.icon}
          type={resource.type}
          url={url}
          setUrl={setUrl}
          action={resource.action}
        />
      ))}
    </ToggleGroup>
  );
}

export default ToolBar;
