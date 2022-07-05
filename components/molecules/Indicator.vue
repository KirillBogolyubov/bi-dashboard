<template>
  <tr
    class="indicator"
    :class="{
      primary: status === 'primary',
      secondary: status === 'secondary',
      disable: isDisable,
    }"
  >
    <slot />
  </tr>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  export default defineComponent({
    props: {
      status: {
        type: String, // primary || secondary
        required: true,
      },
      isDisable: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .indicator {
    //height: 96.31px;
    position: relative;
    border: none;
    //width: 100%;
  }

  .primary {
    background-color: $color-dark-blue;
  }

  .secondary {
    background-color: $color-indicator;
  }

  .disable {
    background-color: $color-indicator;
    height: 100%;
    position: absolute;
    opacity: 0.5;
    width: 100%;
  }
</style>
