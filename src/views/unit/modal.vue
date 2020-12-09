<template>
  <page-header :title="title" />

  <div class="page-main">
    <div class="page-scroller">
      <ul class="demo">
        <li class="demo-item" @click="toast">toast的使用</li>
        <li class="demo-item" @click="alert">alert的使用</li>
        <li class="demo-item" @click="confirm">confirm的使用</li>
        <li class="demo-item" @click="dialog1">dialog1的使用</li>
        <li class="demo-item" @click="dialog2">dialog2的使用</li>
        <li class="demo-item" @click="dialog3">dialog3的使用</li>
      </ul>
    </div>
  </div>

  <!-- dialog -->
  <page-dialog type="dialog" v-model:show="dialog.show" :lock="true">
    <template v-slot:body>
      <div>{{ dialog.text }}</div>
    </template>
    <template v-slot:footer>
      <van-button color="#999" round @click="onCancel">取消</van-button>
      <van-button :color="primary" round @click="onConfirm">确定</van-button>
    </template>
  </page-dialog>

  <!-- loading -->
  <page-dialog type="loading" v-model:show="loading.show" :animate="false" :tips="loading.tips">
  </page-dialog>

  <!-- animate -->
  <page-dialog type="animate" v-model:show="animate.show" :animate="true" :tips="animate.tips">
    <template v-slot:animate>
      <img src="../../assets/images/icons/wait.gif" />
    </template>
  </page-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { theme } from '@/theme';
import { getApp } from '@/hooks';

export default defineComponent({
  name: 'unit-dialog',
  components: {},
  setup() {
    const app = getApp();
    const title = '弹窗';
    const primary = theme.primary;
    const stateObj: {
      dialog: object | any;
      loading: object | any;
      animate: object | any;
    } = {
      dialog: {
        show: false,
        text: '这是文字描述'
      },
      loading: {
        show: false,
        tips: '正在玩命加载中...'
      },
      animate: {
        show: false,
        tips: '正在检测中...'
      }
    };

    const state = reactive(stateObj);

    const toast = () => {
      app.$toast({ position: 'bottom', message: 'app的使用' });
    };

    const alert = () => {
      app.$dialog.alert({
        title: 'alert',
        message: '弹窗内容',
        theme: 'round-button'
      });
    };

    const confirm = () => {
      app.$dialog.confirm({
        title: 'confirm',
        message: '弹窗内容'
      });
    };

    const dialog1 = () => {
      state.dialog.show = true;
    };

    const onCancel = () => {
      state.dialog.show = false;
    };

    const onConfirm = () => {
      state.dialog.show = false;
    };

    const dialog2 = () => {
      state.loading.show = true;
    };

    const dialog3 = () => {
      state.animate.show = true;
    };

    onMounted(() => {
      console.log('app==', app);
      // console.log(app.$router);
      // console.log(app.$store);
    });

    return {
      ...toRefs(state),
      title,
      primary,
      toast,
      alert,
      confirm,
      dialog1,
      dialog2,
      dialog3,
      onCancel,
      onConfirm
    };
  }
});
</script>
<style scoped lang="scss">
.demo {
  &-item {
    padding: 10px;
    background-color: $color-white;
    border-bottom: 1px solid $color-border-gray;
    font-size: 14px;
  }
}

.btn {
  flex: 1;
  border-radius: 0;

  &-bar {
    @include flex-row();
    background: $color-white;
  }
}
</style>
