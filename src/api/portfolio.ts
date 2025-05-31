import { api } from '@/utils/axios';
// 실제 전체 포트폴리오 목록 가져오기 함수

export interface CreatePortfolioRequest {
  title: string;
  category: string;
  content: string;
}

export interface Portfolio {
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  thumbnailUrl?: string;
  author?: {
    name: string;
    profileImage: string;
  };
  imageUrl?: string; 
  username: string;
  likes: number;
}

// 전체 포트폴리오 조회
export const getAllPortfolios = async (): Promise<Portfolio[]> => {
  const res = await api.get<Portfolio[]>('/portfolios');
  return res.data;
};

// 포트폴리오 상세 조회
export const getPortfolioById = async (id: number): Promise<Portfolio> => {
  const res = await api.get<Portfolio>(`/portfolio/${id}`);
  return res.data;
};

// 포트폴리오 등록
export const createPortfolio = async (
  data: CreatePortfolioRequest
): Promise<{ id: number }> => {
  const res = await api.post<{ id: number }>('/portfolio', data);
  return res.data;
};

// 포트폴리오 수정
export const updatePortfolio = async (
  id: number,
  data: CreatePortfolioRequest
): Promise<{ success: boolean }> => {
  const res = await api.patch<{ success: boolean }>(`/portfolio/${id}`, data);
  return res.data;
};

// 포트폴리오 삭제
export const deletePortfolio = async (
  id: number
): Promise<{ success: boolean }> => {
  const res = await api.delete<{ success: boolean }>(`/portfolio/${id}`);
  return res.data;
};

// 포트폴리오 이미지 업로드
export const uploadPortfolioImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file); // multer에서 image로 받아야 함

  const res = await api.post<{ url: string }>('/upload/portfolio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.url; // 업로드된 이미지의 URL 반환
};
