'use client';

import { Dispatch, SetStateAction } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { useEditor } from '@tiptap/react';
import { uploadPortfolioImage } from '@/api/portfolio';

type ToolbarProps = {
  editor: ReturnType<typeof useEditor> | null;
  isCodeModalOpen: boolean;
  setIsCodeModalOpen: Dispatch<SetStateAction<boolean>>;
  codeContent: string;
  setCodeContent: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  currentCodePos: number | null;
  setCurrentCodePos: Dispatch<SetStateAction<number | null>>;
};

export default function Toolbar({
  editor,
  isCodeModalOpen,
  setIsCodeModalOpen,
  codeContent,
  setCodeContent,
  language,
  setLanguage,
  currentCodePos,
  setCurrentCodePos,
}: ToolbarProps) {
  const insertCodeBlock = () => {
    editor
      ?.chain()
      .focus()
      .insertContent({
        type: 'codeBlock',
        attrs: { language },
        content: [{ type: 'text', text: codeContent }],
      })
      .insertContent({ type: 'paragraph' })
      .run();
    closeModal();
  };

  const updateCodeBlock = () => {
    if (!editor || currentCodePos === null) return;
    const node = editor.view.state.doc.nodeAt(currentCodePos);
    if (!node) return;

    const to = currentCodePos + node.nodeSize;
    editor
      .chain()
      .focus()
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
    <div>
      <div className="flex w-full flex-wrap items-center gap-3 py-4">
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*,video/*';
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;

              try {
                const url = await uploadPortfolioImage(file);

                if (file.type.startsWith('image/')) {
                  editor?.chain().focus().setImage({ src: url }).run();
                } else if (file.type.startsWith('video/')) {
                  editor
                    ?.chain()
                    .focus()
                    .insertContent(
                      `<video src="${url}" controls class="my-4" style="max-width:100%;"></video>`,
                    )
                    .run();
                }
              } catch (error) {
                alert('이미지 업로드에 실패했습니다.');
                console.error(error);
              }
            };
            input.click();
          }}
        >
          <Image src="/icons/image_icon.png" alt="이미지/영상 삽입" width={20} height={20} />
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'text-custom-blue-200 font-bold' : 'text-gray-300'}
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'text-custom-blue-200 italic' : 'text-gray-300'}
        >
          I
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={
            editor?.isActive('underline') ? 'text-custom-blue-200 underline' : 'text-gray-300'
          }
        >
          U
        </button>

        <select
          onChange={(e) => {
            editor?.chain().focus().setMark('textStyle', { fontFamily: e.target.value }).run();
          }}
          className="text-md rounded border px-2 py-1"
          defaultValue=""
        >
          <option value="">폰트</option>
          <option value="Arial">Arial</option>
          <option value="'Nanum Gothic', sans-serif">나눔고딕</option>
          <option value="'Courier New'">Courier New</option>
          <option value="'Times New Roman'">Times New Roman</option>
        </select>

        <select
          onChange={(e) => {
            editor
              ?.chain()
              .focus()
              .setMark('textStyle', { fontSize: `${e.target.value}` })
              .run();
          }}
          className="text-md rounded border px-2 py-1"
          defaultValue=""
        >
          <option value="">폰트 크기</option>
          <option value="12">12px</option>
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
          <option value="20">20px</option>
        </select>

        <button onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
          <Image src="/icons/align_left.png" alt="왼쪽정렬" width={20} height={20} />
        </button>
        <button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
          <Image src="/icons/align_center.png" alt="가운데정렬" width={20} height={20} />
        </button>
        <button onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
          <Image src="/icons/align_right.png" alt="오른쪽정렬" width={20} height={20} />
        </button>
        <button onClick={() => setIsCodeModalOpen(true)} className="h-8 w-8">
          <Image src="/icons/code_icon.png" alt="코드블럭 삽입" width={24} height={24} />
        </button>
      </div>

      {/* 코드블럭 모달 */}
      <Dialog open={isCodeModalOpen} onClose={closeModal}>
        <div className="fixed inset-0 z-40 bg-black/30" />
        <div className="fixed top-1/2 left-1/2 z-50 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="mb-2 text-lg font-bold">
            코드블럭 {currentCodePos !== null ? '수정' : '삽입'}
          </Dialog.Title>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-2 w-full rounded border px-2 py-1"
          >
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="jsx">JSX</option>
            <option value="tsx">TSX</option>
            <option value="bash">Bash</option>
            <option value="json">JSON</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="sql">SQL</option>
          </select>
          <textarea
            rows={8}
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
            placeholder="코드를 입력하세요."
            className="mb-4 w-full rounded border p-2 font-mono"
          />
          <div className="flex justify-end gap-2">
            <button onClick={closeModal} className="rounded bg-gray-200 px-4 py-2">
              취소
            </button>
            <button
              onClick={currentCodePos !== null ? updateCodeBlock : insertCodeBlock}
              className="rounded bg-black px-4 py-2 text-white"
            >
              확인
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
