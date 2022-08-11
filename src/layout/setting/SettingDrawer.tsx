import { computed, defineComponent, unref } from 'vue';
import { Divider, Drawer } from 'ant-design-vue';
import DarkModeToggle from '@/components/Application/DarkModeToggle.vue';
import TypePicker from './components/TypePicker.vue';
import ThemeColorPicker from './components/ThemeColorPicker.vue';
import SwitchItem from './components/SwitchItem.vue';
import SelectItem from './components/SelectItem.vue';

import {
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  TopMenuAlignEnum,
  TriggerEnum,
} from '@/enums/menuEnum';
import { HandlerEnum } from './handler';

import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/store/modules/app';
import { RouterTransitionEnum } from '@/enums/appEnum';
import { useFullContent } from '../useFullContent';

export default defineComponent({
  name: 'SettingDrawer',
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const closeDrawer = function () {
      emit('update:visible', false);
    };

    const appStore = useAppStore();
    const getShowHeader = computed(() => appStore.getHeaderSetting.show);
    const getShowMenuRef = computed(() => {
      return (
        appStore.getMenuSetting.show && appStore.getMenuSetting.mode !== MenuModeEnum.HORIZONTAL
      );
    });
    const getMenuType = computed(() => appStore.getMenuSetting.type);
    const getSplit = computed(() => appStore.getMenuSetting.split);
    const getTrigger = computed(() => appStore.getMenuSetting.trigger);
    const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);
    const getCloseMixSidebarOnChange = computed(
      () => appStore.getMenuSetting.closeMixSidebarOnChange,
    );
    const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle);
    const getHeaderFixed = computed(() => appStore.getHeaderSetting.fixed);
    const getMenuFixed = computed(() => appStore.getMenuSetting.fixed);
    const getMixSideTrigger = computed(() => appStore.getMenuSetting.mixSideTrigger);
    const getTopMenuAlign = computed(() => appStore.getMenuSetting.topMenuAlign);
    const getTransition = computed(() => appStore.getProjectConfig.transition);

    const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb);
    const getShowMultipleTab = computed(() => appStore.getProjectConfig.showMutilTab);
    const getShowLogo = computed(() => appStore.getProjectConfig.showLogo);
    const getShowFooter = computed(() => appStore.getProjectConfig.showFooter);
    const getGrayMode = computed(() => appStore.getProjectConfig.grayMode);
    const getColorWeak = computed(() => appStore.getProjectConfig.colorWeak);

    const { getFullContent } = useFullContent();

    const getMenuTriggerOptions = (hideTop: boolean) => {
      return [
        {
          value: TriggerEnum.NONE,
          label: t('layout.setting.menuTriggerNone'),
        },
        {
          value: TriggerEnum.FOOTER,
          label: t('layout.setting.menuTriggerBottom'),
        },
        ...(hideTop
          ? []
          : [
              {
                value: TriggerEnum.HEADER,
                label: t('layout.setting.menuTriggerTop'),
              },
            ]),
      ];
    };

    const mixSidebarTriggerOptions = [
      {
        value: MixSidebarTriggerEnum.HOVER,
        label: t('layout.setting.triggerHover'),
      },
      {
        value: MixSidebarTriggerEnum.CLICK,
        label: t('layout.setting.triggerClick'),
      },
    ];

    const topMenuAlignOptions = [
      {
        value: TopMenuAlignEnum.CENTER,
        label: t('layout.setting.topMenuAlignRight'),
      },
      {
        value: TopMenuAlignEnum.START,
        label: t('layout.setting.topMenuAlignLeft'),
      },
      {
        value: TopMenuAlignEnum.END,
        label: t('layout.setting.topMenuAlignCenter'),
      },
    ];

    const routerTransitionOptions = [
      RouterTransitionEnum.ZOOM_FADE,
      RouterTransitionEnum.FADE,
      RouterTransitionEnum.ZOOM_OUT,
      RouterTransitionEnum.FADE_SIDE,
      RouterTransitionEnum.FADE_BOTTOM,
      RouterTransitionEnum.FADE_SCALE,
    ].map((item) => {
      return {
        label: item,
        value: item,
      };
    });

    function renderFeatures() {
      let triggerDef = unref(getTrigger);
      const triggerOptions = getMenuTriggerOptions(unref(getSplit));
      const some = triggerOptions.some((item) => item.value === triggerDef);
      if (!some) {
        triggerDef = TriggerEnum.FOOTER;
      }

      return (
        <>
          <SwitchItem
            title={t('layout.setting.splitMenu')}
            event={HandlerEnum.MENU_SPLIT}
            def={unref(getSplit)}
            disabled={!unref(getShowMenuRef) || unref(getMenuType) !== MenuTypeEnum.MIX}
          />
          <SwitchItem
            title={t('layout.setting.mixSidebarFixed')}
            event={HandlerEnum.MENU_FIXED_MIX_SIDEBAR}
            def={unref(getMixSideFixed)}
            disabled={unref(getMenuType) !== MenuTypeEnum.MIX_SIDEBAR}
          />
          <SwitchItem
            title={t('layout.setting.closeMixSidebarOnChange')}
            event={HandlerEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE}
            def={unref(getCloseMixSidebarOnChange)}
            disabled={unref(getMenuType) !== MenuTypeEnum.MIX_SIDEBAR}
          />
          <SwitchItem
            title={t('layout.setting.collapseMenuDisplayName')}
            event={HandlerEnum.MENU_COLLAPSED_SHOW_TITLE}
            def={unref(getCollapsedShowTitle)}
            disabled={!unref(getShowMenuRef) || unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR}
          />
          <SwitchItem
            title={t('layout.setting.fixedHeader')}
            event={HandlerEnum.HEADER_FIXED}
            def={unref(getHeaderFixed)}
            disabled={!unref(getShowHeader)}
          />
          <SwitchItem
            title={t('layout.setting.fixedSideBar')}
            event={HandlerEnum.MENU_FIXED}
            def={unref(getMenuFixed)}
            disabled={!unref(getShowMenuRef) || unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR}
          />
          <SelectItem
            title={t('layout.setting.mixSidebarTrigger')}
            event={HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR}
            def={unref(getMixSideTrigger)}
            options={mixSidebarTriggerOptions}
            disabled={unref(getMenuType) !== MenuTypeEnum.MIX_SIDEBAR}
          />
          <SelectItem
            title={t('layout.setting.topMenuLayout')}
            event={HandlerEnum.MENU_TOP_ALIGN}
            def={unref(getTopMenuAlign)}
            options={topMenuAlignOptions}
            disabled={
              !unref(getShowHeader) ||
              unref(getSplit) ||
              (unref(getMenuType) !== MenuTypeEnum.TOP_MENU && !unref(getSplit)) ||
              unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR
            }
          />
          <SelectItem
            title={t('layout.setting.menuCollapseButton')}
            event={HandlerEnum.MENU_TRIGGER}
            def={triggerDef}
            options={triggerOptions}
            disabled={!unref(getShowMenuRef) || unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR}
          />
          <SelectItem
            title={t('layout.setting.animationType')}
            event={HandlerEnum.ROUTER_TRANSITION}
            def={unref(getTransition)}
            options={routerTransitionOptions}
          />
        </>
      );
    }

    function renderContent() {
      return (
        <>
          <SwitchItem
            title={t('layout.setting.breadcrumb')}
            event={HandlerEnum.SHOW_BREADCRUMB}
            def={unref(getShowBreadCrumb)}
            disabled={!unref(getShowHeader)}
          />
          <SwitchItem
            title={t('layout.setting.tabs')}
            event={HandlerEnum.SHOW_TABS}
            def={unref(getShowMultipleTab)}
          />
          <SwitchItem
            title="Logo"
            event={HandlerEnum.SHOW_LOGO}
            def={unref(getShowLogo)}
            disabled={unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR}
          />
          <SwitchItem
            title={t('layout.setting.footer')}
            event={HandlerEnum.SHOW_FOOTER}
            def={unref(getShowFooter)}
          />
          <SwitchItem
            title={t('layout.setting.fullContent')}
            event={HandlerEnum.FULL_CONTENT}
            def={unref(getFullContent)}
          />
          <SwitchItem
            title={t('layout.setting.grayMode')}
            event={HandlerEnum.GRAY_MODE}
            def={unref(getGrayMode)}
          />
          <SwitchItem
            title={t('layout.setting.colorWeak')}
            event={HandlerEnum.COLOR_WEAK}
            def={unref(getColorWeak)}
          />
        </>
      );
    }

    return () => (
      <Drawer
        visible={props.visible}
        title={t('layout.setting.drawerTitle')}
        class="setting-drawer"
        placement="right"
        onClose={closeDrawer}
      >
        <Divider style="margin-top: 0">{t('layout.setting.darkMode')}</Divider>
        <DarkModeToggle class="mx-auto !flex" />
        <Divider class="!mt-8">{t('layout.setting.navMode')}</Divider>
        <TypePicker />
        <Divider class="!mt-8">{t('layout.setting.themeColor')}</Divider>
        <ThemeColorPicker />
        <Divider>{t('layout.setting.interfaceFunction')}</Divider>
        {renderFeatures()}
        <Divider>{() => t('layout.setting.interfaceDisplay')}</Divider>
        {renderContent()}
      </Drawer>
    );
  },
});
