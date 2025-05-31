'use client';

import { useState, useRef, useEffect } from 'react';

interface PortfolioCardProps {
  imageUrl: string;
  username: string;
  likes: number;
  showMenu?: boolean; 
}

const PortfolioCard = ({ imageUrl, username, likes, showMenu = true }: PortfolioCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full min-h-[250px] rounded overflow-visible shadow-sm border bg-white">
      
      {showMenu && (
        <div className="absolute top-2 right-2 z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="text-lg font-bold text-[#0A1B2D] leading-none">⋮</span>
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md text-sm z-30"
            >
              <button
                className="w-full px-4 py-2 hover:bg-gray-100 text-[#0A1B2D] border-b"
                onClick={() => {
                  alert('수정하기 클릭!');
                  setIsMenuOpen(false);
                }}
              >
                수정하기
              </button>
              <button
                className="w-full px-4 py-2 hover:bg-gray-100 text-[#0A1B2D]"
                onClick={() => {
                  alert('삭제하기 클릭!');
                  setIsMenuOpen(false);
                }}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      )}

      <img
        src={imageUrl}
        alt="포트폴리오 이미지"
        className="w-full h-48 object-cover"
      />

    </div>
  );
};

export default PortfolioCard;
