<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :title="t('layout.header.lockScreen')"
    v-bind="$attrs"
    dialog-class="header-lock-modal"
    :mask-closable="false"
    @cancel="closeModal"
  >
    <div class="header-lock-modal__entry">
      <div class="header-lock-modal__header">
        <img :src="avatar" class="header-lock-modal__header-img" />
        <p class="header-lock-modal__header-name">
          {{ getNickName }}
        </p>
      </div>

      <a-form :model="formState">
        <a-form-item name="password" :label="t('layout.header.lockScreenPassword')" required>
          <a-input-password v-model:value="formState.password" visibilityToggle :maxlength="20" />
        </a-form-item>
      </a-form>

      <div class="header-lock-modal__footer">
        <a-button type="primary" block class="mt-2" @click="handleLock">
          {{ t('layout.header.lockScreenBtn') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';

import { Modal, Form, Input, Button } from 'ant-design-vue';
import { useUserStore } from '@/store/modules/user';
import { useAppStore } from '@/store/modules/app';
import avatarImg from '@/assets/images/default-avatar.jpg';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LockModal',
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.Password.name]: Input.Password,
    [Button.name]: Button,
  },
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],

  setup(_, { emit }) {
    const { t } = useI18n();
    const userStore = useUserStore();
    const appStore = useAppStore();

    const getNickName = computed(() => userStore.getUserInfo?.nickName);

    const closeModal = function () {
      emit('update:visible', false);
    };

    const formState = reactive({
      password: '',
    });

    const { validate, resetFields } = Form.useForm(formState);
    async function handleLock() {
      const values = (await validate()) as any;
      const password: string | undefined = values.password;
      closeModal();

      appStore.setLockInfo({
        isLock: true,
        pwd: password,
      });
      await resetFields();
    }

    const avatar = computed(() => {
      const { avatar } = userStore.getUserInfo;
      return avatar || avatarImg;
    });

    return {
      t,
      getNickName,
      avatar,
      formState,
      closeModal,
      handleLock,
    };
  },
});
</script>

<style lang="less">
.header-lock-modal {
  &__entry {
    position: relative;
    //height: 240px;
    padding: 130px 30px 30px;
    border-radius: 10px;
  }

  &__header {
    position: absolute;
    top: 0;
    left: calc(50% - 45px);
    width: auto;
    text-align: center;

    &-img {
      width: 70px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 5px;
    }
  }

  &__footer {
    text-align: center;
  }
}
</style>
