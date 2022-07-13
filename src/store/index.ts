import { createPinia } from 'pinia';
import { useAppStore, changeDarkMode } from './modules/app';
import { useLocaleStore } from './modules/locale';

export const store = createPinia();

// 初始化项目配置
export function initAppConfigStore() {
  const appStore = useAppStore();
  const localeStore = useLocaleStore();

  const darkMode = appStore.getDarkMode;

  // init theme mode
  changeDarkMode(darkMode);
  // init locale
  localeStore.initLocale();
}
