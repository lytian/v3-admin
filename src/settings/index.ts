import type { GlobConfig } from '#/config';

import { changeThemeMode } from './modules/themeSetting';
import { useAppStore } from '@/store/modules/app';
import { warn } from '@/utils/log';

// Env全局配置
export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_APP_TITLE,
    VITE_APP_SHORT_NAME,
    VITE_APP_API_URL,
    VITE_APP_UPLOAD_URL,
    VITE_APP_FILE_PREFIX,
  } = import.meta.env;

  if (!/[a-zA-Z\_]*/.test(VITE_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_APP_TITLE,
    shortName: VITE_APP_SHORT_NAME,
    apiUrl: VITE_APP_API_URL,
    uploadUrl: VITE_APP_UPLOAD_URL,
    filePrefix: VITE_APP_FILE_PREFIX,
  };
  return glob as Readonly<GlobConfig>;
};

// 初始化项目配置
export function initAppConfigStore() {
  const appStore = useAppStore();
  const themeMode = appStore.getThemeMode;

  // init dark mode
  changeThemeMode(themeMode);
}
