<template>
  <div class="app-container">
    <div class="newapproval_wrap">
      <!-- 上半部分 -->
      <div>
        <div class="newapproval_header">
          <h3>提交体检订单审批</h3>
          <el-divider></el-divider>
        </div>
        <div class="newapproval_form">
          <el-form :model="ApprovalForm" :rules="ApprovalFormRules" ref="ApprovalForm" label-position="left" label-width="120px" size="medium" class="demo-ruleForm">
            <el-form-item label="发单城市" prop="issuingCity">
              <el-select v-model="ApprovalForm.issuingCity" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in BillingCityData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受检单位" prop="insComp">
              <el-select v-model="ApprovalForm.insComp" @change="ChooseCompany()" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in insCompData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="体检方式" prop="phyExaminatMode">
              <el-select v-model="ApprovalForm.phyExaminatMode" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in phyExaminatModeData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位负责人" prop="headUnit">
              <el-input v-model="ApprovalForm.headUnit"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="contactMum">
              <el-input type="age" v-model.number="ApprovalForm.contactMum" placeholder="请输入手机号" clearable minlength="11" maxlength="11" style="width:100%" size="medium" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="付款方式" prop="payMethod">
              <el-input v-model="ApprovalForm.payMethod"></el-input>
            </el-form-item>
            <el-form-item label="付款总金额" prop="paytotalAmount">
              <el-input v-model="ApprovalForm.paytotalAmount" @input="paytotalAmountInput"></el-input>
            </el-form-item>
            <el-form-item label="挂帐截止日期" prop="deadlRegist">
              <el-date-picker v-model="ApprovalForm.deadlRegist" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="签约日期" prop="contractDate">
              <el-date-picker v-model="ApprovalForm.contractDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="查报告方式">
              <el-input v-model="ApprovalForm.qyReportMethod" maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="详细说明" prop="detailedDescrip">
              <el-input type="textarea" placeholder="请输入内容" v-model="ApprovalForm.detailedDescrip" maxlength="100" show-word-limit>
              </el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload action='' :on-change="getFile" multiple :on-remove="handleRemove" :limit="9" list-type="picture" :auto-upload="false">
                <el-button size="small" type="primary">选择图片上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传 jpeg / jpg / png 文件</div>
                <div slot="tip" class="el-upload__tip">最多上传9张图片，已上传{{imgTemp.length}}张</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="审批人" prop="approvers">
              <el-select v-model="ApprovalForm.approvers" multiple placeholder="请选择审批人" style="width:100%;">
                <el-option v-for="item in approversData" :key="item.approver" :label="item.approver" :value="item.approver">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="newapproval_header">
          <h3>预约信息</h3>
          <el-divider></el-divider>
        </div>
        <div class="newapproval_form">
          <div class="newapproval_Package">
            <!-- 增加体检信息 -->
            <div class="newapproval_block_del">
              <el-button @click="AddInformation()" :disabled="PackageForm.package ==''" v-if="ApprovalForm.phyExaminatMode == '集中体检'" class="newapproval_block_del_button" type="primary" icon="el-icon-plus" circle size="medium"></el-button>
            </div>
            <el-form :model="PackageForm" :rules="PackageFormRules" ref="PackageForm" label-position="left" label-width="120px" size="medium" class="demo-ruleForm">
              <el-form-item label="体检套餐" prop="package">
                <el-select v-model="PackageForm.package" @change="queryCityById()" :disabled="ApprovalForm.insComp==''" placeholder="请先选择受检单位" size="medium" style="width:80%;">
                  <el-option v-for="item in packageData" :key="item.goodid" :label="item.goodname" :value="item.goodid"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-if="ApprovalForm.phyExaminatMode == '集中体检'">
          <!-- 体检信息块 -->
          <div v-for="(v,index) in medicalInformation" class="newapproval_block">
            <!-- 删除体检信息 -->
            <div class="newapproval_block_del">
              <el-button @click="delInformation(index)" class="newapproval_block_del_button" type="danger" icon="el-icon-delete" circle size="medium"></el-button>
            </div>
            <el-form :model="v" :rules="medicalFormRules" :ref="index" label-position="left" label-width="120px" size="medium" class="demo-ruleForm">
              <el-form-item label="体检人" prop="package">
                <el-button v-if="ApprovalForm.insComp==''" :disabled="ApprovalForm.insComp==''" plain icon="el-icon-plus">请选择受检单位</el-button>
                <el-button v-else @click="ChooseEmployee(index)" plain icon="el-icon-plus">选择体检人</el-button>
              </el-form-item>
              <el-form-item v-if="v.examinaPerson.length != 0">
                <div class="newapproval_blocks">
                  <el-tag :key="tagindex" v-for="(tag,tagindex) in v.examinaPerson" @close="handleClose(tag,index)" effect="plain" type="info" color="#ffffff" class="newapproval_tag" closable>
                    {{tag.medicalPeople}}
                  </el-tag>
                </div>
              </el-form-item>
              <el-form-item label="预约城市" prop="appoCity">

                <el-select v-model="v.appoCity" @change="chooseBookingCity(index,v.appoCity)" :disabled="PackageForm.package==''" filterable placeholder="请选择" size="medium" style="width:100%;">
                  <el-option v-for="(item,index) in v.BookingCity" :key="item.index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约门店" prop="appoShop">
                <el-select v-model="v.appoShop" placeholder="请选择" :disabled="v.appoCity==''" filterable size="medium" style="width:100%;">
                  <el-option v-for="(item,index) in v.BookingStore" :key="item.index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约时间" prop="appoTime">
                <el-date-picker v-model="v.appoTime" :picker-options="pickerOptions1" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div>
        <!-- $router.push('/approvalmanagement/approvallist' -->
        <el-button plain @click="$router.back(-1);">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确认</el-button>
      </div>
      <!-- 弹窗 -->
      <div v-if="dialogStaff">
        <el-dialog title="选择员工" :visible.sync="dialogStaff" width="700px">
          <div class="mytransfer">
            <el-transfer style="margin-left:15px;" v-model="TransferVal" :data="TransferData" v-loading="TransferLoading" filterable :titles="['未选员工', '已选员工']" filter-placeholder="请输入员工姓名">
            </el-transfer>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogStaff = false">取 消</el-button>
            <el-button type="primary" @click="determineStaff">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { totalmem } from "os";
import { PassThrough } from "stream";
export default {
  name: "newapproval",
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
    var paytotalAmountvalidator = (rule, value, callback) => {
      //验证第一个字符是数字
      this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount.replace(
        /^\./g,
        ""
      );
      this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount.replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        "$1$2.$3"
      );
      if (this.ApprovalForm.paytotalAmount.split(".").length - 1 > 1) {
        this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount.replace(
          /\.{2,}/g,
          ""
        ); // 只保留第一个. 清除多余的
        this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
      }
      if (value === "") {
        callback(new Error("请输入付款金额"));
      }
      if (/[^\.\d]/g.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions1: {
        disabledDate(time) {
          // console.log(time.getTime())
          // console.log("时间",time.getTime())
          let tow = 2 * 24 * 3600 * 1000;
          let nowData = new Date(new Date().toLocaleDateString()).getTime();
          // console.log("当前时间",Date.now() - 8.64e7)86,572,800
          // console.log("是否能够点击",time.getTime() < Date.now() - 8.64e7)
          // console.log(nowData + tow);
          return time.getTime() < nowData + tow;
        }
      },
      //表单数据
      ApprovalForm: {
        issuingCity: "", //发单城市
        insComp: "", //受检单位
        phyExaminatMode: "", //体检方式
        headUnit: "", //单位负责人
        contactMum: "", //联系电话

        payMethod: "", //付款方式
        paytotalAmount: "", //付款金额
        deadlRegist: "", //挂账截止日期
        contractDate: "", //签约日期
        qyReportMethod: "", //查询报告方式
        detailedDescrip: "", //详细说明
        //审批人
        approvers: []
      },
      PackageForm: {
        package: ""
      },
      //表单规则
      ApprovalFormRules: {
        issuingCity: [
          { required: true, message: "请选择发单城市", trigger: "blur" }
        ],
        insComp: [
          { required: true, message: "请选择受检单位", trigger: "blur" }
        ],
        phyExaminatMode: [
          { required: true, message: "请选择体检方式", trigger: "blur" }
        ],
        headUnit: [
          { required: true, message: "请输入单位负责人", trigger: "blur" }
        ],
        contactMum: [
          { validator: phoneNumber, trigger: "change" },
          {
            required: true,
            message: "请输入联系人手机号",
            trigger: "change"
          },
          { type: "number", message: "手机号必须为数字值", trigger: "change" }
        ],
        payMethod: [
          { required: true, message: "请输入付款方式", trigger: "blur" }
        ],
        paytotalAmount: [
          { validator: paytotalAmountvalidator, trigger: "change" },
          { required: true, message: "请输入付款金额", trigger: "blur" }
        ],
        deadlRegist: [
          { required: true, message: "请输入挂账截止日期", trigger: "blur" }
        ],
        contractDate: [
          { required: true, message: "请输入签约日期", trigger: "blur" }
        ],
        detailedDescrip: [
          { required: true, message: "请输入详细说明", trigger: "blur" }
        ],
        approvers: [
          { required: true, message: "请选择审批人", trigger: "blur" }
        ]
      },
      PackageFormRules: {
        package: [{ required: true, message: "请选择套餐", trigger: "change" }]
      },
      // 下拉框数据
      // 分公司
      BillingCityData: [],
      // 受检单位---企业
      insCompData: [],
      // 体检方式
      phyExaminatModeData: ["集中体检", "分散体检"],
      // 审批人数据
      approversData: [],
      // 套餐数据
      packageData: [],
      // 上传图片
      imgList: [], //图片的bas64，服务器需要的数据
      imgTemp: [], //进行增删的临时数组
      //图片缩略图
      fileList: [],
      medicalFormRules: {
        appoCity: [
          { required: true, message: "请选择发单城市", trigger: "blur" }
        ],
        appoShop: [
          { required: true, message: "请选择预约门店", trigger: "blur" }
        ],
        appoTime: [
          {
            required: true,
            message: "请选择预约时间",
            trigger: "change"
          }
        ]
      },
      // 体检人数据
      medicalInformation: [
        {
          BookingCity: [], //预约城市
          BookingStore: [], //门店数据
          examinaPerson: [], //体检人
          appoCity: "", //		预约城市
          appoShop: "", //	预约门店
          appoTime: "" //		预约时间
        }
      ],
      // 弹窗数据
      dialogStaff: false,
      InquireStafft: {
        branch: "全部",
        name: "",
        page: 1,
        pageSize: 10
      },
      countStafft: 0,
      // 选中员工 --- 穿梭框
      TransferData: [],
      TransferVal: [],
      TransferTemp: [],
      TransferLoading: false,
      StaffSelection: [],
      SubsidiaryOptions: [],
      StafftableData: [],
      // 选择员工时，插入数组中的索引
      tempIndex: "",
      // 套餐类型
      PackageType: "",
      PackageId: "",
      // 通过套餐获取城市信息
      CityByIdData: [],
      getRowKeys(row) {
        return row.identity;
      }
    };
  },
  created() {
    // ApprovalForm.issuingCity
    // ApprovalForm.insComp
    this.getSelectionData();
    // 获取城市
    this.pullCityNames();
    // 获取审批人数据
    this.getApprover();
  },
  mounted() {},
  methods: {
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      console.log(this.$store.getters.getEnterprise);
      if (this.$store.getters.getRoleInfo.AccountType == 0) {
        this.insCompData = this.$store.getters.getEnterprise;
      } else {
        this.insCompData = this.$store.getters.getEnterprise;
        // this.ApprovalForm.insComp = this.$store.getters.getRoleInfo.FromCompany;
      }
    },
    //校验
    submitForm(formName) {
      var ApprovalFormTemp = false;
      var PackageFormTemp = false;
      var iTemp = false;
      var templ = [];
      var jTemp = false;
      var jtempl = [];
      // 校验提交体检订单审批表单
      this.$refs["ApprovalForm"].validate(valid => {
        if (valid) {
          ApprovalFormTemp = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // 校验选择套餐---就一个数据
      this.$refs["PackageForm"].validate(valid => {
        if (valid) {
          PackageFormTemp = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      if (this.medicalInformation.length == 0) {
        this.$message.error("请添加体检人信息！");
        return;
      }
      if (this.ApprovalForm.phyExaminatMode == "集中体检") {
        // 校验体检人信息
        for (let i = 0; i < this.medicalInformation.length; i++) {
          // console.log("****", this.medicalInformation[i].examinaPerson);
          // 校验体检人信息中三天表单数据，绑定ref为index，这里遍历i为ref的值，下面 this.$refs[i][0]标识绑定在表单上ref
          this.$refs[i][0].validate(valid => {
            if (valid) {
              templ.push(i);
            } else {
              console.log("error submit!!");
              return false;
            }
          });
          // 如果有增加的体检人信息块，但是没有添加体检人  jtempl则push进去i
          if (this.medicalInformation[i].examinaPerson.length == 0) {
            jtempl.push(i);
          }
        }
        // 判断如果体检人所有数据的长度等于templ的长度，则this.$refs[i][0].validate中的三条表单都验证通过，将iTemp设为true
        if (this.medicalInformation.length == templ.length) {
          iTemp = true;
        }
        // 如果jtempl长度大于0表示没有添加体检人
        if (jtempl.length > 0) {
          this.$message.error("请选择体检人！");
          return;
        }
      } else {
        iTemp = true;
      }

      // 三个条件全部满足则请求服务器
      // ApprovalFormTemp = true;
      // PackageFormTemp = true;
      // iTemp = true;
      if (ApprovalFormTemp && PackageFormTemp && iTemp) {
        console.log("功德圆满，请求服务器");
        // console.log("this.ApprovalForm", this.ApprovalForm);
        // console.log("this.PackageForm.package :", this.PackageForm.package);
        // console.log("this.medicalInformation :", this.medicalInformation);
        for (let i = 0; i < this.imgTemp.length; i++) {
          this.imgList.push(this.imgTemp[i].url);
        }
        // console.log("this.imgList :", this.imgList);
        // ---------------------------------------------------------------整理数据
        console.log("	图片的bas64:", this.imgList); //imgList

        var examinatPackage = "", //	体检套餐  discountPrice	套餐 折扣价
          checkid = "",
          discountPrice = "",
          checkMethod = "";
        for (let i = 0; i < this.packageData.length; i++) {
          const element = this.packageData[i];
          if (this.PackageForm.package == element.goodid) {
            checkid = element.goodid;
            examinatPackage = element.goodname;
            discountPrice = element.internalprice;
            //   (Number(element.goodprice) * Number(element.goodsaleprice)) / 10;
            // console.log(element);
            if (element.payMethod == "公费") {
              checkMethod = "0";
            } else {
              checkMethod = "1";
            }
          }
        }
        console.log("体检套餐 :", examinatPackage);
        console.log("checkid", checkid);
        console.log("discountPrice", discountPrice);
        //reservaInfors
        var reservaInfors = [];
        for (let i = 0; i < this.medicalInformation.length; i++) {
          const element = this.medicalInformation[i];
          reservaInfors.push({
            appoCity: element.appoCity,
            appoShop: element.appoShop,
            appoTime: element.appoTime,
            examinaPerson: element.examinaPerson
          });
        }
        console.log("预约信息", reservaInfors);
        // console.log('***************/////////////////////////////////////////////////////')
        // console.log(this.approversData)
        // console.log(this.ApprovalForm.approvers)
        // console.log('***************/////////////////////////////////////////////////////')
        // this.ApprovalForm.approvers  审批人信息  approvers
        for (let i = 0; i < this.ApprovalForm.approvers.length; i++) {
          const element = this.ApprovalForm.approvers[i];
        }
        console.log("审批人信息", this.ApprovalForm.approvers);
        var approversArr = [];
        for (let i = 0; i < this.ApprovalForm.approvers.length; i++) {
          const element = this.ApprovalForm.approvers[i];
          for (let j = 0; j < this.approversData.length; j++) {
            const approvers = this.approversData[j];
            if (element == approvers.approver) {
              approversArr.push(approvers);
            }
          }
        }
        console.log("approversArr :", approversArr);
        console.log("********************************");
        var tempObj = JSON.stringify(this.ApprovalForm);
        var obj = JSON.parse(tempObj);
        obj.contactMum = JSON.stringify(obj.contactMum);
        obj.paytotalAmount = Number(obj.paytotalAmount);
        obj.imgList = this.imgList; //图片
        obj.reservaInfors = reservaInfors; //预约信息
        obj.examinatPackage = examinatPackage; //体检套餐
        obj.checkid = checkid;
        obj.discountPrice = discountPrice;
        obj.approvers = approversArr;
        obj.checkMethod = checkMethod; //套餐类型
        console.log(obj);

        this.$api
          .post("/approval/addApproval", obj)
          .then(res => {
            console.log(res.data);
            this.$message.success("提交成功！");
            this.$router.push("/approvalmanagement/approvallist");
          })
          .catch(err => {
            console.log("err", err);
          });
      }
    },
    // 01-城市列表-数组
    pullCityNames() {
      this.$api
        .get("/city/pullCityNames")
        .then(res => {
          // console.log(res.data);
          this.BillingCityData = res.data;
          // this.medicalInformation[0].BookingCity = this.BillingCityData;
          // console.log(this.medicalInformation[0].BookingCity);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 通过商品id获取城市信息
    queryCityById() {
      this.medicalInformation.map(i => {
        i.appoCity = "";
        i.BookingCity = [];
        i.appoShop = "";
        i.BookingStore = [];
      });
      this.$api
        .get("/manage/queryCityById", { goodid: this.PackageForm.package })
        .then(res => {
          console.log(res.data);
          this.CityByIdData = res.data;
          this.medicalInformation[0].BookingCity = this.CityByIdData;
          if (this.medicalInformation.length > 1) {
            this.medicalInformation.map(i => {
              i.BookingCity = this.CityByIdData;
            });
          }
          console.log(this.medicalInformation);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 审批人数据
    getApprover() {
      this.$api
        .get("/approval/findAccounts")
        .then(res => {
          console.log("findAccounts", res.data.data);
          for (let i = 0; i < res.data.data.length; i++) {
            const element = res.data.data[i];
            this.approversData.push({
              approver: element.AccountName,
              mobile: element.Mobile,
              id: element.Id,
              createtime: element.CreateTime
            });
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 选择预约城市
    chooseBookingCity(index, val) {
      console.log("选择预约城市", index, val);
      this.medicalInformation[index].appoShop = "";
      this.medicalInformation[index].BookingStore = [];
      this.$api
        .get("/manage/queryMendianByCityAndId", {
          cityname: val,
          goodid: this.PackageForm.package
        })
        // .get("/center/pullByCityName", { cityName: val })
        .then(res => {
          console.log(res.data);
          if (res.data == null) {
            this.$message.error("该套餐在" + val + "没有配置门店");
            return;
          }
          // var tempStore = [];
          // res.data.map(item => {
          //   tempStore.push(item.CenterName);
          // });
          this.medicalInformation[index].BookingStore = res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 选择受检单位---企业后获取套餐数据
    ChooseCompany() {
      console.log(
        "选择受检单位---企业后获取套餐数据",
        this.ApprovalForm.insComp,
        this.ApprovalForm.phyExaminatMode
      );
      var body = {
        company: this.ApprovalForm.insComp,
        payMethod: ""
      };
      // if (this.ApprovalForm.phyExaminatMode == "集中体检") {
      //   body.payMethod = "公费";
      // } else {
      //   body.payMethod = "";
      // }
      this.$api
        .get("/busines/findPubMeal", body)
        .then(res => {
          console.log("/busines/findPubMeal", res.data.data);
          this.packageData = res.data.data;
          console.log("套餐类型", res.data.data[0].payMethod);
          this.PackageType = res.data.data[0].payMethod;
          this.PackageId = res.data.data[0].goodid;
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(this.ApprovalForm.insComp + " , " + err.msg);
        });
    },
    // 增加体检人信息
    AddInformation() {
      this.medicalInformation.push({
        BookingCity: this.CityByIdData,
        BookingStore: [],
        examinaPerson: [],
        appoCity: "", //		预约城市
        appoShop: "", //	预约门店
        appoTime: "" //		预约时间
      });
      console.log(this.medicalInformation);
      console.log(this.CityByIdData);
    },
    // 获取部门数据
    getBranch() {
      this.SubsidiaryOptions = ["全部"];
      this.$api
        .get("/employee/getBranch", { company: this.ApprovalForm.insComp })
        .then(res => {
          console.log("部门部门", res.data);
          if (res.data.length != 0) {
            this.SubsidiaryOptions = this.SubsidiaryOptions.concat(res.data);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 查询员工列表---员工去重
    findEmployees() {
      this.TransferLoading = true;
      console.log("this.TransferVal", this.TransferVal);
      if (this.TransferTemp[this.tempIndex]) {
        console.log(
          "this.TransferTemp[this.tempIndex]",
          this.TransferTemp[this.tempIndex]
        );
        this.TransferVal = this.TransferTemp[this.tempIndex].Val;
        console.log("this.TransferVal", this.TransferVal);
      } else {
        console.log("null", null);
        this.TransferVal = [];
        this.TransferTemp[this.tempIndex] = {
          Data: [],
          Val: []
        };
      }
      var body = {
        fromCompany: "", //	所属分公司
        fromSale: "", //	所属销售
        company: this.ApprovalForm.insComp, //	企业名称
        name: this.InquireStafft.name, //	姓名
        phone: "", //	电话号码
        branch: this.InquireStafft.branch, //部门
        auditStatus: "", //	审核状态
        page: this.InquireStafft.page, //
        pageSize: 99999, //
        reEmptyInfo: "Y"
      };
      // 判断是公费套餐还是自费套餐 ，公费套餐发id  自费套餐不发
      if (this.PackageType == "公费") {
        body.goodId = this.PackageId;
      }
      this.$api
        .get("/employee/findEmployees", body)
        .then(res => {
          // console.log(res.data.data);
          var resList = res.data.data;
          resList.forEach((res, index) => {
            resList[index].label = res.name;
            resList[index].key = index;
          });
          // 最终审核数据---this.medicalInformation
          var mTemp = JSON.parse(JSON.stringify(this.medicalInformation));
          if (mTemp[0].examinaPerson.length == 0) {
            console.log("mTemp[0].examinaPerson.length == 0************");
            this.TransferData = JSON.parse(JSON.stringify(resList));
            this.TransferTemp[this.tempIndex] = {
              Data: JSON.parse(JSON.stringify(resList))
            };
            console.log("重点观察this.TransferTemp", this.TransferTemp);
          } else {
            console.log(
              "mTemp[this.tempIndex].examinaPerson",
              mTemp[this.tempIndex].examinaPerson
            );
            if (mTemp[this.tempIndex].examinaPerson.length != 0) {
              console.log("has", mTemp[this.tempIndex].examinaPerson);
              let idList = [];
              mTemp.map((item, i) => {
                console.log("i", i);
                console.log("item", item);
                if (i != this.tempIndex) {
                  item.examinaPerson.map((examina, j) => {
                    console.log("j", j);
                    console.log("examina", examina);
                    idList.push(examina.identity);
                  });
                }
              });
              console.log("idList", idList);
              idList.map(i => {
                resList = resList.filter(j => j.identity != i);
              });
              this.TransferTemp[this.tempIndex].Data = JSON.parse(
                JSON.stringify(resList)
              );
              this.TransferData = JSON.parse(
                JSON.stringify(this.TransferTemp[this.tempIndex].Data)
              );
              console.log("resList1", resList);
            } else {
              let idList = [];
              mTemp.map(item => {
                item.examinaPerson.map(examina => {
                  idList.push(examina.identity);
                });
              });
              console.log("idList", idList);
              idList.map(i => {
                resList = resList.filter(j => j.identity != i);
              });
              // resList = resList.filter(item => item.identity != idList);
              console.log("resList2", resList);
              this.TransferTemp[this.tempIndex].Data = JSON.parse(
                JSON.stringify(resList)
              );
              this.TransferData = JSON.parse(
                JSON.stringify(this.TransferTemp[this.tempIndex].Data)
              );
              console.log("null", null);
            }
            console.log("else******************************************");
            console.log("this.TransferData", this.TransferData);
          }
          this.TransferLoading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err);
          this.TransferLoading = false;
        });
    },
    // 选择员工
    ChooseEmployee(index) {
      this.tempIndex = index;
      // this.medicalInformation[this.tempIndex].examinaPerson = [];
      this.findEmployees();
      this.dialogStaff = true;
    },
    // 员工全选
    StaffSelectionChange(val) {
      console.log(val);
      this.StaffSelection = val;
    },
    // 员工选中后确认按钮---赋值并校验
    determineStaff() {
      if (this.TransferVal.length == 0) {
        this.$message.error("请选择员工");
        return;
      }
      console.log("当前index---", this.tempIndex);
      this.TransferTemp[this.tempIndex].Val = JSON.parse(
        JSON.stringify(this.TransferVal)
      );
      console.log(
        "重点观察this.TransferTemp",
        this.TransferTemp[this.tempIndex]
      );
      var templist = JSON.parse(JSON.stringify(this.TransferData));
      var tempTransferVal = JSON.parse(JSON.stringify(this.TransferVal));
      templist = templist.filter(
        item => tempTransferVal.indexOf(item.key) >= 0
      );
      console.log("templist", templist);
      var tempArr = [];
      templist.map(item => {
        tempArr.push({
          medicalPeople: item.name,
          phoneNumber: item.phone,
          identity: item.identity,
          gender: item.sex,
          marriage: item.isMarital
        });
      });
      this.medicalInformation[this.tempIndex].examinaPerson = JSON.parse(
        JSON.stringify(tempArr)
      );
      console.log("this.medicalInformation", this.medicalInformation);
      this.dialogStaff = false;
    },
    // 删除选中员工
    handleClose(tag, index) {
      this.tempIndex = index;
      // console.log('this.tempIndex :', this.tempIndex);
      // console.log('tag',tag);
      // console.log('this.TransferTemp[this.tempIndex].Data', this.TransferTemp[this.tempIndex].Data)
      // console.log('this.TransferTemp[this.tempIndex].Val', this.TransferTemp[this.tempIndex].Val)
      var tempKey = this.TransferTemp[this.tempIndex].Data.filter(
        item => item.identity == tag.identity
      );
      // console.log('tempKey :', tempKey);
      // console.log('key :', tempKey[0].key);
      this.TransferTemp[this.tempIndex].Val = this.TransferTemp[
        this.tempIndex
      ].Val.filter(item => item != tempKey[0].key);
      this.medicalInformation[this.tempIndex].examinaPerson.splice(
        this.medicalInformation[this.tempIndex].examinaPerson.indexOf(tag),
        1
      );
    },
    // 分页方法
    StaffSizeChange(val) {
      this.InquireStafft.pageSize = val;
      this.findEmployees();
      console.log(`每页 ${val} 条`);
    },
    StaffCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.InquireStafft.page = val;
      console.log(this.InquireStafft.page);
      this.findEmployees();
    },
    // 删除体检人信息
    delInformation(index) {
      // this.tempIndex = index;
      console.log("this.tempIndex :", this.tempIndex);
      this.TransferTemp.splice(index, 1);
      this.medicalInformation.splice(index, 1);
    },
    // 图片
    onchangeArr(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      for (let i = this.fileList.length - 1; i >= 0; i--) {
        if (file.uid == this.fileList[i].uid) {
          this.fileList.splice(i, 1);
        }
      }
      for (let i = this.imgTemp.length - 1; i >= 0; i--) {
        if (file.uid == this.imgTemp[i].uid) {
          this.imgTemp.splice(i, 1);
        }
      }
      console.log("删除");
      console.log("this.imgTemp", this.imgTemp.length);
      console.log("this.fileList", this.fileList.length);
    },
    handlePreview(file) {
      console.log(file);
    },
    getFile(file, fileList) {
      console.log(111);
      console.log(file, fileList);
      this.getBase64(file.raw).then(res => {
        // console.log(res);
        this.fileList.push({
          uid: file.uid,
          url: file.url
        });
        this.imgTemp.push({
          uid: file.uid,
          url: res
        });
      });

      console.log("添加");
      console.log("this.imgTemp", this.imgTemp);
      console.log("this.fileList", this.fileList);
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    //商品售价输入限制
    paytotalAmountInput() {
      console.log(this.ApprovalForm.paytotalAmount);
      // if (this.ApprovalForm.paytotalAmount[0] == ".") {
      //   this.ApprovalForm.paytotalAmount.replace(".", "");
      // }
      // console.log(this.ApprovalForm.paytotalAmount[0]);
      // if (this.ApprovalForm.paytotalAmount[0] == ".") {
      //   console.log(12412412);
      //   this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount.replace(
      //     /\.{0,}/g,
      //     ""
      //   );
      // }
      // console.log(this.ApprovalForm.paytotalAmount.split(".").length);
      // if (this.ApprovalForm.paytotalAmount.split(".").length - 1 > 1) {
      //   this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount.replace(
      //     /\.{2,}/g,
      //     ""
      //   ); // 只保留第一个. 清除多余的
      //   this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount
      //     .replace(".", "$#$")
      //     .replace(/\./g, "")
      //     .replace("$#$", ".");
      // }
      // this.ApprovalForm.paytotalAmount = this.ApprovalForm.paytotalAmount.replace(
      //   /[^\.\d]/g,
      //   ""
      // );
      // console.log(this.ApprovalForm.paytotalAmount);
    }
  },
  watch: {
    // 当受检单位---企业改变的时候
    "ApprovalForm.insComp": function(n, o) {
      // 初始化体检人数据
      this.medicalInformation = [
        {
          BookingCity: this.CityByIdData, //预约城市
          BookingStore: [], //门店数据
          examinaPerson: [], //体检人
          appoCity: "", //		预约城市
          appoShop: "", //	预约门店
          appoTime: "" //		预约时间
        }
      ];
      // 初始化套餐数据
      this.packageData = [];
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.newapproval_wrap {
  padding: 10px 20px 20px 20px;
}
.newapproval_header {
  width: 200px;
}
.newapproval_form {
  width: 600px;
  .el-form-item__label {
    padding: 0;
  }
}
.newapproval_Package {
  width: 600px;
  .newapproval_block_del {
    z-index: 1000;
    position: relative;
    .newapproval_block_del_button {
      position: absolute;
      right: 20px;
      top: 0px;
    }
  }
}
.newapproval_block {
  margin-bottom: 20px;
  padding: 20px;
  width: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .newapproval_block_del {
    z-index: 1000;
    position: relative;
    .newapproval_block_del_button {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
  .newapproval_blocks {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 5px;
    .newapproval_tag {
      margin: 10px;
    }
  }
}
.newapproval_table {
  margin-top: 15px;
}
</style>
