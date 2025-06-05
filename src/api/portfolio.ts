import { CreatePortfolioParams, Portfolio, PortfolioResponse } from '@/types/portfolio';
import { api, publicApi } from '@/utils/axios';

// 전체 포트폴리오 조회
export const fetchPortfolios = async ({
  category = '',
  search,
  sort,
  page = 1,
  limit = 12,
}: {
  category?: string;
  search?: string;
  sort?: 'latest' | 'likes';
  page: number;
  limit?: number;
}) => {
  const res = await publicApi.get<PortfolioResponse>('/portfolios', {
    params: {
      ...(category !== '전체' && category ? { category } : {}),
      search,
      sort,
      page,
      limit,
    },
  });
  return res.data;
};

// 포트폴리오 상세 조회
export const getPortfolioDetail = (id: string): Promise<Portfolio> => {
  return publicApi.get<Portfolio>(`/portfolios/${id}`).then((res) => res.data);
};

// 포트폴리오 등록
export const createPortfolio = async (data: CreatePortfolioParams) => {
  const response = await api.post('/portfolios', data);
  return response.data;
};

// 포트폴리오 수정
export const updatePortfolio = async (portfolioId: string, payload: Partial<Portfolio>) => {
  const res = await api.patch(`/portfolios/${portfolioId}`, payload);
  return res.data;
};

// 포트폴리오 삭제
export const deletePortfolio = async (portfolioId: string): Promise<void> => {
  await api.delete(`/portfolios/${portfolioId}`);
};

// 포트폴리오 이미지 업로드
export const uploadPortfolioImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await api.post<{ url: string }>('/upload/portfolio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.url;
};
