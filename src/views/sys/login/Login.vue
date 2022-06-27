<template>
  <div class="login-page">
    <component :is="illustrationSvg" class="illustration animate__animated animate__bounceIn" />
    <div class="login-box">
      <img class="logo enter-x" src="@/assets/images/logo.png" />
      <h2 class="title enter-x">{{ title }}</h2>
      <Form :model="formData" ref="formRef" @keypress.enter="handleLogin">
        <Form.Item name="account" class="enter-x">
          <Input v-model:value="formData.account" size="large" placeholder="登录账号">
            <template #addonBefore>
              <UserOutlined style="font-size: 1.25rem" />
            </template>
          </Input>
        </Form.Item>
        <Form.Item name="password" class="enter-x">
          <Input.Password
            v-model:value="formData.password"
            visibilityToggle
            size="large"
            placeholder="登录密码"
          >
            <template #addonBefore>
              <LockOutlined style="font-size: 1.25rem" />
            </template>
          </Input.Password>
        </Form.Item>
        <Form.Item name="code" class="enter-x">
          <Input v-model:value="formData.code" size="large" placeholder="图形验证码">
            <template #addonBefore>
              <SafetyOutlined style="font-size: 1.25rem" />
            </template>
            <template #addonAfter>
              <Captcha v-model:code="captchaCode" :height="38" />
            </template>
          </Input>
        </Form.Item>

        <Row class="enter-x">
          <Col :span="12">
            <Form.Item>
              <Checkbox v-model:checked="rememberMe" size="small"> 记住密码 </Checkbox>
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item :style="{ 'text-align': 'right' }">
              <Button type="link" size="small"> 忘记密码？ </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item class="enter-x">
          <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
            登录
          </Button>
        </Form.Item>
        <Row class="enter-x" :gutter="16">
          <Col :md="8" :xs="24">
            <Button block size="middle"> 手机登录 </Button>
          </Col>
          <Col :md="8" :xs="24">
            <Button block size="middle"> 扫码登录 </Button>
          </Col>
          <Col :md="8" :xs="24">
            <Button block size="middle"> 注册 </Button>
          </Col>
        </Row>

        <Divider class="enter-x mt-10!">其他登录</Divider>

        <div class="other-login enter-x">
          <GithubFilled />
          <WechatFilled />
          <AlipayCircleFilled />
          <GoogleCircleFilled />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import illustration0 from '@/assets/svg/login-illustration0.svg?component';
import illustration1 from '@/assets/svg/login-illustration1.svg?component';
import illustration2 from '@/assets/svg/login-illustration2.svg?component';
import illustration3 from '@/assets/svg/login-illustration3.svg?component';
import illustration4 from '@/assets/svg/login-illustration4.svg?component';
import illustration5 from '@/assets/svg/login-illustration5.svg?component';
import illustration6 from '@/assets/svg/login-illustration6.svg?component';
import { useGlobSetting } from '@/utils/setting';
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
import Captcha from '@/components/Captcha/index.vue';

/* Show a different background every day */
const illustrationSvg = computed(() => {
  switch (new Date().getDay()) {
    case 0:
      return illustration0;
    case 1:
      return illustration1;
    case 2:
      return illustration2;
    case 3:
      return illustration3;
    case 4:
      return illustration4;
    case 5:
      return illustration5;
    case 6:
      return illustration6;
    default:
      return illustration4;
  }
});

const { title } = useGlobSetting();
const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const captchaCode = ref('');
const formData = reactive({
  account: 'vben',
  password: '123456',
  code: '',
});

async function handleLogin() {}
</script>

<style lang="less">
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/login-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // padding: 0 2rem;
  box-sizing: border-box;

  .illustration {
    width: 500px;
  }

  .login-box {
    width: 360px;

    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      display: block;
    }

    .title {
      margin: 15px 0;
      color: #999;
      font: 700 200% Consolas, Monaco, monospace;
      text-align: center;
      margin-top: 0;
    }

    .ant-input-group-addon:last-child {
      padding: 0;
    }

    .other-login {
      display: flex;
      justify-content: space-evenly;

      .anticon {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>
