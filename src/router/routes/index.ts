import type { AppRouteRecordRaw } from '../types';
import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME, LAYOUT } from '@/router/constant';
import { PageEnum } from '@/enums/appEnum';

const modules = import.meta.glob('./modules/**/*.ts', {
  import: 'default',
  eager: true,
});

const routeModuleList: AppRouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/index.vue'),
  meta: {
    title: '登录',
  },
};

// 404 on a page
export const NotFoundRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      // component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/Redirect.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
        hideMenu: true,
        hideTab: true,
      },
    },
  ],
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  RedirectRoute,
  NotFoundRoute,
  ...routeModuleList,
];

export const asyncRoutes = [NotFoundRoute, ...routeModuleList];
