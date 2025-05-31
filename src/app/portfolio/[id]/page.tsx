'use client';

import Image from 'next/image';
import Kebab from '@/components/common/Kebab'; 
import { notFound, useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPortfolioById, Portfolio } from '@/api/portfolio';

export default function PortfolioDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      try {
        const data = await getPortfolioById(id);
        setPortfolio(data);
      } catch (err) {
        console.error('포트폴리오 불러오기 실패:', err);
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!portfolio) return notFound(); // 404 처리

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black px-8 md:px-20 py-10">
      {/* 카테고리 */}
      <div className="text-sm text-gray-500 mb-2">{portfolio.category}</div>

      {/* 제목 */}
      <h1 className="text-3xl font-bold text-black mb-6">{portfolio.title}</h1>

      {/* 작성자 + 케밥 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src={portfolio.thumbnailUrl || '/images/user.png'}
            alt="프로필 이미지"
            width={48}
            height={48}
            className="rounded-full bg-gray-200"
          />
      <div className="flex flex-col justify-center">
        <span className="text-base font-semibold text-gray-800">
          {portfolio.author?.name || '@@@'}
        </span>
        <span className="text-sm text-gray-400">
          {portfolio.createdAt}
        </span>
      </div>
        </div>

        {/* 케밥 메뉴 */}
        <Kebab
          onEdit={() => router.push(`/upload?id=${id}`)}  
          onDelete={() => console.log(`포트폴리오 ${id} 삭제`)}
        />
      </div>

      {/* 본문 출력 */}
      <div className="mt-10 prose">
        <div dangerouslySetInnerHTML={{ __html: portfolio.content }} />
      </div>
    </div>
  );
}
