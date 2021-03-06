import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '单元',
    component: () => import(/* webpackChunkName: "unit-index" */ '../views/unit/index.vue')
  },
  {
    path: '/unitList',
    name: '单元-上拉加载',
    component: () => import(/* webpackChunkName: "unit-list" */ '../views/unit/list.vue')
  },
  {
    path: '/unitRefresh',
    name: '单元-下拉刷新',
    component: () => import(/* webpackChunkName: "unit-refresh" */ '../views/unit/refresh.vue')
  },
  {
    path: '/unitDialog',
    name: '单元-弹窗使用',
    component: () => import(/* webpackChunkName: "unit-dialog" */ '../views/unit/modal.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
