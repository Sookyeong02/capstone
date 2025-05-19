'use client';

import { useAuthStore } from '@/store/auth';
import { publicApi } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RoleTabs from '../common/RoleTabs';
import AuthItem from '../common/AuthInput';
import { Button } from '../ui/Button';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Logo from '../../../public/icons/main-logo.svg';
import { LoginResponse } from '@/types/auth';
import { loginUser } from '@/api/auth';

interface FormData {
  email: string;
  password: string;
  role: 'personal' | 'company';
}

interface ErrorResponse {
  message: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [role, setRole] = useState<'personal' | 'company'>('personal');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError: setFormError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      role: 'personal',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { user } = await loginUser({ ...data, role });

      if (user.role !== role) {
        alert('선택한 사용자 유형과 계정 정보가 일치하지 않습니다.');
        setLoading(false);
        return;
      }

      login(user);
      router.push('/');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const msg = error.response?.data?.message ?? '서버와의 통신 중 오류가 발생했습니다.';

      if (msg === '비밀번호가 일치하지 않습니다.') {
        setError('');
      } else if (msg === '존재하지 않는 사용자입니다.') {
        alert('존재하지 않는 사용자입니다.');
      } else {
        console.error('예상치 못한 에러 메시지:', msg);
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setFormError('email', {
        type: 'manual',
        message: '잘못된 이메일입니다.',
      });
    } else {
      clearErrors('email');
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setFormError('password', {
        type: 'manual',
        message: '8자 이상 작성해 주세요.',
      });
    } else {
      clearErrors('password');
    }
  };

  const isButtonDisabled = loading || !isValid || !!errors.email || !!errors.password;

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

      <form
        className="mb:mt-[30px] mt-[24px] flex w-full flex-col gap-[28px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: '이메일은 필수 입력 사항입니다.' }}
          render={({ field }) => (
            <AuthItem
              label="이메일"
              id="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(field.value)}
              error={!!errors.email}
              errorMessage={errors.email?.message}
              className="w-[350px] md:w-[640px]"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: '비밀번호는 필수 입력 사항입니다.' }}
          render={({ field }) => (
            <AuthItem
              label="비밀번호"
              id="password"
              passwordinput
              placeholder="비밀번호를 입력해주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validatePassword(e.target.value);
              }}
              onBlur={() => validatePassword(field.value)}
              error={!!errors.password}
              errorMessage={errors.password?.message}
              className="w-[350px] md:w-[640px]"
            />
          )}
        />

        <Button
          type="submit"
          variant="customBlue"
          size="full"
          disabled={isButtonDisabled}
          className="mt-[24px] w-[350px] md:w-[640px]"
        >
          로그인
        </Button>
        {error && <p className="text-center text-[color:var(--color-red-1)]">{error}</p>}
      </form>

      <p className="mx-auto mt-[32px] mb-[92px] flex gap-[10px] text-lg font-medium text-gray-900 md:mb-[130px]">
        회원이 아니신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-custom-blue-100 text-lg font-medium underline">회원가입 하기</span>
        </Link>
      </p>
    </div>
  );
}
