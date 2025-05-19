'use client';

import { useAuthStore } from '@/store/auth';
import { api } from '@/utils/axios';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const isPersonal = user.role === 'personal';

  const menus = isPersonal
    ? [
        { label: '내 정보', href: '/mypage/profile' },
        { label: '내 포트폴리오', href: '/mypage/portfolio-posts' },
        { label: '포트폴리오 등록', href: '/create-portfolio' },
      ]
    : [
        { label: '내 정보', href: '/mypage/profile' },
        { label: '내 채용 공고', href: '/mypage/job-posts' },
        { label: '채용 공고 등록', href: '/mypage/job-posts/create' },
      ];

  const isActive = (href: string) => pathname === href;

  const renderProfile = () => {
    if (!user) return null;

    if (user?.profileImageUrl) {
      return (
        <Image
          src={user.profileImageUrl}
          alt="프로필 이미지"
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-full object-cover"
        />
      );
    }
    return (
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gray-200 text-sm text-white">
        {initial}
      </div>
    );
  };

  const renderDisplayName = () => {
    if (!user) return '';
    return user.role === 'personal' ? user.nickname : user.companyName;
  };

  const name = user.role === 'personal' ? user.nickname : user.companyName;
  const initial = name[0];

  const handleLogout = async () => {
    await api.post('/auth/logout');
    logout();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-start justify-center">
      <aside className="w-[320px] rounded-[5px] border border-gray-400">
        <div className="flex flex-col">
          <div className="mx-[24px] mt-[20px] flex cursor-pointer items-center gap-[18px]">
            {renderProfile()}
            <span className="text-2lg font-semibold">{renderDisplayName()}</span>
          </div>

          <div className="mx-[24px]">
            <div className="mt-[20px]">
              <p className="text-lg font-bold">소개</p>
              <p className="text-md font-regular mt-[10px]">
                {isPersonal
                  ? user.introduction || '소개가 없습니다.'
                  : user.companyIntroduction || '회사 소개가 없습니다.'}
              </p>
            </div>

            {isPersonal && (
              <div className="mt-[12px]">
                <p className="text-lg font-bold">작업분야</p>
                <div className="mt-[10px] rounded-[3px] border border-gray-400 p-[5px]">
                  <p className="text-md font-semibold">{user.jobField ?? '없음'}</p>
                </div>
              </div>
            )}

            {isPersonal && (
              <div className="mt-[12px] gap-[10px]">
                <p className="mb-[10px] text-lg font-bold">활동 정보</p>
                <div className="flex justify-between">
                  <div className="flex-1">
                    <p className="text-md font-bold">{user.portfoliosCount ?? 0}</p>
                    <p className="text-md text-gray-500">포트폴리오</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-md font-bold">{user.likesReceived ?? 0}</p>
                    <p className="text-md text-gray-500">좋아요 받음</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-md font-bold">{user.likesGiven ?? 0}</p>
                    <p className="text-md text-gray-500">내 좋아요</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-[12px]">
              <p className="text-lg font-bold">홈페이지</p>
              <div className="mt-[10px] rounded-[3px] border border-gray-400 p-[5px]">
                <p className="text-md font-semibold">
                  {isPersonal ? user.personalWebsite || '없음' : user.companyWebsite || '없음'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="mx-[6px] my-[20px]" />

        <ul className="mx-[24px] text-lg font-semibold">
          {menus.map((menu) => (
            <li key={menu.href}>
              <Link
                href={menu.href}
                className={`block py-1 ${
                  isActive(menu.href) ? 'font-semibold text-black' : 'text-gray-300'
                } hover:underline`}
              >
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="mx-[6px] my-[20px]" />

        <div
          className="mx-[24px] mb-[20px] cursor-pointer text-lg font-semibold"
          onClick={handleLogout}
        >
          로그아웃
        </div>
      </aside>
    </div>
  );
}
