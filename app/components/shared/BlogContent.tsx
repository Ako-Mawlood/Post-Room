import { EditorContent } from "@tiptap/react";
import useEditorInstance from "@/app/Hooks/useEditorInstance";
const BlogContent = ({ content }: { content: string }) => {
  const isEditable = false;
  const editor = useEditorInstance({ content, isEditable });

  if (!editor) {
    return;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="prose relative dark:prose-dark">
        <EditorContent
          placeholder="Content here..."
          className="disabled: m-0 h-min w-full p-0 font-sans"
          editor={editor}
        />
      </div>
    </div>
  );
};

export default BlogContent;
