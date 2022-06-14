import { MixSideStatus, SiderStatus, ThemeMode } from '@/utils/storage';
import { AppDeviceEnum, ThemeModeEnum } from '@/enums/appEnum';

interface AppState {
  // 系统主题
  themeMode?: ThemeModeEnum;
  // 页面切换加载中
  pageLoading: boolean;
  // 侧边栏是否收起
  siderCollapsed: boolean;
  // 混合侧边栏是否固定
  mixSideFixed: boolean;
  device: AppDeviceEnum;
}

const state: AppState = {
  themeMode: undefined,
  pageLoading: false,
  siderCollapsed: SiderStatus.get(),
  mixSideFixed: MixSideStatus.get(),
  device: AppDeviceEnum.DESKTOP,
};

const getters = {
  themeMode(state: AppState): ThemeModeEnum {
    return state.themeMode || ThemeMode.get() || ThemeModeEnum.LIGHT;
  },
  pageLoading(state: AppState): boolean {
    return state.pageLoading;
  },
  siderCollapsed(state: AppState): boolean {
    return state.siderCollapsed;
  },
  mixSideFixed(state: AppState): boolean {
    return state.mixSideFixed;
  },
  isMobile(state: AppState): boolean {
    return state.device == AppDeviceEnum.MODILE;
  },
};

const mutations = {
  setThemeMode: (state: AppState, mode: ThemeModeEnum) => {
    state.themeMode = mode;
    ThemeMode.set(mode);
  },
  toggleSidebar: (state: AppState) => {
    state.siderCollapsed = !state.siderCollapsed;
    if (state.siderCollapsed) {
      SiderStatus.set(1);
    } else {
      SiderStatus.set(0);
    }
  },
  setMixSideFixed: (state, fixed: boolean) => {
    state.mixSideFixed = fixed;
    if (state.mixSideFixed) {
      MixSideStatus.set(1);
    } else {
      MixSideStatus.set(0);
    }
  },
  toggleDevice: (state, device: AppDeviceEnum) => {
    state.device = device;
  },
  setPageLoading: (state, loading: boolean) => {
    state.pageLoading = loading;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
