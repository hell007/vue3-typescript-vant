<template>
  <div class="empty">
    <van-empty v-if="empty" :image="image" :image-size="size">
      <h3 v-if="tips" class="empty-tips">{{ tips }}</h3>
      <p class="empty-desc" slot:description>{{ description }}</p>
    </van-empty>
    <slot v-else></slot>
  </div>
</template>
<script lang="ts">
//declare function require(img: string): string; // 声明
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'content-with-empty',
  props: {
    empty: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      default: require('@/assets/images/empty.png')
    },
    size: {
      type: Number,
      default: null
    },
    tips: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: '暂无数据'
    }
  }
});
</script>
<style scoped lang="scss">
.empty {
  height: 100%;

  &-tips {
    margin-bottom: 16px;
    color: $color-32;
    font-size: 20px;
  }

  &-desc {
    font-size: 14px;
    color: $color-7d;
  }
}
</style>
