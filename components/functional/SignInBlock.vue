<template>
  <form class="sign-in" @submit.prevent="onSubmitHandler">
    <h1 class="sign-in__header">{{ $t('forms.signInSystem') }}</h1>
    <input-field
      v-model="inputModel.email"
      :label="$t('forms.insertEmail')"
      :placeholder="$t('placeholders.email')"
      :validation-error="errors.email"
      required
      @input="checkErrorsHandler"
    />
    <input-field
      v-model="inputModel.password"
      :label="$t('forms.insertPassword')"
      :placeholder="$t('placeholders.password')"
      :validation-error="errors.password"
      required
      type="password"
      @input="checkErrorsHandler"
    />
    <div class="sign-in__pass">
      <smart-link
        :to="{ name: 'account-password-recovery' }"
        class="sign-in__forget"
      >
        {{ $t('forms.forgotYourPassword') }}
      </smart-link>
    </div>
    <div class="sign-in__button">
      <button :disabled="!inputModel.isValid" class="sign-in__enter">
        {{ $t('forms.signIn') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, useRouter } from '@nuxtjs/composition-api';

  import inputField from '~/components/atoms/InputField.vue';
  import { SignInInputModel } from '~/models/input/SignIn';
  import SmartLink from '~/components/SmartLink.vue';
  import { formSetup } from '~/utils/setup/form';

  export default defineComponent({
    components: {
      SmartLink,
      inputField,
    },
    setup() {
      const router = useRouter();

      const { inputModel, errors, checkErrorsHandler, onSubmitHandler } =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formSetup(SignInInputModel, 'auth/signIn', () => {
          router.push({ name: 'index' });
        });

      return {
        inputModel,
        errors,
        checkErrorsHandler,
        onSubmitHandler,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';
  @import 'css/particles/header1';
  @import 'css/particles/button';

  .sign-in {
    width: 460px;

    &__header {
      @include header1();

      display: flex;
      justify-content: center;
      padding-bottom: 48px;
    }

    &__pass {
      display: flex;
      justify-content: flex-end;
    }

    &__forget {
      font-size: 12px;
      font-style: italic;
      font-family: 'Montserrat', sans-serif;
      color: #404d72;
      line-height: 15px;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: $color-secondary;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      padding-top: 48px;
    }

    &__enter {
      @include button(false);
    }
  }
</style>
