'use client';

import { useAuthInit } from '@/hooks/useAuthInit';

export default function AuthInit() {
  useAuthInit(); // 로그인 복원 시도
  return null; // 렌더링 X
}
