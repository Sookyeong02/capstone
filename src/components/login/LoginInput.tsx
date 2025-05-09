import { useState } from 'react';
import Image from 'next/image';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  passwordinput?: boolean;
  labelClassName?: string; // label 스타일을 외부에서 지정할 수 있도록 추가
}

export default function InputItem({
  label,
  id,
  error,
  passwordinput,
  errorMessage,
  className,
  labelClassName, // labelClassName을 받아서 사용
  ...props
}: InputProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative flex w-[350px] flex-col gap-[8px] md:w-[640px]">
      {/* label 스타일을 props로 받으면 이를 적용 */}
      <label
        htmlFor={id}
        className={`font-pretendard text-[black] ${labelClassName || 'font-regular text-lg'}`}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={passwordinput ? `${id}-password` : id}
          className={`font-pretendard h-[48px] w-full rounded-[6px] border pl-[20px] text-lg placeholder-gray-300 ${error ? 'border-[color:var(--color-red-1)]' : 'border-gray-300'} focus:border-gray-300 focus:outline-none ${className}`}
          type={passwordinput && !isPasswordVisible ? 'password' : 'text'}
          {...props}
        />

        {passwordinput && (
          <span
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
          >
            <Image
              src={
                isPasswordVisible
                  ? '/icons/icon-visibility_on.svg'
                  : '/icons/icon-visibility_off.svg'
              }
              alt={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 표시'}
              width={20}
              height={20}
            />
          </span>
        )}
      </div>

      {error && errorMessage && (
        <p className="font-regular text-xs text-[color:var(--color-red-1)]">{errorMessage}</p>
      )}
    </div>
  );
}
