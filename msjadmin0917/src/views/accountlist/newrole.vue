<template>
  <div class="app-container">
    <!-- 表单 -->
    <div>
      <div class="newrole_title"> <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i> 角色基本信息</div>
      <el-form :model="newRoleForm" :rules="newRoleRules" ref="newRoleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="newRoleForm.name" maxlength="15" show-word-limit style="width:50%" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" prop="description">
          <el-input type="textarea" v-model="newRoleForm.description" maxlength="30" show-word-limit style="width:50%" size="medium"></el-input>
        </el-form-item>
        <div class="newrole_title">权限</div>

        <div class="newrole_form-item">
          <el-button type="primary" @click="allselectbtn">全选</el-button>
          <!-- CheckBox组件 -->
          <!-- <div class="newrole_checkbox" v-for="(partition,partitionIndex) in permission" :key="partitionIndex" v-if="partition.management != '账号管理'&&partition.listName != '角色列表'&&partition.listName != '城市列表'&&partition.listName != '门店列表'"> -->
          <div class="newrole_checkbox" v-for="(partition,partitionIndex) in permission" :key="partitionIndex">
            <div class="newrole_checkbox_title" v-if="partition.management">{{partition.management.split('-')[0]}}</div>
            <div class="newrole_checkbox_box">
              <!-- <span :class="  ==2||partitionIndex==3?'':'newrole_checkbox_box_title'">{{partition.listName}}：</span> -->
              <div class="newrole_checkbox_box_title">{{partition.listName.split('-')[0]}}：</div>
              <div style="width: calc(100% - 150px);float:left;">
                <el-checkbox :indeterminate="partition.indeterminate" v-model="partition.selected" @change="handleCheckedCountryAllChange(partitionIndex,partition.partitionId,$event)" :key="partitionIndex">{{ partition.listAll}}</el-checkbox>
                <el-checkbox v-for="rolesList in partition.rolesList" v-model="rolesList.selected" @change="handleCheckedCountryChange(partitionIndex,rolesList.id,partition.partitionId,$event)" :label="rolesList" :key="rolesList.id">{{rolesList.roleName}}</el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="newrole_button">
      <!-- <el-button @click="check">check</el-button> -->
      <el-button @click="$router.back(-1);">取 消</el-button>
      <el-button v-if="this.$route.query.id" type="primary" @click="submitForm('newRoleForm')">提交编辑</el-button>
      <el-button v-else type="primary" @click="submitForm('newRoleForm')">立即创建</el-button>
    </div>

  </div>
