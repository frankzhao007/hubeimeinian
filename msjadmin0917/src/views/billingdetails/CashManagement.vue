<template>
  <div style="margin:20px">
    <!-- 提现管理 -->
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="销售名称：">
          <el-input v-model="seekobj.name" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="seekobj.phone" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请日期：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekobj.timeframe" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态：">
          <!-- <el-input v-model="seekobj.status" placeholder="请填写" style="width:200px"></el-input> -->
          <el-select v-model="seekobj.status" placeholder="" style="width:200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="待到账" value="2"></el-option>
            <el-option label="到账失败" value="0"></el-option>
            <el-option label="已拒绝" value="4"></el-option>
            <el-option label="已到账" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="allAgreerefund()">批量同意</el-button>
          <el-button type="primary" @click="seekbtn()">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :selectable="checkSelectable">
        </el-table-column>
        <el-table-column prop="name" label="销售名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="realname" label="真实姓名" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount" label="提现金额" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="filingdate" label="申请日期" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="linedate" label="操作日期" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="receiveddate" label="到账日期" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="failure" label="失败原因" min-width="250" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" min-width="150">
          <template slot-scope="scope">
            {{statuschange(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.status=='1'||scope.row.status=='0'">
              <el-button type="text" size="mini" @click="Agreerefund(scope.row)">同意</el-button>
              <el-button type="text" size="mini" @click="Refusedrefund(scope.row)">拒绝</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="tablesizechange" @current-change="tablepagechange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹窗 -->
    <div>
      <el-dialog title="拒绝提现" :visible.sync="refusedrefundobj.isshow" width="600px">
        <div style="margin:10px 0">请输入拒绝提现的理由：</div>
        <el-input type="textarea" v-model="refusedrefundobj.refusedrefundtext" maxlength="30" show-word-limit></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refusedrefundobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmRefusedrefund(refusedrefundobj.obj)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seekobj: {
        name: "",
        phone: "",
        timeframe: "",
        status: "1",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        total: 0,
        list: [],
        loading: false
      },
      refusedrefundobj: {
        obj: {},
        isshow: false,
        refusedrefundtext: ""
      },
      alltableselection: []
    };
  },
  watch: {},
  created() {
    this.setpagemsg();
  },
  mounted() {
    this.adminQueryAllBill();
  },
  beforeDestroy() {
    this.copypagemsg();
  },


  methods: {
    copypagemsg() {
      var body = {
        name:this.seekobj.name,
        phone:this.seekobj.phone,
        timeframe:this.seekobj.timeframe,
        status:this.seekobj.status,
        page: this.seekobj.pageindex,
        pageSize: this.seekobj.pagesize,  
      };
  
      this.$store.commit("setWithdrawDeposit", body);
    },

  setpagemsg() {
      var body = this.$store.getters.getWithdrawDeposit;
      this.seekobj.name= body.name || "";
      this.seekobj.phone= body.phone || "";
      this.seekobj.timeframe= body.timeframe || "";
      this.seekobj.status= body.status || "1";
      this.seekobj.pageindex = body.page || 1;
      this.seekobj.pagesize = body.pageSize || 10;
  

  },
    checkSelectable(row) {
      return row.status == "1"||row.status == "0";
    },
    handleSelectionChange(val) {
      this.alltableselection = val;
      console.log(this.alltableselection);
    },
    allAgreerefund() {
      if (this.alltableselection.length <= 0) {
        this.$message.error("请勾选需要批量操作的信息");
        return;
      }
      this.$confirm(
        "确定同意" + this.alltableselection.length + "笔提现吗?",
        "确认提现",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var body = {
            ids: []
          };
          this.alltableselection.map(item => {
            body.ids.push(item.id);
          });
          this.$api
            .post("/manage/adminAgreeWithD", body)
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("同意提现");
                this.adminQueryAllBill();
              }
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    Agreerefund(row) {
      console.log(row);
      this.$confirm("确定同意此笔提现吗?", "确认提现", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/manage/adminUpdateSalerOr", {
              id: row.id,
              failure: ""
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("同意提现");
                this.adminQueryAllBill();
              }
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    confirmRefusedrefund(row) {
      console.log(row);
      if (
        !this.refusedrefundobj.refusedrefundtext ||
        this.refusedrefundobj.refusedrefundtext == ""
      ) {
        this.$message.error("请输入退款理由");
        return;
      }
      this.$api
        .post("/manage/adminUpdateSalerOr", {
          id: row.id,
          failure: this.refusedrefundobj.refusedrefundtext
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("拒绝提现");
            this.refusedrefundobj.isshow = false;
            this.adminQueryAllBill();
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    Refusedrefund(row) {
      this.refusedrefundobj.isshow = true;
      this.refusedrefundobj.refusedrefundtext = "";
      this.refusedrefundobj.obj = row;
    },
    tablesizechange(val) {
      this.seekobj.pageindex = 1;
      this.seekobj.pagesize = val;
      this.adminQueryAllBill();
    },
    tablepagechange(val) {
      this.seekobj.pageindex = val;
      this.adminQueryAllBill();
    },
    statuschange(row) {
      switch (row) {
        case "1":
          return "待审核";
          break;
        case "2":
          return "待到账";
          break;
        case "0":
          return "到账失败";
          break;
        case "4":
          return "已拒绝";
          break;
        case "5":
          return "已到账";
          break;
        default:
          break;
      }
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.adminQueryAllBill();
    },
    //后台查询所有提现申请单
    adminQueryAllBill() {
      this.tableobj.loading = true;
      var body = {
        page: this.seekobj.pageindex,
        size: this.seekobj.pagesize,
        name: this.seekobj.name,
        phone: this.seekobj.phone,
        filingdate: "",
        linedate: "",
        status: this.seekobj.status
      };
      if (
        this.seekobj.timeframe &&
        Array.isArray(this.seekobj.timeframe) &&
        this.seekobj.timeframe.length > 1
      ) {
        body.filingdate = this.seekobj.timeframe[0];
        body.linedate = this.seekobj.timeframe[1];
      }
      this.$api
        .post("/manage/adminQueryAllBill", body)
        .then(res => {
          this.tableobj.loading = false;
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    }
  }
};
</script>
<style>
</style>