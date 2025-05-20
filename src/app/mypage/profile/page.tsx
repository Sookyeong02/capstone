'use client';

import CompanyProfile from '@/components/mypage/CompanyProfile';
import PersonalProfile from '@/components/mypage/PersonalProfile';
import { useAuthStore } from '@/store/auth';

export default function Profile() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div>
      <div>{user.role === 'personal' ? <PersonalProfile /> : <CompanyProfile />}</div>
    </div>
  );
}
