<template>
  <div class="setting-switch-item">
    <span> {{ title }}</span>
    <a-switch
      v-bind="getBindValue"
      @change="handleChange"
      :disabled="disabled"
      :checkedChildren="t('layout.setting.on')"
      :unCheckedChildren="t('layout.setting.off')"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import { Switch } from 'ant-design-vue';
import { handler, HandlerEnum } from '../handler';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SwitchItem',
  components: { [Switch.name]: Switch },
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
      type: Boolean,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const getBindValue = computed(() => {
      return props.def ? { checked: props.def } : {};
    });
    function handleChange(e) {
      handler(props.event, e);
    }
    return {
      t,
      handleChange,
      getBindValue,
    };
  },
});
</script>

<style lang="less" scoped>
.setting-switch-item {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
</style>
