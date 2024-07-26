"use client";

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
  Underline,
  Highlighter,
  AlignCenter,
  AlignLeft,
  AlignRight,
} from "lucide-react";
import { ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { ToggleGroup } from "@/app/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import AddVideo from "./AddVideo";
import AddLink from "./AddLink";
import AddImage from "./AddImage";

function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <ToggleGroup
      type="multiple"
      className="fixed top-2 z-50 mx-8 flex w-fit flex-wrap justify-start bg-card p-2 text-black dark:bg-neutral-100"
    >
      <ToggleGroupItem
        variant={editor.isActive("bold") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        value="bold"
        aria-label="Toggle bold"
      >
        <Bold className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("italic") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        value="italic"
        aria-label="Toggle italic"
      >
        <Italic className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("underline") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        value="underline"
        aria-label="Toggle underlines"
      >
        <Underline className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("strike") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        value="strike"
        aria-label="Toggle blockquote"
      >
        <Strikethrough className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("highlight") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHighlight().run();
        }}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        value="highlight"
        aria-label="Toggle highlight"
      >
        <Highlighter className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("left") ? "outline" : "default"}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        value="left"
        aria-label="Toggle align left"
      >
        <AlignLeft className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("center") ? "outline" : "default"}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        value="center"
        aria-label="Toggle align center"
      >
        <AlignCenter className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("right") ? "outline" : "default"}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        value="center"
        aria-label="Toggle align right"
      >
        <AlignRight className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={
          editor.isActive("heading", { level: 1 }) ? "outline" : "default"
        }
        onClick={(e: any) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        value="heading1"
        aria-label="Toggle heading 1"
      >
        <Heading1 className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={
          editor.isActive("heading", { level: 2 }) ? "outline" : "default"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        value="heading2"
        aria-label="Toggle heading 2"
      >
        <Heading2 className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={
          editor.isActive("heading", { level: 3 }) ? "outline" : "default"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
        value="heading3"
        aria-label="Toggle heading 3"
      >
        <Heading3 className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("code") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        value="code"
        aria-label="Toggle code"
      >
        <Code className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("bulletList") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        value="bulletList"
        aria-label="Toggle bullet list"
      >
        <List className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("orderedList") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        value="orderedList"
        aria-label="Toggle ordered list"
      >
        <ListOrdered className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("blockquote") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        value="blockquote"
        aria-label="Toggle blockquote"
      >
        <QuoteIcon className="h-6 w-6" />
      </ToggleGroupItem>
      <AddImage editor={editor} />
      <AddLink editor={editor} />
      <AddVideo editor={editor} />
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        value="undo"
        aria-label="Toggle blockquote"
      >
        <Undo className="h-6 w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        value="redo"
        aria-label="Toggle blockquote"
      >
        <Redo className="h-6 w-6" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default ToolBar;
