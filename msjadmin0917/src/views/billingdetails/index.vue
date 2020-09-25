<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">分公司：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.fromCompany" :disabled="CompanyData.length == 0" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in CompanyData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">销售：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.fromSale" :disabled="SaleData.length == 0" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in SaleData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品类型：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.goodsType" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in goodsTypeData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">状态：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.goodsStatus" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in goodsStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>

        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">子订单号：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.goSonNumber" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">城市项目代码：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.city" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">结算时间：</div>
            <div class="grid_content">
              <el-date-picker v-model="yearSelect" size="medium" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <div style="float:left" class="bigbox">
          订单入账：{{IncomingPayment||0}}元
        </div>
        <div style="float:left;margin-left:20px" class="bigbox">
          退款打款：{{Refund||0}}元
        </div>
        <div style="float:left;margin-left:20px" class="bigbox" v-if="$store.getters.getRoleInfo.AccountType == 0">
          平台佣金：{{Brokerage||0}}元
        </div>
        <el-button :disabled="!Clickable.details" class="grid_button" type="primary" size="medium" @click="ExportBillRecords">导出记录</el-button>
        <el-button :disabled="!Clickable.export" class="grid_button" type="primary" size="medium" @click="ExportBill">数据导出</el-button>
        <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" @click="findBillDetails('搜索')" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%" v-loading='tableloading'>
        <el-table-column fixed prop="settlementTime" label="结算时间" min-width="120px">
        </el-table-column>
        <el-table-column prop="goodsType" label="商品类型">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.goodsStatus == 2">订单入账</div>
            <div v-if="scope.row.goodsStatus == 5">退款打款</div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称-销售" min-width="140px" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sonNumber" label="子订单号" min-width="140px" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="金额明细（元）" min-width="100px">
          <template slot-scope="scope">
            <div style="color:#F56C6C;" v-if="scope.row.goodsStatus == 2">+ {{scope.row.detailedAmount}}</div>
            <div style="color:#67C23A;" v-if="scope.row.goodsStatus == 5">- {{scope.row.detailedAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="brokerage" label="平台佣金" min-width="60px" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="arrive" label="实际入账" min-width="60px" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Inquire.page" :page-sizes="[10, 20, 40, 50]" :page-size="Inquire.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "billingdetails",
  components: {},
  watch: {
    "Inquire.fromCompany": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.Inquire.fromSale = "";
        if (nvl == "全部") {
          this.SaleData = ["全部"];
          if (this.$store.getters.getRoleInfo.AccountType == 0) {
            // 查询分销售赋值
            this.SaleData = this.SaleData.concat(this.$store.getters.getSales);
          } else if (this.$store.getters.getRoleInfo.AccountType == 1) {
            this.SaleData = this.SaleData.concat(this.$store.getters.getSales);
          }
          return;
        }

        if (this.$store.getters.getRoleInfo.AccountType == 2) {
          console.log(111);
          this.CompanyData = [];
          this.SaleData = [];
          // 查询分公司赋值
          this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
          this.Inquire.fromSale = this.$store.getters.getRoleInfo.AccountName;
          return;
        } else if (this.$store.getters.getRoleInfo.AccountType == 7) {
          this.CompanyData = [];

          // 查询分公司赋值
          this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;

          return;
        }

        this.$api
          .get("account/pullOrg2", {
            AccountType: "1",
            AccountName: nvl
          })
          .then(res => {
            this.SaleData = ["全部"];
            console.log(res);
            res.data.map(item => {
              if (item.AccountType == "2") {
                item.Name.map(temp => {
                  this.SaleData.push(temp);
                });
              }
            });
          });
      }
    }
  },
  data() {
    return {
      tableloading: false,
      IncomingPayment: "",
      Refund: "",
      Brokerage:"",
      // 查询数据
      Inquire: {
        fromCompany: "全部", //	所属分公司
        fromSale: "全部", //	所属销售
        goodsType: "全部", //	商品类型
        goodsStatus: 0, //单个商品状态
        city: "", //城市项目代码
        goSonNumber: "", //子订单号
        startTime: "",
        endTime: "",
        page: 1, //
        pageSize: 10 //
      },
      count: 0,
      // 时间
      yearSelect: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 下拉框数据
      CompanyData: ["全部"], //分公司下拉框
      SaleData: ["全部"], //销售下拉框
      goodsTypeData: ["全部", "体检套餐", "加项包", "电子体检卡"],
      goodsStatus: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 2,
          label: "订单入账"
        },
        {
          value: 5,
          label: "退款打款"
        }
      ],
      // 表格数据
      tableData: []
    };
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  mounted() {
    this.findBillDetails();
    this.getSelectionData();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        fromCompany: this.Inquire.fromCompany,
        fromSale: this.Inquire.fromSale,
        goodsType: this.Inquire.goodsType,
        goodsStatus: this.Inquire.goodsStatus,
        city: this.Inquire.city,
        goSonNumber: this.Inquire.goSonNumber,
        page: this.Inquire.page,
        pageSize: this.Inquire.pageSize,
        yearSelect: this.yearSelect
      };
      this.$store.commit("setbillingdetailsmag", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getbillingdetailsmag;
      this.Inquire.fromCompany = body.fromCompany || "全部";
      this.Inquire.fromSale = body.fromSale || "全部";
      this.Inquire.goodsType = body.goodsType || "全部";
      this.Inquire.goodsStatus = body.goodsStatus || "";
      this.Inquire.city = body.city || "";
      this.Inquire.goSonNumber = body.goSonNumber || "";
      this.Inquire.page = body.page || 1;
      this.Inquire.pageSize = body.pageSize || 10;
      this.Inquire.yearSelect = body.yearSelect || [];
      console.log(body);
    },
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      console.log(this.$store.getters.getRoleInfo.AccountType);
      if (this.$store.getters.getRoleInfo.AccountType == 0) {
        // 查询分公司赋值
        this.CompanyData = this.CompanyData.concat(
          this.$store.getters.getBranchOffice
        );
        // 查询分销售赋值
        this.SaleData = this.SaleData.concat(this.$store.getters.getSales);
      } else if (this.$store.getters.getRoleInfo.AccountType == 1) {
        this.CompanyData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany =
          this.$store.getters.getRoleInfo.parentName ||
          this.$store.getters.getRoleInfo.AccountName;
        // 查询分销售赋值
        this.SaleData = this.SaleData.concat(this.$store.getters.getSales);
      } else if (this.$store.getters.getRoleInfo.AccountType == 2) {
        console.log(111);
        this.CompanyData = [];
        this.SaleData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
        this.Inquire.fromSale = this.$store.getters.getRoleInfo.AccountName;
      } else if (this.$store.getters.getRoleInfo.AccountType == 7) {
        console.log(9999);
        this.CompanyData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany =
          this.$store.getters.getRoleInfo.parentName ||
          this.$store.getters.getRoleInfo.AccountName;
        // 查询分销售赋值
        this.SaleData = this.SaleData.concat(this.$store.getters.getSales);
      }
    },
    // 查询对帐管理
    findBillDetails(val) {
      if (val == "搜索") {
        this.Inquire.page = 1;
      }
      if (this.yearSelect.length != 0) {
        this.Inquire.startTime = this.yearSelect[0];
        this.Inquire.endTime = this.yearSelect[1];
      }
      var temp = JSON.stringify(this.Inquire);
      var body = JSON.parse(temp);
      if (this.Inquire.fromCompany == "全部") {
        body.fromCompany = "";
      }
      if (this.Inquire.fromSale == "全部") {
        body.fromSale = "";
      }
      if (this.Inquire.goodsType == "全部") {
        body.goodsType = "";
      }
      console.log("查询对帐管理", body);
      this.tableloading = true;
      this.$api
        .get("/billDetail/findBillDetails", body)
        .then(res => {
          this.tableloading = false;
          console.log("查询对帐管理", res);
          this.tableData = res.data.data.ResultOrders;
          // this.tableData = res.data.data;
          this.IncomingPayment = res.data.data.IncomingPayment;
          this.Brokerage = res.data.data.Brokerage;
          this.Refund = res.data.data.Refund;
          this.count = res.data.count;
        })
        .catch(err => {
          this.tableloading = false;
          this.$message.error(err.msg);
          console.log("err", err);
        });
    },
    // 导出账单记录
    ExportBillRecords() {
      this.$router.push("/reconciliationmanagement/billingexport");
    },
    // 导出账单
    ExportBill() {
      this.$api
        .get("/billDetail/excelBillDetail", this.Inquire)
        .then(res => {
          console.log(res.data);
          console.log(this.$parent.$parent.$parent.weburl + res.data.url);
          window.open(this.$parent.$parent.$parent.weburl + res.data.url);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    handleClick(row) {
      console.log(row.orNumber);
      this.$router.push(
        "/ordermanagement/ordermsg?orNumber=" +
          row.orNumber +
          "&sonNumber=" +
          row.sonNumber
      );
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 分页
    handleSizeChange(val) {
      this.Inquire.pageSize = val;
      this.findBillDetails();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findBillDetails();
      console.log(`当前页: ${val}`);
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("账单明细");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
.inquire {
  .bigbox {
    background-color: #6985d3;
    color: #ffffff;
    line-height: 30px;
    font-size: 20px;
    padding: 10px 20px;
  }
}
</style>

