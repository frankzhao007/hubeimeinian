<template>
  <div class="scheduleList" style="margin: 20px">
    <!-- 搜索栏 -->
    <div class="scheduleList">
      <el-form
        :inline="true"
        :model="seekobj"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <el-form-item label="单位名称：">
          <el-input
            v-model="seekobj.DWMC"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="单位代码：">
          <el-input
            v-model="seekobj.DWDM"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="排期状态：">
          <el-select v-model="seekobj.auditStatus" placeholder="请选择">
            <el-option
              v-for="item in Status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体检分院：">
          <el-select v-model="seekobj.TJFY" placeholder="请选择体检分院">
            <el-option
              v-for="item in TJFYList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排期时间：">
          <el-date-picker
            v-model="seekobj.PQdate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
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
        <div>
          <el-button type="primary" @click="dialogFormVisible=true"
            >新增排期申请</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 数据列表 -->
    <div style="margin-top: 20px">
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
          prop="request.orderID"
          label="单据号"
          min-width="140px"
        ></el-table-column>
        <el-table-column
          prop="request.DWDM"
          label="单位代码"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          prop="request.DWMC"
          label="单位名称"
          min-width="160px"
        ></el-table-column>
        <el-table-column
          prop="request.YWYDM"
          label="业务员"
          min-width="100px"
        ></el-table-column>
        <!-- <el-table-column prop="ZRHSName" label="制单人"></el-table-column> -->
        <!-- <el-table-column prop="YWY_ZG" label="内勤审核人" min-width="100px"></el-table-column> -->
        <el-table-column label="订单状态" min-width="100px">
          <template slot-scope="scope">
            <div v-if="scope.row.order">
              {{ STATUSchange(scope.row.order.auditStatus) }}
            </div>
            <div v-if="!scope.row.order">
              未制单
            </div>

          </template>
        </el-table-column>
        <el-table-column label="排期类型" min-width="100px">
          <template slot-scope="scope">
            {{ PQchange(scope.row.request.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="request.submitAt"
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
            {{ ZXFWchange(scope.row.request.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="request.submitAt" label="排期时间" min-width="110px">
          <template slot-scope="scope">
            {{ CalculatePQTime(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="排期人数" min-width="110px">
          <template slot-scope="scope">
            {{ CalculatePQQuantity(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="request.hospitalName"
          label="体检分院"
          min-width="110px"
        ></el-table-column>
        <!-- <el-table-column prop="YWY_ZG_SHSJ" label="内勤审核时间" min-width="110px"></el-table-column>
        <el-table-column prop="LCDJR" label="财务审核人" min-width="100px"></el-table-column>
        <el-table-column prop="ZXWCSJ" label="财务审核时间" min-width="110px"></el-table-column>-->
        <el-table-column label="操作" fixed="right" min-width="200px" >
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="text"
              @click="lookOrderBasicDetails(scope.row)"
              >查看排期</el-button
            > -->
            <!-- <el-button disabled size="mini" type="text" v-if="role=='湖北销售主管'||role=='内勤'">锁定</el-button> -->
            <div>
              <el-button size="mini" type="text" @click="toPQ(scope.row)">查看排期</el-button>
            </div>
<!--            <div>-->
<!--              <el-button size="mini" type="text" @click="SubmitAudit(scope.row)">提交审核</el-button>-->
<!--            </div>-->
            <div v-if="scope.row.order">
              <div v-if="scope.row.order.auditStatus==1">
                <el-button size="mini" type="text" @click="PQrevocation(scope.row)" >排期撤销</el-button>
              </div>
              <div v-else>
                <el-tooltip class="item" effect="dark" content="请联系团单管理员撤销，排期记录无法多次提交" placement="top-start">
                  <el-button size="mini" type="text" style="color: #C0C4CC"   >排期撤销</el-button>
                </el-tooltip>

              </div>

            </div>
            <div v-if="!scope.row.order">
              <el-tooltip class="item" effect="dark" content="请联系团单管理员撤销，排期记录无法多次提交" placement="top-start">
                <el-button size="mini" type="text"  style="color: #C0C4CC" >排期撤销</el-button>
              </el-tooltip>

            </div>

<!--            <div v-if="scope.row.request.status!=1">-->
<!--              <el-button size="mini" type="text" disabled>排期撤销</el-button>-->
<!--            </div>-->
<!--            <div>-->
<!--              <el-button size="mini" type="text" @click="">删除</el-button>-->
<!--            </div>-->
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

      <el-dialog title="排期申请" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="PQcreate">
          <el-form-item label="排期类型" :label-width="formLabelWidth">
            <el-select v-model="PQcreate.PQstate" placeholder="请选择排期类型">
              <el-option
                v-for="item in dilogPQtype"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="PQcreate.PQstate == 0">
            <el-form-item label="单位代码" :label-width="formLabelWidth">
              <el-select
                @change="PQDWDMChange"
                style="width: 220px"
                v-model="PQcreate.PQDWDM"
                filterable
                remote
                reserve-keyword
                placeholder="请输入单位代码"
                :remote-method="DWDMremoteMethod"
                :loading="DWDMloading">
                <el-option
                  v-for="item in DWDMMSJCodeArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
<!--              <el-input-->
<!--                style="width: 220px"-->
<!--                v-model.trim="PQcreate.PQDWDM"-->
<!--                placeholder="请输入单位代码"-->
<!--                @change="PQDWDMChange"-->
<!--                clearable-->
<!--              ></el-input>-->
            </el-form-item>
            <el-form-item label="单位名称" :label-width="formLabelWidth">
              <el-input
                style="width: 220px"
                v-model="PQcreate.PQDWMC"
                placeholder="请输入单位名称"
                disabled
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="单据号" :label-width="formLabelWidth">
              <el-select

                style="width: 220px"
                v-model="PQcreate.PQDJH"
                filterable
                remote
                reserve-keyword
                placeholder="请输入单据号"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in MSJCodeArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
<!--              <el-input-->
<!--                style="width: 220px"-->
<!--                v-model="PQcreate.PQDJH"-->
<!--                placeholder="请输入单据号"-->
<!--                clearable-->
<!--              ></el-input>-->
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="PQcreateConfirm"
            >确 定</el-button
          >
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

      DWDMMSJCodeList: [],
      DWDMloading: false,
      DWDMMSJCodeArray:[],

      // value: [],
      MSJCodeList: [],
      loading: false,
      MSJCodeArray:[],
      seekobj: {
        DWMC: "",
        DWDM: "",
        TJFY: "",
        PQdate: "",
        auditStatus: -1,
        pageindex: 1,
        pagesize: 10,
      },
      PQcreate: {
        DWMCArry:[],
        PQstate: 0,
        PQDWDM: "",
        PQDWMC: "",
        PQDJH: "",
      },
      tableobj: {
        list: [],
        loading: "",
        total: 0,
      },
      dilogPQtype: [
        {
          value: 0,
          label: "预排",
        },
        {
          value: 1,
          label: "排期",
        },
      ],
      TJFYList: [],
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
      dialogFormVisible:false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.GetDWList();
    this.usermsg = this.$store.getters.getRoleInfo;
    this.GetAllHospital();
    this.GetAllMsjCOde();
    console.log(this.usermsg)
    console.log(this.usermsg.MNId)
    if(this.usermsg.MNId){
      this.GetfuzzyFirmMn();
    }


  },
  methods: {
    // 单位代码搜索匹配
    DWDMremoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.DWDMMSJCodeArray = this.DWDMMSJCodeList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.DWDMMSJCodeArray = [];
      }
    },
    // 搜索匹配
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.MSJCodeArray = this.MSJCodeList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.MSJCodeArray = [];
      }
    },
    // 获取所有单据号
    GetAllMsjCOde() {
      var that = this;
      var body = {
        YWYDM: this.$store.getters.getRoleInfo.MNId,
        auditStatus:"",
        page:1, // 页码
        size:9999 // 单页条数
      }
      this.$network3
        .get("/mnoracle/msj/GetOrderList", body)
        .then((res) => {
          console.log(res.data);
          var Temp=[];
          that.MSJCodeList=[];
          Temp=res.data.OrderList||[];
          Temp.map((item,index)=>{
            var Obj={
              MsjBILLCODE:item.MsjBILLCODE,
              DWDM:item.DWDM,
              DWMC:item.DWMC,
            }
           var stringObj=JSON.stringify(Obj)
            that.MSJCodeList.push({ value: `${stringObj}`, label: `${item.MsjBILLCODE}` })
          })
          console.log(that.MSJCodeList);

        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 获取所有分院
    GetAllHospital() {
      var that = this;
      var body = {
        // page:1, // 页码
        // size:9999 // 单页条数
      }
      this.$network3
        .get("/mnoracle/schedule/HospitalList")
        .then(res => {
          console.log(res.data);
          that.TJFYList=[];
          that.TJFYList=res.data||[];
          console.log(that.TJFYList);

        })
        .catch(err => {
          console.log("err", err);
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
                this.GetDWList();
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
    SubmitAudit(val){
      console.log(val)
      // return ;
      this.$confirm('确认提交审核吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var body={
          id:val.request.id,
          hospitalCode:val.request.hospitalCode,// 分院ID
          schedules:val.request.schedules,/// 排期详情，同排期申请

        };
        this.$network3
          .post("/mnoracle/schedule/UpdateAndAllowRequest",body)
          .then((res)=>{
            if(res.code==200){
              this.GetDWList();
              // that.$router.push('/ScheduleManagement/ScheduleList')
            }else if(res.code==600){
              this.$message.error('排期失败');

            }

          })
          .catch((err)=>{
            console.log(err);
          });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    PQcreateConfirm(){
      console.log(this.PQcreate)
      console.log(this.PQcreate.PQDJH)
      // return ;
      if(this.PQcreate.PQstate==0){
        if(!this.PQcreate.PQDWDM){
          this.$message.error('请输入单位代码');
          return;
        }
        this.dialogFormVisible=false;
        this.$router.push("/ScheduleManagement/OrderSchedule?type=" + this.PQcreate.PQstate+"&DWMC="+ this.PQcreate.PQDWMC+"&DWDM=" + this.PQcreate.PQDWDM+"&YWYDM=" + this.usermsg.MNId);
      }else if(this.PQcreate.PQstate==1){
        if(!this.PQcreate.PQDJH){
          this.$message.error('请输入单据号');
          return;
        }
        this.dialogFormVisible=false;
        this.$router.push("/ScheduleManagement/OrderSchedule?id=" + this.PQcreate.PQDJH+"&type=" +this.PQcreate.PQstate+"&DWDM=" + this.PQcreate.PQDWDM+"&YWYDM=" + this.usermsg.MNId);
      }

    },
    PQDWDMChange(){
      console.log(this.PQcreate.PQDWDM);
      console.log(this.PQcreate.DWMCArry);
      var PQDWDM=JSON.parse(this.PQcreate.PQDWDM)
      this.PQcreate.PQDWMC=PQDWDM.DWMC
      // if(this.DWMCArry&&this.DWMCArry.length>0){
      //   this.DWMCArry.map((item,index)=>{
      //     if(item.DWDM==this.PQcreate.PQDWDM){
      //       this.PQcreate.PQDWMC=item.DWMC
      //     }
      //   })
      // }
      console.log( this.PQcreate.PQDWMC);
    },
    GetfuzzyFirmMn() {
      var that =this;
      this.tableobj.loading = true;
      var body = {
        YWYDM: this.$store.getters.getRoleInfo.MNId,
      };
      this.$network3
        .post("/mnoracle/msj/fuzzyFirmMn", body)
        .then((res) => {
          console.log(res);
          that.DWMCArry=res.data.firmList||[]

          console.log(res.data);
          var Temp=[];
          that.DWDMMSJCodeList=[];
          Temp=res.data.firmList||[];
          Temp.map((item,index)=>{
            var Obj={
              id:item.id,
              DWDM:item.DWDM,
              DWMC:item.DWMC,
            }
            var stringObj=JSON.stringify(Obj)
            that.DWDMMSJCodeList.push({ value: `${stringObj}`, label: `${item.DWDM}` })
          })
          console.log(that.DWDMMSJCodeList);

        })
        .catch((err) => {
          console.log(err);
        });
    },
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
      console.log(val);
      var StringVal=JSON.stringify(val)
      this.$router.push("/ScheduleManagement/CheckSchedule?id=" + val.request.id);
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
    GetDWList() {
      this.tableobj.loading = true;
      var body = {
        DWMC: this.seekobj.DWMC, // 单位代码
        DWDM: this.seekobj.DWDM, // 单位名称
        hospitalCode: this.seekobj.TJFY,//体检分院
        YWYDM: this.$store.getters.getRoleInfo.MNId,
        page: this.seekobj.pageindex, // 页码
        size: this.seekobj.pagesize, // 单页条数
      };
      this.$network3
        .post("/mnoracle/schedule/AuditRequests", body)
        .then((res) => {
          console.log(res);
          this.tableobj.list = res.data.data||[];
          this.tableobj.total = res.data.count;
          this.tableobj.loading = false;
          console.log(this.tableobj.list);
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
      console.log(val);
      console.log(val.order.MsjBILLCODE);
      this.current_chang = val.order.MsjBILLCODE;
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
      switch (val.toString()) {
        case "0":
          return "预排期";
          break;
        case "1":
          return "排期生效";
          break;
        case "2":
          return "排期撤销";
          break;
        default:
          break;
      }
    },
    PQchange(val) {
      console.log(val)
      switch (val.toString()) {
        case "0":
          return "预排";
          break;
        case "1":
          return "排期";
          break;
        case "2":
          return "外部导入排期";
          break;
        default:
          break;
      }
    },
    CalculatePQQuantity(val){
      console.log(val)
      var quantity=0
      if(val.request.status==2){
        if(val.request.schedules.length>0&&val.request.schedules){
          var tempSchedules=val.request.schedules
          console.log(tempSchedules)
          tempSchedules.map((item,index)=>{
            quantity+=Number(item.quota)

          })
        }
        return "撤"+quantity.toString();
      }else{
        if(val.request.status==0){
          if(val.request.schedules.length>0&&val.request.schedules){
            var tempSchedules=val.request.schedules
            console.log(tempSchedules)
            tempSchedules.map((item,index)=>{
              quantity+=Number(item.quota)

            })
          }
          return "预"+quantity.toString();
        }else if(val.request.status==1){
          if(val.request.schedules.length>0&&val.request.schedules){
            var tempSchedules=val.request.schedules
            console.log(tempSchedules)
            tempSchedules.map((item,index)=>{
              quantity+=Number(item.quota)

            })
          }
          return "已排"+quantity.toString();
        }
      }


      console.log(quantity)
    },
    CalculatePQTime(val){
      console.log(val)
      var time=""
      if(val.request.schedules.length>0&&val.request.schedules){
        var tempSchedules=val.request.schedules
        console.log(tempSchedules)
        for (var i=0;i<tempSchedules.length;i++){
          if(tempSchedules.length==1){
            time=tempSchedules[0].date
          }else if(tempSchedules.length>1){
            time=tempSchedules[0].date+"~"+tempSchedules[tempSchedules.length-1].date
          }


        }

      }
      return time;
      console.log(time)
    },
  },
  watch: {},
  computed: {},
};
</script>
<style lang="scss" >
.scheduleList{
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
  .el-dialog{
    min-width: 445px;
  }

}

</style>
