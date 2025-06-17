import { create } from 'zustand';
import type { User } from '../types';

interface UserState {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

export const userStore = create<UserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
