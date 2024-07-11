"use client"

import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./ToolBar"
import Link from "@tiptap/extension-link"
import {Dispatch, SetStateAction} from "react"
import Underline from "@tiptap/extension-underline"

const Tiptap = ({content, setContent}: {content: string; setContent: Dispatch<SetStateAction<string>>}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "w-full min-h-96 mx-auto pg-transparend p-2 text-xl outline-none",
      },
    },
    onUpdate: ({editor}) => {
      setContent(editor.getHTML())
    },
  })

  return (
    <>
      <ToolBar editor={editor} />
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default Tiptap
