<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import "babel-polyfill";
import Cookies from "js-cookie";
import { resetRouter } from "@/router";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      // weburl: "https://qrhealth.ihaozhuo.com/qrhealth" ,//测试
      weburl: "https://whiot.ihaozhuo.com/qrhealth", //武汉测试
      //  weburl : "https://whgray.ihaozhuo.com/qrhealth" //武汉灰度环境
      // weburl: "https://intsetemp.ihaozhuo.com/qrhealth", //杭州测试
      weburl_hb: "https://whiot.ihaozhuo.com", //湖北美年测试
      // weburl_hb: "https://hbmnmsj.ihaozhuo.com", //湖北美年正式
    };
  },
  mounted() {
    var href = window.location.href;
    var arry = href.split("#");
    console.log(arry[0]);
    if (arry[0].indexOf("hb-health100") > -1) {
      this.$router.push("/mlogin");
    }
    window.onload = function () {
      if (!window.sessionStorage["tempFlag"]) {
        // 关闭页面
        resetRouter(); //清除路由
        Cookies.remove("token"); //清除Cookies
        console.log("14451251251", 14451251251);
        location.reload(); //不能省，强制跳到登陆页
      } else {
        // 刷新页面
        window.sessionStorage.removeItem("tempFlag");
      }
    };
    window.onunload = function () {
      window.sessionStorage["tempFlag"] = true;
    };
    window.onbeforeunload = function () {
      window.sessionStorage["tempFlag"] = true;
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
