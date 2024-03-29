<template>
  <div :class="['dark-mode-toggle', { 'dark-mode-toggle--dark': isDark }]" @click="toggleDarkMode">
    <div class="dark-mode-toggle-inner"></div>
    <SunIcon width="16px" />
    <MoonIcon width="16px" />
  </div>
</template>
<script lang="ts">
import { defineComponent, unref, computed } from 'vue';
import SunIcon from '@/assets/svg/sun.svg?component';
import MoonIcon from '@/assets/svg/moon.svg?component';
import { useAppStore } from '@/store/modules/app';
import { ThemeEnum } from '@/enums/appEnum';
import { updateDarkTheme } from '@/settings/theme/dark';
import { updateHeaderBgColor, updateSidebarBgColor } from '@/settings/theme/updateBackground';

export default defineComponent({
  name: 'DarkModeToggle',
  components: {
    SunIcon,
    MoonIcon,
  },
  setup() {
    const appStore = useAppStore();
    const isDark = computed(() => appStore.getDarkMode === ThemeEnum.DARK);

    function toggleDarkMode() {
      const darkMode = unref(isDark) ? ThemeEnum.LIGHT : ThemeEnum.DARK;
      appStore.setDarkMode(darkMode);
      updateDarkTheme(darkMode);
      updateHeaderBgColor();
      updateSidebarBgColor();
    }
    return {
      isDark,
      toggleDarkMode,
    };
  },
});
</script>
<style lang="less" scoped>
html[data-theme='dark'] {
  .dark-mode-toggle {
    border: 1px solid rgb(196 188 188);
  }
}

.dark-mode-toggle {
  position: relative;
  display: inline-flex;
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
    .dark-mode-toggle-inner {
      transform: translateX(calc(100% + 2px));
    }
  }
}
</style>
