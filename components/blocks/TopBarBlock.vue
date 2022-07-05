<template>
  <transition name="slide" appear css duration="300">
    <div class="top-bar">
      <div class="top-bar__left">
        <slot name="left" />
      </div>
      <div class="top-bar__right">
        <slot name="right" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  @import 'css/settings';

  .top-bar {
    position: absolute;
    height: 70px;
    background: $color-sidebar;
    padding: 0 20px;
    top: 0;
    left: 0;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom-right-radius: 10px;
  }
</style>
