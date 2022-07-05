<template>
  <div id="nav-icon1" class="icon" @click="isFilter">
    <span :class="filter ? 'span1' : 'span1-active'"></span>
    <span class="span2"></span>
    <span :class="filter ? 'span3' : 'span3-active'"></span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, ref } from '@nuxtjs/composition-api';

  export default defineComponent({
    setup() {
      const filter: Ref<boolean> = ref(false);

      const isFilter = () => {
        filter.value = !filter.value;
      };

      return {
        filter,
        isFilter,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .icon {
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
  }

  .span1 {
    top: 0;
    width: 6px;
  }

  .span2 {
    top: 5px;
    width: 9px;
  }

  .span3 {
    top: 10px;
    width: 12px;
  }

  span {
    display: block;
    position: absolute;
    height: 2px;
    background: $color-secondary;
    border-radius: 9px;
    left: 0;
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  .span1-active {
    top: 0;
    width: 12px;
  }

  .span3-active {
    top: 10px;
    width: 6px;
  }
</style>
