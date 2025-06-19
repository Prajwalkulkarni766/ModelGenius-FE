import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: { _id: string; email: string } | null;
  setUser: (user: { _id: string; email: string } | null) => void;
}

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
    }
  )
);