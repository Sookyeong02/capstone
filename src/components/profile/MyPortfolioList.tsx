'use client';

import { useEffect, useState } from 'react';
import { Portfolio } from '@/types/portfolio';
import { getUserPortfolios } from '@/api/portfolio';
import PortfolioCard from '@/components/portfolio/PortfolioCard';

type Props = {
  userId: string;
};

export default function MyPortfolioList({ userId }: Props) {
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const res = await getUserPortfolios(userId);
        setPortfolios(res);
      } catch {
        const msg = '포트폴리오를 불러오는 데 실패했습니다.';
        setError(msg);
        alert(msg);
        setPortfolios([]);
      }
    };

    loadPortfolios();
  }, [userId]);

  if (error) return null;
  if (portfolios === null) return <p className="mt-6 text-center text-gray-500">불러오는 중</p>;
  if (portfolios.length === 0)
    return <p className="mt-6 text-center text-gray-500">등록된 포트폴리오가 없습니다.</p>;

  return (
    <div>
      <p className="mb-[24px] text-xl font-bold">등록된 포트폴리오</p>
      <div className="grid grid-cols-1 gap-x-[30px] gap-y-[4px] sm:grid-cols-2 md:gap-y-[40px] lg:grid-cols-3">
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>
    </div>
  );
}
