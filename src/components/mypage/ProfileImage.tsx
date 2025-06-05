'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Upload from '../../../public/icons/upload.svg';

interface Props {
  initialImageUrl?: string;
  onChange?: (url: string) => void;
  onFileSelect?: (file: File) => void;
}

export default function ProfileImage({ initialImageUrl, onChange, onFileSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(initialImageUrl || '');

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기 표시
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    onFileSelect?.(file);
    onChange?.(localPreview);
  };

  return (
    <div className="flex flex-wrap items-center gap-[40px]">
      <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
        {preview ? (
          <Image
            src={preview}
            alt="프로필 미리보기"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-white">
            +
          </div>
        )}
      </div>

      <div className="mt-[8px] flex flex-col items-start gap-[8px]">
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="hidden"
          ref={inputRef}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-[2px] rounded-[30px] border px-[16px] py-[8px] text-lg font-bold"
        >
          <Image src={Upload} alt="프로필 업로드" width={21} height={21} />
          프로필 사진 업로드
        </button>
        <p className="mb:text-md text-sm">10MB 이내의 이미지 파일을 업로드 해주세요.</p>
      </div>
    </div>
  );
}
