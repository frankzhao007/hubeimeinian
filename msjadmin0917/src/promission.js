import api from "./api";
import store from "./store";
import router from "./router";
import Cookies from "js-cookie";
import { filterRouter } from './utils/filterRouter';
import { Message } from "element-ui"; //element Toast的提示
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // NProgress Configuration
const _import = require("./router/_import_" + process.env.NODE_ENV); //获取组件的方法
import Layout from "@/layout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
var getRouter; //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (gitToken()) {
    // 获取选择器数据!!!
    store.dispatch("GetInstitutions");
    if (!getRouter) {
      //不加这个判断，路由会陷入死循环
      api
        .get("/account/pullRole")
        .then(res => {
          console.log(res.data);
          var RoleInfo = res.data.User;
          if (res.data.User.IsSon&&res.data.User.AccountType=='1') {
            api
              .get("/account/GetNameByID", { id: res.data.User.Id })
              .then(res => {
                console.log(res);
                RoleInfo["parentName"] = res.data.AccountName
                store.commit("setRoleInfo", RoleInfo);
                routerGo(to, next)
              })
              .catch(err => {
                console.log(err);
              })
          }
          var Checkbox = res.data.role.Routes.Checkbox;
          var Edits = res.data.role.Routes.Edits;
          var Roles = res.data.role.Routes.Roles;
          var Routes = res.data.role.Routes.Routes;
          var rolemsg = res.data.role.RoleName;
          store.commit("setRoleInfo", RoleInfo);
          store.commit("setCheckbox", Checkbox);
          store.commit("setEdits", Edits);
          store.commit("setrolemsg", rolemsg);
          store.commit("setRoles", Roles);
          store.commit("setRoutes", JSON.stringify(Routes));
          var filterRouters = filterRouter(res.data.role.Routes.RoleList);
          console.log('filterRouters', filterRouters)
          getRouter = filterRouters;
          // 给getRouter赋值路由表
          // getRouter = res.data.role.Routes.Routes;
          //后台拿到路由
          if (!(res.data.User.IsSon&&res.data.User.AccountType=='1')){
            routerGo(to, next); //执行路由跳转方法
          }
        })
        .catch(err => {
          console.log("err", err);
          Message.error(err.msg);
          Cookies.remove("token");
          NProgress.done();
        });
    } else {
      next();
      NProgress.done();
      // next({
      //   path: to.path,
      //   replace: true
      // });
    }
  } else {
    console.log("Cookies中没有登录信息，跳转到login页面");
    if (to.path == "/login") {
      //如果是登录页面路径，就直接next()
      next();
      NProgress.done();
    } else if (to.path == "/mlogin") {
      //不然就跳转到登录；
      next();
      NProgress.done();
    } else {
      //不然就跳转到登录；
      next("/login");
      NProgress.done();

    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter); //过滤路由
  router.addRoutes(getRouter); //动态添加路由
  global.antRouter = getRouter; //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({
    path: to.redirectedFrom,
    replace: true
  });
  NProgress.done();
}

function gitToken() {
  if (
    Cookies.get("token") == "" ||
    Cookies.get("token") == undefined ||
    Cookies.get("token") == "undefined"
  ) {
    // console.log("gitToken判断结果：", Cookies.get("token"));
    getRouter = null;
    return false;
  } else {
    // console.log("gitToken判断结果：", Cookies.get("token"));
    return true;
  }
}

function filterAsyncRouter(asyncRouterMap) {
  //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === "Layout") {
        //Layout组件特殊处理
        route.component = Layout;
      } else {
        route.component = _import(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
  return accessedRouters;
}
