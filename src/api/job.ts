import CreateJobPayload, { Job, JobResponse } from '@/types/Jobs';
import { api } from '@/utils/axios';
import { publicApi } from '@/utils/axios';

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
export const createJobPosting = async (data: CreateJobPayload) => {
  const res = await api.post('/jobs', data);
  return res.data;
};

// 채용공고 조회
export const fetchJobs = async ({
  page = 1,
  limit = 12,
  category = '',
}: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<JobResponse> => {
  const res = await publicApi.get<JobResponse>('/jobs', {
    params: {
      page,
      limit,
      ...(category !== '전체' && category ? { category } : {}),
    },
  });

  return res.data;
};

// 내 채용공고 조회
export const fetchMyJobs = async (): Promise<Job[]> => {
  const res = await api.get<{ data: Job[] }>('/jobs');
  return res.data.data;
};

// 채용공고 삭제
export const deleteJobPosting = async (jobId: string): Promise<void> => {
  await api.delete(`/jobs/${jobId}`);
};

// 채용공고 수정
export const updateJobPosting = async (jobId: string, payload: Partial<CreateJobPayload>) => {
  const res = await api.patch(`/jobs/${jobId}`, payload);
  return res.data;
};
