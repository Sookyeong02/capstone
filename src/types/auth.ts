// 공통 필드
interface CommonUser {
  id: string;
  email: string;
  name: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  role: 'personal' | 'company';
  provider: 'local' | 'google' | 'kakao';
}

// 개인 사용자
export interface PersonalUser extends CommonUser {
  role: 'personal';
  jobField?: string;
  introduction?: string;
  personalWebsite?: string;
}

// 기업 사용자
export interface CompanyUser extends CommonUser {
  role: 'company';
  companyName: string;
  businessNumber: string;
  businessFileUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  companyIntroduction?: string;
  companyWebsite?: string;
}

// 최종 유저 타입
export type AuthUser = PersonalUser | CompanyUser;

// 로그인
export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
