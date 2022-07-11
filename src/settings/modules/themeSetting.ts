import { ThemeEnum } from '@/enums/appEnum';

import { addClass, hasClass, removeClass } from '@/utils/dom';
import { getThemeColors, generateColors } from '../../../build/config/themeConfig';
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils';
import {
  darkCssIsReady,
  loadDarkThemeCss,
  replaceStyleVariables,
} from 'vite-plugin-theme/es/client';

export const themeMode = ThemeEnum.LIGHT;

/**
 * 更换主题模式
 */
export async function changeThemeMode(mode: string | null = 'light') {
  const htmlRoot = document.documentElement;
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      await loadDarkThemeCss();
    }
    htmlRoot.setAttribute('data-theme', 'dark');
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}

/**
 * 修改主题颜色
 */
export async function changeThemeColor(color: string) {
  const colors = generateColors({
    color: color,
    mixDarken,
    mixLighten,
    tinycolor,
  });
  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
}

// app theme preset color
export const APP_PRESET_COLOR_LIST: string[] = [
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
];

// header preset color
export const HEADER_PRESET_BG_COLOR_LIST: string[] = [
  '#ffffff',
  '#151515',
  '#009688',
  '#5172DC',
  '#018ffb',
  '#409eff',
  '#e74c3c',
  '#24292e',
  '#394664',
  '#001529',
  '#383f45',
];

// sider preset color
export const SIDE_BAR_BG_COLOR_LIST: string[] = [
  '#001529',
  '#212121',
  '#273352',
  '#ffffff',
  '#191b24',
  '#191a23',
  '#304156',
  '#001628',
  '#28333E',
  '#344058',
  '#383f45',
];
