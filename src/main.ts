import 'uno.css';
import '@/style/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}
const app = createApp(App);
app.use(router).use(store);
app.mount('#app');
