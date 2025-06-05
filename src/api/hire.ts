import { api } from '@/utils/axios';

// 포트폴리오 ID 기반 채용 요청
export const sendHireByPortfolioId = async (portfolioId: string) => {
  const res = await api.post(`/hire/portfolio/${portfolioId}`);
  return res.data;
};

// 사용자 ID 기반 채용 요청 (프로필 페이지용)
export const sendHireByUserId = async (userId: string) => {
  const res = await api.post(`/hire/user/${userId}`);
  return res.data;
};
