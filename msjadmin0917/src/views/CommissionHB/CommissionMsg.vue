<template>
  <div class="tabZujian">
    <div style="font-size: 20px; ">
      <!-- &nbsp;&nbsp;&nbsp; -->
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <div class="offerclass">文件夹：{{offername}}</div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="团单提成统计表" name="first" key="first">
        <CommissionHBgz :polar="polar" v-if="select==0"></CommissionHBgz>
      </el-tab-pane>

      <el-tab-pane label="业务员提成统计表" name="second" key="second">
        <CommissionHBgo :polar="polar" v-if="select==1"></CommissionHBgo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommissionHBgz from "./CommissionHBgz";
import CommissionHBgo from "./CommissionHBgo";
export default {
  name: "tabZujian",

  mounted() {
    this.polar = this.$route.query.wid;
    console.log(this.polar);
    var body = {
      wid: this.polar
    };
    this.$network5
      .get("/workspace/detail", body)
      .then(res => {
        console.log(res);
        this.offername = res.data.name;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      select: 0,
      activeName: "first",
      polar: this.$route.query.wid,
      offername: ""
    };
  },
  components: {
    CommissionHBgz: CommissionHBgz,
    CommissionHBgo: CommissionHBgo
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName, tab.index);
      var that = this;
      that.select = tab.index;
      // console.log(,this.polar);
    },
    goback() {
      //返回
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tabs__item {
  width: 50%;
}
.el-tabs__active-bar {
  width: 120px;
}
.el-tabs__nav {
  width: 100%;
  text-align: center;
}
.offerclass {
  display: inline-block;
  font-size: 16px;
  padding: 10px 0px;
  margin-left: 20px;
}
.offerclass:hover {
  // cursor: pointer;
  // color: #409eff;
}
</style>
