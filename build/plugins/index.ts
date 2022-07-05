import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import svgLoader from 'vite-svg-loader';
import legacy from '@vitejs/plugin-legacy';
import { configHtmlPlugin } from './html';
import { configVisualizerConfig } from './visualizer';
import { configThemePlugin } from './theme';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY } = viteEnv;

  const vitePlugins: PluginOption = [
    vue(),
    // 原子化CSS
    Unocss(),
    // svg组件化
    svgLoader(),
  ];

  //vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  return vitePlugins;
}
