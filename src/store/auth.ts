import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

// 공통
interface CommonUser {
  id: string;
  email: string;
  role: "personal" | "company" | "admin";
  provider: "local" | "google" | "kakao";
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// 개인
interface PersonalUser extends CommonUser {
  role: "personal";
  name: string;
  nickname: string;
}

// 기업
interface CompanyUser extends CommonUser {
  role: "company";
  companyName: string;
}

// 관리자
interface AdminUser extends CommonUser {
  role: "admin";
}

// Zustand에 저장될 사용자 타입
export type AuthUser = PersonalUser | CompanyUser | AdminUser;

// Zustand 상태 타입
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  login: (user: AuthUser, token: string, refreshToken: string) => void;
  logout: () => void;
}

// Zustand Store 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      login: (user, token, refreshToken) =>
        set({ user, token, refreshToken, isAuthenticated: true }),

      logout: () =>
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);