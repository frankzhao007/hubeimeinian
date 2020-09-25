<template>



  <!-- 配置分销套餐 -->
  <div style="margin:20px">
     <div>
        <div >
          <h3>短信模板库</h3>
          <el-divider></el-divider>
        </div>
      </div>

     <el-form :inline="true"  label-position="right" label-width="120px" size="medium"  style="overflow:hidden;margin-top:20px">     
        <el-form-item style="float:right">  
          <el-button type="primary" @click="addtemplate" icon="el-icon-plus">新增模板</el-button>      
        </el-form-item>
      </el-form>
<!-- 列表 -->
      <el-table  :data="tableData"   style="width: 100%" v-loading="loadings">
        <el-table-column  prop="Title" label="标题" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column  prop="smsContent" label="短信内容" min-width="100" show-overflow-tooltip > </el-table-column>
        <el-table-column  prop="smsId" label="短信ID" min-width="100" show-overflow-tooltip  >   </el-table-column>
        <el-table-column  prop="node" label="节点"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="creatTime" label="创建时间"  min-width="100" show-overflow-tooltip>   </el-table-column>     
        <el-table-column  prop="remark" label="备注"  min-width="100" show-overflow-tooltip>   </el-table-column>
        <el-table-column  prop="ifDefault" label="是否默认"  min-width="120" show-overflow-tooltip> 
         <template slot-scope="scope" >
           <el-switch disabled v-model="scope.row.ifDefault" active-color="#13ce66"  inactive-color="#DDDDDD" active-value="true" inactive-value="flase"></el-switch>
         </template> 
        </el-table-column>
        <el-table-column label="操作"  min-width="160" show-overflow-tooltip> 
          <template slot-scope="scope">
             <el-button  @click="compilenote(scope.row.SmsTemplateId)" type="text" size="medium" >编辑</el-button>
             <el-button  @click="deletenote(scope.row.SmsTemplateId)"  type="text" size="medium" >删除</el-button>
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
    this.getmessage()
  },

   beforeDestroy() {
      var body = {   
        pageindex:this.tableselectenterMeal.pageindex,
        pagesize: this.tableselectenterMeal.pagesize
      };
      this.$store.commit("setNotemsg", body);
    },
    //赋值页面数据
    created() {
    
      var body = this.$store.getters.getNotemsg;
      this.tableselectenterMeal.pageindex = body.pageindex || 1;
      this.tableselectenterMeal.pagesize = body.pagesize || 10;
      console.log(body);
    },
  methods: {


    getmessage(){
     var body = {
        each:this.tableselectenterMeal.pagesize,
        page:this.tableselectenterMeal.pageindex,
      };
      this.$api
        .post("/smsTemplate/searchSmsTemplate", body)
        .then(res => {
          console.log(res.data);
          this.tableselectenterMeal.total=res.data.count
          this.tableData=res.data.data
        })
        .catch(err => {
          console.log("err", err);
         
        });
    },
    
    deletenote(val){

     this.$confirm('此操作将永久删除短信模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        var body = {
          smsTemplateId:val,
        };
        this.$api
          .post("/sms/deleteGongGongSmsTemplate", body)
          .then(res => {
            this.getmessage()
            console.log(res.data);     
         })
        .catch(err => {
          console.log("err", err);
         
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },

    compilenote(val){//编辑
       this.$router.push("/enterprisemanagement/addNote?smsTemplateId=" + val);     
    },

    addtemplate(){//新增
       this.$router.push("/enterprisemanagement/addNote");
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




