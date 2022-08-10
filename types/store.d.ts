// 锁屏信息
export interface LockScreenInfo {
  // 锁屏密码
  pwd?: string | undefined;
  // 是否已锁
  isLock?: boolean;
}

export interface UserInfo {
  id: number;

  account: string;

  nickName: string;

  avatar?: string;
}

// 菜单
export interface Menu {
  id: number;

  // 父级ID(顶层ID为0)
  pid: number;

  // 菜单名称
  name: string;

  // 图标
  icon?: string;

  // 路由地址（可带参，比如：/test/:id）
  path: string;

  // 子菜单集
  children?: Menu[];

  // 排序
  sortNum?: number;

  // 菜单标签
  tag?: MenuTag;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
