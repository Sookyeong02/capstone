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

  portfoliosCount?: number;
  likesReceived?: number;
  likesGiven?: number;
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

// 로그인 요청용 타입
export interface LoginRequest {
  email: string;
  password: string;
  role: 'personal' | 'company';
}

// 개인 회원가입 요청용 타입
export interface SignupPersonalRequest {
  name: string;
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

// 기업 회원가입 요청용 타입
export interface SignupCompanyRequest {
  email: string;
  companyName: string;
  password: string;
  passwordConfirm: string;
  businessNumber: string;
  businessFileUrl: string;
}
