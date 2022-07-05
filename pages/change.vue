<template>
  <div class="page-account-password-change">
    <change-password-block />
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    useContext,
    useMeta,
  } from '@nuxtjs/composition-api';

  import ChangePasswordBlock from '~/components/functional/ChangePasswordBlock.vue';

  export default defineComponent({
    components: { ChangePasswordBlock },
    setup() {
      const { i18n } = useContext();
      useMeta({ title: i18n.t('metaTitle.changePassword').toString() });
    },
    head: {},
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .page-account-password-change {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }
</style>
