'use client';

import { Portfolio } from '@/types/portfolio';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import LikeButton from '../portfolio/LikeButton';
import Kebab from './Kebab';

const RenderBlock = dynamic(() => import('../portfolio/RenderBlock'), { ssr: false });

const CATEGORY_LABELS: Record<string, string> = {
  design: 'Design',
  develop: 'Develop',
  video: 'Video',
  music: 'Music',
};

export default function PortfolioContent({
  portfolio,
  currentUserId,
}: {
  portfolio: Portfolio;
  currentUserId: string | null;
}) {
  const isOwner = portfolio.userId === currentUserId;
  const formattedDate = portfolio.createdAt?.split('T')[0].replace(/-/g, '.');

  const renderPortfolioProfile = (nickname: string, profileImageUrl?: string) => {
    if (profileImageUrl) {
      return (
        <Image
          src={`${profileImageUrl}?t=${new Date().getTime()}`}
          alt="프로필 이미지"
          width={45}
          height={45}
          className="h-[45px] w-[45px] rounded-full object-cover"
        />
      );
    }

    const initial = nickname?.[0] || '?';
    return (
      <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-200 text-sm text-white">
        {initial}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-[1000px] p-6">
      <div className="mb-4">
        <div className="mb-[20px] text-lg text-gray-400">
          {CATEGORY_LABELS[portfolio.category] || portfolio.category}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">{portfolio.title}</p>
          {isOwner && (
            <div className="relative">
              <Kebab
                portfolioId={portfolio.id}
                onEdit={() => (window.location.href = `/portfolio/edit/${portfolio.id}`)}
                onDelete={() => window.location.reload()}
              />
            </div>
          )}
        </div>

        <div className="mt-[14px] flex items-center gap-2">
          {renderPortfolioProfile(portfolio.nickname, portfolio.profileImageUrl)}
          <div className="flex flex-col">
            {portfolio.nickname && <span className="text-xl">{portfolio.nickname}</span>}
            <span className="text-md text-gray-300">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="mb-12">
        {portfolio.contentBlocks.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 pt-6">
        {renderPortfolioProfile(portfolio.nickname, portfolio.profileImageUrl)}
        {portfolio.nickname && <span className="text-xl">{portfolio.nickname}</span>}
        <div className="mt-[15px] flex gap-4">
          <LikeButton portfolioId={portfolio.id} count={portfolio.likeCount || 0} />
          <button className="bg-custom-blue-200 text-semibold flex h-[50px] w-[120px] items-center justify-center rounded-full text-sm text-white md:h-[50px] md:w-[162px] md:text-xl">
            채용하기
          </button>
        </div>
        <div className="mt-[18px] text-lg text-gray-300">{formattedDate}</div>
      </div>
    </div>
  );
}
