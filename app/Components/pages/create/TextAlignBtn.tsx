import React from "react";
import { Button } from "../../ui/button";
import { Editor } from "@tiptap/react";
import { LucideIcon } from "lucide-react";

type textAlignBtnProps = {
  alignTo: "right" | "center" | "left";
  editor: Editor;
  Icon: LucideIcon;
};
const TextAlignBtn = ({ alignTo, editor, Icon }: textAlignBtnProps) => (
  <Button
    onClick={() => editor?.chain().focus().setTextAlign(alignTo).run()}
    type="button"
    value={alignTo}
    aria-label="Align right"
    variant={editor.isActive({ textAlign: alignTo }) ? "default" : "ghost"}
    className="h-8 rounded-lg px-2 duration-0"
  >
    <Icon className="size-5 sm:size-6" />
  </Button>
);

export default TextAlignBtn;
