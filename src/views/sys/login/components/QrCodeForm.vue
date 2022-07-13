<template>
  <QrCode :value="qrCodeUrl" class="flex justify-center" :class="getLoginAnimation" :width="280" />
  <Divider :class="getLoginAnimation">{{ t('sys.login.scanSign') }}</Divider>
  <Button size="large" block :class="getLoginAnimation" @click="handleBackLogin">
    {{ t('sys.login.backSignIn') }}
  </Button>
</template>
<script lang="ts" setup>
import { Button, Divider } from 'ant-design-vue';
import { QrCode } from '@/components/Qrcode/index';
import { useLoginState, getLoginAnimation } from '../useLogin';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const qrCodeUrl = 'https://www.baidu.com';

const { handleBackLogin } = useLoginState();
</script>
