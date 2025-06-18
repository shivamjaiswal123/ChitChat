import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  currUser: User | null;
  setCurrUser: (currUser: User | null) => void;
}

export const authStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  currUser: null,
  setCurrUser: (user) => set({ currUser: user, isAuthenticated: !!user }),
}));
