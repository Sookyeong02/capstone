'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Heart from '../../../public/icons/white_heart.svg';
import { useAuthStore } from '@/store/auth';
import { getPortfolioLikeCount, togglePortfolioLike } from '@/api/like';

interface LikeButtonProps {
  portfolioId: string;
  count: number;
}

export default function LikeButton({ portfolioId, count }: LikeButtonProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(count);
  const router = useRouter();

  useEffect(() => {
    if (!portfolioId) return;

    const fetchCount = async () => {
      try {
        const { likeCount } = await getPortfolioLikeCount(portfolioId);
        setLikeCount(likeCount);
      } catch (e) {
        console.error('좋아요 수 불러오기 실패', e);
      }
    };
    fetchCount();
  }, [portfolioId]);

  const handleToggleLike = async () => {
    if (!portfolioId) {
      console.error('포트폴리오 ID가 존재하지 않습니다.');
      return;
    }

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    try {
      const { liked: newLiked } = await togglePortfolioLike(portfolioId);
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    } catch (e) {
      console.error('좋아요 토글 실패', e);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      className="bg-custom-blue-200 text-semibold flex h-[50px] w-[120px] items-center justify-center gap-[8px] rounded-full text-sm text-white md:h-[50px] md:w-[162px] md:text-xl"
    >
      <Image src={liked ? Heart : Heart} alt="좋아요" width={20} height={20} />
      <p>{likeCount}</p>
    </button>
  );
}
