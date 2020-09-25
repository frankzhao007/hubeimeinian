<template>
  <div>
    <el-form :model="storeFrom" :rules="storeRules" ref="storeFrom" label-width="150px" class="demo-ruleForm">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="storeFrom.name" maxlength="30" show-word-limit placeholder="请输入名称" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="contact">
        <el-input v-model="storeFrom.contact" maxlength="15" show-word-limit placeholder="请输入联系人" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机：" prop="phoneNumber">
        <el-input type="age" v-model.number="storeFrom.phoneNumber" placeholder="请输入手机号" minlength="11" maxlength="11" style="width:70%" size="medium" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属分公司：" prop="subsidiary">
        <el-select v-model="storeFrom.subsidiary" :disabled="subsidiaryData.length == 0" filterable placeholder="所属分公司（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in subsidiaryData" :key="item" :label="item.index" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="体检中心编码：" prop="ShopCode">
        <el-input v-model="storeFrom.ShopCode" placeholder="请输入门店编码" style="width:70%" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="门店所在区域：" prop="ShopArea">
        <el-select v-model="storeFrom.ShopArea" @change="regionChange()" filterable placeholder="门店所在区域（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="item in ShopAreaData" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门店所在城市：" prop="ShopCity">
        <el-select :disabled="storeFrom.ShopArea==''" v-model="storeFrom.ShopCity" filterable placeholder="请选择区域后再选择城市（支持搜索）" size="medium" style="width:70%;">
          <el-option v-for="(item,index) in ShopCityData" :key="item.index" :label="item.index" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "storeFrom",
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
      // 门店所在区域选项
      ShopAreaData: [
        {
          value: "1",
          label: "华北"
        },
        {
          value: "2",
          label: "东北"
        },
        {
          value: "3",
          label: "华东"
        },
        {
          value: "4",
          label: "华中"
        },
        {
          value: "5",
          label: "华南"
        },
        {
          value: "6",
          label: "西南"
        },
        {
          value: "7",
          label: "西北"
        },
        {
          value: "8",
          label: "港澳台"
        }
      ],
      // 门店所在城市选项
      ShopCityData: [],
      // 表单数据与规则
      // 销售
      storeFrom: {
        //创建销售账号表单数据
        name: "", //名称
        contact: "", //联系人
        phoneNumber: "", //联系人手机
        subsidiary: "", //所属分公司
        ShopCode: "", //门店编码
        ShopArea: "", //门店所在区域
        ShopCity: "" //门店所在城市
      },
      storeRules: {
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
        ShopCode: [
          { required: true, message: "请输入门店编码", trigger: "blur" }
        ],
        ShopArea: [
          { required: true, message: "请选择门店所在区域", trigger: "change" }
        ],
        ShopCity: [
          { required: true, message: "请选择门店所在城市", trigger: "change" }
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
        this.storeFrom.subsidiary = this.$store.getters.getRoleInfo.AccountName;
      }else if (this.$store.getters.getRoleInfo.AccountType == 7) {
        this.subsidiaryData = [];
        this.storeFrom.subsidiary = this.$store.getters.getRoleInfo.FromCompany;
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
        this.storeFrom.name = this.editObj.AccountName; //	账号名称
        this.storeFrom.contact = this.editObj.LinkMan; //		联系人
        this.storeFrom.phoneNumber = Number(this.editObj.Mobile); //	联系人手机
        this.storeFrom.subsidiary = this.editObj.FromCompany; //所属分公司
        this.storeFrom.ShopCode = this.editObj.ShopCode; //门店编码
        this.storeFrom.ShopArea = this.editObj.Area; //	区域
        this.storeFrom.ShopCity = this.editObj.City; //	城市
        this.editRegionChange();
      }
    },
    submitForm() {
      this.$refs["storeFrom"].validate(valid => {
        if (valid) {
          console.log("门店submit!");
          console.log(this.isNewOrEdit);
          if (this.isNewOrEdit) {
            // console.log("创建");
            var body = {
              AccountType: "4", //账号类型 0运营 1分公司 2销售 3企业 4门店
              AccountName: this.storeFrom.name, //	账号名称
              LinkMan: this.storeFrom.contact, //		联系人
              Mobile: JSON.stringify(this.storeFrom.phoneNumber), //	联系人手机
              FromCompany: this.storeFrom.subsidiary, //所属分公司
              ShopCode: this.storeFrom.ShopCode, //门店编码
              Area: this.storeFrom.ShopArea, //	区域
              City: this.storeFrom.ShopCity //	城市
            };
            console.log(body);
            this.$emit("CreateAccountPost", body);
          } else {
            // console.log("编辑");
            this.editObj.AccountName = this.storeFrom.name; //	账号名称
            this.editObj.LinkMan = this.storeFrom.contact; //		联系人
            this.editObj.Mobile = JSON.stringify(this.storeFrom.phoneNumber); //	联系人手机
            this.editObj.FromCompany = this.storeFrom.subsidiary; //所属分公司
            this.editObj.ShopCode = this.storeFrom.ShopCode; //门店编码
            this.editObj.Area = this.storeFrom.ShopArea; //	区域
            this.editObj.City = this.storeFrom.ShopCity; //	城市
            this.$emit("editAccountPost", this.editObj, 4);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单数据和校验
    resetStoreForm() {
      console.log("storeFrom重置表单数据和校验");
      this.$refs["storeFrom"].resetFields();
    },
    // 根据区域获取城市
    regionChange() {
      console.log(this.storeFrom.ShopArea);
      var body = {
        areaCode: this.storeFrom.ShopArea
      };
      this.$api
        .get("/city/pullCityByAreaCode", body)
        .then(res => {
          console.log(res.data);
          this.storeFrom.ShopCity = "";
          this.ShopCityData = [];
          this.ShopCityData = res.data;
          console.log(this.ShopCityData);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 编辑时根据区域获取城市
    editRegionChange() {
      console.log(this.storeFrom.ShopArea);
      var body = {
        areaCode: this.storeFrom.ShopArea
      };
      this.$api
        .get("/city/pullCityByAreaCode", body)
        .then(res => {
          console.log(res.data);
          this.ShopCityData = [];
          this.ShopCityData = res.data;
          console.log(this.ShopCityData);
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
</style>
