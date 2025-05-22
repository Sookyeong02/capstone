import { Job } from '@/types/Jobs';
import { LinkData } from '@/utils/LinkData';
import Image from 'next/image';
import Link from 'next/link';
import ThumbnailImg from '../../../public/images/thumbnail.png';
import Clock from '../../../public/icons/clock.svg';
import { format } from 'date-fns';
import { useAuthStore } from '@/store/auth';
import Kebab from './Kebab';

interface JobCardProps {
  job: Job;
}
export function JobCard({ job }: JobCardProps) {
  const startHttp = LinkData(job.link);
  const { user } = useAuthStore();
  const isMine = job.companyId?.toString() === user?.id;

  return (
    <div className="w-[168px] sm:w-[220px] md:w-[320px]">
      <div className="mb-[16px] w-[168px] sm:w-[220px] md:w-[320px]">
        <Link href={startHttp ? job.link : `https://${job.link}`} target="_blank">
          <Image
            src={job.thumbnail && job.thumbnail.trim() !== '' ? job.thumbnail : ThumbnailImg}
            alt="채용공고 썸네일"
            width={320}
            height={250}
            className="h-[168px] w-full rounded-[10px] object-cover sm:h-[220px] md:h-[250px]"
          />
        </Link>
      </div>

      <div>
        <div className="flex items-start justify-between gap-2">
          <Link href={startHttp ? job.link : `https://${job.link}`} target="_blank">
            <p className="text-lg font-bold hover:underline md:text-xl">{job.title}</p>
          </Link>

          {isMine && (
            <Kebab
              jobId={job.id}
              onEdit={() => (window.location.href = `/jobs/edit/${job.id}`)}
              onDelete={() => window.location.reload()}
            />
          )}
        </div>

        <p className="text-md md:text-lg">{job.experience || '경력 무관'}</p>
        <p className="text-md md:text-lg">{job.location}</p>
        <div className="text-md flex items-center gap-1 md:text-lg">
          <Image
            width={24}
            height={24}
            src={Clock}
            alt="마감일"
            className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
          />
          <span>
            {job.isDeadlineFlexible
              ? '채용 시 마감'
              : job.deadline
                ? format(new Date(job.deadline), 'yyyy.MM.dd')
                : '마감일 미정'}
          </span>
        </div>
      </div>
    </div>
  );
}
