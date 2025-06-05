import { ContentBlock } from '@/types/portfolio';
import Image from 'next/image';

export default function RenderBlock({ block }: { block: ContentBlock }) {
  if (block.type === 'text') {
    return <p className="mb-4 whitespace-pre-line">{block.content}</p>;
  }

  if (block.type === 'image') {
    return (
      <Image
        src={block.content}
        alt="프로필 이미지"
        width={1200}
        height={0}
        sizes="100vw"
        className="mb-4 h-auto w-full object-cover"
      />
    );
  }

  if (block.type === 'code') {
    return (
      <pre className="mb-4 rounded bg-gray-100 p-4">
        <code>{block.content}</code>
      </pre>
    );
  }

  return null;
}
