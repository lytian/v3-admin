import { computed, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/modules/app';

/**
 * @description: 全屏显示内容
 */
export const useFullContent = () => {
  const appStore = useAppStore();
  const router = useRouter();
  const { currentRoute } = router;

  // 是否在不显示菜单的情况下全屏显示内容
  const getFullContent = computed(() => {
    // 当url具有__full__参数时，将显示全屏
    const route = unref(currentRoute);
    const query = route.query;
    if (query && Reflect.has(query, '__full__')) {
      return true;
    }
    // 返回项目配置中的fullContent
    return appStore.getProjectConfig.fullContent;
  });

  return { getFullContent };
};
