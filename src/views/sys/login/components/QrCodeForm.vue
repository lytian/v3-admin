<template>
  <QrCode :value="qrCodeUrl" class="flex justify-center" :class="getLoginAnimation" :width="280" />
  <Divider :class="getLoginAnimation">扫码后点击"确认"，即可完成登录</Divider>
  <Button size="large" block :class="getLoginAnimation" @click="handleBackLogin"> 返回 </Button>
</template>
<script lang="ts" setup>
import { Button, Divider } from 'ant-design-vue';
import { QrCode } from '@/components/Qrcode/index';
import { useLoginState, getLoginAnimation } from '../useLogin';

const qrCodeUrl = 'https://www.baidu.com';

const { handleBackLogin } = useLoginState();
</script>
