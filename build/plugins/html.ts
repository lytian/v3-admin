/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean): PluginOption {
  const { VITE_APP_TITLE } = env;

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_APP_TITLE,
      },
    },
  });
}
