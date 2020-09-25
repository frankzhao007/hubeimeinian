<template>
  <div class="app-container">
    <div class="newemployee_wrap">
      <div class="newemployee_header">
        <h3> <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i> 基本信息</h3>
        <el-divider></el-divider>
      </div>
      <div>
        <el-form :model="newemployeeForm" :rules="newemployeeFormRules" ref="newemployeeForm" size="medium" label-position="left" label-width="120px" class="demo-ruleForm">
          <el-form-item label="员工姓名：" prop="name">
            <el-input v-model="newemployeeForm.name" placeholder="请输入" style="width:100%;" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input type="age" v-model.number="newemployeeForm.phone" placeholder="请输入手机号" clearable minlength="11" maxlength="11" style="width:100%" size="medium" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="newemployeeForm.sex" placeholder="请选择" style="width:100%;">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚否：" prop="isMarital">
            <el-select v-model="newemployeeForm.isMarital" placeholder="请选择" style="width:100%;">
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="未婚" value="未婚"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="身份证号：" prop="identity" style="width:100%;">
            <el-input v-model="newemployeeForm.identity" maxlength="18" clearable></el-input>
          </el-form-item>-->

          <el-form-item label="证件类型：" prop="cardType" style="width:100%;">
            <el-select v-model="newemployeeForm.cardType" placeholder="请选择" style="width:100%;" @change="newemployeeForm.identity='',newemployeeForm.ageOfBirth=''">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="港澳台通行证" value="2"></el-option>
              <el-option label="护照" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="证件号：" prop="identity" style="width:100%;">
            <el-input v-model="newemployeeForm.identity" maxlength="18" :placeholder="newemployeeForm.cardType?'请输入':'请先选择证件类型'" clearable :disabled="newemployeeForm.cardType?false:true"></el-input>
          </el-form-item>

          <el-form-item label="出生年月日：" prop="isMarital" style="width:100%;">
            <el-date-picker v-model="newemployeeForm.ageOfBirth" type="date" range-separator="-" placeholder="选择日期" value-format="yyyy-MM-dd" style="width:100%" :disabled="newemployeeForm.cardType=='1'?true:false"></el-date-picker>
          </el-form-item>

          <div class="newemployee_header">
            <h3>企业信息</h3>
            <el-divider></el-divider>
          </div>
          <el-form-item label="所属企业：" prop="company">
            <el-select v-model="newemployeeForm.company" @change="getBranch" :disabled="companyData.length == 0" filterable placeholder="请选择所属企业" size="medium" style="width:100%;">
              <el-option v-for="(item,inex) in companyData" :key="item.index" :label="item.index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <div class="newemployee_branch">
            <el-form-item label="部门：" prop="branch">
              <el-select v-if="RoleInfo.AccountType != 3" v-model="newemployeeForm.branch" v-loading="branchDataloading" :disabled="branchData.length == 0||newemployeeForm.company==''" filterable placeholder="请先选择企业" size="medium" style="width:100%;">
                <el-option v-for="(item,inex) in branchData" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
              <el-select v-else v-model="newemployeeForm.branch" v-loading="branchDataloading" :disabled="branchData.length == 0||newemployeeForm.company==''" filterable placeholder="请选择部门" size="medium" style="width:100%;">
                <el-option v-for="(item,inex) in branchData" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <div class="newemployee_img" v-if="branchData.length != 0||newemployeeForm.company!=''">
              <el-popover placement="right" width="240" v-model="visible">
                <div>
                  <div class="newemployee_branch_title">新建部门</div>
                  <div class="newemployee_branch_input">
                    <el-input v-model="branchValue" maxlength="10" show-word-limit size="medium" placeholder="请输入部门名称" style="width:100%;"></el-input>
                  </div>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="NewDepartment">确定</el-button>
                  </div>
                </div>
                <div slot="reference" class="name-wrapper">
                  <img src="../../assets/newemployee.png" alt />
                </div>
              </el-popover>
            </div>
          </div>
          <el-form-item label="岗位">
            <el-input v-model="newemployeeForm.department" maxlength="20" show-word-limit style="width:100%;"></el-input>
          </el-form-item>

          <el-form-item label="后台标记字段">
            <el-input v-model="newemployeeForm.sign" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="enterpriseconfiguration_footer">
        <el-button plain @click="cancelCompile">取 消</el-button>
        <el-button type="primary" @click="submitForm('newemployeeForm')">确定</el-button>
        <!-- <el-button v-else type="primary" @click="submitForm('newemployeeForm')">确认编辑</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "newemployee",
  components: {},
  data() {
    var phoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var telStr = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        // var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        if (!telStr.test(value)) {
          callback(new Error("手机号码输入不规范"));
        } else {
          callback();
        }
      }
    };
    var identityNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入证件号"));
      } else {
        // var idcard_patter1 = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
        // var idcard_patter = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        // if (!idcard_patter.test(value)) {

        if (this.newemployeeForm.cardType == "1") {
          if (!this.IdentityCodeValid(value)) {
            callback(new Error("身份证号填写有误"));
          } else {
            if (value.length == 18) {
              var y = value.substring(6, 10);
              var m = value.substring(10, 12);
              var d = value.substring(12, 14);
              this.newemployeeForm.ageOfBirth = y + "-" + m + "-" + d;
            } else if (value.length == 15) {
              var y = value.substring(6, 8);
              var m = value.substring(8, 10);
              var d = value.substring(10, 12);
              this.newemployeeForm.ageOfBirth = "19" + y + "-" + m + "-" + d;
            }

            callback();
          }
        } else {
          callback();
        }

        // else if(this.newemployeeForm.cardType=="2"){
        //   var re = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/
        //   if(!re.test(value)){
        //      callback(new Error("港澳台通行证号码格式填写有误"));
        //   }else{
        //     callback();
        //   }
        // }else{
        //    var reg = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/
        //   if(!reg.test(value)){
        //      callback(new Error("护照号码格式填写有误"));
        //   }else{
        //     callback();
        //   }
        // }
      }
    };

    return {
      //表单数据
      newemployeeForm: {
        name: "", //姓名
        phone: "", //电话号码
        cardType: "", //证件类型
        identity: "", //身份证号
        ageOfBirth: "", //出生年月
        sex: "", //性别
        isMarital: "", //婚姻状态
        company: "", //企业名称
        branch: "", //部门
        department: "", //职位
        sign: "" // 标记字段
      },
      //表单规则
      newemployeeFormRules: {
        // name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        // phone: [
        //   { validator: phoneNumber, trigger: "change" },
        //   { required: true, message: "请输入联系人手机号", trigger: "change" },
        //   { type: "number", message: "手机号必须为数字值", trigger: "change" }
        // ],
        identity: [
          { required: true, message: "请输入证件号", trigger: "change" },
          { validator: identityNum, trigger: "change" }
        ],
        cardType: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "change"
          }
        ],
        // sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        // isMarital: [
        //   { required: true, message: "请选择婚姻状态", trigger: "change" }
        // ],
        company: [{ required: true, message: "请选择企业", trigger: "change" }]
        // branch: [{ required: true, message: "请选择部门", trigger: "blur" }]
      },
      //新建部门
      branchValue: "",
      //下拉框
      branchData: [],
      companyData: [],
      //新建部门弹框
      visible: false,
      branchDataloading: false
    };
  },
  created() {
    // 获取选择框数据
    this.getSelectionData();
    if (this.$route.query.userId) {
      console.log("编辑");

      this.$api
        .get("/employee/findGenMemberById", {
          userId: this.$route.query.userId
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            var temp = res.data;
            this.newemployeeForm = {
              userId: temp.userId,
              name: temp.name, //姓名
              phone: String(temp.phone), //电话号码
              cardType: temp.cardType, //证件类型
              identity: temp.identity, //身份证号
              ageOfBirth: temp.ageOfBirth, //出生年月

              sex: temp.sex, //性别
              isMarital: temp.isMarital, //婚姻状态
              company: temp.placeCompanyName, //企业名称
              branch: temp.branch, //部门
              department: temp.department, //职位
              sign: temp.Sign // 标记字段
            };
            this.getBranch();
            this.newemployeeForm.branch = temp.branch;
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    } else {
      console.log("新增");
    }
    // 如果是企业直接获取部门数据
    if (this.$store.getters.getRoleInfo.AccountType == 3) {
      if (this.$route.query.data) {
        this.getBranch();
        this.newemployeeForm.branch = temp.branch;
      } else {
        this.getBranch();
      }
    }
  },
  mounted() {},
  methods: {
    IdentityCodeValid(code) {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;

      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split("");
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
      // if (!pass) alert(tip);
      return pass;
    },
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      if (this.$store.getters.getRoleInfo.AccountType == 0) {
        // 查询企业
        this.companyData = this.$store.getters.getEnterprise;
      } else if (this.$store.getters.getRoleInfo.AccountType == 2) {
        this.companyData = this.$store.getters.getEnterprise;
      } else if (this.$store.getters.getRoleInfo.AccountType == 3) {
        this.companyData = [];
        this.newemployeeForm.company = this.$store.getters.getRoleInfo.AccountName;
      }
      if (
        this.$store.getters.getRoleInfo.AccountType != 3 &&
        Array.isArray(this.companyData) &&
        this.companyData.length <= 0
      ) {
        this.$message.error("该销售暂无签约企业，请先签约企业");
      }
    },
    // 新建部门
    NewDepartment() {
      if (this.branchValue == "") {
        this.$message.error("请填写完整！");
        return;
      }
      this.branchData.push(this.branchValue);
      this.visible = false;
    },
    // 获取部门数据
    getBranch() {
      this.branchDataloading = true;
      this.branchData = [];
      this.newemployeeForm.branch = "";
      this.$api
        .get("/employee/getBranch", { company: this.newemployeeForm.company })
        .then(res => {
          console.log(res.data);
          if (res.data.data == null) {
            this.branchData = res.data || [];
            this.branchDataloading = false;
            if (this.branchData.length <= 0) {
              this.$message.error("当前企业暂无部门，可点击右侧按钮创建部门");
            }
          }
          this.branchDataloading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.branchDataloading = false;
          this.$message.warning("暂无部门数据");
        });
    },
    // 创建员工
    addEmployee() {
      var temp = JSON.stringify(this.newemployeeForm);
      var body = JSON.parse(temp);
      body.phone = String(body.phone);
      this.$api
        .post("/employee/addEmployee", body)
        .then(res => {
          console.log(res.data);
          this.$message.success("创建成功！");
          this.$router.push("/staffmanagement/stafflist");
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.msg);
        });
    },
    // 更新员工
    updateEmployee() {
      var temp = JSON.stringify(this.newemployeeForm);
      var body = JSON.parse(temp);
      body.phone = String(body.phone);
      this.$api
        .post("/employee/updateEmployee", body)
        .then(res => {
          console.log(res.data);
          this.$message.success("更新成功！");
          this.$router.push("/staffmanagement/stafflist");
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.msg);
        });
    },
    cancelCompile() {
      //取消编辑
      this.$alert("取消后编辑员工信息将不会被保存, 请确认?", "提示", {
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.$router.back(-1);
        })
        .catch(() => {});
    },
    //校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.query.userId) {
            console.log("编辑请求");
            this.updateEmployee();
          } else {
            console.log("新增请求");
            this.addEmployee();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单数据和校验
    resetFrom() {
      console.log("重置表单数据和校验");
      this.$refs["form"].resetFields();
    }
  },
  watch: {
    visible: function(n, o) {
      this.branchValue = "";
    }
  },
  computed: {
    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.newemployee_wrap {
  width: 400px;
  padding: 10px 0 0 40px;
  .newemployee_header {
    width: 150px;
  }
  .newemployee_branch {
    position: relative;
    .newemployee_img {
      cursor: pointer;
      position: absolute;
      right: -35px;
      top: 5px;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }
}
.newemployee_footer {
  margin: 0 20px 20px 40px;
}
.newemployee_branch_title {
  font-size: 16px;
  padding-bottom: 10px;
}
.newemployee_branch_input {
  padding-bottom: 10px;
}
</style>
