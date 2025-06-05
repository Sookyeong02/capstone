import type { ContentBlock } from '@/types/portfolio';

export const ContentToBlocks = (json: any): ContentBlock[] => {
  if (!json?.content) return [];

  return json.content.map((block: any) => {
    if (block.type === 'paragraph') {
      const text = block.content?.map((c: any) => c.text).join('') ?? '';
      return { type: 'text', content: text };
    }

    if (block.type === 'image') {
      return { type: 'image', content: block.attrs.src };
    }

    if (block.type === 'codeBlock') {
      return {
        type: 'code',
        content: block.content?.[0]?.text || '',
        language: block.attrs.language || 'text',
      };
    }

    return { type: 'text', content: '' };
  });
};

export const blocksToContent = (blocks: ContentBlock[]) => {
  return {
    type: 'doc',
    content: blocks.map((block) => {
      if (block.type === 'text') {
        return {
          type: 'paragraph',
          content: block.content ? [{ type: 'text', text: block.content }] : [],
        };
      }

      if (block.type === 'image') {
        return {
          type: 'image',
          attrs: { src: block.content },
        };
      }

      if (block.type === 'code') {
        return {
          type: 'codeBlock',
          attrs: { language: block.language || 'text' },
          content: [{ type: 'text', text: block.content }],
        };
      }

      return {
        type: 'paragraph',
        content: [],
      };
    }),
  };
};
