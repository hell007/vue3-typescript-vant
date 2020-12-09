<template>
  <van-overlay :lock-scroll="lock" :class="styles" :show="show">
    <!-- dialog -->
    <section class="dialog-wrap" v-if="type === 'dialog'">
      <div class="dialog-body">
        <slot name="body"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
      <div class="dialog-close" v-if="showClose" @click="onClose">
        <van-icon name="close" size="20" :color="primary" />
      </div>
    </section>
    <!-- loading -->
    <section class="dialog-loading" v-if="type === 'loading'">
      <van-loading v-if="!animate" size="24px" color="#fff" vertical>{{ tips }}</van-loading>
    </section>
    <!--  animate-->
    <section class="dialog-animate" v-if="type === 'animate'">
      <slot name="animate"></slot>
      <p class="dialog-animate-tips">{{ tips }}</p>
    </section>
  </van-overlay>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { theme } from '@/theme';
export default defineComponent({
  name: 'page-dialog',
  props: {
    type: {
      type: String,
      default: 'dialog'
    },
    styles: {
      type: String,
      default: 'dialog-mask'
    },
    showClose: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    lock: {
      type: Boolean,
      default: true
    },
    animate: {
      type: Boolean,
      default: false
    },
    tips: {
      type: String,
      default: '加载中...'
    },
    close: {
      type: Function,
      default: null
    }
  },
  setup(_props, ctx) {
    const primary = theme.primary;

    const onClose = () => {
      ctx.emit('close');
    };

    return {
      primary,
      onClose
    };
  }
});
</script>
<style scoped lang="scss">
.dialog {
  &-mask {
    z-index: 2000;
    //background-color: rgba(0,0,0,0.9);
  }

  &-wrap {
    position: fixed;
    left: 5%;
    top: 15%;
    width: 90%;
    border-radius: 8px;
    background-color: $color-white;
    font-size: 14px;
  }

  &-body {
    padding: 20px 10px;
  }

  &-footer {
    @include flex-row();
    align-items: center;
    padding: 10px;

    /deep/ .van-button {
      flex: 1;

      &:last-child {
        margin-left: 20px;
      }
    }
  }

  &-close {
    position: absolute;
    right: 0;
    top: -24px;
    z-index: 10;
  }

  &-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    min-width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;

    /deep/ .van-loading__text {
      font-size: 14px;
      color: $color-white;
    }
  }

  &-animate {
    position: absolute;
    left: 50%;
    top: 50%;
    min-width: 300px;
    min-height: 300px;
    margin-left: -150px;
    margin-top: -150px;

    &-tips {
      font-size: 12px;
      color: $color-white;
      text-align: center;
      margin-top: 50px;
    }
  }
}
</style>
