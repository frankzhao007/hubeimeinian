import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)

}
Vue.use(Router);

const _import = require("./_import_" + process.env.NODE_ENV); //获取组件的方法
import Layout from "@/layout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
export const constantRouterMap = [
  {
    path: "/login",
    component: _import("login/index"),
    hidden: true
  },
  {
    path: "/mlogin",
    component: _import("login/mlogin"),
    hidden: true
  },
  {
    path: "/dashboard",
    component: _import("dashboard/index"),
    hidden: true
  },
  {
    path: "/403",
    component: _import("error-page/403"),
    hidden: true
  },
  {
    path: "/404",
    component: _import("error-page/404"),
    hidden: true
  },
  // {
  //   path: '/enterprisemanagement',
  //   component: Layout,
  //   redirect: '/welfarevoucher',
  //   hidden: true,
  //   meta: { title: '企业管理' },
  //   children: [{
  //     path: 'welfarevoucher',
  //     name: 'welfarevoucher',
  //     component: () => import('@/views/enterpriselist/welfarevoucher'),
  //     meta: { title: '福利劵金额配置', hidden: "true" }
  //   }]
  // },
  // {
  //   path: '/staffmanagement',
  //   component: Layout,
  //   redirect: '/saleswelfarevoucher',
  //   hidden: true,
  //   meta: { title: '员工管理' },
  //   children: [{
  //     path: 'saleswelfarevoucher',
  //     name: 'saleswelfarevoucher',
  //     component: () => import('@/views/stafflist/saleswelfarevoucher'),
  //     meta: { title: '福利劵金额配置', hidden: "true" }
  //   },

  //   ]
  // },
  // {
  //   path: "/marketing",
  //   component: Layout,
  //   redirect: "/marketing/salesshop",
  //   name: "Marketing",
  //   meta: {
  //     title: "营销管理",
  //     icon: "el-icon-my-heart"
  //   },
  //   children: [
  //     {
  //       path: 'salesshop',
  //       name: 'salesshop',
  //       component: () => import('@/views/marketing/salesshop'),
  //       meta: {
  //         title: "配置销售店铺套餐",
  //         mark: "salesshop",
  //         icon: "salesshop"
  //       }
  //     },
  //     {
  //       path: 'smallbusiness',
  //       name: 'smallbusiness',
  //       component: () => import('@/views/marketing/smallbusiness'),
  //       meta: {
  //         title: '配置小企业套餐',
  //         mark: "smallbusiness",
  //         icon: "smallbusiness"
  //       }
  //     },
  //     {
  //       path: 'enterpriseentry',
  //       name: 'enterpriseentry',
  //       component: () => import('@/views/marketing/enterpriseentry'),
  //       meta: {
  //         title: '配置企业入职套餐',
  //         mark: "enterpriseentry",
  //         icon: "enterpriseentry"
  //       }
  //     }
  //   ]
  // },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
