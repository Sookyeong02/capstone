import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 입력창 위에 표시할 라벨 (선택사항)
  error?: string; // 에러 메시지 (선택사항)
  className?: string; // 추가 커스텀 클래스
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-[8px] text-lg font-bold">{label}</label>}

      <input
        className={`border-opacity-30 h-[40px] rounded-[5px] border border-gray-400 px-[10px] py-[8px] focus:outline-none ${
          error ? 'border-red-1' : 'border-gray-300'
        } ${className}`}
        {...props}
      />

      {error && <p className="text-red-1 font-regular mt-[8px] text-xs">{error}</p>}
    </div>
  );
}
