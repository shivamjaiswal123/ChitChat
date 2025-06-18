import { create } from 'zustand';
import type { ContentProps } from '../types';

interface SocketState {
  content: ContentProps[];
  onlineUsers: string[];
  setContent: (message: ContentProps) => void;
  setOnlineUsers: (userIds: string[]) => void;
}

export const socketStore = create<SocketState>((set) => ({
  content: [],
  onlineUsers: [] as string[],
  setContent: (cnt) => set((state) => ({ content: [...state.content, cnt] })),
  setOnlineUsers: (userIds: string[]) => set({ onlineUsers: userIds }),
}));
