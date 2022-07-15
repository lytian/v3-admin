<template>
  <Form ref="formRef" :model="formData" :rules="formRules" @keypress.enter="handleLogin">
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
    <Form.Item name="code" :class="getLoginAnimation">
      <Input
        v-model:value="formData.code"
        size="large"
        :placeholder="t('sys.login.smsPlaceholder')"
        :maxlength="4"
      >
        <template #addonBefore>
          <SafetyOutlined style="font-size: 1.25rem" />
        </template>
        <template #addonAfter>
          <img class="code-img" :src="captchaCode" @click="getCaptcha()" />
        </template>
      </Input>
    </Form.Item>

    <Row :class="getLoginAnimation">
      <Col :span="12">
        <Checkbox v-model:checked="rememberMe" size="small">
          {{ t('sys.login.rememberMe') }}
        </Checkbox>
      </Col>
      <Col :span="12" class="text-right mb-2">
        <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
          {{ t('sys.login.forgetPassword') }}
        </Button>
      </Col>
    </Row>

    <Form.Item :class="getLoginAnimation">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
    </Form.Item>
    <Row :class="getLoginAnimation" :gutter="16">
      <Col :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.PHONE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </Col>
      <Col :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </Col>
      <Col :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </Col>
    </Row>

    <Divider class="mt-16!" :class="getLoginAnimation">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="sign-in-way" :class="getLoginAnimation">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
    </div>
  </Form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/lib/form/interface';
import { ref, reactive, unref, onMounted } from 'vue';
import { Checkbox, Form, Input, Button, Row, Col, Divider } from 'ant-design-vue';
import {
  UserOutlined,
  LockOutlined,
  SafetyOutlined,
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
} from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
// import Captcha from '@/components/Captcha/index.vue';
import { LoginStateEnum, useLoginState, getLoginAnimation } from '../useLogin';
import { useI18n } from 'vue-i18n';
import request from '@/utils/request';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const formRef = ref<FormInstance>();
const loading = ref(false);
const rememberMe = ref(false);

const captchaCode = ref('');
const formData = reactive({
  account: '',
  password: '',
  key: null,
  code: '',
});
const formRules: { [k: string]: Rule | Rule[] } = {
  account: { required: true, message: '请输入登录账号', trigger: 'change' },
  password: { required: true, message: '请输入登录密码', trigger: 'change' },
  code: { required: true, message: '请输入图形验证码', trigger: 'change' },
};

const { setLoginState } = useLoginState();

const { setToken } = useUserStore();
const router = useRouter();

function getCaptcha() {
  request.get('/oapi/captcha/generateCaptcha').then((res) => {
    formData.key = res.data.key;
    captchaCode.value = res.data.image;
  });
}

async function handleLogin() {
  try {
    if (!(await unref(formRef)?.validate())) return;
    loading.value = true;
    const res: any = await request.post('/auth/login', formData);
    if (res.data) {
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${res.data.userInfo.username}`,
        duration: 3,
      });
      setToken(res.data.token);
      router.push('/dashboard');
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getCaptcha();
});
</script>
