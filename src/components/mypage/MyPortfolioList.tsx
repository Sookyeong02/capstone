'use client';

import { useEffect, useState } from 'react';
import { fetchMyPortfolio } from '@/api/portfolio';
import { Portfolio } from '@/types/portfolio';
import PortfolioCard from '@/components/portfolio/PortfolioCard';

export default function MyPortfolioList() {
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const res = await fetchMyPortfolio();
        setPortfolios(res);
      } catch {
        const message = '포트폴리오를 불러오는 데 실패했습니다.';
        setError(message);
        alert(message);
        setPortfolios([]);
      }
    };

    loadPortfolios();
  }, []);

  if (error) return null;

  if (portfolios === null) {
    return <p className="mt-6 text-center text-gray-500">불러오는 중...</p>;
  }

  if (portfolios.length === 0) {
    return <p className="mt-6 text-center text-gray-500">등록된 포트폴리오가 없습니다.</p>;
  }

  return (
    <div>
      <p className="mb-[24px] text-xl font-bold">내 포트폴리오</p>
      <div className="grid grid-cols-1 gap-x-[50px] gap-y-[4px] sm:grid-cols-2 md:gap-y-[40px] lg:grid-cols-3">
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>
    </div>
  );
}
