export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 标题
    title: string;
    // 图标
    icon?: string;
    // 是否忽略权限验证
    ignoreAuth?: boolean;
    // 是否忽略缓存
    ignoreKeepAlive?: boolean;
    // 固定在tab，不可关闭
    affix?: boolean;
    // 不在Tab中显示
    hideTab?: boolean;
    // 不在menu中显示
    hideMenu?: boolean;
    // 不在面包屑中显示
    hideBreadcrumb?: boolean;
    // 隐藏子菜单
    hideChildrenInMenu?: boolean;
    // 当前激活的菜单
    currentActiveMenu?: string;
    // 内嵌iframe地址
    frameSrc?: string;
  }

  interface AppRouteRecordRaw extends RouteLocationNormalized {
    meta: RouteMeta;
    children?: AppRouteRecordRaw[];
  }
}
