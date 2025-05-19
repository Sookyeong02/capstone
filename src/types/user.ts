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
