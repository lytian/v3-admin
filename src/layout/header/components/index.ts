import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
import FullScreen from './FullScreen.vue';

export const Notify = createAsyncComponent(() => import('./notify/index.vue'));

export { FullScreen };
