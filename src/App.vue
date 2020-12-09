<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeRoutes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive({
      includeRoutes: []
    });
    return { ...toRefs(state) };
  }
});
</script>
<style lang="scss">
@import './styles/common.scss';
</style>
