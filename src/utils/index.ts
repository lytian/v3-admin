import type { App, Plugin } from 'vue';
import { isObject } from './is';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * 同path.basename
 */
export function basename(str: string) {
  let idx = str.lastIndexOf('/');
  idx = idx > -1 ? idx : str.lastIndexOf('\\');
  if (idx < 0) {
    return str;
  }
  return str.substring(idx + 1);
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}
