'use client';

import { useRouter } from 'next/navigation';

export default function PortfolioEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const existingData = {
    title: 'CGV 개선 UI/UX',
    category: 'Design',
    content: '<p>기존 내용</p>',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 수정된 데이터 서버에 제출
    alert(`포트폴리오 ${id} 수정 완료!`);
    router.push(`/portfolio/${id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black px-20 py-10">
      <h1 className="text-2xl font-bold mb-4">포트폴리오 수정</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          defaultValue={existingData.title}
          className="border px-4 py-2"
        />
        <select defaultValue={existingData.category} className="border px-4 py-2">
          <option value="Design">디자인</option>
          <option value="Develop">개발</option>
          <option value="Video">영상</option>
          <option value="Music">음악</option>
        </select>
        {/* 실제로는 Tiptap 에디터도 여기에 들어가야 함 */}
        <button type="submit" className="bg-black text-white px-6 py-2 rounded">
          수정 완료
        </button>
      </form>
    </div>
  );
}
