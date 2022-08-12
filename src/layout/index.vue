<template>
  <Layout class="default-layout">
    <LayoutHeader fixed v-if="getShowFullHeaderRef" />
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout class="default-layout-main">
        <!-- <LayoutMultipleHeader />
        <LayoutContent /> -->
        <LayoutFooter v-if="getShowFooter" />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
// import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

import LayoutHeader from './header/index.vue';
import LayoutFooter from './footer/index.vue';
import LayoutSideBar from './sider/index.vue';

import { useLayout } from './useLayout';
import { useAppStore } from '@/store/modules/app';
import { MenuTypeEnum } from '@/enums/menuEnum';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Layout,
    LayoutHeader,
    LayoutSideBar,
    LayoutFooter,
  },
  setup() {
    const { getShowFullHeaderRef } = useLayout();
    const appStore = useAppStore();

    const getShowFooter = computed(() => appStore.getProjectConfig.showFooter);
    const getIsMobile = computed(() => appStore.getIsMobile);
    const { getShowSidebar } = useLayout();
    const layoutClass = computed(() => {
      let cls: string[] = ['ant-layout'];
      if (
        appStore.getMenuSetting.show ||
        appStore.getMenuSetting.type === MenuTypeEnum.MIX_SIDEBAR
      ) {
        cls.push('ant-layout-has-sider');
      }
      return cls;
    });

    return {
      getShowFullHeaderRef,
      getShowFooter,
      getIsMobile,
      getShowSidebar,
      layoutClass,
    };
  },
});
</script>

<style lang="less">
.default-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: @content-bg;
  flex-direction: column;

  > .ant-layout {
    min-height: 100%;
  }

  &-main {
    width: 100%;
    margin-left: 1px;
  }
}
</style>
