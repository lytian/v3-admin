import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import svgLoader from 'vite-svg-loader';
import legacy from '@vitejs/plugin-legacy';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import path from 'path';
import { isReportMode } from '../utils';
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
    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,
      include: path.resolve(__dirname, './src/locales/lang/**'),
    }),
  ];

  //vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // rollup-plugin-visualizer
  isReportMode() && vitePlugins.push(configVisualizerConfig());

  return vitePlugins;
}
