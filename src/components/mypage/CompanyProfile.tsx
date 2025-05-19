'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { updateCompanyProfile, uploadProfileImage } from '@/api/user';
import { Controller, useForm } from 'react-hook-form';
import ProfileImage from './ProfileImage';

interface FormValues {
  companyName: string;
  email: string;
  password?: string;
  businessNumber?: string;
  businessFileUrl?: string;
  companyIntroduction?: string;
  companyWebsite?: string;
  profileImage?: string;
}

export default function CompanyForm() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      companyName: user?.role === 'company' ? user.companyName : '',
      email: user?.email || '',
      password: '',
      businessNumber: user?.role === 'company' ? user.businessNumber : '',
      businessFileUrl: user?.role === 'company' ? user.businessFileUrl : '',
      companyIntroduction: user?.role === 'company' ? user.companyIntroduction || '' : '',
      companyWebsite: user?.role === 'company' ? user.companyWebsite || '' : '',
      profileImage: user?.profileImageUrl || '',
    },
  });

  useEffect(() => {
    if (!user || user.role !== 'company') return;

    reset({
      companyName: user.companyName,
      email: user.email,
      password: '',
      businessNumber: user.businessNumber,
      businessFileUrl: user.businessFileUrl,
      companyIntroduction: user.companyIntroduction || '',
      companyWebsite: user.companyWebsite || '',
      profileImage: user.profileImageUrl || '',
    });
  }, [user, reset]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadProfileImage(file);
      setValue('profileImage', url);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await updateCompanyProfile({ ...data, profileImageUrl: data.profileImage || '' });
      if (user?.role === 'company') {
        updateUser({
          companyName: data.companyName,
          email: data.email,
          businessNumber: data.businessNumber,
          businessFileUrl: data.businessFileUrl,
          companyIntroduction: data.companyIntroduction,
          companyWebsite: data.companyWebsite,
          profileImageUrl: data.profileImage,
        });
      }
      alert('수정 완료');
      router.refresh();
      router.push('/mypage/profile');
    } catch (err) {
      console.error(err);
      alert('수정 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[24px] flex items-center justify-between">
        <p className="text-xl font-bold">내 정보</p>
        <Button
          variant="customBlue"
          size="medium"
          type="submit"
          disabled={uploading || isSubmitting}
        >
          저장
        </Button>
      </div>

      <div className="mb-[36px]">
        <ProfileImage
          initialImageUrl={user?.profileImageUrl}
          onChange={(url) => setValue('profileImage', url)}
          onFileSelect={handleImageUpload}
        />
      </div>

      <div className="flex flex-col gap-[12px]">
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => <Input label="회사명" {...field} />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input label="이메일" type="email" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input label="비밀번호" type="password" {...field} />}
        />
        <Controller
          name="companyIntroduction"
          control={control}
          render={({ field }) => (
            <div>
              <label className="mb-[8px] block text-lg font-bold">소개</label>
              <textarea {...field} className="h-[120px] w-full rounded border px-[10px] py-[8px]" />
            </div>
          )}
        />
        <Controller
          name="companyWebsite"
          control={control}
          render={({ field }) => (
            <Input
              label="홈페이지"
              type="url"
              placeholder="홈페이지를 입력해주세요"
              className="placeholder:text-md placeholder:font-bold placeholder:text-gray-400 placeholder:opacity-30"
              {...field}
            />
          )}
        />
      </div>
    </form>
  );
}
