'use client';

import { useEffect, useRef } from 'react';
import { Notification } from '@/types/notification';
import { deleteNotification } from '@/api/notification';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  notifications: Notification[];
  closeModal: () => void;
  onRefresh: () => Promise<void>;
}

export default function NotificationModal({ notifications, closeModal, onRefresh }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      await onRefresh();
    } catch {
      alert('알림 삭제 실패');
    }
  };

  return (
    <div
      ref={modalRef}
      className="absolute top-0 right-0 w-[368px] rounded-[10px] bg-[#f1f5fc] p-4 shadow-xl"
    >
      <h2 className="mb-[16px] text-xl font-bold">알림 {notifications.length}개</h2>
      <div className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <p className="mb-[16px] text-center text-lg text-gray-300">알림이 없습니다.</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="relative h-[102px] rounded-[5px] bg-white p-3 shadow-sm">
              <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-blue-500" />
              <button
                onClick={() => handleDelete(n.id)}
                className="absolute top-3 right-3 text-gray-400"
              >
                ✕
              </button>

              <div className="flex h-full flex-col justify-center gap-1 pr-6 pl-4">
                <p className="text-md text-black">{n.message}</p>
                <p className="text-sm text-gray-300">
                  {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: ko })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
