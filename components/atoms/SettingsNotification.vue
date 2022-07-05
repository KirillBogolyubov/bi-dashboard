<template>
  <tr class="setting">
    <td class="setting__title">{{ $t(`userNotification.${title}`) }}</td>
    <td class="setting__toggle">
      <toggle-notification
        v-if="isEditable || types.includes('emailNotification')"
        :value="types.includes('emailNotification')"
        :disabled="!isEditable"
        @update="toggleHandler(title, 'emailNotification')"
      />
    </td>
    <td class="setting__toggle">
      <toggle-notification
        v-if="isEditable || types.includes('inAppNotification')"
        :value="types.includes('inAppNotification')"
        :disabled="!isEditable"
        @update="toggleHandler(title, 'inAppNotification')"
      />
    </td>
    <!--    <td class="setting__toggle">-->
    <!--      <toggle-notification-->
    <!--        v-if="isEditable || types.includes('wsNotification')"-->
    <!--        :value="types.includes('wsNotification')"-->
    <!--        :disabled="!isEditable"-->
    <!--        @update="toggleHandler(title, 'wsNotification')"-->
    <!--      />-->
    <!--    </td>-->
  </tr>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  import ToggleNotification from '~/components/atoms/ToggleNotification.vue';
  import { NotificationSettingsRepository } from '~/repositories/NotificationSettingsRepository';

  export default defineComponent({
    components: { ToggleNotification },
    props: {
      title: {
        type: String,
        required: true,
      },
      types: {
        type: Array,
        default: () => [],
      },
      isEditable: {
        type: Boolean,
        default: false,
      },
    },
    setup(_, context) {
      const toggleHandler = (name: string, type: string) => {
        NotificationSettingsRepository.getInstance()
          .update(name, type)
          .then(() => {
            context.emit('update');
            context.emit('input');
            context.emit('change');
          });
      };

      return {
        toggleHandler,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings.scss';

  .setting {
    &__title {
      color: $color-white;
      font-size: 16px;
      line-height: 20px;
      padding-bottom: 15px;
    }

    &__toggle {
      width: 330px;
      align-items: center;
      text-align: center;

      &::v-deep > * {
        margin: auto;
      }
    }
  }
</style>
