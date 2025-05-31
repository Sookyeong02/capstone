import { Extension } from '@tiptap/core'

export const FontFamily = Extension.create({
  name: 'fontFamily',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: element => ({
              fontFamily: element.style.fontFamily.replace(/['"]/g, ''),
            }),
            renderHTML: attributes => {
              if (!attributes.fontFamily) return {}
              return {
                style: `font-family: ${attributes.fontFamily}`,
              }
            },
          },
        },
      },
    ]
  },
})