import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UploadState {
  imageUrl: string | null;
  setImageUrl: (url: string) => void;
  clearImage: () => void;
}

export const useUploadStore = create<UploadState>()(
    
  persist(
    (set) => ({
      imageUrl: null,
      setImageUrl: (url) => set({ imageUrl: url }),
      clearImage: () => set({ imageUrl: null }),
    }),
    {
      name: 'upload-storage', // 🔐 Key in localStorage
    }
  )
);
