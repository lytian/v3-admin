import { changeThemeMode } from './modules/themeSetting';
import { useAppStore } from '@/store/modules/app';

// 初始化项目配置
export function initAppConfigStore() {
  const appStore = useAppStore();
  const themeMode = appStore.getThemeMode;

  // init dark mode
  changeThemeMode(themeMode);
}
