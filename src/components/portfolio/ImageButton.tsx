'use client';

import Image from 'next/image';

export default function ImageButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-8 w-8 hover:opacity-80">
      <Image src="/icons/image_icon.png" alt="이미지 삽입" width={32} height={32} />
    </button>
  );
}
