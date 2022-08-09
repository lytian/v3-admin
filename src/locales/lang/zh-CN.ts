import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';

const modules = import.meta.glob('./zh-CN/**/*.ts', {
  import: 'default',
  eager: true,
}) as Record<string, Record<string, any>>;

export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    ...antdLocale,
  },
  dayjsLocaleName: 'zh-cn',
};
