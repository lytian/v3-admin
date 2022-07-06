<template>
  <div :class="['theme-toggle', { 'theme-toggle--dark': isDark }]" @click="toggleThemeMode">
    <div class="theme-toggle-inner"></div>
    <SunIcon width="16px" />
    <MoonIcon width="16px" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import SunIcon from '@/assets/svg/sun.svg?component';
import MoonIcon from '@/assets/svg/moon.svg?component';

export default defineComponent({
  name: 'ThemeToggle',
  components: {
    SunIcon,
    MoonIcon,
  },
  setup() {
    const isDark = ref(false);

    function toggleThemeMode() {
      isDark.value = !isDark.value;
    }
    return {
      isDark,
      toggleThemeMode,
    };
  },
});
</script>
<style lang="less" scoped>
html[data-theme='dark'] {
  .theme-toggle {
    border: 1px solid rgb(196 188 188);
  }
}

.theme-toggle {
  position: relative;
  display: flex;
  width: 50px;
  height: 26px;
  padding: 0 4px;
  margin-left: auto;
  cursor: pointer;
  background-color: #151515;
  border-radius: 30px;
  justify-content: space-between;
  align-items: center;

  &-inner {
    position: absolute;
    z-index: 1;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s, background-color 0.3s;
    will-change: transform;
  }

  &--dark {
    .theme-toggle-inner {
      transform: translateX(calc(100% + 2px));
    }
  }
}
</style>
