<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 押金管理 --- memberlist -->
    <div>
      <el-form :inline="true" :model="seekUserInfo" label-position='right' label-width="150px" size="medium">
        <el-form-item label="所属企业：">
          <!-- <el-input v-model="seekUserInfo.company" placeholder="请填写" style="width:200px"></el-input> -->
          <el-select v-model="seekUserInfo.company" placeholder="" style="width:200px" filterable clearable placeholder="请选择企业">
            <el-option v-for="item in seekUserInfo.AllBusinessList" :key="item.accountname" :label="item.accountname" :value="item.accountname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="seekUserInfo.mobile" placeholder="请填写" style="width:200px" maxlength="11" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="注册时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekUserInfo.RTtime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item> -->
        <div></div>
        <el-form-item label="押金退款提交时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekUserInfo.RFtime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
        <el-table-column prop="refundTime" label="押金退款提交时间" min-width="160px"></el-table-column>
        <el-table-column prop="cashPledge" label="押金金额" min-width="80px"></el-table-column>
        <el-table-column label="退押规则" min-width="180px">
          <template slot-scope="scope">
            <div>持续打卡天数{{scope.row.continueDay}},每日领取健康豆{{scope.row.claimBeansDay}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="detail" label="完成明细" min-width="160px"></el-table-column> -->
        <el-table-column prop="remark" label="备注" min-width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openalterRemark(scope.row)">{{scope.row.remark||'备注'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" min-width="80px">
          <template slot-scope="scope">

            <el-button v-if="scope.row.cashStatus==1" type="text" size="mini" @click="wxRefund(scope.row)">通过</el-button>
            <div v-if="scope.row.cashStatus==2">已退押金</div>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableUserInfo.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tableUserInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableUserInfo.total">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <div>
      <el-dialog title="备注" :visible.sync="alterRemark.isshow" width="500px">
        <el-input v-model="alterRemark.remarkmsg" type="textarea" maxlength="30" placeholder="备注最多30字"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alterRemark.isshow = false">取 消</el-button>
          <el-button type="primary" @click="updataalterRemark">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "depositmanagement",
  components: {},
  data() {
    return {
      seekUserInfo: {
        AllBusinessList: [],
        company: "全部",
        mobile: "",
        RFtime: ""
      },
      tableUserInfo: {
        loading: false,
        userinfolist: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      alterRemark: {
        isshow: false,
        remarkmsg: ""
      }
    };
  },
  created() {},
  mounted() {
    this.getUserList();
    console.log(this.$store.getters.getRoleInfo);

    if (this.$store.getters.getRoleInfo.AccountType == 3) {
      this.seekUserInfo.company = this.$store.getters.getRoleInfo.AccountName;
    } else {
      this.getEnterpriseList();
    }
    //
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
    RTchange(el) {},
    seekbtn() {
      this.tableUserInfo.currentPage = 1;
      this.getUserList();
    },
    openalterRemark(row) {
      this.alterRemark.obj = row;
      console.log(row);

      this.alterRemark.isshow = true;
      this.alterRemark.remarkmsg = row.remark || "";
    },
    updataalterRemark() {
      if (!this.alterRemark.remarkmsg) {
        this.$message.error("请输入备注");
        return;
      }
      this.$network
        .post("/healthClub/alterRemark", {
          orderNumber: this.alterRemark.obj.orderNumber,
          remark: this.alterRemark.remarkmsg
        })
        .then(res => {
          this.alterRemark.isshow = false;
          this.getUserList();
          this.$message.success("修改备注成功");
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
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
        findtype: "1"
      };
      if (body.company == "全部") {
        body.company = "";
      }
      if (
        Array.isArray(this.seekUserInfo.RFtime) &&
        this.seekUserInfo.RFtime.length > 1
      ) {
        body.startRF = this.seekUserInfo.RFtime[0];
        body.endRF = this.seekUserInfo.RFtime[1];
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
    wxRefund(row) {
      this.$confirm("通过后，押金将退还给用户，请确认后操作！", "通过确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$network
            .post("/healthClub/wxRefund", {
              orderNumber: row.orderNumber
            })
            .then(res => {
              this.$message.success(res.msg);
            })
            .catch(res => {
              this.$message({
                type: "error",
                message: res.msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
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