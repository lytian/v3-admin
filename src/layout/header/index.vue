<template>
  <AHeader :class="getHeaderClass">
    <!-- left start -->
    <div class="layout-header-left">
      <!-- logo -->
      <AppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        class="layout-header-logo"
        :theme="getHeaderSetting.theme"
        :style="getLogoWidth"
      />
      <!-- <LayoutTrigger
        v-if="(getShowHeaderTrigger && !getMenuSetting.split && !getIsMixSidebar) || getIsMobile"
        :theme="getHeaderSetting.theme"
        :sider="false"
      /> -->
      <!-- <LayoutBreadcrumb v-if="getShowBreadCrumb" :theme="getHeaderSetting.theme" /> -->
    </div>
    <!-- left end -->

    <!-- menu start -->
    <!-- <div class="layout-header-menu" v-if="getShowTopMenu && !getIsMobile">
      <LayoutMenu
        :isHorizontal="true"
        :theme="getHeaderTheme"
        :splitType="getSplitType"
        :menuMode="getMenuMode"
      />
    </div> -->
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`layout-header-action`">
      <!-- <AppSearch v-if="getHeaderSetting.showSearch" :class="`layout-header-action__item `" /> -->

      <Notify :class="`layout-header-action__item notify-item`" />

      <FullScreen :class="`layout-header-action__item fullscreen-item`" />

      <LocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :showText="false"
        :class="`layout-header-action__item`"
      />

      <UserDropDown :theme="getHeaderSetting.theme" />

      <SettingDrawer v-if="getShowSetting" :class="`layout-header-action__item`" />
    </div>
  </AHeader>
</template>
<script lang="ts">
import { defineComponent, unref, computed } from 'vue';

import { Layout } from 'ant-design-vue';
import AppLogo from '@/components/Application/AppLogo.vue';
import LocalePicker from '@/components/Application/LocalePicker.vue';
// import { AppSearch } from '/@/components/Application';
// import LayoutMenu from '../menu/index.vue';
// import LayoutTrigger from '../trigger/index.vue';

import { MenuModeEnum, MenuSplitTyeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import { SettingButtonPositionEnum } from '@/enums/appEnum';

import { FullScreen, Notify, UserDropDown } from './components';
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
import { useLocale } from '@/locales/useLocale';
import { useAppStore } from '@/store/modules/app';
import { useLayout } from '../useLayout';

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    AHeader: Layout.Header,
    AppLogo,
    // LayoutTrigger,
    // LayoutBreadcrumb,
    // LayoutMenu,
    LocalePicker,
    FullScreen,
    Notify,
    UserDropDown,
    // AppSearch,
    SettingDrawer: createAsyncComponent(() => import('@/layout/setting/index.vue'), {
      loading: true,
    }),
  },
  props: {
    fixed: Boolean,
  },
  setup(props) {
    const appStore = useAppStore();
    const { getMenuRealWidth, getShowHeaderTrigger, getShowBreadCrumb, getShowTopMenu } =
      useLayout();

    const { getShowLocalePicker } = useLocale();

    const getShowHeaderLogo = computed(() => appStore.getProjectConfig.showLogo);
    const getIsMobile = computed(() => appStore.isMobile);
    const getHeaderSetting = computed(() => appStore.getHeaderSetting);
    const getMenuSetting = computed(() => appStore.getMenuSetting);

    const getHeaderClass = computed(() => {
      const theme = appStore.getHeaderSetting.theme;
      return [
        'layout-header',
        {
          'layout-header--fixed': props.fixed,
          'layout-header--mobile': appStore.isMobile,
          [`layout-header--${theme}`]: theme,
        },
      ];
    });

    const getShowSetting = computed(() => {
      if (!appStore.getProjectConfig.showSettingButton) {
        return false;
      }
      const settingButtonPosition = appStore.getProjectConfig.settingButtonPosition;

      if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
        return appStore.getHeaderSetting.show;
      }
      return settingButtonPosition === SettingButtonPositionEnum.HEADER;
    });

    const getLogoWidth = computed(() => {
      if (
        appStore.isMobile ||
        (appStore.getMenuSetting.mode !== MenuModeEnum.INLINE &&
          appStore.getMenuSetting.type !== MenuTypeEnum.MIX)
      ) {
        return {};
      }
      const width = unref(getMenuRealWidth) < 180 ? 180 : unref(getMenuRealWidth);
      return { width: `${width}px` };
    });

    const getSplitType = computed(() => {
      return appStore.getMenuSetting.split ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
    });

    const getMenuMode = computed(() => {
      return appStore.getMenuSetting.split ? MenuModeEnum.HORIZONTAL : null;
    });

    const getIsMixSidebar = computed(() => {
      return appStore.getMenuSetting.type === MenuTypeEnum.MIX_SIDEBAR;
    });

    return {
      getHeaderClass,
      getHeaderSetting,
      getMenuSetting,
      getShowHeaderLogo,
      getShowHeaderTrigger,
      getIsMobile,
      getShowBreadCrumb,
      getSplitType,
      getMenuMode,
      getShowTopMenu,
      getShowLocalePicker,
      getLogoWidth,
      getShowSetting,
      getIsMixSidebar,
    };
  },
});
</script>
<style lang="less">
@import './index.less';
</style>
