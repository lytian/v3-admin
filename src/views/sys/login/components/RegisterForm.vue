<template>
  <Form ref="formRef" :model="formData" :rules="formRules" @keypress.enter="handleRegister">
    <Form.Item name="account" :class="getLoginAnimation">
      <Input
        v-model:value="formData.account"
        size="large"
        :placeholder="t('sys.login.accountPlaceholder')"
        :maxlength="20"
      >
        <template #addonBefore>
          <UserOutlined style="font-size: 1.25rem" />
        </template>
      </Input>
    </Form.Item>
    <Form.Item name="phone" :class="getLoginAnimation">
      <Input
        v-model:value="formData.phone"
        size="large"
        :placeholder="t('sys.login.mobilePlaceholder')"
        :maxlength="11"
      >
        <template #addonBefore>
          <PhoneOutlined style="font-size: 1.25rem" />
        </template>
      </Input>
    </Form.Item>
    <div class="flex" :class="getLoginAnimation">
      <Form.Item name="smsCode">
        <Input
          v-model:value="formData.smsCode"
          size="large"
          :placeholder="t('sys.login.smsPlaceholder')"
          :maxlength="4"
        >
          <template #addonBefore>
            <SafetyOutlined style="font-size: 1.25rem" />
          </template>
        </Input>
      </Form.Item>
      <Button size="large" class="flex-shrink ml-4">{{ t('sys.login.smsCode') }}</Button>
    </div>
    <Form.Item name="password" :class="getLoginAnimation">
      <Input.Password
        v-model:value="formData.password"
        visibilityToggle
        size="large"
        :placeholder="t('sys.login.passwordPlaceholder')"
        :maxlength="20"
      >
        <template #addonBefore>
          <LockOutlined style="font-size: 1.25rem" />
        </template>
      </Input.Password>
    </Form.Item>
    <Form.Item name="confirmPassword" :class="getLoginAnimation">
      <Input.Password
        v-model:value="formData.confirmPassword"
        visibilityToggle
        size="large"
        :placeholder="t('sys.login.passwordPlaceholder')"
        :maxlength="20"
      >
        <template #addonBefore>
          <LockOutlined style="font-size: 1.25rem" />
        </template>
      </Input.Password>
    </Form.Item>
    <Form.Item :class="getLoginAnimation" name="policy">
      <Checkbox v-model:checked="formData.policy" size="small">
        {{ t('sys.login.policy') }}
      </Checkbox>
    </Form.Item>

    <Form.Item :class="getLoginAnimation">
      <Button type="primary" size="large" block @click="handleRegister" :loading="loading">
        {{ t('sys.login.registerButton') }}
      </Button>
    </Form.Item>
    <Form.Item :class="getLoginAnimation">
      <Button size="large" block @click="handleBackLogin"> {{ t('sys.login.backSignIn') }} </Button>
    </Form.Item>
  </Form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/lib/form/interface';
import { ref, reactive } from 'vue';
import { Form, Input, Button, message as Message, Checkbox } from 'ant-design-vue';
import { UserOutlined, PhoneOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useLoginState, getLoginAnimation } from '../useLogin';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const formRef = ref<FormInstance>();
const loading = ref(false);
const formData = reactive({
  account: '',
  phone: '',
  smsCode: '',
  password: '',
  confirmPassword: '',
  policy: false,
});
const validatePolicy = async (_, value: boolean) => {
  return !value ? Promise.reject('勾选后才能注册') : Promise.resolve();
};

const validateConfirmPassword = (password: string) => {
  return async (_, value: string) => {
    if (!value) {
      return Promise.reject('请再次输入登录密码');
    }
    if (value !== password) {
      return Promise.reject('两次输入密码不一致');
    }
    return Promise.resolve();
  };
};
const formRules: { [k: string]: Rule | Rule[] } = {
  phone: { required: true, message: '请输入登录账号', trigger: 'change' },
  smsCode: { required: true, message: '请输入图形验证码', trigger: 'change' },
  account: { required: true, message: '请输入登录账号', trigger: 'change' },
  password: { required: true, message: '请输入登录密码', trigger: 'change' },
  confirmPassword: { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
  policy: { validator: validatePolicy, trigger: 'change' },
};

const { handleBackLogin } = useLoginState();

async function handleRegister() {
  if (!(await formRef.value?.validate())) return;
  try {
    loading.value = true;
  } catch (error) {
    Message.error((error as unknown as Error).message || '注册失败');
  } finally {
    loading.value = false;
  }
}
</script>
