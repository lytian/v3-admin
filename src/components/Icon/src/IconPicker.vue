<template>
  <a-input
    disabled
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    class="icon-picker"
    v-model:value="currentSelect"
  >
    <template #addonAfter>
      <a-popover
        placement="bottomLeft"
        trigger="click"
        v-model="visible"
        overlayClassName="icon-picker-popover"
      >
        <template #title>
          <div class="flex justify-between">
            <a-input
              :placeholder="t('component.icon.search')"
              @change="debounceHandleSearchChange"
              allowClear
            />
          </div>
        </template>

        <template #content>
          <div v-if="getPaginationList.length">
            <ScrollContainer class="border border-solid border-t-0">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                  <!-- <Icon :icon="icon" :prefix="prefix" /> -->
                  <SvgIcon v-if="isSvgMode" :name="icon" />
                  <Icon :icon="icon" v-else />
                </li>
              </ul>
            </ScrollContainer>
            <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
              <a-pagination
                showLessItems
                size="small"
                :showSizeChanger="false"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else
            ><div class="p-5"><a-empty /></div>
          </template>
        </template>

        <span class="cursor-pointer px-2 py-1 flex items-center" v-if="isSvgMode && currentSelect">
          <SvgIcon :name="currentSelect" />
        </span>
        <Icon :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer px-2 py-1" v-else />
      </a-popover>
    </template>
  </a-input>
</template>
<script lang="ts" setup>
import { ref, watchEffect, watch, unref, computed } from 'vue';
import { ScrollContainer } from '@/components/Container';
import { message as Message } from 'ant-design-vue';
import { Input, Popover, Pagination, Empty } from 'ant-design-vue';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

import iconsData from '../data/icons.data';
import { useClipboard, useDebounceFn } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { ChangeEventHandler } from 'ant-design-vue/es/_util/EventInterface';

// 没有使用别名引入，是因为WebStorm当前版本还不能正确识别，会报unused警告
const AInput = Input;
const APopover = Popover;
const APagination = Pagination;
const AEmpty = Empty;

function getIcons() {
  const data = iconsData as any;
  const prefix: string = data?.prefix ?? '';
  let result: string[] = [];
  if (prefix) {
    result = (data?.icons ?? []).map((item) => `${prefix}:${item}`);
  } else if (Array.isArray(iconsData)) {
    result = iconsData as string[];
  }
  return result;
}

function getSvgIcons() {
  return [];
}

const props = defineProps({
  value: String,
  width: {
    type: String,
    default: '100%',
  },
  pageSize: {
    type: Number,
    default: 140,
  },
  copy: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    validator(value: string) {
      return ['svg', 'iconify'].includes(value);
    },
    default: 'iconify',
  },
});

const emit = defineEmits(['change', 'update:value']);

const isSvgMode = props.mode === 'svg';
const icons = isSvgMode ? getSvgIcons() : getIcons();

const currentSelect = ref('');
const visible = ref(false);
const currentList = ref(icons);
const currentPage = ref(1);

const getTotal = computed(() => {
  return unref(currentList).length;
});

const { t } = useI18n();

const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100) as ChangeEventHandler;
const { copied } = useClipboard({
  source: props.value,
});

watchEffect(() => {
  currentSelect.value = props.value || '';
});

watch(
  () => currentSelect.value,
  (v) => {
    emit('update:value', v);
    return emit('change', v);
  },
);

function handlePageChange(page: number) {
  currentPage.value = page;
}

function getPaginationList<T = any>(list: T[], pageNo: number, pageSize: number): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize));
  return ret;
}

function handleClick(icon: string) {
  currentSelect.value = icon;
  if (props.copy) {
    if (unref(copied)) {
      Message.success(t('component.icon.copy'));
    }
  }
}

function handleSearchChange(e: ChangeEvent) {
  const value = e.target.value;
  if (!value) {
    currentPage.value = 1;
    currentList.value = icons;
    return;
  }
  currentList.value = icons.filter((item) => item.includes(value));
}
</script>

<style lang="less">
.icon-picker {
  .ant-input-group-addon {
    padding: 0;
  }

  &-popover {
    width: 300px;

    .ant-popover-inner-content {
      padding: 0;
    }

    .scrollbar {
      height: 220px;
    }
  }
}
</style>
