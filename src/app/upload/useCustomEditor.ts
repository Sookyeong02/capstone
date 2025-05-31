// src/app/upload/useCustomEditor.ts
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { FontFamily } from './extensions/FontFamily';

import { createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';

const lowlight = createLowlight();
lowlight.register('js', js);
lowlight.register('ts', ts);

export const useCustomEditor = () => {
  return useEditor({
    extensions: [
      StarterKit.configure({ code: false, codeBlock: false }),
      Underline,
      TextStyle,
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
  });
};
