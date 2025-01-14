import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import { Editor, useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Markdown } from "tiptap-markdown";
import { CustomCodeBlock } from "../components/pages/create/CustomCodeBlock";
type UseEditorInstanceProps = {
  content: string;
  updateContent?: (editor: Editor) => void;
  isEditable: boolean;
};

function useEditorInstance({
  content,
  updateContent = () => {},
  isEditable,
}: UseEditorInstanceProps) {
  const editor = useEditor({
    editable: isEditable,
    content,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
      CustomCodeBlock,
      Underline,
      TextStyle,

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
        class: "w-full min-h-96 mx-auto pg-transparent p-2 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      updateContent(editor as Editor);
    },
  });

  return editor;
}

export default useEditorInstance;
