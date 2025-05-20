'use client';

import { useState } from 'react';
import Pagination from '@/components/common/pagination';
import PortfolioCard from '@/components/portfolio/portfoliocard';

const data = [
  { imageUrl: '/images/card01.png', username: 'shy', likes: 27 },
  { imageUrl: '/images/card02.png', username: 'shy1', likes: 19 },
  { imageUrl: '/images/card03.png', username: 'shy2', likes: 42 },
  { imageUrl: '/images/card04.png', username: 'shy3', likes: 33 },
  { imageUrl: '/images/card05.png', username: 'shy4', likes: 24 },
  { imageUrl: '/images/card06.png', username: 'shy5', likes: 15 },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="w-full px-0 py-10"
      style={{ fontFamily: 'PretendardSemiBold', color: '#0A1B2D' }}
    >
      {/* 상단 키비주얼 영역 */}
      <section className="relative w-full bg-[#EEEEEE] px-6 pt-20 pb-0">
        <div className="flex w-full items-end justify-between">
          <div className="z-10 max-w-xl pb-0 pl-24">
            <h1
              className="mb-3 -translate-y-1 text-left text-4xl whitespace-nowrap"
              style={{
                fontFamily: 'PretendardBold',
                color: '#0A191E',
                textShadow: '3px 3px 8px rgba(0,0,0,0.4)',
              }}
            >
              Turn Your Passion Into a Portfolio
            </h1>
            <p
              className="mb-4 translate-x-1 -translate-y-2 text-left text-base"
              style={{ fontFamily: 'PretendardRegular', color: '#504F4F' }}
            >
              Build a stunning portfolio to showcase and grow your career
            </p>
            <img
              src="/images/keyboard.png"
              alt="keyboard"
              className="-translate-y-0.1 w-[520px] max-w-none"
            />
          </div>
          <img
            src="/images/phone.png"
            alt="phone"
            className="h-auto w-64 -translate-x-15 -translate-y-6 pr-2"
          />
        </div>
      </section>

      {/* 카테고리 그라데이션 영역 */}
      <section
        className="w-full"
        style={{ background: 'linear-gradient(to bottom, rgba(121,116,126,0.2), transparent)' }}
      >
        <div className="grid grid-cols-4 gap-x-1 py-14 text-center">
          {[
            { name: 'Design', icon: '/images/designicon.png' },
            { name: 'Develop', icon: '/images/developicon.png' },
            { name: 'Video', icon: '/images/videoicon.png' },
            { name: 'Music', icon: '/images/musicicon.png' },
          ].map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-1">
              <img src={cat.icon} alt={cat.name} className="h-15 w-15" />
              <span className="text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 검색창 */}
      <section className="mb-8 flex items-center justify-center">
        <div className="relative w-[85%]">
          <img
            src="/images/searchicon.png"
            alt="search"
            className="absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 transform"
          />
          <input
            type="text"
            placeholder="원하는 작품을 입력해보세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border py-2 pr-4 pl-10 text-[#0A1B2D] placeholder:text-gray-400"
            style={{
              fontFamily: 'PretendardSemiBold',
              backgroundColor: '#F5F5F5',
              borderColor: '#0A1B2D',
            }}
          />
        </div>

        <button className="ml-2 flex items-center gap-1 rounded-full border border-[#0A1B2D] px-4 py-2 text-sm">
          <span style={{ fontFamily: 'PretendardSemiBold', color: '#0A1B2D' }}>최신순</span>
          <span
            style={{
              fontFamily: 'PretendardSemiBold',
              fontSize: '14px',
              color: '#0A1B2D',
              lineHeight: '1',
              position: 'relative',
              top: '1px',
            }}
          >
            ⌄
          </span>
        </button>
      </section>

      {/* 포트폴리오 카드 리스트 */}
      <section className="mb-10 grid grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredData.map((item, idx) => (
          <PortfolioCard
            key={idx}
            imageUrl={item.imageUrl}
            username={item.username}
            likes={item.likes}
          />
        ))}
      </section>

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
