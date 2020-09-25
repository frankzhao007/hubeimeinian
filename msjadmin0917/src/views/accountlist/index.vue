<template>
  <!-- 账号列表----------------------------------------------------------------------------------------------------------------- -->
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">账号类型：</div>
            <div class="grid_content">
              <el-select v-model="queryType" placeholder="请选择账号类型" style="width:100%" size="medium">
                <!-- 可以使用if  根据权限不同 -->
                <el-option label="全部" value></el-option>
                <el-option v-if="RoleInfo.AccountType == 0" label="运营" value="0"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 1" label="分公司" value="1"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 1" label="销售" value="2"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 1||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3" label="企业" value="3"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 1||RoleInfo.AccountType == 4" label="门店" value="4"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 1" label="财务" value="6"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 1" label="内勤" value="7"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">名称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="queryName" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">联系人手机号：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="queryPhone" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">审核状态：</div>
            <div class="grid_content">
              <el-select v-model="queryStatus" clearable size="medium" style="width:100%">
                <el-option label="全部" value></el-option>
                <el-option label="待审核" value="0"></el-option>
                <el-option label="审核通过" value="1"></el-option>
                <el-option label="审核不通过" value="2"></el-option>
              </el-select>
              <!-- <el-input placeholder="请输入内容" v-model="queryStatus" clearable size="medium" style="width:100%;">
              </el-input>-->
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="getAccountList('搜索')">搜索</el-button>
        <el-button :disabled="!Clickable.add" v-if="RoleInfo.AccountType != 3&&RoleInfo.AccountType != 5" class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="openNewAccount()">新增账号</el-button>
        <el-button v-if="Clickable.UpdateRoleByMobile" :disabled="!Clickable.UpdateRoleByMobile" class="grid_button" type="primary" size="medium" @click="UpdateRoleByMobile">批量编辑</el-button>

      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%" v-loading="tableDataLoading" @selection-change="handleSelectionChange">
        <el-table-column v-if="Clickable.UpdateRoleByMobile" type="selection" width="45">
        </el-table-column>
        <el-table-column prop="AccountName" label="账号级别" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.IsSon == true&&scope.row.AccountType!=7">子账号</span>
            <span v-if="scope.row.IsSon == false||scope.row.AccountType==7">主账号</span>
          </template>
        </el-table-column>
        <el-table-column prop="AccountType" label="账号类型" width="210">
          <template slot-scope="scope">
            <span v-if="scope.row.AccountType == '0'">运营</span>
            <span v-if="scope.row.AccountType == '1'">分公司</span>
            <span v-if="scope.row.AccountType == '2'">销售</span>
            <span v-if="scope.row.AccountType == '3'">企业</span>
            <span v-if="scope.row.AccountType == '4'">门店</span>
            <span v-if="scope.row.AccountType == '5'">大象医生</span>
            <span v-if="scope.row.AccountType == '6'">财务</span>
            <span v-if="scope.row.AccountType == '7'">内勤</span>
          </template>
        </el-table-column>
        <el-table-column prop="AccountName" label="名称" width="210"></el-table-column>
        <el-table-column prop="Mobile" label="联系人手机" width="210"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" width="210"></el-table-column>
        <el-table-column prop="LinkMan" label="联系人" width="210"></el-table-column>
        <el-table-column label="二维码" fixed="right" width="70">
          <template slot-scope="scope">
            <img v-if="scope.row.AccountType!=0&&scope.row.AccountType!=6&&scope.row.AccountType!=7" class="accountlist_QRcode" src="../../assets/erweima.png" alt="" @close="qrcodeFun(1)" @click="qrcodeFun(scope.row)">
          </template>
        </el-table-column>
        <el-table-column label="审核" fixed="right" width="90">
          <template slot-scope="scope">
            <!-- 0待审核 1审核通过 2审核不通过 -->
            <el-button v-if="scope.row.Status == 0" :disabled="!Clickable.review" @click="handleReview(scope.row)" type="text" size="small">待审核</el-button>
            <div v-if="scope.row.Status == 1">审核通过</div>
            <div v-if="scope.row.Status == 2">审核不通过</div>
          </template>
        </el-table-column>
        <el-table-column label="账号信息" fixed="right" width="80">
          <template slot-scope="scope" style="text-align: center;margin: 0 auto;">
            <el-button :disabled="!Clickable.subAccount" v-if="(RoleInfo.IsSon == false&&scope.row.IsSon == false)||scope.row.AccountType=='7'" type="primary" plain size="small" @click="goSubAccount(scope.row)">查看</el-button>
            <el-button :disabled="!Clickable.subAccount" v-if="(RoleInfo.IsSon == true &&scope.row.Id != RoleInfo.Id&&scope.row.IsSon == false)&&scope.row.AccountType!='7'" type="primary" plain size="small" @click="goSubAccount(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="(scope.row.Id == RoleInfo.Id||!Clickable.edit)&&(scope.row.AccountType==RoleInfo.AccountType)" size="small" plain @click="editAccount(scope.row)">编辑</el-button>

            <el-button :disabled="scope.row.Id == RoleInfo.Id&&scope.row.AccountType==RoleInfo.AccountType" type="danger" size="small" @click="deleteAccount(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗----------------------------------------------------------------------------------------------------------------- -->
    <!-- 新建账号弹窗 -->
    <div>
      <el-dialog title="账号信息" :visible.sync="openNewDialog" width="600px">
        <!-- 选择创建账号类型 -->
        <div>
          <el-form :model="selectiveTypeForm" :rules="selectiveTypeRules" ref="selectiveTypeForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="账号类型：" prop="type">
              <el-select v-model="selectiveTypeForm.type" placeholder="请选择账号类型" style="width:70%" size="medium">
                <!-- 可以使用if  根据权限不同 -->
                <el-option v-if="RoleInfo.AccountType == 0 " label="分公司" value="分公司"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0 ||RoleInfo.AccountType == 1||RoleInfo.AccountType == 7" label="销售" value="销售"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0 ||RoleInfo.AccountType == 1" label="审核" value="审核"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0 ||RoleInfo.AccountType == 3||RoleInfo.AccountType == 2" label="企业" value="企业"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0 ||RoleInfo.AccountType == 1 ||RoleInfo.AccountType == 4||RoleInfo.AccountType == 7" label="门店" value="门店"></el-option>
                <el-option v-if="RoleInfo.AccountType == 0 ||RoleInfo.AccountType == 1" label="内勤" value="内勤"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <!-- 分公司表单 -->
        <div v-if="AccountType == 1">
          <branchOfficeForm ref="branchOfficeForm" v-on:CreateAccountPost="CreateAccountPost" />
        </div>
        <div v-else-if="AccountType == 2">
          <salesForm ref="salesForm" v-on:CreateAccountPost="CreateAccountPost" />
        </div>
        <div v-else-if="AccountType == 3">
          <enterpriseFrom ref="enterpriseFrom" v-on:CreateAccountPost="CreateAccountPost" />
        </div>
        <div v-else-if="AccountType == 4">
          <storeFrom ref="storeFrom" v-on:CreateAccountPost="CreateAccountPost" />
        </div>
        <div v-else-if="AccountType == 7">
          <internal ref="internal" v-on:CreateAccountPost="CreateAccountPost1" />
        </div>
        <div v-if="selectiveTypeForm.type=='审核'">
          <el-form :model="selectiveTypeForm1" :rules="selectiveTypeRules1" size="medium" ref="selectiveTypeFormref" label-width="150px">
            <el-form-item label="名称：" prop="AccountName">
              <el-input v-model="selectiveTypeForm1.AccountName" maxlength="30" placeholder="请填写" style="width:70%"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="Mobile">
              <el-input v-model="selectiveTypeForm1.Mobile" placeholder="请填写" style="width:70%"></el-input>
            </el-form-item>
            <el-form-item label="美年ID:" prop="MNId">
              <el-input v-model="selectiveTypeForm1.MNId" placeholder="请填写" style="width:70%"></el-input>
            </el-form-item>
            <el-form-item label="角色：" prop="RoleId">
              <el-radio-group v-model="selectiveTypeForm1.RoleId">
                <el-radio label="6">财务</el-radio>
                <el-radio label="7">内勤</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="openNewDialog = false">取 消</el-button>
          <el-button type="primary" @click="typeForm">立即创建</el-button>
          <!-- <el-button type="primary" @click="submitForm('form')">立即创建</el-button> -->
        </div>
      </el-dialog>
    </div>
    <!-- 编辑账号弹窗 -->
    <div v-if="openEditDialog">
      <el-dialog title="账号信息" :visible.sync="openEditDialog" width="600px">
        <!-- 选择创建账号类型 -->
        <div>
          <el-form :model="selectiveTypeForm" :rules="selectiveTypeRules" ref="selectiveTypeForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="账号类型：" prop="type">
              <el-select v-model="selectiveTypeForm.type" placeholder="请选择账号类型" style="width:70%" size="medium"></el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- 分公司表单 -->
        <div v-if="editObj.AccountType == '1'">
          <branchOfficeForm ref="branchOfficeForm" v-on:editAccountPost="editAccountPost" />
        </div>
        <div v-else-if="editObj.AccountType == '2'">
          <salesForm ref="salesForm" v-on:editAccountPost="editAccountPost" />
        </div>
        <div v-else-if="editObj.AccountType == '3'">
          <enterpriseFrom ref="enterpriseFrom" v-on:editAccountPost="editAccountPost" />
        </div>
        <div v-else-if="editObj.AccountType == '4'">
          <storeFrom ref="storeFrom" v-on:editAccountPost="editAccountPost" />
        </div>
        <div v-else-if="editObj.AccountType == '7'">
          <internal ref="internal" v-on:editAccountPost="editAccountPost" />
        </div>
        <<<<<<< HEAD=======>>>>>>> 制单
          <div v-if="selectiveTypeForm.type=='审核'">
            <el-form :model="selectiveTypeForm1" :rules="selectiveTypeRules1" size="medium" ref="selectiveTypeFormref" label-width="150px">
              <el-form-item label="名称：" prop="AccountName">
                <el-input v-model="selectiveTypeForm1.AccountName" maxlength="30" placeholder="请填写" style="width:70%"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="Mobile">
                <el-input v-model="selectiveTypeForm1.Mobile" placeholder="请填写" style="width:70%"></el-input>
              </el-form-item>
              <el-form-item label="美年ID:" prop="MNId">
                <el-input v-model="selectiveTypeForm1.MNId" placeholder="请填写" style="width:70%"></el-input>
              </el-form-item>
              <el-form-item label="角色：" prop="RoleId">
                <el-radio-group v-model="selectiveTypeForm1.RoleId">
                  <el-radio label="6">财务</el-radio>
                  <el-radio label="7">内勤</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="openEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="typeForm">提交编辑</el-button>
          </div>
      </el-dialog>
    </div>
    <!-- 二维码弹窗 -->
    <div>
      <el-dialog title="二维码" :visible.sync="QRCodeDialog" width="450px" top="5vh" center @close="qrcodeFun(1)">
        <div id="imgcanvas1"></div>
        <div class="saveimage" @click="downs()" v-if="imgUrl">下载保存图片到本地</div>
        <div class="bgbox" id="imgcanvas">
          <div class="bgbox1">
            <div class="text1">{{config.obj.LinkMan}}</div>
            <div class="text2">{{config.obj.AccountName}}</div>
            <div class="accountlist_QR_code">
              <div id="qrcode" ref="qrcode"></div>
              <img class="logoimg" src="../../../src/assets/logo.png" alt />
            </div>
            <div class="text3">用微信扫二维码/长按识别</div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 账号审核弹窗 -->
    <div class="accountlist_ReviewDialog">
      <el-dialog title="审核" :visible.sync="ReviewDialog" width="350px" center>
        <div v-if="ReviewObj.isEnterprise != 1">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="头像">
              <div class="accountlist_ReviewDialog_img">
                <img :src="ReviewObj.companyIcon" alt />
              </div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="姓名">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.name}}</div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="手机号码">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.phone}}</div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="性别">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.sex}}</div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="分公司">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.fromCompany}}</div>
            </el-form-item>
            <el-divider></el-divider>
          </el-form>
        </div>
        <div v-if="ReviewObj.isEnterprise == 1">
          <el-form label-width="110px" label-position="left">
            <el-form-item label="企业logo">
              <div class="accountlist_ReviewDialog_img">
                <img :src="ReviewObj.companyIcon" alt />
              </div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="企业名称">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.company}}</div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="企业规模（人）">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.enterPriseScale}}</div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="管理员信息"></el-form-item>
            <el-divider></el-divider>
            <el-form-item label="管理员姓名">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.name}}</div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="管理员手机">
              <div class="accountlist_ReviewDialog_img">{{ReviewObj.phone}}</div>
            </el-form-item>
            <el-divider></el-divider>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ReviewPassed(2)">审核不通过</el-button>
          <el-button type="primary" @click="ReviewPassed(1)">审核通过</el-button>
        </div>
      </el-dialog>
    </div>

    <el-dialog title="删除" :visible.sync="isdelete" width="400px" center>

      <div style="overflow:hidden; border-bottom: 1px solid #DDDDDD;padding:10px;">
        <div style="width:100px;float:left;text-align: left;">姓名：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 110px); text-align: right;">{{deletemessage.LinkMan}}</div>
      </div>
      <div style="overflow:hidden; border-bottom: 1px solid #DDDDDD;padding:10px;">
        <div style="width:100px;float:left;text-align: left;">手机号码：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 110px); text-align: right;">{{deletemessage.Mobile}}</div>
      </div>

      <div style="overflow:hidden; border-bottom: 1px solid #DDDDDD;padding:10px;">
        <div style="width:100px;float:left;text-align: left;">分公司：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 110px); text-align: right;">{{deletemessage.FromCompany}}</div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isdelete = false">取 消</el-button>
        <el-button type="primary" @click="affirmDelete">删除</el-button>
      </div>
    </el-dialog>

    <!-- 分页----------------------------------------------------------------------------------------------------------------- -->
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>

    <div>
      <el-dialog title="账号角色编辑" :visible.sync="rolebyobj.isshow" width="500px">
        <div v-loading='rolebyobj.loading'>
          <el-form :model="rolebyobj" label-position='right' label-width="60px" size="medium">
            <el-form-item label="角色：">
              <div v-if="roleArr.length != 0">
                <el-radio-group v-model="rolebyobj.RoleId" style="width:100%">
                  <template v-for="v in roleArr" @change="">
                    <el-radio style="line-height:36px" :label=v.id size="medium">{{v.rolename}}</el-radio>
                  </template>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="rolebyobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmUpdateRoleByMobile()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import html2canvas from "html2canvas";
