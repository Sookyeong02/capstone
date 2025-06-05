import { api, publicApi } from '@/utils/axios';

// 좋아요 토글
export const togglePortfolioLike = async (id: string): Promise<{ liked: boolean }> => {
  const res = await api.post<{ liked: boolean }>(`/portfolios/${id}/like`);
  return res.data;
};

// 좋아요 조회
export const getPortfolioLikeCount = async (
  portfolioId: string,
): Promise<{ portfolioId: string; likeCount: number }> => {
  const res = await publicApi.get<{ portfolioId: string; likeCount: number }>(
    `/portfolios/${portfolioId}/likes`,
  );
  return res.data;
};
