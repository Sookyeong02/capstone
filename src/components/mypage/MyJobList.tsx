'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/types/Jobs';
import { fetchMyJobs } from '@/api/job';
import { JobCard } from '../jobs/JobCard';

export default function MyJobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
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
      }
    };

    loadJobs();
  }, []);

  if (jobs.length === 0 && !error) {
    return <p>등록된 채용공고가 없습니다.</p>;
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
