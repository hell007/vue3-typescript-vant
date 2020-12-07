<template>
  <div class="page-header">
    <header class="header">
      <div class="header-left" @click="navBack">
        <span class="header-btn header-btn-back">
          返回
        </span>
      </div>
      <div class="header-title">
        {{ title }}
      </div>
      <slot name="right"></slot>
    </header>
    <slot name="extend"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'page-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    isBack: {
      type: Boolean,
      default: false
    },
    onBack: {
      type: Function,
      default: null
    }
  },
  setup(_props, ctx) {
    const router = useRouter();

    const navBack = () => {
      router.back();
      ctx.emit('onBack');
    };
    return {
      navBack
    };
  }
});
</script>
<style lang="scss" scoped></style>
