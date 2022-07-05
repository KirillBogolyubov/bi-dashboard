<template>
  <div class="layer" :class="{ active: isActive }" @click="changeActive">
    <div class="layer__title">{{ title }}</div>
    <count-indicator>
      <div>{{ count }}</div>
    </count-indicator>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  import CountIndicator from '~/components/atoms/CountIndicator.vue';

  export default defineComponent({
    components: { CountIndicator },
    props: {
      title: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },

    setup(_, context) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const changeActive = (e: Object) => {
        context.emit('click', e);
      };

      return {
        changeActive,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .layer {
    align-items: center;
    background-color: $color-dark-dark-blue;
    cursor: pointer;
    display: flex;
    height: 44.56px;
    padding-right: 10.31px;
    padding-left: 10.31px;
    width: fit-content;
    transition: background-color 0.3s 0s ease-in-out;

    &__title {
      color: $color-white;
      font-size: 16px;
      font-weight: 700;
      font-family: 'Play', sans-serif;
      line-height: 22.14px;
      padding-right: 11.73px;
    }

    &.active,
    &:hover {
      background-color: $color-dark-green-blue;
    }
  }
</style>
