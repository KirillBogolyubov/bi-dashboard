<template>
  <div class="page-account-password-reset">
    <password-recovery-block type="recoveryPassword" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  import PasswordRecoveryBlock from '~/components/functional/PasswordRecoveryBlock.vue';

  export default defineComponent({
    components: { PasswordRecoveryBlock },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .page-account-password-reset {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }
</style>
