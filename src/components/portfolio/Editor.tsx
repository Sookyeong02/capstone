'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { CustomTextStyle } from '@/components/portfolio/extensions/CustomTextStyle';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from './Toolbar';
import { ContentBlock } from '@/types/portfolio';
import { Button } from '../ui/Button';
import '../../styles/editor.css';
import { useEffect, useState } from 'react';
import { EditorView } from 'prosemirror-view';
import CustomCodeBlock from './extensions/CustomCodeBlock';
import TextStyle from '@tiptap/extension-text-style';
import { ContentToBlocks } from '@/utils/ContentBlocks';

type EditorProps = {
  title: string;
  setTitle: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  onChange: (blocks: ContentBlock[]) => void;
  onSubmit: () => void;
  initialContent?: Record<string, any>;
};

export default function Editor({
  title,
  setTitle,
  category,
  setCategory,
  onChange,
  onSubmit,
  initialContent,
}: EditorProps) {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [codeContent, setCodeContent] = useState('');
  const [language, setLanguage] = useState('js');
  const [currentCodePos, setCurrentCodePos] = useState<number | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CustomCodeBlock,
      TextStyle,
      CustomTextStyle,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Placeholder.configure({
        placeholder: '내용을 입력하세요.',
        emptyEditorClass: 'is-editor-empty',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: initialContent || '',
    editorProps: {
      handleClick(view: EditorView, pos: number, event: MouseEvent): boolean {
        const node = view.state.doc.nodeAt(pos);
        if (node?.type.name === 'codeBlock') {
          event.preventDefault();
          const text = node.textContent;
          const lang = node.attrs.language;
          setCurrentCodePos(pos);
          setCodeContent(text);
          setLanguage(lang);
          setIsCodeModalOpen(true);
          return true;
        }
        return false;
      },
      attributes: {
        class: 'ProseMirror min-h-[90vh] max-w-[1600px] p-4 outline-none',
        'data-placeholder': '내용을 입력하세요.',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    editor.on('update', () => {
      const blocks = ContentToBlocks(editor.getJSON());
      onChange(blocks);
    });
  }, [editor]);

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className="w-full">
      {editor && (
        <div className="flex items-center justify-between py-2">
          <Toolbar
            editor={editor}
            isCodeModalOpen={isCodeModalOpen}
            setIsCodeModalOpen={setIsCodeModalOpen}
            codeContent={codeContent}
            setCodeContent={setCodeContent}
            language={language}
            setLanguage={setLanguage}
            currentCodePos={currentCodePos}
            setCurrentCodePos={setCurrentCodePos}
          />
          <Button onClick={onSubmit} size="medium" variant="customBlue" isLoading={false}>
            등록
          </Button>
        </div>
      )}

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-6 w-[120px] border px-4 py-2"
      >
        <option value="">카테고리</option>
        <option value="design">Design</option>
        <option value="develop">Develop</option>
        <option value="video">Video</option>
        <option value="music">Music</option>
      </select>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="mb-[8px] w-full p-[8px] text-xl outline-none placeholder:text-gray-300"
      />

      <hr className="mb-[8px]" />

      <EditorContent editor={editor} />
    </div>
  );
}
