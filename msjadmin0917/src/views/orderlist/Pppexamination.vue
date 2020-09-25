<template>
  <div style="margin:20px">
    <!-- 搜索栏 -->

    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="公司名称：">
          <el-input v-model="seekobj.accountName" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="seekobj.linkMan" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="seekobj.mobile" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="时间范围：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekobj.timer" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="Resetbtn">重 置</el-button>
          <el-button type="primary" @click="seekbtn">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="AccountName" label="公司名称"></el-table-column>
        <el-table-column prop="FromCompany" label="所属分公司"></el-table-column>
        <el-table-column prop="FromSale" label="所属销售"></el-table-column>
        <el-table-column prop="LinkMan" label="联系人"></el-table-column>
        <el-table-column prop="Mobile" label="联系电话"></el-table-column>
        <el-table-column prop="EnterpriseScale" label="企业规模"></el-table-column>
        <el-table-column prop="EnterpriseAddress" label="企业地址"></el-table-column>
        <el-table-column prop="EnterpriseTime" label="预约时间"></el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="eachchange" @current-change="pagechange" :current-page="seekobj.page" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.each" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seekobj: {
        accountName: "",
        linkMan: "",
        mobile: "",
        timer: "",
        each: 10,
        page: 1
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      }
    };
  },
  mounted() {
    this.beforePostCheckup();
  },
  methods: {
    eachchange(val) {
      this.seekobj.each = val;
      this.seekobj.page = 1;
      this.beforePostCheckup();
    },
    pagechange(val) {
      this.seekobj.page = val;
      this.beforePostCheckup();
    },
    Resetbtn() {
      this.seekobj.accountName = "";
      this.seekobj.linkMan = "";
      this.seekobj.mobile = "";
      this.seekobj.timer = "";
    },
    seekbtn() {
      this.seekobj.page = 1;
      this.beforePostCheckup();
    },
    beforePostCheckup() {
      var body = {
        accountName: this.seekobj.accountName,
        linkMan: this.seekobj.linkMan,
        mobile: this.seekobj.mobile,
        orTime1: "",
        orTime2: "",
        each: this.seekobj.each,
        page: this.seekobj.page
      };
      if (Array.isArray(this.seekobj.timer) && this.seekobj.timer.length > 1) {
        body.orTime1 = this.seekobj.timer[0];
        body.orTime2 = this.seekobj.timer[1];
      }
      this.$api
        .post("/qrCode/beforePostCheckup", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj.list = res.data.data;
            this.tableobj.total = res.data.count;
          }
        })
        .catch(err => {
          console.log(err);
          // this.$message.error(err.msg);
          this.tableobj.list = [];
        });
    }
  }
};
</script>
<style lang="scss" >
</style>