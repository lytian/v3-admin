<template>
  <Popover
    v-model:visible="showPicker"
    placement="bottom"
    trigger="click"
    overlayClassName="app-locale-picker__overlay"
  >
    <template #content>
      <div
        v-for="item in localeList"
        :key="item.value"
        @click="handleChangeLocale(item)"
        :class="['app-locale-picker__item', { active: getLocale === item.value }]"
      >
        {{ item.text }}
      </div>
    </template>
    <span class="app-locale-picker__btn">
      <TranslationOutlined />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </Popover>
</template>
<script lang="ts" setup>
import type { LocaleType } from '#/config';
import { unref, computed, ref } from 'vue';
import { useLocale } from '@/locales/useLocale';

import { Popover } from 'ant-design-vue';
import { TranslationOutlined } from '@ant-design/icons-vue';

interface LocaleItem {
  text: string;
  value: LocaleType;
}

const localeList: LocaleItem[] = [
  {
    text: '简体中文',
    value: 'zh-CN',
  },
  {
    text: 'English',
    value: 'en',
  },
];

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: false },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean },
});
const showPicker = ref(false);

const { changeLocale, getLocale } = useLocale();

const getLocaleText = computed(() => {
  const key = unref(getLocale);
  if (!key) {
    return '';
  }
  return localeList.find((item) => item.value === key)?.text;
});

async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType);
  props.reload && location.reload();
}

function handleChangeLocale(item: LocaleItem) {
  if (unref(getLocale) === item.value) {
    return;
  }
  showPicker.value = !unref(showPicker);
  toggleLocale(item.value);
}
</script>

<style lang="less">
.app-locale-picker {
  &__btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
  }

  &__item {
    padding: 6px 24px;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }

    &.active {
      color: @primary-color;
      background-color: rgb(@primary-color 0.1);
    }
  }

  &__overlay {
    .ant-popover-inner-content {
      padding: 4px 0;
    }
  }
}
</style>
