'use client';

import { useAuthStore } from '@/store/auth';
import { api } from '@/utils/axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfileModal() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await api.post('/auth/logout');
    logout();
    router.push('/');
  };

  if (!user) return null;

  const displayName = user.role === 'personal' ? user.nickname : user.companyName;
  const profileImage = user.profileImageUrl;
  const initial = displayName[0];

  return (
    <div className="flex h-[340px] w-[368px] flex-col justify-between rounded-[10px] border-[1px] border-gray-200 bg-white px-[14px]">
      <div className="mt-[40px] mb-[26px] flex items-center gap-4 px-[26px]">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="프로필"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-200 text-xl text-white">
            {initial}
          </div>
        )}
        <div>
          <p className="text-xl font-bold">{displayName}</p>
          <p className="text-lg font-light text-gray-400 opacity-50">{user.email}</p>
        </div>
      </div>

      <hr />

      {user.role === 'personal' ? (
        <div className="my-[14px] space-y-[8px] px-[26px] text-lg font-light">
          <div>내 정보</div>
          <div>내 포트폴리오</div>
          <div>포트폴리오 등록</div>
        </div>
      ) : (
        <div className="my-[14px] space-y-[8px] px-[26px] text-lg font-light">
          <div>내 정보</div>
          <div>내 채용 공고</div>
          <div>채용 공고 등록</div>
        </div>
      )}

      <hr />

      <div
        className="mt-[14px] mb-[40px] cursor-pointer px-[26px] text-lg font-light"
        onClick={handleLogout}
      >
        로그아웃
      </div>
    </div>
  );
}
