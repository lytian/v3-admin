import type { ProjectConfig } from '#/config';
import type { UserInfo } from '#/store';

import { Memory } from './memory';
import { pick } from 'lodash-es';
import { toRaw } from 'vue';
import { WebStorage } from './storage';

export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !import.meta.env.DEV;

export const PREFIX_KEY = (import.meta.env.VITE_APP_SHORT_NAME + '__')
  .replaceAll('-', '_')
  .toUpperCase();

// token key
export const TOKEN_KEY = 'TOKEN__';

export const LOCALE_KEY = 'LOCALE__';

// user info key
export const USER_INFO_KEY = 'USER__INFO__';

// project config key
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__';

export const APP_THEME_MODE_KEY = '__APP__THEME__MODE__';

// base global local key
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__';

// base global session key
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__';

export interface BasicStorage {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
}
export type BasicKeys = keyof BasicStorage;

export function createLocalStorage() {
  return new WebStorage({
    storage: localStorage,
    prefixKey: PREFIX_KEY,
    hasEncrypt: enableStorageEncryption,
  });
}

export function createSesstionStorage() {
  return new WebStorage({
    storage: sessionStorage,
    prefixKey: PREFIX_KEY,
    hasEncrypt: enableStorageEncryption,
  });
}

const ls = createLocalStorage();
const ss = createSesstionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class Persistent {
  static getLocal<T>(key: BasicKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: BasicKeys, value: BasicStorage[BasicKeys], immediate = false): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static removeLocal(key: BasicKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession<T>(key: BasicKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(key: BasicKeys, value: BasicStorage[BasicKeys], immediate = false): void {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static removeSession(key: BasicKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }
  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
    }
  }
}

window.addEventListener('beforeunload', function () {
  // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY]),
  });
  ss.set(APP_SESSION_CACHE_KEY, {
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY]),
  });
});

function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}
// 多页面storage同步
window.addEventListener('storage', storageChange);

initPersistentMemory();
