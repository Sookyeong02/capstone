import { Job } from "@/types/Jobs";
import { LinkData } from "@/utils/LinkData";
import Image from "next/image";
import Link from "next/link";
import ThumbnailImg from "../../../public/images/thumbnail.png";
import Clock from "../../../public/icons/clock.svg";
import { format } from 'date-fns';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const startHttp = LinkData(job.link)
  return (
    <Link
      href={`${startHttp ? job.link : `https://${job.link}`}`}
      target="_blank"
    >
      <div>
        {job.thumbnail && (
          <Image
            src={job.thumbnail || ThumbnailImg}
            alt="채용공고 썸네일"
            width={250}
            height={200}
          />
        )}
      </div>
      <div>
        <p>{job.title}</p>
        <p>{job.experience || '경력 무관'} / {job.location}</p>
        <div>
          <Image width={24} height={24} src={Clock} alt="마감일" />
          <span>
            {job.deadline
              ? format(new Date(job.deadline), 'yyyy.MM.dd') : '채용시 마감'}
          </span>
        </div>
      </div>
    </Link>
  )
}