import { useEditor } from '@tiptap/react'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Code from '@tiptap/extension-code'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import { FontFamily } from './extensions/FontFamily'
import FontSize from '../../app/upload/extensions/FontSize'
import { createLowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'

const lowlight = createLowlight()
lowlight.register('js', js)
lowlight.register('ts', ts)

export const useCustomEditor = () => {
  return useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      TextStyle,
      FontSize,
      FontFamily,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Code,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'js',
      }),
    ],
    content: '',
    immediatelyRender: false,
  })
}