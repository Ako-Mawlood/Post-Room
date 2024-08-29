"use client";
import { EditorContent } from "@tiptap/react";
import EditorProvider, { useEditorContext } from "../providers/EditorProvider";
import React from "react";

const BlogContent = () => {
  const editor = useEditorContext();
  return (
    <EditorContent
      placeholder="Content here..."
      className="m-0 h-min w-full p-0"
      editor={editor}
    />
  );
};

export default BlogContent;
