import type { ProjectConfig } from '#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';
import {
  ContentEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! 更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // 是否显示Setting按钮
  showSettingButton: true,

  // 是否显示暗黑模式切换
  showDarkModeToggle: true,

  // Setting按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 主题颜色
  themeColor: primaryColor,

  // 灰色模式
  grayMode: false,

  // 色弱模式
  colorWeak: false,

  // 是否取消菜单、顶部、多选项卡页面显示，以便可能嵌入其他系统
  fullContent: false,

  // 内容模式
  contentMode: ContentEnum.FULL,

  // 是否显示logo
  showLogo: true,

  // 是否显示footer
  showFooter: false,

  // Header配置
  headerSetting: {
    // header背景颜色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 固定在顶部
    fixed: true,
    // 是否显示在顶部
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
    // 是否启用锁定屏幕功能
    useLockPage: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示通知按钮
    showNotice: true,
    // 是否显示菜单搜索
    showSearch: true,
  },

  // Menu配置
  menuSetting: {
    // 侧边栏菜单颜色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    // 是否固定在左侧
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 是否显示
    show: true,
    // 是否隐藏左侧菜单
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 菜单折叠按钮位置
    trigger: TriggerEnum.HEADER,
    // 手风琴模式
    accordion: true,
    // 切换页面时关闭菜单
    closeMixSidebarOnChange: false,
    // 混合菜单触发方式 ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 固定扩展菜单
    mixSideFixed: false,
  },

  // Multi-label
  multiTabsSetting: {
    // 是否保存打开的Tabs，保存在localStorage中
    cache: false,
    // 是否显示
    show: true,
    // 是否可以拖放排序选项卡
    canDrag: true,
    // 是否显示快捷按钮
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true,
  },

  // Transition设置
  transitionSetting: {
    // 是否打开页面切换动画
    // 禁用状态还将禁用pageLoadinng
    enable: true,

    // Route切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // 是否打开页面切换加载
    // 仅当enable=true
    openPageLoading: true,

    // 是否打开顶部进度条
    openNProgress: false,
  },

  // 是否启用KeepAlive缓存最好在开发期间关闭，否则每次都需要清除缓存
  openKeepAlive: true,

  // 自动屏幕锁定时间，0不锁定屏幕。单位：分钟默认值：0
  lockTime: 0,

  // 是否显示面包屑
  showBreadCrumb: true,

  // 是否显示面包屑图标
  showBreadCrumbIcon: false,

  // 是否显示返回顶部按钮
  useOpenBackTop: true,

  // 是否可以嵌入iframe页面
  canEmbedIFramePage: true,

  // 切换界面时是否删除未关闭的消息并通知
  closeMessageOnSwitch: true,

  // 切换接口时是否取消已发送但未响应的http请求
  // 如果想单个接口启用，可以在单独的页面中设置
  removeAllHttpPending: false,
};

export default setting;
