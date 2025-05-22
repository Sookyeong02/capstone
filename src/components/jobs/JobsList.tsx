'use client';

import { useState } from 'react';
import { JobCard } from '../../components/jobs/JobCard';
import { Job } from '@/types/Jobs';

interface JobsListProps {
  jobs?: Job[];
}

const categories = [
  { label: '전체', value: 'all' },
  { label: 'Design', value: 'design' },
  { label: 'Develop', value: 'develop' },
  { label: 'Video', value: 'video' },
  { label: 'Music', value: 'music' },
];

export default function JobsList({ jobs }: JobsListProps) {
  const [selected, setSelected] = useState<string>('all');

  const filtered = jobs
    ? selected === 'all'
      ? jobs
      : jobs.filter((job) => job.category === selected)
    : [];

  return (
    <div className="w-full">
      <section>
        <h1 className="mb-[24px] text-2xl font-bold md:mb-[40px] md:text-3xl">채용공고</h1>

        <div className="scrollbar-hide mb-[24px] flex gap-[10px] overflow-x-auto whitespace-nowrap md:mb-[40px]">
          {categories.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSelected(value)}
              className={`text-2lg rounded-full border px-[10px] py-[6px] font-bold transition md:px-[32px] md:py-[6px] md:text-xl ${
                selected === value
                  ? 'bg-custom-blue-200 text-white'
                  : 'text-custom-blue-200 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mx-0 grid w-full grid-cols-2 gap-x-[8px] gap-y-[4px] sm:gap-x-[16px] md:grid-cols-3 md:gap-x-[80px] md:gap-y-[40px] lg:grid-cols-4">
          {filtered.slice(0, 12).map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-6 text-center text-gray-500">등록된 채용공고가 없습니다.</p>
        )}
      </section>
    </div>
  );
}
