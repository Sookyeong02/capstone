import { TextStyle } from '@tiptap/extension-text-style';

export const CustomTextStyle = TextStyle.extend({
  name: 'textStyle',
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontSize?.replace('px', ''),
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.fontSize) return {};
          return {
            style: `font-size: ${attributes.fontSize}px`,
          };
        },
      },
      fontFamily: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontFamily?.replace(/['"]/g, ''),
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.fontFamily) return {};
          return {
            style: `font-family: ${attributes.fontFamily}`,
          };
        },
      },
    };
  },
});
