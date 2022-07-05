<template>
  <div class="new-token-block">
    <modal-window @close="$router.push({ ...$route, name: 'tokens' })">
      <h1 class="header">{{ $t('tokens.createText') }}</h1>
      <form class="input-block">
        <input-field type="text" :label="$t('tokens.labelText')" value />
        <input-field type="date" :label="$t('tokens.labelDate')" value />
        <div class="button-block">
          <smart-link class="button">
            {{ $t('tokens.buttonCancel') }}
          </smart-link>
          <smart-link class="button">{{ $t('tokens.buttonSave') }}</smart-link>
        </div>
      </form>
    </modal-window>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  import ModalWindow from '~/components/molecules/ModalWindow.vue';
  import InputField from '~/components/atoms/InputField.vue';
  import SmartLink from '~/components/SmartLink.vue';

  export default defineComponent({
    components: { SmartLink, InputField, ModalWindow },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';
  @import 'css/particles/header1';
  @import 'css/particles/button';

  .input-block {
    display: flex;
    flex-direction: column;
  }

  .button-block {
    align-self: center;
    display: flex;
    justify-content: space-between;
    padding-top: 47.79px;
    padding-bottom: 20px;
    width: 45%;

    .button {
      @include button($primary: false);
    }
  }

  .input {
    align-self: center;
    width: 350px;
  }

  .header {
    @include header1();

    padding-bottom: 50px;
    text-align: center;
  }
</style>
