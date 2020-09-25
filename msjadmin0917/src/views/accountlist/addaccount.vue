<template>
  <div class="app-container">
    <div class="goodsmsgtitle">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp账号设置</span>
    </div>
    <div v-loading="addaccount_loading" style="margin-top:20px">
      <!-- 查询表单 -->
      <div>
        <div class="inquire">
          <el-row>
            <el-col :span="5">
              <div class="grid_lable">账号名称：</div>
              <div class="grid_lable addaccount_lable">{{subaccountObj.AccountName}}</div>
            </el-col>
            <el-col :span="5">
              <div class="grid_lable">密码：</div>
              <div class="grid_lable addaccount_lable">{{subaccountObj.Pwd}}</div>
            </el-col>
            <el-col :span="5">
              <div class="grid_lable">绑定手机号：</div>
              <div class="grid_lable addaccount_lable">{{subaccountObj.Mobile}}</div>
            </el-col>
            <el-col :span="4">
            </el-col>
            <el-col :span="9" style="text-align: right;"  v-if="subaccountObj.AccountType!='7'">
              <div style="text-align: right;">
                <el-button :disabled="!Clickable.subAccount" type="primary" size="medium" icon="el-icon-plus" @click="AddaSubAccount">新增子账号</el-button>
                <!-- <el-button size="medium" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="medium" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="addaccount_divider">
        <el-divider></el-divider>
      </div>
      <!-- 表格 -->
      <div v-if="subaccountObj.AccountType!='7'">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="AccountName" label="账号名称">
          </el-table-column>
          <el-table-column prop="Mobile" label="手机号">
          </el-table-column>
          <el-table-column prop="Pwd" label="密码">
          </el-table-column>
          <el-table-column prop="CreateTime" label="创建时间" width="210">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="160">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteAccount(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div>

      </div>
      <!-- 新增子账号弹窗 -->
      <div>
        <el-dialog title="账号信息" :visible.sync="dialogFormVisible" width="800px">
          <div>
            <el-form :model="subAccountForm" :rules="subAccountRules" ref="subAccountForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="用户名：" prop="AccountName">
                <el-input placeholder="请输入内容" v-model="subAccountForm.AccountName" maxlength="15" show-word-limit clearable size="medium" style="width:70%;">
                </el-input>

              </el-form-item>
              <el-form-item label="手机号：" prop="Mobile">

                <el-input type="age" v-model.number="subAccountForm.Mobile" placeholder="请输入手机号" minlength="11" maxlength="11" style="width:70%" size="medium" autocomplete="off"></el-input>         
                </el-input>

              </el-form-item>
              <el-form-item label="密码：" prop="Pwd">
                <el-input placeholder="请输入内容" v-model="subAccountForm.Pwd" clearable size="medium" style="width:70%;">
                </el-input>
              </el-form-item>

            <template v-if="isNewOrEdit" >  
              <div v-loading="loadingDialog">
                <el-form-item label="角色：" prop="RoleId">
                  <div v-if="roleArr.length != 0">
                    <el-radio-group v-model="subAccountForm.RoleId" style="width:80%;">
                      <span class="addaccount_radio" v-for="v in roleArr" @change="Permission(v)">
                        <el-radio :label=v.id size="medium">{{v.rolename}}</el-radio>
                      </span>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <div v-if="roleArr.length != 0 &&subAccountForm.RoleId!=''">
                  <el-divider class="addaccount_Info_divider" content-position="left">权限信息</el-divider>
                  <div class="addaccount_Info" v-for="(v,index) in PermissionInfo">
                    <div>{{v.management}}</div>
                    <div class="addaccount_Info_listName" v-for="item in v.tempArr">
                      <span>{{item.listName}}：</span>
                      <span class="addaccount_Info_items" v-for="items in item.list">{{items}}</span>
                    </div>
                  </div>
                </div>
               
                <div v-if="roleArr.length == 0 &&subAccountForm.RoleId==''">
                  <el-divider class="addaccount_Info_divider" content-position="center">暂无角色请先创建角色</el-divider>
                </div>
              </div>
            </template> 
            </el-form>
           </div>
          
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="isNewOrEdit" type="primary" @click="submitForm('subAccountForm')">立即创建</el-button>
            <el-button v-else type="primary" @click="submitForm('subAccountForm')">确认编辑</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addaccount",
  components: {},
  watch: {
    dialogFormVisible: function(n, o) {
      if (n == false) {
        console.log("初始化表单");
        this.resetForm("subAccountForm");
      }
    }
  },
  data() {
    var phoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var telStr = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!telStr.test(value)) {
          callback(new Error("手机号码输入不规范"));
        } else {
          callback();
        }
      }
    };
    var Pass = (rule, value, callback) => {
      var str = /(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d])/;
      if (!str.test(value)) {
        callback(new Error("密码必须包含数字和字母"));
      }
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error("不能输入中文"));
      }
      if (/^ +| +$/g.test(value)) {
        callback(new Error("不能输入空格"));
      }
      if (value === "") {
        callback(new Error("请输入密码"));
        return;
      }
      if (value.length < 8) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      if (value.length > 20) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      callback();
    };
    return {

      AccountType:"",

      // loading
      addaccount_loading: false,
      loadingDialog: false,
      // 新建还是编辑
      isNewOrEdit: true,
      // 角色单选框
      roleArr: [],
      //账号类型表单数据
      subAccountForm: {
        AccountName: "",
        Mobile: "",
        Pwd: "",
        RoleId: ""
      },
      //账号类型表单规则
      subAccountRules: {
        AccountName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        Pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: Pass, trigger: "blur" }
        ],
        RoleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        Mobile: [
          { validator: phoneNumber, trigger: "blur" },
          { required: true, message: "请输入联系人手机号", trigger: "blur" },
          { type: "number", message: "手机号必须为数字值", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      //
      input: "",
      // 传过来的数据
      subaccountObj: {},
      // 子账号列表
      tableData: [],
      // 编辑子账号数据
      editObj: {},
      // 权限信息
      PermissionInfo: []
    };
  },
  created() {
    console.log(this.$route.query.data);
    var temp = this.$route.query.data;
    this.subaccountObj = JSON.parse(temp);
    console.log(this.subaccountObj);
    console.log(this.RoleInfo);
    // 初始化数据
    this.init();
  },
  mounted() {
    
  },
  methods: {
    // 初始化数据
    init() {
      // 子账号列表
      this.getPullSons();
    },
    // 打开新建子账号弹窗 初始化数据
    AddaSubAccount() {
      this.loadingDialog = true;
      this.subAccountForm = {
        AccountName: "",
        Mobile: "",
        Pwd: "",
        RoleId: ""
      };
      // 获取角色信息
      this.getAccountPullRoles();
      this.isNewOrEdit = true;
      this.dialogFormVisible = true;
    },
    // 创建子账号---请求服务器
    accountPushSon() {
      var body = {
        AccountName: this.subAccountForm.AccountName,
        Mobile: JSON.stringify(this.subAccountForm.Mobile),
        Pwd: this.subAccountForm.Pwd,
        RoleId: this.subAccountForm.RoleId,
        ID: this.subaccountObj.Id
      };
      console.log(body);

      this.$api
        .post("/account/pushSon", body)
        .then(res => {
          console.log(res.data);
          this.$message({
            message: "子账号创建成功！",
            type: "success"
          });
          this.getPullSons();
          this.dialogFormVisible = false;
        })
        .catch(err => {
          console.log("err", err.code, err);
          this.$message.error(err.msg);
        });
    },
    // 编辑子账号
    handleEdit(val) {
      this.addaccount_loading = true;
      console.log(val);
      this.editObj = val;
      // 获取角色信息;
      this.$api
        .get("/account/pullRoles", {
          id: val.Id
        })
        .then(res => {
          console.log(res.data);
          this.roleArr = res.data;
          this.dialogFormVisible = true;
          this.isNewOrEdit = false;
          this.subAccountForm = {
            AccountName: val.AccountName,
            Mobile: Number(val.Mobile),
            Pwd: val.Pwd,
            RoleId: ""
          };
          for (let i = 0; i < this.roleArr.length; i++) {
            if (this.roleArr[i].id == val.RoleId) {
              this.subAccountForm.RoleId = val.RoleId;
              this.ProcessingPermission(
                JSON.stringify(this.roleArr[i].routes.Edits)
              );
              console.log("找到对应角色");
              break;
            } else {
              console.log("无对应角色");
              // if (i == this.roleArr.length - 1) {
              //   this.$message({
              //     message: "没有找到对应角色!",
              //     type: "error",
              //     customClass: "zZindex"
              //   });
              // }
              // this.subAccountForm.RoleId = "";

              this.subAccountForm.RoleId = val.Pwd
            }
          }
          this.addaccount_loading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.addaccount_loading = false;
        });
    },
    // 编辑子账号---请求服务器
    EditSubAccount() {
      var temp = JSON.stringify(this.editObj);
      var editObjtemp = JSON.parse(temp);
      editObjtemp.AccountName = this.subAccountForm.AccountName;
      editObjtemp.Mobile = JSON.stringify(this.subAccountForm.Mobile);
      editObjtemp.Pwd = this.subAccountForm.Pwd;
      editObjtemp.RoleId = this.subAccountForm.RoleId;
      editObjtemp.ID = this.subaccountObj.Id;
      console.log("编辑子账号数据", editObjtemp);
      this.$api
        .post("/account/update", editObjtemp)
        .then(res => {
          console.log(res.data);
          this.$message.success("编辑成功！");
          this.dialogFormVisible = false;
          this.isNewOrEdit = true;
          this.subAccountForm = {
            AccountName: "",
            Mobile: "",
            Pwd: "",
            RoleId: ""
          };
          this.getPullSons();
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.msg);
        });
    },
    // 删除子账号
    deleteAccount(val) {
      console.log("删除", val.Mobile);
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .del("/account/DeleteByMobile", {
              mobile: val.Mobile
            })
            .then(res => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 删除成功请求一下角色列表刷新数据
              this.getPullSons();
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 子账号列表
    getPullSons() {
      var body = {
        id: this.subaccountObj.Id
      };
      this.$api
        .get("/account/pullSons", body)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 创建子账号表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          console.log(this.isNewOrEdit);
          if (this.isNewOrEdit) {
            this.accountPushSon();
          } else {
            this.EditSubAccount();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 点击获取账号信息
    Permission(val) {
      console.log(val);
      this.ProcessingPermission(JSON.stringify(val.routes.Edits));
    },
    // 处理权限信息
    ProcessingPermission(data) {
      // console.log(data);
      var temp = JSON.parse(data);
      console.log(temp);
      var tempPush = [];
      var managementArr = [];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].management) {
          managementArr.push({
            management: temp[i].management,
            managementName: temp[i].managementName,
            tempArr: []
          });
        }
        if (temp[i].selected == true || temp[i].indeterminate == true) {
          tempPush.push({
            managementName: temp[i].managementName,
            listName: temp[i].listName,
            rolesList: temp[i].rolesList,
            list: []
          });
        }
      }
      console.log(tempPush);
      for (let i = 0; i < tempPush.length; i++) {
        for (let j = 0; j < tempPush[i].rolesList.length; j++) {
          if (tempPush[i].rolesList[j].selected == true) {
            tempPush[i].list.push(tempPush[i].rolesList[j].roleName);
          }
        }
      }
      var Control = [];
      for (let i = 0; i < tempPush.length; i++) {
        for (let j = 0; j < managementArr.length; j++) {
          if (tempPush[i].managementName == managementArr[j].managementName) {
            tempPush[i].management = managementArr[j].management;
            continue;
          }
        }
      }
      console.log("Control", Control);
      for (let n = 0; n < managementArr.length; n++) {
        for (let i = 0; i < tempPush.length; i++) {
          if (managementArr[n].managementName == tempPush[i].managementName) {
            managementArr[n].tempArr.push(tempPush[i]);
          }
        }
      }
      for (let i = managementArr.length - 1; i >= 0; i--) {
        if (managementArr[i].tempArr.length == 0) {
          managementArr.splice(i, 1);
        }
      }
      this.PermissionInfo = managementArr;
      // console.log(JSON.stringify(this.PermissionInfo));
      // console.log(managementArr);
      console.log("managementArr", managementArr);
    },
    // 获取角色信息
    getAccountPullRoles() {
      this.$api
        .get("/account/pullRoles", {
          id: this.subaccountObj.Id
        })
        .then(res => {
          console.log(res.data);
          this.roleArr = res.data;
          console.log(this.roleArr);
          this.loadingDialog = false;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  computed: {
    Clickable() {
      var temp = this.$store.getters.getRoles("账号列表");
      console.log("vuex中获取按钮权限");
      return temp.rolesList;
    },
    RoleInfo() {
      console.log("vuex中获取个人信息");
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss">
.goodsmsgtitle {
  font-size: 20px;
}
.addaccount_lable {
  text-align: left;
  width: 100px;
}
.addaccount_divider {
  .el-divider {
    margin-bottom: 25px;
  }
}
.addaccount_radio {
  line-height: 50px;
  padding-left: 8px;
}
.addaccount_Info {
  padding-left: 120px;
  div {
    padding-top: 10px;
  }
}
.addaccount_Info_listName {
  padding-top: 10px;
}
.addaccount_Info_items {
  padding-left: 10px;
}
.zZindex {
  z-index: 3000 !important;
}
</style>
