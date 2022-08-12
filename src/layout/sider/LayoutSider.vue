<template>
  <div
    v-if="getMenuFixed && !getIsMobile"
    :style="getHiddenDomStyle"
    v-show="showClassSideBarRef"
  ></div>
  <Sider
    v-show="showClassSideBarRef"
    ref="sideRef"
    breakpoint="lg"
    collapsible
    :class="getSiderClass"
    :width="menuWidth"
    :collapsed="getCollapsed"
    :collapsedWidth="getCollapsedWidth"
    :theme="getMenuTheme"
    @breakpoint="onBreakpointChange"
    v-bind="getTriggerAttr"
  >
    <template #trigger v-if="getShowTrigger">
      <LayoutTrigger />
    </template>
    <LayoutMenu :theme="getMenuTheme" :menuMode="getMode" :splitType="getSplitType" />
    <DragBar ref="dragBarRef" />
  </Sider>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref, CSSProperties } from 'vue';

import { Layout } from 'ant-design-vue';
import LayoutMenu from '../menu/index.vue';
import LayoutTrigger from '@/layout/trigger/index.vue';
import DragBar from './DragBar.vue';

import { MenuModeEnum, MenuSplitTyeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import { useTrigger, useSiderEvent } from './useLayoutSider';
import { useAppStore } from '@/store/modules/app';
import { SIDE_BAR_WIDTH } from '@/enums/appEnum';
import { useLayout } from '../useLayout';

export default defineComponent({
  name: 'LayoutSideBar',
  components: { Sider: Layout.Sider, LayoutMenu, DragBar, LayoutTrigger },
  setup() {
    const dragBarRef = ref<ElRef>(null);
    const sideRef = ref<ElRef>(null);

    const appStore = useAppStore();

    const menuWidth = ref(SIDE_BAR_WIDTH);
    const getIsMobile = computed(() => appStore.getIsMobile);
    const getSplit = computed(() => appStore.getMenuSetting.split);
    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
    const getMenuTheme = computed(() => appStore.getMenuSetting.theme);
    const getMenuFixed = computed(() => appStore.getMenuSetting.fixed);
    const getIsMixMode = computed(() => {
      return (
        appStore.getMenuSetting.mode === MenuModeEnum.INLINE &&
        appStore.getMenuSetting.type === MenuTypeEnum.MIX
      );
    });
    const { getMenuRealWidth } = useLayout();

    const toggleCollapsed = function () {
      appStore.setMenuSetting({
        collapsed: !appStore.getMenuSetting.collapsed,
      });
    };

    const { getTriggerAttr, getShowTrigger } = useTrigger(unref(getIsMobile));

    const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();

    const getMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.INLINE : null;
    });

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE;
    });

    const showClassSideBarRef = computed(() => {
      // TODO return unref(getSplit) ? !unref(getMenuHidden) : true;
      return true;
    });

    const getSiderClass = computed(() => {
      return [
        'layout-sideBar',
        {
          ['layout-sideBar--fixed']: unref(getMenuFixed),
          ['layout-sideBar--mix']: unref(getIsMixMode) && !unref(getIsMobile),
        },
      ];
    });

    const getHiddenDomStyle = computed((): CSSProperties => {
      const width = `${unref(getMenuRealWidth)}px`;
      return {
        width: width,
        overflow: 'hidden',
        flex: `0 0 ${width}`,
        maxWidth: width,
        minWidth: width,
        transition: 'all 0.2s',
      };
    });

    return {
      sideRef,
      dragBarRef,
      getIsMobile,
      getHiddenDomStyle,
      getSiderClass,
      getTriggerAttr,
      getCollapsedWidth,
      getMenuFixed,
      showClassSideBarRef,
      menuWidth,
      getCollapsed,
      getMenuTheme,
      onBreakpointChange,
      getMode,
      getSplitType,
      getShowTrigger,
      toggleCollapsed,
    };
  },
});
</script>
<style lang="less">
.layout-sideBar {
  z-index: @layout-sider-fixed-z-index;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }

  &--mix {
    top: @header-height;
    height: calc(100% - @header-height);
  }

  &.ant-layout-sider-dark {
    background-color: @sider-dark-bg-color;

    .ant-layout-sider-trigger {
      color: darken(@white, 25%);
      background-color: @trigger-dark-bg-color;

      &:hover {
        color: @white;
        background-color: @trigger-dark-hover-bg-color;
      }
    }
  }

  &:not(.ant-layout-sider-dark) {
    // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

    .ant-layout-sider-trigger {
      color: @text-color-base;
      border-top: 1px solid @border-color-light;
    }
  }

  .ant-layout-sider-zero-width-trigger {
    top: 40%;
    z-index: 10;
  }

  & .ant-layout-sider-trigger {
    height: 36px;
    line-height: 36px;
  }
}
</style>
