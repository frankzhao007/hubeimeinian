<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
     <el-form :inline="true" :model="seekshopcombo" label-position="right" label-width="120px" size="medium"  style="overflow:hidden;">     
        <el-form-item label="分公司：" v-if="AccountType=='0'">
           <el-select v-model="seekshopcombo.filiale" placeholder style="width:200px" @change="selectModel('1',fromCompanyData,$event)" >
             <el-option v-for="item in fromCompanyData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
     
        </el-form-item>

        <el-form-item label="所属销售：" v-if="AccountType=='0'||AccountType=='1'">
          <el-select v-model="seekshopcombo.itsSales" placeholder style="width:200px"  @change="selectModel('2',fromSaleData,$event)">
             <el-option v-for="item in fromSaleData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：" v-if="AccountType=='0'||AccountType=='1'||AccountType=='2'" >
          <el-select v-model="seekshopcombo.enterpriseName" placeholder style="width:200px"  @change="selectModel('3',companyData,$event)">
            <el-option v-for="item in companyData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
        </el-form-item>
       <el-form-item label="时间范围：">
          <el-date-picker v-model="seekshopcombo.timeHorizon" size="medium" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" >
          </el-date-picker>
        </el-form-item>

        <el-form-item style="float:right">
          <el-button type="primary" @click="search" icon="el-icon-search">搜 索</el-button>
        </el-form-item>
      </el-form>

<!-- 体检情况统计列表 -->
    <div style="overflow:hidden;">
      <div class="title" >体检情况统计</div>   
      <el-table  :data="quantityList" border  style="width: 80%;float:left">

        <el-table-column  label="分公司数量" min-width="120" show-overflow-tooltip v-if="AccountType=='0'">
           <template slot-scope="scope" >
             <div v-if="seekshopcombo1.filiale1==''&&seekshopcombo1.itsSales1==''&&seekshopcombo1.enterpriseName1==''">
               <span style="color: rgb(42, 134, 255); font-size: 16px;">{{scope.row.newBranch}}</span>
               <span style="margin-left:10px">{{scope.row.branch}}</span>
             </div> 
             <div v-else>
               <span style="color: rgb(42, 134, 255); font-size: 16px;">—</span>
               <span style="margin-left:10px">—</span>
             </div>   
           </template>

        </el-table-column>

        <el-table-column  label="销售数量" min-width="120" show-overflow-tooltip v-if="AccountType=='1'||AccountType=='0'">
           <template slot-scope="scope"  >
             <div v-if="seekshopcombo1.itsSales1==''&&seekshopcombo1.enterpriseName1==''">
               <span style="color: rgb(42, 134, 255); font-size: 16px;">{{scope.row.newSell}}</span>
               <span style="margin-left:10px">{{scope.row.sell}}</span>
             </div>
             <div v-else>
               <span style="color: rgb(42, 134, 255); font-size: 16px;">—</span>
               <span style="margin-left:10px">—</span>
             </div>    
           </template>
     
        </el-table-column>

        <el-table-column  label="企业数量" min-width="120" show-overflow-tooltip v-if="AccountType=='2'||AccountType=='1'||AccountType=='0'">
           <template slot-scope="scope"  >
             <div  v-if="seekshopcombo1.enterpriseName1==''" >
               <span style="color: rgb(42, 134, 255); font-size: 16px;">{{scope.row.newEnterprise}}</span>
               <span style="margin-left:10px">{{scope.row.enterprise}}</span>
             </div>
             <div v-else>
               <span style="color: rgb(42, 134, 255); font-size: 16px;">—</span>
               <span style="margin-left:10px">—</span>
             </div>   
           </template>
     
        </el-table-column>
 

        <el-table-column  label="总员工数" min-width="120" show-overflow-tooltip> 
           <template slot-scope="scope">
               <span style="color: rgb(42, 134, 255); font-size: 16px;">{{scope.row.newEmployee}}</span>
               <span style="margin-left:10px">{{scope.row.employee}}</span>
           </template>
        </el-table-column>
        <el-table-column  label="总员工预约数" min-width="120" show-overflow-tooltip> 
            <template slot-scope="scope">
               <span style="color: rgb(42, 134, 255); font-size: 16px;">{{scope.row.newReseNumber}}</span>
               <span style="margin-left:10px">{{scope.row.reseNumber}}</span>
            </template>
        </el-table-column>
        <el-table-column  label="到检人数"  min-width="120" show-overflow-tooltip> 
           <template slot-scope="scope">
               <span style="color: rgb(42, 134, 255); font-size: 16px;">{{scope.row.newcheckNum}}</span>
               <span style="margin-left:10px">{{scope.row.checkNum}}</span>
           </template>
        </el-table-column>     
      </el-table>
    <div class="particulars1" @click="examineDetails">查看详情</div> 
    </div>
