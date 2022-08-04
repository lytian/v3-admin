import { computed, unref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useFullContent } from './useFullContent';
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';

export function useLayout() {
  const { getFullContent } = useFullContent();
  const appStore = useAppStore();

  // 显示撑满的的Header
  const getShowFullHeaderRef = computed(() => {
    return (
      !unref(getFullContent) &&
      appStore.getHeaderSetting.show &&
      appStore.getMenuSetting.type === MenuTypeEnum.MIX
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
  const getShowBreadBreadCrumb = computed(() => {
    return (
      appStore.getMenuSetting.mode !== MenuModeEnum.HORIZONTAL &&
      appStore.getProjectConfig.showBreadCrumb &&
      !appStore.getMenuSetting.split
    );
  });

  return {
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getShowBreadBreadCrumb,
  };
}
