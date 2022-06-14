import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';
import { setupRouterGuard } from './guard';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
basicRoutes.forEach((item) => {
  WHITE_NAME_LIST.push(item.name as string);
});

const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as RouteRecordRaw[],
});
setupRouterGuard(router);

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
