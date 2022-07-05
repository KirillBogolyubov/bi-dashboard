<template>
  <div class="page-rating">
    <top-bar-block>
      <input-field slot="left" type="search" label="" value />
      <div slot="right" class="action">
        <download-list-block :action="() => {}" />
      </div>
    </top-bar-block>
    <page-block class="rating-block">
      <list-block
        class="rating-block__table"
        :headers="headers"
        :data="data.rating"
        :sort-rule.sync="sortRule"
      />
      <pagination
        :current-page="pagination.currentPage"
        :total-pages="data.totalPages"
      />
    </page-block>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    ComputedRef,
    defineComponent,
    useAsync,
    useRoute,
    useRouter,
  } from '@nuxtjs/composition-api';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { camelCaseToSnakeCase } from 'camelcase-to-snakecase';

  import TopBarBlock from '~/components/blocks/TopBarBlock.vue';
  import InputField from '~/components/atoms/InputField.vue';
  import PageBlock from '~/components/molecules/PageBlock.vue';
  import ListBlock from '~/components/molecules/ListBlock.vue';
  import Pagination from '~/components/atoms/Pagination.vue';
  import { RatingRepository } from '~/repositories/RatingRepository';
  import DownloadListBlock from '~/components/functional/DownloadListBlock.vue';
  import { SortParams } from '~/repositories/requests/Sort';
  import { PaginationParams } from '~/repositories/requests/Pagination';
  import { RatingModel } from '~/models/Rating';

  export default defineComponent({
    components: {
      DownloadListBlock,
      Pagination,
      ListBlock,
      PageBlock,
      InputField,
      TopBarBlock,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();

      const sortRule = computed({
        get: () => ({
          field: route.value.query.sortField || 'id',
          direction: route.value.query.sortDirection || 'ASC',
        }),
        set: (value) => {
          router.push({
            query: {
              ...route.value.query,
              sortField: value.field,
              sortDirection: value.direction,
            },
          });
        },
      });

      const pagination: ComputedRef<PaginationParams> = computed(() => ({
        perPage: 15,
        currentPage: parseInt(
          route.value.query ? (route.value.query.page as string) || '1' : '1',
        ),
      }));

      const headers = [
        {
          field: 'id',
          type: 'view',
          title: '',
          padding: '9px 15px 9px 50px',
          width: '130px',
        },
        {
          field: 'title',
          type: 'view',
          title: '',
        },
        {
          field: 'count',
          type: 'view-sort',
          title: '',
          width: '150px',
        },
      ];

      const loadData = () => {
        const sort: SortParams = {};
        sort[camelCaseToSnakeCase(sortRule.value.field)] =
          sortRule.value.direction === 'ASC' ? 'ASC' : 'DESC';

        return RatingRepository.getInstance()
          .getPage(sort, pagination.value)
          .then((response) => {
            return Promise.resolve({
              rating: response.data.map((d) => new RatingModel(d)),
              totalPages: response.meta.pages_count,
            });
          })
          .catch(() =>
            Promise.resolve({
              rating: [] as RatingModel[],
              totalPages: 0,
            }),
          );
      };

      const data = useAsync(() => loadData());

      return {
        data,
        headers,
        pagination,
        sortRule,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings.scss';

  .action {
    color: $color-white;
  }

  .rating-block {
    &__table {
      width: 100%;
    }
  }

  .page-rating {
    padding-top: 90px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .page-block {
    padding: 20px 0;
  }
</style>
