<template>
  <ConfigProvider :locale="getAntdLocale">
    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue';
import { useLocale } from '@/locales/useLocale';

const { getAntdLocale } = useLocale();
</script>
