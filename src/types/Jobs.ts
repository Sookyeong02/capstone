// 채용공고
export interface Job {
  id: string;
  companyId: string;
  title: string;
  category: string;
  experience: string;
  content?: string;
  link: string;
  deadline: string;
  location: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

// 채용공고 등록 요청
export default interface CreateJobPayload {
  title: string;
  field: string;
  schedule: string;
  location: string;
  description: string;
  link: string;
  thumbnailUrl?: string;
}
