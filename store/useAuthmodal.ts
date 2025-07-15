
import { create } from 'zustand';

type OpenState = {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openSignup: () => void;
  closeSignup: () => void;
};

const useModalStore = create<OpenState>((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,

  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),

  openSignup: () => set({ isSignupOpen: true }),
  closeSignup: () => set({ isSignupOpen: false }),
}));

export  {useModalStore};
