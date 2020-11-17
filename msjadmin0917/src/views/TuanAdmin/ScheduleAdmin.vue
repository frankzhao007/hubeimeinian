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
          <el-input v-model="seekobj.DWMC" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位代码：">
          <el-input v-model="seekobj.DWDM" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="排期状态：">
          <el-select v-model="seekobj.PQstate" placeholder="请选择">
            <el-option
              v-for="item in PQstateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体检分院：">
          <el-select v-model="seekobj.TJFY" placeholder="请选择">
            <el-option
              v-for="item in TJFYList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
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
      </el-form>
    </div>
    <!-- 数据列表 -->
    <div>
      <el-table
        :data="tableobj.list"
        style="width: 100%; margin-top: 20px"
        v-loading="tableobj.loading"
        max-height="600px"
        ref="singleTable"
        highlight-current-row
        @current-change="handleCurrentTableobjChange"
      >
        >
        <el-table-column
          prop="request.orderID"
          label="单据号"
        ></el-table-column>
        <el-table-column prop="request.DWDM" label="单位代码"></el-table-column>
        <el-table-column prop="request.DWMC" label="单位名称"></el-table-column>
        <el-table-column prop="request.YWYXM" label="业务员"></el-table-column>
        <el-table-column   label="订单状态">
          <template  slot-scope="scope">
            <div v-if="scope.row.order">
              {{ STATUSchange2(scope.row.order.auditStatus)}}
            </div>
            <div v-if="scope.row.order==null">
              未制单
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="request.submitAt"
          label="提交时间"
        ></el-table-column>
        <el-table-column label="排期状态">
          <template slot-scope="scope">
            {{ STATUSchange(scope.row.request.status) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="request.hospitalName"
          label="体检分院"
        ></el-table-column>

        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="text" @click="LookDetil(scope.row)"
                >查看</el-button
              >
            </div>
            <div>
              <el-button size="mini" type="text" @click="PQcreate(scope.row)"
                >排期生效</el-button
              >
            </div>
            <div>
              <el-button
                size="mini"
                type="text"
                @click="PQrevocation(scope.row)"
                >排期撤销</el-button
              >
            </div>
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
  name: "ScheduleAdmin",
  components: {},
  data() {
    return {
      seekobj: {
        DWDM: "",
        DWMC: "",
        PQstate: -1,
        TJFY: "",
        pageindex: 1,
        pagesize: 10,
      },
      tableobj: {
        list: [],
        loading: "",
        total: 0,
      },
      PQstateList: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 0,
          label: "预排期",
        },
        {
          value: 1,
          label: "同意排期",
        },
        {
          value: 2,
          label: "拒绝排期",
        },
      ],
      TJFYList: [],
      current_chang: "",
    };
  },
  mounted() {
    this.GetPQList();
    this.GetFYList();
  },
  methods: {
    GetPQList() {
      this.tableobj.loading = true;
      var body = {
        DWMC: this.seekobj.DWMC, // 单位名称
        DWDM: this.seekobj.DWMC, // 单位代码
        status: this.seekobj.PQstate, // 排期状态，-1 全部 0 预排期 1 同意排期 2 拒绝排期
        hospitalCode: this.seekobj.TJFY, // 分院代码
        page: 1,
        size: 10,
      };
      this.$network3
        .post("/mnoracle/schedule/AuditRequests", body)
        .then((res) => {
          console.log(res);
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
          this.tableobj.loading = false;
          console.log(this.tableobj.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GetFYList() {
      this.$network3
        .get("/mnoracle/schedule/HospitalList")
        .then((res) => {
          console.log(res.data);
          this.TJFYList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AddBranch() {
      this.$router.push("/TuanAdmin/AddBranchMM");
    },
    LookDetil(row) {
      // console.log(row.order);
      var stringVal=JSON.stringify(row)
      // console.log(stringVal);
      // return ;
      this.$router.push(
        "/TuanAdmin/CheckTuanDetail?stringVal=" +stringVal);

      // this.$router.push(
      //   "/TuanAdmin/CheckTuanDetail?MsjBILLCODE=" +
      //     row.order.MsjBILLCODE +
      //     "&DJSJ=" +
      //     row.order.DJSJ +
      //     "&TJFY=" +
      //     row.request.hospitalName +
      //     "&TJFYcode=" +
      //     row.request.hospitalCode +
      //     "&date=" +
      //     row.request.date +
      //     "&id=" +
      //     row.request.id +
      //     "&quota=" +
      //     row.request.quota
      // );
    },
    PQcreate(row) {
      console.log(row);
      var body = {
        id: row.request.id, // 申请记录ID
      };
      this.$confirm("你确定要生效此条排期吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$network3
            .post("/mnoracle/schedule/AllowRequest", body)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "排期已生效!",
                });
                this.GetPQList();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    PQrevocation(row) {
      console.log(row);
      var body = {
        id: row.request.id, // 申请记录ID
      };

      this.$confirm("你确定要撤销此条排期吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$network3
            .post("/mnoracle/schedule/RevokeRequest", body)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "排期已撤销!",
                });
                this.GetPQList();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    replaceseek() {
      this.seekobj = {
        FYDM: "",
        FYMC: "",
        pageindex: 1,
        pagesize: 10,
      };
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.GetPQList();
    },
    Delete(row) {
      console.log(row);
      this.$confirm("你确定要删除该分院吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var body = {
            hospitalCode: row.code,
          };
          this.$network3
            .post(
              "http://172.16.2.3:8001/mnoracle/schedule/DeleteHospital",
              body
            )
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.GetPQList();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentTableobjChange(val) {
      console.log(val);
      this.current_chang = val;
    },
    tablesizechange(val) {
      console.log(val);
      this.seekobj.pagesize = val;
      this.seekobj.pageindex = 1;
      this.GetPQList();
    },
    tablepagechange(val) {
      console.log(val);
      this.seekobj.pageindex = val;
      this.GetPQList();
    },
    STATUSchange2(val) {
      // console.log(val);
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
    STATUSchange(val) {
      switch (val) {
        case 0:
          return "预排期";
          break;
        case 1:
          return "同意排期";
          break;
        case 2:
          return "拒绝排期";
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

<style scoped>
</style>
