'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/types/Jobs';
import { fetchMyJobs } from '@/api/job';
import { JobCard } from '../jobs/JobCard';

export default function MyJobList() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetchMyJobs();
        setJobs(res);
      } catch {
        const message = '채용공고를 불러오는 데 실패했습니다.';
        setError(message);
        alert(message);
        setJobs([]);
      }
    };

    loadJobs();
  }, []);

  if (error) {
    return null;
  }

  if (jobs === null) {
    return <p className="mt-6 text-center text-gray-500">불러오는 중</p>;
  }

  if (jobs.length === 0) {
    return <p className="mt-6 text-center text-gray-500">등록된 채용공고가 없습니다.</p>;
  }
  return (
    <div>
      <p className="mb-[24px] text-xl font-bold">내 채용 공고</p>
      <div className="grid grid-cols-1 gap-x-[50px] gap-y-[4px] sm:grid-cols-2 md:gap-y-[40px] lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
