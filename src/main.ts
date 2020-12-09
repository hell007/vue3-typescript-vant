import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { vantPlugins } from './plugins/vant';
import Bmob, { globalPlugins } from './plugins/global';
import { Toast, Dialog } from 'vant';

const app = createApp(App);
app.config.globalProperties.$bmob = Bmob;

app
  .use(store)
  .use(router)
  .use(globalPlugins)
  .use(vantPlugins)
  .use(Toast)
  .use(Dialog)
  .mount('#app');
