import { computed, ref, unref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useFullContent } from './useFullContent';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '@/enums/menuEnum';
import { HeaderSetting, MenuSetting } from '#/config';
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/enums/appEnum';

const mixSideHasChildren = ref(false);

export function useLayout() {
  const { getFullContent } = useFullContent();
  const appStore = useAppStore();

  // 显示撑满的的Header
  const getShowFullHeaderRef = computed(() => {
    return (
      appStore.getHeaderSetting.show &&
      appStore.getMenuSetting.type === MenuTypeEnum.MIX &&
      !unref(getFullContent)
    );
  });

  // 显示非撑满的Header
  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && appStore.getHeaderSetting.show;
    return (
      need &&
      (appStore.getMenuSetting.type === MenuTypeEnum.SIDEBAR ||
        appStore.getMenuSetting.type === MenuTypeEnum.TOP_MENU ||
        appStore.getMenuSetting.type === MenuTypeEnum.MIX_SIDEBAR)
    );
  });

  // 显示面包屑
  const getShowBreadCrumb = computed(() => {
    return (
      appStore.getProjectConfig.showBreadCrumb &&
      appStore.getMenuSetting.mode !== MenuModeEnum.HORIZONTAL &&
      !appStore.getMenuSetting.split
    );
  });

  // 显示Header的Logo
  const getShowHeaderLogo = computed(() => {
    return (
      appStore.getProjectConfig.showLogo &&
      appStore.getMenuSetting.type !== MenuTypeEnum.SIDEBAR &&
      appStore.getMenuSetting.type !== MenuTypeEnum.MIX_SIDEBAR
    );
  });

  // 显示Header的Trigger
  const getShowHeaderTrigger = computed(() => {
    if (
      !appStore.getMenuSetting.show ||
      appStore.getMenuSetting.type === MenuTypeEnum.TOP_MENU ||
      appStore.getMenuSetting.hidden
    ) {
      return false;
    }

    return appStore.getMenuSetting.trigger === TriggerEnum.HEADER;
  });

  // 显示侧边栏菜单
  const getShowSidebar = computed(() => {
    return (
      appStore.getMenuSetting.split ||
      (appStore.getMenuSetting.show &&
        appStore.getMenuSetting.mode !== MenuModeEnum.HORIZONTAL &&
        !unref(getFullContent))
    );
  });

  // 显示顶部菜单
  const getShowTopMenu = computed(() => {
    return (
      appStore.getMenuSetting.mode === MenuModeEnum.HORIZONTAL || appStore.getMenuSetting.split
    );
  });

  // 左侧菜单宽度
  const getMenuRealWidth = computed(() => {
    if (appStore.getMenuSetting.type === MenuTypeEnum.MIX_SIDEBAR) {
      return appStore.getMenuSetting.collapsed && !appStore.getMenuSetting.mixSideFixed
        ? unref(getMenuMinWidth)
        : appStore.getMenuSetting.menuWidth;
    }
    return appStore.getMenuSetting.collapsed
      ? unref(getMenuMinWidth)
      : appStore.getMenuSetting.menuWidth;
  });

  // 左侧菜单最小宽度
  const getMenuMinWidth = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting;
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
  });

  // 内容宽度
  const getCalcContentWidth = computed(() => {
    const width =
      appStore.getMenuSetting.type === MenuTypeEnum.TOP_MENU ||
      !appStore.getMenuSetting.show ||
      (appStore.getMenuSetting.split && appStore.getMenuSetting.hidden)
        ? 0
        : appStore.getMenuSetting.type === MenuTypeEnum.MIX_SIDEBAR
        ? (appStore.getMenuSetting.collapsed ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (appStore.getMenuSetting.mixSideFixed && unref(mixSideHasChildren)
            ? unref(getMenuRealWidth)
            : 0)
        : unref(getMenuRealWidth);

    return `calc(100% - ${unref(width)}px)`;
  });

  // 设置Header配置
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting });
  }

  // 设置Setting配置
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  return {
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getShowBreadCrumb,
    getShowHeaderLogo,
    getShowHeaderTrigger,
    getShowSidebar,
    getShowTopMenu,
    getMenuRealWidth,
    getMenuMinWidth,
    getCalcContentWidth,

    setHeaderSetting,
    setMenuSetting,
  };
}
