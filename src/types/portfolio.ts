export type ContentBlockType = 'text' | 'image' | 'youtube' | 'code';

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
  language?: string;
}

export interface Portfolio {
  id: string;
  _id?: string;
  userId: string;
  title: string;
  category: string;
  tags?: string[];
  contentBlocks: ContentBlock[];
  thumbnail?: string;
  likesCount?: number;
  likeCount?: number;
  createdAt?: string;
  updatedAt?: string;
  nickname: string;
  profileImageUrl?: string;
}

export interface PortfolioResponse {
  data: Portfolio[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface CreatePortfolioParams {
  title: string;
  category: string;
  contentBlocks: {
    type: 'text' | 'image' | 'code' | 'youtube';
    content: string;
  }[];
}
