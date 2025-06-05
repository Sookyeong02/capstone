'use client';

import { useEffect, useState } from 'react';
import { fetchJobs } from '@/api/job';
import JobsList from '@/components/jobs/JobsList';
import { Job } from '@/types/Jobs';

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchJobs({ page: 1, limit: 100 })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error('채용공고 불러오기 실패:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto mt-[70px] w-full max-w-[1600px] px-[40px]">
      <JobsList jobs={jobs} loading={loading} />
    </div>
  );
}
