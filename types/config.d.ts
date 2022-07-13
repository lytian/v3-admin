import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';
import {
  ContentEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '@/enums/appEnum';

export type LocaleType = 'zh-CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  showFullScreen: boolean;
  useLockPage: boolean;
  showNotice: boolean;
  showSearch: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // 当前语言
  locale: LocaleType;
  // 默认语言
  fallback: LocaleType;
  // 可用语言
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  // 是否开启页面切换动画
  enable: boolean;
  // 路由切换动画
  basicTransition: RouterTransitionEnum;
  // 页面loading
  openPageLoading: boolean;
  // 页面加载进度条
  openNProgress: boolean;
}

export interface ProjectConfig {
  // 是否显示项目配置按钮
  showSettingButton: boolean;
  // 是否显示主题模式切换按钮
  showDarkModeToggle: boolean;
  // 项目配置按钮位置
  settingButtonPosition: SettingButtonPositionEnum;
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // 灰色模式
  grayMode: boolean;
  // 色弱模式
  colorWeak: boolean;
  // 主题颜色
  themeColor: string;

  // 内容全屏
  fullContent: boolean;
  // 内容模式
  contentMode: ContentEnum;
  // 是否显示logo
  showLogo: boolean;
  // 是否显示Footer
  showFooter: boolean;
  // header设置
  headerSetting: HeaderSetting;
  // menu设置
  menuSetting: MenuSetting;
  // Multi-tab设置
  multiTabsSetting: MultiTabsSetting;
  // 过渡动画
  transitionSetting: TransitionSetting;
  // 开启KeepAlive
  openKeepAlive: boolean;
  // 锁屏时间
  lockTime: number;
  // 是否显示面包屑
  showBreadCrumb: boolean;
  // 是否显示面包屑图标
  showBreadCrumbIcon: boolean;
  // 是否显示返回顶部
  useOpenBackTop: boolean;
  // 是否可以嵌入Iframe
  canEmbedIFramePage: boolean;
  // 切换页面时，是否删除未关闭的消息并通知
  closeMessageOnSwitch: boolean;
  // 切换页面时，是否关闭未响应的网络请求
  removeAllHttpPending: boolean;
}
