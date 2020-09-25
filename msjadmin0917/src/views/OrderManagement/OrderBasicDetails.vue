<template>
  <div style="margin:20px">
    <div style="font-size:20px">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp订单基本情况</span>
    </div>
    <div style="margin-top:20px">
      <el-form
        :inline="true"
        :rules="seekobjrules"
        ref="ruleForm"
        :model="seekobj"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <el-form-item label="订单号：">
          <el-input
            v-model="seekobj.MsjBILLCODE"
            placeholder="订单号为自动生成"
            disabled
            style="width:180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单单位：" prop="DWDM">
          <el-select
            v-model="seekobj.DWDM"
            style="width:180px"
            filterable
            remote
            reserve-keyword
            :disabled="seekobj.auditStatus==1"
            placeholder="请输入"
            :remote-method="DWremoteMethod"
            :loading="DWloading"
            @change="DWDMchange"
            @focus="DWDMFocus"
          >
            <el-option
              v-for="item in DWoptions"
              :key="item.DWDM"
              :label="item.DWMC"
              :value="item.DWDM"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询报告方式：" prop="QBGDFS">
          <el-select
            v-model="seekobj.QBGDFS"
            placeholder
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="仅单位" value="1"></el-option>
            <el-option label="仅个人" value="2"></el-option>
            <el-option label="全禁止" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式：" prop="FKFS">
          <el-select
            v-model="seekobj.FKFS"
            placeholder
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
          >
            <el-option label="套餐挂账+加选项目自费" value="1"></el-option>
            <el-option label="全自费付" value="2"></el-option>
            <el-option label="全挂账" value="3"></el-option>
            <el-option label="套餐用销售卡+加选项自费" value="4"></el-option>
            <el-option label="全用销售卡" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体检类别：">
          <el-select
            v-model="seekobj.READ_ORNOT"
            placeholder
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
          >
            <el-option label="年度" value="N"></el-option>
            <el-option label="入职" value="Y"></el-option>
            <el-option label="优先出报告" value="X"></el-option>
            <el-option label="妇检" value="F"></el-option>
            <el-option label="外检" value="W"></el-option>
            <el-option label="职业病" value="Z"></el-option>
            <el-option label="下午体检" value="U"></el-option>
            <el-option label="个检" value="S"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加项折扣率：" prop="WCBGRS">
          <el-input
            v-model="seekobj.WCBGRS"
            placeholder="请填写"
            clearable
            style="width:160px"
            :disabled="seekobj.auditStatus==1"
          ></el-input>&nbsp&nbsp%
        </el-form-item>
        <el-form-item label="凭证卡订单：" prop="EMAIL">
          <el-select v-model="seekobj.EMAIL" placeholder disabled style="width:180px">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始体检时间：" prop="HTSJ">
          <el-input
            v-model="seekobj.HTSJ"
            clearable
            :disabled="seekobj.auditStatus==1"
            maxlength="10"
            style="width:180px"
            type="text"
            placeholder="0000-00-00"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务员：">
          <el-input v-model="seekobj.YWYDM" placeholder="选择订单单位自动填充" disabled style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="套餐变更提醒：" prop="TDHF">
          <el-select
            v-model="seekobj.TDHF"
            placeholder="请选择"
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
          >
            <el-option label="不做任何提醒" value="N"></el-option>
            <el-option label="女性提醒更改为已婚套餐" value="Y"></el-option>
            <el-option label="全客人提醒" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="全国订单：">
          <el-select
            v-model="seekobj.ZLPG_SHRY"
            placeholder="请选择"
            clearable
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
          >
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告领取方式：">
          <el-select
            v-model="seekobj.ZXFW"
            placeholder="请选择"
            clearable
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
          >
            <el-option label="送达单位" value="1"></el-option>
            <el-option label="自取" value="2"></el-option>
            <el-option label="邮寄" value="3"></el-option>
            <el-option label="网络查询" value="4"></el-option>
            <el-option label="给业务员" value="5"></el-option>
            <el-option label="个人邮寄（到付）" value="6"></el-option>
            <el-option label="单位邮寄（到付）" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算类型：" prop="ZRYS">
          <el-select
            v-model="seekobj.ZRYS"
            placeholder
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
          >
            <el-option label="月度结算" value="30"></el-option>
            <el-option label="季度结算" value="90"></el-option>
            <el-option label="一次结算" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单付款日期：" prop="SFJZSJ">
          <el-input
            v-model="seekobj.SFJZSJ"
            clearable
            maxlength="10"
            style="width:180px"
            :disabled="seekobj.auditStatus==1"
            type="text"
            placeholder="0000-00-00"
          ></el-input>
        </el-form-item>
        <el-form-item label="预计体检金额：" prop="WCTJRS">
          <el-input
            v-model="seekobj.WCTJRS"
            placeholder="请填写"
            clearable
            style="width:96px"
            :disabled="seekobj.auditStatus==1"
          ></el-input>（单位：元）
        </el-form-item>
        <el-form-item label="预计体检人数：" prop="LXR">
          <el-input
            v-model="seekobj.LXR"
            placeholder="请填写"
            clearable
            :disabled="seekobj.auditStatus==1"
            style="width:96px"
            @input="LXRinput"
          ></el-input>（单位：人）
        </el-form-item>
        <el-form-item label="免费早餐：" :disabled="seekobj.auditStatus==1">
          <div style="width:180px">
            <el-radio v-model="seekobj.freeBreakfast" label="1">有</el-radio>
            <el-radio v-model="seekobj.freeBreakfast" label="2">无</el-radio>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin:0 40px">
      <div style="margin-bottom:10px">备注一：（人员和套餐对应关系）</div>
      <el-input
        type="textarea"
        :disabled="seekobj.auditStatus==1"
        placeholder="备注填写业务员姓名，联系电话以及体检时间和体检截止时间"
        :autosize="{ minRows: 4, maxRows: 6}"
        v-model="seekobj.XSYQ"
      ></el-input>
    </div>
    <div style="margin:10px 40px">
      <div style="margin-bottom:10px">备注二：</div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        v-model="seekobj.JGXX"
        :disabled="seekobj.auditStatus==1"
      ></el-input>
    </div>

    <div style="margin:20px 40px">
      <!-- <el-button type="primary" @click="gotoOCD">填写订单套餐信息</el-button> -->
      <div style="float:left" :class="isshowsubbtn? 'subbtnclass':''">
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">填写订单套餐信息</el-button> -->
      </div>
      <div style="float:right">
        <el-button @click="$router.go(-1)">取 消</el-button>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button> -->
        <!--<el-button type="primary" @click="savebtn('ruleForm')">保 存</el-button>-->
        <el-button type="primary" @click="submitForm('ruleForm')">填写订单套餐信息</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入预计体检金额"));
      } else {
        let myreg = /^[0-9]+(.[0-9]{1,2})?$/;
        if (!myreg.test(value)) {
          callback(new Error("请输入正确金额"));
        }
        callback();
      }
    };
    return {
      noEntereightZHEShow: false,
      stringlength: 0,
      stringlength1: 0,
      eightZHEShow: false,
      DWloading: false,
      DWoptions: [],
      isshowsubbtn: true,
      seekobj: {
        MsjBILLCODE: "", //订单号
        DWDM: "", //单位编码
        QBGDFS: "0",
        FKFS: "1",
        READ_ORNOT: "N",
        WCBGRS: "100",
        EMAIL: "N",
        HTSJ: "",
        YWYDM: "",
        TDHF: "N",
        ZLPG_SHRY: "N",
        ZXFW: "",
        ZRYS: "-1",
        SFJZSJ: "",
        WCTJRS: "",
        LXR: "",
        MFZC: "",
        XSYQ: "",
        JGXX: "",
      },
      seekobjrules: {
        DWDM: [
          {
            required: true,
            message: "请输入订单单位",
            trigger: ["change", "blur"],
          },
        ],
        QBGDFS: [
          {
            required: true,
            message: "请选择查询报告方式",
            trigger: ["change", "blur"],
          },
        ],
        FKFS: [
          {
            required: true,
            message: "请选择付款方式",
            trigger: ["change", "blur"],
          },
        ],

        WCBGRS: [
          {
            required: true,
            message: "请输入加项折扣率",
            trigger: ["change", "blur"],
          },
        ],
        EMAIL: [
          {
            required: true,
            message: "请选择凭证卡订单",
            trigger: ["change", "blur"],
          },
        ],
        HTSJ: [
          {
            required: true,
            message: "请选择开始体检时间",
            trigger: ["change", "blur"],
          },
        ],

        TDHF: [
          {
            required: true,
            message: "请选择套餐变更提醒",
            trigger: ["change", "blur"],
          },
        ],

        ZRYS: [
          {
            required: true,
            message: "请选择结算类型",
            trigger: ["change", "blur"],
          },
        ],
        SFJZSJ: [
          {
            required: true,
            message: "请选择订单付款日期",
            trigger: ["change", "blur"],
          },
        ],
        WCTJRS: [
          {
            required: true,
            message: "请输入预计体检金额",
            trigger: ["change", "blur"],
          },
          { validator: validatePass, trigger: ["change", "blur"] },
        ],
        LXR: [
          {
            required: true,
            message: "请输入预计体检人数",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  created() {
    if (this.$route.query) {
      console.log(this.$route.query);
      this.$network3
        .get("/mnoracle/msj/GetOrder", {
          MsjBILLCODE: this.$route.query.MsjBILLCODE,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            var body = res.data;
            console.log(body);
            this.seekobj.MsjBILLCODE = body.MsjBILLCODE || "";
            this.seekobj.DWDM = body.DWDM || "";
            this.seekobj.DWMC = body.DWMC || "";
            this.seekobj.QBGDFS = body.QBGDFS || "0";
            this.seekobj.FKFS = body.FKFS || "1";
            this.seekobj.READ_ORNOT = body.READ_ORNOT || "N";
            this.seekobj.WCBGRS = body.WCBGRS || "100";
            this.seekobj.EMAIL = body.EMAIL || "N";
            this.seekobj.HTSJ = body.HTSJ || "";
            this.seekobj.YWYDM = body.YWYDM || "";
            this.seekobj.TDHF = body.TDHF || "N";
            this.seekobj.ZLPG_SHRY = body.ZLPG_SHRY || "N";
            this.seekobj.ZXFW = body.ZXFW || "";
            this.seekobj.ZRYS = body.ZRYS || "-1";
            this.seekobj.SFJZSJ = body.SFJZSJ || "";
            this.seekobj.WCTJRS = body.WCTJRS || "";
            this.seekobj.LXR = body.LXR || "";
            this.seekobj.freeBreakfast = body.freeBreakfast || "";
            this.seekobj.XSYQ = body.XSYQ || "";
            this.seekobj.JGXX = body.JGXX || "";
            this.seekobj.auditStatus = body.auditStatus;
            this.DWremoteMethod(body.DWDM);
            setTimeout(() => {
              this.isshowsubbtn = false;
            }, 10);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // this.seekobj.YWYDM = this.$store.getters.getRoleInfo.LinkMan;
      return;
    }
    var body = this.$store.getters.getOrderBasicDetailsmsg;
    console.log(body);
    this.seekobj.MsjBILLCODE = body.MsjBILLCODE || "";
    this.seekobj.DWDM = body.DWDM || "";
    this.seekobj.DWDC = body.DWDC || "";
    this.seekobj.QBGDFS = body.QBGDFS || "0";
    this.seekobj.FKFS = body.FKFS || "1";
    this.seekobj.READ_ORNOT = body.READ_ORNOT || "N";
    this.seekobj.WCBGRS = body.WCBGRS || "100";
    this.seekobj.EMAIL = body.EMAIL || "N";
    this.seekobj.HTSJ = body.HTSJ || "";
    // this.seekobj.YWYDM = body.YWYDM || "";
    this.seekobj.TDHF = body.TDHF || "N";
    this.seekobj.ZLPG_SHRY = body.ZLPG_SHRY || "N";
    this.seekobj.ZXFW = body.ZXFW || "";
    this.seekobj.ZRYS = body.ZRYS || "-1";
    this.seekobj.SFJZSJ = body.SFJZSJ || "";
    this.seekobj.WCTJRS = body.WCTJRS || "";
    this.seekobj.LXR = body.LXR || "";
    this.seekobj.freeBreakfast = body.freeBreakfast || "";
    this.seekobj.XSYQ = body.XSYQ || "";
    this.seekobj.JGXX = body.JGXX || "";

    // this.seekobj.YWYDM = this.$store.getters.getRoleInfo.LinkMan;
  },
  methods: {
    savebtn(formName) {
      console.log(this.$refs);
      console.log(this.$refs[formName]);
      console.log(this.seekobj.freeBreakfast);
      console.log(this.seekobj.WCTJRS);
      console.log(this.seekobj.WCBGRS);
      if (this.noEntereightZHEShow == false) {
        if (this.seekobj.WCBGRS && Number(this.seekobj.WCBGRS) <= 80) {
          this.eightZHEShow = true;
        }
      }

      var eightZHEMethodBOOLEN = this.eightZHEMethod();
      if (eightZHEMethodBOOLEN) {
        return;
      }

      if (this.seekobj.freeBreakfast && this.seekobj.freeBreakfast == "1") {
        if (Number(this.seekobj.WCTJRS) < 100) {
          console.log(5555555);

          this.$message.error("体检金额小于100，无法选择免费早餐");
          return;
        }
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isshowsubbtn = false;
          console.log("999999999999999");
          this.$store.commit("setOrderBasicDetailsmsg", this.seekobj);
          this.$message.success("保存成功！");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    timeChange(e) {
      console.log(e);
    },
    eightZHEMethod() {
      if (this.eightZHEShow) {
        this.$confirm("折扣低于8折，审核可能不通过，您确定继续吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.noEntereightZHEShow = true;
            this.eightZHEShow = false;
          })
          .catch(() => {
            this.noEntereightZHEShow = false;
            this.eightZHEShow = false;
          });
        return true;
      }
    },
    DWDMFocus() {
      console.log(this.seekobj.DWDM);
      if (this.seekobj.DWDM == "") {
        this.DWoptions = [];
      }
    },
    DWDMchange(val) {
      console.log(val);
      this.DWoptions.map((item) => {
        if (item.DWDM == val) {
          console.log(item);
          this.seekobj.YWYDM = item.YWYDM;
        }
      });
    },
    LXRinput() {
      this.seekobj.LXR = this.seekobj.LXR.replace(/[^\.\d]/g, "");
      this.seekobj.LXR = this.seekobj.LXR.replace(".", "");
    },
    DWremoteMethod(DWDM) {
      console.log(DWDM, this.seekobj.YWYDM)
      if (DWDM !== "") {
        this.DWloading = true;
        var body = {
          DWDM: DWDM,
          YWYDM: this.seekobj.YWYDM,
          page: 1,
          size: 9999,
        };
        this.$network3
          .post("/mnoracle/msj/fuzzyFirmMn", body)
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              res.data.firmList.map((item) => {
                var obj = {
                  DWDM: item.DWDM,
                  DWMC: item.DWMC,
                  YWYDM: item.YWYDM,
                  key: item.DWDM,
                  // label: item
                };
                return obj;
              });
              this.DWoptions = res.data.firmList;
              this.DWloading = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(5656565);
        this.DWoptions = [];
      }
    },
    gotoOCD() {
      this.$router.push("/OrderManagement/OrderComboDetails");
    },
    submitForm(formName) {
      //    if (this.isshowsubbtn) {
      //      this.$message.error("请先保存");
      //      return;
      //    }

      console.log(this.$refs);
      console.log(this.$refs[formName]);
      console.log(this.seekobj.freeBreakfast);
      console.log(this.seekobj.WCTJRS);
      console.log(this.seekobj.WCBGRS);
      if (this.noEntereightZHEShow == false) {
        if (this.seekobj.WCBGRS && Number(this.seekobj.WCBGRS) <= 80) {
          this.eightZHEShow = true;
        }
      }

      var eightZHEMethodBOOLEN = this.eightZHEMethod();
      if (eightZHEMethodBOOLEN) {
        return;
      }

      if (this.seekobj.freeBreakfast && this.seekobj.freeBreakfast == "1") {
        if (Number(this.seekobj.WCTJRS) < 100) {
          console.log(5555555);

          this.$message.error("体检金额小于100，无法选择免费早餐");
          return;
        }
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.seekobj.WCBGRS = Number(this.seekobj.WCBGRS);
          this.seekobj.WCTJRS = Number(this.seekobj.WCTJRS);
          //修改
          if (this.$route.query.MsjBILLCODE) {
            console.log(this.seekobj);
            this.seekobj.MsjBILLCODE = this.$route.query.MsjBILLCODE;
            this.seekobj.ZRHS = this.$store.getters.getRoleInfo.MNId;
            this.$network3
              .post("/mnoracle/msj/UpdateOrder", this.seekobj)
              .then((res) => {
                this.$store.commit("setOrderBasicDetailsmsg", {});
                console.log(res);
                this.$router.push(
                  "/OrderManagement/OrderComboDetails?MsjBILLCODE=" +
                    this.$route.query.MsjBILLCODE +
                    "&DWDM=" +
                    this.seekobj.DWDM +
                    "&READ_ORNOT=" +
                    this.seekobj.READ_ORNOT +
                    "&auditStatus=" +
                    this.seekobj.auditStatus
                );
                // this.gotoOCD();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            //新增
            console.log(this.seekobj);
            this.seekobj.ZRHS = this.$store.getters.getRoleInfo.MNId;
            // this.seekobj.YWY_ZG=this.$store.getters.getRoleInfo.MNId;
            this.$network3;
            this.$network3
              .post("/mnoracle/msj/makeOrder", this.seekobj)
              .then((res) => {
                this.$store.commit("setOrderBasicDetailsmsg", {});
                console.log(res);
                this.$router.push(
                  "/OrderManagement/OrderComboDetails?MsjBILLCODE=" +
                    res.data.MsjBILLCODE +
                    "&DWDM=" +
                    this.seekobj.DWDM +
                    "&READ_ORNOT=" +
                    this.seekobj.READ_ORNOT
                );
                // this.gotoOCD();
              })
              .catch((err) => {
                console.log(err);
              });
          }

          // this.gotoOCD();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {},
  watch: {
    seekobj: {
      handler: function (val, oldVal) {
        console.log(this.stringlength, val.HTSJ.length);
        if (this.stringlength < val.HTSJ.length) {
          console.log(111);
          if (val.HTSJ.length == 4) {
            val.HTSJ = val.HTSJ + "-";
          }
          if (val.HTSJ.length == 7) {
            val.HTSJ = val.HTSJ + "-";
          }
        } else {
          console.log(222);
        }
        this.stringlength = val.HTSJ.length;
        console.log(this.stringlength1, val.SFJZSJ.length);
        if (this.stringlength1 < val.SFJZSJ.length) {
          if (val.SFJZSJ.length == 4) {
            val.SFJZSJ = val.SFJZSJ + "-";
          }
          if (val.SFJZSJ.length == 7) {
            val.SFJZSJ = val.SFJZSJ + "-";
          }
        } else {
        }
        this.stringlength1 = val.SFJZSJ.length;

        this.isshowsubbtn = true;
      },
      deep: true,
    },
  },
  computed: {},
};
</script>
<style lang="scss" scope>
.subbtnclass {
  float: left;
  .el-button--primary {
    background-color: rgb(150, 170, 224);
    border-color: rgb(150, 170, 224);
  }
}
</style>