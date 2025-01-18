import { CodeBlock } from "@tiptap/extension-code-block";
import { Copy, Check } from "lucide-react";
import React from "react";
import { createRoot, Root } from "react-dom/client";

export const CustomCodeBlock = CodeBlock.extend({
  addNodeView() {
    return ({ node }: { node: { textContent: string } }) => {
      const dom = document.createElement("div");
      dom.classList.add("relative");

      const pre = document.createElement("pre");
      pre.classList.add("code-block");
      pre.textContent = node.textContent;

      const button = document.createElement("button");
      button.classList.add("copy-button");
      Object.assign(button.style, {
        position: "absolute",
        top: "0",
        right: "0",
        padding: "0.5rem",
        backgroundColor: "#0F1116",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.5rem",
        height: "2.5rem",
      } as React.CSSProperties);

      const iconWrapper = document.createElement("div");
      iconWrapper.classList.add("icon-wrapper");

      // Use createRoot for rendering the Copy icon
      const copyRoot: Root = createRoot(iconWrapper);
      copyRoot.render(<Copy size={16} color="white" />);
      button.appendChild(iconWrapper);

      // Create tooltip
      const tooltip = document.createElement("span");
      tooltip.classList.add("tooltip");
      tooltip.textContent = "Copy";
      Object.assign(tooltip.style, {
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "0.5rem",
        padding: "0.25rem 0.5rem",
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "0.25rem",
        fontSize: "0.75rem",
        visibility: "hidden",
        opacity: "0",
        transition: "opacity 0.1s, visibility 0.1s",
      } as React.CSSProperties);

      button.addEventListener("mouseenter", () => {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
      });

      button.addEventListener("mouseleave", () => {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
      });

      button.appendChild(tooltip);

      button.addEventListener("click", () => {
        navigator.clipboard.writeText(node.textContent).then(() => {
          // Replace the icon with the Check icon using createRoot
          copyRoot.render(<Check size={16} color="white" />);
          tooltip.textContent = "Copied";
          setTimeout(() => {
            // Revert back to the Copy icon and reset tooltip text
            copyRoot.render(<Copy size={16} color="white" />);
            tooltip.textContent = "Copy";
          }, 2000);
        });
      });

      dom.appendChild(pre);
      dom.appendChild(button);

      return {
        dom,
        contentDOM: pre,
      };
    };
  },
});