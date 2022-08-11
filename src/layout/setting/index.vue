<template>
  <div @click="openDrawer()">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer v-model:visible="showSettingDrawer" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Icon from '@/components/Icon';
import SettingDrawer from './SettingDrawer';

export default defineComponent({
  name: 'SettingButton',
  components: { Icon, SettingDrawer },
  setup() {
    const showSettingDrawer = ref(false);

    const openDrawer = function () {
      showSettingDrawer.value = true;
    };
    return {
      showSettingDrawer,
      openDrawer,
    };
  },
});
</script>
