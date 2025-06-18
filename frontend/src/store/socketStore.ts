import { create } from 'zustand';
import type { ContentProps } from '../types';

interface SocketState {
  content: ContentProps[];
  onlineUsers: string[];
  setContent: (message: ContentProps) => void;
  setOnlineUsers: (userId: string) => void;
}

export const socketStore = create<SocketState>((set) => ({
  content: [],
  onlineUsers: [],
  setContent: (cnt) => set((state) => ({ content: [...state.content, cnt] })),
  setOnlineUsers: (userId) =>
    set((state) => ({ onlineUsers: { ...state.onlineUsers, userId } })),
}));
