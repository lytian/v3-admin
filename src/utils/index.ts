import type { App, Plugin } from 'vue';

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
