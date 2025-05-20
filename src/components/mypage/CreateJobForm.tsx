'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import JobThumbnail from './JobThumbnail';
import Image from 'next/image';
import DownArrow from '../../../public/icons/down-arrow.svg';
import { createJobPosting, uploadJobImage } from '@/api/job';
import AddressModal from '@/components/mypage/AddressModal';
import { Address } from 'react-daum-postcode';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormValues {
  title: string;
  field: string;
  schedule: string;
  location: string;
  description: string;
  link: string;
  thumbnail?: File;
}

export default function CreateJobForm() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [isOpenEnded, setIsOpenEnded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      field: '',
      schedule: '',
      location: '',
      description: '',
      link: '',
    },
  });

  const handleThumbnail = (file: File) => {
    setValue('thumbnail', file);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setUploading(true);

      let thumbnailUrl = '';

      if (data.thumbnail instanceof File) {
        thumbnailUrl = await uploadJobImage(data.thumbnail);
      } // 썸네일 이미지가 있다면 업로드

      // 채용공고 등록
      await createJobPosting({
        title: data.title,
        field: data.field,
        schedule: data.schedule,
        location: data.location,
        description: data.description,
        link: data.link,
        thumbnailUrl,
      });

      alert('채용공고가 등록되었습니다.');
      router.push('/jobs');
    } catch (err) {
      console.error(err);
      alert('등록 실패');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="mb-[24px] flex items-center justify-between">
        <p className="text-xl font-bold">채용공고 등록</p>
        <Button
          variant="customBlue"
          size="medium"
          type="submit"
          disabled={uploading || isSubmitting}
        >
          저장
        </Button>
      </div>

      <div className="mb-[36px]">
        <JobThumbnail onFileSelect={handleThumbnail} />
      </div>

      <div className="flex flex-col gap-[24px]">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="제목"
              className="placeholder:text-lg placeholder:font-bold placeholder:text-gray-400 placeholder:opacity-30"
              {...field}
            />
          )}
        />
        <div className="relative w-full">
          <Controller
            name="field"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`h-[40px] w-full appearance-none rounded border border-gray-400 px-[10px] py-[8px] pr-[40px] text-lg ${field.value === '' ? 'font-bold text-gray-400 opacity-30' : 'text-gray-400'}`}
              >
                <option value="">채용 분야</option>
                <option value="design">Design</option>
                <option value="develop">Develop</option>
                <option value="video">Video</option>
                <option value="music">Music</option>
              </select>
            )}
          />
          <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2">
            <Image src={DownArrow} alt="분야 목록" width={56} height={56} />
          </div>
        </div>

        <Controller
          name="schedule"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-[8px]">
              <DatePicker
                {...field}
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setValue('schedule', date ? date.toISOString().split('T')[0] : '');
                }}
                dateFormat="yyyy.MM.dd"
                placeholderText="채용 일정"
                disabled={isOpenEnded}
                className="w-full rounded border border-gray-400 px-[10px] py-[8px] text-lg text-gray-400 placeholder:font-bold placeholder:opacity-30"
              />
              <label className="text-md flex items-center gap-[8px] font-semibold text-gray-400">
                <input
                  type="checkbox"
                  checked={isOpenEnded}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsOpenEnded(checked);
                    if (checked) {
                      setValue('schedule', '채용 시 마감');
                      setSelectedDate(null);
                    } else {
                      setValue('schedule', '');
                    }
                  }}
                />
                채용 시 마감
              </label>
            </div>
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Input
                placeholder="근무 위치"
                value={field.value}
                readOnly
                onClick={() => setIsAddressModalOpen(true)}
                className="cursor-pointer placeholder:text-lg placeholder:font-bold placeholder:text-gray-400 placeholder:opacity-30"
              />

              {isAddressModalOpen && (
                <AddressModal
                  onClose={() => setIsAddressModalOpen(false)}
                  onComplete={(data: Address) => {
                    setValue('location', data.address);
                  }}
                />
              )}
            </div>
          )}
        />

        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="채용 설명"
                className="border-opacity-30 h-[120px] w-full rounded border border-gray-400 px-[10px] py-[8px] placeholder:text-lg placeholder:font-bold placeholder:text-gray-400 placeholder:opacity-30 focus:outline-none"
              />
            )}
          />
        </div>

        <Controller
          name="link"
          control={control}
          render={({ field }) => (
            <Input
              type="url"
              placeholder="채용 url"
              className="placeholder:text-lg placeholder:font-bold placeholder:text-gray-400 placeholder:opacity-30"
              {...field}
            />
          )}
        />
      </div>
    </form>
  );
}
