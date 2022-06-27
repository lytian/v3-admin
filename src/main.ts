import { createApp } from 'vue';
import App from './App.vue';
import { Button, Input } from 'ant-design-vue';
import router from '@/router';
import store from '@/store';

import 'uno.css';
import 'animate.css';
import './style/index.less';
import 'ant-design-vue/dist/antd.less';

const app = createApp(App);
app.use(router).use(store);
app.use(Input).use(Button);
app.mount('#app');
