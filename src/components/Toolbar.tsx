'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Image from '@tiptap/extension-image';
import { CodeBlock } from '@tiptap/extension-code-block';
import { Editor } from '@tiptap/react';

type ToolbarProps = {
  editor: Editor;
};

const CustomCodeBlock = CodeBlock.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => true, // Enter 눌러도 줄바꿈 되지 않게
    };
  },
});

export default function Toolbar({ editor }: ToolbarProps) {

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [codeContent, setCodeContent] = useState('');
  const [language, setLanguage] = useState('js');
  const [currentCodePos, setCurrentCodePos] = useState<number | null>(null);

  const localeditor = useEditor({
    extensions: [StarterKit, TextStyle, FontFamily, FontSize, Image, CustomCodeBlock],
    content: '',
    editorProps: {
      attributes: { class: 'prose min-h-[400px] p-4 border rounded' },
      handleDOMEvents: {
        click: (view, event) => {
          const target = event.target as HTMLElement;
          const pre = target.closest('pre');
          if (!pre) return false;

          const pos = view.posAtDOM(pre, 0);
          const node = view.state.doc.nodeAt(pos);

          if (node?.type.name === 'codeBlock') {
            setCurrentCodePos(pos);
            setCodeContent(node.textContent || '');
            setLanguage(node.attrs.language || 'js');
            setIsCodeModalOpen(true);
            return true;
          }
          return false;
        },
      },
    },
  });

  const insertCodeBlock = () => {
    editor?.chain().focus().insertContent({
      type: 'codeBlock',
      attrs: { language },
      content: [{ type: 'text', text: codeContent }],
    }).run();
    closeModal();
  };

  const updateCodeBlock = () => {
    if (!editor || currentCodePos === null) return;
    const node = editor.view.state.doc.nodeAt(currentCodePos);
    if (!node) return;
    const to = currentCodePos + node.nodeSize;
    editor.chain().focus()
      .deleteRange({ from: currentCodePos, to })
      .insertContentAt(currentCodePos, {
        type: 'codeBlock',
        attrs: { language },
        content: [{ type: 'text', text: codeContent }],
      })
      .run();
    closeModal();
  };

  const closeModal = () => {
    setIsCodeModalOpen(false);
    setCodeContent('');
    setLanguage('js');
    setCurrentCodePos(null);
  };

  return (
    <>
      <div className="w-full flex flex-wrap items-center gap-3 py-4 mb-6">
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*,video/*';
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                if (file.type.startsWith('image/')) {
                  editor?.chain().focus().setImage({ src: result }).run();
                } else if (file.type.startsWith('video/')) {
                  editor?.chain().focus().insertContent(
                    `<video src="${result}" controls class="my-4" style="max-width:100%;"></video>`
                  );
                }
              };
              reader.readAsDataURL(file);
            };
            input.click();
          }}
          className="w-8 h-8"
        >
          <img src="/icons/image_icon.png" alt="이미지/영상 삽입" className="w-full h-full" />
        </button>

        <button onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? 'font-bold text-blue-600' : ''}>B</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? 'italic text-blue-600' : ''}>I</button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive('underline') ? 'underline text-blue-600' : ''}>U</button>

        <select onChange={(e) => editor?.chain().focus().setFontFamily(e.target.value).run()} className="border rounded px-2 py-1 text-sm" defaultValue="Arial">
          <option value="Arial">Arial</option>
          <option value="'Nanum Gothic', sans-serif">나눔고딕</option>
          <option value="'Courier New'">Courier New</option>
          <option value="'Times New Roman'">Times New Roman</option>
        </select>

        <select onChange={(e) => editor?.chain().focus().setFontSize(e.target.value).run()} className="border rounded px-2 py-1 text-sm" defaultValue="16px">
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
        </select>

        <button onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
          <img src="/icons/align_left.png" alt="왼쪽정렬" className="w-7 h-7" />
        </button>
        <button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
          <img src="/icons/align_center.png" alt="가운데정렬" className="w-7 h-7" />
        </button>
        <button onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
          <img src="/icons/align_right.png" alt="오른쪽정렬" className="w-7 h-7" />
        </button>

        <button onClick={() => setIsCodeModalOpen(true)} className="w-8 h-8">
          <img src="/icons/code_icon.png" alt="코드블럭 삽입" className="w-8 h-8" />
        </button>
      </div>

      <EditorContent editor={editor} />

      {/* 코드블럭 모달 */}
      <Dialog open={isCodeModalOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30 z-40" />
        <div className="fixed z-50 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold mb-2">
            코드블럭 {currentCodePos !== null ? '수정' : '삽입'}
          </Dialog.Title>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-2 py-1 mb-2"
          >
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="bash">Bash</option>
            <option value="json">JSON</option>
          </select>
          <textarea
            rows={8}
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
            placeholder="코드를 입력하세요..."
            className="w-full border rounded p-2 font-mono mb-4"
          />
          <div className="flex justify-end gap-2">
            <button onClick={closeModal} className="px-4 py-2 rounded bg-gray-200">취소</button>
            <button onClick={currentCodePos !== null ? updateCodeBlock : insertCodeBlock} className="px-4 py-2 rounded bg-black text-white">확인</button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
