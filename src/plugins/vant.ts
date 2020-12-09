import { App as VM } from 'vue';
import {
  Button,
  Empty,
  List,
  PullRefresh,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Form,
  Field,
  ActionSheet,
  Uploader,
  Overlay,
  Loading
} from 'vant';

const plugins = [
  Button,
  Empty,
  List,
  PullRefresh,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Form,
  Field,
  ActionSheet,
  Uploader,
  Overlay,
  Loading
];

export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach((item) => {
      //console.log('vant===',item.name, item)
      vm.component(item.name, item);
    });
  }
};
