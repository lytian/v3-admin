import { changeDarkMode } from '@/settings/designSetting';
import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useLocaleStore } from './modules/locale';

export const store = createPinia();

// 初始化项目配置
export function initAppConfigStore() {
  const appStore = useAppStore();
  const localeStore = useLocaleStore();

  const darkMode = appStore.getDarkMode;

  // 初始化主题
  changeDarkMode(darkMode);
  // 初始化多语言
  localeStore.initLocale();
}
