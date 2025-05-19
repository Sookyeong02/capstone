'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/mypage/Sidebar';

export default function MyPageEntry() {
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth >= 768) {
      router.replace('/mypage/profile');
    }
  }, [router]);

  return (
    <div className="block md:hidden">
      <Sidebar />
    </div>
  );
}
