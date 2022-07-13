import 'uno.css';
import '@/style/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { store, initAppConfigStore } from '@/store';

import { setupI18n } from '@/locales/setupI18n';

// 本地开发时，全量引入Ant样式，提升浏览器刷新速度
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function main() {
  const app = createApp(App);
  app.use(router).use(store);

  await setupI18n(app);
  initAppConfigStore();

  app.mount('#app');
}

main();
