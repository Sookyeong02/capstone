import JobPayload from '@/types/Jobs';
import { api } from '@/utils/axios';

// 썸네일 이미지 업로드
export const uploadJobImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await api.post<{ url: string }>('/upload/job', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.url;
};

// 채용공고 등록
export const createJobPosting = async (payload: JobPayload) => {
  const res = await api.post('/jobs', payload);
  return res.data;
};
