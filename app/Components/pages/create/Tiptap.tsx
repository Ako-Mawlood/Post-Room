"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import clsx from "clsx";
import { FormMessage } from "../../ui/form";
const Tiptap = ({ content, setContent, form }: any) => {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "w-full min-h-96 mx-auto pg-transparent p-2 text-xl outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const contentHTML = editor.getHTML();
      setContent(contentHTML);
      form.setValue("content", contentHTML);
    },
  });

  return (
    <div className="flex w-full flex-col">
      <ToolBar editor={editor} />

      <div
        className={clsx("dark:prose-dark prose relative", {
          "mt-4 border border-red-500": form.formState.errors.content,
        })}
      >
        {form.formState.errors.content && (
          <FormMessage className="absolute -top-3 left-4 bg-muted p-1">
            {form.formState.errors.content.message}
          </FormMessage>
        )}
        <EditorContent
          placeholder="Content here..."
          className="m-0 h-min w-full p-0"
          editor={editor}
        />
      </div>
    </div>
  );
};

export default Tiptap;
