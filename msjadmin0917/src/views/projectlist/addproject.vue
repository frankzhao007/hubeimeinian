<template>
  <div class="app-container" style="position:relative" v-loading="isloading" element-loading-text="基础项目修改中，需要更改所有套餐，请耐心等待1分钟。。。">
    <div style=" font-size: 20px;">
      <i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp体检项目信息</span>
    </div>
    <el-form size="medium" :model="AddProject" :rules="AddProjectrules" label-width="120px" ref="AddProject" style="margin-top:30px;position:relative">
      <!-- <el-form-item label="区域：" prop="AddProjectArea">
        <el-select :disabled="RoleInfo.AccountType==1" v-model="AddProject.AddProjectArea" filterable placeholder="请选择" size="medium" style="width:200px;" @change="AddProjectAreachange()">
          <el-option v-for="item in branchOfficeRegionData" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <div class="addprojectinput">
        <el-input size="medium" v-model="AddProject.AddProjectAreaID" placeholder="项目代码" style="width:200px;margin-left:20px" @change="AddProjectAreaIDchange()"></el-input>
        <div v-if="AddProject.AddProjectAreaIDcon" style="margin-left:25px;color:#F56C6C">区域代码重复 </div>
      </div> -->
      <!-- <el-form-item label="城市：" prop="AddProjectCity">
        <el-select :disabled="RoleInfo.AccountType==1||AddProject.AddProjectArea==null||AddProject.AddProjectArea==''" filterable v-model="AddProject.AddProjectCity" filterable placeholder="选择区域后,可选城市" size="medium" style="width:200px;" clearable>
          <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="所属分公司：" prop="instname">
        <el-input v-model="AddProject.instname" style="width:200px" disabled></el-input>

      </el-form-item>
      <div class="addprojectinput">
        <span class="cityred">* </span><span class="cityid">城市项目代码：</span>
        <el-input size="medium" v-model="AddProject.AddProjectCityID" placeholder="项目代码" style="width:200px;margin-left:10px;" @change="AddProjectAreaIDchange()"></el-input>
        <div v-if="AddProject.AddProjectCityIDcon" style="margin-left:25px;color:#F56C6C">城市代码重复 </div>
      </div>
      <el-form-item label="一级类目：" prop="AddProjectFirstType">
        <!-- <el-input v-model="AddProject.AddProjectFirstType" style="width:200px"></el-input> -->
        <el-select v-model="AddProject.AddProjectFirstType" placeholder="请选择" size="medium" style="width:200px;" clearable>
          <el-option v-for="item in FirstTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <div></div>
      <el-form-item label="二级类目：" prop="AddProjectSecondType">
        <!-- <el-input v-model="AddProject.AddProjectSecondType" style="width:200px"></el-input> -->
        <el-select v-model="AddProject.AddProjectSecondType" :disabled="!AddProject.AddProjectFirstType||AddProject.AddProjectFirstType==''||AddProject.AddProjectFirstType=='全部'" placeholder="选择一级类别后可选" size="medium" style="width:200px;" clearable>
          <el-option v-for="item in SecondTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称：" prop="AddProjectName">
        <el-input maxlength="20" v-model="AddProject.AddProjectName" style="width:200px" placeholder="名称最多20字"></el-input>
      </el-form-item>
      <el-form-item label="详细描述：" prop="AddProjectMsg">
        <el-input show-word-limit type="textarea" :autosize="{ minRows: 2, maxRows: 6}" maxlength="100" placeholder="多行输入，限制100字" v-model="AddProject.AddProjectMsg" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="AddProjectSex">
        <el-select v-model="AddProject.AddProjectSex" placeholder="请选择性别" style="width:200px">
          <el-option label="通用" value="通用"> </el-option>
          <el-option label="男" value="男"> </el-option>
          <el-option label="女" value="女"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚否：" prop="AddProjectMaritalStatus">
        <el-select v-model="AddProject.AddProjectMaritalStatus" placeholder="请选择婚姻状况" style="width:200px">
          <el-option label="通用" value="通用"> </el-option>
          <el-option label="已婚" value="已婚"> </el-option>
          <el-option label="未婚" value="未婚"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门市价：" prop="AddProjectiPrice">
        <el-input v-model="AddProject.AddProjectiPrice" maxlength="6" @input="AddProjectiPriceinput()" style="width:300px" placeholder="体检项目应售价格，0~100000正整数"></el-input>

      </el-form-item>
      <el-form-item label="核算价：" prop="AddProjectAccountingPrice">
        <el-input v-model="AddProject.AddProjectAccountingPrice" @input="AddProjectAccountingPriceinput()" maxlength="6" style="width:300px" placeholder="核算价用于成本核算等，0~100000正整数"></el-input>
      </el-form-item>
      <el-form-item label="临床意义：" prop="AddProjectmsg">
        <el-input show-word-limit type="textarea" :autosize="{ minRows: 2, maxRows: 6}" maxlength="100" placeholder="多行输入，限制100字" v-model="AddProject.AddProjectmsg" style="width:200px"></el-input>
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <div class="addprojectBtn">
      <el-button @click="goback()">取 消</el-button>
      <el-button v-if="!ischange" type="primary" @click="AddprojectBtn()">确 认</el-button>
      <el-button v-if="ischange" type="primary" @click="ChangProjectBtn()">确 认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addproject",
  components: {},
  watch: {
    "AddProject.AddProjectFirstType": {
      handler(nv, ov) {
        if (!nv || nv == "" || nv == "全部") {
          this.AddProject.AddProjectSecondType = "";
        } else {
          if (!this.ischange) {
            this.AddProject.AddProjectSecondType = "";
          }
          this.queryAllCheckDirSec();
        }
      },
      deep: true,
      immediate: true
    }
    // "AddProject.AddProjectArea": {
    //   handler(nv, ov) {
    //     if (!nv || nv == "" || nv == "全部") {
    //     } else {
    //       this.areachangetocity();
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (
        Number(this.AddProject.AddProjectAccountingPrice) >
        Number(this.AddProject.AddProjectiPrice)
      ) {
        callback(new Error("核算价不能大于门市价"));
      } else {
        if (Number(value) > 100000 || Number(value) < 0) {
          callback(new Error("请输入0~100000正整数"));
        } else {
          callback();
        }
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (Number(value) > 100000 || Number(value) < 0) {
        callback(new Error("请输入0~100000正整数"));
      } else {
        callback();
      }
    };
    return {
      isloading: false,
      FirstTypeListdata: "",
      SecondTypeListdata: "",
      onetest: 1, //计数
      twotest: 1,
      ischange: false, //是否为编辑
      FirstTypeList: [], //一级类别列表
      SecondTypeList: [], //二级类别列表，根据一级类别生成
      AddProject: {
        instname: "",
        AddProjectArea: "全国", //区域
        AddProjectAreaID: "", //编码
        AddProjectCity: "全国", //城市
        AddProjectCityID: "", //城市编码
        AddProjectFirstType: "", //一级类目
        AddProjectSecondType: "", //二级类目
        AddProjectName: "", //项目名称
        AddProjectSex: "通用", //性别
        AddProjectMaritalStatus: "通用", //婚姻状态
        AddProjectiPrice: "", //门市价
        AddProjectAccountingPrice: "", //核算价
        AddProjectmsg: "", //临床意义
        AddProjectMsg: "", //详细描述
        AddProjectAreaIDcon: false,
        AddProjectCityIDcon: false
      },
      AddProjectrules: {
        instname: [
          { required: true, message: "请选择所属分公司", trigger: "change" }
        ],
        // AddProjectArea: [
        //   { required: true, message: "请选择商品类型", trigger: "change" }
        // ],
        AddProjectCity: [
          { required: true, message: "请选择分公司", trigger: "change" }
        ],
        AddProjectFirstType: [
          { required: true, message: "请输入一级类目", trigger: "change" }
        ],
        AddProjectSecondType: [
          { required: true, message: "请输入二级类目", trigger: "change" }
        ],
        AddProjectName: [
          { required: true, message: "请输入项目名称", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        AddProjectSex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        AddProjectMaritalStatus: [
          { required: true, message: "请选择婚姻状态", trigger: "change" }
        ],
        AddProjectiPrice: [
          { required: true, message: "请输门市价", trigger: "blur" },
          { validator: validatePass1, trigger: "blur" }
        ],
        AddProjectAccountingPrice: [
          { required: true, message: "请输入核算价格", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        AddProjectMsg: [
          { required: true, message: "请输入详细描述", trigger: "change" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "change"
          }
        ]
      },
      //区域列表
      branchOfficeRegionData: [
        {
          value: "全国",
          label: "全国"
        },
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
      //城市列表
      cityList: []
    };
  },
  mounted() {
    this.queryAllCheckDirFir();
    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      //运营
      // console.log(this.$store.getters.getBranchOffice);
      // this.FilialeList = this.FilialeList.concat(
      //   this.$store.getters.getBranchOffice
      // );
    } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
      //分公司
      console.log(this.$store.getters.getRoleInfo.Area);
      console.log(this.$store.getters.getRoleInfo.City);
      this.AddProject.AddProjectArea = this.$store.getters.getRoleInfo.Area;
      this.AddProject.AddProjectCity = this.$store.getters.getRoleInfo.City;
      this.AddProject.instname = this.$store.getters.getRoleInfo.AccountName;
    } else if (this.$store.getters.getRoleInfo.AccountType == "7") {
      //分公司
      console.log(this.$store.getters.getRoleInfo);
      console.log(this.$store.getters.getRoleInfo.City);
      this.AddProject.AddProjectArea = this.$store.getters.getRoleInfo.Area;
      this.AddProject.AddProjectCity = this.$store.getters.getRoleInfo.City;
      this.AddProject.instname = this.$store.getters.getRoleInfo.FromCompany;
    }

    console.log(this.$route.query);
    if (this.$route.query.ischange == "true") {
      //如果为编辑加项包
      this.ischange = true;
      var body = {
        checkid: this.$route.query.checkid
      };
      this.$api.post("/manage/manageQueryCheckById", body).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.changeproject = res.data;
          this.AddProject.AddProjectArea = res.data.areaname;
          this.AddProject.AddProjectAreaID = res.data.areanameid;
          this.AddProject.AddProjectCity = res.data.instcity;
          this.AddProject.AddProjectCityID = res.data.instcityid;
          this.AddProject.AddProjectFirstType = res.data.checktypefirst;
          this.AddProject.AddProjectSecondType = res.data.checktypesec;
          this.AddProject.AddProjectName = res.data.checkname;
          this.AddProject.AddProjectMsg = res.data.checkdescribe;
          this.AddProject.AddProjectSex = res.data.checkgender;
          this.AddProject.AddProjectMaritalStatus = res.data.checkmarstatus;
          this.AddProject.AddProjectiPrice = String(res.data.checkprice);
          this.AddProject.AddProjectAccountingPrice = String(
            res.data.checklowprice
          );
          this.AddProject.AddProjectmsg = res.data.checksignificance;
          this.AddProject.instname = res.data.instname;
        }
        this.areachangetocity(this.AddProject.AddProjectArea);
      });
    } else {
      if (this.$store.getters.getRoleInfo.AccountType == "0") {
        //运营
        // console.log(this.$store.getters.getBranchOffice);
        // this.FilialeList = this.FilialeList.concat(
        //   this.$store.getters.getBranchOffice
        // );
        this.AddProject.instname = "优健康自营";
      } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
        //分公司
        console.log(this.$store.getters.getRoleInfo.Area);
        console.log(this.$store.getters.getRoleInfo.City);
        this.AddProject.AddProjectArea = this.$store.getters.getRoleInfo.Area;
        this.AddProject.AddProjectCity = this.$store.getters.getRoleInfo.City;
        this.AddProject.instname = this.$store.getters.getRoleInfo.AccountName;
      }
      this.ischange = false;
      this.areachangetocity(this.AddProject.AddProjectArea);
    }
  },
  methods: {
    AddProjectAreaIDchange() {
      var body = {
        instcityid: this.AddProject.AddProjectCityID,
        instname: "",
        areanameid: this.AddProject.AddProjectAreaID
      };
      if (this.$store.getters.getRoleInfo.AccountType == "0") {
        //运营
        console.log(this.$store.getters.getBranchOffice);
        body.instname = "优健康自营";
      } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
        //分公司
        console.log(this.$store.getters.getRoleInfo.AccountName);
        this.FilialeList = [];
        body.instname = this.$store.getters.getRoleInfo.AccountName;
      }
      if (this.ischange) {
        body.checkid = this.changeproject.checkid;
      }
      this.$api
        .post("/manage/manageCheckAgainCheck", body)
        .then(res => {
          console.log(res);
          this.AddProject.AddProjectAreaIDcon = false;

          this.AddProject.AddProjectCityIDcon = false;
        })
        .catch(res => {
          console.log(res);
          if (res.data[0] == true) {
            this.AddProject.AddProjectAreaIDcon = true;
          } else {
            this.AddProject.AddProjectAreaIDcon = false;
          }
          if (res.data[1] == true) {
            this.AddProject.AddProjectCityIDcon = true;
          } else {
            this.AddProject.AddProjectCityIDcon = false;
          }
        });
    },
    goback() {
      this.$router.go(-1);
    },
    AddProjectAreachange() {
      this.areachangetocity();
    },
    //通过区域查询城市
    areachangetocity() {
      if (this.AddProject.AddProjectArea == "全国") {
        this.$api
          .get("/city/pullCityNames")
          .then(res => {
            this.cityList = [
              {
                value: "全国",
                label: "全国"
              }
            ];
            if (this.onetest == 1) {
            } else {
              this.AddProject.AddProjectCity = "";
            }
            console.log(res.data);
            if (res.code == "200") {
              this.onetest++;
              res.data.map((item, index) => {
                let temp = {
                  value: item,
                  label: item
                };
                this.cityList.push(temp);
              });
            }
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        var body = {
          areaCode: this.AddProject.AddProjectArea
        };
        this.$api
          .get("/city/pullCityByAreaCode", body)
          .then(res => {
            this.cityList = [];
            if (this.onetest == 1) {
            } else {
              this.AddProject.AddProjectCity = "";
            }
            console.log(res.data);
            if (res.code == "200") {
              this.onetest++;
              res.data.map((item, index) => {
                let temp = {
                  value: item,
                  label: item
                };
                this.cityList.push(temp);
              });
            }
          })
          .catch(err => {
            console.log("err", err);
          });
      }
    },
    //门市价 核算价 输入限制
    AddProjectiPriceinput() {
      this.AddProject.AddProjectiPrice = this.AddProject.AddProjectiPrice.replace(
        /[^\.\d]/g,
        ""
      );
      this.AddProject.AddProjectiPrice = this.AddProject.AddProjectiPrice.replace(
        ".",
        ""
      );
    },
    AddProjectAccountingPriceinput() {
      this.AddProject.AddProjectAccountingPrice = this.AddProject.AddProjectAccountingPrice.replace(
        /[^\.\d]/g,
        ""
      );
      this.AddProject.AddProjectAccountingPrice = this.AddProject.AddProjectAccountingPrice.replace(
        ".",
        ""
      );
    },
    //输入校验
    inputverify() {
      this.$refs["AddProject"].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // if (!this.AddProject.AddProjectArea) {
      //   this.$message.error("请选择区域");
      //   return false;
      // }
      // if (!this.AddProject.AddProjectCity) {
      //   this.$message.error("请选择城市");
      //   return false;
      // }
      if (!this.AddProject.AddProjectFirstType) {
        this.$message.error("请输入一级类目");
        return false;
      }
      if (!this.AddProject.AddProjectSecondType) {
        this.$message.error("请输入二级类目");
        return false;
      }
      if (!this.AddProject.AddProjectName) {
        this.$message.error("请输入项目名称");
        return false;
      }
      if (this.AddProject.AddProjectName.length > 20) {
        this.$message.error("项目名称限制20字");
        return false;
      }
      if (!this.AddProject.AddProjectSex) {
        this.$message.error("请选择性别");
        return false;
      }
      if (!this.AddProject.AddProjectMaritalStatus) {
        this.$message.error("请选择婚姻状态");
        return false;
      }
      if (!this.AddProject.AddProjectiPrice) {
        this.$message.error("请输入门市价");
        return false;
      }
      if (Number(this.AddProject.AddProjectiPrice) > 100000) {
        this.$message.error("门市价最大可输入100000");
        return false;
      }
      if (!this.AddProject.AddProjectAccountingPrice) {
        this.$message.error("请输入核算价");
        return false;
      }
      if (!this.AddProject.AddProjectMsg) {
        this.$message.error("请输入详细描述");
        return false;
      }
      if (
        Number(this.AddProject.AddProjectAccountingPrice) >
        Number(this.AddProject.AddProjectiPrice)
      ) {
        this.$message.error("核算价不能大于门市价");
        return false;
      }
      if (
        !this.AddProject.AddProjectAreaID &&
        !this.AddProject.AddProjectCityID
      ) {
        this.$message.error("区域代码与城市代码必须填写其一");
        return false;
      }
      return true;
    },
    //新增体检项目
    AddprojectBtn() {
      if (this.inputverify()) {
        var body = {
          areaname: this.AddProject.AddProjectArea,
          areanameid: this.AddProject.AddProjectAreaID,
          instcity: this.AddProject.AddProjectCity,
          instcityid: this.AddProject.AddProjectCityID,
          checktypefirst: this.AddProject.AddProjectFirstType,
          checktypesec: this.AddProject.AddProjectSecondType,
          checkname: this.AddProject.AddProjectName,
          checkdescribe: this.AddProject.AddProjectMsg,
          checkgender: this.AddProject.AddProjectSex,
          checkmarstatus: this.AddProject.AddProjectMaritalStatus,
          checkprice: Number(this.AddProject.AddProjectiPrice),
          checklowprice: Number(this.AddProject.AddProjectAccountingPrice),
          checksignificance: this.AddProject.AddProjectmsg
        };
        console.log(this.FirstTypeListdata);
        console.log(this.SecondTypeListdata);
        this.FirstTypeListdata.map(item => {
          if (item.checktypefirst == body.checktypefirst) {
            body.checktypefirstid = item.checkid;
          }
        });
        this.SecondTypeListdata.map(item => {
          if (item.checktypesec == body.checktypesec) {
            body.checktypesecid = item.checktypesecid;
          }
        });

        if (this.$store.getters.getRoleInfo.AccountType == "0") {
          //运营
          body.instname = "优健康自营";
        } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
          //分公司
          console.log(this.$store.getters.getRoleInfo.AccountName);
          body.instname = this.$store.getters.getRoleInfo.AccountName;
        }
        this.$api
          .post("/manage/manageInsertCheck", body)
          .then(res => {
            if (res.code == "200") {
              this.$message({
                message: "创建成功",
                type: "success"
              });
              this.$router.go(-1);
            }
          })
          .catch(res => {
            console.log(res);
            var msg = "";
            if (
              res.data[0] == true &&
              res.data[1] == true &&
              res.data[2] == true
            ) {
              msg = "区域代码重复，城市代码重复，项目已存在";
            }
            if (
              res.data[0] == false &&
              res.data[1] == true &&
              res.data[2] == true
            ) {
              msg = "城市代码重复，项目已存在";
            }
            if (
              res.data[0] == true &&
              res.data[1] == false &&
              res.data[2] == true
            ) {
              msg = "区域代码重复，项目已存在";
            }
            if (
              res.data[0] == true &&
              res.data[1] == true &&
              res.data[2] == false
            ) {
              msg = "区域代码重复，城市代码重复";
            }
            if (
              res.data[0] == true &&
              res.data[1] == false &&
              res.data[2] == false
            ) {
              msg = "区域代码重复";
            }
            if (
              res.data[0] == false &&
              res.data[1] == true &&
              res.data[2] == false
            ) {
              msg = "城市代码重复";
            }
            if (
              res.data[0] == false &&
              res.data[1] == false &&
              res.data[2] == true
            ) {
              msg = "项目已存在";
            }
            this.$message.error(msg);
          });
      }
    },
    ChangProjectBtn() {
      if (this.inputverify()) {
        this.isloading = true;
        this.changeproject.areaname = this.AddProject.AddProjectArea;
        this.changeproject.areanameid = this.AddProject.AddProjectAreaID;
        this.changeproject.instcity = this.AddProject.AddProjectCity;
        this.changeproject.instcityid = this.AddProject.AddProjectCityID;
        this.changeproject.checktypefirst = this.AddProject.AddProjectFirstType;
        this.changeproject.checktypesec = this.AddProject.AddProjectSecondType;
        this.changeproject.checkname = this.AddProject.AddProjectName;
        this.changeproject.checkdescribe = this.AddProject.AddProjectMsg;
        this.changeproject.checkgender = this.AddProject.AddProjectSex;
        this.changeproject.checkmarstatus = this.AddProject.AddProjectMaritalStatus;
        this.changeproject.checkprice = Number(
          this.AddProject.AddProjectiPrice
        );
        this.changeproject.checklowprice = Number(
          this.AddProject.AddProjectAccountingPrice
        );
        this.FirstTypeListdata.map(item => {
          if (item.checktypefirst == this.changeproject.checktypefirst) {
            this.changeproject.checktypefirstid = item.checkid;
          }
        });
        this.SecondTypeListdata.map(item => {
          if (item.checktypesec == this.changeproject.checktypesec) {
            this.changeproject.checktypesecid = item.checktypesecid;
          }
        });
        this.changeproject.checksignificance = this.AddProject.AddProjectmsg;
        var body = this.changeproject;
        this.$api
          .post("/manage/manageUpdateCheck", body)
          .then(res => {
            console.log(res);
            if (res.code == "200") {
              this.isloading = false;
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.$router.go(-1);
            }
          })
          .catch(res => {
            console.log(res);
            var msg = "";
            if (
              res.data[0] == true &&
              res.data[1] == true &&
              res.data[2] == true
            ) {
              msg = "区域代码重复，城市代码重复，项目已存在";
            }
            if (
              res.data[0] == false &&
              res.data[1] == true &&
              res.data[2] == true
            ) {
              msg = "城市代码重复，项目已存在";
            }
            if (
              res.data[0] == true &&
              res.data[1] == false &&
              res.data[2] == true
            ) {
              msg = "区域代码重复，项目已存在";
            }
            if (
              res.data[0] == true &&
              res.data[1] == true &&
              res.data[2] == false
            ) {
              msg = "区域代码重复，城市代码重复";
            }
            if (
              res.data[0] == true &&
              res.data[1] == false &&
              res.data[2] == false
            ) {
              msg = "区域代码重复";
            }
            if (
              res.data[0] == false &&
              res.data[1] == true &&
              res.data[2] == false
            ) {
              msg = "城市代码重复";
            }
            if (
              res.data[0] == false &&
              res.data[1] == false &&
              res.data[2] == true
            ) {
              msg = "项目已存在";
            }
            this.$message.error(msg);
          });
      }
    },
    //查询所有--一级类目
    queryAllCheckDirFir() {
      this.FirstTypeList = [];
      this.$api.post("/manage/queryAllCheckDirFir").then(res => {
        console.log(res);
        if (res.code == "200") {
          this.FirstTypeListdata = res.data;
          res.data.map(item => {
            var temp = {
              value: item.checktypefirst,
              label: item.checktypefirst
            };
            this.FirstTypeList.push(temp);
          });
        }
      });
    },
    //查询所有--二级类目
    queryAllCheckDirSec() {
      this.SecondTypeList = [];
      this.$api
        .post("/manage/queryAllCheckDirSec", {
          checktypefirst: this.AddProject.AddProjectFirstType
        })
        .then(res => {
          if (this.twotest == 1) {
            console.log(this.twotest);
          } else {
            console.log(this.twotest);
            this.AddProject.AddProjectSecondType = "";
          }
          console.log(res);
          if (res.code == "200") {
            this.SecondTypeListdata = res.data;
            this.twotest++;
            console.log(this.twotest);
            res.data.map(item => {
              var temp = {
                value: item.checktypesec,
                label: item.checktypesec
              };
              this.SecondTypeList.push(temp);
            });
          }
        });
    }
  },

  computed: {
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.addprojectinput {
  margin-bottom: 20px;
  .cityred {
    color: #f56c6c;
  }
  .cityid {
    color: #606266;
  }
}
.addprojectBtn {
  position: absolute;
  bottom: 20px;
  right: 30px;
}
</style>
