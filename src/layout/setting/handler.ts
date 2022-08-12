import { useAppStore } from '@/store/modules/app';
import { updateGrayMode } from '@/settings/theme/updateGrayMode';
import { updateColorWeak } from '@/settings/theme/updateColorWeak';
import { ProjectConfig } from '#/config';

export enum HandlerEnum {
  // 界面功能
  MENU_SPLIT,
  MENU_FIXED_MIX_SIDEBAR,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_COLLAPSED_SHOW_TITLE,
  HEADER_FIXED,
  MENU_FIXED,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_TOP_ALIGN,
  MENU_TRIGGER,

  // 界面显示
  SHOW_BREADCRUMB,
  SHOW_TABS,
  TAB_TYPE,
  SHOW_LOGO,
  SHOW_FOOTER,
  FULL_CONTENT,
  GRAY_MODE,
  COLOR_WEAK,
  ROUTER_TRANSITION,
}

export function handler(event: HandlerEnum, value: any) {
  const appStore = useAppStore();
  let config: DeepPartial<ProjectConfig>;
  switch (event) {
    case HandlerEnum.MENU_SPLIT:
      config = { menuSetting: { split: value } };
      break;

    case HandlerEnum.MENU_FIXED_MIX_SIDEBAR:
      config = { menuSetting: { mixSideFixed: value } };
      break;

    case HandlerEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:
      config = { menuSetting: { closeMixSidebarOnChange: value } };
      break;

    case HandlerEnum.MENU_COLLAPSED_SHOW_TITLE:
      config = { menuSetting: { collapsedShowTitle: value } };
      break;

    case HandlerEnum.HEADER_FIXED:
      config = { headerSetting: { fixed: value } };
      break;

    case HandlerEnum.MENU_FIXED:
      config = { menuSetting: { fixed: value } };
      break;

    case HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR:
      config = { menuSetting: { mixSideTrigger: value } };
      break;

    case HandlerEnum.MENU_TOP_ALIGN:
      config = { menuSetting: { topMenuAlign: value } };
      break;

    case HandlerEnum.MENU_TRIGGER:
      config = { menuSetting: { trigger: value } };
      break;

    case HandlerEnum.ROUTER_TRANSITION:
      config = { transition: value };
      break;

    case HandlerEnum.SHOW_BREADCRUMB:
      config = { showBreadCrumb: value };
      break;

    case HandlerEnum.SHOW_TABS:
      config = { showMutilTab: value };
      break;

    case HandlerEnum.SHOW_LOGO:
      config = { showLogo: value };
      break;

    case HandlerEnum.SHOW_FOOTER:
      config = { showFooter: value };
      break;

    case HandlerEnum.FULL_CONTENT:
      config = { fullContent: value };
      break;

    case HandlerEnum.GRAY_MODE:
      updateGrayMode(value);
      config = { grayMode: value };
      break;

    case HandlerEnum.COLOR_WEAK:
      updateColorWeak(value);
      config = { colorWeak: value };
      break;

    default:
      config = {};
      break;
  }
  appStore.setProjectConfig(config);
}
