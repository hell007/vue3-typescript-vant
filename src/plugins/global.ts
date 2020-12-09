import { App as VM } from 'vue';
import PageHeader from '@/components/page/header.vue';
import PageFooter from '@/components/page/footer.vue';
import PageDialog from '@/components/page/dialog.vue';
import ContentWithEmpty from '@/components/page/contentWithEmpty.vue';

import Bmob from 'hydrogen-js-sdk';

const plugins = [PageHeader, PageFooter, ContentWithEmpty, PageDialog];
Bmob.initialize('f810791189670320', '123456');
export default Bmob;
export const globalPlugins = {
  install: function(vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item);
    });
  }
};
