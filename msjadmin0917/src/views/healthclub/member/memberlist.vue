<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 会员列表 --- memberlist -->
    <!-- 健康俱乐部 --- 会员列表 --- memberlist
    <el-button @click="goSubpage('/healthclub/memberDetails')">会员详情</el-button> -->
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekUserInfo" label-position='right' label-width="120px" size="medium">
        <el-form-item label="所属企业：">
          <!-- <el-input v-model="seekUserInfo.company" placeholder="请填写" style="width:200px"></el-input> -->
          <el-select v-model="seekUserInfo.company" placeholder="" style="width:200px" filterable clearable placeholder="请选择企业">
            <el-option v-for="item in seekUserInfo.AllBusinessList" :key="item.accountname" :label="item.accountname" :value="item.accountname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="seekUserInfo.mobile" placeholder="请填写" style="width:200px" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekUserInfo.RTtime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <div></div>
        <el-form-item label="缴纳押金时间:">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekUserInfo.PTtime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="seekbtn()">搜 索</el-button>
          <!-- <el-button type="primary" @click="">新 增</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableUserInfo.userinfolist" style="width: 100%" v-loading="tableUserInfo.loading">
        <el-table-column prop="mobile" label="手机号码" min-width="120px"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" min-width="160px"></el-table-column>
        <el-table-column prop="company" label="所属企业" min-width="180px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cashPledge" label="押金金额" min-width="80px"></el-table-column>
        <el-table-column prop="paymentTime" label="缴纳押金时间" min-width="160px"></el-table-column>
        <el-table-column label="押金状态" min-width="80px">
          <template slot-scope="scope">
            {{cashStatuschange(scope.row.cashStatus)}}
          </template>
        </el-table-column>
        <el-table-column prop="currentBeans" label="健康豆" min-width="80px"></el-table-column>
        <!-- <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini">查看</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableUserInfo.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tableUserInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableUserInfo.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "memberlist",
  components: {},
  data() {
    return {
      seekUserInfo: {
        AllBusinessList: [],
        company: "全部",
        mobile: "",
        RTtime: "",
        PTtime: ""
      },
      tableUserInfo: {
        loading: false,
        userinfolist: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      }
    };
  },
  created() {},
  mounted() {
    this.getUserList();
    if (this.$store.getters.getRoleInfo.AccountType == 3) {
      this.seekUserInfo.company = this.$store.getters.getRoleInfo.AccountName;
    } else {
      this.getEnterpriseList();
    }
    // this.getEnterpriseList();
  },
  methods: {
    // 获取企业列表
    getEnterpriseList() {
      this.seekUserInfo.AllBusinessList = [{ accountname: "全部" }];
      this.$network
        .post("/healthClub/getEnterpriseList")
        .then(res => {
          console.log(res);
          this.seekUserInfo.AllBusinessList = this.seekUserInfo.AllBusinessList.concat(
            res.data
          );
        })
        .catch(res => {
          console.error(res);
          this.$message.error(res.msg);
        });
    },
    cashStatuschange(el) {
      switch (el) {
        case "0":
          return "未缴纳"
          break;
        case "1":
          return "已缴纳"
          break;
        case "2":
          return "已退押金"
          break;
      
        default:
          break;
      }
    },
    seekbtn() {
      this.tableUserInfo.currentPage = 1;
      this.getUserList();
    },
    // 会员列表
    getUserList() {
      this.tableUserInfo.loading = true;
      var body = {
        page: this.tableUserInfo.currentPage,
        each: this.tableUserInfo.pagesize,
        company: this.seekUserInfo.company,
        mobile: this.seekUserInfo.mobile,
        startRT: "",
        endRT: "",
        startPT: "",
        endPT: "",
        startRF: "",
        endRF: "",
        findtype:"0"
      };
      if (body.company == "全部") {
        body.company = "";
      }
      if (
        Array.isArray(this.seekUserInfo.RTtime) &&
        this.seekUserInfo.RTtime.length > 1
      ) {
        body.startRT = this.seekUserInfo.RTtime[0];
        body.endRT = this.seekUserInfo.RTtime[1];
      }
      if (
        Array.isArray(this.seekUserInfo.PTtime) &&
        this.seekUserInfo.PTtime.length > 1
      ) {
        body.startPT = this.seekUserInfo.PTtime[0];
        body.endPT = this.seekUserInfo.PTtime[1];
      }
      this.$network
        .post("/healthClub/getUserList", body)
        .then(res => {
          this.tableUserInfo.loading = false;
          this.tableUserInfo.userinfolist = res.data.memberList;
          this.tableUserInfo.total = res.data.count;
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableUserInfo.currentPage = 1;
      this.tableUserInfo.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableUserInfo.currentPage = val;
      this.getUserList();
    },
    goSubpage(page) {
      this.$router.push(page);
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>