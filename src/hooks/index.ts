import { getCurrentInstance } from 'vue';

/**
 * 获取全局App
 */
export const getApp = () => {
  const app = getCurrentInstance()?.appContext.config.globalProperties as any;
  if (!app) {
    throw new Error('获取全局app出错');
  }
  return app;
};

/**
 *获取全局Bmob
 */
export const getBmob = () => {
  const bomb = getCurrentInstance()?.appContext.config.globalProperties.$bmob;
  return [bomb];
};
