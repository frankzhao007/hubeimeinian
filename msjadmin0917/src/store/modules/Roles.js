const state = {
  RoleInfo: "", //用户名
  Checkbox: "", //创建角色时渲染Checkbox
  Edits: "", //编辑角色时渲染Checkbox
  Roles: "", //按钮权限
  Routes: "", //路由表
  rolemsg:""//角色信息
};
const getters = {
  // 获取角色信息
  getRoleInfo: state => state.RoleInfo,
  // 获取创建角色时渲染Checkbox
  getCheckbox: state => state.Checkbox,
  // 获取编辑角色时渲染Checkbox
  getEdits: state => state.Edits,
  // 获取按钮权限
  getRoles: state => listName => state.Roles.find(role => role.listName === listName),
  // 获取路由表
  getRoutes: state => state.Routes,
  //获取角色信息
  getrolemsg:state=>state.rolemsg,
};
const mutations = {
  // 赋值给用户名
  setRoleInfo: (state, payload) => (state.RoleInfo = payload),
  // 赋值给创建角色时渲染Checkbox
  setCheckbox: (state, payload) => (state.Checkbox = payload),
  // 赋值给编辑角色时渲染Checkbox
  setEdits: (state, payload) => (state.Edits = payload),
  // 赋值给按钮权限
  setRoles: (state, payload) => (state.Roles = payload),
  // 赋值给路由表
  setRoutes: (state, payload) => (state.Routes = payload),
  //赋值给角色形象
  setrolemsg: (state, payload) => (state.rolemsg = payload),
};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
