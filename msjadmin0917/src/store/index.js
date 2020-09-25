import Vue from "vue";
import Vuex from "vuex";
import Roles from "./modules/Roles"; //权限信息
import Other from "./modules/Other"; //其他
import Selection from "./modules/Selection"; //多选框数据
import PageMsg from "./modules/PageMsg"; //多选框数据
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    Roles,
    Other,
    Selection,
    PageMsg
  }
});

export default store;
