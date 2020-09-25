<template>
  <div>
    <el-form :model="enterpriseFrom" :rules="enterpriseRules" ref="enterpriseFrom" label-width="150px" class="demo-ruleForm">
      <el-form-item label="企业名称：" prop="name">
        <el-input v-model="enterpriseFrom.name" maxlength="30" show-word-limit placeholder="请输入名称" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="contact">
        <el-input v-model="enterpriseFrom.contact" maxlength="15" show-word-limit placeholder="请输入联系人" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机：" prop="phoneNumber">
        <el-input type="age" v-model.number="enterpriseFrom.phoneNumber" placeholder="请输入手机号" minlength="11" maxlength="11" style="width:70%" size="medium" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="RoleInfo.AccountType == 0" label="所属分公司：" prop="subsidiary">
        <el-select v-model="enterpriseFrom.subsidiary" @change="setSalesData()" :disabled="isNewOrEdit == false" filterable placeholder="所属分公司（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in subsidiaryData" :key="item.index" :label="item.Name" :value="item.Mobile"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="RoleInfo.AccountType != 0" label="所属分公司：" prop="subsidiary">
        <el-select v-model="enterpriseFrom.subsidiary" :disabled="subsidiaryData.length == 0 ||isNewOrEdit == false" filterable placeholder="所属分公司（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in subsidiaryData" :key="item.index" :label="item.Name" :value="item.Mobile"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属销售：" prop="sales">
        <el-select v-model="enterpriseFrom.sales" :disabled="salesData.length == 0" filterable placeholder="所属销售（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in salesData" :key="item" :label="item.index" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "enterpriseFrom",
  components: {},
  watch: {},
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
    return {
      // 所属分公司选项
      subsidiaryData: [],
      // 所属销售选项
      salesData: [],
      // 表单数据与规则
      // 销售
      enterpriseFrom: {
        //创建销售账号表单数据
        name: "", //名称
        contact: "", //联系人
        phoneNumber: "", //联系人手机
        subsidiary: "", //所属分公司
        sales: "" //所属销售
      },
      enterpriseRules: {
        //创建分公司账号表单规则
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phoneNumber: [
          { validator: phoneNumber, trigger: "change" },
          { required: true, message: "请输入联系人手机号", trigger: "change" },
          { type: "number", message: "手机号必须为数字值", trigger: "change" }
        ],
        subsidiary: [
          { required: true, message: "请选择所属分公司", trigger: "change" }
        ],
        sales: [{ required: true, message: "请选择所属销售", trigger: "blur" }]
      },
      // 上传服务器的数据
      body: {},
      // 获取编辑数据
      editObj: {},
      // 判断新增还是编辑
      isNewOrEdit: null
    };
  },
  mounted() {
    // 获取选择框数据
    this.getSelectionData();
    this.Assignment();
  },
  methods: {
    // 获取选择框数据
    getSelectionData() {
      if (this.$store.getters.getRoleInfo.AccountType == 0) {
        // 获取所属分公司数据
        // this.subsidiaryData = this.$store.getters.getBranchOffice;
        //获取所属销售数据
        // this.salesData = this.$store.getters.getSales;
        console.log("141241", this.$store.getters.getBranchOfficeMobile);
        if (this.$store.getters.getBranchOfficeMobile.length != 0) {
          var temp = JSON.stringify(this.$store.getters.getBranchOfficeMobile);
          var tempObj = JSON.parse(temp);
          var tempName = tempObj.Name;
          var tempMobile = tempObj.Mobile;
          for (let i = 0; i < tempName.length; i++) {
            this.subsidiaryData.push({
              Name: tempName[i],
              Mobile: tempMobile[i]
            });
          }
          console.log(this.subsidiaryData);
        }
      } else if (this.$store.getters.getRoleInfo.AccountType == 2||this.$store.getters.getRoleInfo.AccountType == 7) {
        this.subsidiaryData = [];
        this.salesData = [];
        this.enterpriseFrom.subsidiary = this.$store.getters.getRoleInfo.FromCompany;
        this.enterpriseFrom.sales = this.$store.getters.getRoleInfo.AccountName;
      }
    },
    Assignment() {
      var temp = JSON.stringify(this.$store.getters.getEditObj);
      this.editObj = JSON.parse(temp);
      // console.log(JSON.stringify(this.editObj));
      if (this.editObj == "") {
        this.isNewOrEdit = true;
        console.log("创建");
      } else {
        this.isNewOrEdit = false;
        console.log("编辑");
        this.enterpriseFrom.name = this.editObj.AccountName; //名称
        this.enterpriseFrom.contact = this.editObj.LinkMan; //联系人
        this.enterpriseFrom.phoneNumber = Number(this.editObj.Mobile); //联系人手机
        this.enterpriseFrom.subsidiary = this.editObj.FromCompany; //所属分公司
        this.enterpriseFrom.sales = this.editObj.FromSale; //所属销售
      }
    },
    submitForm() {
      this.$refs["enterpriseFrom"].validate(valid => {
        if (valid) {
          console.log("企业submit!");
          console.log(this.isNewOrEdit);
          if (this.isNewOrEdit) {
            if (this.$store.getters.getRoleInfo.AccountType == 2) {
              FromCompany = this.enterpriseFrom.subsidiary;
            } else {
              var FromCompany = "";
              for (let i = 0; i < this.subsidiaryData.length; i++) {
                const element = this.subsidiaryData[i];
                if (this.enterpriseFrom.subsidiary == element.Mobile) {
                  FromCompany = element.Name;
                }
              }
            }
            var body = {
              AccountType: "3", //账号类型 0运营 1分公司 2销售 3企业 4门店
              AccountName: this.enterpriseFrom.name, //名称
              LinkMan: this.enterpriseFrom.contact, //联系人
              Mobile: JSON.stringify(this.enterpriseFrom.phoneNumber), //联系人手机
              FromCompany: FromCompany, //所属分公司
              FromSale: this.enterpriseFrom.sales //所属销售
            };
            console.log(body);
            this.$emit("CreateAccountPost", body);
          } else {
            var FromCompany = "";
            for (let i = 0; i < this.subsidiaryData.length; i++) {
              const element = this.subsidiaryData[i];
              if (this.enterpriseFrom.subsidiary == element.Mobile) {
                FromCompany = element.Name;
              }
            }
            this.editObj.AccountName = this.enterpriseFrom.name; //名称
            this.editObj.LinkMan = this.enterpriseFrom.contact; //联系人
            this.editObj.Mobile = JSON.stringify(
              this.enterpriseFrom.phoneNumber
            ); //联系人手机
            if (FromCompany == "") {
              this.editObj.FromCompany = this.enterpriseFrom.subsidiary; //所属分公司
            } else {
              this.editObj.FromCompany = FromCompany;
            }
            this.editObj.FromSale = this.enterpriseFrom.sales; //所属销售
            console.log(this.editObj);
            this.$emit("editAccountPost", this.editObj, 3);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单数据和校验
    resetEnterpriseFrom() {
      console.log("enterpriseFrom重置表单数据和校验");
      this.$refs["enterpriseFrom"].resetFields();
    },
    // 根据分公司获取销售信息
    setSalesData() {
      console.log(this.enterpriseFrom.subsidiary);
      this.enterpriseFrom.sales = "";
      this.salesData = [];
      this.$api
        .get("/account/pullSonOrg", { mobile: this.enterpriseFrom.subsidiary })
        .then(res => {
          console.log(res.data);
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              const element = res.data[i];
              if (element.AccountType == 2) {
                this.salesData = element.Name;
              }
            }
          } else {
            this.$message.warning("该分公司暂无销售");
            this.salesData = [];
          }
        })
        .catch(err => {
          console.log("err", err);
        });
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
</style>
