import type { App } from 'vue';
import { ProjectConfig } from '#/config';

import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useLocaleStore } from './modules/locale';

import { Persistent, PREFIX_KEY, PROJ_CFG_KEY } from '@/utils/cache';
import projectSetting from '@/settings/projectSetting';
import { deepMerge } from '@/utils';
import { ThemeEnum } from '@/enums/appEnum';

import { changeThemeColor } from '@/settings/theme';
import { updateGrayMode } from '@/settings/theme/updateGrayMode';
import { updateColorWeak } from '@/settings/theme/updateColorWeak';
import { updateHeaderBgColor, updateSidebarBgColor } from '@/settings/theme/updateBackground';
import { updateDarkTheme } from '@/settings/theme/dark';
import { primaryColor } from '../../build/config/themeConfig';

export const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

// 初始化项目配置
export function initAppConfigStore() {
  const appStore = useAppStore();
  const localeStore = useLocaleStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  const darkMode = appStore.getDarkMode;
  const {
    colorWeak,
    grayMode,
    themeColor,

    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {},
  } = projCfg;

  try {
    if (themeColor && themeColor !== primaryColor) {
      changeThemeColor(themeColor);
    }

    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  appStore.setProjectConfig(projCfg);

  // 初始化主题
  updateDarkTheme(darkMode);
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }
  // 初始化多语言
  localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 20);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && !key.startsWith(PREFIX_KEY)) {
        item.removeItem(key);
      }
    });
  });
}
