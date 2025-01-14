import { CodeBlock } from "@tiptap/extension-code-block";
import { Copy, Check } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";

export const CustomCodeBlock = CodeBlock.extend({
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement("div");
      dom.classList.add("relative");

      const pre = document.createElement("pre");
      pre.classList.add("code-block");
      pre.textContent = node.textContent;

      const button = document.createElement("button");
      button.classList.add("copy-button");
      button.style.position = "absolute";
      button.style.top = "0";
      button.style.right = "0";
      button.style.padding = "0.5rem";
      button.style.backgroundColor = "#0F1116";
      button.style.color = "#fff";
      button.style.border = "none";
      button.style.cursor = "pointer";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.style.width = "2.5rem";
      button.style.height = "2.5rem";

      const iconWrapper = document.createElement("div");
      iconWrapper.classList.add("icon-wrapper");

      // Render the Copy icon using React
      ReactDOM.render(<Copy size={16} color="white" />, iconWrapper);
      button.appendChild(iconWrapper);

      // Create tooltip
      const tooltip = document.createElement("span");
      tooltip.classList.add("tooltip");
      tooltip.textContent = "Copy";
      tooltip.style.position = "absolute";
      tooltip.style.bottom = "100%";
      tooltip.style.left = "50%";
      tooltip.style.transform = "translateX(-50%)";
      tooltip.style.marginBottom = "0.5rem";
      tooltip.style.padding = "0.25rem 0.5rem";
      tooltip.style.backgroundColor = "#000";
      tooltip.style.color = "#fff";
      tooltip.style.borderRadius = "0.25rem";
      tooltip.style.fontSize = "0.75rem";
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
      tooltip.style.transition = "opacity 0.1s, visibility 0.1s";

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
          // Replace the icon with the Check icon
          ReactDOM.render(<Check size={16} color="white" />, iconWrapper);
          // Change tooltip text to "Copied"
          tooltip.textContent = "Copied";
          setTimeout(() => {
            // Revert back to the Copy icon and tooltip text
            ReactDOM.render(<Copy size={16} color="white" />, iconWrapper);
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
