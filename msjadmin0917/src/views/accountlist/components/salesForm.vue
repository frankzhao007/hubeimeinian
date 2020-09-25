<template>
  <div>
    <el-form :model="salesForm" :rules="salesRules" ref="salesForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="销售名称：" prop="name">
        <el-input v-model="salesForm.name" maxlength="30" show-word-limit placeholder="请输入名称" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="contact">
        <el-input v-model="salesForm.contact" maxlength="15" show-word-limit placeholder="请输入联系人" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机：" prop="phoneNumber">
        <el-input type="age" v-model.number="salesForm.phoneNumber" placeholder="请输入手机号" minlength="11" maxlength="11" style="width:70%" size="medium" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属分公司：" prop="subsidiary">
        <el-select v-model="salesForm.subsidiary" :disabled="subsidiaryData.length == 0 ||isNewOrEdit==false" filterable placeholder="所属分公司（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in subsidiaryData" :key="item" :label="item.index" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "salesForm",
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
      // 表单数据与规则
      // 销售
      salesForm: {
        //创建销售账号表单数据
        name: "", //名称
        contact: "", //联系人
        phoneNumber: null, //联系人手机
        subsidiary: "" //所属分公司
      },
      salesRules: {
        //创建分公司账号表单规则
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phoneNumber: [
          { validator: phoneNumber, trigger: "change" },
          { required: true, message: "请输入联系人手机号", trigger: "blur" },
          { type: "number", message: "手机号必须为数字值", trigger: "blur" }
        ],
        subsidiary: [
          { required: true, message: "请选择所属分公司", trigger: "blur" }
        ]
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
    this.Assignment();
    // 获取选择框数据
    this.getSelectionData();
  },
  methods: {
    // 获取选择框数据
    getSelectionData() {
      console.log(this.$store.getters.getRoleInfo)
      if (this.$store.getters.getRoleInfo.AccountType == 0) {
        // 获取所属分公司数据
        this.subsidiaryData = this.$store.getters.getBranchOffice;
      } else if (this.$store.getters.getRoleInfo.AccountType == 1) {
        this.subsidiaryData = [];
        this.salesForm.subsidiary = this.$store.getters.getRoleInfo.AccountName;
      }else if (this.$store.getters.getRoleInfo.AccountType == 7) {
        this.subsidiaryData = [];
        this.salesForm.subsidiary = this.$store.getters.getRoleInfo.FromCompany;
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
        this.salesForm.name = this.editObj.AccountName; //名称
        this.salesForm.contact = this.editObj.LinkMan; //联系人
        this.salesForm.phoneNumber = Number(this.editObj.Mobile); //联系人手机
        this.salesForm.subsidiary = this.editObj.FromCompany; //所属分公司
      }
    },
    submitForm() {
      this.$refs["salesForm"].validate(valid => {
        if (valid) {
          console.log("销售submit!");
          console.log(this.isNewOrEdit);
          if (this.isNewOrEdit) {
            var body = {
              AccountType: "2", //账号类型 0运营 1分公司 2销售 3企业 4门店
              AccountName: this.salesForm.name, //名称
              LinkMan: this.salesForm.contact, //联系人
              Mobile: JSON.stringify(this.salesForm.phoneNumber), //联系人手机
              FromCompany: this.salesForm.subsidiary //所属分公司
            };
            this.$emit("CreateAccountPost", body);
          } else {
            this.editObj.AccountName = this.salesForm.name; //名称
            this.editObj.LinkMan = this.salesForm.contact; //联系人
            this.editObj.Mobile = JSON.stringify(this.salesForm.phoneNumber); //联系人手机
            this.editObj.FromCompany = this.salesForm.subsidiary; //所属分公司
            this.$emit("editAccountPost", this.editObj, 2);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单数据和校验
    resetSalesForm() {
      console.log("salesForm重置表单数据和校验");
      this.$refs["salesForm"].resetFields();
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
