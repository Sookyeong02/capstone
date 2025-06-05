import Image from 'next/image';
import { useAuthStore } from '@/store/auth';
import Kebab from '@/components/portfolio/Kebab';
import EmptyHeart from '../../../public/icons/empty_heart.svg';
import DefaultThumbnail from '../../../public/images/thumbnail.png';
import Link from 'next/link';
import { Portfolio } from '@/types/portfolio';
import { useEffect, useState } from 'react';
import { getPortfolioLikeCount } from '@/api/like';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const { id, thumbnail, nickname } = portfolio;
  const { user } = useAuthStore();

  const portfolioUserId =
    typeof portfolio.userId === 'string'
      ? portfolio.userId
      : ((portfolio.userId as any)?._id ?? (portfolio.userId as any)?.id);

  const isMine = portfolioUserId === user?.id;

  const [likes, setLikes] = useState<number>(portfolio.likesCount ?? 0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await getPortfolioLikeCount(id);
        setLikes(res.likeCount);
      } catch (err) {
        console.error('좋아요 수 불러오기 실패:', err);
      }
    };

    fetchLikes();
  }, [id]);

  return (
    <div className="w-[168px] sm:w-[220px] md:w-[320px]">
      {/* 썸네일 */}
      <div className="mb-2 w-full">
        <Link href={`/portfolio/${id}`}>
          <Image
            src={thumbnail || DefaultThumbnail}
            alt="포트폴리오 썸네일"
            width={320}
            height={250}
            className="h-[168px] w-full rounded-[10px] object-cover sm:h-[220px] md:h-[250px]"
          />
        </Link>
      </div>

      {/* 하단 정보 */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <p className="truncate text-xl font-semibold text-[#0A1B2D]">{portfolio.title}</p>
          {isMine && (
            <Kebab
              portfolioId={id}
              onEdit={() => (window.location.href = `/portfolio/edit/${id}`)}
              onDelete={() => window.location.reload()}
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#0A1B2D]">
          <span className="text-lg font-semibold">{nickname}</span>
          <div className="flex items-center gap-[2px]">
            <Image src={EmptyHeart} alt="좋아요" width={20} height={20} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
