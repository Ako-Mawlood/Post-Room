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
  ParkingSquare as Paragraph,
} from "lucide-react";
import { ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { ToggleGroup } from "@/app/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import AddVideo from "./AddVideo";
import AddLink from "./AddLink";
import AddImage from "./AddImage";
import { Button } from "../../ui/button";

function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
  function handleTextAlign(alignment: "center" | "left" | "right") {
    editor?.chain().focus().setTextAlign(alignment).run();
  }

  return (
    <ToggleGroup
      type="multiple"
      className="fixed left-1/2 top-14 z-40 flex w-full -translate-x-1/2 flex-wrap justify-center p-1 lg:top-3 lg:w-fit lg:flex-nowrap"
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
        <Bold className="size-5 sm:size-6" />
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
        <Italic className="size-5 sm:size-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("underline") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        value="underline"
        aria-label="Toggle underline"
      >
        <Underline className="size-5 sm:size-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={editor.isActive("strike") ? "outline" : "default"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        value="strike"
        aria-label="Toggle strikethrough"
      >
        <Strikethrough className="size-5 sm:size-6" />
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
        <Highlighter className="size-5 sm:size-6" />
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
        <Code className="size-5 sm:size-6" />
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
        <List className="size-5 sm:size-6" />
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
        <ListOrdered className="size-5 sm:size-6" />
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
        <QuoteIcon className="size-5 sm:size-6" />
      </ToggleGroupItem>

      {/* Headings */}
      <ToggleGroupItem
        variant={
          editor.isActive("heading", { level: 1 }) ? "outline" : "default"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        value="heading1"
        aria-label="Heading 1"
      >
        <Heading1 className="size-5 sm:size-6" />
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
        aria-label="Heading 2"
      >
        <Heading2 className="size-5 sm:size-6" />
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
        aria-label="Heading 3"
      >
        <Heading3 className="size-5 sm:size-6" />
      </ToggleGroupItem>

      <Button
        onClick={() => handleTextAlign("left")}
        value="left"
        aria-label="Align left"
        type="button"
        variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
        className="h-8 rounded-lg px-2 duration-0"
      >
        <AlignLeft className="size-5 sm:size-6" />
      </Button>
      <Button
        onClick={() => handleTextAlign("center")}
        type="button"
        value="center"
        aria-label="Align center"
        variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
        className="h-8 rounded-lg px-2 duration-0"
      >
        <AlignCenter className="size-5 sm:size-6" />
      </Button>
      <Button
        onClick={() => handleTextAlign("right")}
        type="button"
        value="right"
        aria-label="Align right"
        variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
        className="h-8 rounded-lg px-2 duration-0"
      >
        <AlignRight className="size-5 sm:size-6" />
      </Button>

      <AddImage editor={editor} />
      <AddLink editor={editor} />
      <AddVideo editor={editor} />
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        value="undo"
        aria-label="Undo"
      >
        <Undo className="size-5 sm:size-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        value="redo"
        aria-label="Redo"
      >
        <Redo className="size-5 sm:size-6" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default ToolBar;
