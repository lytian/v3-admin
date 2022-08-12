import { computed, unref, ref } from 'vue';

import { TriggerEnum } from '@/enums/menuEnum';

import { useLayout } from '../useLayout';
import { useAppStore } from '@/store/modules/app';

/**
 * 处理菜单事件的相关操作
 */
export function useSiderEvent() {
  const brokenRef = ref(false);

  const { getMenuMinWidth } = useLayout();

  const getCollapsedWidth = computed(() => {
    return unref(brokenRef) ? 0 : unref(getMenuMinWidth);
  });

  function onBreakpointChange(broken: boolean) {
    brokenRef.value = broken;
  }

  return { getCollapsedWidth, onBreakpointChange };
}

/**
 * 处理菜单折叠的相关操作
 */
export function useTrigger(isMobile: Boolean) {
  const appStore = useAppStore();
  const getTrigger = computed(() => appStore.getMenuSetting.trigger);
  const getSplit = computed(() => appStore.getMenuSetting.split);

  const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger);

    return (
      trigger !== TriggerEnum.NONE &&
      !isMobile &&
      (trigger === TriggerEnum.FOOTER || unref(getSplit))
    );
  });

  const getTriggerAttr = computed(() => {
    if (unref(getShowTrigger)) {
      return {};
    }
    return {
      trigger: null,
    };
  });

  return { getTriggerAttr, getShowTrigger };
}
