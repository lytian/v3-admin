/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_SHORT_NAME: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_UPLOAD_URL: string;
  readonly VITE_APP_FILE_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
