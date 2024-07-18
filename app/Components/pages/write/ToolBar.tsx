"use client"

import {
  Bold,
  Italic,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Code,
  List,
  Strikethrough,
  ListOrdered,
  QuoteIcon,
  Link,
} from "lucide-react"

import {ToggleGroupItem} from "@/app/Components/ui/toggle-group"
import {ToggleGroup} from "@/app/Components/ui/toggle-group"
import {Editor} from "@tiptap/react"

function ToolBar({editor}: {editor: Editor | null}) {
  if (!editor) {
    return null
  }

  return (
    <ToggleGroup type="multiple" className="flex justify-start w-fit p-1 rounded-lg">
      <ToggleGroupItem
        variant={editor.isActive("bold") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBold().run()
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        value="bold"
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("italic") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleItalic().run()
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        value="italic"
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("strike") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleStrike().run()
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        value="strike"
        aria-label="Toggle blockquote"
      >
        <Strikethrough className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("heading", {level: 1}) ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({level: 1}).run()
        }}
        disabled={!editor.can().chain().focus().toggleHeading({level: 1}).run()}
        value="heading1"
        aria-label="Toggle heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("heading", {level: 2}) ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({level: 2}).run()
        }}
        disabled={!editor.can().chain().focus().toggleHeading({level: 2}).run()}
        value="heading2"
        aria-label="Toggle heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("heading", {level: 3}) ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({level: 3}).run()
        }}
        disabled={!editor.can().chain().focus().toggleHeading({level: 3}).run()}
        value="heading3"
        aria-label="Toggle heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("code") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleCode().run()
        }}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        value="code"
        aria-label="Toggle code"
      >
        <Code className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("bulletList") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBulletList().run()
        }}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        value="bulletList"
        aria-label="Toggle bullet list"
      >
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("orderedList") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleOrderedList().run()
        }}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        value="orderedList"
        aria-label="Toggle ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("blockquote") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBlockquote().run()
        }}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        value="blockquote"
        aria-label="Toggle blockquote"
      >
        <QuoteIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("blockquote") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleLink({href: "www.google.com"}).run()
        }}
        disabled={
          !editor.can().chain().focus().toggleLink({href: "www.google.com"}).run()
        }
        value="link"
        aria-label="Toggle link"
      >
        <Link className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().undo().run()
        }}
        value="undo"
        aria-label="Toggle blockquote"
      >
        <Undo className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().redo().run()
        }}
        value="redo"
        aria-label="Toggle blockquote"
      >
        <Redo className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export default ToolBar
