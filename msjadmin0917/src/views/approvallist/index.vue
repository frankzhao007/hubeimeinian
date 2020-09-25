<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">分公司：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.fromCompany" :disabled="fromCompanyData.length == 0" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in fromCompanyData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">审核状态：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.orderStatus" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="(item,index) in auditStatusData" :key="item.index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">审批提交人：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.subApprover" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">审批编号：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.orderId" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">提交时间：</div>
            <div class="grid_content">
              <el-date-picker v-model="yearSelect" size="medium" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>
          <div class="inquire">
            <el-button :disabled="!Clickable.export" class="grid_button" type="primary" size="medium" @click="excelApprovalRecords">导出记录</el-button>
            <el-button :disabled="!Clickable.export" class="grid_button" type="primary" size="medium" @click="selectedExport()">批量导出</el-button>
            <el-button :disabled="!Clickable.export" class="grid_button" type="primary" size="medium" @click="excelApproval()">全部导出</el-button>
            <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" @click="searchFor()" icon="el-icon-search">搜索</el-button>
          </div>
        </el-row>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="inquire">
      <el-button :disabled="!Clickable.add" @click="goNewApproval" v-if="RoleInfo.AccountType ==2" type="primary" size="medium" icon="el-icon-plus">新增审批</el-button>
    </div>
    <!-- 信息列表 -->
    <div>
      <el-table :row-key="RowKey" ref="multipleTable" @selection-change="handleSelectionChange" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column :reserve-selection="true" type="selection" width="55">
        </el-table-column>
        <el-table-column label="审批编号" min-width="120" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.preview" type="text" size="small" @click="goContent(scope.row)">{{scope.row.orderId}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="insComp" label="单位" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="subDate" label="提交日期" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="审批提交人" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.submitters.submitter}}
          </template>
        </el-table-column>
        <el-table-column label="审批人" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <el-popover trigger="hover" placement="top">
              {{ApproverData(scope.row.Approver)}}
              <div slot="reference" class="TooLong">
                {{ApproverData(scope.row.Approver)}}
              </div>
            </el-popover> -->
            {{ApproverData(scope.row.Approver)}}
          </template>
        </el-table-column>
        <el-table-column label="审批状态" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.review" @click="ReviewStaff(scope.row.Approver,scope.row.orderId)" v-if="RoleInfo.AccountType != 2" type="text" size="small">
              <span v-if="scope.row.orderStatus == 1">待审核</span>
            </el-button>
            <div v-else>
              <span v-if="scope.row.orderStatus == 1">待审核</span>
            </div>
            <span v-if="scope.row.orderStatus == 2">审核通过</span>
            <span v-if="scope.row.orderStatus == 3">审核未通过</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 审核弹窗 -->
    <div class="approvallist_Review">
      <el-dialog title="审核" :visible.sync="ReviewDialog" width="300px" center top="35vh">
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateApproval(3)">审核不通过</el-button>
          <el-button type="primary" @click="updateApproval(2)">审核通过</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Inquire.page" :page-sizes="[10, 20, 50, 100]" :page-size="Inquire.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "approvallist",
  components: {},
  watch: {},
  data() {
    return {
      // 查询数据
      Inquire: {
        fromCompany: "全部", //	所属分公司
        orderStatus: "全部", //	审核状态
        subApprover: "", //	审批提交人
        orderId: "", // 审批编号单ID
        subDate: "", //	提交时间
        endDate: "", //结束世间
        page: 1, //
        pageSize: 10 //
      },
      count: 0,
      //时间
      yearSelect: [],
      //时间
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
      // 下拉框
      fromCompanyData: ["全部"],
      auditStatusData: [
        {
          label: "全部",
          value: "全部"
        },
        {
          label: "待审核",
          value: "1"
        },
        {
          label: "审核通过",
          value: "2"
        },
        {
          label: "审核未通过",
          value: "3"
        }
      ],
      tableData: [],
      // 弹窗
      ReviewDialog: false, //审核弹窗
      multipleSelection: [],
      RowKey(row) {
        return row.orderId;
      }
    };
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  mounted() {
    this.findApprovals();
    this.getSelectionData();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        fromCompany: this.Inquire.fromCompany,
        orderStatus: this.Inquire.orderStatus,
        subApprover: this.Inquire.subApprover,
        orderId: this.Inquire.orderId,
        page: this.Inquire.page,
        pageSize: this.Inquire.pageSize,
        yearSelect: this.yearSelect
      };
      this.$store.commit("setapprovallistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getapprovallistmsg;
      this.Inquire.fromCompany = body.fromCompany || "全部";
      this.Inquire.orderStatus = body.orderStatus || "全部";
      this.Inquire.subApprover = body.subApprover || "";
      this.Inquire.orderId = body.orderId || "";
      this.Inquire.page = body.page || 1;
      this.Inquire.pageSize = body.pageSize || 10;
      this.yearSelect = body.yearSelect || [];
      console.log(body);
    },
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      console.log(this.$store.getters.getRoleInfo.AccountType);
      if (this.$store.getters.getRoleInfo.AccountType == "0") {
        // 查询分公司赋值
        this.fromCompanyData = this.fromCompanyData.concat(
          this.$store.getters.getBranchOffice
        );
      } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
        this.fromCompanyData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany =  this.$store.getters.getRoleInfo.parentName || this.$store.getters.getRoleInfo.AccountName;
      } else if (this.$store.getters.getRoleInfo.AccountType == "2"||this.$store.getters.getRoleInfo.AccountType == "7") {
        this.fromCompanyData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
        // 上传表格企业
        this.UploadFormcompanyData = this.$store.getters.getEnterprise;
      }
    },
    findApprovals() {
      // console.log(this.Inquire);
      this.$api
        .get("/approval/findApprovals", this.Inquire)
        .then(res => {
          console.log(res.data);
          this.count = res.data.count;
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 搜索
    searchFor() {
      this.Inquire.page = 1;
      console.log(this.yearSelect);
      if (
        !this.yearSelect ||
        !Array.isArray(this.yearSelect) ||
        this.yearSelect.length == 0
      ) {
        this.Inquire.subDate = "";
        this.Inquire.endDate = "";
      } else {
        this.Inquire.subDate = this.yearSelect[0];
        this.Inquire.endDate = this.yearSelect[1];
      }
      // 审批列表
      this.findApprovals();
    },
    // 新增审批
    goNewApproval() {
      this.$router.push("/approvalmanagement/newapproval");
    },
    // 查看审批
    goContent(row) {
      console.log("跳转详情", row);
      this.$router.push("/approvalmanagement/content?orderId=" + row.orderId);
    },
    // 导出勾选数据
    selectedExport() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请勾选数据！");
        return;
      }
      console.log(this.multipleSelection);
      var temp = JSON.parse(JSON.stringify(this.multipleSelection));
      var body = {
        fromCompany: this.Inquire.fromCompany,
        orderIds: [],
        orderId: "",
        orderStatus: "",
        subApprover: "",
        subDate: "",
        endDate: ""
      };
      temp.map(i => {
        body.orderIds.push(i.orderId);
      });
      console.log(body);
      this.$api
        .post("/approval/excelApproval", body)
        .then(res => {
          console.log(res.data);
          console.log(this.$parent.$parent.$parent.weburl + res.data.url);
          window.open(this.$parent.$parent.$parent.weburl + res.data.url);
          this.$refs.multipleTable.clearSelection();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 导出
    excelApproval() {
      this.$api
        .post("/approval/excelApproval", this.Inquire)
        .then(res => {
          console.log(res.data);
          console.log(this.$parent.$parent.$parent.weburl + res.data.url);
          window.open(this.$parent.$parent.$parent.weburl + res.data.url);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 导出记录
    excelApprovalRecords() {
      this.$router.push("/approvalmanagement/approvalexport");
    },
    // 审核
    ReviewStaff(row, val) {
      console.log(row);
      console.log(val);
      console.log("当前用户", this.RoleInfo.Mobile);
      var temp = [];
      for (let i = 0; i < row.length; i++) {
        const element = row[i];
        if (this.RoleInfo.Mobile == row[i].mobile) {
          console.log("拥有审核权限");
        } else {
          console.log("无审核权限");
          temp.push(i);
        }
      }
      if (temp.length == row.length) {
        this.$message.warning("当前账号不是审批人！");
        return;
      }
      this.appOrId = val;
      this.ReviewDialog = true;
    },
    // 审核post
    updateApproval(val) {
      this.$api
        .post("/approval/updateApproval", {
          appOrId: this.appOrId,
          approverStatus: JSON.stringify(val)
        })
        .then(res => {
          console.log(res.data);
          this.$message.success("操作成功");
          this.findApprovals();
          this.ReviewDialog = false;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 数据转换
    ApproverData(val) {
      // console.log(val);
      var temp = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i];
        temp.push(element.approver);
      }
      return temp.join();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.Inquire.page = 1;
      this.Inquire.pageSize = val;
      this.findApprovals();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findApprovals();
      console.log(`当前页: ${val}`);
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("this.multipleSelection", this.multipleSelection);
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("审批列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    },
    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss">
.approvallist_Review {
  .el-dialog__body {
    padding: 10px;
  }
}
</style>