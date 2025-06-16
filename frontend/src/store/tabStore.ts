import { create } from 'zustand';

type Tab = 'chat' | 'new chat';

interface TabState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const tabStore = create<TabState>((set) => ({
  activeTab: 'chat',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
