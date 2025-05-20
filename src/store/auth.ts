import { AuthUser, CompanyUser, PersonalUser } from '@/types/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Zustand 상태 타입
interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;

  setUser: (user: AuthUser | null) => void;
  login: (user: AuthUser) => void;
  logout: () => void;

  updateProfileImage: (imageUrl: string) => void;

  updateUser: (newUser: Partial<AuthUser>) => void;
}

// Zustand Store 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfileImage: (imageUrl: string) =>
        set((state) => ({
          user: state.user ? { ...state.user, profileImageUrl: imageUrl } : null,
          isAuthenticated: state.isAuthenticated,
        })),

      updateUser: (newUser) =>
        set((state) => {
          if (!state.user) return { user: null, isAuthenticated: false };

          const updatedUser =
            state.user.role === 'personal'
              ? { ...(state.user as PersonalUser), ...newUser }
              : { ...(state.user as CompanyUser), ...newUser };

          return {
            user: { ...updatedUser },
            isAuthenticated: state.isAuthenticated,
          } as Partial<AuthState>;
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
