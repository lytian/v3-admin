import { ThemeEnum } from '@/enums/appEnum';

/** BASE_URL转换成系统标志 */
const SystemKey = import.meta.env.VITE_APP_API_URL.toUpperCase()
  .replaceAll('/', '')
  .replaceAll('-', '_');

/** sessionStorage */
const KEY_TOKEN = 'V3_' + SystemKey + '_TOKEN';
/** localStorage */
const KEY_THEME_MODE = 'V3_' + SystemKey + '_THEME';

/** token */
export const Token = {
  get() {
    return sessionStorage.getItem(KEY_TOKEN);
  },
  set(token: string) {
    sessionStorage.setItem(KEY_TOKEN, token);
  },
  clear() {
    sessionStorage.removeItem(KEY_TOKEN);
  },
};

/** 主题状态 */
export const ThemeMode = {
  get(): ThemeEnum | undefined {
    return localStorage.getItem(KEY_THEME_MODE) as ThemeEnum | undefined;
  },
  set(mode: ThemeEnum) {
    localStorage.setItem(KEY_THEME_MODE, mode);
  },
  clear() {
    localStorage.removeItem(KEY_THEME_MODE);
  },
};
