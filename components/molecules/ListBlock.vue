<template>
  <table class="table">
    <thead class="table__head">
      <tr class="table__row">
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="table__hell"
          :class="{ table__checkbox: header.type === 'select' }"
          :width="header.width || 'auto'"
        >
          <sortbox
            v-if="header.type === 'view-sort'"
            :value="sortDirection(header.field)"
            class="table__cell-icon"
            @input="(value) => setSortDirection(header.field, value)"
          />
          <template v-if="header.type.match(/view/)">
            {{ header.title }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="data && data.length === 0" class="table__row">
        <td class="table__cell table__empty" :colspan="headers.length">
          {{ $t('table.empty') }}
        </td>
      </tr>
      <template v-for="(record, index) in data">
        <transition :key="record.id || index" name="row" appear duration="300">
          <tr class="table__row">
            <td
              v-for="(header, jndex) in headers"
              :key="jndex"
              class="table__cell"
              :class="{ table__checkbox: header.type === 'select' }"
              :style="{ padding: header.padding }"
              @click="
                () =>
                  header.select ? $emit('click', record[header.select]) : ''
              "
            >
              <div>
                <template v-if="header.type.match(/view/)">
                  {{ record[header.field] }}
                </template>
              </div>
            </td>
          </tr>
        </transition>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  // import Checkbox from '~/components/atoms/Checkbox.vue';
  import Sortbox from '~/components/atoms/Sortbox.vue';

  export default defineComponent({
    components: {
      Sortbox,
      // Checkbox,
    },
    props: {
      headers: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      sortRule: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props, context) {
      const sortDirection = (field: string) => {
        if (!props.sortRule.field || props.sortRule.field !== field) {
          return null;
        }

        return props.sortRule.direction;
      };

      const setSortDirection = (field: string, direction: string) => {
        context.emit('update:sortRule', { field, direction });
      };

      return {
        sortDirection,
        setSortDirection,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .width {
    min-width: 180px;
  }

  tbody {
    tr:nth-child(odd) {
      background-color: $color-sidebar;
    }

    tr:nth-child(even) {
      background-color: #18223d;
    }
  }

  .table {
    border-collapse: collapse;
    color: $color-white;
    font-size: 16px;
    line-height: 22px;

    &__row {
      display: table-row;
    }

    &__hell,
    &__cell {
      cursor: pointer;
      font-weight: 400;
      padding: 30px 15px 5px;
      position: relative;
      text-align: left;
      min-width: 80px;

      ::v-deep a {
        color: $color-white;
      }

      &-icon {
        position: absolute;
        top: 11px;
      }
    }

    &__cell {
      padding: 9px 15px;
    }

    &__empty {
      text-align: center;
      vertical-align: center;
      color: $color-white;
      text-transform: lowercase;
      padding: 40px 0;
    }

    &__checkbox {
      align-items: center;
      text-align: center;
      justify-content: center;
      padding: unset;
    }
  }
</style>
