<template>
  <page-header :title="title" />

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty :empty="noData" description="没有数据，快去添加吧！">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :immediate-check="false"
          :offset="10"
          finished-text="-我是有底线的-"
          @load="onLoad"
        >
          <div class="item" v-for="(item, index) in list" :key="index" @click="goto">
            <h5>{{ item.title }}</h5>
            <p>{{ item.desc }}</p>
          </div>
        </van-list>
      </content-with-empty>
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
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { Unit, UnitModel } from '@/entities/unit';
import { theme } from '@/theme';
//import { fetchGet } from '@/utils/api';
import { Toast } from 'vant';

export default defineComponent({
  name: 'unit-list',
  components: {},
  setup() {
    const primary = theme.primary;
    const title = '上拉加载';

    const stateObj: {
      noData: boolean;
      loading: boolean;
      finished: boolean;
      pageNum: number;
      pageSize: number;
      list: UnitModel[];
    } = {
      noData: false,
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10,
      list: []
    };

    const state = reactive(stateObj);
    const api = new Unit();

    //上拉加载
    const onLoad = async () => {
      try {
        state.loading = true;
        let query = {
          pageNum: ++state.pageNum,
          pageSize: state.pageSize
        };
        console.log('onLoad==', query);
        let list = (await api.getList(query)) as any;
        console.log('onLoad==', list);
        if (!list) {
          //暂无数据
          state.noData = true;
        } else if (list && list.length == 0) {
          //没有数据了
          state.finished = true;
        } else {
          //有数据
          state.list.push(...list);
          state.loading = false;
        }
      } catch (err) {
        console.log(err);
      }
    };

    //数据获取
    const getList = async () => {
      let query = {
        pageNum: state.pageNum,
        pageSize: state.pageSize
      };
      let res = await api.getList(query);
      state.list = res as any;
    };

    onMounted(() => {
      getList();
      Toast('toast的使用方式');
    });

    return {
      ...toRefs(state),
      primary,
      title,
      onLoad
    };
  }
});
</script>
<style scoped lang="scss">
.item {
  padding: 10px 12px;
  background-color: $color-white;
  border-bottom: 1px solid $color-border-gray;
}
</style>
