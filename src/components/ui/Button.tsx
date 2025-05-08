import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = 'customBlue' | 'gray-300';
type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'full';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // 버튼 내부에 들어갈 컨텐츠
  variant?: ButtonVariant; // 버튼 스타일(기본값: 'blue-200')
  size?: ButtonSize; // 버튼 크기(기본값: 'medium')
  className?: string; // 추가적인 css 클래스
  isLoading?: boolean; // 로딩 상태 표시 여부
  fullWidth?: boolean; // 버튼을 부모 너비에 맞춰 확장할지 여부
}

export function Button ({
  children,
  variant = 'customBlue',
  size = 'large',
  className = '',
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    'customBlue': "var(--color-custom-blue-200)",
    'gray-300': 'bg-gray-300 text-white',
  };
  
  const sizeStyles = {
    xsmall: 'w-[50px] h-[24px] text-xs',
    small: 'w-[66px] h-[24px] text-xs',
    medium: 'w-[90px] h-[34px] text-lg',
    large: 'w-[162px] h-[48px] text-lg',
    full: 'px-6 py-3 text-lg w-full',
  };

  const baseStyles =
    'flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      style={{
        backgroundColor: variantStyles[variant],
        color: "white", 
      }}
      className={`${baseStyles} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
}