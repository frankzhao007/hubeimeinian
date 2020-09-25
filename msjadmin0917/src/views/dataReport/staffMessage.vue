<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
      <div style="font-size: 20px; ">
	      <i @click="goback()" class="el-icon-my-back backbtn" ></i>
	    	<span>&nbsp&nbsp&nbsp返回</span>
     </div>
  
     <el-form :inline="true" :model="seekshopcombo" label-position="right" label-width="120px" size="medium"  style="overflow:hidden;margin-top:20px">     
        <el-form-item label="证件号:">
            <el-input v-model="seekshopcombo.identity" placeholder="请填写" style="width:200px" maxlength="30"></el-input>
        </el-form-item>
         <el-form-item label="证件类型:">    
          <el-select v-model="seekshopcombo.documentType"  placeholder style="width:200px" >
            <el-option v-for="item in idtypelist" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
        </el-form-item>
         <el-form-item label="员工姓名:">
            <el-input v-model="seekshopcombo.userName" placeholder="请填写" style="width:200px" maxlength="30"></el-input>
        </el-form-item>
         <el-form-item label="分公司名称:">
          <el-select v-model="seekshopcombo.branchName" @change="selectModel('1',fromCompanyData,$event)"  placeholder style="width:200px" :disabled="AccountType=='3'||AccountType=='2'||AccountType=='1'">
            <el-option v-for="item in fromCompanyData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="销售名称:" >
          <el-select v-model="seekshopcombo.salesName"  @change="selectModel('2',fromSaleData,$event)"  placeholder style="width:200px" :disabled="AccountType=='3'||AccountType=='2'">
            <el-option v-for="item in fromSaleData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
        </el-form-item>
         <el-form-item label="企业名称:">
          <el-select v-model="seekshopcombo.companyName" @change="selectModel('3',companyData,$event)" placeholder style="width:200px" :disabled="AccountType=='3'">
            <el-option v-for="item in companyData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
        </el-form-item>
         <el-form-item label="员工状态:">
          <el-select v-model="seekshopcombo.employeesState" placeholder style="width:200px">
            <el-option label="全部" value="0"></el-option> 
            <el-option label="正常" value="1"></el-option>
            <el-option label="已移除" value="2"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="体检状态:">
          <el-select v-model="seekshopcombo.reStatus" placeholder style="width:200px">
            <el-option label="全部" value=""></el-option> 
            <el-option label="未预约" value="1"></el-option>
            <el-option label="已预约" value="2"></el-option>
            <el-option label="已到检" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间类型：">
          <el-select v-model="seekshopcombo.timeType" placeholder style="width:200px">
            <el-option label="全部" value="0"></el-option> 
            <el-option label="注册时间" value="1"></el-option>
            <el-option label="预约时间" value="2"></el-option>
            <el-option label="到检时间" value="3"></el-option>
          </el-select>
        </el-form-item>
   

        <el-form-item label="时间范围：">
          <el-date-picker v-model="seekshopcombo.times" size="medium" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" >
          </el-date-picker>
        </el-form-item>

        <el-form-item style="float:right">
          <el-button type="primary" @click="search" icon="el-icon-search">搜 索</el-button>
          <el-button type="primary" @click="exportForm">导出表格</el-button>
        </el-form-item>
      </el-form>
