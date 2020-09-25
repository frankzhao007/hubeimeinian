<template>
  <div>
     <div style="font-size: 20px; padding:20px">
	    <i @click="goback()" class="el-icon-my-back backbtn" ></i>
		<span>&nbsp&nbsp&nbsp套餐详情</span>
     </div>
	 <el-row>	 
		<el-col style="width:120px;text-align:right; line-height:40px;" >* 套餐名称：</el-col>
		<el-input placeholder="套餐名称最多20字" v-model="comboname" clearable  style="width:60%;" maxlength="20" show-word-limit></el-input>
	 </el-row>
	  <el-row style="margin-top:20px">	 
		<el-col style="width:120px;text-align:right; line-height:40px;" >套餐副标题：</el-col>
		<el-input placeholder="副标题最多50字" v-model="combotitle" clearable  style="width:60%;" maxlength="50" show-word-limit></el-input>
	 </el-row>
	 <el-row style="margin-top:20px">	 
		<el-col style="width:120px;text-align:right; line-height:36px;" >套餐标签：</el-col>
	
		<el-col style="width:350px;line-height:36px;text-align: left" >	   	
	   <el-row style="float:left;margin-bottom:10px" v-for="(item,index) in labelList" :key="item.id">
		   <el-input placeholder="标签最多10字" v-model="labelList[index]" clearable  style="width:250px;" size="medium" maxlength="10" show-word-limit></el-input>
		   <el-button  type="text" size="medium" @click="deleteLabel(index)" style="margin-left:5px" >删除</el-button>
		  </el-row>
		
		  <el-button type="primary" size="medium"  style="float:left;margin:0" @click="addlabel">添加标签</el-button>
        </el-col>	
	 </el-row>

	<el-row style="margin-top:40px">
	
		  <el-col style="width:120px;text-align:right; line-height:36px;" >套餐列表图：</el-col>
		  <el-col style="width:500px;text-align: left;" >	
		    <el-upload style="vertical-align:bottom;"  :on-change="handleChange"   :on-remove="handleRemoveArr" :file-list="listimage" action="" :limit="2" :auto-upload="false" accept=".jpg, .jpeg, .png"> 		
			  <el-button  type="primary" size="medium"  slot="trigger" >选择图片</el-button>
			  	
		      <span style="color:#7F7F7F;margin-left:15px;">格式：jpg/jpeg/png</span>
		    </el-upload>
 
  
		    <!-- <el-row style="line-height:28px;">
			  <span style="color: #7F7F7F;">选择图片选择图片选择图片</span>
			  <el-button  type="text" size="mini" style="margin-left:10px">删除</el-button>	
			</el-row > -->

			<!-- <el-row style="line-height:28px;">
			  <span style="color: #7F7F7F;">选择图片选择图片选择图片</span>
			  <el-button  type="text" size="mini" style="margin-left:10px">删除</el-button>	
			</el-row>
			   -->
	      </el-col>
	 </el-row>

	 <el-row style="margin-top:30px">
		  <el-col style="width:120px;text-align:right; line-height:36px;" >套餐banner：</el-col>
		  <el-col style="width:500px;line-height:36px;text-align: left" >	
			<el-upload style="vertical-align:bottom;"  :on-change="selectBanner"  :on-remove="deleteBanner"  :file-list="bannerimage" action=""  :auto-upload="false"  accept=".jpg, .jpeg, .png"> 		
			  <el-button  type="primary" size="medium"  slot="trigger" >选择图片</el-button>	
		      <span style="color:#7F7F7F;margin-left:15px;">格式：jpg/jpeg/png</span>
		    </el-upload>

		    <!-- <el-row style="line-height:28px;">
			  <span style="color: #7F7F7F;">选择图片选择图片选择图片</span>
			  <el-button  type="text" size="mini" style="margin-left:10px">删除</el-button>	
			</el-row >

			<el-row style="line-height:28px;">
			  <span style="color: #7F7F7F;">选择图片选择图片选择图片</span>
			  <el-button  type="text" size="mini" style="margin-left:10px">删除</el-button>	
			</el-row>			   -->
	      </el-col>
	  </el-row>

	 <div style="margin-top:20px;" v-if="isrefresh">
        <el-row style="width:120px;text-align:right; line-height:36px;" >套餐详情：</el-row>
	    	<wangeditor :catchData="catchData" style="width:92%;margin-left:50px;" ></wangeditor>
	 </div>


	  <el-row style="margin-top:40px;">
        <el-col style="width:120px;text-align:right; line-height:36px;" >* 可约商品：</el-col>
		<el-button  type="primary" size="medium"  style="float:left;margin:0" @click="selectShop">选择商品</el-button>
	    <div class="citys">
          <el-tag v-for="(item,index) in mealGoods"  :key="item.goodid"  closable   @close="deleteCommodity(index)" style="margin:5px">{{item.goodName}}</el-tag>
        </div>
	 </el-row>


	<div style="float:right;margin:40px 20px">
      <el-button @click="goback()" >取 消</el-button>   
      <el-button type="primary" @click="confirmCompile" v-if="id">确 定</el-button>   
			<el-button type="primary" @click="confirmAdd" v-else>确 定</el-button>   
  </div>
