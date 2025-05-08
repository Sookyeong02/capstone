'use client'; 

import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/icons/logo.svg";
import Bell from "../../../public/icons/bell.svg";
import SearchIcon from "../../../public/icons/search.svg";
import User from "../../../public/icons/user.svg";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  const hideHeaderPaths = ['/login', '/signup'];
  const shouldHideHeader = hideHeaderPaths.includes(pathname);

  if (shouldHideHeader) return null;  // 렌더링 아예 안 함

  const renderProfile = () => {
    if (!user) return null;

    if (user?.profileImageUrl) {
      return (
        <Image
          src={user.profileImageUrl}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="w-[32px] h-[32px] rounded-full object-cover"
        />
      );
    }
  
    const name = user.role === "personal" ? user.nickname : user.companyName;
    const initial = name[0];

    return (
      <div className="w-[32px] h-[32px] rounded-full bg-gray-300 text-white text-sm flex items-center justify-center">
        {initial}
      </div>
    );
  };

  const renderDisplayName = () => {
    if (!user) return "";
    return user.role === "personal" ? user.nickname : user.companyName;
  };

  return (
    <header className="w-full h-[70px] flex justify-center items-center bg-[#ffffff] border-b border-gray-200">
      <nav className="w-full max-w-[1600px] h-[30px] flex justify-between items-center px-[40px]">        
        <div className="flex items-center">
          <Link href="/" >
            <Image 
              width={130} 
              height={40} 
              src={Logo} 
              alt="로고" 
              className="w-[110px] md:w-[130px]" />
          </Link>
        </div>

        <div className="flex gap-[10px] md:gap-[30px]">
          <div className="flex items-center gap-[4px] md:gap-[10px] text-md md:text-2lg font-bold">
            <Link href="/jobs">채용 공고</Link>
          </div>

          <div className="hidden md:flex items-center">
            <Image width={20} height={20} src={Bell} alt="알림" />
          </div>

          <div className="hidden md:flex items-center gap-[4px] md:gap-[10px] text-2lg font-bold">
            <Image width={18} height={18} src={SearchIcon} alt="검색" />
            <p>Search</p>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-[8px] text-md md:text-2lg font-bold">
              {renderProfile()}
              <span>{renderDisplayName()}</span>
            </div>
          ) : (
            <div className="flex items-center gap-[4px] md:gap-[10px] text-md md:text-2lg font-bold">
              <Image width={16} height={18} src={User} alt="사용자 아이콘" />
              <Link href="/login">Login</Link>          
            </div>
          )}
        </div>

        {/* TODO: 알림, 검색창, 로그인 시 프로필 */}
      </nav>
    </header>
  );
}