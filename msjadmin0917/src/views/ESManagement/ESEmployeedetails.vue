<template>
  <div class="app-container">
    <div class="goodsmsgtitle hove" @click="$router.go(-1)">
      <i class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp返回</span>
    </div>
    <!--  -->
    <div class="inquire">
      <el-row>
        <el-col :span="5">
          <div class="grid_lable1">姓名：</div>
          <div class="grid_lable1 addaccount_lable">{{name}}</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <div class="grid_lable1">性别：</div>
          <div class="grid_lable1 addaccount_lable">{{sex}}</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <div class="grid_lable1">手机号：</div>
          <div class="grid_lable1 addaccount_lable">{{phone}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="titlesss">疫情自测填写详情</div>
    <!-- 表格 -->
    <div class="mytable">
      <el-table
        :data="tableData"
        style="width: 100%; margin-top:3%; text-align: center"
        v-loading="tableDataLoading"
      >
        <el-table-column prop="creattime" label="日期"></el-table-column>
        <el-table-column prop="report[0].quans" align="left" width="300px"  label="经历"></el-table-column>
        <el-table-column prop="report[1].quans" label="咳嗽"></el-table-column>
        <el-table-column prop="report[2].quans" label="发热"></el-table-column>
        <el-table-column prop="report[3].quans" label="是否有呼吸急促，气短而不均匀，呼吸频率超过24/分钟"></el-table-column>
        <el-table-column prop="report[4].quans" label="是否有腹痛腹泻的症状"></el-table-column>
        <el-table-column prop="report[5].quans" label="是否有鼻塞、流涕、咽痛"></el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userid: "",
      phone: "",
      sex: "",
      name: "",
      page: 1,
      pageSize: 10,
      count: 0,
      tableData: [],
      tableDataLoading: false
    };
  },
  mounted() {
    this.userid = this.$route.query.userid;
    this.phone = this.$route.query.phone;
    this.sex = this.$route.query.sex;
    this.name = this.$route.query.name;

    this.get_info();
  },
  methods: {
    //获取信息
    get_info() {
      this.tableDataLoading = true;
      var userid = this.userid;
      var page = this.page;
      var size = this.pageSize;
      var body = {
        userid,
        page,
        size
      };
      console.log(body);
      this.$api
        .get("/manage/HrQueryOne", body)
        .then(res => {
          // console.log(res.data);
          this.count = res.data.count;
          var res = res.data.data;
          console.log(res);
          //  for (var i = 0; i < res.length; i++) {
          //       var a = res[i].report[0].quans;
          //      var r = a.filter(function(s) {
          //     return s && s.trim();
          //   });
          //    console.log(r);
          //  }
          for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < 6; j++) {
              if (res[i].report[j]) {
                res[i].report[j].quans = res[i].report[j].quans.join(" \n ");
              }
            }
          }
          // console.log(res);
          this.tableData = res;
          this.tableDataLoading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.msg);
          this.tableDataLoading = false;
        });
    },

    //分页
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.get_info();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.get_info();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" >
.mytable {
 .el-table .cell{
  white-space: pre-line !important;
}
}

.grid_lable1 {
  float: left;
  width: 20%;
  min-width: 100px;
  text-align: left;
  min-height: 36px;
  line-height: 36px;
}
.titlesss {
  font-size: 22px;

  padding-top: 2%;
  color: #5a79cf;
}
.hove:hover {
  cursor: pointer;
}
</style>
