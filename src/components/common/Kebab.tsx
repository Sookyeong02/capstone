'use client';

import { useState, useRef, useEffect } from 'react';

export default function Kebab({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* 점 세 개 아이콘 */}
      <button onClick={() => setOpen(!open)} className="text-gray-600 hover:text-black text-2xl">
        ⋮
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-md rounded z-10">
          <button onClick={onEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            수정하기
          </button>
          <button onClick={onDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