<!-- 列表 -->
      <el-table  :data="tableData" border  style="width: 100%" v-loading="loadings">
        <el-table-column  prop="serialNumber" label="序列" min-width="80" show-overflow-tooltip> </el-table-column>
        <el-table-column  prop="sortCompany" label="分公司" min-width="100" show-overflow-tooltip v-if="AccountType!='3'"> </el-table-column>
        <el-table-column  prop="sellerName" label="销售" min-width="100" show-overflow-tooltip  v-if="AccountType!='3'">   </el-table-column>
        <el-table-column  prop="joinEnterprise" label="企业"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="userName" label="员工姓名"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="registerTime" label="注册时间"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="documentType" label="证件类型"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="identity" label="证件号"  min-width="160" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="reSex" label="性别"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="reMarry" label="婚否"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="reStatus" label="体检状态"  min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
             <span v-if="scope.row.reStatus=='2'||scope.row.reStatus=='9'">未预约</span>
             <span v-else-if="scope.row.reStatus=='1'||scope.row.reStatus=='14'">已预约</span>
             <span v-else-if="scope.row.reStatus=='4'||scope.row.reStatus=='5'">已到检</span>
          </template>
        </el-table-column>
        <el-table-column  prop="reTime" label="预约时间"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="reHospital" label="预约分院"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="reservationReportTime" label="到检时间"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="isBinding" label="员工状态"  min-width="100" show-overflow-tooltip>  
           <template slot-scope="scope">
             <span v-if="scope.row.isBinding=='0'">已移除</span>
             <span v-else="scope.row.isBinding=='1'">正常</span>
           </template>
        </el-table-column>
      </el-table>
   
         <!-- 分页 -->
    <div style="height:30px;margin-top:20px;">
      <el-pagination
        style="float:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableselectenterMeal.pageindex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableselectenterMeal.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableselectenterMeal.total"
      ></el-pagination>
    </div>
  </div>

</template>
<script>

