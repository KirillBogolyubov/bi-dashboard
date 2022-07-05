<template>
  <div
    class="toggle"
    :class="{ disabled }"
    @input="inputHandler"
    @click="inputHandler"
  >
    <div
      class="toggle__control"
      :class="value === true ? 'true' : value === false ? 'false' : 'none'"
    ></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  export default defineComponent({
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, context) {
      const inputHandler = () => {
        if (props.disabled) {
          return;
        }

        const v = !props.value;

        context.emit('update', v);
        context.emit('input', v);
        context.emit('change', v);
      };

      return {
        inputHandler,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';
  $toggle-width: 40px;
  $toggle-height: 20px;
  $toggle-controller-size: 16px;

  .toggle {
    background-color: $color-toggle-background;
    border: 2px solid $color-toggle-background;
    border-radius: 10px;
    display: flex;
    cursor: pointer;
    height: $toggle-height;
    position: relative;
    width: $toggle-width;

    &__control {
      background-color: $color-toggle-control;
      border-radius: 10px;
      position: absolute;
      height: $toggle-controller-size;
      transition: left 0.3s ease-in-out 0s;
      width: $toggle-controller-size;
    }
  }

  .false {
    left: 0;
    opacity: 0.5;
    transition: ease-in-out 0.3s;
  }

  .true {
    left: ($toggle-width - $toggle-controller-size) - 4px;
    opacity: 1;
    transition: ease-in-out 0.3s;
  }

  .none {
    left: (($toggle-width - $toggle-controller-size) / 2 - 2px);
  }

  .disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
</style>
