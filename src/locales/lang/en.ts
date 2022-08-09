import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';
// import 'dayjs/locale/en';

const modules = import.meta.glob('./en/**/*.ts', {
  import: 'default',
  eager: true,
}) as Record<string, Record<string, any>>;
export default {
  message: {
    ...genMessage(modules, 'en'),
    antdLocale,
  },
  dayjsLocaleName: 'en',
};
