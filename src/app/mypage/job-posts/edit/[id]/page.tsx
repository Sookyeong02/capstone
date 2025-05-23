'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Job } from '@/types/Jobs';
import { getJobDetail } from '@/api/job';
import EditJobForm from '@/components/jobs/EditJobForm';

export default function EditJobPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof id === 'string') {
      getJobDetail(id)
        .then(setJob)
        .catch(() => setError('채용공고 정보를 불러오지 못했습니다.'));
    }
  }, [id]);

  if (error) return <p className="mt-6 text-center text-gray-500">{error}</p>;
  if (!job) return null;

  return (
    <div>
      <EditJobForm job={job} />
    </div>
  );
}
