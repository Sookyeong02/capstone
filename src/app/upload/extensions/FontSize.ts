const FontSize = {
  name: 'fontSize',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
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
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: { chain: any }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },

      unsetFontSize:
        () =>
        ({ chain }: { chain: any }) => {
          return chain().setMark('textStyle', { fontSize: null }).run();
        },
    };
  },
};

export default FontSize;
