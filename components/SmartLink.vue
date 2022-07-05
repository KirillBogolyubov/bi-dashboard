<template>
  <div
    :is="component"
    class="smart-link"
    :to="componentTo"
    :href="componentHref"
    :target="componentTarget"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, SetupContext } from '@nuxtjs/composition-api';

  export default defineComponent({
    name: 'SmartLink',
    props: {
      to: {
        type: [String, Object],
        default: undefined,
      },
      target: {
        type: [String],
        default: undefined,
      },
      defaultTag: {
        type: [String],
        default: 'div',
      },
    },
    setup(props, context: SetupContext) {
      let component = props.defaultTag;

      // eslint-disable-next-line @typescript-eslint/ban-types
      const to: undefined | Object | string = props.to;

      if (to) {
        component = 'nuxt-link';
      }

      if (typeof to === 'string') {
        if (to[0] !== '/') {
          component = 'a';
        }
      }

      let componentHref;

      if (to !== undefined) {
        switch (typeof to) {
          case 'string':
            componentHref = to;
            break;
          default:
            componentHref = undefined;
        }
      }

      // eslint-disable-next-line @typescript-eslint/ban-types
      let componentTo: undefined | Object | string;

      if (to) {
        switch (typeof to) {
          case 'string':
            componentTo = to;
            break;
          case 'object':
            componentTo = to;
            break;
          default:
            componentTo = undefined;
        }
      }

      let componentTarget: undefined | string;

      if (componentTo !== undefined) {
        componentTarget = '_self';

        if (typeof componentTo === 'string') {
          componentTarget = '_blank';

          if (componentTo[0] === '/' && componentTo[1] !== '/') {
            componentTarget = '_self';
          }

          // if (
          //   componentTo[0] === 'h' &&
          //   componentTo[1] !== 't' &&
          //   componentTo[2] === 't' &&
          //   componentTo[3] !== 'p'
          // ) {
          //   componentTarget = '_blank'
          // }
        }
      }

      if (props.target !== undefined) {
        componentTarget = props.target;
      }

      // eslint-disable-next-line @typescript-eslint/ban-types
      const handleClick = (e: Object) => {
        context.emit('click', e);
      };

      return {
        component,
        componentHref,
        componentTarget,
        componentTo,
        handleClick,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .smart-link {
    text-decoration: none;
  }
</style>
