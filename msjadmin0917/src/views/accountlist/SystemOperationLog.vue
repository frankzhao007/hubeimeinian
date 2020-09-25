<template>
  <!-- 账号列表----------------------------------------------------------------------------------------------------------------- -->
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
           
          <el-col :span="7">
            <div class="grid_lable">操作账号名称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入操作账号名称" v-model="table.acount" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid_lable_phone">操作账号手机号：</div>
            <div class="grid_content">
              <el-input placeholder="请输入操作账号手机号" v-model="table.phone" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">操作者ID：</div>
            <div class="grid_content">
              <el-input placeholder="请输入操作者ID" v-model="table.id" clearable size="medium" style="width:100%;">
              </el-input> 
            </div>
          </el-col>
        </el-row>
        <div class="inquire">
        <el-row style="margin-top: 20px;">
        	<el-col :span="6">
            <div class="grid_lable">操作模块：</div>
            <div class="grid_content">
              <el-input placeholder="请输入操作模块" v-model="table.type" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          
          <el-col :span="6">
            <div class="grid_lable">操作内容：</div>
            <div class="grid_content">
              <el-input placeholder="请输入操作内容" v-model="table.content" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          
          <el-col :span="2.5" style="margin-top: 6px;">
          <div class="grid_lable">操作时间段：</div>
        </el-col>
        <el-col :span="7">
          <div >
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="table.time1" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-col>
        	  
        </el-row>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="sousuo('搜索')">搜索</el-button>
        <!--<el-button :disabled="!Clickable.add" v-if="RoleInfo.AccountType != 3&&RoleInfo.AccountType != 5" class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="openNewAccount()">新增账号</el-button>-->
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%" v-loading="tableDataLoading">
        <el-table-column prop="operatorTime" label="操作时间" width="210">
          
        </el-table-column>
        <el-table-column prop="accountName" label="操作账号名称" width="210">
        </el-table-column>
        <el-table-column prop="handlerPhone" label="操作账号手机" width="210">
        </el-table-column>
        <el-table-column prop="handlerId" label="操作者ID" width="250">
        </el-table-column>
        <el-table-column prop="operateModule" label="操作模块" width="310">
        </el-table-column>
        <el-table-column prop="content" label="操作内容" fixed="right" width="310">
         
        </el-table-column>
         
         
        
      </el-table>
    </div>
     
    
   
    
     
    <!-- 分页----------------------------------------------------------------------------------------------------------------- -->
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size=pageSize layout="total, sizes, prev, pager, next, jumper" :total=count>
      </el-pagination>
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
export default {
  name: "accountlist",
  components: {
    VueQr,
    salesForm,
    branchOfficeForm,
    enterpriseFrom,
    storeFrom
  },
  watch: {
    // 监听弹窗为false时，表单数据和校验清除
    openNewDialog: function(n, o) {
      // console.log(n);
      if (n == false) {
        console.log("初始化数据");
        // 初始化数据
        this.AccountType = 0;
        // this.InitializationType();
      }
    },
    //监听账号类型，不同类型显示不同内容
    "selectiveTypeForm.type": function(n, o) {
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
        default:
          break;
      }
    }
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
    	table:{
    		acount:"",
    		phone:'',
    		id:'',
    		type:'',
    		content:'',
    		time1: [],
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
      ReviewObj: {}
    };
  },
  mounted() {
//  this.InitializationType();
    this.getRizhi();
  },
  methods: {
  
    //获取操作日志
    getRizhi(val) {
    	var that=this;
      if (val == "搜索") {
        this.page = 1;
      }
      var startTime='';
    	var endTime='';
    	if(that.table.time1.length>0){
    		startTime=that.table.time1[0];
    		endTime=that.table.time1[1];
    	}
      this.tableDataLoading = true;
      var body = {
        accountName: that.table.acount,
        handlerPhone: that.table.phone,
        handlerId: that.table.id,
        operateModule: that.table.type,
        content: that.table.content,
        startTime: startTime,
        endTime: endTime,
        page: that.page,
        each: that.pageSize
      };
      this.$api
        .post("/operate/getOperatingRecord", body)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.recordList
          this.count = res.data.count;

          this.tableDataLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索功能
    sousuo(val) {
    	var that=this;
//  	console.log(that.table.time1)
    	var startTime='';
    	var endTime='';
    	if(that.table.time1){
    		if(that.table.time1.length>0){
    		startTime=that.table.time1[0];
    		endTime=that.table.time1[1];
    	}
    	}
    	
      if (val == "搜索") {
        this.page = 1;
      }
      this.tableDataLoading = true;
      var body = {
        accountName: that.table.acount,
        handlerPhone: that.table.phone,
        handlerId: that.table.id,
        operateModule: that.table.type,
        content: that.table.content,
        startTime: startTime,
        endTime: endTime,
        page: that.page,
        each: that.pageSize
      };
      this.$api
        .post("/operate/getOperatingRecord", body)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.recordList;
          this.count = res.data.count;

          this.tableDataLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    
     
 
  
 
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = 1;
      this.pageSize = val;
      this.sousuo();
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      console.log(`当前页: ${val}`);
      this.sousuo();
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("账号列表");
      console.log("vuex中获取按钮权限");
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
.grid_lable_phone{
	  float: left;
    width: 29%;
    min-width: 100px;
    text-align: right;
    min-height: 36px;
    line-height: 36px;
	
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
</style>



