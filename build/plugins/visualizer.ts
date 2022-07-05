/**
 * Package file volume analysis
 * https://github.com/btd/rollup-plugin-visualizer
 */
import type { Plugin } from 'vite';
import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../utils';

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
}
