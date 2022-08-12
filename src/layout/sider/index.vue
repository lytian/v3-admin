<template>
  <Drawer
    v-if="getIsMobile"
    placement="left"
    class="layout-sider-wrapper"
    :width="menuWidth"
    :getContainer="null"
    :visible="!getCollapsed"
    @close="handleClose"
  >
    <Sider />
  </Drawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import Sider from './LayoutSider.vue';
import MixSider from './MixSider.vue';
import { Drawer } from 'ant-design-vue';
import { useAppStore } from '@/store/modules/app';
import { MenuTypeEnum } from '@/enums/menuEnum';
import { SIDE_BAR_WIDTH } from '@/enums/appEnum';

export default defineComponent({
  name: 'SiderWrapper',
  components: { Sider, Drawer, MixSider },
  setup() {
    const menuWidth = ref(SIDE_BAR_WIDTH);
    const appStore = useAppStore();
    const getIsMobile = computed(() => appStore.getIsMobile);
    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
    const getIsMixSidebar = computed(
      () => appStore.getMenuSetting.type === MenuTypeEnum.MIX_SIDEBAR,
    );

    function handleClose() {
      appStore.setMenuSetting({
        collapsed: true,
      });
    }

    return { getIsMobile, getCollapsed, handleClose, menuWidth, getIsMixSidebar };
  },
});
</script>
<style lang="less">
.layout-sider-wrapper {
  .ant-drawer-body {
    height: 100vh;
    padding: 0;
  }

  .ant-drawer-header-no-title {
    display: none;
  }
}
</style>
