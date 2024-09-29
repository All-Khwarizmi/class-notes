import { create } from 'zustand';

interface SidebarStore {
  isOpen: boolean;
  toggle: (bool: boolean) => void;
}

export const useSidebar = create<SidebarStore>()((set) => ({
  isOpen: true,
  toggle: (bool: boolean) => set((state) => ({ isOpen: bool })),
}));

export const useSidebarPreference = () => {
  let storage: Storage;
  if (typeof window !== 'undefined') {
    storage = localStorage;
  }
  const key = 'sidebar';
  const get = () => {
    const value = storage.getItem(key);
    return value === 'true';
  };
  const set = (value: string) => storage.setItem(key, value);
  return { get, set };
};
