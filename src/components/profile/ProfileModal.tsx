'use client';

import { useAuthStore } from '@/store/auth';
import { api } from '@/utils/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfileModal({ closeModal }: { closeModal: () => void }) {
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
            className="h-[60px] w-[60px] rounded-full object-cover"
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
        <div className="my-[14px] flex flex-col space-y-[8px] px-[26px] text-lg font-light">
          <Link href="/mypage/profile" className="hidden md:block" onClick={closeModal}>
            내 정보
          </Link>
          <Link href="/mypage" className="block md:hidden" onClick={closeModal}>
            내 정보
          </Link>
          <Link href="/mypage/portfolio-posts" onClick={closeModal}>
            내 포트폴리오
          </Link>
          <Link href="/create-portfolio" onClick={closeModal}>
            포트폴리오 등록
          </Link>
        </div>
      ) : (
        <div className="my-[14px] flex flex-col space-y-[8px] px-[26px] text-lg font-light">
          <Link href="/mypage/profile" className="hidden md:block" onClick={closeModal}>
            내 정보
          </Link>
          <Link href="/mypage" className="block md:hidden" onClick={closeModal}>
            내 정보
          </Link>
          <Link href="/mypage/job-posts" onClick={closeModal}>
            내 채용 공고
          </Link>
          <Link href="/mypage/job-posts/create" onClick={closeModal}>
            채용 공고 등록
          </Link>
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
