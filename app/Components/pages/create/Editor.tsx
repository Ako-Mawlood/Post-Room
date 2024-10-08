import ToolBar from "./ToolBar";
import { Editor as EditorType, EditorContent } from "@tiptap/react";
import clsx from "clsx";
import { FormMessage } from "../../ui/form";
import useEditorInstance from "@/app/Hooks/useEditorInstance";

type EditorProps = {
  content: string;
  setContent: (content: string) => void;
  form: any;
};

const Editor = ({ content, setContent, form }: EditorProps) => {
  function updateContent(editor: EditorType) {
    const contentMarkdown = editor.storage.markdown.getMarkdown();
    setContent(contentMarkdown);
    form.setValue("content", contentMarkdown);
  }
  const isEditable = true;
  const editor = useEditorInstance({ content, updateContent, isEditable });

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

export default Editor;
