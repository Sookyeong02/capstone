'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import Image from 'next/image';
import SearchIcon from '../../public/icons/searchbar.svg';
import Keyboard from '../../public/images/keyboard.png';
import Phone from '../../public/images/phone.png';
import { Portfolio } from '@/types/portfolio';
import { fetchPortfolios } from '@/api/portfolio';

const categories = [
  { label: 'Design', value: 'design', icon: '/images/design_icon.png' },
  { label: 'Develop', value: 'develop', icon: '/images/develop_icon.png' },
  { label: 'Video', value: 'video', icon: '/images/video_icon.png' },
  { label: 'Music', value: 'music', icon: '/images/music_icon.png' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<'latest' | 'likes'>('latest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPortfolios({
          category: category || undefined,
          search,
          sort,
          page,
          limit: 12,
        });

        const converted = res.data.map((p) => ({
          ...p,
          id: p._id ?? '',
        }));

        setPortfolios(converted);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error('포트폴리오 불러오기 실패:', err);
      }
    };

    fetchData();
  }, [category, search, sort, page]);

  return (
    <div className="w-full px-0" style={{ fontFamily: 'PretendardSemiBold', color: '#0A1B2D' }}>
      {/* 상단 키비주얼 */}
      <section className="relative w-full bg-[#EEEEEE] pt-12 pb-0">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between px-6 lg:flex-row lg:items-end lg:px-24">
          <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              className="mb-3 px-1 text-3xl font-bold lg:text-5xl"
              style={{
                fontFamily: 'PretendardBold',
                color: '#0A191E',
                textShadow: '3px 3px 8px rgba(0,0,0,0.4)',
              }}
            >
              Turn Your Passion Into a Portfolio
            </h1>
            <p
              className="mb-4 px-3 py-1 text-base"
              style={{ fontFamily: 'PretendardRegular', color: '#504F4F' }}
            >
              Build a stunning portfolio to showcase and grow your career
            </p>
            <Image src={Keyboard} alt="keyboard" className="h-auto w-[800px]" />
          </div>
          <div className="hidden pr-2 lg:block">
            <Image src={Phone} alt="phone" className="h-auto w-[400px]" />
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section
        className="w-full"
        style={{ background: 'linear-gradient(to bottom, rgba(121,116,126,0.2), transparent)' }}
      >
        <div className="mx-auto grid max-w-[1300px] grid-cols-4 gap-x-[0px] gap-y-[15px] py-14 text-center">
          {categories.map((cat) => {
            const isSelected = category === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex flex-col items-center gap-1 transition ${
                  isSelected ? 'text-custom-blue-200 font-semibold' : 'text-gray-600'
                }`}
              >
                <div className="relative h-[50px] w-[50px] lg:h-[100px] lg:w-[100px]">
                  <Image src={cat.icon} alt={cat.label} fill className="object-contain" />
                </div>

                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 검색창 */}
      <section className="mb-[70px] flex items-center justify-center">
        <div className="flex w-full max-w-[1600px] items-center justify-center px-4">
          <div className="relative w-[80%]">
            <div
              className="flex h-[52px] w-full items-center gap-[10px] rounded-full border border-[#0A1B2D] px-4"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <Image
                src={SearchIcon}
                alt="search"
                width={32}
                height={32}
                className="h-[32px] w-[32px]"
              />
              <input
                type="text"
                placeholder="원하는 작품을 입력해보세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-none bg-transparent text-[#0A1B2D] placeholder:text-gray-300 focus:outline-none"
                style={{ fontFamily: 'PretendardSemiBold' }}
              />
            </div>
          </div>

          <div className="relative ml-4 inline-block">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FAFAFA] px-1 text-xs font-bold text-[#0A1B2D]">
              정렬
            </span>

            {/* 정렬 버튼 */}
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1 rounded-full border-1 border-[#0A1B2D] bg-[#F5F5F5] px-4 py-2 font-bold text-[#0A1B2D]"
            >
              {sort === 'latest' ? '최신순' : '좋아요순'}
              <svg className="h-3 w-3 fill-[#0A1B2D]" viewBox="0 0 20 20">
                <path d="M5 7l5 6 5-6H5z" />
              </svg>
            </button>

            {/* 정렬 옵션 드롭다운 */}
            {isSortOpen && (
              <div className="ring-opacity-5 absolute right-0 z-50 mt-1 w-32 rounded-md bg-white shadow-lg ring-1 ring-black">
                <ul className="py-1 text-sm text-[#0A1B2D]">
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSort('latest');
                      setIsSortOpen(false);
                    }}
                  >
                    최신순
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSort('likes');
                      setIsSortOpen(false);
                    }}
                  >
                    좋아요순
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 카드 리스트 */}
      {portfolios.length === 0 ? (
        <p className="text-center text-gray-500">등록된 포트폴리오가 없습니다.</p>
      ) : (
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-x-[8px] gap-y-[4px] sm:gap-x-[16px] md:grid-cols-3 md:gap-x-[80px] md:gap-y-[40px] lg:grid-cols-4">
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
      <div className="mb-10" />
    </div>
  );
}
