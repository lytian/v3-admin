<template>
  <Layout>
    <LayoutFooter />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Layout,
    LayoutFooter: createAsyncComponent(() => import('./footer/index.vue')),
  },
});
</script>

<style scoped></style>
