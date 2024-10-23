import { create } from 'zustand';

interface SidebarStore {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  toggle: (bool: boolean) => void;
}

export const useSidebar = create<SidebarStore>()((set) => ({
  isOpen: true,
  // eslint-disable-next-line no-unused-vars
  toggle: (bool: boolean) => set((state) => ({ isOpen: bool })),
}));

export const useSidebarPreference = () => {
  let storage: Storage;
  if (typeof window !== 'undefined') {
    storage = localStorage;
  }
  //! Hardcoded for now to be open by default
  const key = 'sidebar';
  const get = () => {
    // const value = storage.getItem(key);
    return true;
  };
  const set = (value: string) => storage.setItem(key, value);
  return { get, set };
};
