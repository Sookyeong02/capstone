'use client';

import Editor from '@/components/portfolio/Editor';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { updatePortfolio, getPortfolioDetail } from '@/api/portfolio';
import type { ContentBlock } from '@/types/portfolio';
import { blocksToContent } from '@/utils/ContentBlocks';

export default function EditPortfolio() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params.id as string;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [initialContent, setInitialContent] = useState<ReturnType<typeof blocksToContent> | null>(
    null,
  );
  const extractThumbnail = (blocks: ContentBlock[]) => {
    const firstImageBlock = blocks.find((block) => block.type === 'image');
    return firstImageBlock ? firstImageBlock.content : '';
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!portfolioId) return;
      try {
        const portfolio = await getPortfolioDetail(portfolioId);
        setTitle(portfolio.title);
        setCategory(portfolio.category);
        setContentBlocks(portfolio.contentBlocks);
        setInitialContent(blocksToContent(portfolio.contentBlocks));
      } catch (error) {
        alert('포트폴리오 정보를 불러오지 못했습니다.');
        console.error(error);
      }
    };

    fetchPortfolio();
  }, [portfolioId]);

  const handleSubmit = async () => {
    if (!portfolioId) return;

    try {
      await updatePortfolio(portfolioId, {
        title,
        category,
        contentBlocks,
        thumbnail: extractThumbnail(contentBlocks),
      });
      alert('포트폴리오가 수정되었습니다.');
      router.push(`/`);
    } catch (error) {
      alert('수정에 실패했습니다.');
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
        initialContent={initialContent ?? undefined}
      />
    </div>
  );
}
