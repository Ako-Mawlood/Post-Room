import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Markdown } from "tiptap-markdown";
import Code from "@tiptap/extension-code";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
const BlogContent = ({ content }: { content: string }) => {
  const editor = useEditor({
    content,
    editable: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),

      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
      Underline,
      TextStyle,
      Code,
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
      Markdown,
    ],
    editorProps: {
      attributes: {
        class: "w-full min-h-96 mx-auto pg-transparent p-2  outline-none",
      },
    },
  });

  if (!editor) {
    return;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="prose relative dark:prose-dark">
        <EditorContent
          placeholder="Content here..."
          className="disabled: m-0 h-min w-full p-0"
          editor={editor}
        />
      </div>
    </div>
  );
};

export default BlogContent;
