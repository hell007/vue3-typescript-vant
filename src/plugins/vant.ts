import { App as VM } from 'vue';
import {
  Button,
  Cell,
  Popup,
  Form,
  Field,
  Cascader,
  Checkbox,
  Radio,
  Switch,
  Stepper,
  DatetimePicker,
  Picker,
  Uploader,
  Empty,
  List,
  PullRefresh,
  Tab,
  Tabs,
  Icon,
  Overlay,
  Loading
} from 'vant';

const plugins = [
  Button,
  Cell,
  Popup,
  Form,
  Field,
  Cascader,
  Checkbox,
  Radio,
  Switch,
  Stepper,
  DatetimePicker,
  Picker,
  Uploader,
  Empty,
  List,
  PullRefresh,
  Tab,
  Tabs,
  Icon,
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
