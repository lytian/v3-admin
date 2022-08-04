<template>
  <AHeader />
</template>

<script lang="ts">
import { Layout } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutHeader',
  components: { AHeader: Layout.Header },
  props: {
    fixed: Boolean,
  },
});
</script>

<style lang="less" scoped></style>
