const state = {
  editObj: "", // 编辑账号数据
  isCollapse: false //控制菜单栏隐藏显示
};
const getters = {
  // 获取编辑账号数据
  getEditObj: state => state.editObj,
  // 获取控制菜单栏隐藏显示
  getisCollapse: state => state.isCollapse
};
const mutations = {
  // 赋值给编辑账号数据
  setEditObj: (state, payload) => (state.editObj = payload),
  // 赋值给编辑账号数据
  setisCollapse: state => (state.isCollapse = !isCollapse)
};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
