import { api } from '@/utils/axios';
import { Notification } from '@/types/notification';

// 전체 알림 조회
export const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await api.get<Notification[]>('/notifications');
  return res.data;
};

// 알림 읽음, 안읽음 처리
export const markNotificationAsRead = async (id: string): Promise<void> => {
  await api.patch(`/notifications/${id}/read`);
};

// 알림 삭제
export const deleteNotification = async (id: string): Promise<void> => {
  await api.delete(`/notifications/${id}`);
};
