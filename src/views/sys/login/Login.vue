<template>
  <div class="login-page">
    <component :is="illustrationSvg" class="illustration animate__animated animate__bounceIn" />
    <div class="login-box">
      <img class="logo" src="@/assets/images/logo.png" />
      <h2>{{ title }}</h2>
      <Form class="p-4 enter-x" :model="formData" ref="formRef" @keypress.enter="handleLogin">
        <Form.Item name="account" class="enter-x">
          <Input
            size="large"
            v-model:value="formData.account"
            placeholder="账户"
            class="fix-auto-fill"
          />
        </Form.Item>
        <Form.Item name="password" class="enter-x">
          <Input.Password
            size="large"
            visibilityToggle
            v-model:value="formData.password"
            placeholder="密码"
          />
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
          <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
        </Form.Item>
        <Row class="enter-x">
          <Col :md="8" :xs="24">
            <Button block> 手机登录 </Button>
          </Col>
          <Col :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
            <Button block> 扫码登录 </Button>
          </Col>
          <Col :md="8" :xs="24">
            <Button block> 注册 </Button>
          </Col>
        </Row>

        <Divider class="enter-x">其他登录</Divider>

        <div class="flex justify-evenly enter-x">
          <GithubFilled />
          <WechatFilled />
          <AlipayCircleFilled />
          <GoogleCircleFilled />
          <TwitterCircleFilled />
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

const formData = reactive({
  account: 'vben',
  password: '123456',
});

async function handleLogin() {}
</script>

<style lang="less" scoped>
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
  }
}
</style>
