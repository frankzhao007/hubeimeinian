<template>
  <div class="app-wrapper">
    <sidebar :class="isshowDatainform? 'sidebar-container':'sidebar-container1'" :style="isshowdf? '':'bottom:0%'"></sidebar>
    <div :class="isshowDatainform? 'Datainform':'Datainform1'" v-if="isshowdf">
      <div class="Datainformimg" @click="isshowDatainform=!isshowDatainform">
        <i :class="isshowDatainform?'el-icon-caret-bottom': 'el-icon-caret-top'"></i>
      </div>
      <div class="Datainformitem" v-if="isshowDatainform">
        <div>
          <div><span @click="gotoToAudit()" v-if="isaudit">{{e}}个待审核员工</span></div>
          <div><span @click="gototkorder()"v-if="isrest">{{a}}个待退款订单</span></div>
          <div><span @click="gotoyuyue1()" v-if="isrest">{{b}}个待录入预约订单</span></div>
          <div><span @click="gotoyuyue2()" v-if="isrest">{{c}}个待预约订单</span></div>
          <div><span @click="gotoyuyue3()" v-if="isrest">{{d}}个预约改期待确定</span></div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <!-- <div class="banner" v-if="isshow"><img src="../assets/banner.jpg" alt="" @click="gotobanner"></div> -->
      <transition name="fade" mode="out-in">
        <!-- <keep-alive :max="10"> -->
        <app-main :key="appKey"></app-main>
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>
<script>
import sidebar from "@/layout/components/sidebar"; //页面布局的左侧菜单
import AppMain from "@/layout/components/AppMain"; //页面布局的右侧区域
import Navbar from "@/layout/Navbar"; //页面布局的右侧区域头部组件.
export default {
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  name: "layout",
  components: {
    sidebar,
    AppMain,
    Navbar
  },
  inject: ["reload"],
  data() {
    return {
      isshowdf: false,
      appKey: 1,
      isshowDatainform: true,
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      // isshow: false
    };
  },
  mounted() {
    console.log(this.$store.getters.getrolemsg, 1111111111111111111111);
    if (
      this.$store.getters.getrolemsg == "运营" ||
      this.$store.getters.getrolemsg == "分公司" ||
      this.$store.getters.getrolemsg == "销售" ||
      this.$store.getters.getrolemsg == "客服主管"||
      this.$store.getters.getrolemsg == "企业"
    ) {

      if(this.$store.getters.getrolemsg == "企业"||this.$store.getters.getrolemsg == "销售" ){
         this.isaudit=true
      }else{
         this.isaudit=false
      }
      if( this.$store.getters.getrolemsg == "运营" ||
      this.$store.getters.getrolemsg == "分公司" ||
      this.$store.getters.getrolemsg == "销售" ||
      this.$store.getters.getrolemsg == "客服主管"){
         this.isrest=true
      }else{
        this.isrest=false
      }
      this.isshowdf = true;
      this.isshowDatainform = true;
    } else {
      this.isshowdf = false;
      this.isshowDatainform = false;
    }
    if (this.isshowdf) {
      this.getallOrder();
      setInterval(() => {
        this.getallOrder();
      }, 60000);
    }
  },
  methods: {
    gotoToAudit(){
      this.$router.push("/staffmanagement/stafflist?auditStatus=1");  
    },
    gototkorder() {
      this.$router.push("/ordermanagement/orderlist?orderStatus=9");
    },
    gotoyuyue1() {
      this.$router.push("/ordermanagement/reservationlist?entryOrExclude=2");
    },
    gotoyuyue2() {
      this.$router.push("/ordermanagement/reservationlist?restatus=9");
    },
    gotoyuyue3() {
      this.$router.push("/ordermanagement/reservationlist?restatus=14");
    },

    getallOrder() {
      this.$api
        .post("/order/allOrder")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.a = res.data.a;
            this.b = res.data.b;
            this.c = res.data.c;
            this.d = res.data.d;
            this.e = res.data.e;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    $route: function(newUrl, oldUrl) {
      this.appKey = new Date().getTime();
    }
  },
  computed: {
    key() {
      return Math.random();
    }
  }
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
/* .banner {
  position: relative;
  display: flex;
  align-items: center;
}
.banner img {
  width: 80%;
  margin: 20px auto 10px auto;
} */
.Datainform {
  width: 191px;
  height: 190px;
  background-color: #5b6cd2;
  color: #ffffff;
  position: fixed;
  bottom: 0%;
  left: 0%;
  transition: height 0.28s;
  z-index: 1000;
}
.Datainform1 {
  width: 191px;
  height: 30px;
  background-color: #5b6cd2;
  color: #ffffff;
  position: fixed;
  bottom: 0%;
  left: 0%;
  transition: height 0.28s;
  z-index: 1000;
}
.Datainformitem {
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
  /* height: calc(100% - 30px); */
}
.Datainformimg {
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.Datainformitem span {
  line-height: 30px;
  cursor: pointer;
  text-decoration: underline;
}
</style>
