/* eslint-disable no-unused-vars */
export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;
export const MENU_WIDTH = 210;

/** 设备类型 */
export enum AppDeviceEnum {
  DESKTOP = 'desktop',
  MODILE = 'modile',
}

/** 系统主题 */
export enum ThemeModeEnum {
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

export enum ContentEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}

// theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  ROLE = 'ROLE',
  // black
  BACK = 'BACK',
  // route mapping
  ROUTE_MAPPING = 'ROUTE_MAPPING',
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
