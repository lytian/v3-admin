<template>
  <div @click.stop="toggleCollapsed">
    <DoubleRightOutlined v-if="getCollapsed" />
    <DoubleLeftOutlined v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'SiderTrigger',
  components: { DoubleRightOutlined, DoubleLeftOutlined },
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
