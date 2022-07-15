import type { ProjectConfig } from '#/config';
import type { BeforeMiniState } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { ThemeEnum } from '@/enums/appEnum';
import { Persistent, APP_THEME_MODE_KEY, PROJ_CFG_KEY } from '@/utils/cache';
import { deepMerge } from '@/utils';
import { addClass, hasClass, removeClass } from '@/utils/dom';
import { getThemeColors, generateColors } from '../../../build/config/themeConfig';
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils';
import {
  darkCssIsReady,
  loadDarkThemeCss,
  replaceStyleVariables,
} from 'vite-plugin-theme/es/client';

export const darkMode = ThemeEnum.LIGHT;

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

// 更换深色模式
export async function changeDarkMode(mode: string | null = 'light') {
  const htmlRoot = document.documentElement;
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      await loadDarkThemeCss();
    }
    htmlRoot.setAttribute('data-theme', 'dark');
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}

// 修改主题颜色
export async function changeThemeColor(color: string) {
  const colors = generateColors({
    color: color,
    mixDarken,
    mixLighten,
    tinycolor,
  });
  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
}
