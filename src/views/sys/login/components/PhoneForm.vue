<template>
  <Form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    class="mt-10!"
    @keypress.enter="handleLogin"
  >
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

    <Form.Item :class="getLoginAnimation">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
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
import { ref, reactive, unref } from 'vue';
import { Form, Input, Button } from 'ant-design-vue';
import { PhoneOutlined, SafetyOutlined } from '@ant-design/icons-vue';
import { useLoginState, getLoginAnimation } from '../useLogin';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const formRef = ref<FormInstance>();
const loading = ref(false);
const formData = reactive({
  phone: '',
  smsCode: '',
});
const formRules: { [k: string]: Rule | Rule[] } = {
  phone: { required: true, message: '请输入登录账号', trigger: 'change' },
  smsCode: { required: true, message: '请输入图形验证码', trigger: 'change' },
};

const { handleBackLogin } = useLoginState();

async function handleLogin() {
  try {
    if (!(await unref(formRef)?.validate())) return;
    loading.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>