<!-- 可约商品套餐 -->
   <el-dialog :visible.sync="isShop"  title=" 选择商品" width="1000px">
		 <!-- <div class="mytransfer" style="margin-left:80px"> -->
		 <div class="projectmytransfer">
		   <el-transfer :titles="['未选商品', '已选商品']" :button-texts="['到上边', '到下边']" v-model="selectStores" filterable  filter-placeholder="请输入" :filter-method="filterMethod" :data="arrags"></el-transfer>
		 </div>

		  <span slot="footer" class="dialog-footer">
          <el-button @click="isShop= false" >取 消</el-button>
          <el-button type="primary" @click="affirmShop">确 定</el-button>
      </span>
   </el-dialog>

  </div>


</template>

<script>

import wangeditor from "../../packagelist/WangEditor";

export default {
  components: {
  	wangeditor
  },
  watch: {},
  data() {

			
  return {
    // iscompile:true,//是否编辑
		firstTxt:"",
		id:"",//套餐id
		comboname:"",//套餐名称
		combotitle:"",//套餐副标题
		labelList:[],//套餐标签	
		listimage:[],//选择的列表图
		bannerimage:[],//选择的banner图		
		content:"",//套餐详情		
    isShop:false,//商品弹窗
		arrags:[],//所有商品
		selectStores:[],//选择的商品id
    mealGoods:[],//选择的商品名称
		isrefresh:false,//刷新
		

	};
  },
  mounted() {
       if(this.$route.query.id){
				 this.id=this.$route.query.id
				 this.getcommoditymessage(this.$route.query.id)
			 }else{
				 this.isrefresh=true
			 }

  },
  methods: {

	getcommoditymessage(id){//获取商品信息
	
    var body = {
	    id:id,  
		};
		this.$api.get("/manage/queryMealsById", body)
			.then(res => {				 		 
				console.log(res)

				this.comboname=res.data.mealName,//套餐名称
				this.combotitle=res.data.mealTitle//套餐副标题
				this.labelList=res.data.mealTags//套餐标签	
				this.mealGoods=res.data.mealGoods//选择的商品名称
				this.content=res.data.mealDescrib//套餐详情
				this.bannerimage=res.data.mealBanner//banner图
				this.firstTxt=res.data.mealDescrib
				if(res.data.mealListImg.url){
           this.listimage.push(res.data.mealListImg)
				}else{
					this.listimage=[]
				}
				
				this.isrefresh=true
		   	this.selectStores = res.data.mealGoods.map(x => {     
         return x.goodId;
        });
				console.log(this.selectStores)

				// this.combotitle=res.data.mealTitle//套餐副标题
			})
	    	.catch(res => {
				
					
		 });
	},
	addlabel(){//添加标签
       this.labelList.push("")
	},
	deleteLabel(e){//删除标签
		console.log(e)
		this.labelList.splice(e,1)
	},
	handleChange(file, fileList) {//添加列表图
	   this.listimage=[]
		this.transformFile(file,1)
	},

 handleRemoveArr(file,fileList) {//删除列表图  
    for(var i=0;i<this.listimage.length;i++){
		  	if(file.uid==this.listimage[i].uid){
		  		this.listimage.splice(i,1)			
			  	return;
		  	}
	  	}
  },
		
	selectBanner(file, fileList){//Banner图
	   this.bannerimage=this.bannerimage
		 this.transformFile(file,2)
	},

	deleteBanner(file, fileList){//删除
		
    for(var i=0;i<this.bannerimage.length;i++){
		  	if(file.uid==this.bannerimage[i].uid){	
					this.bannerimage.splice(i,1)				
			  	return;
		  	}
	  	}

  
	},

	transformFile(file,inds){//转换图片格式
	  var that = this
    console.log(file)		
	  var  fd  =  new  FormData();    
	  fd.append("imgs",  file.raw);
    var body = {
	     
		};
		this.$api.post("/manage/goodsImgInsert", fd)
			.then(res => {				 
		   if(inds==1){
				
					this.listimage.push(res.data[0])
				
			 }else{
					this.bannerimage.push(res.data[0])
					console.log(this.bannerimage)
			 }
				
			})
	    	.catch(res => {
				
					
		 });

		}, 
	filterMethod(query, item) {//商品搜索规则
      return item.pinyin.indexOf(query) > -1;
  },	
	selectShop(){//选择商品
		// this.isShop=true
    console.log(this.selectStores)
		console.log(this.mealGoods)
	
    var body = {
	   goodids:[],  
		};
		this.$api.get("/manage/queryWeiBaoGoodForMeal", body)
			.then(res => {		
				//  var lists=[]	
				//  var arr=res.data.data	 		 
				//  this.arrags=res.data.data
				 this.generateData(res.data.data)
			})
	    	.catch(res => {
				
					
		 });
	},
  	generateData(arraylist){//获取商品数组
        const data = [];
				const cities = arraylist;
				console.log(cities)
        cities.forEach((city, index) => {
					var sex=""
					var marriage=""
					if(city.gender!="通用"){
             sex="-"+city.gender
					}
					if(city.marital!="通用"){
            marriage="-"+city.marital
					}
          data.push({		
            label: city.goodid+'-'+city.goodname+sex+marriage,
						key: city.goodid,
						pinyin: city.goodid+'-'+city.goodname+sex+marriage,
						goodid:city.goodid
          });
        });
				this.arrags=data
				this.isShop=true
			
		},

		deleteCommodity(e){//删除商品
	
			this.selectStores.splice(e,1)
			this.mealGoods.splice(e,1)
        console.log(e)
		},
  affirmShop(){//确认选择的商品

	 var shoparray=[]
   this.arrags.map(x => {
      this.selectStores.map(y=>{
				if(x.goodid==y){
					shoparray.push({
						goodName:x.label,
						goodId:x.goodid
					})
				}
			})
	 });
	 
	 this.mealGoods=shoparray
   this.isShop=false
  },
	catchData(value) {//套餐详情
      this.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
	},


	confirmAdd(){//确定新增
	console.log(this.listimage[0])
	var listimages={} 
	if(this.listimage.length<=0){
      listimages={}
	}else{
     listimages=this.listimage[0]
	}
   if(!this.comboname){
     this.$message.error('请输入套餐名称');
   }else if(this.mealGoods.length<=0){
     this.$message.error('请选择可约商品');
	 }else{
		var body = {
			mealName:this.comboname,
		  mealTitle:this.combotitle,
			mealTags:this.labelList,
			mealListImg:listimages,
			mealBanner:this.bannerimage,
			mealDescrib:this.content,
			mealGoods:this.mealGoods,
		 };
		this.$api.post("/manage/InsertWeiBaoMeals", body)
			.then(res => {		
				this.$router.push("/vbmanager/taocan_goods");		 
			   	this.$message({
          message: '新建成功',
          type: 'success'
        });	
			})
		.catch(res => {
				
					
		});
      
	 }

	},

	confirmCompile(){//确认编辑
	 if(!this.comboname){
     this.$message.error('请输入套餐名称');
   }else if(this.mealGoods.length<=0){
     this.$message.error('请选择可约商品');
	 }else{
		var body = {
			id:this.id,
			mealName:this.comboname,
		  mealTitle:this.combotitle,
			mealTags:this.labelList,
			mealListImg:this.listimage[0],
			mealBanner:this.bannerimage,
			mealDescrib:this.content,
			mealGoods:this.mealGoods,
		 };
		this.$api.post("/manage/updateWeiBaoMeals", body)
			.then(res => {				 
				this.$router.push("/vbmanager/taocan_goods");	
				this.$message({
          message: '修改成功',
          type: 'success'
        });	
			})
		.catch(res => {
				
					
		});
      
	 }
	},
	goback(){
		
			this.$confirm('确定退出编辑吗？退出后将不保存已修改的内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

           	this.$router.push("/vbmanager/taocan_goods");	
        }).catch(() => {
     
        });
	  
  	}
  },
  computed: {}
};
</script>

<style lang="scss" scoped>

.citys {
  /* min-width: 900px; */
  width: 92%;
  min-height: 100px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-left: 50px;
  margin-top: 20px;
  overflow: hidden;
  float: left;
  padding: 10px;
  margin-right: 100px;


}
</style>