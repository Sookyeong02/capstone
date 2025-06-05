'use client';

import Image from 'next/image';
import { Button } from '../ui/Button';
import { sendHireByUserId } from '@/api/hire';

type Props = {
  userId: string;
  user: {
    nickname: string;
    profileImageUrl?: string;
    introduction?: string;
    jobField?: string;
    personalWebsite?: string;
    portfoliosCount?: number;
    likesReceived?: number;
    likesGiven?: number;
  };
};

export default function UserSidebar({ userId, user }: Props) {
  const initial = user.nickname[0];

  const handleHireClick = async () => {
    try {
      await sendHireByUserId(userId);
      alert('채용제안 이메일이 전송되었습니다.');
    } catch (err: any) {
      alert(err?.response?.data?.message || '이메일 발송 실패');
    }
  };

  return (
    <aside className="h-full w-[320px] rounded-[5px] border border-gray-400">
      <div className="flex flex-col">
        <div className="mx-[20px] mt-[20px] flex items-center gap-[18px]">
          {user.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gray-200 text-sm text-white">
              {initial}
            </div>
          )}
          <span className="text-2lg font-semibold">{user.nickname}</span>
        </div>

        <div className="mx-[24px]">
          <div className="mt-[20px]">
            <p className="text-lg font-bold">소개</p>
            <p className="text-md font-regular mt-[10px]">
              {user.introduction || '소개가 없습니다.'}
            </p>
          </div>

          <div className="mt-[12px]">
            <p className="text-lg font-bold">작업분야</p>
            <div className="mt-[10px] rounded-[3px] border border-gray-400 p-[5px]">
              <p className="text-md font-semibold">{user.jobField ?? '없음'}</p>
            </div>
          </div>

          <div className="mt-[12px] gap-[10px]">
            <p className="mb-[10px] text-lg font-bold">활동 정보</p>
            <div className="flex justify-between">
              <div className="flex-1">
                <p className="text-md font-bold">{user.portfoliosCount ?? 0}</p>
                <p className="text-md text-gray-500">포트폴리오</p>
              </div>
              <div className="flex-1">
                <p className="text-md font-bold">{user.likesReceived ?? 0}</p>
                <p className="text-md text-gray-500">좋아요 받음</p>
              </div>
              <div className="flex-1">
                <p className="text-md font-bold">{user.likesGiven ?? 0}</p>
                <p className="text-md text-gray-500">내 좋아요</p>
              </div>
            </div>
          </div>

          <div className="mt-[12px]">
            <p className="text-lg font-bold">홈페이지</p>
            <div className="mt-[10px] rounded-[3px] border border-gray-400 p-[5px]">
              <p className="text-md font-semibold">{user.personalWebsite || '없음'}</p>
            </div>
          </div>

          <div className="mt-[20px] mb-[20px] flex justify-center">
            <Button onClick={handleHireClick} size="full" variant="customBlue">
              채용하기
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
