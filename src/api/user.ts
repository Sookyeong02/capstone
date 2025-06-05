import { UpdatePersonalProfileRequest, UpdateCompanyProfileRequest } from '@/types/user';
import { api } from '@/utils/axios';

// 내 정보 수정 (개인)
export const updatePersonalProfile = async (data: UpdatePersonalProfileRequest) => {
  const res = await api.patch('/user/me/personal', data);
  return res.data;
};

// 내 정보 수정 (기업)
export const updateCompanyProfile = async (data: UpdateCompanyProfileRequest) => {
  const res = await api.patch('/user/me/company', data);
  return res.data;
};

// 프로필 이미지 업로드
/**
 * 프로필 이미지 업로드
 * @param file 이미지 파일 (File 객체)
 * @returns 업로드된 이미지의 URL
 */
export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file); // 백엔드 multer에서 .single('image')로 받아야 하므로 key는 image

  const res = await api.post<{ url: string }>('/upload/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.url;
};
