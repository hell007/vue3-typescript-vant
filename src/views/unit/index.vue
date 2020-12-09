<template>
  <page-header :title="title">
    <template v-slot:right>
      <div class="header-right" @click="navOption">
        <span class="header-right-text">
          操作
        </span>
      </div>
    </template>
  </page-header>

  <div class="page-main">
    <div class="page-scroller">
      <ul class="demo">
        <li class="demo-item">{{ user.userId }} {{ user.userName }}</li>
        <li class="demo-item" v-for="item in list" :key="item.name" @click="goto(item.url)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>

  <page-footer>
    <template v-slot:btn>
      <div class="footer-bar">
        <van-button round block>取消</van-button>
        <van-button round block :color="primary">确定</van-button>
      </div>
    </template>
  </page-footer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { theme } from '@/theme';
import { fetchPost } from '@/utils/api';
import { Unit } from '@/entities/unit';
import * as storage from '@/utils/storage';

export default defineComponent({
  name: 'unit-index',
  components: {},
  setup(props, ctx) {
    const router = useRouter();
    const store = useStore();

    const primary = theme.primary;
    const title = '模板';

    const stateObj: {
      user: any;
    } = {
      user: {}
    };

    const state = reactive(stateObj);
    const api = new Unit();

    const list = [
      {
        name: '下拉刷新',
        url: '/unitRefresh'
      },
      {
        name: '上拉加载',
        url: '/unitList'
      },
      {
        name: '弹窗',
        url: '/unitDialog'
      },
      {
        name: '开发',
        url: '/workService'
      }
    ];

    //操作
    const navOption = () => {
      console.log('setup里面不能使用this', this);
    };

    // 路由跳转
    const goto = (path: string) => {
      router.push(path);
    };

    //登录
    const login = () => {
      const user = {
        loginId: '11187245996',
        verifyCode: '708090'
      };
      fetchPost('/flep/app/api/sys/login', user)
        .then(function(res) {
          let data = res.data.body;
          storage.set('token', data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //vuex实现的登录
    const login2 = async () => {
      const user = {
        loginId: '11187245996',
        verifyCode: '708090'
      };
      try {
        let res = await store.dispatch('unit/login', user);
        state.user = res.data.body;
        storage.set('token', res.data.body.token);
      } catch (err) {
        console.log(err);
      }
    };

    //調用封裝方法
    const login3 = async () => {
      const user = {
        loginId: '11187245996',
        verifyCode: '708090'
      };
      try {
        let res = (await api.getUnit(user)) as any;
        let data = res.data.body;
        console.log('login3==', data);
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      //login(); //本地请求
      //login2(); //vuex
      //login3(); //实体
      console.log('props==', props);
      console.log('ctx==', ctx);
    });

    return {
      ...toRefs(state),
      primary,
      title,
      list,
      navOption,
      goto,
      login,
      login2,
      login3
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
