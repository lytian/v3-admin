import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import svgLoader from 'vite-svg-loader';
import legacy from '@vitejs/plugin-legacy';
import PurgeIcons from 'vite-plugin-purge-icons';
import { isReportMode } from '../utils';
import { configHtmlPlugin } from './html';
import { configVisualizerConfig } from './visualizer';
import { configThemePlugin } from './theme';
import { configStyleImportPlugin } from './styleImport';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY } = viteEnv;

  const vitePlugins: PluginOption = [
    vue(),
    vueJsx(),
    // 原子化CSS
    Unocss(),
    // svg组件化
    svgLoader(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  //vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(PurgeIcons());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // rollup-plugin-visualizer
  isReportMode() && vitePlugins.push(configVisualizerConfig());

  return vitePlugins;
}
