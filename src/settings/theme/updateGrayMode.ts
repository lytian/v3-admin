import { toggleClass } from './util';

/**
 * 修改灰色模式
 * @param gray
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement);
}
