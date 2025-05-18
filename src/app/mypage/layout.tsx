import Sidebar from '@/components/mypage/Sidebar';

// export default function MypageLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="mx-auto flex min-h-screen max-w-[1600px] px-[40px]">
//       <Sidebar />
//       <main className="flex-1 pt-[100px] pl-[194px]">{children}</main>
//     </div>
//   );
// }

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] px-[20px] md:px-[40px]">
      {/* 사이드바: 데스크탑에서만 보임 */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 콘텐츠 영역 */}
      <main className="w-full flex-1 px-[40px] pt-[80px] md:px-0 md:pt-[100px] md:pl-[160px]">
        {children}
      </main>
    </div>
  );
}
