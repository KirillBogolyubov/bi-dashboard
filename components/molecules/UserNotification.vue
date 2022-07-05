<template>
  <smart-link
    class="notification"
    :class="{ notification__ready: isRead }"
    @click="changeRead"
  >
    <div class="notification__content">
      <div class="notification__marker-container">
        <div v-if="!isRead" class="notification__content-marker"></div>
      </div>
      <div class="notification__content-icon">
        <icon-notification-access v-if="type === 'access'" />
        <icon-notification-error v-if="type === 'error'" />
        <icon-notification-notify v-if="type === 'notify'" />
        <icon-notification-task v-if="type === 'task'" />
      </div>
      <div class="notification__content-title">
        {{ title }}
      </div>
      <!--      <icon-notification-close class="notification__content-close" />-->
    </div>
    <div class="notification__datenow">
      <div
        v-for="(item, index) in happenedAt"
        :key="index"
        class="notification__datenow-date"
      >
        {{ item }}
      </div>
    </div>
  </smart-link>
</template>

<script lang="ts">
  import { defineComponent, Ref, ref } from '@nuxtjs/composition-api';

  import SmartLink from '~/components/SmartLink.vue';
  import IconNotificationAccess from '~/components/icons/iconNotificationAccess.vue';
  import IconNotificationError from '~/components/icons/iconNotificationError.vue';
  import IconNotificationNotify from '~/components/icons/iconNotificationNotify.vue';
  import IconNotificationTask from '~/components/icons/iconNotificationTask.vue';
  import IconNotificationClose from '~/components/icons/iconNotificationClose.vue';

  export default defineComponent({
    components: {
      // IconNotificationClose,
      IconNotificationTask,
      IconNotificationNotify,
      IconNotificationError,
      IconNotificationAccess,
      SmartLink,
    },
    props: {
      isRead: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String, // access, error, notify, task
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      happenedAt: {
        type: Array,
        required: true,
      },
    },

    setup(_, context) {
      const changeRead = () => {
        context.emit('click');
      };

      return {
        changeRead,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings';

  .notification {
    border: 1px solid #3e4c74;
    background-color: #2d3b62;
    cursor: pointer;
    transition: ease-in-out 0.2s;
    height: 123px;
    width: 100%;

    &__ready {
      background-color: $color-sidebar;
    }

    &:hover {
      background-color: #1e2d55;
      transition: background-color 0.3s 0s ease-in-out;
    }

    &__marker {
      &-container {
        width: 20px;
        height: 20px;
        align-items: center;
        align-self: center;
        display: flex;
      }
    }

    &__content {
      margin: 25px;
      display: flex;
      position: relative;

      &-title {
        display: flex;
        align-items: center;
        color: $color-white;
        font-size: 16px;
        line-height: 19.5px;
        font-weight: 400;
      }

      &-marker {
        background-color: $color-secondary;
        border-radius: 50%;
        height: 10.65px;
        width: 10.65px;
      }

      &-icon {
        align-items: center;
        display: flex;
        padding-left: 10px;
        padding-right: 18px;
      }

      &-close {
        position: absolute;
        right: 0;
      }
    }

    &__datenow {
      color: $color-white;
      display: flex;
      padding-left: 100px;
      font-size: 12px;
      line-height: 14.63px;
      font-weight: 400;

      &-date {
        &:first-child {
          padding-right: 21.54px;
        }

        &:last-child {
          border-left: 1px solid $color-white;
          padding-left: 12.75px;
        }
      }
    }
  }
</style>
