import type { AppRouteRecordRaw } from '#/vue-router';
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
        icon: 'appstore-outlined',
        title: '首页',
      },
    },
  ],
};

export default dashboard;
