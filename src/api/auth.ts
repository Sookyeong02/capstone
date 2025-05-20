import {
  LoginRequest,
  LoginResponse,
  SignupCompanyRequest,
  SignupPersonalRequest,
} from '@/types/auth';
import { publicApi } from '@/utils/axios';

// 개인 회원가입
export const signupPersonal = async (data: SignupPersonalRequest) => {
  const res = await publicApi.post('/auth/signup/personal', data);
  return res.data;
};

// 기업 회원가입
export const signupCompany = async (data: SignupCompanyRequest) => {
  const res = await publicApi.post('/auth/signup/company', data);
  return res.data;
};

// 사업자 등록증 업로드
export const uploadBusinessFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await publicApi.post<{ url: string }>('/upload/business', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data.url;
};

// 로그인
export const loginUser = async (data: LoginRequest) => {
  const res = await publicApi.post<LoginResponse>('/auth/login', data);
  return res.data;
};
