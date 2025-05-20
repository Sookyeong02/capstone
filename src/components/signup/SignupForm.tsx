'use client';

import { useState } from 'react';
import RoleTabs from '../common/RoleTabs';
import PersonalForm from './PersonalForm';
import CompanyForm from './CompanyForm';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/icons/main-logo.svg';

export default function SignupForm() {
  const [role, setRole] = useState<'personal' | 'company'>('personal');

  return (
    <div className="flex w-[350px] flex-col md:w-[640px]">
      <Link href="/" className="mt-[78px] mb-[60px] flex justify-center md:mt-[90px] md:mb-[40px]">
        <Image
          width={204}
          height={230}
          src={Logo}
          alt="로고"
          className="h-[140px] w-[124px] md:h-[230px] md:w-[204px]"
        />
      </Link>
      <RoleTabs value={role} onChange={setRole} />
      <div className="mb:mt-[30px] mt-[24px]">
        {role === 'personal' ? <PersonalForm /> : <CompanyForm />}
      </div>

      <p className="mx-auto mt-[32px] mb-[92px] flex gap-[10px] text-lg font-medium text-gray-900 md:mb-[130px]">
        회원이신가요?
        <Link href="/login" aria-label="로그인하기">
          <span className="text-custom-blue-100 text-lg font-medium underline">로그인하기</span>
        </Link>
      </p>
    </div>
  );
}