export default {
  data() {
    return {
      
      AccountType:"",//账号类型
      userId:"",//角色id

     seekshopcombo:{//搜索的条件
       identity:"",//身份证号
       documentType:"",//证件类型
       userName:"",//用户姓名
       branchName:"",//	分公司的id
       salesName:"",//销售的id
       companyName:"",//企业的id
       reStatus:"",//体检状态
       timeType:"0",//时间类型
       times:[],//时间范围
       employeesState:"0",//员工状态
     },
     idtypelist:[{//分公司选项
            label:"全部",
            value:""
       },{
            label:"身份证",
            value:"身份证"
       },{
            label:"护照",
            value:"护照"
       },{
            label:"港澳台通行证",
            value:"港澳台通行证"
       }
       
       ],



       fromCompanyData1:[{//分公司选项
            label:"全部",
            value:""
       }],
       fromSaleData1:[{//销售选项
            label:"全部",
            value:""
       }],
       companyData1:[{//企业选项
            label:"全部",
            value:""
       }],


      fromCompanyData:[{//分公司选项
            label:"全部",
            value:""
       }],
       fromSaleData:[{//销售选项
            label:"全部",
            value:""
       }],
       companyData:[{//企业选项
            label:"全部",
            value:""
       }],
      tableselectenterMeal: {    //分页
        pageindex: 1,
        pagesize: 10,
        total: 0,
      },

      tableData:[],//列表
      loadings:false,
  
    };
  },
  components: {
     
  },
   mounted(){
    this.getrolemessage()
  },
  methods: {
  
    exportForm(){//导出
      if (this.seekshopcombo.times &&  Array.isArray(this.seekshopcombo.times) &this.seekshopcombo.times.length > 1) {
        var orTime1=this.seekshopcombo.times[0]
        var orTime2=this.seekshopcombo.times[1]
      }else{
        var orTime1=""
        var orTime2=""
      } 
      var body={
          userId:this.userId,
          companyName:this.seekshopcombo.companyName,
          salesName:this.seekshopcombo.salesName,
          branchName:this.seekshopcombo.branchName,
          reStatus:this.conversion(this.seekshopcombo.reStatus),
          identity:this.seekshopcombo.identity,
          userName:this.seekshopcombo.userName,
          documentType:this.seekshopcombo.documentType,
          startTime:orTime1,
          endTime:orTime2,
          timeType:this.seekshopcombo.timeType,
          accountType:this.AccountType,
          employeesState:this.seekshopcombo.employeesState,
       }
        this.$api
        .post("/statisticalData/healthReportExport",body)
        .then(res => {
          let a = document.createElement("a");
          a.href = res.data; // href链接指向的地址
          a.download = res.data; // 下载的的名称
          a.click(); // 触发a标签的单击事件
        })
        .catch(err => {
          console.log(err);
        }); 
    },
    goback() {//返回
      this.$router.go(-1);
    },
    search(){//搜索
       console.log(this.seekshopcombo.times)
       this.tableselectenterMeal.pageindex=1
       this.getmessage()
    },
   

    getrolemessage() { //获取角色信息 (0运营1分公司2销售3企业)     
      this.$api
        .get("/account/pullRole")
        .then(res => {    
          console.log(res)
          if(res.data.User.AccountType=='1'){
             this.seekshopcombo.branchName=res.data.User.Id   
          }else if(res.data.User.AccountType=='2'){
             this.seekshopcombo.branchName=res.data.User.FromCompany   
             this.seekshopcombo.salesName=res.data.User.Id
          }else if(res.data.User.AccountType=='3'){
            this.seekshopcombo.branchName=res.data.User.FromCompany   
            this.seekshopcombo.salesName=res.data.User.FromSale
            this.seekshopcombo.companyName=res.data.User.Id
            
          }
          this.userId=res.data.role.FromAccountId
          this.AccountType=res.data.User.AccountType
          this.getmessage()
          this.getSelectionData(res.data.User.AccountType,res.data.User.AccountName)

   
        
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    selectModel(type,datalist,id){
          console.log(type+'|||'+id)  
        if(type=="1"){
           this.seekshopcombo.salesName=""
           this.seekshopcombo.companyName=""
        }else if(type=="2"){
           this.seekshopcombo.companyName=""
        }
        if(id!=""){
          let obj = {};
          obj = datalist.find((item)=>{//model就是上面的数据源
            return item.value === id;//筛选出匹配数据
          });
          var names=obj.label
    
          this.getSelectionData1(type,names)
          console.log(names)   
        }else{


          if(type=="1"){
              this.fromSaleData=this.fromSaleData1 
              this.companyData=this.companyData1         
          }else if(type=="2"){
              this.companyData=this.companyData1      
              this.selectModel('1',this.fromCompanyData,this.seekshopcombo.branchName)
          }


        }
   
    },

  getSelectionData1(types,names){//获取选项 
     var body={
          AccountType:types,
          AccountName:names,
      }
      this.$api.get("/account/pullOrg2", body).then(res => {  
        if(types=='1'){
          this.fromSaleData=[{
            label:"全部",
            value:""
          }]
           this.companyData=[{
            label:"全部",
            value:""
           }]
        }else if(types=='2'){
          this.companyData=[{
            label:"全部",
            value:""
           }]
        }
      for(var i=0;i<res.data.length;i++){

        if(res.data[i].AccountType=="2"&&types=='1'){
        
          res.data[i].Name.map((item,index)=>{
           var arr={
             label:item,
             value:res.data[i].ID[index]
           }
           this.fromSaleData.push(arr)      
         })
        }else if(res.data[i].AccountType=="3"&&(types=='1'||types=='2')){
         
          res.data[i].Name.map((item,index)=>{
           var arr={
             label:item,
             value:res.data[i].ID[index]
           }
           this.companyData.push(arr)      
         })
             console.log(this.companyData)
        }
         
      }

      }); 
    },

    
    getSelectionData(types,names){//获取选项
   
     var body={
          AccountType:types,
          AccountName:names,
      }
      this.$api.get("/account/pullOrg2", body).then(res => {  
      
      for(var i=0;i<res.data.length;i++){  
        if(res.data[i].AccountType=="1"&&(types=='0'||types=='1')){
           this.fromCompanyData=[{
            label:"全部",
            value:""
          }]
           this.fromCompanyData1=[{
            label:"全部",
            value:""
          }]
          res.data[i].Name.map((item,index)=>{
           var arr={
             label:item,
             value:res.data[i].ID[index]
           }
           this.fromCompanyData.push(arr)  
           this.fromCompanyData1.push(arr)       
         })
     
        }else if(res.data[i].AccountType=="2"&&(types=='0'||types=='1'||types=='2')){
          this.fromSaleData=[{
            label:"全部",
            value:""
          }]
           this.fromSaleData1=[{
            label:"全部",
            value:""
          }]
          res.data[i].Name.map((item,index)=>{
           var arr={
             label:item,
             value:res.data[i].ID[index]
           }
           this.fromSaleData.push(arr)    
           this.fromSaleData1.push(arr)    
         })
        }else if(res.data[i].AccountType=="3"&&(types=='0'||types=='1'||types=='2'||types=='3')){
          this.companyData=[{
            label:"全部",
            value:""
          }]
           this.companyData1=[{
            label:"全部",
            value:""
          }]
          res.data[i].Name.map((item,index)=>{
           var arr={
             label:item,
             value:res.data[i].ID[index]
           }
           this.companyData.push(arr) 
            this.companyData1.push(arr)          
         })
      
        }
         
      }
      }); 
    },
    conversion(val){//转化
        if(val=="1"){
           return [2,9]
        }else if(val=="2"){
           return [1,14]
        }else if(val=="3"){
           return [4,5]
        }else{
           return []
        }
    },
    getmessage(){//获取列表
      if (this.seekshopcombo.times &&  Array.isArray(this.seekshopcombo.times) &&this.seekshopcombo.times.length > 1) {
        var orTime1=this.seekshopcombo.times[0]
        var orTime2=this.seekshopcombo.times[1]
      }else{
        var orTime1=""
        var orTime2=""
      }  
      this.loadings=true
        var body={
          userId:this.userId,
          companyName:this.seekshopcombo.companyName,
          salesName:this.seekshopcombo.salesName,
          branchName:this.seekshopcombo.branchName,
          reStatus:this.conversion(this.seekshopcombo.reStatus),
          identity:this.seekshopcombo.identity,
          userName:this.seekshopcombo.userName,
          startTime:orTime1,
          endTime:orTime2,
          timeType:this.seekshopcombo.timeType,
          accountType:this.AccountType,
          employeesState:this.seekshopcombo.employeesState,
          documentType:this.seekshopcombo.documentType,
          page:this.tableselectenterMeal.pageindex,
          pageSize:this.tableselectenterMeal.pagesize,
       }
        this.$api
        .post("/statisticalData/healthReport",body)
        .then(res => {
          this.tableselectenterMeal.total=res.data.count
          this.tableData=res.data.healthForms||[] 
          this.loadings=false
        })
        .catch(err => {
          console.log(err);
          this.loadings=false
        }); 
      },

     handleSizeChange(val) {
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;
      this.getmessage();

      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      this.getmessage();
      console.log(`当前页: ${val}`);
    }
  },
  watch: {}
};
</script>
<style>

.title{
  width: 200px;
  height: 30px;
  background: #dddddd;
  line-height: 30px;
  padding-left: 20px;
  box-sizing: border-box;
 
  /* margin-left: 35px; */
}

body .el-table th.gutter {
    display: table-cell !important
}
.particulars{
  width: 100px;
  height: 45px;
  float: left;
  line-height: 45px;
  text-align: center;
  color: rgb(41, 141, 248);
  margin-top: 46px;
  cursor: pointer; 
}
.amountTo{
  width: 100%;
  border: 1px solid #dddddd;
  height: 45px;
  box-sizing: border-box;
  margin-top: 20px; 

  /* overflow-x: auto; */
  display: flex; 
}
.using{
  /* float: left; */
  height: 45px;
  box-sizing: border-box;
  line-height: 45px;
  text-align: center;
  border-right: 1px solid #dddddd;
  
}


</style>