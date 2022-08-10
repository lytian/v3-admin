import type { HeaderSetting, MenuSetting, ProjectConfig } from '#/config';
import type { BeforeMiniState, LockScreenInfo } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { ThemeEnum } from '@/enums/appEnum';
import { Persistent, APP_THEME_MODE_KEY, PROJ_CFG_KEY, LOCK_INFO_KEY } from '@/utils/cache';
import { deepMerge } from '@/utils';
import { darkMode } from '@/settings/designSetting';
import { resetRouter } from '@/router';

interface AppState {
  // 暗黑模式
  darkMode?: ThemeEnum;
  // 页面加载loading
  pageLoading: boolean;
  // 是否移动端
  isMobile: Boolean;
  // 锁屏信息
  lockInfo: Nullable<LockScreenInfo>;
  // 项目配置
  projectConfig: Nullable<ProjectConfig>;
  // 窗口最小化之前的状态
  beforeMiniInfo: BeforeMiniState;
}

let timeId: TimeoutHandle;

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    isMobile: false,
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
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

    getIsMobile(): Boolean {
      return this.isMobile;
    },

    getLockInfo(): Nullable<LockScreenInfo> {
      return this.lockInfo;
    },

    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
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

    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },

    setLockInfo(info: LockScreenInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info);
      Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo, true);
    },
    resetLockInfo() {
      Persistent.removeLocal(LOCK_INFO_KEY, true);
      this.lockInfo = null;
    },

    unLock(password?: string) {
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      return false;
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
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

export function useAppStoreWithOut() {
  return useAppStore(store);
}
