// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import plTable from 'pl-table'
import 'pl-table/themes/index.css' // 引入样式（必须引入)，请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦
// import 'pl-table/themes/plTableStyle.css' // 默认表格样式很丑 引入这个样式就可以好看啦（如果你不喜欢这个样式，就不要引入，不引入就跟ele表格样式一样）
Vue.use(plTable);

import "@/styles/index.scss"; // 全局 css
Vue.use(ElementUI);
import "@/utils/global"; //全局路由表
import "./promission"; //这里进行路由后台获取的模拟
import { store } from "@/store"; //vuex
import api from "./api"; // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上
import network from './api/network.js'
Vue.prototype.$network = network; // 将api挂载到vue的原型上
import network1 from './api/network1.js'
Vue.prototype.$network1 = network1; // 将api挂载到vue的原型上
import network2 from './api/network2.js'
Vue.prototype.$network2 = network2; // 将api挂载到vue的原型上
import network3 from './api/network3.js'
Vue.prototype.$network3 = network3; // 将api挂载到vue的原型上
import network4 from './api/network4.js'
Vue.prototype.$network4 = network4; // 将api挂载到vue的原型上

import network5 from './api/network5.js'
Vue.prototype.$network5 = network5; // 将api挂载到vue的原型上
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// Vue.use(VueQuillEditor)
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store: store,
  components: {
    App
  },
  template: "<App/>"
});
