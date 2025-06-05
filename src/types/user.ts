// 개인 사용자 정보 수정 요청 타입
export interface UpdatePersonalProfileRequest {
  name: string;
  nickname: string;
  email: string;
  password?: string;
  introduction?: string;
  personalWebsite?: string;
  profileImageUrl?: string;
  jobField?: string;
}

// 기업 사용자 정보 수정 요청 타입
export interface UpdateCompanyProfileRequest {
  companyName: string;
  email: string;
  password?: string;
  businessNumber?: string;
  businessFileUrl?: string;
  companyIntroduction?: string;
  companyWebsite?: string;
  profileImageUrl?: string;
}

// 공개 사용자 정보
export interface PublicUser {
  id: string;
  nickname: string;
  profileImageUrl?: string;
  introduction?: string;
  jobField?: string;
  personalWebsite?: string;
  portfoliosCount: number;
  likesReceived: number;
  likesGiven: number;
}
