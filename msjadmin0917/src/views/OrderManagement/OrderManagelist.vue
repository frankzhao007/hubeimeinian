<template>
  <div style="margin:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form
        :inline="true"
        :model="seekobj"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <!-- <el-form-item label="审核状态：">
          <el-select v-model="seekobj.data1" placeholder="" style="width:200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="1"></el-option>
            <el-option label="内勤审核" value="2"></el-option>
            <el-option label="内勤作废" value="3"></el-option>
            <el-option label="财务审核" value="4"></el-option>
            <el-option label="财务作废" value="5"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="审核状态：">
          <el-select v-model="auditStatus" placeholder="请选择">
            <el-option
              v-for="item in auditList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="内勤审核人：">
          <el-input v-model="seekobj.data2" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="财务审核人：">
          <el-input v-model="seekobj.data3" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>-->
        <el-form-item label="时间范围：">
          <el-date-picker
            v-model="seekobj.TimeHorizon"
            value-format="yyyyMMdd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-refresh-right" @click="replaceseek">重 置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="seekbtn">搜 索</el-button>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button type="primary" @click="gotoOBD">制 单</el-button>
          <el-button type="primary" @click>挂账截至日期</el-button>
          <el-button type="primary" @click="toPDF()">导出对账单PDF</el-button>
        </el-form-item>
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
        <el-table-column prop="MsjBILLCODE" label="单据号" min-width="140px"></el-table-column>
        <el-table-column prop="DWDM" label="单位代码" min-width="100px"></el-table-column>
        <el-table-column prop="DWMC" label="单位名称" min-width="160px"></el-table-column>
        <el-table-column prop="WCBGRS" label="折扣率" min-width="100px"></el-table-column>
        <el-table-column prop="YWYDM" label="业务员" min-width="100px"></el-table-column>
        <el-table-column prop="ZRHSName" label="制单人"></el-table-column>
        <!-- <el-table-column prop="YWY_ZG" label="内勤审核人" min-width="100px"></el-table-column> -->
        <el-table-column label="状态" min-width="100px">
          <template slot-scope="scope">
            {{
            STATUSchange(scope.row.auditStatus)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="DJSJ" label="登记时间" min-width="110px"></el-table-column>
        <el-table-column label="付款方式" min-width="100px">
          <template slot-scope="scope">
            {{
            FKFSchange(scope.row.FKFS)
            }}
          </template>
        </el-table-column>
        <el-table-column label="取报告方式" min-width="100px">
          <template slot-scope="scope">
            {{
            ZXFWchange(scope.row.ZXFW)
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="YWY_ZG_SHSJ" label="内勤审核时间" min-width="110px"></el-table-column>
        <el-table-column prop="LCDJR" label="财务审核人" min-width="100px"></el-table-column>
        <el-table-column prop="ZXWCSJ" label="财务审核时间" min-width="110px"></el-table-column>-->
        <el-table-column label="操作" fixed="right" min-width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="lookOrderBasicDetails(scope.row)">查看</el-button>
            <el-button disabled size="mini" type="text" v-if="role=='湖北销售主管'||role=='内勤'">锁定</el-button>
            <el-button
              size="mini"
              type="text"
              :disabled="scope.row.auditStatus != 0"
              @click="Delete(scope.row)"
            >删除</el-button>
            <el-button
              :disabled="scope.row.auditStatus != 0"
              size="mini"
              type="text"
              @click="TJSHAddAudit(scope.row)"
            >提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination
          style="float:right"
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
    <!-- 提交审核弹窗 -->
    <div>
      <el-dialog title="提交审核" :visible.sync="TJSHobj.isshow" width="600px">
        <el-form :model="TJSHobj.msg" label-position="right" label-width="150px" size="medium">
          <el-form-item label="单据号：">
            {{
            TJSHobj.msg.MsjBILLCODE
            }}
          </el-form-item>
          <el-form-item label="单位代码：">{{ TJSHobj.msg.DWDM }}</el-form-item>
          <el-form-item label="单位名称：">{{ TJSHobj.msg.DWMC }}</el-form-item>
          <el-form-item label="付款方式：">
            {{
            FKFSchange(TJSHobj.msg.FKFS)
            }}
          </el-form-item>
          <el-form-item label="取报告方式：">
            {{
            ZXFWchange(TJSHobj.msg.ZXFW)
            }}
          </el-form-item>
          <el-form-item label="销售名称：">
            {{
            TJSHobj.msg.ZRHSName
            }}
          </el-form-item>

          <!-- <el-form-item label="审核人业务员姓名:">
            <el-select v-model="OPYWYXM" placeholder="" style="width:200px" placeholder="请选择审核人">
              <el-option v-for="item in YWYList" :label="item.YWYXM" :key="item.YWYDM" :value="item.YWYXM"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核人业务员代码:">
            {{OPYWYDM}}
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="TJSHobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddAudit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      OPYWYXM: "",
      OPYWYDM: "",
      usermsg: {},
      YWYList: [],
      TJSHobj: {
        msg: {},
        isshow: false,
      },
      seekobj: {
        data1: "",
        data2: "",
        data3: "",
        TimeHorizon: "",
        data5: "",
        pageindex: 1,
        pagesize: 10,
      },
      tableobj: {
        list: [],
        loading: "",
        total: 0,
      },
      auditList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "未审核",
        },
        {
          value: "1",
          label: "审核中",
        },
        {
          value: "2",
          label: "审核通过",
        },
        {
          value: "3",
          label: "审核拒绝",
        },
      ],
      auditStatus: "",
      role: "",
      current_chang: "",
    };
  },
  mounted() {
    console.log(this.$store.getters.getRoleInfo);
    this.usermsg = this.$store.getters.getRoleInfo;
    this.role = this.$store.getters.getrolemsg;
    this.GetOrderList();
  },
  methods: {
    confirmAddAudit() {
      this.$network3
        .post("/mnoracle/orderAudit/submit", {
          oid: this.TJSHobj.msg.MsjBILLCODE,
          uid: this.$store.getters.getRoleInfo.MNId,
          // MsjBILLCODE: this.TJSHobj.msg.MsjBILLCODE,
          // YWYDM: this.usermsg.LinkMan,
          // YWYXM: this.usermsg.AccountName,
          // DWDM: this.TJSHobj.msg.DWDM,
          // DWMC: this.TJSHobj.msg.DWMC,
          // FKFS: this.TJSHobj.msg.FKFS,
          // ZXFW: this.TJSHobj.msg.ZXFW,
          // OPYWYDM: this.OPYWYDM,
          // OPYWYXM: this.OPYWYXM
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("提交审核成功！");
            this.TJSHobj.isshow = false;
            this.GetOrderList();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    TJSHAddAudit(row) {
      console.log(row);
      this.GetCombo(row);

      // this.FindYWYByRoleID();
    },
    // 03-获取订单套餐信息
    GetCombo(row) {
      this.$network3
        .get("/mnoracle/msj/GetCombo", {
          MsjBILLCODE: row.MsjBILLCODE,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.GetDetail(res.data[i],row);
              }
            } else {
              this.$message.error("订单信息填写不完整，请核对后提交!");
            }
          }
        });
    },
    // 04-获取套餐明细详情
    GetDetail(row,row2) {
      this.$network3
        .get("/mnoracle/msj/GetDetail", {
          MsjBILLCODE: row.MsjBILLCODE,
          ID: row.ID,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            if (res.data.length > 0) {
              this.TJSHobj.isshow = true;
              this.TJSHobj.msg = row2;
              this.OPYWYXM = "";
              this.OPYWYDM = "";
            } else {
              this.$message.error("订单信息填写不完整，请核对后提交!");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    Delete(row) {
      console.log(row);
      this.$confirm("是否删除此订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var body = {
            MsjBILLCODE: row.MsjBILLCODE,
          };
          this.$network3
            .get("/mnoracle/msj/DeleteOrder", body)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.GetOrderList();
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
    // FindYWYByRoleID() {
    //   this.$network3
    //     .get("/mnoracle/FindYWYByRoleID", {
    //       RoleID: "5909863743348674560"
    //     })
    //     .then(res => {
    //       console.log(res);
    //       if (res.code == 200) {
    //         this.YWYList = res.data;
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    replaceseek() {
      this.seekobj.TimeHorizon = "";
      this.auditStatus = "";
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
    tableRowClassName({ row, rowIndex }) {
      switch (row.auditStatus) {
        case 0:
          return "auditStatus0-row";
          break;
        case 1:
          return "auditStatus1-row";
          break;
        case 2:
          return "auditStatus2-row";
          break;
        case 3:
          return "auditStatus3-row";
          break;

        default:
          break;
      }
      return "";
    },
    FKFSchange(val) {
      switch (val) {
        case "1":
          return "套餐挂账+加选项自付费";
          break;
        case "2":
          return "全自付费";
          break;
        case "3":
          return "全挂账";
          break;
        case "4":
          return "套餐用销售卡+加选项自付费";
          break;
        case "5":
          return "全用销售卡";
          break;

        default:
          break;
      }
    },
    ZXFWchange(val) {
      switch (val) {
        case "1":
          return "送达单位";
          break;
        case "2":
          return "自取";
          break;
        case "3":
          return "邮寄";
          break;
        case "4":
          return "网络邮寄";
          break;
        case "5":
          return "给业务员";
          break;
        case "6":
          return "个人邮寄（到付）";
          break;
        case "7":
          return "单位邮寄（到付）";
          break;

        default:
          break;
      }
    },
    lookOrderBasicDetails(row) {
      console.log(row);
      this.$router.push(
        "/OrderManagement/OrderBasicDetails?MsjBILLCODE=" + row.MsjBILLCODE
      );
    },
    fmmmdatatime(time) {
      console.log(time);

      var date = new Date(time);
      console.log(date);
      console.log(date.getFullYear());
      console.log(date.getMonth());
      console.log(date.getDate());

      var date_value =
        String(date.getFullYear()) +
        this.xiaoyushi(date.getMonth() + 1) +
        this.xiaoyushi(date.getDate());
      return date_value;
    },
    xiaoyushi(str) {
      if (str < 10) {
        return "0" + str;
      } else {
        return str;
      }
    },
    tablesizechange(val) {
      console.log(val);
      this.seekobj.pagesize = val;
      this.seekobj.pageindex = 1;
      this.GetOrderList();
    },
    tablepagechange(val) {
      console.log(val);
      this.seekobj.pageindex = val;
      this.GetOrderList();
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.GetOrderList();
    },
    // 02-获取订单列表
    GetOrderList() {
      var body = {
        YWYDM: this.$store.getters.getRoleInfo.MNId,
        auditStatus: this.auditStatus,
        startTime: "",
        endTime: "",
        page: this.seekobj.pageindex,
        size: this.seekobj.pagesize,
      };
      if (this.usermsg.AccountType != "2") {
        body.YWYDM = "";
      }

      if (
        this.seekobj.TimeHorizon &&
        Array.isArray(this.seekobj.TimeHorizon) &&
        this.seekobj.TimeHorizon.length > 1
      ) {
        body.startTime = this.seekobj.TimeHorizon[0];
        body.endTime = this.seekobj.TimeHorizon[1];
      } else {
        var nowdate = new Date();
        body.startTime = this.fmmmdatatime(
          nowdate.setMonth(nowdate.getMonth() - 6)
        );
        body.endTime = this.fmmmdatatime(Number(new Date()));
      }
      this.tableobj.loading = true;
      this.$network3
        .get("/mnoracle/msj/GetOrderList", body)
        .then((res) => {
          console.log(res);
          this.tableobj.list = res.data.OrderList;
          this.tableobj.total = res.data.count;
          this.tableobj.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentTableobjChange(val) {
      console.log(val.MsjBILLCODE);
      this.current_chang = val.MsjBILLCODE;
    },
    toPDF() {
      console.log(this.$parent.$parent.$parent);
      if (this.current_chang == "") {
        this.$message.error("请选择要导出的账单！");
      } else {
        this.$confirm(
          "是否导出单据号为" + this.current_chang + "的账单？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            window.open(
              this.$parent.$parent.$parent.weburl_hb +
                "/mnoracle/msj/ExportStatement?MsjBILLCODE=" +
                this.current_chang
            );
            this.$message({
              type: "success",
              message: "导出成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消导出",
            });
          });
      }
    },
    gotoOBD() {
      this.$router.push("/OrderManagement/OrderBasicDetails");
    },
  },
  watch: {
    OPYWYXM(nvl, ovl) {
      console.log(nvl, ovl);
      this.YWYList.map((item) => {
        console.log(item);

        if (item.YWYXM == nvl) {
          this.OPYWYDM = item.YWYDM;
        }
      });
    },
  },
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
