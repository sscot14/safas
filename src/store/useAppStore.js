import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(persist((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}), { name: 'app-storage' }))