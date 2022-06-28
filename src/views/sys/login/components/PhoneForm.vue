<template>
  <Form ref="formRef" :model="formData" :rules="formRules" @keypress.enter="handleLogin">
    <Form.Item name="phone" :class="getLoginAnimation">
      <Input v-model:value="formData.phone" size="large" placeholder="手机号码" :maxlength="11">
        <template #addonBefore>
          <PhoneOutlined style="font-size: 1.25rem" />
        </template>
      </Input>
    </Form.Item>
    <Form.Item name="smsCode" :class="getLoginAnimation">
      <Input v-model:value="formData.smsCode" size="large" placeholder="图形验证码" :maxlength="4">
        <template #addonBefore>
          <SafetyOutlined style="font-size: 1.25rem" />
        </template>
        <template #addonAfter>
          <Captcha v-model:code="captchaCode" :height="38" />
        </template>
      </Input>
    </Form.Item>

    <Form.Item :class="getLoginAnimation">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        登录
      </Button>
    </Form.Item>
    <Form.Item :class="getLoginAnimation">
      <Button size="large" block @click="handleBackLogin"> 返回 </Button>
    </Form.Item>
  </Form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/lib/form/interface';
import { ref, reactive } from 'vue';
import { Form, Input, Button, message as Message } from 'ant-design-vue';
import { PhoneOutlined, SafetyOutlined } from '@ant-design/icons-vue';
import Captcha from '@/components/Captcha/index.vue';
import { useLoginState, getLoginAnimation } from '../useLogin';

const formRef = ref<FormInstance>();
const loading = ref(false);

const captchaCode = ref('');
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
  if (!(await formRef.value?.validate())) return;
  try {
    loading.value = true;
  } catch (error) {
    Message.error((error as unknown as Error).message || '登录失败');
  } finally {
    loading.value = false;
  }
}
</script>
