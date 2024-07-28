import React from "react";
import { Button } from "../../ui/button";
import { Editor } from "@tiptap/react";

type textAlignBtnProps = {
  alignment: "right" | "center" | "left";
  editor: Editor;
  Icon: React.ReactNode;
};
const TextAlignBtn = ({ alignment, editor, Icon }: textAlignBtnProps) => {
  return (
    <Button
      onClick={() => editor?.chain().focus().setTextAlign(alignment).run()}
      type="button"
      value={alignment}
      aria-label="Align right"
      variant={editor.isActive({ textAlign: alignment }) ? "default" : "ghost"}
      className="h-8 rounded-lg px-2 duration-0"
    >
      {React.cloneElement(Icon as React.ReactElement, {
        className: "size-5 sm:size-6",
      })}
    </Button>
  );
};

export default TextAlignBtn;
