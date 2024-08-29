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
  ListOrdered,
  QuoteIcon,
  Underline,
  Highlighter,
} from "lucide-react";
import { Editor } from "@tiptap/react";

const toolBarButtons = () => [
  {
    name: "bold",
    label: "Toggle bold",
    icon: Bold,
    action: (editor: Editor) => {
      editor.chain().focus().toggleBold().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    label: "Toggle italic",
    icon: Italic,
    action: (editor: Editor) => {
      editor.chain().focus().toggleItalic().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleItalic().run(),
  },
  {
    name: "underline",
    label: "Toggle underline",
    icon: Underline,
    action: (editor: Editor) => {
      editor.chain().focus().toggleUnderline().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleUnderline().run(),
  },
  {
    name: "highlight",
    label: "Toggle highlight",
    icon: Highlighter,
    action: (editor: Editor) => {
      editor.chain().focus().toggleHighlight().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleHighlight().run(),
  },
  {
    name: "code",
    label: "Toggle code",
    icon: Code,
    action: (editor: Editor) => {
      editor.chain().focus().toggleCode().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleCode().run(),
  },
  {
    name: "bulletList",
    label: "Toggle bullet list",
    icon: List,
    action: (editor: Editor) => {
      editor.chain().focus().toggleBulletList().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleBulletList().run(),
  },
  {
    name: "orderedList",
    label: "Toggle ordered list",
    icon: ListOrdered,
    action: (editor: Editor) => {
      editor.chain().focus().toggleOrderedList().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleOrderedList().run(),
  },
  {
    name: "blockquote",
    label: "Toggle blockquote",
    icon: QuoteIcon,
    action: (editor: Editor) => {
      editor.chain().focus().toggleBlockquote().run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleBlockquote().run(),
  },
  {
    name: "heading1",
    label: "Heading 1",
    icon: Heading1,
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    name: "heading2",
    label: "Heading 2",
    icon: Heading2,
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    name: "heading3",
    label: "Heading 3",
    icon: Heading3,
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
    disabledWhile: (editor: Editor) =>
      !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    name: "undo",
    label: "Undo",
    icon: Undo,
    action: (editor: Editor) => {
      editor.chain().focus().undo().run();
    },
    disabledWhile: () => false,
  },
  {
    name: "redo",
    label: "Redo",
    icon: Redo,
    action: (editor: Editor) => {
      editor.chain().focus().redo().run();
    },
    disabledWhile: () => false,
  },
];

export default toolBarButtons;
