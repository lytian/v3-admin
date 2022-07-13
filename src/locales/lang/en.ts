import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';
// import 'dayjs/locale/en';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
  },
  antdLocale,
  dayjsLocaleName: 'en',
};
