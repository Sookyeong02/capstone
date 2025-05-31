'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EditorContent } from '@tiptap/react';
import { useCustomEditor } from './useCustomEditor';
import Toolbar from '@/components/Toolbar';
import './editor.css';

// API 함수 임포트
import {
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
} from '@/api/portfolio';

export default function UploadPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // 수정 여부 확인
  const isEditMode = !!id;

  const router = useRouter();
  const editor = useCustomEditor();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  // 수정 모드일 경우 기존 데이터 불러오기
  useEffect(() => {
    if (isEditMode && editor) {
      getPortfolioById(Number(id)).then((data) => {
        setTitle(data.title);
        setCategory(data.category);
        editor.commands.setContent(data.content);
      });
    }
  }, [isEditMode, editor, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!category) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    if (!editor || editor.getText().trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    const content = editor.getHTML();

    try {
      if (isEditMode) {
        await updatePortfolio(Number(id), { title, category, content });
        alert('포트폴리오 수정 완료!');
        router.push(`/portfolio/${id}`); // 수정 완료 후 해당 상세페이지로 이동
      } else {
        const res = await createPortfolio({ title, category, content });
        alert('포트폴리오 등록 완료!');
        router.push(`/portfolio/${res.id}`); // 등록 후 상세페이지로 이동
      }
    } catch (error) {
      console.error(error);
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-20 py-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
        {editor && <Toolbar editor={editor} />}
        <button
          onClick={handleSubmit}
          className="bg-[#0A1B2D] text-white font-bold text-base px-8 py-3 rounded-full hover:bg-[#1A2C3D] leading-none whitespace-nowrap"
        >
          {isEditMode ? '수정 완료' : '등록'}
        </button>
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-200 px-4 py-3 rounded mb-4 font-pretendard text-md"
      >
        <option value="">카테고리 선택</option>
        <option value="Design">디자인</option>
        <option value="Develop">개발</option>
        <option value="Video">영상</option>
        <option value="Music">음악</option>
      </select>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full font-pretendard text-2xl font-semibold mb-4 border-b border-gray-200 focus:outline-none py-3"
      />

      <div className="border border-gray-200 rounded p-4 min-h-[300px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

