import ToolBar from "./ToolBar";
import { Editor as EditorType, EditorContent } from "@tiptap/react";
import clsx from "clsx";
import { FormMessage } from "@/app/components/ui/form";
import useEditorInstance from "@/app/Hooks/useEditorInstance";
import { CreateBlogType } from "@/app/types/CreateBlogType";
import { Dispatch, SetStateAction } from "react";

type EditorProps = {
  blogData: CreateBlogType;
  setBlogData: Dispatch<SetStateAction<CreateBlogType>>;
  form: any;
};

const Editor = ({ blogData, setBlogData, form }: EditorProps) => {
  function updateContent(editor: EditorType) {
    const contentMarkdown = editor.storage.markdown.getMarkdown();
    setBlogData((prev) => ({ ...blogData, content: contentMarkdown }));
    form.setValue("content", contentMarkdown);
  }
  const isEditable = true;

  const content = blogData.content;
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
