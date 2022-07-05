<template>
  <div class="page-account-login">
    <sign-in-block />
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    useContext,
    useMeta,
  } from '@nuxtjs/composition-api';

  import SignInBlock from '~/components/functional/SignInBlock.vue';

  export default defineComponent({
    components: { SignInBlock },
    setup() {
      const { i18n } = useContext();
      useMeta({ title: i18n.t('metaTitle.logIn').toString() });
    },
    head: {},
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .page-account-login {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }
</style>