<!-- 订单数据统计列表 -->

      <div v-if="AccountType!='3'">
      <div style="margin-top:20px;display: flex; flex-wrap: wrap;justify-content: space-between; align-items: flex-end">   
        <div class="title"  >订单数据统计</div>
        <el-button type="primary" @click="exportForm">导出表格</el-button>
      </div>
      <el-table  :data="tableData" border  style="width: 100%" v-loading="loadings" >
        <el-table-column  prop="Date" label="时间" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column  prop="NewBranch" label="新增分公司数" min-width="100" show-overflow-tooltip v-if="AccountType=='0'"> 
          <template slot-scope="scope">
             <span v-if="seekshopcombo1.filiale1==''&&seekshopcombo1.itsSales1==''&&seekshopcombo1.enterpriseName1==''">{{scope.row.NewBranch}}</span>
             <span v-else>——</span>
          </template>
        </el-table-column>  
        <el-table-column  prop="NewSales" label="新增销售数" min-width="100" show-overflow-tooltip v-if="AccountType=='1'||AccountType=='0'">
          <template slot-scope="scope">
              <span v-if="seekshopcombo1.itsSales1==''&&seekshopcombo1.enterpriseName1==''">{{scope.row.NewSales}}</span>
              <span v-else>——</span>
          </template>
        </el-table-column>
        <el-table-column  prop="NewEnterprise" label="新增企业数" min-width="100" show-overflow-tooltip v-if="AccountType=='2'||AccountType=='1'||AccountType=='0'"> 
          <template slot-scope="scope">
             <span v-if="seekshopcombo1.enterpriseName1==''" >{{scope.row.NewEnterprise}}</span>
             <span v-else>——</span>
          </template>
        </el-table-column>
        <el-table-column  prop="NewEmployee" label="员工注册数" min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="ReservationNumber" label="员工预约数"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="OrderNum" label="下单数"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="OrderAmount" label="下单金额"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="PayNum" label="支付数"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="PaymentAmount" label="支付金额"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="FamilyOrdersNum" label="家属订单数"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="FamilyPaymentAmount" label="家属购买金额"  min-width="120" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="RefundOrder" label="退款订单数"  min-width="100" show-overflow-tooltip>   </el-table-column>
         <el-table-column  prop="RefundAmount" label="退款金额"  min-width="110" show-overflow-tooltip>   </el-table-column>
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
    

 
<!-- 合计 -->
    <el-table  :data="dataSum" border  style="width: 100%;margin-top:20px; box-sizing: border-box;"  :show-header="false"   :cell-style="rowClass"  >
        <el-table-column  min-width="120" show-overflow-tooltip> 合计</el-table-column>
        <el-table-column  prop="BranchSum"  min-width="100" show-overflow-tooltip v-if="AccountType=='0'"> </el-table-column>  
        <el-table-column  prop="SalesSum"  min-width="100" show-overflow-tooltip v-if="AccountType=='1'||AccountType=='0'"> </el-table-column>
        <el-table-column  prop="EnterpriseSum"  min-width="100" show-overflow-tooltip v-if="AccountType=='2'||AccountType=='1'||AccountType=='0'"> </el-table-column>
        <el-table-column  prop="EmployeeSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="ReservationNumberSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="OrderNumSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="OrderAmountSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="PayNumSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="PaymentAmountSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="FamilyOrdersNumSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="FamilyPaymentAmountSum"  min-width="120" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="RefundOrderSum"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="RefundAmountSum"  min-width="110" show-overflow-tooltip>   </el-table-column>
      </el-table>
  </div>
 </div>

