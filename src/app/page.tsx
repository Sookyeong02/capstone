'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/common/pagination';
import PortfolioCard from '@/components/portfolio/portfoliocard';
import { Portfolio, getAllPortfolios } from '@/api/portfolio';

const data = [
  { imageUrl: '/images/card01.png', username: 'shy', likes: 27, category: 'design' },
  { imageUrl: '/images/card02.png', username: 'shy1', likes: 19, category: 'develop' },
  { imageUrl: '/images/card03.png', username: 'shy2', likes: 42, category: 'video' },
  { imageUrl: '/images/card04.png', username: 'shy3', likes: 33, category: 'music' },
  { imageUrl: '/images/card05.png', username: 'shy4', likes: 24, category: 'design' },
  { imageUrl: '/images/card06.png', username: 'shy5', likes: 15, category: 'develop' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const totalPages = 4;
  const [sortBy, setSortBy] = useState<'latest' | 'likes'>('latest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPortfolios();
        setPortfolios(res);
      } catch (error) {
        console.error('포트폴리오 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [])

  const filteredData = Array.isArray(portfolios)
  ? portfolios
      .filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
          return (b.likes ?? 0) - (a.likes ?? 0);
        }
      })
  : [];


  return (
    <div className="w-full px-0" style={{ fontFamily: 'PretendardSemiBold', color: '#0A1B2D' }}>
      {/* 상단 키비주얼 */}
      <section className="relative w-full bg-[#EEEEEE] px-6 pt-20 pb-0">
        <div className="flex w-full items-end justify-between">
          <div className="z-10 max-w-xl pb-0 pl-24">
            <h1 className="mb-3 translate-x-12 -translate-y-1 text-left text-5xl whitespace-nowrap"
              style={{ fontFamily: 'PretendardBold', color: '#0A191E', textShadow: '3px 3px 8px rgba(0,0,0,0.4)' }}>
              Turn Your Passion Into a Portfolio
            </h1>
            <p className="mb-4 translate-x-13 -translate-y-2 text-left text-base"
              style={{ fontFamily: 'PretendardRegular', color: '#504F4F' }}>
              Build a stunning portfolio to showcase and grow your career
            </p>
            <img src="/images/keyboard.png" alt="keyboard"
              className="translate-x-11 -translate-y-0.1 w-[800px] max-w-none" />
          </div>
          <img src="/images/phone.png" alt="phone" className="h-auto w-75 -translate-x-40 -translate-y-8 pr-2" />
        </div>
      </section>

      {/* 카테고리 */}
      <section className="w-full" style={{ background: 'linear-gradient(to bottom, rgba(121,116,126,0.2), transparent)' }}>
        <div className="grid grid-cols-4 gap-x-[0px] gap-y-[15px] py-14 text-center">
          {[
  { name: 'Design', icon: '/images/design_icon.png', value: 'design' },
  { name: 'Develop', icon: '/images/develop_icon.png', value: 'develop' },
  { name: 'Video', icon: '/images/video_icon.png', value: 'video' },
  { name: 'Music', icon: '/images/music_icon.png', value: 'music' },
].map((cat) => (
  <button
    key={cat.name}
    onClick={() => setSelectedCategory(selectedCategory === cat.value ? null : cat.value)}
    className={`flex flex-col items-center justify-center gap-1 ${selectedCategory === cat.value ? 'text-blue-600' : ''}`}
  >
    <div className="flex justify-center w-full">
      <img src={cat.icon} alt={cat.name} className="h-20 w-20" />
    </div>

    <span className={`text-sm inline-block ${cat.name === 'Design' ? '-translate-x-[4px]' : ''}`}>
      {cat.name}
    </span>
  </button>
))}

        </div>
      </section>

      {/* 검색창 */}
      <section className="mb-8 flex items-center justify-center">
        <div className="relative w-[80%]">
          <img src="/images/searchicon.png" alt="search" className="absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 transform" />
          <input
            type="text"
            placeholder="원하는 작품을 입력해보세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border-1 border-[#0A1B2D] py-2 pr-4 pl-10 text-[#0A1B2D] placeholder:text-gray-400"
            style={{ fontFamily: 'PretendardSemiBold', backgroundColor: '#F5F5F5' }}
          />
        </div>

        <div className="relative inline-block ml-4">
  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FAFAFA] px-1 text-xs font-bold text-[#0A1B2D]">
    정렬
  </span>

  {/* 정렬 버튼 */}
  <button
    onClick={() => setIsSortOpen(!isSortOpen)}
    className="flex items-center gap-1 px-4 py-2 rounded-full font-bold text-[#0A1B2D] bg-[#F5F5F5] border-1 border-[#0A1B2D]"
  >
    {sortBy === 'latest' ? '최신순' : '좋아요순'}
    <svg className="w-3 h-3 fill-[#0A1B2D]" viewBox="0 0 20 20">
      <path d="M5 7l5 6 5-6H5z" />
    </svg>
  </button>

  {/* 정렬 옵션 드롭다운 */}
  {isSortOpen && (
    <div className="absolute right-0 mt-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <ul className="py-1 text-sm text-[#0A1B2D]">
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setSortBy('latest');
            setIsSortOpen(false);
          }}
        >
          최신순
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setSortBy('likes');
            setIsSortOpen(false);
          }}
        >
          좋아요순
        </li>
      </ul>
    </div>
  )}
</div>

      </section>

      {/* 카드 리스트 */}
      <section className="mb-15 grid grid-cols-1 gap-6 px-15 sm:grid-cols-2 md:grid-cols-3">
        {filteredData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start">
            <PortfolioCard
              imageUrl={item.imageUrl ?? '/images/default.png'}
              username={item.username}
              likes={item.likes}
              showMenu={false}
            />

            <div className="mt-2 flex items-center gap-4 pl-2 text-[#0A1B2D] text-sm font-semibold">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM4 18a6 6 0 1112 0H4z" />
                </svg>
                {item.username}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343 3.172 11.515a4 4 0 010-5.657z" />
                </svg>
                {item.likes}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <div className="mb-10" />
    </div>
  );
}
