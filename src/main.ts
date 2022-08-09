import 'uno.css';
import '@/style/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore, initAppConfigStore } from '@/store';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';

import { setupI18n } from '@/locales/setupI18n';

// 本地开发时，全量引入Ant样式，提升浏览器刷新速度
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function main() {
  const app = createApp(App);
  // 安装Store
  setupStore(app);
  // 初始化配置
  initAppConfigStore();
  // 多语言配置
  await setupI18n(app);
  // 安装Router
  setupRouter(app);
  // Route守卫
  setupRouterGuard(router);

  app.mount('#app');
}

main();
