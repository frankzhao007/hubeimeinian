<template>
  <div>
    <div class="navbar">
      <!-- 一级标题和当前页面标题 -->
      <div class="navbar_content">{{firstLevelTitle}}&nbsp;—&nbsp;<span>{{getTitle}}</span>
      </div>
      <div class="navbar_content_right">
        <div class="czznclass" v-if="$store.getters.getRoleInfo.AccountType == 2" @click="gotoczzn()">操作指南</div>
        <div class="navbar_webtitleimg">
          <img src="../assets/favicon.png" alt>
        </div>
        <div class="navbar_webtitlename">{{RoleInfo.AccountName}}</div>
        <div class="navbar_webexit" @click="signOut">
          <div class="navbar_signOut">
            <img src="../assets/img/signOut.png" alt="">
          </div>
          <span>退出</span>
        </div>
      </div>
    </div>
    <div class="banner" @click="gotobanner" v-if="isshow"><img src="../assets/banner.jpg" alt=""></div>
    <div>
      <div class="navigation" v-if="pathArr!=''">
        <span :class="v.title==getTitle?'navigation_link1':'navigation_link'" v-for="(v,index) in pathArr" v-if="v.hidden != 'true'">
          <!-- <span v-if="v.hidden != 'true'"> -->
          <router-link :to="v.path">{{v.title}}</router-link>
          <!-- 关闭按钮，如果页面title等于当前页面title则不显示关闭按钮 -->
          <span v-if="v.title==getTitle"></span>
          <span v-else class="el-icon-close link_close" @click="link_close(index)"></span>
          <!-- </span> -->
        </span>

      </div>
    </div>
  </div>
</template>

<script>
import maidian from "../api/maidian";
import { resetRouter } from "@/router";
import Cookies from "js-cookie";
export default {
  name: "navbar",
  components: {},
  watch: {},
  data() {
    return {
      isshow: true,
      // 标签列表
      pathArr: []
    };
  },
  mounted() {
    console.log("AppMain加载成功---右侧主要内容");
    console.log(this.$store.getters.getRoleInfo);
    if (this.$store.getters.getRoleInfo.AccountType == 2) {
      if (
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康东莞分公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "深圳分公司全国" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康深圳公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康南宁分公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康玉林分公司"
      ) {
        this.isshow = false;
        // this.isshow = true;
      } else {
        this.isshow = false;
      }
    } else {
      this.isshow = false;
    }
  },
  methods: {
    gotoczzn() {
      window.open(
        "https://whiot.ihaozhuo.com/qrhealth/static/instructions/index.html"
      );
    },
    gotobanner() {
      console.log(1111);
      maidian.maidian(
        "点击事件",
        this.$store.getters.getRoleInfo.AccountName,
        "宣传页",
        "button",
        "广告位"
      );
      if (
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康东莞分公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "深圳分公司全国" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康深圳公司"
      ) {
        window.open(
          "https://whiot.ihaozhuo.com/qrhealth/static/Stimulate.html"
        );
      }
      if (
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康南宁分公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康玉林分公司"
      ) {
        window.open(
          "https://whiot.ihaozhuo.com/qrhealth/static/GXStimulate.html"
        );
      }
    },
    // 退出登录方法
    signOut() {
      console.log("退出登录");
      Cookies.remove("token"); //清除Cookies
      resetRouter(); //清除路由
      location.reload(); //不能省，强制跳到登陆页
    },
    // 关闭标签按钮
    link_close(index) {
      this.pathArr.splice(index, 1);
    }
  },
  computed: {
    RoleInfo() {
      console.log("vuex中获取个人信息");
      return this.$store.getters.getRoleInfo;
    },
    // 获取一级标题
    firstLevelTitle() {
      // hidden
      // console.log(this.$route.matched)
      let matched = this.$route.matched;
      return matched[0].meta.title;
    },
    // 获取当前页面标题,添加路由path到标签中
    getTitle() {
      let matched = this.$route.matched;
      //添加路由path到标签中
      this.pathArr.push({
        title: matched[1].meta.title,
        path: matched[1].path,
        hidden: matched[1].meta.hidden
      });
      // console.log(this.pathArr);
      var tempArr = [];
      var temp = {};
      for (var i = 0; i < this.pathArr.length; i++) {
        if (!temp[this.pathArr[i].title]) {
          tempArr.push(this.pathArr[i]);
          temp[this.pathArr[i].title] = true;
        }
      }
      this.pathArr = tempArr;
      if (this.pathArr.length >= 12) {
        this.pathArr.splice(0, 1);
      }
      //返回当前页面标题
      return matched[1].meta.title;
    }
  }
};
</script>
<style>
.banner {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.banner img {
  width: 100%;
  margin: 0 auto 0 auto;
}
.czznclass {
  float: left;
  margin-right: 30px;
  color: #409eff;
  cursor: pointer;
}
</style>
