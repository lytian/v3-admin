import type { LocaleSetting, LocaleType } from '#/config';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { createLocalStorage, LOCALE_KEY } from '@/utils/cache';
import { localeSetting } from '@/settings/localeSetting';

const ls = createLocalStorage();
const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh-CN';
    },
  },
  actions: {
    /**
     * 这只多语言和缓存
     * @param info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      ls.set(LOCALE_KEY, this.localInfo);
    },
    /**
     * 初始化多语言，并加载已存在的缓存
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
