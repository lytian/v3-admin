<template>
  <AFooter class="layout-footer" v-if="getShowLayoutFooter" ref="footerRef">
    Copyright &copy;2022 <a @click="openWindow('https://www.baidu.com')">Vincent</a>
  </AFooter>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref } from 'vue';
import { Layout } from 'ant-design-vue';
import { openWindow } from '@/utils';

import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LayoutFooter',
  components: { AFooter: Layout.Footer },
  setup() {
    const { currentRoute } = useRouter();

    const footerRef = ref();

    const getShowLayoutFooter = computed(() => {
      return !unref(currentRoute).meta?.hiddenFooter;
    });

    return {
      getShowLayoutFooter,
      openWindow,
      footerRef,
    };
  },
});
</script>

<style lang="less">
@normal-color: rgba(0, 0, 0, 0.45);

@hover-color: rgba(0, 0, 0, 0.85);

.layout-footer {
  color: @normal-color;
  text-align: center;

  a {
    color: @normal-color;

    &:hover {
      color: @hover-color;
    }
  }
}
</style>
