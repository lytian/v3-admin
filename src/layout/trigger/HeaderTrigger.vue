<template>
  <span :class="['layout-header-trigger', theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
  </span>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { oneOf } from 'vue-types';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '@/store/modules/app';

export default defineComponent({
  name: 'HeaderTrigger',
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
  props: {
    theme: oneOf(['light', 'dark']),
  },
  setup() {
    const appStore = useAppStore();
    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
    const toggleCollapsed = function () {
      appStore.setMenuSetting({
        collapsed: !appStore.getMenuSetting.collapsed,
      });
    };
    return { getCollapsed, toggleCollapsed };
  },
});
</script>
