'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/icons/logo.svg';
import Bell from '../../../public/icons/bell.svg';
import User from '../../../public/icons/user.svg';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useEffect, useRef, useState } from 'react';
import ProfileModal from '../profile/ProfileModal';

export default function Header() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    setIsModalOpen(false);
  }, [user]);

  const hideHeaderPaths = ['/login', '/signup'];
  const shouldHideHeader = hideHeaderPaths.includes(pathname);

  if (shouldHideHeader) return null; // 렌더링 아예 안 함

  const handleProfileClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const renderProfile = () => {
    if (!user) return null;

    if (user?.profileImageUrl) {
      return (
        <Image
          key={user?.profileImageUrl}
          src={`${user.profileImageUrl}?t=${new Date().getTime()}`}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="h-[32px] w-[32px] rounded-full object-cover"
        />
      );
    }

    const name = user.role === 'personal' ? user.nickname : user.companyName;
    const initial = name[0];

    return (
      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-200 text-sm text-white">
        {initial}
      </div>
    );
  };

  const renderDisplayName = () => {
    if (!user) return '';
    return user.role === 'personal' ? user.nickname : user.companyName;
  };

  return (
    <header className="flex h-[70px] w-full items-center justify-center border-b border-gray-200 bg-[#ffffff]">
      <nav className="flex h-[30px] w-full max-w-[1600px] items-center justify-between px-[40px]">
        <div className="flex items-center">
          <Link href="/">
            <Image
              width={130}
              height={40}
              src={Logo}
              alt="로고"
              className="w-[110px] md:w-[130px]"
            />
          </Link>
        </div>

        <div className="flex gap-[10px] md:gap-[30px]">
          <div className="text-md md:text-2lg flex items-center gap-[4px] font-bold md:gap-[10px]">
            <Link href="/jobs">채용 공고</Link>
          </div>

          <div className="hidden items-center md:flex">
            <Image width={20} height={20} src={Bell} alt="알림" />
          </div>

          {isAuthenticated ? (
            <div className="text-md md:text-2lg relative flex items-center gap-[10px] font-bold">
              <div
                onClick={handleProfileClick}
                className="flex cursor-pointer items-center gap-[10px]"
              >
                {renderProfile()}
                <span>{renderDisplayName()}</span>
              </div>

              {isModalOpen && (
                <div ref={modalRef} className="absolute top-[35px] right-0 z-40">
                  <ProfileModal closeModal={() => setIsModalOpen(false)} />
                </div>
              )}
            </div>
          ) : (
            <div className="text-md md:text-2lg flex items-center gap-[4px] font-bold md:gap-[10px]">
              <Image width={16} height={18} src={User} alt="사용자 아이콘" />
              <Link href="/login">Login</Link>
            </div>
          )}
        </div>

        {/* TODO: 알림*/}
      </nav>
    </header>
  );
}
