'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import kebab from '../../../public/icons/kebab.svg';
import { useRouter } from 'next/navigation';
import { deletePortfolio } from '@/api/portfolio';
import { AxiosError } from 'axios';

interface PortfolioKebabProps {
  portfolioId: string;
  onEdit: () => void;
  onDelete?: (portfolioId: string) => void;
}

export default function Kebab({ portfolioId, onEdit, onDelete }: PortfolioKebabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePortfolio(portfolioId);
      alert('삭제되었습니다.');
      onDelete?.(portfolioId);
      router.refresh();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response?.status === 403) {
        alert('삭제 권한이 없습니다.');
        return;
      }
      alert(axiosError.response?.data?.message || '삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button ref={buttonRef} onClick={toggleMenu} className="px-[12px]">
        <Image src={kebab} alt="케밥 메뉴" width={6} height={20} className="py-[2px] md:py-[3px]" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-[30px] right-[0px] z-40 w-[160px] rounded-[6px] border border-gray-300 bg-white"
        >
          <ul className="text-center">
            <li
              className="cursor-pointer px-[46px] py-[18px] text-base font-medium hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                onEdit();
              }}
            >
              수정하기
            </li>

            <hr className="border-t border-gray-300" />

            <li
              className={`px-[46px] py-[18px] text-base font-medium ${
                isDeleting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'
              }`}
              onClick={() => {
                if (!isDeleting) {
                  setIsOpen(false);
                  handleDelete();
                }
              }}
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
