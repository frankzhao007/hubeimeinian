<template>
  <div>
    <el-form :model="branchOfficeForm" :rules="branchOfficeRules" ref="branchOfficeForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="branchOfficeForm.name" maxlength="30" show-word-limit placeholder="请输入名称" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="分公司所在省份：" prop="region">
        <el-select v-model="branchOfficeForm.region" @change="regionChange1()" filterable placeholder="请选择分公司所在省份（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in branchOfficeRegionData" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分公司所在城市：" prop="city">
        <el-select :disabled="branchOfficeForm.region ==''" v-model="branchOfficeForm.city" filterable placeholder="请选择省份后再选择城市（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in branchOfficeCityData" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人：" prop="contact">
        <el-input v-model="branchOfficeForm.contact" maxlength="15" show-word-limit placeholder="请输入联系人" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机：" prop="phoneNumber">
        <el-input type="age" v-model.number="branchOfficeForm.phoneNumber" placeholder="请输入手机号" minlength="11" maxlength="11" style="width:70%" size="medium" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否售卖加项：" prop="IsPack">
        <el-switch v-model="branchOfficeForm.IsPack">
        </el-switch>
        <!-- <el-input type="age" v-model.number="branchOfficeForm.IsPackL" placeholder="请输入手机号" minlength="11" maxlength="11" style="width:70%" size="medium" autocomplete="off"></el-input> -->
      </el-form-item>

      <el-form-item label="套餐上架是否审核：" prop="CloseAudit">
        <el-switch v-model="branchOfficeForm.CloseAudit" :active-value='false' :inactive-value="true">
        </el-switch>
        <!-- <el-input type="age" v-model.number="branchOfficeForm.IsPackL" placeholder="请输入手机号" minlength="11" maxlength="11" style="width:70%" size="medium" autocomplete="off"></el-input> -->
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "branchOfficeForm",
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
      //选项数据
      //分公司所在区域
      branchOfficeRegionData: [],
      //分公司所在城市
      branchOfficeCityData: [],
      // 表单数据与规则
      // 分公司
      branchOfficeForm: {
        //创建分公司账号表单数据
        name: "", //名称
        region: [], //分公司所在区域
        city: [], //分公司所在城市
        contact: "", //联系人
        phoneNumber: "", //联系人手机
        IsPack: false,
        CloseAudit:false
      },
      branchOfficeRules: {
        //创建分公司账号表单规则
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择分公司所在省份", trigger: "change" }
        ],
        city: [
          { required: true, message: "请选择分公司所在城市", trigger: "change" }
        ],
        contact: [
          { required: true, message: "请输入联系人", trigger: "change" }
        ],
        phoneNumber: [
          { validator: phoneNumber, trigger: "change" },
          { required: true, message: "请输入联系人手机号", trigger: "change" },
          { type: "number", message: "手机号必须为数字值", trigger: "change" }
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
    this.GetProvince();
  },
  updated() {},
  methods: {
    GetProvince() {
      this.$api
        .get("/city/GetProvince")
        .then(res => {
          console.log(res);
          this.branchOfficeRegionData = res.data;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
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
        // 表单赋值
        this.branchOfficeForm.name = this.editObj.AccountName; //	账号名称
        this.branchOfficeForm.contact = this.editObj.LinkMan; //	账号名称
        this.branchOfficeForm.phoneNumber = Number(this.editObj.Mobile); //	账号名称
        this.branchOfficeForm.region = this.editObj.Province; //	账号名称
        this.branchOfficeForm.city = this.editObj.City; //	账号名称
        this.branchOfficeForm.IsPack = this.editObj.IsPack; //	是否编辑加项
        this.branchOfficeForm.CloseAudit = this.editObj.CloseAudit; //	是否编辑加项
        // 区域城市赋值
        this.regionChange();
      }
    },
    submitForm() {
      this.$refs["branchOfficeForm"].validate(valid => {
        if (valid) {
          console.log("分公司submit!");
          console.log(this.isNewOrEdit);
          if (this.isNewOrEdit) {
            // console.log("创建");
            var body = {
              AccountType: "1", //账号类型 0运营 1分公司 2销售 3企业 4门店
              AccountName: this.branchOfficeForm.name, //	账号名称
              LinkMan: this.branchOfficeForm.contact, //		联系人
              Mobile: JSON.stringify(this.branchOfficeForm.phoneNumber), //	联系人手机
              // Area: this.branchOfficeForm.region, //	区域
              Province: this.branchOfficeForm.region, //	省份
              City: this.branchOfficeForm.city, //	城市
              IsPack: this.branchOfficeForm.IsPack,
              CloseAudit: this.branchOfficeForm.CloseAudit
            };
            console.log(body);
            this.$emit("CreateAccountPost", body);
          } else {
            // console.log("编辑");
            this.editObj.AccountName = this.branchOfficeForm.name; //	账号名称
            this.editObj.LinkMan = this.branchOfficeForm.contact; //	联系人
            this.editObj.Mobile = JSON.stringify(
              this.branchOfficeForm.phoneNumber
            ); //	联系人手机
            // this.editObj.Area = this.branchOfficeForm.region; //	区域
            this.editObj.Province = this.branchOfficeForm.region; //	省份
            this.editObj.City = this.branchOfficeForm.city; //	城市
            this.editObj.IsPack = this.branchOfficeForm.IsPack;
            this.editObj.CloseAudit = this.branchOfficeForm.CloseAudit;
            this.$emit("editAccountPost", this.editObj, 1);
          
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单数据和校验
    resetBranchOfficeForm() {
      console.log("branchOfficeForm重置表单数据和校验");
      // this.$refs["selectiveTypeForm"].resetFields();
      this.$refs["branchOfficeForm"].resetFields();
    },
    regionChange1(){
      this.branchOfficeForm.city=''
      this.regionChange()
    },
    regionChange() {
      console.log(this.branchOfficeForm.region);
      // var body = {
      //   areaCode: this.branchOfficeForm.region
      // };
      // this.$api
      //   .get("/city/pullCityByAreaCode", body)
      //   .then(res => {
      //     console.log(res.data);
      //     this.branchOfficeCityData = res.data;
      //   })
      //   .catch(err => {
      //     console.log("err", err);
      //   });
      var body = {
        Province: this.branchOfficeForm.region
      };
      this.$api
        .get("/city/GetCityByProvince2", body)
        .then(res => {
          console.log(res.data);
          this.branchOfficeCityData = res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.branchOfficeForm_icon {
  padding-left: 10px;
  .el-icon-question:before {
    width: 20px;
    height: 40px;
  }
}
</style>
