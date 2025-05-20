'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import AuthItem from '../common/AuthInput';
import { Button } from '../ui/Button';
import FileUploadItem from './FileUploadItem';
import { signupCompany, uploadBusinessFile } from '@/api/auth';

interface FormData {
  email: string;
  companyName: string;
  password: string;
  passwordConfirm: string;
  businessNumber: string;
  businessFile: File;
}

interface ErrorResponse {
  message: string;
}

export default function CompanyForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      companyName: '',
      password: '',
      passwordConfirm: '',
      businessNumber: '',
      businessFile: undefined as unknown as File,
    },
    mode: 'onChange',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('email', {
        type: 'manual',
        message: '잘못된 이메일입니다.',
      });
    } else {
      clearErrors('email');
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setError('password', {
        type: 'manual',
        message: '8자 이상 작성해 주세요.',
      });
    } else {
      clearErrors('password');
    }
  };

  const validatePasswordMatch = (passwordConfirm: string) => {
    const password = getValues('password');
    if (password !== passwordConfirm) {
      setError('passwordConfirm', { type: 'manual', message: '비밀번호가 일치하지 않습니다.' });
    } else {
      clearErrors('passwordConfirm');
    }
  };

  const validateBusinessNumber = (number: string) => {
    const onlyDigits = /^\d{10}$/;
    if (!onlyDigits.test(number)) {
      setError('businessNumber', {
        type: 'manual',
        message: '10자리 숫자로 입력해 주세요.',
      });
    } else {
      clearErrors('businessNumber');
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const businessFileUrl = await uploadBusinessFile(data.businessFile);

      if (!businessFileUrl) {
        alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      await signupCompany({
        email: data.email,
        companyName: data.companyName,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        businessNumber: data.businessNumber,
        businessFileUrl,
      });

      alert('회원가입이 완료되었습니다. 관리자의 승인을 기다려주세요.');
      router.push('/login');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      const message = error.response?.data?.message;

      if (message === '이미 존재하는 이메일입니다.') {
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다.',
        });
      } else {
        alert(message || '회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const values = getValues();

  const isButtonDisabled =
    !values.email ||
    !values.companyName ||
    !values.password ||
    !values.passwordConfirm ||
    !values.businessNumber ||
    !values.businessFile ||
    !!errors.email ||
    !!errors.password ||
    !!errors.passwordConfirm ||
    !!errors.companyName ||
    !!errors.businessNumber ||
    !!errors.businessFile;

  return (
    <form className="flex flex-col gap-[28px]" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <AuthItem
            label="이메일"
            id="email"
            placeholder="이메일을 입력해 주세요."
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(field.value)}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        name="companyName"
        control={control}
        render={({ field }) => (
          <AuthItem
            label="회사명"
            id="companyName"
            placeholder="회사명을 입력해 주세요."
            value={field.value}
            onChange={field.onChange}
            error={!!errors.companyName}
            errorMessage={errors.companyName?.message}
          />
        )}
      />

      <Controller
        name="businessNumber"
        control={control}
        render={({ field }) => (
          <AuthItem
            label="사업자 등록번호"
            id="businessNumber"
            placeholder="사업자 등록번호를 입력해 주세요."
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              validateBusinessNumber(e.target.value);
            }}
            error={!!errors.businessNumber}
            errorMessage={errors.businessNumber?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <AuthItem
            label="비밀번호"
            id="password"
            passwordinput
            placeholder="8자 이상 입력해 주세요."
            value={field.value}
            onChange={field.onChange}
            onBlur={() => {
              validatePasswordMatch(field.value);
              validatePassword(field.value);
            }}
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field }) => (
          <AuthItem
            label="비밀번호 확인"
            id="passwordConfirm"
            passwordinput
            placeholder="비밀번호를 한번 더 입력해 주세요."
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              validatePasswordMatch(e.target.value);
            }}
            onBlur={() => validatePasswordMatch(field.value)}
            error={!!errors.passwordConfirm}
            errorMessage={errors.passwordConfirm?.message}
          />
        )}
      />

      <Controller
        name="businessFile"
        control={control}
        render={({ field }) => (
          <FileUploadItem
            id="businessFile"
            value={field.value}
            onChange={(file) => field.onChange(file)}
            error={!!errors.businessFile}
            errorMessage={errors.businessFile?.message}
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
        회원가입 하기
      </Button>
    </form>
  );
}
