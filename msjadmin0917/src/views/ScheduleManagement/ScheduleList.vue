<template>
  <div style="margin: 20px">
    <!-- 搜索栏 -->
    <div>
      <el-form
        :inline="true"
        :model="seekobj"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <el-form-item label="单位名称：">
          <el-input v-model="seekobj.DWMC" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位代码：">
          <el-input v-model="seekobj.DWDM" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="排期状态：">
          <el-select v-model="seekobj.auditStatus" placeholder="请选择" >
            <el-option
              v-for="item in Status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            @click="replaceseek"
            >重 置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="seekbtn"
            >搜 索</el-button
          >
        </el-form-item>
        <div></div>
      </el-form>
    </div>
    <!-- 数据列表 -->
    <div>
      <el-table
        :data="tableobj.list"
        style="width: 100%"
        v-loading="tableobj.loading"
        max-height="600px"
        ref="singleTable"
        highlight-current-row
        @current-change="handleCurrentTableobjChange"
      >
        >
        <el-table-column
          prop="MsjBILLCODE"
          label="单据号"
          min-width="140px"
        ></el-table-column>
        <el-table-column
          prop="DWDM"
          label="单位代码"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          prop="DWMC"
          label="单位名称"
          min-width="160px"
        ></el-table-column>
        <el-table-column
          prop="YWYDM"
          label="业务员"
          min-width="100px"
        ></el-table-column>
        <!-- <el-table-column prop="ZRHSName" label="制单人"></el-table-column> -->
        <!-- <el-table-column prop="YWY_ZG" label="内勤审核人" min-width="100px"></el-table-column> -->
        <el-table-column label="订单状态" min-width="100px">
          <template slot-scope="scope">
            {{ STATUSchange(scope.row.auditStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="DJSJ"
          label="提交时间"
          min-width="110px"
        ></el-table-column>
        <!-- <el-table-column label="付款方式" min-width="100px">
          <template slot-scope="scope">
            {{
            FKFSchange(scope.row.FKFS)
            }}
          </template>
        </el-table-column> -->
        <el-table-column label="排期状态" min-width="100px">
          <template slot-scope="scope">
            {{ ZXFWchange(scope.row.ZXFW) }}
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="DJSJ"-->
<!--          label="排期人数"-->
<!--          min-width="110px"-->
<!--        ></el-table-column>-->
        <!-- <el-table-column prop="YWY_ZG_SHSJ" label="内勤审核时间" min-width="110px"></el-table-column>
        <el-table-column prop="LCDJR" label="财务审核人" min-width="100px"></el-table-column>
        <el-table-column prop="ZXWCSJ" label="财务审核时间" min-width="110px"></el-table-column>-->
        <el-table-column label="操作" fixed="right" min-width="200px">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="text"
              @click="lookOrderBasicDetails(scope.row)"
              >查看排期</el-button
            > -->
            <!-- <el-button disabled size="mini" type="text" v-if="role=='湖北销售主管'||role=='内勤'">锁定</el-button> -->
            <el-button
              size="mini"
              type="text"
              @click="toPQ(scope.row)"
              >订单排期</el-button
            >
            <!-- <el-button
              :disabled="scope.row.auditStatus != 0"
              size="mini"
              type="text"
              @click="TJSHAddAudit(scope.row)"
              >查看排期记录</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 30px; margin-top: 20px">
        <el-pagination
          style="float: right"
          @size-change="tablesizechange"
          @current-change="tablepagechange"
          :current-page="seekobj.pageindex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="seekobj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableobj.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      seekobj: {
        DWMC: "",
        DWDM: "",
        auditStatus: -1,

        pageindex: 1,
        pagesize: 10,
      },
      tableobj: {
        list: [],
        loading: "",
        total: 0,
      },
      Status: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 3,
          label: "待排期",
        },
        {
          value: 0,
          label: "预排期",
        },
        {
          value: 1,
          label: "排期生效",
        },
        {
          value: 2,
          label: "排期撤销",
        },
      ],
      current_chang: "",
    };
  },
  mounted() {
    this.GetDWList();
  },
  methods: {
    replaceseek() {
      this.seekobj = {
        DWMC: "",
        DWDM: "",
        auditStatus: -1,
        pageindex: 1,
        pagesize: 10,
      };
      this.GetDWList();
    },
    toPQ(val) {
      this.$router.push("/ScheduleManagement/OrderSchedule?id=" + val.MsjBILLCODE+"&DWDM=" + val.DWDM+"&YWYDM=" + val.YWYDM);
    },
    GetDWList() {
      this.tableobj.loading = true;
      var body = {
        DWMC: this.seekobj.DWMC, // 单位代码
        DWDM: this.seekobj.DWDM, // 单位名称
        schedStatus: this.seekobj.auditStatus,
        YWYDM: this.$store.getters.getRoleInfo.MNId,
        page: 1, // 页码
        size: 10, // 单页条数
      };
      this.$network3
        .post("/mnoracle/schedule/OrderSearch", body)
        .then((res) => {
          console.log(res);
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
          this.tableobj.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.GetDWList();
    },
    handleCurrentTableobjChange(val) {
      console.log(val.MsjBILLCODE);
      this.current_chang = val.MsjBILLCODE;
    },
    tablesizechange(val) {
      console.log(val);
      this.seekobj.pagesize = val;
      this.seekobj.pageindex = 1;
      this.GetDWList();
    },
    tablepagechange(val) {
      console.log(val);
      this.seekobj.pageindex = val;
      this.GetDWList();
    },
    STATUSchange(val) {
      switch (val) {
        case 0:
          return "未审核";
          break;
        case 1:
          return "审核中";
          break;
        case 2:
          return "审核通过";
          break;
        case 3:
          return "审核拒绝";
          break;

        default:
          break;
      }
    },
    ZXFWchange(val) {
      switch (val) {
        case "-1":
          return "全部";
          break;
        case "0":
          return "预排期";
          break;
        case "1":
          return "排期生效";
          break;
        case "2":
          return "排期撤销";
          break;
        case "3":
          return "待排期";
          break;

        default:
          break;
      }
    },
  },
  watch: {},
  computed: {},
};
</script>
<style lang="scss" scope>
.el-date-editor .el-range-separator {
  width: 10%;
}
.el-table .auditStatus0-row {
  color: #000000;
}
.el-table .auditStatus1-row {
  color: #4c00ff;
}
.el-table .auditStatus2-row {
  color: #409eff;
}
.el-table .auditStatus3-row {
  color: #67c23a;
}
</style>
