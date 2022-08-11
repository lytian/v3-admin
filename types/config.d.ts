import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';
import { ThemeEnum, RouterTransitionEnum, SettingButtonPositionEnum } from '@/enums/appEnum';

export type LocaleType = 'zh-CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface LocaleSetting {
  showPicker: boolean;
  // 当前语言
  locale: LocaleType;
  // 默认语言
  fallback: LocaleType;
  // 可用语言
  availableLocales: LocaleType[];
}

export interface HeaderSetting {
  // 是否显示在顶部
  show: boolean;
  // 主题
  theme: ThemeEnum;
  // header背景颜色
  bgColor: string;
  // 固定在顶部
  fixed: boolean;
}

export interface MenuSetting {
  // 是否显示
  show: boolean;
  // 菜单主题
  theme: ThemeEnum;
  // 侧边栏菜单颜色
  bgColor: string;
  // 是否固定在左侧
  fixed: boolean;
  // 菜单折叠
  collapsed: boolean;
  // 分割菜单
  split: boolean;
  // 菜单模式
  mode: MenuModeEnum;
  // 菜单类型
  type: MenuTypeEnum;
  // 顶部菜单布局
  topMenuAlign: 'start' | 'center' | 'end';
  // 菜单折叠按钮位置
  trigger: TriggerEnum;
  // 切换页面时关闭菜单
  closeMixSidebarOnChange: boolean;
  // 折叠菜单时是否显示菜单名称
  collapsedShowTitle: boolean;
  // 混合菜单触发方式 ‘click’ |'hover'
  mixSideTrigger: MixSidebarTriggerEnum;
  // 固定扩展菜单
  mixSideFixed: boolean;
}

export interface ProjectConfig {
  // 使用__config.json强制覆盖
  force: boolean;
  // 是否显示项目配置按钮
  showSettingButton: boolean;
  // 项目配置按钮位置
  settingButtonPosition: SettingButtonPositionEnum;

  // 主题颜色
  themeColor: string;
  // 灰色模式
  grayMode: boolean;
  // 色弱模式
  colorWeak: boolean;
  // 内容全屏，以便可能嵌入其他系统
  fullContent: boolean;
  // 显示logo
  showLogo: boolean;
  // 显示面包屑
  showBreadCrumb: boolean;
  // 显示footer
  showFooter: boolean;
  // header设置
  headerSetting: HeaderSetting;
  // menu设置
  menuSetting: MenuSetting;
  // 是否显示标签页
  showMutilTab: boolean;
  // 标签风格
  tabType: TabTypeEnum;
  // 页面过渡
  transition: RouterTransitionEnum;
  // 切换页面时，是否删除未关闭的消息并通知
  closeMessageOnSwitch: boolean;
}
