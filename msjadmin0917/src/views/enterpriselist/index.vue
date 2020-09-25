<template>
  <div class="app-container">
    <!-- 企业列表 -->
    <div>
      <!-- 查询表单 -->
      <div>
        <div class="inquire">
          <el-row>
            <el-col :span="6">
              <div class="grid_lable">所属分公司：</div>
              <div class="grid_content">
                <el-select
                  v-model="Inquire.fromCompany"
                  :disabled="SubsidiaryOptions.length == 0"
                  filterable
                  placeholder="请选择"
                  size="medium"
                  style="width:100%;"
                >
                  <el-option
                    v-for="(item,index) in SubsidiaryOptions"
                    :key="index"
                    :label="item.index"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid_lable">所属销售：</div>
              <div class="grid_content">
                <el-select
                  v-model="Inquire.fromSale"
                  :disabled="salesOptions.length == 0"
                  filterable
                  placeholder="请选择"
                  size="medium"
                  style="width:100%;"
                >
                  <el-option
                    v-for="(item,index) in salesOptions"
                    :key="index"
                    :label="item.index"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
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
            <el-col :span="6">
              <div class="grid_lable">企业名称：</div>
              <div class="grid_content">
                <el-input
                  placeholder="请输入内容"
                  v-model="Inquire.accountName"
                  clearable
                  size="medium"
                  style="width:100%;"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="inquire">
          <el-row>
            <el-col :span="6">
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
            <el-col :span="6">
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
            <el-button
              :disabled="!Clickable.inquire"
              class="grid_button"
              type="primary"
              size="medium"
              @click="findBusiness('搜索')"
              icon="el-icon-search"
            >搜索</el-button>
          </el-row>
        </div>
        <div class="inquire">
          <el-button
            :disabled="!Clickable.add"
            type="primary"
            size="medium"
            icon="el-icon-plus"
            v-if="RoleInfo.AccountType !=1"
            @click="newEnterprise()"
          >新增企业</el-button>
        </div>
      </div>

      <!-- 信息列表 -->
      <div>
        <el-table :data="tableData" v-loading="tableDataLoading" style="width: 100%;">
          <el-table-column prop="fromCompany" label="所属分公司"></el-table-column>
          <el-table-column prop="fromSale" label="所属销售"></el-table-column>
          <el-table-column prop="CreateTime" show-overflow-tooltip label="创建时间"></el-table-column>
          <el-table-column prop="accountName" label="企业名称"></el-table-column>
          <el-table-column prop="linkMan" label="联系人"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column prop="commoditystyle" label="二维码">
            <template slot-scope="scope">
              <img
                class="enterpriselist_QRcode"
                src="../../assets/erweima.png"
                alt
                @click="qrcodeFun(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="福利券金额配置">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="medium"
                @click="goWelfarevoucher(scope.row)"
              >{{scope.row.benefits/100}}元</el-button>
            </template>
          </el-table-column>
          <el-table-column label="套餐配置"  show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="enterpriselist_Configuration">
                <div v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2">
                  <!-- {{scope.row.enterMeal.length}} -->
                  <el-button
                    :disabled="!Clickable.package"
                    v-if="scope.row.enterMeal!=null && scope.row.enterMeal.length != 0"
                    type="text"
                    size="medium"
                    @click="goEditPackage(scope.row)"
                  >{{Conversion(scope.row.enterMeal)}}</el-button>
                  <el-button
                    :disabled="!Clickable.package"
                    v-else
                    type="text"
                    size="medium"
                    @click="goPackage(scope.row)"
                  >套餐配置</el-button>
                </div>
                <div v-else>
                  <div v-if="scope.row.enterMeal">{{Conversion(scope.row.enterMeal)}}</div>
                  <div v-else>套餐配置</div>
                </div>
              </div>
            </template>        
          </el-table-column>

        <el-table-column label="企业参数配置"  min-width="160"  fixed="right"> 
          <template slot-scope="scope">
             <el-button   :disabled="!Clickable.select" @click="compilenote(scope.row)" type="text" size="medium" >设置</el-button>
          </template>
        </el-table-column> 
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
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
            <!---->
          </div>
        </el-dialog>
      </div>

      <!-- 新增企业弹窗 -->
      <div>
        <el-dialog title="新增企业" :visible.sync="dialogFormVisible" width="600px">
          <div>
            <el-form label-width="150px" class="demo-ruleForm">
              <el-form-item label="账号类型：" prop="type">
                <el-select value="企业" placeholder="请选择账号类型" style="width:70%" size="medium">
                  <el-option label="企业" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="dialogFormVisible">
            <enterpriseFrom ref="enterpriseFrom" v-on:CreateAccountPost="CreateAccountPost" />
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="typeForm()">立即创建</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
import enterpriseFrom from "../accountlist/components/enterpriseFrom";
export default {
  name: "enterpriselist",
  components: { enterpriseFrom },
  watch: {
    "Inquire.fromCompany": {
      handler(nvl, ovl) {
        this.Inquire.fromSale = "";
        console.log(nvl);
        if (nvl == "全部") {
          this.salesOptions = ["全部"];
          if (this.$store.getters.getRoleInfo.AccountType == 0) {
            // 查询分销售赋值
            this.salesOptions = this.salesOptions.concat(
              this.$store.getters.getSales
            );
          } else if (this.$store.getters.getRoleInfo.AccountType == 1) {
            this.salesOptions = this.salesOptions.concat(
              this.$store.getters.getSales
            );
          }
          return;
        }

        if (this.$store.getters.getRoleInfo.AccountType == 2) {
          this.SubsidiaryOptions = [];
          this.salesOptions = [];
          // 查询分公司赋值
          this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
          this.Inquire.fromSale = this.$store.getters.getRoleInfo.AccountName;
          return;
        }

        this.$api
          .get("account/pullOrg2", {
            AccountType: "1",
            AccountName: nvl
          })
          .then(res => {
            this.salesOptions = ["全部"];
            console.log(res);
            res.data.map(item => {
              if (item.AccountType == "2") {
                item.Name.map(temp => {
                  this.salesOptions.push(temp);
                });
              }
            });
          });
      }
    }
  },
  data() {
    return {
      imgUrl:"",//要下载的base64图片
      config: {
        obj: "",
        value: "https://www.baidu.com", //显示的值、跳转的地址
        imagePath: require("../../../src/assets/logo.png") //中间logo的地址
      },
      timeframe: [],
      Inquire: {
        linkMan: "",
        mobile: "",
        fromCompany: "全部",
        fromSale: "全部",
        accountName: "",
        page: 1,
        pageSize: 10
      },
      count: 0,
      // Loading
      tableDataLoading: true,
      // Dialog弹窗
      QRCodeDialog: false, //展示二维码
      dialogFormVisible: false, //新增企业弹窗
      // 表格数据
      tableData: [],

      SubsidiaryOptions: ["全部"],
      salesOptions: ["全部"]
    };
  },
  mounted() {
    // 获取选择框数据
    this.getSelectionData();
    this.findBusiness();
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {

    compilenote(val){
     
        this.$router.push("/enterprisemanagement/configurationData?id="+val.id);
    },
    //保存数据
    copypagemsg() {
      var body = {
        linkMan: this.Inquire.linkMan,
        mobile: this.Inquire.mobile,
        fromCompany: this.Inquire.fromCompany,
        fromSale: this.Inquire.fromSale,
        accountName: this.Inquire.accountName,
        page: this.Inquire.page,
        pageSize: this.pageSize,
        timeframe: this.timeframe
      };
      this.$store.commit("setenterpriselistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getenterpriselistmsg;
      this.Inquire.linkMan = body.linkMan || "";
      this.Inquire.mobile = body.mobile || "";
      this.Inquire.fromCompany = body.fromCompany || "全部";
      this.Inquire.fromSale = body.fromSale || "全部";
      this.Inquire.accountName = body.accountName || "";
      this.Inquire.page = body.page || 1;
      this.Inquire.pageSize = body.pageSize || 10;
      this.timeframe = body.timeframe || [];
      console.log(body);
    },
    // 福利券金额配置
    goWelfarevoucher(val) {
      console.log("goWelfarevoucher(val)", val);
      this.$router.push("/enterprisemanagement/welfarevoucher?id=" + val.id);
    },
    // 配置套餐
    goPackage(val) {
      console.log(val);
      var temp = JSON.stringify(val);
      this.$router.push(
        "/enterprisemanagement/enterpriseconfiguration?accountName=" +
          val.accountName +
          "&mobile=" +
          val.mobile +
          "&fromCompany=" +
          val.fromCompany +
          "&id=" +
          val.id +
          "&type=" +
          0
      );
    },
    // 编辑套餐
    goEditPackage(val) {
      this.$router.push(
        "/enterprisemanagement/enterpriseconfiguration?accountName=" +
          val.accountName +
          "&mobile=" +
          val.mobile +
          "&fromCompany=" +
          val.fromCompany +
          "&id=" +
          val.id +
          "&type=" +
          1
        // +
        // "&enterMeal=" +
        // val.enterMeal
      );
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
        // 查询分销售赋值
        this.salesOptions = this.salesOptions.concat(
          this.$store.getters.getSales
        );
        // 创建销售账号---分公司赋值
        this.subsidiaryData = this.$store.getters.getBranchOffice;
      } else if (this.$store.getters.getRoleInfo.AccountType == 1) {
        this.SubsidiaryOptions = [];
        this.subsidiaryData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany =  this.$store.getters.getRoleInfo.parentName || this.$store.getters.getRoleInfo.AccountName;
        // 查询分销售赋值
        this.salesOptions = this.salesOptions.concat(
          this.$store.getters.getSales
        );
      } else {
        console.log(111);
        this.SubsidiaryOptions = [];
        this.salesOptions = [];
        // 查询分公司赋值
        this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
        this.Inquire.fromSale = this.$store.getters.getRoleInfo.AccountName;
      }
    },
    // 数据转换
    Conversion(val) {
      // console.log(1);
      // console.log("数据转换", val);
      let temp = [];
      val.map(item => {
        temp.push(item.goodname);
      });
      // console.log(temp);
      return temp.join();
    },
    // 企业列表
    findBusiness(val) {
      if (val == "搜索") {
        this.Inquire.page = 1;
      }
      var temp = JSON.stringify(this.Inquire);
      var body = JSON.parse(temp);
      if (this.Inquire.fromCompany == "全部") {
        body.fromCompany = "";
      }
      if (this.Inquire.fromSale == "全部") {
        body.fromSale = "";
      }
      if (
        this.timeframe &&
        Array.isArray(this.timeframe) &&
        this.timeframe.length > 1
      ) {
        body.startTime = this.timeframe[0];
        body.endTime = this.timeframe[1];
      }
      this.$api
        .get("/busines/findBusiness", body)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data;
          this.count = res.data.count;
          this.tableDataLoading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.tableData = [];
          this.tableDataLoading = false;
        });
    },
    // 新增企业弹窗
    newEnterprise() {
      this.dialogFormVisible = true;
      var body = "";
      this.$store.commit("setEditObj", body);
    },
    // 调用企业组件方法
    typeForm() {
      this.$refs.enterpriseFrom.submitForm(); //此方法会在子组件中调用下面CreateAccountPost()这个方法
    },
    // 创建账号请求服务器，组件调用此方法
    CreateAccountPost(body) {
      console.log("创建账号请求服务器");
      console.log(body);
      this.$api
        .post("/account/pushOne", body)
        .then(res => {
          console.log(res.data);
          this.$message({
            message: "创建成功！",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.findBusiness();
        })
        .catch(err => {
          console.log("err", err.code, err);
          this.$message.error(err.msg);
        });
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
            // that.imgUrl =canvas.toDataURL()
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
      this.Inquire.page = 1;
      this.Inquire.pageSize = val;
      this.findBusiness();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findBusiness();
      console.log(`当前页: ${val}`);
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("企业列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    },
    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
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

.enterpriselist_QRcode {
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
.enterpriselist_QR_code {
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