import type { ProjectConfig } from '#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';
import {
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  TabTypeEnum,
} from '@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! 更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // 使用__config.json强制覆盖
  force: false,

  // 是否显示Setting按钮
  showSettingButton: true,

  // Setting按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // 主题颜色
  themeColor: primaryColor,

  // 灰色模式
  grayMode: false,

  // 色弱模式
  colorWeak: false,

  // 是否取消菜单、顶部、多选项卡页面显示，以便可能嵌入其他系统
  fullContent: false,

  // 显示logo
  showLogo: true,

  // 显示面包屑
  showBreadCrumb: true,

  // Header配置
  headerSetting: {
    // 是否显示在顶部
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
    // header背景颜色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 固定在顶部
    fixed: true,
  },

  // Menu配置
  menuSetting: {
    // 是否显示
    show: true,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 侧边栏菜单颜色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    // 是否固定在左侧
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 菜单折叠按钮位置
    trigger: TriggerEnum.HEADER,
    // 切换页面时关闭菜单
    closeMixSidebarOnChange: false,
    // 混合菜单触发方式 ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 固定扩展菜单
    mixSideFixed: false,
  },

  // 是否显示标签页
  showMutilTab: true,

  // 标签风格
  tabType: TabTypeEnum.CARD,

  // Transition设置
  transition: RouterTransitionEnum.FADE_SIDE,

  // 切换界面时是否删除未关闭的消息并通知
  closeMessageOnSwitch: true,
};

export default setting;
