<template>
	<div>
	  <div style="min-width: 1200px;">
		<el-row style="margin-top:20px">
			 

			<el-col :span="2.5" style="margin-top: 4px;">
				<div class="grid_lable">套餐名称：</div>
			</el-col>
			<el-col :span="4">
				<div class="grid_content">
					<el-input placeholder="请输入内容" v-model="commodityName" clearable size="medium" style="width:100%;"></el-input>
				</div>
			</el-col>
			 
			<el-col :span="2.5" style="float: right;margin-right:20px">
				<el-button class="grid_button" type="primary" size="medium" @click="addCombo">新增套餐</el-button>
			</el-col>
			<el-col :span="2.5" style="float: right;margin-right: 30px;">
				<el-button class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="search">搜索</el-button>
			</el-col>
		</el-row>
		</div>	
     
		<!-- 信息列表 -->
		<div style="margin: 20px;min-width: 1200px;" >
			<el-table :data="quanyiListData" height="600" :header-cell-style="{background:'#F2F2F2',color:'#353535'}" style="width: 100%;" v-loading="goodsloading">
				<el-table-column prop="mealName" label="套餐名称" width="150"></el-table-column>
				<el-table-column prop="quanyidaima" label="可约商品">
					<template slot-scope="scope" >
						<el-button size="small" type="text" @click="lookShop(scope.row)">查看</el-button>
					</template>
				 </el-table-column>
				 
				<el-table-column prop="handle" label="操作">
					<template slot-scope="scope" fixed="right">
						<el-button size="small" type="text" @click="compile(scope.row)">编辑</el-button>
						<el-button size="small" type="text" @click="deleteCombo(scope.row)">删除</el-button>
					</template>
					
				</el-table-column>
			</el-table>
		</div>

		<div class="GMfenlelan">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pageQuantity" layout="total, sizes, prev, pager, next, jumper" :total="allQuantity"></el-pagination>
		</div>

     <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allQuantity"
      ></el-pagination> -->

     <el-dialog title="可约商品" :visible.sync="isshop " width="600px" :modal-append-to-body="false" >
      <div style="overflow: auto;max-height:500px">
        <el-col v-for="item in shoparray" :key="item.id"  style="float:left;width:100%；margin-top:8px">
          <span>{{item}}</span>
        </el-col>
      </div > 
       <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="isshop = false">取 消</el-button>
        <el-button type="primary" @click="isshop = false">确 定</el-button>
       </span> -->
     </el-dialog>

	</div>

</template>

<script>
	export default {
		name: "packagelist",
		components: {},
		watch: {

		},
		data() {
	    return {
		 isshop:false,// 可约商品弹窗
		 shoparray:[],// 可约商品
     currentPage4: 1, //第几页
     pageQuantity: 10, //每页数量
     allQuantity: 0, //总条数
	   quanyiListData: [],//套餐列表
		 commodityName: "", //搜索的名字
	   goodsloading: true,



        time1:'',
				//分页栏属性


			
	

				 
			
	
				quanyiValue: "全部", //商品类型
				 
			
			
			

			};
		},
		created() {

		},
		mounted() {
      this.getmessage()
		},
		methods: {
		 
		 getmessage(){//获取所有信息

		 console.log(this.currentPage4)
		 console.log(this.pageQuantity)
			 var body = {
				 mealName:this.commodityName,
				 page:this.currentPage4,
				 size:this.pageQuantity
				};
				this.$api
					.get("/manage/queryAllWeiBaoMeals", body)
					.then(res => {				 
						console.log(res);
						this.allQuantity=res.data.count
						this.quanyiListData=res.data.data	
						this.goodsloading=false
					})
					.catch(res => {
					
					});
		 },

		 search(){//搜索
		 this.currentPage4=1
        this.getmessage()
		 },

		 lookShop(e){//查看商品
			console.log(e)
			
			 var body = {
				 id:e.id,		
			 };
				this.$api
					.get("/manage/queryMealConGoods", body)
					.then(res => {				 
						console.log(res);
			          this.shoparray=res.data
                this.isshop=true
					})
					.catch(res => {
					
					});
		 },
    addCombo(e){//新增套餐
        this.$router.push("/vbmanager/taocan_goodsAdd");
     },
		 compile(e){//编辑套餐		 	  
			 this.$router.push("/vbmanager/taocan_goodsAdd?id=" + e.id);
		 },
     deleteCombo(e){//删除套餐

			this.$confirm('确认要删除该套餐吗？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {

       var body = {
				 id:e.id,		
			 };
				this.$api
					.get("/manage/deleteMeals", body)
					.then(res => {	
						
						if(this.quanyiListData.length<=1&&this.currentPage4>1){
	              this.currentPage4=this.currentPage4-1
						}	 
						console.log(this.currentPage4)
				  	this.getmessage()
				  	this.$message({
              message: '删除成功',
              type: 'success'
            });	
					})
					.catch(res => {
				  
					});
        }).catch(() => {
            this.$message('取消');   
        });
     },
			 
			handleSizeChange(val) {
		
      var that = this;
      that.currentPage4 = 1;
      that.pageQuantity = val;
      this.getmessage();
			},


          

			handleCurrentChange(val) {
			  var that = this;
        that.currentPage4 = val;
        this.getmessage();   
			},

		},
		computed: {

		}
	};
</script>

<style>
	.GMfenlelan {
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>