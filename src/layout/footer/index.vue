<template>
  <a-footer class="layout-footer" v-if="getShowLayoutFooter" ref="footerRef">
    Copyright &copy;2022 <a @click="openWindow('https://www.baidu.com')">Vincent</a>
  </a-footer>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref } from 'vue';
import { Layout } from 'ant-design-vue';
import { openWindow } from '@/utils';

import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LayoutFooter',
  components: { [Layout.Footer.name]: Layout.Footer },
  setup() {
    // const { getShowFooter } = useRootSetting();
    const { currentRoute } = useRouter();

    const footerRef = ref();

    const getShowLayoutFooter = computed(() => {
      // return unref(getShowFooter) &&
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