</template>
<script>

export default {
  data() {
    return {

      AccountType:"",//账号类型
      userId:"",//角色id
      tableselectenterMeal: {    //分页
        pageindex: 1,
        pagesize: 10,
        total: 0,
    
      },
       seekshopcombo:{
           timeHorizon:"",
           filiale:"",
           itsSales:"",
           enterpriseName:""
       },

 

       seekshopcombo1:{
           filiale1:"",
           itsSales1:"",
           enterpriseName1:""
       },

       tableData:[],//列表
       totallist:[{//合计
         data:"99"
       }],
      
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

       quantityList:[{
         branch:0,//分公司总数
         newBranch:0,//当前分公司总数
         sell:0,//销售总数
         newSell:0,//当前销售总数
         enterprise:0,//企业总数
         newEnterprise:0,//当前企业总数
         employee:0,//员工总数
         newEmployee:0,//当前员工总数
         reseNumber:0,//预约总数
         newReseNumber:0,//当前预约数
         checkNum:0,//到检总数
         newcheckNum:0,//当前到检数  
       }],

       dataSum:[],//合计
       loadings:true,
    };
  },
  components: {
     
  },
  created() {
    this.setpagemsg();
  },

  beforeDestroy() {
    this.copypagemsg();
  },
  mounted(){
    this.getrolemessage()
  },

  
  methods: {  

    
  copypagemsg() { 
    console.log(this.fromSaleData)
      var body = {
      
        timeHorizon:this.seekshopcombo.timeHorizon, 
        filiale:this.seekshopcombo.filiale, 
        itsSales:this.seekshopcombo.itsSales, 
        enterpriseName:this.seekshopcombo.enterpriseName, 

        fromCompanyData:this.fromCompanyData,
        fromSaleData:this.fromSaleData,
        companyData:this.companyData,

        pageindex:this.tableselectenterMeal.pageindex, 
        pagesize:this.tableselectenterMeal.pagesize, 
      };
   
      this.$store.commit("setStatisticsmsg", body);
    },

  setpagemsg() {

     var body = this.$store.getters.getStatisticsmsg;   
           console.log(body.fromSaleData) 
     var arr=[{
            label:"全部",
            value:""
       }]
     this.seekshopcombo.timeHorizon=body.timeHorizon||''
     this.seekshopcombo.filiale=body.filiale||''
     this.seekshopcombo.itsSales=body.itsSales||''
     this.seekshopcombo.enterpriseName=body.enterpriseName||''

     this.fromCompanyData=body.fromCompanyData||arr
     this.fromSaleData=body.fromSaleData||arr
     this.companyData=body.companyData||arr


     this.tableselectenterMeal.pageindex=body.pageindex||1
     this.tableselectenterMeal.pagesize=body.pagesize||10 


  
  },

   search(){//搜索 
     this.tableselectenterMeal.pageindex=1
     this.getmessage()
    },
    getrolemessage() { //获取角色信息 (0运营1分公司2销售3企业)  
      this.$api
        .get("/account/pullRole")
        .then(res => {     
          console.log(res.data.role.FromAccountId)  
          console.log(res.data.User.AccountType)  
          this.userId=res.data.role.FromAccountId
          this.AccountType=res.data.User.AccountType
          this.getmessage()
          if(this.seekshopcombo.filiale==''&&this.seekshopcombo.itsSales==''&&this.seekshopcombo.enterpriseName==''){
               this.getSelectionData(res.data.User.AccountType,res.data.User.AccountName)    
          }
         
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
 
    selectModel(type,datalist,id){



        if(type=="1"){
           this.seekshopcombo.itsSales=""
           this.seekshopcombo.enterpriseName=""
        }else if(type=="2"){
           this.seekshopcombo.enterpriseName=""
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

      //  console.log(this.fromSaleData1)   
          if(type=="1"){
              this.fromSaleData=this.fromSaleData1 
              this.companyData=this.companyData1         
          }else if(type=="2"){
              this.companyData=this.companyData1 
              this.selectModel('1',this.fromCompanyData,this.seekshopcombo.filiale)
              // this.selectModel('1',this.fromCompanyData,$event)
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
          //  console.log(this.fromSaleData1)
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
          // this.selectModel('1',this.fromCompanyData,this.seekshopcombo.filiale)
          // this.selectModel('2',this.fromSaleData,this.seekshopcombo.itsSales)
          // this.selectModel("3",this.companyData,this.seekshopcombo.enterpriseName)
      }); 
    },
    getmessage(){//获取列表
     if (this.seekshopcombo.timeHorizon &&  Array.isArray(this.seekshopcombo.timeHorizon) &&this.seekshopcombo.timeHorizon.length > 1) {
        var orTime1=this.seekshopcombo.timeHorizon[0]
        var orTime2=this.seekshopcombo.timeHorizon[1]
      }else{
        var orTime1=""
        var orTime2=""
      }    
        this.loadings=true
        var body={
          startTime:orTime1,
          endTime:orTime2,
          branchName:this.seekshopcombo.filiale,
          salesName:this.seekshopcombo.itsSales,
          companyName:this.seekshopcombo.enterpriseName,
          userId:this.userId,
          accountType:this.AccountType,
          pageindex:this.tableselectenterMeal.pageindex,
          pagesize:this.tableselectenterMeal.pagesize
       }
        this.$api
        .get("/statisticalData/checkDataReport",body)
        .then(res => {
           console.log(res)
           this.quantityList=[{
             branch:res.data.branch,
             newBranch:res.data.newBranch,
             sell:res.data.sell,
             newSell:res.data.newSell,
             enterprise:res.data.enterprise,
             newEnterprise:res.data.newEnterprise,
             employee:res.data.employee,
             newEmployee:res.data.newEmployee,
             reseNumber:res.data.reseNumber,
             newReseNumber:res.data.newReseNumber,
             checkNum:res.data.checkNum,
             newcheckNum:res.data.newcheckNum,
           }]
           this.tableselectenterMeal.total=res.data.totalNumber
           this.tableData=res.data.orderData||[]

           this.dataSum=[]
           this.dataSum.push(res.data.dataSum)       
           this.loadings=false
          
          this.seekshopcombo1.filiale1=this.seekshopcombo.filiale
          this.seekshopcombo1.itsSales1=this.seekshopcombo.itsSales
          this.seekshopcombo1.enterpriseName1=this.seekshopcombo.enterpriseName



        })
        .catch(err => {
          console.log(err);
           this.loadings=false
        }); 
    },
   exportForm(){//导出表格
    if (this.seekshopcombo.timeHorizon &&  Array.isArray(this.seekshopcombo.timeHorizon) &&this.seekshopcombo.timeHorizon.length > 1) {
        var orTime1=this.seekshopcombo.timeHorizon[0]
        var orTime2=this.seekshopcombo.timeHorizon[1]
      }else{
        var orTime1=""
        var orTime2=""
      }  
     var body={
          startTime:orTime1,
          endTime:orTime2,
          branchName:this.seekshopcombo.filiale,
          salesName:this.seekshopcombo.itsSales,
          companyName:this.seekshopcombo.enterpriseName,
          userId:this.userId,
          accountType:this.AccountType,
          // pageindex:this.tableselectenterMeal.pageindex,
          // pagesize:this.tableselectenterMeal.pagesize
       }
        this.$api
        .get("/statisticalData/orderDataExport",body)
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
    examineDetails(){//查看详情
      this.$router.push(
        "/accountmanagement/staffMessage"
      );
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
    },
     rowClass() {//表格的样式
      return 'background:rgba(4, 102, 250, 0.27);border-right-color:rgba(4, 102, 250, 0.55);'
    },
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
.particulars1{
  width: 100px;
  height: 49px;
  float: left;
  line-height: 49px;
  text-align: center;
  color: rgb(41, 141, 248);
  margin-top: 49px;
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