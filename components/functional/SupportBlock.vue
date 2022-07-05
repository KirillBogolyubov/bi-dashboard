<template>
  <form @submit.prevent="onSubmitHandler" class="support">
    <h1 class="support__header">{{ $t(`support.header`) }}</h1>
    <div class="support__area">
      <input-field
        v-model="inputModel.name"
        :validation-error="errors.name"
        :label="$t('fields.firstName')"
        is-required
        placeholder=""
        @input="checkErrorsHandler"
      />
      <input-field
        v-model="inputModel.email"
        :validation-error="errors.email"
        :label="$t('fields.email')"
        is-required
        placeholder=""
        @input="checkErrorsHandler"
      />
      <input-field
        v-model="inputModel.content"
        :validation-error="errors.content"
        :label="$t('fields.support')"
        type="text"
        is-area
        is-required
        placeholder=""
        @input="checkErrorsHandler"
      />
    </div>
    <div class="support__info">
      <div class="support__info-block">
        <div class="support__info-text">{{ $t(`support.emailText`) }}</div>
        <smart-link
          class="support__info-link"
          :to="'mailto:' + $t(`support.email`)"
        >
          {{ $t(`support.email`) }}
        </smart-link>
      </div>
      <div class="support__info-block">
        <div class="support__info-text">{{ $t(`support.phoneText`) }}</div>
        <smart-link
          class="support__info-link"
          :to="'tel:' + $t(`support.phoneNumber`)"
        >
          {{ $t(`support.phoneNumber`) }}
        </smart-link>
      </div>
    </div>
    <button
      :disabled="!inputModel.isValid"
      type="submit"
      class="support__button"
    >
      {{ $t(`support.button`) }}
    </button>
  </form>
</template>
<script lang="ts">
  import {
    defineComponent,
    useRoute,
    useRouter,
  } from '@nuxtjs/composition-api';

  import SmartLink from '~/components/SmartLink.vue';
  import InputField from '~/components/atoms/InputField.vue';
  import { formSetup } from '~/utils/setup/form';
  import { SupportInputModel } from '~/models/input/Support';

  export default defineComponent({
    components: {
      InputField,
      SmartLink,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();

      const { inputModel, errors, checkErrorsHandler, onSubmitHandler } =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formSetup(SupportInputModel, `support/create`, () => {
          router.push({ ...route.value, name: 'index' });
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

  .support {
    display: flex;
    flex-direction: column;

    &__header {
      @include header1();
    }

    &__area {
      display: flex;
      flex-direction: column;
      padding-top: 50px;
    }

    &__info {
      justify-content: flex-start;
      display: flex;
      width: 100%;
      flex-direction: column;
      padding-top: 32px;
      color: $color-white;
      padding-bottom: 60px;

      &-block {
        display: flex;
        padding-bottom: 5px;
        font-size: 14px;
      }

      &-text {
        padding-right: 5px;
      }

      &-link {
        cursor: pointer;

        &:hover {
          color: $color-secondary;
        }
      }
    }

    ::v-deep a {
      color: $color-white;
    }

    &__button {
      @include button();
    }
  }
</style>
