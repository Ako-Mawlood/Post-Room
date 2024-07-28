import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import clsx from "clsx";
import { FormMessage } from "../../ui/form";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
const Tiptap = ({ content, setContent, form }: any) => {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      TextAlign.configure({
        types: [
          "heading",
          "paragraph",
          "image",
          "list_item",
          "code_block",
          "blockquote",
        ],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "my-10",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-purple-200",
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
      Youtube.configure({
        nocookie: true,
        ccLanguage: "en",
      }),
    ],
    editorProps: {
      attributes: {
        class: "w-full min-h-96 mx-auto pg-transparent p-2  outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const contentHTML = editor.getHTML();
      setContent(contentHTML);
      form.setValue("content", contentHTML);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-col">
      <ToolBar editor={editor} />
      <div
        className={clsx("prose relative dark:prose-dark", {
          "mt-4 border border-red-500": form.formState.errors.content,
        })}
      >
        {form.formState.errors.content && (
          <FormMessage className="absolute -top-3 left-4 bg-muted p-1 dark:text-red-500">
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
function ReactNodeViewRenderer(
  CodeBlockComponent: ({
    node,
    updateAttributes,
  }: any) => import("react").JSX.Element,
): import("@tiptap/react").NodeViewRenderer {
  throw new Error("Function not implemented.");
}
