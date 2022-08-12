import type { AppRouteRecordRaw } from '@/router/types';
import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteRecordRaw = {
  path: '/',
  component: LAYOUT,
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        affix: true,
        title: '首页',
      },
    },
  ],
  name: 'Dashboard',
  meta: {
    title: 'Dashboard',
    icon: 'appstore-outlined',
  },
};

export default dashboard;
