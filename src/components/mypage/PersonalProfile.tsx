'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import ProfileImage from './ProfileImage';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { updatePersonalProfile, uploadProfileImage } from '@/api/user';

interface FormValues {
  name: string;
  nickname: string;
  email: string;
  password?: string;
  introduction?: string;
  personalWebsite?: string;
  profileImage?: string;
}

export default function PersonalProfile() {
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
      name: user?.name || '',
      nickname: user?.nickname || '',
      email: user?.email || '',
      password: '',
      introduction: user?.role === 'personal' ? user.introduction || '' : '',
      personalWebsite: user?.role === 'personal' ? user.personalWebsite || '' : '',
      profileImage: user?.profileImageUrl || '',
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name || '',
      nickname: user.nickname || '',
      email: user.email || '',
      password: '',
      introduction: user.role === 'personal' ? user.introduction || '' : '',
      personalWebsite: user.role === 'personal' ? user.personalWebsite || '' : '',
      profileImage: user.profileImageUrl || '',
    });
  }, [user, reset]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadProfileImage(file);
      setValue('profileImage', url); // form 반영
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await updatePersonalProfile({ ...data, profileImageUrl: data.profileImage || '' });
      if (user?.role === 'personal') {
        updateUser({
          name: data.name,
          nickname: data.nickname,
          email: data.email,
          introduction: data.introduction,
          personalWebsite: data.personalWebsite,
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
          name="name"
          control={control}
          render={({ field }) => <Input label="이름" {...field} />}
        />
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => <Input label="닉네임" {...field} />}
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

        <div className="flex items-center justify-between">
          <label className="text-lg font-bold">작업분야</label>
          <button type="button" className="text-sm text-gray-500">
            작업분야 설정 &gt;
          </button>
        </div>

        <div>
          <label className="mb-[8px] block text-lg font-bold">소개</label>
          <Controller
            name="introduction"
            control={control}
            render={({ field }) => (
              <textarea {...field} className="h-[120px] w-full rounded border px-[10px] py-[8px]" />
            )}
          />
        </div>

        <Controller
          name="personalWebsite"
          control={control}
          render={({ field }) => (
            <Input
              label="홈페이지"
              type="url"
              placeholder="운영중인 개인 홈페이지를 입력해주세요"
              className="placeholder:text-md placeholder:font-bold placeholder:text-gray-400 placeholder:opacity-30"
              {...field}
            />
          )}
        />
      </div>
    </form>
  );
}
