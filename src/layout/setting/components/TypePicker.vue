<template>
  <div class="setting-menu-type-picker">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <Tooltip :title="item.title" placement="bottom">
        <div
          @click="handleSelectType(item)"
          :class="[
            'setting-menu-type-picker__item',
            `setting-menu-type-picker__item--${item.type}`,
            {
              ['setting-menu-type-picker__item--active']: getMenuType === item.type,
            },
          ]"
        >
          <div class="mix-sidebar"></div>
        </div>
      </Tooltip>
    </template>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

import { Tooltip } from 'ant-design-vue';
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/store/modules/app';

export default defineComponent({
  name: 'MenuTypePicker',
  components: { Tooltip },
  setup() {
    const { t } = useI18n();
    const menuTypeList = [
      {
        title: t('layout.setting.menuTypeSidebar'),
        mode: MenuModeEnum.INLINE,
        type: MenuTypeEnum.SIDEBAR,
      },
      {
        title: t('layout.setting.menuTypeMix'),
        mode: MenuModeEnum.INLINE,
        type: MenuTypeEnum.MIX,
      },
      {
        title: t('layout.setting.menuTypeTopMenu'),
        mode: MenuModeEnum.HORIZONTAL,
        type: MenuTypeEnum.TOP_MENU,
      },
      {
        title: t('layout.setting.menuTypeMixSidebar'),
        mode: MenuModeEnum.INLINE,
        type: MenuTypeEnum.MIX_SIDEBAR,
      },
    ];
    const appStore = useAppStore();
    const getMenuType = computed(() => appStore.getMenuSetting.type);

    const handleSelectType = function (item) {
      const { mode, type } = item;
      const splitOpt =
        appStore.getMenuSetting.mode === MenuModeEnum.HORIZONTAL ? {} : { split: undefined };

      appStore.setMenuSetting({
        mode,
        type,
        collapsed: false,
        show: true,
        ...splitOpt,
      });
    };

    return {
      menuTypeList,
      getMenuType,
      handleSelectType,
    };
  },
});
</script>
<style lang="less" scoped>
.setting-menu-type-picker {
  display: flex;
  justify-content: space-between;

  &__item {
    position: relative;
    width: 64px;
    height: 56px;
    overflow: hidden;
    cursor: pointer;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &::before,
    &::after {
      position: absolute;
      content: '';
    }

    &--sidebar,
    &--light {
      &::before {
        top: 0;
        left: 0;
        z-index: 1;
        width: 33%;
        height: 100%;
        background-color: #273352;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #fff;
      }
    }

    &--mix {
      &::before {
        top: 0;
        left: 0;
        width: 33%;
        height: 100%;
        background-color: #fff;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 25%;
        background-color: #273352;
      }
    }

    &--top-menu {
      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #273352;
      }
    }

    &--dark {
      background-color: #273352;
    }

    &--mix-sidebar {
      &::before {
        top: 0;
        left: 0;
        z-index: 1;
        width: 25%;
        height: 100%;
        background-color: #273352;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #fff;
      }

      .mix-sidebar {
        position: absolute;
        left: 25%;
        width: 15%;
        height: 100%;
        background-color: #fff;
      }
    }

    &:hover,
    &--active {
      padding: 12px;
      border: 2px solid @primary-color;

      &::before,
      &::after {
        border-radius: 0;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
