import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 입력창 위에 표시할 라벨 (선택사항)
  error?: string; // 에러 메시지 (선택사항)
  className?: string; // 추가 커스텀 클래스
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-lg font-regular mb-[8px]">{label}</label>}

      <input
        className={`border rounded-[5px] ${
          error ? 'border-red-1' : 'border-gray-300'
        } ${className}`}
        {...props}
      />

      {error && <p className="text-xs text-red-1 font-regular mt-[8px]">{error}</p>}
    </div>
  );
}