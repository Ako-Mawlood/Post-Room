// extensions/CodeBlockHighlight.ts
import { Node } from '@tiptap/core';
import hljs from '../lib/hljs'; 

const CodeBlockHighlight = Node.create({
  name: 'codeBlockHighlight',

  content: 'text*',

  code: true,

  addAttributes() {
    return {
      language: {
        default: 'javascript',
        parseHTML: (element) => element.getAttribute('data-language') || 'plaintext',
        renderHTML: (attributes) => {
          return {
            'data-language': attributes.language,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre',
        getAttrs: (element) => ({
          language: element.querySelector('code')?.getAttribute('data-language') || 'plaintext',
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const language = node.attrs.language || 'plaintext';
    const code = node.content.textContent || '';
    const highlightedCode = hljs.highlight(code, { language }).value;

    return [
      'pre',
      HTMLAttributes,
      [
        'code',
        {
          'data-language': language,
          class: `language-${language}`,
        },
        highlightedCode,
      ],
    ];
  },

  addCommands() {
    return {
      setCodeBlockHighlight: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },
});

export default CodeBlockHighlight;