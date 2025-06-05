import CodeBlock from '@tiptap/extension-code-block';

const CustomCodeBlock = CodeBlock.extend({
  addAttributes() {
    return {
      language: {
        default: 'plain',
      },
    };
  },
});

export default CustomCodeBlock;
