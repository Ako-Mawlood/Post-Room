"use client"

import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./ToolBar"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import useDebounce from "@/app/Hooks/useDebounce"
import {useState, useEffect} from "react"

const Tiptap = ({content}: any) => {
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
        class: "w-full min-h-96 mx-auto pg-transparend p-2 text-xl outline-none",
      },
    },
    onFocus: async ({editor}) => {},
    onUpdate: ({editor}) => {
      const content = editor.getHTML()
    },
  })

  return (
    <>
      <ToolBar editor={editor} />
      <div className="prose">
        <EditorContent className="text-accent-foreground" editor={editor} />
      </div>
    </>
  )
}

export default Tiptap
