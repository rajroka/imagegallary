// store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: any | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: any, token: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) =>
        set(() => ({
          user,
          token,
          isLoggedIn: true,
        })),

      logout: () =>
        set(() => ({
          user: null,
          token: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: 'auth-storage', // Key in localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export  {useAuthStore};
