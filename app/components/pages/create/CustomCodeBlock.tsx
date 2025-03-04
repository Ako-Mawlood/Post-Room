import {
  NodeViewWrapper,
  NodeViewContent,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import { Copy, Check } from "lucide-react";
import React, { useState } from "react";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

// Create the lowlight instance and pass it to CodeBlockLowlight
const lowlight = createLowlight(common);

const CodeBlockComponent = ({ node }: NodeViewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(node.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodeViewWrapper as="div" className="relative">
      <pre className="code-block">
        <NodeViewContent as="code" />
      </pre>

      {/* Tooltip for the Copy button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="copy-button absolute right-2 top-2 rounded-md bg-gray-900 p-2 text-white"
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {copied ? "Copied!" : "Copy"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </NodeViewWrapper>
  );
};

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight });
