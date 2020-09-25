<template>
  <div class="app-container">
    <div style=" font-size: 20px;">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp体检项目导入记录</span>
    </div>
    <el-row style="margin:50px">
      <el-col :span="1" style="line-height:40px;min-width:100px">
        <div style="float:right;margin-right:20px">文件名：</div>
      </el-col>
      <el-col :span="4">
        <el-input style="width:100%" v-model="textname" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="1" style="line-height:40px;min-width:200px">
        <div style="float:right;margin-right:20px">时间范围：</div>
      </el-col>
      <el-col :span="4">
        <el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" style="float:right" @click="querybtn()">搜索</el-button>
      </el-col>

    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-top:80px">
      <el-table-column prop="importTime" label="导入时间">
      </el-table-column>
      <el-table-column prop="importFilename" label="文件名称">
      </el-table-column>
      <el-table-column prop="importNum" label="数据总量">
      </el-table-column>
      <el-table-column prop="successNum" label="成功数量">
      </el-table-column>
      <el-table-column prop="failedNum" label="失败数量">
      </el-table-column>
      <el-table-column prop="importUser" label="导入账号">
      </el-table-column>
    </el-table>
    <div style="margin:30px">
      <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  name: "projectimportrecord",
  components: {},
  watch: {},
  data() {
    return {
      time: "",
      textname: "",
      tableData: [],
      count: 0,
      pageSize: 10,
      currentPage4: 1
    };
  },
  mounted() {
    this.queryRecords();
  },
  methods: {
      querybtn(){
          this.currentPage4=1;
          this.queryRecords();
      },
    queryRecords() {
      var body = {
        fileName: this.textname,
        // startTime: this.time[0],
        // endTime:  this.time[0],
        page: this.currentPage4,
        pageSize: this.pageSize,
      };
      if (this.time && this.time.length > 1) {
        body.startTime = this.time[0];
        body.endTime = this.time[1];
      } else {
        body.startTime = "";
        body.endTime = "";
      }
      this.$api.post("/manage/queryRecords", body).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.count = res.data.count;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage4 = 1;
      this.pageSize = val;
      this.queryRecords();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.queryRecords();
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
