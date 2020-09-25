<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
      <div style="font-size: 20px; ">
	      <i @click="goback()" class="el-icon-my-back backbtn" ></i>
	    	<span>&nbsp&nbsp&nbsp返回</span>
     </div>


    <el-tabs v-model="activeName" style="margin-top:20px" @tab-click="handleClick" >
      <el-tab-pane label="已选择模板" name="selected"></el-tab-pane>
      <el-tab-pane label="公共模板库" name="commonality"></el-tab-pane>
    </el-tabs>
<!-- 列表 -->
      <el-table  :data="tableData"   style="width: 100%;margin-top:20px" v-loading="loadings">
        <el-table-column  prop="Title" label="标题" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column  prop="smsContent" label="短信内容" min-width="100" show-overflow-tooltip > </el-table-column>
        <el-table-column  prop="smsId" label="短信ID" min-width="100" show-overflow-tooltip  >   </el-table-column>
        <el-table-column  prop="node" label="节点"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="creatTime" label="创建时间"  min-width="100" show-overflow-tooltip>   </el-table-column>     
        <el-table-column  prop="remark" label="备注"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="ifDefault" label="是否默认"  min-width="120" show-overflow-tooltip> 
         <template slot-scope="scope" >
           <el-switch disabled v-model="scope.row.ifDefault" active-color="#409eff"  inactive-color="#DDDDDD" active-value="true" inactive-value="flase"></el-switch>
         </template> 
        </el-table-column>
        <el-table-column label="操作"  min-width="160"   show-overflow-tooltip > 
          <template slot-scope="scope">
             <el-button  @click="looknote(scope.row)" type="text" size="medium" >查看</el-button>
             <el-button  v-if="showbutton(scope.row.SmsAuthority)&&activeName=='selected'" @click="deletenote(scope.row)"  type="text" size="medium" >删除</el-button>
             <el-button  v-if="showbutton(scope.row.SmsAuthority)&&activeName=='commonality'" @click="selectnote(scope.row)"  type="text" size="medium" >选择</el-button>
          </template>
        </el-table-column> 
      </el-table>



     <el-dialog title="短信模板信息" :visible.sync="isshop" top="10vh" width="600px" >
      <div style="overflow:hidden;font-size:18px">
        <div style="width:150px;float:left;text-align: right;">标题：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 220px)">{{selectmessage.Title}}</div>
      </div>
      <div style="overflow:hidden;margin-top:10px;font-size:18px" v-if="AccountType=='0'">
        <div style="width:150px;float:left;text-align: right;">权限：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 220px)">
           <span v-for="(item,index) in selectmessage.SmsAuthority" :key="item">
              <span v-if="item=='0'">运营</span>
              <span v-if="item=='2'">销售</span>
              <span v-if="index<selectmessage.SmsAuthority.length-1">+</span>
           </span>
        </div>
      </div>
       <div style="overflow:hidden;margin-top:10px;font-size:18px">
        <div style="width:150px;float:left;text-align: right;">短信ID：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 220px)">{{selectmessage.smsId}}</div>
      </div>
      <div style="overflow:hidden;margin-top:10px;font-size:18px">
        <div style="width:150px;float:left;text-align: right;">短信内容：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 220px)">{{selectmessage.smsContent}}</div>
      </div>
       <div style="overflow:hidden;margin-top:10px;font-size:18px">
        <div style="width:150px;float:left;text-align: right;">节点：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 220px)">{{selectmessage.node}}</div>
      </div>
       <div style="overflow:hidden;margin-top:10px;font-size:18px">
        <div style="width:150px;float:left;text-align: right;">备注：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 220px)">{{selectmessage.remark}}</div>
      </div>
       <div style="overflow:hidden;margin-top:10px;font-size:18px">
         <div style="width:150px;float:left;text-align: right;">是否默认：</div>
         <el-switch disabled v-model="selectmessage.ifDefault" style="margin-left:10px;" active-color="#409eff"  inactive-color="#DDDDDD" active-value="true" inactive-value="flase"></el-switch>
      </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isshop = false">取 消</el-button>
          <el-button type="primary" @click="isshop=false">确 定</el-button>
        </div>
      </el-dialog>



   
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
    AccountType:"",//权限
    activeName:"selected",
    firmid:"",
    isshop:false,
    selectmessage:{
       
    },
     
     
      tableselectenterMeal: {    //分页
        pageindex: 1,
        pagesize: 10,
        total: 0,
      },

      tableData:[{
        data:""
      }],//列表
      loadings:false,
  
    };
  },
  components: {
     
  },
   mounted(){
     this.firmid=this.$route.query.firmid
     this.getmessage1()
     this.getrolemessage()
  
  },
  methods: {

  showbutton(list){
   
    
    if(list){
     for(var i=0;i<list.length;i++){
      if(list[i]==this.AccountType){
        return true
      }else if(i==list.length-1){
        return false
      }
    }
    }
    
  },

   deletenote(val){
   
    this.$confirm('是否删除该短信模板？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

     var body = {
         qiYeId:val.QiYeId
      };
      this.$api
        .post("/smsTemplate/deleteSmsTemplate", body)
        .then(res => { 
          // this.tableselectenterMeal.pageindex=1
          this.getmessage1()     
          console.log(res.data);       
        })
        .catch(err => {
          console.log("err", err)     
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });

      
   },

     getrolemessage() { //获取角色信息 (0运营1分公司2销售3企业)     
       this.$api
        .get("/account/pullRole")
        .then(res => {    
        
          this.AccountType=res.data.User.AccountType 
            console.log(this.AccountType)     
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
   getmessage(){
     this.loadings=true
     var body = {
        each:this.tableselectenterMeal.pagesize,
        page:this.tableselectenterMeal.pageindex,
      };
      this.$api
        .post("/smsTemplate/searchSmsTemplate", body)
        .then(res => {
          this.loadings=false
          console.log(res.data);
          this.tableselectenterMeal.total=res.data.count
          this.tableData=res.data.data
        })
        .catch(err => {
          console.log("err", err);
         
        });
    },

    getmessage1(){
     this.loadings=true
     var body = {
        id:this.firmid,
        each:this.tableselectenterMeal.pagesize,
        page:this.tableselectenterMeal.pageindex,
      };
      this.$api
        .post("/qrCode/queryAllQiYeMsg", body)
        .then(res => {
          this.loadings=false
          this.tableselectenterMeal.total=res.data.count
          this.tableData=res.data.data
        })
        .catch(err => {
          console.log("err", err);
         
        });
    },

    handleClick(){
        if(this.activeName=="selected"){
           this.tableselectenterMeal.pageindex=1     
           this.getmessage1()
        }else{
          this.tableselectenterMeal.pageindex=1
          this.getmessage()
        }
        console.log(this.activeName);
    },

   looknote(val){
       console.log(val)
       this.selectmessage=val
       this.isshop=true
   },
   selectnote(val){
       
     this.$confirm('是否选择该短信模板？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        var body = { 
          node:val.node,
          id:this.firmid,
          smsTemplateId:val.SmsTemplateId
        };
        this.$api
          .post("/smsTemplate/enterpriseChooseSms", body)
          .then(res => {
            this.getmessage()
            this.$message({
              message: '选择成功',
              type: 'success'
            });

         })
        .catch(err => {
            this.$message.error(err.msg);
          console.log("err", err);
         
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
   },
  

   
  
 
    goback() {//返回
      this.$router.go(-1);
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
<style lang="scss" scoped>



.addimage{
   width:100px;
   height:100px;
   box-sizing: border-box;
   border:2px dashed #DDDDDD;
   float:left;
   border-radius:4px;
   display:flex; 
   justify-content:center;
   align-items:center;
   cursor: pointer; 
  

}


</style>