import VueQr from "vue-qr";
import QRCode from "qrcodejs2";
import branchOfficeForm from "./components/branchOfficeForm";
import salesForm from "./components/salesForm";
import enterpriseFrom from "./components/enterpriseFrom";
import storeFrom from "./components/storeFrom";
import internal from "./components/internal";
export default {
  name: "accountlist",
  components: {
    VueQr,
    salesForm,
    branchOfficeForm,
    enterpriseFrom,
    storeFrom,
    internal,
  },
  watch: {
    // 监听弹窗为false时，表单数据和校验清除
    openNewDialog: function (n, o) {
      // console.log(n);
      if (n == false) {
        console.log("初始化数据");
        // 初始化数据
        this.AccountType = 0;
        // this.InitializationType();
      }
    },
    //监听账号类型，不同类型显示不同内容
    "selectiveTypeForm.type": function (n, o) {
      // console.log(n, o);
      switch (n) {
        case "分公司":
          this.AccountType = 1;
          break;
        case "销售":
          this.AccountType = 2;
          break;
        case "企业":
          this.AccountType = 3;
          break;
        case "门店":
          this.AccountType = 4;
          break;
        case "内勤":
          this.AccountType = 7;
          break;
        default:
          this.AccountType = "";
          break;
      }
    },
  },
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
      isdelete: false,
      deletemessage: {}, //选择删除的信息

      imgUrl: "",
      // 角色单选框
      roleArr: [],
      rolebyobj: {
        isshow: false,
        RoleId: "",
        loading: false,
      },
      config: {
        obj: "",
        value: "https://www.baidu.com", //显示的值、跳转的地址
        imagePath: require("../../../src/assets/logo.png"), //中间logo的地址
      },
      // 查询参数
      queryType: "",
      queryName: "",
      queryPhone: "",
      queryStatus: "",
      //监听账号类型，不同类型显示不同内容 v-if="AccountType == 1"则显示分公司
      AccountType: 0, //账号类型 0运营 1分公司 2销售 3企业 4门店
      RoleInfoAccountType: "",
      //账号类型表单数据
      selectiveTypeForm: {
        type: "", //账号类型 0运营 1分公司 2销售 3企业 4门店
      },
      //账号类型表单规则
      selectiveTypeRules: {
        type: [{ required: true, message: "请选择账号类型", trigger: "blur" }],
      },
      selectiveTypeForm1: {
        AccountName: "",
        AccountType: "",
        Mobile: "",
        MNId: "",
        RoleId: "",
      },
      selectiveTypeRules1: {
        AccountName: [
          {
            required: true,
            message: "请填写名称",
            trigger: ["blur", "change"],
          },
        ],
        RoleId: [
          {
            required: true,
            message: "请选择审核角色",
            trigger: ["blur", "change"],
          },
        ],
        Mobile: [
          { validator: phoneNumber, trigger: ["blur", "change"] },
          {
            required: true,
            message: "请输入联系人手机号",
            trigger: ["blur", "change"],
          },
        ],
        MNId: [
          {
            required: true,
            message: "请填写美年ID",
            trigger: ["blur", "change"],
          },
        ],
      },
      // 分页
      page: 1,
      pageSize: 10,
      count: 0,
      // 表格加载
      tableDataLoading: false,
      // Dialog弹窗
      QRCodeDialog: false, //展示二维码
      openNewDialog: false, //新建账号窗口弹窗
      openEditDialog: false, //编辑账号窗口弹窗
      ReviewDialog: false, //审核弹窗
      // 账号列表数据
      tableData: [],
      // 编辑账号数据
      editObj: {},
      // value: "全部",
      currentPage: 1,
      // 审核展示的数据
      ReviewObj: {},
      //勾选的数据
      multipleSelection: [],
    };
  },
  mounted() {
    this.InitializationType();
    this.getAccountList();
  },
  methods: {
    confirmUpdateRoleByMobile() {
      var body = [];
      this.multipleSelection.map((item) => {
        body.push(item.Mobile);
      });
      this.$api
        .post("/account/UpdateRoleByMobile", {
          mobiles: body,
          RoleID: this.rolebyobj.RoleId,
        })
        .then((res) => {
          console.log(res);
          this.rolebyobj.isshow = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateRoleByMobile() {
      if (
        this.multipleSelection &&
        Array.isArray(this.multipleSelection) &&
        this.multipleSelection.length > 0
      ) {
        this.rolebyobj.isshow = true;
        this.rolebyobj.RoleId = "";
        this.rolebyobj.loading = true;
        // 获取角色信息
        this.$api
          .get("/account/pullRoles")
          .then((res) => {
            console.log(res.data);
            this.roleArr = res.data;
            this.rolebyobj.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.msg);
          });
      } else {
        this.$message.error("请勾选需要编辑的账号");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      console.log(this.multipleSelection);
    },
    // 通过个人信息中账号类型,初始化创建账号中的选项
    InitializationType() {
      this.AccountType = 0;
      console.log("通过个人信息中账号类型,初始化创建账号中的选项");
      console.log(this.RoleInfo.AccountType);
      switch (this.RoleInfo.AccountType) {
        case "0":
          console.log(0);
          this.RoleInfoAccountType = "分公司";
          this.AccountType = 1;
          break;
        case "1":
          console.log(1);
          this.RoleInfoAccountType = "销售";
          this.AccountType = 2;
          break;
        case "2":
          console.log(2);
          this.RoleInfoAccountType = "企业";
          this.AccountType = 3;
          break;
        case "3":
          console.log(3);
          this.RoleInfoAccountType = "";
          this.AccountType = 3;
          break;
        case "4":
          console.log(4);
          this.RoleInfoAccountType = "门店";
          this.AccountType = 4;
          break;
        case "7":
          console.log(4);
          this.RoleInfoAccountType = "销售";
          this.AccountType = 2;
          break;

        default:
          break;
      }
    },
    // 查询账号列表
    getAccountList(val) {
      if (val == "搜索") {
        this.page = 1;
      }
      this.tableDataLoading = true;
      var body = {
        accountType: this.queryType,
        accountName: this.queryName,
        mobile: this.queryPhone,
        status: this.queryStatus,
        page: this.page,
        pageSize: this.pageSize,
      };
      this.$api
        .get("/account/pullAll", body)
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.data;
          this.count = res.data.count;

          this.tableDataLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 创建账号请求服务器
    CreateAccountPost(body) {
      console.log("创建账号请求服务器");
      console.log(body);
      this.$api
        .post("/account/pushOne", body)
        .then((res) => {
          console.log(res.data);
          this.$message({
            message: "创建成功！",
            type: "success",
          });
          this.openNewDialog = false;
          this.getAccountList();
          this.InitializationType();
        })
        .catch((err) => {
          console.log("err", err.code, err);
          this.$message.error(err.msg);
        });
    },

    // 创建内勤账号请求服务器
    CreateAccountPost1(body) {
      console.log("创建账号请求服务器");
      console.log(body);
      this.$api
        .post("/account/AddBackManage", body)
        .then((res) => {
          console.log("res.data7777777777777");
          this.$message({
            message: "创建成功！",
            type: "success",
          });
          this.openNewDialog = false;
          this.getAccountList();
          this.InitializationType();
        })
        .catch((err) => {
          console.log("err", err.code, err);
          this.$message.error(err.msg);
        });
    },
    // 编辑账号请求服务器
    editAccountPost(body, index) {
      console.log("编辑账号请求服务器", body);
      this.$api
        .post("/account/update", body)
        .then((res) => {
          console.log(res.data);
          this.$message({
            message: "编辑成功！",
            type: "success",
          });
          this.selectiveTypeForm.type = this.RoleInfoAccountType;
          this.openEditDialog = false;
          this.getAccountList();
          switch (index) {
            case 1:
              console.log(111);
              this.$refs.branchOfficeForm.resetBranchOfficeForm();
              break;
            case 2:
              console.log(222);
              this.$refs.salesForm.resetSalesForm();
              break;
            case 3:
              console.log(333);
              this.$refs.enterpriseFrom.resetEnterpriseFrom();
              break;
            case 4:
              console.log(444);
              this.$refs.storeFrom.resetStoreForm();
              break;
            case 7:
              console.log(777);
              this.$refs.internal.resetSalesForm();
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log("err", err.code, err);
          this.$message.error(err.msg);
        });
    },
    // 删除账户
    deleteAccount(val) {
      // console.log("删除", val.Mobile);
      console.log("删除", val);
      this.isdelete = true;
      this.deletemessage = val;
    },

    affirmDelete() {
      //确认删除
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .del("/account/DeleteByMobile", {
              mobile: this.deletemessage.Mobile,
            })
            .then((res) => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.isdelete = false;
              // 删除成功请求一下角色列表刷新数据
              if (this.tableData.length == 1 && this.page != 1) {
                this.page -= 1;
              }
              this.getAccountList();
            })
            .catch((err) => {
              console.log("err", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //立即创建方法---根据选择类型给创建账号的方法传参
    typeForm() {
      console.log(this.AccountType);
      switch (this.selectiveTypeForm.type) {
        case "分公司":
          this.$refs.branchOfficeForm.submitForm();
          break;
        case "销售":
          this.$refs.salesForm.submitForm();
          break;
        case "企业":
          this.$refs.enterpriseFrom.submitForm();
          break;
        case "门店":
          this.$refs.storeFrom.submitForm();
          break;
        case "内勤":
          this.$refs.internal.submitForm();
        case "审核":
          if (this.openNewDialog) {
            this.$refs.selectiveTypeFormref.validate((valid) => {
              if (valid) {
                console.log(this.selectiveTypeForm1);
                this.selectiveTypeForm1.AccountType = "6";
                this.selectiveTypeForm1.RoleId = this.selectiveTypeForm1.RoleId;
                this.$api
                  .post("/account/pushOne", this.selectiveTypeForm1)
                  .then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                      this.openNewDialog = false;
                      this.getAccountList();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$message.error(err.msg);
                  });
              } else {
                console.log("error submit!!");
                return false;
              }
            });
          }
          if (this.openEditDialog) {
            this.$refs.selectiveTypeFormref.validate((valid) => {
              if (valid) {
                console.log(this.selectiveTypeForm1);
                this.selectiveTypeForm1.AccountType = "6";
                this.selectiveTypeForm1.RoleId = this.selectiveTypeForm1.RoleId;
                this.$api
                  .post("/account/update", this.selectiveTypeForm1)
                  .then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                      console.log(res);
                      this.openEditDialog = false;
                      this.getAccountList();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$message.error(err.msg);
                  });
              } else {
                console.log("error submit!!");
                return false;
              }
            });
          }
        // this.$refs.storeFrom.submitForm();

        case "内勤":
          this.$refs.internal.submitForm();
          break;
        default:
          break;
      }
    },
    //打开新增账号弹窗
    openNewAccount() {
      this.InitializationType();
      this.selectiveTypeForm.type = this.RoleInfoAccountType; //账号类型
      var body = "";
      this.$store.commit("setEditObj", body);

      this.selectiveTypeForm1.AccountName = "";
      this.selectiveTypeForm1.AccountType = "";
      this.selectiveTypeForm1.Mobile = "";
      this.selectiveTypeForm1.MNId = "";
      this.selectiveTypeForm1.RoleId = "";

      this.openNewDialog = true;
    },
    //打开编辑账号弹窗
    editAccount(val) {
      console.log(val);
      this.$store.commit("setEditObj", val);
      this.editObj = val;
      switch (val.AccountType) {
        case "1":
          this.selectiveTypeForm.type = "分公司";
          break;
        case "2":
          this.selectiveTypeForm.type = "销售";
          break;
        case "3":
          this.selectiveTypeForm.type = "企业";
          break;
        case "4":
          this.selectiveTypeForm.type = "门店";
          break;
        case "7":
          this.selectiveTypeForm.type = "内勤";
        case "6":
          this.selectiveTypeForm.type = "审核";
          this.selectiveTypeForm1 = val;
          break;
        default:
          break;
      }
      console.log("打开编辑账号弹窗", val);
      this.openEditDialog = true;
    },
    //打开子账号页面
    goSubAccount(val) {
      console.log(val);
      var body = {
        AccountName: val.AccountName,
        AccountType: val.AccountType,
        Id: val.Id,
        LinkMan: val.LinkMan,
        Mobile: val.Mobile,
        Pwd: val.Pwd,
      };
      this.$router.push(
        "/accountmanagement/addaccount?data=" + JSON.stringify(body)
      );
    },
    // 图片转二维码
    qrcodeFun(row) {
      this.config.value = row.QrCode;
      this.config.obj = row;
      if (row != 1) {
        this.QRCodeDialog = true;
        setTimeout(() => {
          var qrcode = new QRCode(this.$refs.qrcode, {
            width: 200,
            height: 200,
            text: row.QrCode, // 二维码地址
            colorDark: "#1B449D",
          });
        }, 1);
        setTimeout(() => {
          html2canvas(document.getElementById("imgcanvas"), {
            allowTaint: true, //允许污染
            taintTest: true, //在渲染前测试图片(没整明白有啥用)
            useCORS: true, //使用跨域(当allowTaint为true时这段代码没什么用)
          }).then((canvas) => {
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
      image.onload = function () {
        var url = that.imgUrl;
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = that.imgUrl;
    },

    // 审核
    handleReview(val) {
      console.log(val);
      console.log(val.Mobile);
      console.log(val.AccountType);
      this.$api
        .post("/staff/getUserInfo", { phone: val.Mobile })
        .then((res) => {
          console.log(res.data);
          console.log("getUserInfo", res.data.userMassage);
          this.ReviewObj = res.data.userMassage;
          // 把账号类型放到这个对象里
          this.ReviewObj.AccountType = val.AccountType;
        })
        .catch((err) => {
          console.log("err", err);
        });
      this.ReviewDialog = true;
    },
    // 审核请求服务器
    ReviewPassed(val) {
      this.$api
        .post("/account/updateStatus", {
          mobile: this.ReviewObj.phone,
          status: JSON.stringify(val),
          accountType: this.ReviewObj.AccountType,
        })
        .then((res) => {
          console.log(res.data);
          this.$message.success("操作成功！");
          this.getAccountList();
          this.ReviewDialog = false;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = 1;
      this.pageSize = val;
      this.getAccountList();
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      console.log(`当前页: ${val}`);
      this.getAccountList();
    },
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("账号列表");
      console.log(temp.rolesList);
      return temp.rolesList;
    },
    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    },
  },
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
.accountlist_QRcode {
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
.accountlist_ReviewDialog {
  .el-form-item {
    margin: 0;
  }
  .el-divider {
    margin: 10px 0;
  }
  .accountlist_ReviewDialog_img {
    float: right;
    img {
      width: 50px;
      height: 50px;
    }
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


