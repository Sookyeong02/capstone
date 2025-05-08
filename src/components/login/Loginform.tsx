"use client";

import { useAuthStore } from "@/store/auth";
import { publicApi } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginTabs from "./LoginTabs";
import LoginInput from "./LoginInput";
import { Button } from "../ui/Button";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { AxiosError } from "axios";
import Image from "next/image";
import Logo from "../../../public/icons/main-logo.svg";
import { LoginResponse } from "@/types/auth";

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
  const [error, setError] = useState("");
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
      const response = await publicApi.post<LoginResponse>('auth/login', {
        email: data.email,
        password: data.password,
        role,
      });
      const { user, accessToken, refreshToken } = response.data;
      login(user, accessToken, refreshToken);

      console.log(useAuthStore.getState());
      console.log("🧪 백엔드 응답 확인:", response.data);


      router.push('/');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const msg = error.response?.data?.message;
      if (msg === '비밀번호가 일치하지 않습니다.') {
        setError('');
      } else if (msg === '존재하지 않는 유저입니다.') {
        alert('존재하지 않는 유저입니다.');
      } else {
        setError('error');
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
    <div className="flex flex-col w-[350px] md:w-[640px]">
      <Link href="/" className="flex justify-center mt-[78px] md:mt-[90px] mb-[60px] md:mb-[40px]">
        <Image 
          width={204} 
          height={230} 
          src={Logo} 
          alt="로고" 
          className="w-[124px] h-[140px] md:w-[204px] md:h-[230px]"
        />
      </Link>

      <LoginTabs value={role} onChange={setRole} />

      <form 
        className="gap-[32px] flex flex-col w-full mt-[24px] mb:mt-[30px]" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: '이메일은 필수 입력 사항입니다.' }}
          render={({ field }) => (
            <LoginInput
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
            <LoginInput
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
          className="w-[350px] md:w-[640px] mt-[24px]"
        >
          로그인
        </Button>
        {error && <p className="text-[color:var(--color-red-1)] text-center">{error}</p>}
      </form>

      <p className="flex gap-[10px] font-medium text-gray-900 text-lg mx-auto mt-[32px]">
        회원이 아니신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-gray-900 text-lg font-medium underline">
            회원가입 하기
          </span>
        </Link>
      </p>

      <div className="flex gap-[40px] text-md font-regular justify-center items-center whitespace-nowrap md:text-xl mt-[40px] md:mt-[48px]">
        <div className="w-[180px] h-[1px] bg-gray-300" />
        SNS 계정으로 로그인하기
        <div className="w-[180px] h-[1px] bg-gray-300" />
      </div>

      <div className="flex gap-[16px] justify-center items-center mt-[24px] md:mt-[40px]">
        {/* 소셜 로그인 */}
      </div>
    </div>
  );
}