</template>
<script>
import operation from "../../utils/operation";
import localRouter from "../../utils/localRouter";
import { filterOperation } from "../../utils/filterOperation";
import { concatEdits } from "../../utils/concatEdits";
export default {
  name: "newrole",
  components: {},
  props: {},
  data() {
    return {
      isall: false,
      // CheckBox权限数据
      permission: [],
      router: [],
      //新建角色Dialog
      roleDialog: false,
      //新建角色表单
      newRoleForm: {
        name: "",
        description: ""
      },
      //新建角色表单规则
      newRoleRules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "change" }
        ],
        description: [
          { required: true, message: "请填写角色描述", trigger: "change" }
        ]
      },

      // 权限上传数据
      Routes: [], //路由表
      Urls: [], //接口表
      Edits: [], //编辑数组
      Checkbox: [], //未编辑数组
      Roles: [], //按钮数组
      RoleList: [], //给前端过滤路由数据

      // 接口获取角色信息
      RoleObj: {},
      // 编辑中获取到的该角色数据
      trueCheckbox: "",
      falseCheckbox: "",
      routerTemp: ""
    };
  },
  computed: {},
  mounted() {
    console.log(this.permission);
    // this.vuexAssignment();
    this.isNewEdit();
    var a = filterOperation();
    console.log("a :", a);
  },
  methods: {
    // 判断是新建还是编辑 获取权限勾选数据，和路由数据
    isNewEdit() {
      if (this.$route.query.id) {
        console.log("编辑");
        var body = {
          id: this.$route.query.id
        };
        this.$api
          .get("/role/pullOne", body)
          .then(res => {
            console.log("**************************");
            console.log(res.data);
            this.RoleObj = res.data;
            this.newRoleForm.name = res.data.RoleName;
            this.newRoleForm.description = res.data.Desc;
            // 获取permission  router
            // this.router = this.routerTemp;

//             this.permission = concatEdits(res.data.Routes.Edits);
            //编辑数据
//          this.permission = res.data.Routes.Edits;
            //本地数据
               this.permission = JSON.parse(JSON.stringify(filterOperation()));
            this.router = JSON.parse(
              JSON.stringify(localRouter.OperationRouter)
            );
          })
          .catch(err => {
            console.log("err", err);
            this.$message.error(err.msg);
          });
      } else {
        console.log("新增");
        // this.permission = this.trueCheckbox; //trueCheckbox编辑中获取到的该角色数据
        // this.router = this.routerTemp; //routerTemp编辑中获取到的该角色数据
        // this.permission = JSON.parse(JSON.stringify(operation.Operation)); //本地渲染checkbox权限数据

        this.router = JSON.parse(JSON.stringify(localRouter.OperationRouter));
        this.permission = JSON.parse(JSON.stringify(filterOperation()));
        console.log("this.permission :", this.permission);
      }
    },
    vuexAssignment() {
      // var Checkbox = this.$store.getters.getCheckbox;
      // var CheckboxTemp = JSON.stringify(Checkbox);
      // this.trueCheckbox = JSON.parse(CheckboxTemp);
      // console.log("this.trueCheckbox", this.trueCheckbox);
      // var EditsArr = this.$store.getters.getEdits;
      // var EditsArrTemp = JSON.stringify(EditsArr);
      // this.falseCheckbox = JSON.parse(EditsArrTemp);
      // console.log("this.falseCheckbox", this.falseCheckbox);
      // var Routes = this.$store.getters.getRoutes;
      // this.routerTemp = JSON.parse(Routes);
      // console.log("this.routerTemp", this.routerTemp);
      // this.isNewEdit();
      // console.log("Routes :", Routes);
    },
    // 创建角色 或 编辑角色
    RolePost() {
      if (this.$route.query.id) {
        console.log("编辑角色");
        this.editRolePost();
      } else {
        console.log("新增角色");
        this.newRolePost();
      }
    },
    // 创建角色请求
    newRolePost() {
      var body = {
        RoleName: this.newRoleForm.name, //角色名
        Desc: this.newRoleForm.description, //角色描述
        Routes: {
          Routes: this.Routes, //路由表
          Edits: this.Edits, //编辑数组
          Roles: this.Roles, //按钮数组
          // Checkbox: this.Checkbox,
          RoleList: this.RoleList
        },
        Urls: this.Urls //接口表
      };
      console.log("body*********************************");
      console.log("路由表---", body.Routes.Routes);
      console.log("接口表---", body.Urls);
      console.log("编辑数组---", body.Routes.Edits);
      console.log("按钮数组---", body.Routes.Roles);
      console.log("false数组---", body.Routes.Checkbox);
      this.$api
        .post("/role/pushOne", body)
        .then(res => {
          // 执行某些操作
          console.log(res);
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑角色请求
    editRolePost() {
      var body = {
        Id: this.RoleObj.Id, //	角色id
        CreateTime: this.RoleObj.CreateTime, //	创建时间
        FromAccountId: this.RoleObj.FromAccountId, //所属账号id
        RoleName: this.newRoleForm.name, //角色名
        Desc: this.newRoleForm.description, //角色描述
        Routes: {
          Routes: this.Routes, //路由表
          Edits: this.Edits, //编辑数组
          Roles: this.Roles, //按钮数组
          // Checkbox: this.Checkbox,
          RoleList: this.RoleList
        },
        Urls: this.Urls //接口表
      };
      console.log("body*********************************");
      console.log("路由表---", body.Routes.Routes);
      console.log("接口表---", body.Urls);
      console.log("编辑数组---", body.Routes.Edits);
      console.log("按钮数组---", body.Routes.Roles);
      console.log("false数组---", body.Routes.Checkbox);
      this.$api
        .post("/role/update", body)
        .then(res => {
          // 执行某些操作
          console.log(res);
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 表单验证，通过后调用check()处理数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.check();
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //处理选中的数据，转化为 Routes，Urls，Edits，Roles路由表接口表编辑数组按钮数组
    check() {
      // console.log(this.permission);
      var temp = JSON.stringify(this.permission);
      var arr = JSON.parse(temp);
      for (let i = 0; i < arr.length; i++) {
        for (let j = arr[i].rolesList.length - 1; j >= 0; j--) {
          // for (let j = 0; j < arr[i].rolesList.length; j++) {
          if (arr[i].rolesList[j].selected == false) {
            console.log(arr[i].rolesList[j].selected);
            arr[i].rolesList.splice(j, 1);
          }
        }
      }
      var urlArr = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].rolesList.length; j++) {
          urlArr.push(arr[i].rolesList[j].url);
        }
      }

      // 发给服务器  url  控制接口权限
      this.Urls = urlArr;
      console.log("urlArr", urlArr);
      // 需要发给服务器  编辑使用
      this.Edits = this.permission;

      var tempEdits = JSON.stringify(this.Edits);
      var Checkbox = JSON.parse(tempEdits);
      for (let i = 0; i < Checkbox.length; i++) {
        Checkbox[i].selected = false;
        Checkbox[i].isIndeterminate = false;
        for (let j = 0; j < Checkbox[i].rolesList.length; j++) {
          Checkbox[i].rolesList[j].selected = false;
        }
      }
      this.Checkbox = Checkbox;
      console.log(this.Checkbox);
      console.log("需要发给服务器  编辑使用", this.Edits);
      var arrTemp = JSON.stringify(arr);
      var routerFunArr = JSON.parse(arrTemp);
      for (let i = routerFunArr.length - 1; i >= 0; i--) {
        if (routerFunArr[i].rolesList.length == 0) {
          routerFunArr.splice(i, 1);
        }
      }
      var tempRoles = JSON.stringify(this.permission);
      var RolesArr = JSON.parse(tempRoles);
      // var tempRoles = JSON.stringify(routerFunArr);
      // var RolesArr = JSON.parse(tempRoles);
      console.log(RolesArr);
      var newRolesArr = [];
      for (let i = 0; i < RolesArr.length; i++) {
        if (RolesArr[i].rolesList[0].selected) {
          newRolesArr.push({
            listName: RolesArr[i].listName,
            rolesList: {}
          });
        }
      }
      console.log(newRolesArr);
      for (let i = 0; i < newRolesArr.length; i++) {
        for (let j = 0; j < RolesArr.length; j++) {
          if (newRolesArr[i].listName == RolesArr[j].listName) {
            console.log("newRolesArr[i].listName", newRolesArr[i].listName);
            console.log("RolesArr[j].listName", RolesArr[j].listName);
            for (let k = 0; k < RolesArr[j].rolesList.length; k++) {
              if (RolesArr[j].rolesList[k].selected == true) {
                // console.log(RolesArr[i].rolesList[k].verifyName);
                newRolesArr[i].rolesList[
                  RolesArr[j].rolesList[k].verifyName
                ] = true;
              } else {
                newRolesArr[i].rolesList[
                  RolesArr[j].rolesList[k].verifyName
                ] = false;
              }
            }
          }
        }
      }
      this.Roles = newRolesArr;
      console.log("权限数据", newRolesArr);
      if (urlArr.length == "") {
        this.$message.error("未勾选任一权限！");
      } else {
        console.log("**********1-----------------1111111111");
        console.log("routerFunArr :", routerFunArr);
        this.RoleList = JSON.parse(JSON.stringify(routerFunArr));
        this.routerFun(routerFunArr);
      }
    },
    routerFun(arr) {
      console.log(arr);
      var temp = JSON.stringify(this.router);
      var router = JSON.parse(temp);
      console.log(arr.length);
      console.log(router.length);
      var routerList = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < router.length; j++) {
          if (arr[i].managementName == router[j].name) {
            routerList.push(router[j]);
          }
        }
      }
      console.log(JSON.stringify(routerList));
      // 去重
      routerList = routerList.filter(function(element, index, self) {
        return self.indexOf(element) === index;
      });
      //过滤后获得   管理权限
      console.log("routerList", JSON.stringify(routerList));
      var luyou = JSON.stringify(routerList);
      console.log("路由数据", JSON.parse(luyou));
      // 先取出mark
      var arrMark = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].rolesList.length; j++) {
          arrMark.push(arr[i].rolesList[j].mark);
        }
      }
      // 去重
      arrMark = arrMark.filter(function(element, index, self) {
        return self.indexOf(element) === index;
      });
      console.log(arrMark);
      // 先把云端数据改为0  避免所有数据都为1
      for (let i = 0; i < routerList.length; i++) {
        for (let j = 0; j < routerList[i].children.length; j++) {
          console.log(routerList[i].children[j].meta.title);
          console.log(routerList[i].children[j].meta.pickid);
          routerList[i].children[j].meta.pickid = 0;
        }
      }
      for (let i = 0; i < arrMark.length; i++) {
        for (let j = 0; j < routerList.length; j++) {
          for (let k = routerList[j].children.length - 1; k >= 0; k--) {
            if (arrMark[i] == routerList[j].children[k].meta.mark) {
              console.log("相等", routerList[j].children[k].meta.mark);
              routerList[j].children[k].meta.pickid = 1;
              console.log(routerList[j].children[k].meta.title);
              console.log(routerList[j].children[k].meta.pickid);
            } else {
              // console.log("不等", routerList[j].children[k].meta.mark);
              // console.log(routerList[j].children[k].meta.pickid);
            }
          }
        }
      }

      // console.log("12421412412412421412", routerList);
      for (let i = 0; i < routerList.length; i++) {
        for (let j = routerList[i].children.length - 1; j >= 0; j--) {
          console.log(routerList[i].children[j].meta.pickid);
          if (routerList[i].children[j].meta.pickid != 1) {
            console.log(routerList[i].children[j]);
            routerList[i].children.splice(j, 1);
          }
        }
      }
      console.log(routerList);
      // 整理路由表第一项，默认路由
      for (let i = 0; i < routerList.length; i++) {
      	console.log(routerList[i].name)
      	console.log(routerList[i].children[0].name)
        routerList[i].redirect =
          "/" + routerList[i].name + "/" + routerList[i].children[0].name;
      }
      routerList.unshift({
        path: "/",
        component: "Layout",
        redirect: routerList[0].redirect
      });
      this.Routes = routerList;
      console.log("路由数据", routerList);
      // console.log(JSON.stringify(routerList));
      this.RolePost();
    },
    allselectbtn() {
      console.log(this.permission);
      this.permission.map(item => {
        item.rolesList.map(temp => {
          return (temp.selected = !this.isall);
        });
        return (item.selected = !this.isall);
      });
      this.isall = !this.isall;
    },
    //一级change事件
    handleCheckedCountryAllChange(index, topId, e) {
      console.log("一级change事件", index, e);
      this.permission[index].selected = e; //二级勾选后，子级全部勾选或者取消
      this.permission[index].indeterminate = false; //去掉二级不确定状态
      var childrenArray = this.permission[index].rolesList;
      if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].selected = e;
    },
    //二级change事件
    handleCheckedCountryChange(topIndex, sonId, topId, e) {
      console.log("二级change事件", topIndex, sonId, topId, e);
      var childrenArray = this.permission[topIndex].rolesList;

      console.log(childrenArray);
      for (let i = 1; i < childrenArray.length; i++) {
        if (childrenArray[i].selected == true) {
          childrenArray[0].selected = true;
        }
      }
      var tickCount = 0,
        unTickCount = 0,
        len = childrenArray.length;
      for (var i = 0; i < len; i++) {
        if (sonId == childrenArray[i].id) childrenArray[i].selected = e;
        if (childrenArray[i].selected == true) tickCount++;
        if (childrenArray[i].selected == false) unTickCount++;
      }
      if (tickCount == len) {
        //二级级全勾选
        this.permission[topIndex].selected = true;
        this.permission[topIndex].indeterminate = false;
      } else if (unTickCount == len) {
        //二级级全不勾选
        this.permission[topIndex].selected = false;
        this.permission[topIndex].indeterminate = false;
      } else {
        this.permission[topIndex].selected = false;
        this.permission[topIndex].indeterminate = true; //添加二级不确定状态
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss">
.newrole_title {
  font-size: 20px;
  margin-bottom: 20px;
  padding-left: 30px;
}
.newrole_form-item {
  padding-left: 40px;
  color: #606266;
  .newrole_checkbox {
    padding-top: 15px;
    .newrole_checkbox_title {
      padding-bottom: 15px;
      color: #000;
      font-size: 15px;
    }
    .newrole_checkbox_box {
      // padding-left: 20px;
      width: 100%;
      overflow: hidden;
      .newrole_checkbox_box_title {
        width: 150px;
        float: left;
      }
    }
  }
}
.newrole_button {
  padding: 30px 40px;
}
</style>
