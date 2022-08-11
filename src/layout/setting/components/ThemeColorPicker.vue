<template>
  <div class="flex justify-between">
    <div v-for="picker in pickerList" :key="picker.key">
      <div class="setting-theme-picker">
        <template v-for="color in picker.colorList" :key="color">
          <span
            @click="handleClick(picker.key, color)"
            :class="[
              'setting-theme-picker__item',
              {
                ['setting-theme-picker__item--active']: picker.getColor === color,
              },
            ]"
            :style="{ background: color }"
          >
            <CheckOutlined :class="getIconClass(picker.getColor)" />
          </span>
        </template>
      </div>
      <div class="text-center">{{ picker.title }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';

import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
} from '@/settings/designSetting';
import { useAppStore } from '@/store/modules/app';
import { changeThemeColor } from '@/settings/theme';
import { updateHeaderBgColor, updateSidebarBgColor } from '@/settings/theme/updateBackground';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ThemeColorPicker',
  components: { CheckOutlined },
  setup() {
    const appStore = useAppStore();
    const { t } = useI18n();

    const pickerList = computed(() => [
      {
        key: 'theme',
        title: t('layout.setting.sysTheme'),
        colorList: APP_PRESET_COLOR_LIST,
        getColor: appStore.getProjectConfig.themeColor,
      },
      {
        key: 'header',
        title: t('layout.setting.headerTheme'),
        colorList: HEADER_PRESET_BG_COLOR_LIST,
        getColor: appStore.getHeaderSetting.bgColor,
      },
      {
        key: 'sidebar',
        title: t('layout.setting.sidebarTheme'),
        colorList: SIDE_BAR_BG_COLOR_LIST,
        getColor: appStore.getMenuSetting.bgColor,
      },
    ]);

    const getIconClass = function (color) {
      return color === '#ffffff' || color === '#fff' ? 'dark' : 'light';
    };

    function handleClick(key: string, color: string) {
      switch (key) {
        case 'theme':
          if (appStore.getProjectConfig.themeColor === color) return;

          changeThemeColor(color);
          return appStore.setProjectConfig({
            themeColor: color,
          });
        case 'header':
          if (appStore.getHeaderSetting.bgColor === color) return;

          updateHeaderBgColor(color);
          return appStore.setHeaderSetting({
            bgColor: color,
          });
        case 'sidebar':
          if (appStore.getMenuSetting.bgColor === color) return;

          updateSidebarBgColor(color);
          return appStore.setMenuSetting({
            bgColor: color,
          });
      }
    }

    return {
      pickerList,
      getIconClass,
      handleClick,
    };
  },
});
</script>

<style lang="less">
.setting-theme-picker {
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 2px;
  margin-bottom: 4px;

  &__item {
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 2px;

    svg {
      display: none;
    }

    &--active {
      border: 1px solid lighten(@primary-color, 10%);

      svg {
        display: inline-block;
        margin: 0 0 3px 3px;
        font-size: 12px;
      }

      .dark svg {
        fill: #333;
      }

      .light svg {
        fill: #fff;
      }
    }
  }
}
</style>
