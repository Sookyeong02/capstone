'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserPortfolios } from '@/api/portfolio';
import { getUserInfoById } from '@/api/portfolio';
import { Portfolio } from '@/types/portfolio';
import { PublicUser } from '@/types/user';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import UserSidebar from '@/components/profile/UserSidebar';

export default function UserProfilePage() {
  const { id: userId } = useParams();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userInfo, portfolioList] = await Promise.all([
          getUserInfoById(userId as string),
          getUserPortfolios(userId as string),
        ]);
        setUser(userInfo);
        setPortfolios(portfolioList);
      } catch (err) {
        console.error('사용자 정보 또는 포트폴리오 불러오기 실패', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) return <p className="text-cente p-8"></p>;
  if (!user) return <p className="p-8 text-center">사용자 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="mx-auto mt-[70px] flex max-w-[1600px] flex-col gap-[20px] px-[40px] md:gap-[40px] lg:flex-row">
      <UserSidebar user={user} userId={user.id} />

      <div className="flex-1">
        <h2 className="mb-[24px] text-xl font-bold">{user.nickname}님의 포트폴리오</h2>
        {portfolios && portfolios.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-[50px] gap-y-[4px] sm:grid-cols-2 md:gap-y-[40px] lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">등록된 포트폴리오가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
