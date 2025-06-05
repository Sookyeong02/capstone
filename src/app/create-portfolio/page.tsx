'use client';

import Editor from '@/components/portfolio/Editor';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortfolio } from '@/api/portfolio';
import type { ContentBlock } from '@/types/portfolio';

export default function CreatePortfolio() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  const handleSubmit = async () => {
    console.log('전송할 contentBlocks:', contentBlocks); // 확인용

    try {
      await createPortfolio({ title, category, contentBlocks });
      alert('포트폴리오가 등록되었습니다.');
      router.push('/');
    } catch (error) {
      alert('등록에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] p-6">
      <Editor
        title={title}
        setTitle={setTitle}
        category={category}
        setCategory={setCategory}
        onChange={setContentBlocks}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
