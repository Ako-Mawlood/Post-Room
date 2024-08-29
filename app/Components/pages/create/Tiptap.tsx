// Tiptap.tsx
import ToolBar from "./ToolBar";
import { Editor, EditorContent } from "@tiptap/react";
import clsx from "clsx";
import { FormMessage } from "../../ui/form";
import useEditorInstance from "@/app/Hooks/useEditorInstance";

type TiptapProps = {
  content: string;
  setContent: (content: string) => void;
  form: any; // Adjust the type according to your form handling library
};

const Tiptap = ({ content, setContent, form }: TiptapProps) => {
  function updateContent(editor: Editor) {
    const contentMarkdown = editor.storage.markdown.getMarkdown();
    setContent(contentMarkdown);
    form.setValue("content", contentMarkdown);
  }

  const editor = useEditorInstance({ content, updateContent });

  if (!editor) {
    return null; // Ensure this component does not return undefined
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
