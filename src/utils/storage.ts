import { ThemeModeEnum } from '@/enums/appEnum';

/** BASE_URL转换成系统标志 */
const SystemKey = import.meta.env.VITE_APP_API_URL.toUpperCase()
  .replaceAll('/', '')
  .replaceAll('-', '_');

/** sessionStorage */
const KEY_TOKEN = 'AHF_' + SystemKey + '_TOKEN';
/** localStorage */
const KEY_SIDER = 'AHF_' + SystemKey + '_SIDEBAR';
const KEY_MIX_SIDE = 'AHF_' + SystemKey + '__MIX_SIDE';
const KEY_THEME_MODE = 'AHF_' + SystemKey + '_THEME_MODE';

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

/** 侧边栏状态 */
export const SiderStatus = {
  get(): boolean {
    const k = localStorage.getItem(KEY_SIDER);
    return k ? !!+k : true;
  },
  set(flag: number) {
    localStorage.setItem(KEY_SIDER, flag + '');
  },
  clear() {
    localStorage.removeItem(KEY_SIDER);
  },
};

/** 侧边栏菜单状态 */
export const MixSideStatus = {
  get(): boolean {
    const k = localStorage.getItem(KEY_MIX_SIDE);
    return k ? !!+k : false;
  },
  set(flag: number) {
    localStorage.setItem(KEY_MIX_SIDE, flag + '');
  },
  clear() {
    localStorage.removeItem(KEY_MIX_SIDE);
  },
};

/** 主题状态 */
export const ThemeMode = {
  get(): ThemeModeEnum | undefined {
    return localStorage.getItem(KEY_THEME_MODE) as ThemeModeEnum | undefined;
  },
  set(mode: ThemeModeEnum) {
    localStorage.setItem(KEY_THEME_MODE, mode);
  },
  clear() {
    localStorage.removeItem(KEY_THEME_MODE);
  },
};
