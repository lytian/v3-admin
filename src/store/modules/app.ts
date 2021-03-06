import type { ProjectConfig } from '#/config';
import type { BeforeMiniState } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { ThemeEnum } from '@/enums/appEnum';
import { Persistent, APP_THEME_MODE_KEY, PROJ_CFG_KEY } from '@/utils/cache';
import { deepMerge } from '@/utils';
import { darkMode } from '@/settings/designSetting';

interface AppState {
  darkMode?: ThemeEnum;
  // 页面加载loading
  pageLoading: boolean;
  // 项目配置
  projectConfig: ProjectConfig | null;
  // 窗口最小化之前的状态
  beforeMiniInfo: BeforeMiniState;
}

let timeId: TimeoutHandle;

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_THEME_MODE_KEY) || darkMode;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_THEME_MODE_KEY, mode);
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
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
