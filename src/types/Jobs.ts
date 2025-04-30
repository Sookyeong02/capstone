// 채용공고 
export interface Job {
  id: string;
  companyId: string;  
  title: string;
  category?: string;
  content?: string;
  link: string;
  deadline: string;
  location?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}