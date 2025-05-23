'use client';

import { useEffect, useState } from 'react';
import { fetchJobs } from '@/api/job';
import JobsList from '@/components/jobs/JobsList';
import { Job } from '@/types/Jobs';

export default function Jops() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs({ page: 1, limit: 100 })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error('채용공고 불러오기 실패:', err);
      });
  }, []);

  return (
    <div className="mx-auto mt-[70px] w-full max-w-[1600px] px-[40px]">
      <JobsList jobs={jobs} />
    </div>
  );
}
