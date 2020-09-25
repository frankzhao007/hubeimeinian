<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="7">
            <div class="grid_lable">所属分公司：</div>
            <div class="grid_content">
              <el-select
                v-model="Inquire.fromCompany"
                :disabled="SubsidiaryOptions.length == 0"
                filterable
                placeholder="（支持搜索）"
                size="medium"
                style="width:100%;"
              >
                <el-option
                  v-for="(item,index) in SubsidiaryOptions"
                  :key="item.index"
                  :label="item.index"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left: 6%;">
            <div class="grid_lable">联系人：</div>
            <div class="grid_content">
              <el-input
                placeholder="请输入内容"
                v-model="Inquire.linkMan"
                clearable
                size="medium"
                style="width:100%;"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left:6%;">
            <div class="grid_lable">手机号：</div>
            <div class="grid_content">
              <el-input
                placeholder="请输入内容"
                v-model="Inquire.mobile"
                clearable
                size="medium"
                style="width:100%;"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span="7">
            <div class="grid_lable">时间范围：</div>
            <div class="grid_content">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="timeframe"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>
          <!-- 按钮 -->
          <div>
            <div class="inquire">
              <el-button
                :disabled="!Clickable.inquire"
                class="grid_button"
                type="primary"
                size="medium"
                @click="findSalesManag('搜索')"
                icon="el-icon-search"
              >搜索</el-button>
            </div>
            <div class="inquire">
              <el-button
               
                :disabled="!Clickable.add"
                type="primary"
                size="medium"
                icon="el-icon-plus"
                @click="newSales()"
              >新增销售</el-button>
            </div>
          </div>
        </el-row>
      </div>
    </div>

    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column label="所属分公司">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.fromCompany }}</p>
              <div slot="reference" class="TooLong">{{ scope.row.fromCompany }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" show-overflow-tooltip label="创建时间"></el-table-column>
        <el-table-column prop="accountName" label="销售名称"></el-table-column>
        <el-table-column prop="linkMan" label="联系人"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column label="二维码">
          <template slot-scope="scope">
            <img
              class="saleslist_QRcode"
              src="../../assets/erweima.png"
              alt
              @click="qrcodeFun(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="绩效完成" fixed="right">
          <template slot-scope="scope">
            <el-button
              :disabled="!Clickable.performance"
              type="text"
              size="small"
              @click="performanceSet(scope.row)"
            >{{scope.row.rateMonthPerform}}%</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Inquire.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="Inquire.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>

    <!-- 二维码弹窗 -->
    <div>
      <el-dialog
        title="二维码"
        :visible.sync="QRCodeDialog"
        width="450px"
        top="5vh"
        center
        @close="qrcodeFun(1)"
      >
        <div id="imgcanvas1"></div>
        <div class="saveimage" @click="downs()" v-if="imgUrl">下载保存图片到本地</div>
        <div class="bgbox" id="imgcanvas">
          <div class="bgbox1">
            <div class="text1">{{config.obj.linkMan}}</div>
            <div class="text2">{{config.obj.accountName}}</div>
            <div class="accountlist_QR_code">
              <div id="qrcode" ref="qrcode"></div>
              <img class="logoimg" src="../../../src/assets/logo.png" alt />
            </div>
            <div class="text3">用微信扫二维码/长按识别</div>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 绩效设置弹窗 -->
    <el-dialog title="绩效目标" :visible.sync="dialogVisible" width="600px" style="min-width:1520px">
      <el-row>
        <span>选择年份</span>
        <el-date-picker
          v-model="confirmSubmissionForm.yearSelect"
          @change="selectYear"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
          size="medium"
        ></el-date-picker>
        <span>绩效完成：{{rateMonthPerform}}%</span>
      </el-row>
      <div>
        <el-table :data="PerformanceData" style="width: 600px;margin-top:20px;" size="medium">
          <el-table-column prop="month" label="全年" width="200"></el-table-column>
          <el-table-column label="绩效（元）">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.val"
                @input="checkInput(scope.$index)"
                type="text"
                size="small"
                style="width: 60%;"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSubmission()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增销售弹窗 -->
    <div>
      <el-dialog title="新增销售" :visible.sync="dialogFormVisible" width="600px">
        <div>
          <el-form
            :model="selectiveTypeForm"
            :rules="selectiveTypeRules"
            ref="selectiveTypeForm"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号类型：" prop="type">
              <el-select
                v-model="selectiveTypeForm.type"
                placeholder="请选择账号类型"
                style="width:70%"
                size="medium"
              >
                <el-option label="销售" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="dialogFormVisible">
          <el-form
            :model="salesForm"
            :rules="salesRules"
            ref="salesForm"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="销售名称：" prop="name">
              <el-input
                v-model="salesForm.name"
                maxlength="30"
                show-word-limit
                placeholder="请输入名称"
                style="width:70%"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact">
              <el-input
                v-model="salesForm.contact"
                maxlength="15"
                show-word-limit
                placeholder="请输入联系人"
                style="width:70%"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人手机：" prop="phoneNumber">
              <el-input
                type="age"
                v-model.number="salesForm.phoneNumber"
                placeholder="请输入手机号"
                minlength="11"
                maxlength="11"
                style="width:70%"
                size="medium"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属分公司：" prop="subsidiary">
              <el-select
                v-model="salesForm.subsidiary"
                :disabled="subsidiaryData.length == 0"
                filterable
                placeholder="所属分公司"
                size="medium"
                style="width:70%;"
              >
                <el-option
                  v-for="(item,index) in subsidiaryData"
                  :key="item.index"
                  :label="item.index"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('salesForm')">立即创建</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import VueQr from "vue-qr";
import QRCode from "qrcodejs2";
import salesForm from "../accountlist/components/salesForm";
export default {
  name: "saleslist",
  components: { salesForm, VueQr },
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
      imgUrl: "",
      config: {
        obj: "",
        value: "https://www.baidu.com", //显示的值、跳转的地址
        imagePath: require("../../../src/assets/logo.png") //中间logo的地址
      },
      timeframe: [], //时间范围
      // 查询销售的数据
      Inquire: {
        linkMan: "", //联系人
        mobile: "", //联系人手机
        fromCompany: "全部", //所属分公司
        page: 1,
        pageSize: 10
      },
      // 绩效完成度
      rateMonthPerform: "",
      count: 0,
      isNewOrEdit: true,
      // 所属分公司选项
      subsidiaryData: [],
      //账号类型表单数据
      selectiveTypeForm: {
        type: "1"
      },
      //账号类型表单规则
      selectiveTypeRules: {
        type: [{ required: true, message: "请选择账号类型", trigger: "blur" }]
      },
   
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
      // Dialog弹窗
      QRCodeDialog: false, //展示二维码
      dialogFormVisible: false, //新增编辑销售弹窗
      dialogVisible: false, //是否打开绩效设置弹窗
      // 提交绩效数据
      confirmSubmissionForm: {
        mobile: "",
        yearSelect: "" //选择的年份
      },
      PerformanceData: [
        { month: "一月", id: "jan", val: "" },
        { month: "二月", id: "feb", val: "" },
        { month: "三月", id: "mar", val: "" },
        { month: "四月", id: "apr", val: "" },
        { month: "五月", id: "may", val: "" },
        { month: "六月", id: "jun", val: "" },
        { month: "七月", id: "jul", val: "" },
        { month: "八月", id: "aug", val: "" },
        { month: "九月", id: "sept", val: "" },
        { month: "十月", id: "oct", val: "" },
        { month: "十一月", id: "nov", val: "" },
        { month: "十二月", id: "dec", val: "" }
      ],

      SubsidiaryOptions: ["全部"],
      value: "",
      input: "",
      tableData: [],
      AccountType:"",
    };
  },
  mounted() {

    this.AccountType=this.$store.getters.getRoleInfo.AccountType
    // 获取选择框数据
    this.getSelectionData();
    // 销售列表
    this.findSalesManag();
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        linkMan: this.Inquire.linkMan,
        mobile: this.Inquire.mobile,
        fromCompany: this.Inquire.fromCompany,
        page: this.Inquire.page,
        pageSize: this.Inquire.pageSize,
        timeframe: this.timeframe
      };
      this.$store.commit("setsaleslistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getsaleslistmsg;
      this.Inquire.linkMan = body.linkMan || "";
      this.Inquire.mobile = body.mobile || "";
      this.Inquire.fromCompany = body.fromCompany || "全部";
      this.Inquire.page = body.page || 1;
      this.Inquire.pageSize = body.pageSize || 10;
      this.timeframe = body.timeframe || [];
      console.log(body);
    },
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      console.log(this.$store.getters.getRoleInfo.AccountType);
      if (this.$store.getters.getRoleInfo.AccountType == 0) {
        // 查询分公司赋值
        this.SubsidiaryOptions = this.SubsidiaryOptions.concat(
          this.$store.getters.getBranchOffice
        );
        // 创建销售账号---分公司赋值
        this.subsidiaryData = this.$store.getters.getBranchOffice;
      } else if(this.$store.getters.getRoleInfo.AccountType == 7) {
        console.log(this.$store.getters.getRoleInfo);
        this.SubsidiaryOptions = [];
        this.subsidiaryData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany =  this.$store.getters.getRoleInfo.FromCompany
        // 创建销售账号---分公司赋值
        this.salesForm.subsidiary =  this.$store.getters.getRoleInfo.FromCompany;
      }else {
        console.log(this.$store.getters.getRoleInfo);
        this.SubsidiaryOptions = [];
        this.subsidiaryData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany =  this.$store.getters.getRoleInfo.parentName ||  this.$store.getters.getRoleInfo.AccountName;
        // 创建销售账号---分公司赋值
        this.salesForm.subsidiary =  this.$store.getters.getRoleInfo.parentName || this.$store.getters.getRoleInfo.AccountName;
      }
    },
    // 销售列表
    findSalesManag(val) {
      if (val == "搜索") {
        this.Inquire.page = 1;
      }
      var temp = JSON.stringify(this.Inquire);
      var body = JSON.parse(temp);

      if (this.Inquire.fromCompany == "全部") {
        body.fromCompany = "";
      }
      if (
        this.timeframe &&
        Array.isArray(this.timeframe) &&
        this.timeframe.length > 1
      ) {
        body.startTime = this.timeframe[0];
        body.endTime = this.timeframe[1];
      }
      console.log(this.timeframe);
      console.log(body);

      this.$api
        .get("/sales/findSalesManag", body)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data;
          this.count = res.data.count;
        })
        .catch(err => {
          console.log("err", err);
          this.tableData = [];
        });
    },
    // 选择年份给input赋值
    selectYear() {
      console.log(this.confirmSubmissionForm.yearSelect);
      this.findByIdSalesManag();
    },
    // 新增销售
    newSales() {
      this.salesForm = {
        //创建销售账号表单数据
        name: "", //名称
        contact: "", //联系人
        phoneNumber: null, //联系人手机
        subsidiary: "" //所属分公司
      };
      this.getSelectionData();
      this.isNewOrEdit = true;
      this.dialogFormVisible = true;
    },
    // 新增销售Post
    NewSalesPost() {
      var body = {
        AccountType: "2", //账号类型 0运营 1分公司 2销售 3企业 4门店
        AccountName: this.salesForm.name, //名称
        LinkMan: this.salesForm.contact, //联系人
        Mobile: JSON.stringify(this.salesForm.phoneNumber), //联系人手机
        FromCompany: this.salesForm.subsidiary //所属分公司
      };
      this.$api
        .post("/account/pushOne", body)
        .then(res => {
          console.log(res.data);
          this.$message.success("创建成功！");
          this.dialogFormVisible = false;
          this.findSalesManag();
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.msg);
        });
    },
    // 新增销售表单校验
    submitForm() {
      this.$refs["salesForm"].validate(valid => {
        if (valid) {
          console.log("销售submit!");
          this.NewSalesPost();
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
    },
    // 绩效弹窗
    performanceSet(val) {
      console.log("绩效弹窗", val);
      console.log(val.mobile);
      var myDate = new Date(); //获取系统当前时间
      var data = JSON.stringify(myDate.getFullYear()); //获取完整的年份(4位,1970-????)
      console.log(data);
      this.confirmSubmissionForm.mobile = val.mobile;
      this.confirmSubmissionForm.id = val.id;
      this.confirmSubmissionForm.yearSelect = data;
      // 初始化表单
      this.PerformanceData = [
        { month: "一月", id: "jan", val: "" },
        { month: "二月", id: "feb", val: "" },
        { month: "三月", id: "mar", val: "" },
        { month: "四月", id: "apr", val: "" },
        { month: "五月", id: "may", val: "" },
        { month: "六月", id: "jun", val: "" },
        { month: "七月", id: "jul", val: "" },
        { month: "八月", id: "aug", val: "" },
        { month: "九月", id: "sept", val: "" },
        { month: "十月", id: "oct", val: "" },
        { month: "十一月", id: "nov", val: "" },
        { month: "十二月", id: "dec", val: "" }
      ];
      this.findByIdSalesManag();
    },
    findByIdSalesManag() {
      var body = {
        mobile: this.confirmSubmissionForm.mobile,
        account: this.confirmSubmissionForm.yearSelect,
        id: this.confirmSubmissionForm.id
      };
      this.$api
        .post("/sales/findByIdSalesManag", body)
        .then(res => {
          console.log(res.data);
          // console.log(res.data.monthMents);
          this.rateMonthPerform = res.data.rateMonthPerform;
          for (var k in res.data.monthMents) {
            // console.log(
            //   "姓名：" + k + ";" + "对应值：" + res.data.monthMents[k]
            // );
            for (let i = 0; i < this.PerformanceData.length; i++) {
              if (k == this.PerformanceData[i].id) {
                this.PerformanceData[i].val = res.data.monthMents[k];
              }
            }
          }
          console.log(this.PerformanceData);
        })
        .catch(err => {
          console.log("err", err);

          this.rateMonthPerform = 0;
          // 初始化表单
          this.PerformanceData = [
            { month: "一月", id: "jan", val: "" },
            { month: "二月", id: "feb", val: "" },
            { month: "三月", id: "mar", val: "" },
            { month: "四月", id: "apr", val: "" },
            { month: "五月", id: "may", val: "" },
            { month: "六月", id: "jun", val: "" },
            { month: "七月", id: "jul", val: "" },
            { month: "八月", id: "aug", val: "" },
            { month: "九月", id: "sept", val: "" },
            { month: "十月", id: "oct", val: "" },
            { month: "十一月", id: "nov", val: "" },
            { month: "十二月", id: "dec", val: "" }
          ];
        });

      //  绩效设置
      this.dialogVisible = true;
    },
    // 提交信息
    confirmSubmission() {
      var temp = JSON.stringify(this.PerformanceData);
      var data = JSON.parse(temp);
      var monthMents = [];
      var obj = {};
      for (let i = 0; i < data.length; i++) {
        obj[data[i].id] = Number(data[i].val);
      }
      console.log(obj);
      var body = {
        mobile: this.confirmSubmissionForm.mobile,
        account: this.confirmSubmissionForm.yearSelect,
        id: this.confirmSubmissionForm.id,
        monthMents: obj
      };
      console.log(body);
      this.$api
        .post("/sales/updateSalesKpiInfo", body)
        .then(res => {
          console.log(res.data);
          this.dialogVisible = false;
          // 销售列表
          this.findSalesManag();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 校验input
    checkInput(index) {
      console.log(index);
      this.PerformanceData[index].val = this.PerformanceData[index].val.replace(
        /[^\.\d]/g,
        ""
      );
      this.PerformanceData[index].val = this.PerformanceData[index].val.replace(
        ".",
        ""
      );
      //  e.target.value = e.target.value.replace(/[^\d]/g,'')
      // console.log('value值-----'+e.target.value)
      // console.log('model值-----'+this.loginForm.phoneNumber)
      // val = val.replace(/[^\.\d]/g, "");
      // val = val.replace(".", "");
    },


    //图片转二维码
    qrcodeFun(row) {
      this.config.value = row.qrCode;
      this.config.obj = row;
      if (row != 1) {
        this.QRCodeDialog = true;
        setTimeout(() => {
          var qrcode = new QRCode(this.$refs.qrcode, {
            width: 200,
            height: 200,
            text: row.qrCode, // 二维码地址
            colorDark: "#1B449D"
          });
        }, 1);
        setTimeout(() => {
          html2canvas(document.getElementById("imgcanvas"), {
            allowTaint: true, //允许污染
            taintTest: true, //在渲染前测试图片(没整明白有啥用)
            useCORS: true //使用跨域(当allowTaint为true时这段代码没什么用)
          }).then(canvas => {
            document.getElementById("imgcanvas1").appendChild(canvas);
            this.imgUrl = canvas.toDataURL(); //生成canvas的base64图片
          });
        }, 100);
      } else {
        this.imgUrl = "";
        this.$refs.qrcode.innerHTML = "";
        document.getElementById("imgcanvas1").innerHTML = "";
        this.QRCodeDialog = false;
      }
    },

    downs() {
      this.downloadIamge("二维码");
    },

    downloadIamge(name) {
      //图片名
      var that = this;
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        var url = that.imgUrl;
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = that.imgUrl;
    },

    handleSizeChange(val) {
      this.Inquire.pageSize = val;
      this.findSalesManag();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findSalesManag();
      console.log(`当前页: ${val}`);
    }
  },
  watch: {},
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("销售列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    },
    getStore() {
      return this.$store.getters.getStore;
    },
    getSales() {
      return this.$store.getters.getSales;
    },
    getEnterprise() {
      return this.$store.getters.getEnterprise;
    }
  }
};
</script>

<style lang="scss">
#imgcanvas1 {
  text-align: center;
}
.bgbox {
  width: 375px;
  height: 667px;
  background-image: url(../../assets/qrcodebg.jpg);
  background-size: cover;
  margin: 0% auto;
  border: 1px solid #ffffff;
  position: absolute;
  top: -9999px;
  left: -9999px;
  .bgbox1 {
    background: #ffffff;
    border-radius: 8px;
    margin: 140px 40px 0 40px;
    text-align: center;
    .accountlist_QR_code {
      text-align: center;
      position: relative;
      // width: 132px;
      img {
        margin: 0 auto;
      }
      .logoimg {
        position: absolute;
        width: 60px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .text1 {
      font-size: 18px;
      color: #333333;
      padding-top: 40px;
    }
    .text2 {
      font-size: 14px;
      color: #666666;
      padding-top: 5px;
      padding-bottom: 15px;
    }
    .text3 {
      font-size: 14px;
      color: #333333;
      padding-top: 20px;
      padding-bottom: 60px;
    }
  }
}
.saleslist_QRcode {
  margin: 0 2px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    line-height: 37px;
  }
}
.saleslist_QR_code {
  text-align: center;
  img {
    margin: 0 auto;
  }
}
.saveimage {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 160px;
  font-size: 14px;
  background: rgb(49, 182, 255);
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  box-sizing: border-box;
  height: 45px;
  // border: 1px solid #FFFFFF;
  box-shadow: rgb(235, 86, 58) 0px 3px 6px 0px;
  border-radius: 50px;
  cursor: pointer;
}
</style>