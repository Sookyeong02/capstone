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

  const filteredData = data.filter(item =>
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-0 py-10" style={{ fontFamily: 'PretendardSemiBold', color: '#0A1B2D' }}>
      {/* 상단 키비주얼 영역 */}
      <section className="w-full bg-[#EEEEEE] pt-20 pb-0 px-6 relative">
        <div className="w-full flex items-end justify-between">
          <div className="z-10 max-w-xl pl-24 pb-0">
            <h1 className="text-4xl mb-3 text-left whitespace-nowrap -translate-y-1" style={{ fontFamily: 'PretendardBold', color: '#0A191E', textShadow: '3px 3px 8px rgba(0,0,0,0.4)' }}>
              Turn Your Passion Into a Portfolio
            </h1>
            <p className="text-base text-left mb-4 -translate-y-2 translate-x-1" style={{ fontFamily:'PretendardRegular', color: '#504F4F' }}>
              Build a stunning portfolio to showcase and grow your career
            </p>
            <img src="/images/keyboard.png" alt="keyboard" className="w-[520px] max-w-none -translate-y-0.1" />
          </div>
          <img src="/images/phone.png" alt="phone" className="w-64 h-auto pr-2 -translate-y-6 -translate-x-15" />
        </div>
      </section>

      {/* 카테고리 그라데이션 영역 */}
      <section className="w-full" style={{ background: 'linear-gradient(to bottom, rgba(121,116,126,0.2), transparent)' }}>
        <div className="grid grid-cols-4 gap-x-1 text-center py-14">
          {[
            { name: 'Design', icon: '/images/designicon.png' },
            { name: 'Develop', icon: '/images/developicon.png' },
            { name: 'Video', icon: '/images/videoicon.png' },
            { name: 'Music', icon: '/images/musicicon.png' },
          ].map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-1">
              <img src={cat.icon} alt={cat.name} className="w-15 h-15" />
              <span className="text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

       {/* 검색창 */}
      <section className="flex items-center justify-center mb-8">
        <div className="relative w-[85%]">
          <img src="/images/searchicon.png" alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8" />
          <input
            type="text"
            placeholder="원하는 작품을 입력해보세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border text-[#0A1B2D] placeholder:text-gray-400"
            style={{
              fontFamily: 'PretendardSemiBold',
              backgroundColor: '#F5F5F5',
              borderColor: '#0A1B2D'
            }}
          />
        </div>

        <button className="ml-2 px-4 py-2 text-sm border border-[#0A1B2D] rounded-full flex items-center gap-1">
          <span style={{ fontFamily: 'PretendardSemiBold', color: '#0A1B2D' }}>최신순</span>
          <span
            style={{
              fontFamily: 'PretendardSemiBold',
              fontSize: '14px',
              color: '#0A1B2D',
              lineHeight: '1',
              position: 'relative',
              top: '1px'
            }}
          >
            ⌄
          </span>
        </button>
      </section>

      {/* 포트폴리오 카드 리스트 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 px-8">
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
