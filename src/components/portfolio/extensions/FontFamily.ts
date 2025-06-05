import { TextStyle } from '@tiptap/extension-text-style';

export const FontFamily = TextStyle.extend({
  addAttributes() {
    return {
      fontFamily: {
        default: null,
        parseHTML: (element: HTMLElement) => ({
          fontFamily: element.style.fontFamily?.replace(/['"]/g, '') || null,
        }),
        renderHTML: (attributes: { fontFamily?: string }) => {
          if (!attributes.fontFamily) return {};
          return {
            style: `font-family: ${attributes.fontFamily}`,
          };
        },
      },
    };
  },
});

export default FontFamily;
