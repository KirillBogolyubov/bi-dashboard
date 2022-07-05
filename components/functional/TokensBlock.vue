<template>
  <div class="token-block">
    <page-block>
      <div class="token-block__header">{{ $t('tokens.headerText') }}</div>
      <div class="token-block__info">{{ $t('tokens.infoText') }}</div>
      <div class="token-block__table">
        <div class="token-block__button">
          <smart-link
            :to="{
              query: { ...$route.query },
              name: 'tokens-create',
            }"
            class="button"
          >
            {{ $t('tokens.buttonAdd') }}
          </smart-link>
          <button class="button" @click="deleteTokensHandler">
            {{ $t('tokens.buttonDelete') }}
          </button>
        </div>
        <table-block
          :headers="headers"
          :data="data"
          :selected-rows.sync="selectedRows"
        />
      </div>
      <smart-link to="" class="token-block__link">
        <img src="~/assets/icons/codeIcon.svg" alt="" />
        <div class="text">{{ $t('tokens.linkText') }}</div>
      </smart-link>
    </page-block>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    useAsync,
    useContext,
    useRoute,
    useRouter,
  } from '@nuxtjs/composition-api';

  import PageBlock from '~/components/molecules/PageBlock.vue';
  import TableBlock from '~/components/molecules/TableBlock.vue';
  import SmartLink from '~/components/SmartLink.vue';
  import { ProjectsRepository } from '~/repositories/ProjectsRepository';

  export default defineComponent({
    components: { SmartLink, TableBlock, PageBlock },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const { i18n } = useContext();

      const selectedRows = ref([]);

      const hideDeletedHandler = () =>
        router.push({
          query: {
            ...route.value.query,
            isDeleted: 'false',
          },
        });

      const data = useAsync(() =>
        ProjectsRepository.getInstance()
          .getList()
          .then((serviceToken) =>
            serviceToken.map((serviceToken) => ({
              id: serviceToken.id,
              name: serviceToken.name,
              diedAt: serviceToken.died_at,
              serviceToken: serviceToken.service_token,
            })),
          )
          .catch(() => []),
      );

      const headers = [
        { type: 'select', width: '10%' },
        {
          field: 'name',
          type: 'view',
          title: 'Название',
          select: 'id',
          width: '70%',
        },
        {
          field: 'deadline',
          type: 'view',
          title: 'Сроки',
          select: 'id',
          width: '30%',
        },
      ];

      const deleteTokensHandler = () => {
        if (confirm(i18n.t('tokens.isDeleteSelectedTokens').toString())) {
          const promises: Promise<void>[] = [];

          selectedRows.value.forEach((id) => {
            promises.push(ProjectsRepository.getInstance().delete(id));
          });

          selectedRows.value = [];

          Promise.all(promises);
        }
      };

      return {
        headers,
        selectedRows,
        data,
        hideDeletedHandler,
        deleteTokensHandler,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';
  @import 'css/particles/header1';
  @import 'css/particles/button';

  .token-block {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;

    &__header {
      @include header1();

      font-size: 30px;
      line-height: 34.71px;
      padding-bottom: 21.86px;
      text-align: center;
    }

    &__info {
      color: $color-white;
      font-weight: 400;
      font-size: 14px;
      line-height: 17.07px;
      padding-bottom: 43.27px;
      text-align: center;
    }

    &__table {
      background-color: $color-modal;
      border-radius: 10px;
      margin-bottom: 44.85px;
      padding: 20px 24px;
    }

    &__button {
      display: flex;
      justify-content: space-between;
      padding-bottom: 19.43px;

      .button {
        @include button();
      }
    }

    &__link {
      align-items: center;
      display: flex;
      width: fit-content;

      .text {
        color: $color-white;
        cursor: pointer;
        font-family: 'Play', sans-serif;
        font-size: 30px;
        line-height: 34.71px;
        padding-left: 20px;
        text-decoration: underline;
      }
    }
  }

  .table {
    width: 100%;
  }
</style>
