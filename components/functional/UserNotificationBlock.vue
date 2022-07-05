<template>
  <div class="page-notification" :class="{ active: activeSettings }">
    <top-bar-block :class="{ topbar: activeSettings }">
      <button slot="left" class="page-notification__button">
        {{ $t('userNotification.button') }}
      </button>
      <div slot="right" class="action" @click="changeActiveSettings">
        <icon-settings class="page-notification__icon" />
      </div>
    </top-bar-block>
    <transition name="row">
      <div v-if="activeSettings" class="page-notification__settings">
        <table class="content">
          <tr class="instruction">
            <td>{{ ' ' }}</td>
            <td class="instruction__text">
              {{ $t('userNotification.isEmailNotification') }}
            </td>
            <td class="instruction__text">
              {{ $t('userNotification.isInAppNotification') }}
            </td>
            <!--            <td class="instruction__text">-->
            <!--              {{ $t('userNotification.isWsNotification') }}-->
            <!--            </td>-->
          </tr>
          <tr>
            <td class="system" colspan="4">
              <img src="../../assets/icons/settingsBell.svg" alt="" />
              <div class="system__text">
                {{ $t('userNotification.systemSettings') }}
              </div>
            </td>
          </tr>
          <settings-notification
            v-for="(item, index) in systemSettings"
            :key="`system-${index}`"
            :title="item.title"
            :types="item.types"
            :is-editable="item.isEditable"
            @update="loadNotificationSettings"
          />
          <tr>
            <td class="system" colspan="4">
              <img src="../../assets/icons/settingsBell.svg" alt="" />
              <div class="system__text">
                {{ $t('userNotification.customSettings') }}
              </div>
            </td>
          </tr>
          <settings-notification
            v-for="(item, index) in userSettings"
            :key="`user-${index}`"
            :title="item.title"
            :types="item.types"
            :is-editable="item.isEditable"
            @update="loadNotificationSettings"
          />
        </table>
      </div>
    </transition>
    <page-block>
      <div
        v-for="(item, index) in notifications"
        :key="`notifications-${index}`"
      >
        <user-notification
          type="task"
          :happened-at="happendAt(item.created_at)"
          :title="$i18n.t(`notification.${item.name}`, item.content).toString()"
          :is-read="true"
        />
      </div>
    </page-block>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    Ref,
    ref,
    useAsync,
    useStore,
  } from '@nuxtjs/composition-api';

  import IconSettings from '~/components/icons/iconSettings.vue';
  import PageBlock from '~/components/molecules/PageBlock.vue';
  import SettingsNotification from '~/components/atoms/SettingsNotification.vue';
  import TopBarBlock from '~/components/blocks/TopBarBlock.vue';
  import UserNotification from '~/components/molecules/UserNotification.vue';
  import { happendAt } from '~/utils/happendAt';
  import { NotificationSettingsRepository } from '~/repositories/NotificationSettingsRepository';
  import { NotificationSettingResponse } from '~/repositories/responses/NotificationSetting';

  export default defineComponent({
    components: {
      IconSettings,
      PageBlock,
      SettingsNotification,
      TopBarBlock,
      UserNotification,
    },
    setup() {
      const activeSettings: Ref<boolean> = ref(false);

      const changeActiveSettings = () => {
        activeSettings.value = !activeSettings.value;
      };

      const settings = useAsync(
        () => NotificationSettingsRepository.getInstance().getList(),
        Math.random().toString(),
      );

      const convertSettings = (setting: NotificationSettingResponse) => ({
        title: setting.name,
        types: setting.types,
        isEditable: setting.editable,
      });

      const systemSettings = computed(() =>
        !settings.value
          ? []
          : settings.value.filter((s) => s.system).map(convertSettings),
      );

      const userSettings = computed(() =>
        !settings.value
          ? []
          : settings.value.filter((s) => !s.system).map(convertSettings),
      );

      const loadNotificationSettings = () => {
        NotificationSettingsRepository.getInstance()
          .getList()
          .then((data) => (settings.value = data));
      };

      const store = useStore();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const notifications = store.state.notifications.notifications;

      return {
        activeSettings,
        changeActiveSettings,
        happendAt,
        systemSettings,
        userSettings,
        loadNotificationSettings,
        notifications,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'css/settings.scss';
  @import 'css/particles/button';

  .topbar {
    border-bottom-right-radius: 0;
  }

  .page-notification {
    padding-top: 90px;
    padding-left: 20px;
    padding-right: 20px;

    &__settings {
      align-items: center;
      background: $color-sidebar;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      display: flex;
      height: auto;
      justify-content: space-between;
      margin-bottom: 20px;
      left: 20px;
      padding: 30px 30px;
      right: 20px;
      transition: ease-in-out 0.2s;
      top: 50px;

      .content {
        width: 100%;
      }

      .instruction {
        //display: flex;
        //justify-content: flex-end;

        &__text {
          text-align: center;
          color: $color-white;
          font-size: 16px;
          line-height: 20px;
          padding-right: 17px;
          padding-left: 17px;
          width: 193px;
        }
      }

      .system {
        display: flex;
        padding-bottom: 20px;
        padding-top: 20px;

        &__text {
          color: $color-white;
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          padding-left: 15px;
          text-transform: uppercase;
        }
      }
    }

    &__icon {
      cursor: pointer;
    }

    &__button {
      @include button();
    }
  }

  .page-block {
    padding: 0;
  }

  .active {
    padding-top: 70px;
  }
</style>
