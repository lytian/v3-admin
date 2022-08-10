<template>
  <Dropdown placement="bottomLeft" overlayClassName="header-user-dropdown-dropdown-overlay">
    <span :class="['header-user-dropdown', `header-user-dropdown--${theme}`]" class="flex">
      <img class="header-user-dropdown__header" :src="getUserInfo.avatar" />
      <span class="header-user-dropdown__info hidden md:block">
        <span class="header-user-dropdown__name truncate">
          {{ getUserInfo.nickName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <MenuItem
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </a-menu>
    </template>
  </Dropdown>

  <LockModel v-model:visible="showLockModal" />
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Dropdown, Menu } from 'ant-design-vue';

import { useUserStore } from '@/store/modules/user';
import avatarImg from '/@/assets/images/default-avatar.jpg';
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
import { useI18n } from 'vue-i18n';

type MenuEvent = 'logout' | 'doc' | 'lock';

export default defineComponent({
  name: 'UserDropdown',
  components: {
    Dropdown,
    [Menu.name]: Menu,
    MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
    LockModel: createAsyncComponent(() => import('../lock/LockModal.vue')),
  },
  props: {
    theme: {
      type: String,
      validator(value: string) {
        return ['dark', 'light'].includes(value);
      },
    },
  },
  setup() {
    const showLockModal = ref(false);
    const { t } = useI18n();
    const userStore = useUserStore();

    const getUserInfo = computed(() => {
      const { nickName = '', avatar } = userStore.getUserInfo || {};
      return { nickName, avatar: avatar || avatarImg };
    });

    function handleLock() {
      showLockModal.value = true;
    }

    //  login out
    function handleLoginOut() {
      // userStore.confirmLoginOut();
    }

    function handleMenuClick(e: { key: MenuEvent }) {
      switch (e.key) {
        case 'logout':
          handleLoginOut();
          break;
        case 'lock':
          handleLock();
          break;
      }
    }

    return {
      t,
      showLockModal,
      getUserInfo,
      handleMenuClick,
    };
  },
});
</script>
<style lang="less">
.header-user-dropdown {
  height: @header-height;
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__header {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &--dark {
    &:hover {
      background-color: @header-dark-bg-hover-color;
    }
  }

  &--light {
    &:hover {
      background-color: @header-light-bg-hover-color;
    }

    .header-user-dropdown__name {
      color: @text-color-base;
    }

    .header-user-dropdown__desc {
      color: @header-light-desc-color;
    }
  }

  &-dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
}
</style>
