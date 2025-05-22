// 채용공고
export interface Job {
  _id: string;
  companyId: string;
  title: string;
  category: string;
  experience: string;
  content?: string;
  link: string;
  deadline: string | null;
  isDeadlineFlexible: boolean;
  location: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

// 채용공고 반환 타입
export interface JobResponse {
  data: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

// 채용공고 등록 요청
export default interface CreateJobPayload {
  title: string;
  category: string;
  deadline: string | null;
  isDeadlineFlexible: boolean;
  experience?: string;
  location: string;
  description: string;
  link: string;
  thumbnail?: string;
}
