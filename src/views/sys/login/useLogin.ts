import { ref, computed } from 'vue';

export enum LoginStateEnum {
  LOGIN,
  RESET_PASSWORD,
  PHONE,
  QR_CODE,
  REGISTER,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export const getLoginAnimation = computed(() => 'enter-left');
