import { create } from 'zustand';
import type { User } from '../types';

interface UserState {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const userStore = create<UserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
