<template>
  <div class="page-footer">
    <slot name="btn"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "page-footer",
  setup(_props, _ctx) {
  }
})
</script>
<style lang="scss" scoped></style>