'use client';

import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPortfolioDetail } from '@/api/portfolio';
import PortfolioContent from '@/components/portfolio/PortfolioContent';
import { useAuthStore } from '@/store/auth';
import { Portfolio } from '@/types/portfolio';

export default function PortfolioDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuthStore();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      try {
        const data = await getPortfolioDetail(id);
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

  if (loading) return <p></p>;
  if (!portfolio) return notFound();

  return (
    <div className="min-h-screen bg-[#F9F9F9] px-8 py-10 md:px-20">
      <PortfolioContent portfolio={portfolio} currentUserId={user?.id || null} />
    </div>
  );
}
