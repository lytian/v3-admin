<template>
  <Form ref="formRef" :model="formData" :rules="formRules" @keypress.enter="handleResetPassword">
    <Form.Item name="phone" :class="getLoginAnimation">
      <Input v-model:value="formData.phone" size="large" placeholder="手机号码" :maxlength="11">
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
          placeholder="短信验证码"
          :maxlength="4"
        >
          <template #addonBefore>
            <SafetyOutlined style="font-size: 1.25rem" />
          </template>
        </Input>
      </Form.Item>
      <Button size="large" class="flex-shrink ml-4">发送短信</Button>
    </div>
    <Form.Item name="password" :class="getLoginAnimation">
      <Input.Password
        v-model:value="formData.password"
        visibilityToggle
        size="large"
        placeholder="登录密码"
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
        placeholder="再次确认密码"
        :maxlength="20"
      >
        <template #addonBefore>
          <LockOutlined style="font-size: 1.25rem" />
        </template>
      </Input.Password>
    </Form.Item>

    <Form.Item :class="getLoginAnimation">
      <Button type="primary" size="large" block @click="handleResetPassword" :loading="loading">
        确定重置
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
import { PhoneOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useLoginState, getLoginAnimation } from '../useLogin';

const formRef = ref<FormInstance>();
const loading = ref(false);
const formData = reactive({
  phone: '',
  smsCode: '',
  password: '',
  confirmPassword: '',
});

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
  password: { required: true, message: '请输入登录密码', trigger: 'change' },
  confirmPassword: { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
};

const { handleBackLogin } = useLoginState();

async function handleResetPassword() {
  if (!(await formRef.value?.validate())) return;
  try {
    loading.value = true;
  } catch (error) {
    Message.error((error as unknown as Error).message || '重置密码失败');
  } finally {
    loading.value = false;
  }
}
</script>
