<template>
  <div class="app-container">
    <div class="inquire">
      <el-row>
        <el-col :span="2.5" style="margin-top: 4px;">
          <div class="cityred">
            *
            <span>权益名称：</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid_content">
            <el-input
              placeholder="请输入内容"
              v-model="commodityName"
              clearable
              size="medium"
              style="width:100%;"
              maxlength="15"
            ></el-input>
          </div>
        </el-col>
         
        <el-col :span="2.5" style="float: right;">
          <el-button class="grid_button" type="primary" size="medium" @click="Toadd()">新增权益</el-button>
        </el-col>
        <el-col :span="2.5" style="float: right;margin-right: 30px;">
          <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="sousuo()">搜索</el-button>
        </el-col>
       
        
      </el-row>
    </div>

    <!-- 信息列表 -->
    <div style="margin-top: 20px;">
      <el-table
        :data="quanyiListData"
        height="600"
        :header-cell-style="{background:'#F2F2F2',color:'#353535'}"
        style="width: 100%;"
        v-loading="goodsloading"
      >
        <el-table-column prop="giftName" label="权益名称" width="150"></el-table-column>
        <el-table-column prop="giftCode" label="权益代码"></el-table-column>
        <el-table-column prop="deductibleAmount" label="抵扣金额"></el-table-column>
        <el-table-column prop="count" label="发放数量"></el-table-column>
        <el-table-column prop="remainCount" label="剩余数量"></el-table-column>
        <el-table-column  label="可约套餐">
          <template slot-scope="scope">
            <el-button size="small" type="text"  @click="tokan(scope.row.package)">查看</el-button>
            <el-dialog title="可约套餐" :visible.sync="dialogTableVisible" style="width:200">
	          <div v-for="item in list">
		           <p>{{item.packageName}}</p>	
		        </div>
	    </el-dialog>   
          </template>
        </el-table-column>
        <el-table-column prop="days" label="有效期限"></el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope" fixed="right">
            <el-button size="small" type="text" @click="bianji(scope.row.giftCode)">编辑</el-button>
            <el-button v-if="scope.row.count>scope.row.remainCount" size="small"  type="text"  style="cursor:default;color: #808080;">删除</el-button>
            <el-button v-else size="small"  type="text" @click="del(scope.row.giftCode,scope.row.count,scope.row.remainCount)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
	
    </div>

    <div class="GMfenlelan">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sumpage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "packagelist",
  components: {},
  watch: {},
  data() {
    return {
      dialogTableVisible: false,  
      time1: "",
      //分页栏属性
      pageNum: 10,
      currentPage: 1, //当前页
      pagesize: 3, //单页条数
      sumpage: 10, //总条数
      goodsloading: false,
      commodityName: "", //商品名字
      quanyiValue: "全部", //商品类型
      list:[],  //点击查看数组
      quanyiListData: [],  //信息列表
      show:1   //button按钮是否禁用
    };
  },
  created() {
    //调用默认数据
    this.GetallInfo();
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(454545455);
      console.log(`每页 ${val} 条`);
      var that = this;
      this.currentPage = 1;
      that.pageNum = val;
      console.log(that.isSousuo);
      if (that.isSousuo == true) {
        that.sousuo(1);
      } else {
        that.GetallInfo(1)
      }
    },
    handleCurrentChange(val) {
      var that = this;
      this.currentPage = val;
      console.log(val);
      if (that.isSousuo) {
        console.log("sousuo");
        that.sousuo(val);
      } else {
        console.log("getProductinfo");
        that. GetallInfo(val);
      }

    },

    //默认请求数据
    GetallInfo() {
      var that = this;
      var body = {
        giftName: that.commodityName, //商品名字
        page: that.currentPage, //当前页
        pagesize: that.pageNum //单页条数
      };
      this.$api
        .get("weibao/QueryGiftList", body)
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            this.quanyiListData = res.data.data;
            this.sumpage = res.data.count;
           
	       }
        })
        .catch(res => {
          this.goodsloading = false;
        });
    },

    //点击查看重新赋值
    tokan(list){
       console.log(list)
       this.list=list
       this.dialogTableVisible=true
    },

    //模糊查询
    sousuo(){
      this.GetallInfo() 
   },

   //删除
    del(x,y,z){
        console.log(x,y,z)
        if(y>z)return this.$message.error('该权益不支持删除');
        this.$confirm('确定要删除权益, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             var body={
	       giftCode:x   
            }
	    this.$api
		.del("weibao/DeleteGift", body)
		.then(res => {
		console.log(res);
		if (res.code == "200") {
		    this.GetallInfo() 
		    this.$message({
			type: 'success',
			message: '删除成功！'
			});
		    }
		})
		.catch(res => {
		    console.log(res)
		});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
      
    //点击编辑跳转权益新增
    bianji(val){
        this.$router.push({
          path:'/vbmanager/interestAdd',
          query:{val}
        })   
    },

    //点击新增权益跳转权益新增
    Toadd(){
        this.$router.push("/vbmanager/interestAdd")
    }
  },
  computed: {}
};
</script>

<style>
.GMfenlelan {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

 

</style>