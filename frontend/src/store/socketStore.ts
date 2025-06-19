import { create } from 'zustand';
import type { ChatHistoryProps, ContentProps } from '../types';

interface SocketState {
  content: ContentProps[];
  onlineUsers: string[];
  setContent: (message: ContentProps) => void;
  setOnlineUsers: (userIds: string[]) => void;
  setChatHistory: (messages: ChatHistoryProps[]) => void;
}

export const socketStore = create<SocketState>((set) => ({
  content: [],
  onlineUsers: [] as string[],
  setContent: (cnt) => set((state) => ({ content: [...state.content, cnt] })),
  setOnlineUsers: (userIds: string[]) => set({ onlineUsers: userIds }),
  setChatHistory: (messages) => set(() => ({ content: messages })),
}));
