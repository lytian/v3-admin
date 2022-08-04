<template>
  <div class="app-logo anticon" :class="getAppLogoClass" @click="goHome">
    <img src="@/assets/images/logo.png" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { PageEnum } from '@/enums/appEnum.js';
import { useAppStore } from '@/store/modules/app.js';

const props = defineProps({
  /**
   * The theme of the current parent component
   */
  theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },
  /**
   * The title is also displayed when the menu is collapsed
   */
  alwaysShowTitle: { type: Boolean },
});

const title = import.meta.env.VITE_APP_TITLE;
const userStore = useAppStore();

const getAppLogoClass = computed(() => [
  props.theme,
  { 'collapsed-show-title': userStore.getMenuSetting.collapsedShowTitle },
]);

const getTitleClass = computed(() => [
  'app-logo__title',
  {
    'xs:opacity-0': !props.alwaysShowTitle,
  },
]);

const router = useRouter();
function goHome() {
  router.replace(PageEnum.BASE_HOME);
}
</script>
<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.light {
    border-bottom: 1px solid @border-color-base;
  }

  &.collapsed-show-title {
    padding-left: 20px;
  }

  &.light &__title {
    color: @primary-color;
  }

  &.dark &__title {
    color: @white;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }
}
</style>
