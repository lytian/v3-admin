<template>
  <div class="setting-select-item">
    <span> {{ title }}</span>
    <a-select
      v-bind="getBindValue"
      class="setting-select-item-select"
      @change="handleChange"
      :disabled="disabled"
      size="small"
      :options="options"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import { Select } from 'ant-design-vue';
import { handler, HandlerEnum } from '../handler';

export default defineComponent({
  name: 'SelectItem',
  components: { [Select.name]: Select },
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    def: {
      type: [String, Number] as PropType<string | number>,
    },
    initValue: {
      type: [String, Number] as PropType<string | number>,
    },
    options: {
      type: Array as PropType<LabelValueOptions>,
      default: () => [],
    },
  },
  setup(props) {
    const getBindValue = computed(() => {
      return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
    });

    function handleChange(e) {
      handler(props.event, e);
    }
    return {
      handleChange,
      getBindValue,
    };
  },
});
</script>
<style lang="less" scoped>
.setting-select-item {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;

  &-select {
    width: 126px;
  }
}
</style>
