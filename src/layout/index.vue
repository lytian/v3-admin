<template>
  <Layout>
    <LayoutHeader fixed />
    <LayoutFooter />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
// import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

import LayoutHeader from './header/index.vue';
import LayoutFooter from './footer/index.vue';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Layout,
    LayoutHeader,
    LayoutFooter,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
