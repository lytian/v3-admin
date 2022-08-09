/* eslint-disable no-unused-vars */
export const SIDE_BAR_WIDTH = 210;
export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

/** 系统主题 */
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

/** 常用路由页面 */
export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard',
}

// 设置按钮位置
export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

// 标签页风格
export enum TabTypeEnum {
  // 卡片
  CARD = 'card',
  // 灵动
  SMART = 'smart',
  // 圆滑
  SMOOTH = 'smooth',
}

//  Route switching animation
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}
