import Sidebar from '@/components/mypage/Sidebar';
import 'highlight.js/styles/github.css'; // 또는 원하는 테마로 교체 가능

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] px-[20px] md:px-[40px]">
      <div className="mt-[100px] hidden md:block">
        <Sidebar />
      </div>

      <main className="w-full flex-1 px-[40px] pt-[80px] md:px-0 md:pt-[100px] md:pl-[120px]">
        {children}
      </main>
    </div>
  );
}
