import { defineStore } from 'pinia';
import store from '@/store';

import { ThemeEnum } from '@/enums/appEnum';
import { themeMode } from '@/settings/themeSetting';
import { ThemeMode } from '@/utils/storage';

interface AppState {
  themeMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    themeMode: undefined,
    pageLoading: false,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getThemeMode(): 'light' | 'dark' | string {
      return this.themeMode || ThemeMode.get() || themeMode;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setThemeMode(mode: ThemeEnum): void {
      this.themeMode = mode;
      ThemeMode.set(mode);
    },

    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
