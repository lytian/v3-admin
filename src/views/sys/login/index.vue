<template>
  <div class="login-page">
    <component :is="illustrationSvg" class="illustration" />
    <div class="login-box">
      <DarkModeToggle />
      <img class="login-box__logo" :class="getLoginAnimation" src="@/assets/images/logo.png" />
      <h2 class="login-box__title" :class="getLoginAnimation">{{ title }}</h2>

      <LoginForm v-if="getLoginState === LoginStateEnum.LOGIN" />
      <PhoneForm v-else-if="getLoginState === LoginStateEnum.PHONE" />
      <QrCodeForm v-else-if="getLoginState === LoginStateEnum.QR_CODE" />
      <RegisterForm v-else-if="getLoginState === LoginStateEnum.REGISTER" />
      <ForgetPasswordForm v-else-if="getLoginState === LoginStateEnum.RESET_PASSWORD" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import illustration0 from '@/assets/svg/login-illustration0.svg?component';
import illustration1 from '@/assets/svg/login-illustration1.svg?component';
import illustration2 from '@/assets/svg/login-illustration2.svg?component';
import illustration3 from '@/assets/svg/login-illustration3.svg?component';
import illustration4 from '@/assets/svg/login-illustration4.svg?component';
import illustration5 from '@/assets/svg/login-illustration5.svg?component';
import illustration6 from '@/assets/svg/login-illustration6.svg?component';
import { LoginStateEnum, useLoginState, getLoginAnimation } from './useLogin';
import DarkModeToggle from '@/components/Application/DarkModeToggle.vue';
import LoginForm from './components/LoginForm.vue';
import PhoneForm from './components/PhoneForm.vue';
import QrCodeForm from './components/QrCodeForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import ForgetPasswordForm from './components/ForgetPasswordForm.vue';

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

const title = import.meta.env.VITE_APP_TITLE;
const { getLoginState } = useLoginState();
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

    &__logo {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      display: block;
    }

    &__title {
      margin: 15px 0;
      color: #999;
      font: 700 200% Consolas, Monaco, monospace;
      text-align: center;
      margin-top: 0;
    }

    .ant-input-group-addon:last-child {
      padding: 0;
    }

    .sign-in-way {
      display: flex;
      justify-content: space-evenly;

      .anticon {
        font-size: 20px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
}
</style>
