<template>
  <div class="app-container">
    <div style="font-size: 20px;">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp订单导出记录</span>
    </div>
    <div class="orderExcelcordbox" v-for="item in orderexcellist">
      <div class="ordertime">报表导出时间：{{item.editTime}}</div>
      <div class="ordermsg">
        <div v-if="item.sortCompany!=''">所属分公司：{{item.sortCompany}}</div>
        <div v-else>所属分公司：全部</div>
        <div>商品类型：{{item.goodsType}}</div>
        <div v-if="item.time1!=''&&item.time2!=''">时间范围：{{item.time1}}——{{item.time2}}</div>
        <div v-else>时间范围：全部</div>
      </div>
    </div>
    <!-- <div v-if="orderexcellist||orderexcellist.length==0" class="nonemsg">
      暂无数据
    </div>-->
  </div>
</template>

<script>
export default {
  name: "orderexportrecord",
  components: {},
  watch: {},
  data() {
    return {
      orderexcellist: []
    };
  },
  mounted() {
    this.$api
      .post("/order/orderEx", { uid: this.$store.getters.getRoleInfo.Id })
      .then(res => {
        console.log(res);
        this.orderexcellist = res.data;
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    goback() {
      this.$router.go(-1);



    }
  },

  computed: {}
};
</script>

<style lang="scss" scoped>
.orderExcelcordbox {
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin: 25px;
  margin-bottom: 0%;
}
.ordertime {
  border-bottom: 1px solid #cccccc;
  padding: 15px;
}
.ordermsg {
  padding: 15px;
  line-height: 30px;
}
.nonemsg {
  text-align: center;
  color: #f56c6c;
}
</style>
