/**
 * 打包文件分析
 * https://github.com/btd/rollup-plugin-visualizer
 */
import type { Plugin } from 'vite';
import visualizer from 'rollup-plugin-visualizer';

export function configVisualizerConfig() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  }) as Plugin;
}
