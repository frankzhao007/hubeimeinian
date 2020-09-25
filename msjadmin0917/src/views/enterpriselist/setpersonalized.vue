<template>
	<!-- 配置分销套餐 -->
	<div style="margin:20px">
		<div style="font-size: 20px; ">
			<i @click="goback()" class="el-icon-my-back backbtn"></i>
			<span>&nbsp&nbsp&nbsp返回</span>
		</div>
		<div style="margin:20px">
			<el-form :inline="true" :model="seekList" label-position='right' label-width="120px" size="medium">
				<el-form-item label="门店名称：">
					<el-input v-model="seekList.name" placeholder="请输入门店名称" style="width:200px" clearable></el-input>
				</el-form-item>
				<el-form-item label="所在区域：">
					<el-select v-model="seekList.area" placeholder="" style="width:200px" clearable>
						<el-option label="全部" value=""></el-option>
						<el-option label="华北地区" value="华北地区"></el-option>
						<el-option label="华东地区" value="华东地区"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所在城市：">
					<el-select v-model="seekList.city" placeholder="" style="width:200px" clearable>

						<el-option v-for="(item,index) in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
						<!--<el-option label="虚拟商品" value="虚拟商品"></el-option>-->
					</el-select>
				</el-form-item>
				<div></div>
				<el-form-item label="门店编码：">
					<el-input v-model="seekList.coding" placeholder="请输入门店编码" style="width:200px" clearable></el-input>
				</el-form-item>
				<el-form-item style="float:right">
					<el-button type="primary" @click="yueyuMendianSHEZHI">可预约门店设置</el-button>
					<el-button type="primary" @click="EmployeeExport()">导 出</el-button>
					<el-button type="primary" icon="el-icon-search" @click="search()">搜 索</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 列表 -->
		<el-table :data="tableData" style="width: 100%;margin-top:20px" v-loading="loadings">
			<el-table-column prop="centerName" label="门店名称" min-width="120" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="localCenterCode" label="门店编码" min-width="100" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="areaName" label="所在区域" min-width="100" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="cityName" label="所在城市" min-width="100" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="data" label="详细信息" min-width="100" show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button @click="looknote(scope.row)" type="text" size="medium">点击预览</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="remark" label="备注" min-width="100" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="updateTime" label="最后修改时间" min-width="100" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="data" label="修改描述" min-width="120" show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button @click="amendDescribe(scope.row)" type="text" size="medium">修改</el-button>
				</template>
			</el-table-column>
			<el-table-column label="排期设置" min-width="160" show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button @click="scheduleSet(scope.row)" type="text" size="medium">修改</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="选择门店" :visible.sync="issubscribeShop" width="800px">
			<div class="modality">
				<el-transfer :titles="['未选门店', '已选门店']" filterable filter-placeholder="请输入" v-model="shopValue" :data="shopList"></el-transfer>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="issubscribeShop = false">取 消</el-button>
				<el-button type="primary" @click="affirmShop">确定</el-button>
			</div>
		</el-dialog>

		<!--点击预览-->
		<el-dialog title="门店信息详情" :visible.sync="compileShop_detail" top="10vh" width="600px">
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">门店名称（必填）：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.centerName}}</div>
				<!--<el-input v-model="selectlist.centerName" maxlength="20" placeholder="请填写门店名称" size="small" ></el-input>-->
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">地区：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.areaName}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">城市：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.cityName}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">体检中心编码：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.localCenterCode}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">门店地址：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.address}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">联系电话（必填）：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.phoneNumber}}</div>
				<!--<el-input v-model="selectlist.phoneNumber" maxlength="20" placeholder="请输入联系电话" size="small" style="float:left;margin-left:10px;width:calc(100% - 260px);"></el-input>-->
			</div>
			<div style="overflow:hidden;margin-top:10px">
				<div style="width:180px;float:left;text-align: right;line-height:32px">营业时间（必填）：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.workTime}}</div>
				<!--<el-input v-model="selectlist.updateTime" maxlength="20" placeholder="请输入营业时间" size="small" style="float:left;margin-left:10px;width:calc(100% - 260px);"></el-input>-->
			</div>
			<div style="overflow:hidden;margin-top:10px">
				<div style="width:180px;float:left;text-align: right;line-height:32px">温馨提示（非必填）：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.warmPrompt}}</div>
				<!--<el-input v-model="selectlist.remark" maxlength="20" placeholder="请输入提示内容" type="textarea" size="small" style="float:left;margin-left:10px;width:calc(100% - 260px);"></el-input>-->
			</div>
			<div style="overflow:hidden;margin-top:10px;padding-top:10px">
				<div style="width:180px;float:left;text-align: right;">门店照片（非必填）：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);">
					<input style="display:none" type="file" id="commodityimage" accept=".jpg, .jpeg, .png, " />
					<div v-for="(child,index) in selectlist.storePhotos" :key="index" style="float:left;margin-bottom:15px;margin-right:15px; position: relative;">
						<img style="height:100px;width:100px;" :src="child" alt="" />
						<!--<div style="position: absolute;right:-10px;top:-10px;  background: #000000; border-radius:50%;width:20px;height:20px" >
							<img src="../../assets/img/close.png" style="width:20px;height:20px" />
						</div>-->
					</div>
					<!--<div class="addimage"   v-if="goodimgs.length<6">
						<img src="../../assets/img/more.png" style="width:30px;height:30px;" />
					</div>-->
				</div>
			</div>
			<!--<div slot="footer" class="dialog-footer">
				<el-button @click="compileaffirm_cancel">取 消</el-button>
				<el-button type="primary" @click="compileaffirm">确 定</el-button>
			</div>-->
		</el-dialog>

		<el-dialog title="编辑门店信息" :visible.sync="compileShop" top="10vh" width="600px">
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">门店名称（必填）：</div>
				<el-input v-model="selectlist.centerName" maxlength="20" placeholder="请填写门店名称" size="small" style="float:left;margin-left:10px;width:calc(100% - 260px);"></el-input>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">地区：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.areaName}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">城市：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.cityName}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">体检中心编码：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.localCenterCode}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">门店地址：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">{{selectlist.address}}</div>
			</div>
			<div style="overflow:hidden;">
				<div style="width:180px;float:left;text-align: right;line-height:32px">联系电话（必填）：</div>
				<el-input v-model="selectlist.phoneNumber" maxlength="20" placeholder="请输入联系电话" size="small" style="float:left;margin-left:10px;width:calc(100% - 260px);"></el-input>
			</div>
			<div style="overflow:hidden;margin-top:10px">
				<div style="width:180px;float:left;text-align: right;line-height:32px">营业时间（必填）：</div>
				<el-input v-model="selectlist.workTime" maxlength="20" placeholder="请输入营业时间" size="small" style="float:left;margin-left:10px;width:calc(100% - 260px);"></el-input>
			</div>
			<div style="overflow:hidden;margin-top:10px">
				<div style="width:180px;float:left;text-align: right;line-height:32px">温馨提示（非必填）：</div>
				<el-input v-model="selectlist.warmPrompt" maxlength="100" placeholder="请输入提示内容" type="textarea" size="small" style="float:left;margin-left:10px;width:calc(100% - 260px);"></el-input>
			</div>
			<div style="overflow:hidden;margin-top:10px;padding-top:10px">
				<div style="width:180px;float:left;text-align: right;">门店照片（非必填）：</div>
				<div style="float:left;margin-left:10px;width:calc(100% - 190px);">
					<input style="display:none" type="file" id="commodityimage" multiple="true" accept=".jpg, .jpeg, .png, " />
					<div v-for="(child,index) in selectlist.storePhotos" :key="index" style="float:left;margin-bottom:15px;margin-right:15px; position: relative;">
						<img style="height:100px;width:100px;" :src="child" alt="" />
						<div style="position: absolute;right:-10px;top:-10px;  background: #000000; border-radius:50%;width:20px;height:20px" @click="deletePicture(index)">
							<img src="../../assets/img/close.png" style="width:20px;height:20px" />
						</div>
					</div>
					<div class="addimage" @click="getFileImg" v-if="goodimgs.length<6">
						<img src="../../assets/img/more.png" style="width:30px;height:30px;" />
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="compileaffirm_cancel">取 消</el-button>
				<el-button type="primary" @click="compileaffirm">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 分页 -->
		<div style="height:30px;margin-top:20px;">
			<el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableselectenterMeal.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableselectenterMeal.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableselectenterMeal.total"></el-pagination>
		</div>

	</div>

</template>
<script>
	export default {
		data() {
			return {
				compileShop_detail: false,
				companyId: '',
				compilemesgg: {
					shopname: "",
					phone: "",
					businesstime: "",
					reminder: "",
				},
				selectlist: {},
				goodimgs: [], //上传的图片
				shopValue: [],
				shopList: [],
				issubscribeShop: false,
				compileShop: false,
				city: [{
					label: "全部",
					value: "全部"
				}],
				seekList: {
					name: "",
					area: "",
					city: "",
					coding: "",
				},

				tableselectenterMeal: { //分页
					pageindex: 1,
					pagesize: 10,
					total: 0,
				},

				tableData: [], //列表
				loadings: false,

			};
		},
		components: {

		},
		mounted() {
			this.companyId = this.$route.query.companyId
			console.log(this.companyId)
			this.getAllcity()
			this.getunselectedshop()
			this.getHaveChosen()
			this.getmessage()
		},
		methods: {
			// 门店导出
			EmployeeExport() {
				var that = this;
//				var stores = [{
//					centerName: that.seekList.name,
//					areaName: that.seekList.area,
//					cityName: that.seekList.city,
//					localCenterCode: that.seekList.coding,
//					remark: '',
//					address: '',
//					phoneNumber: '',
//					workTime: '',
//					updateTime: '',
//					createTime: '',
//					warmPrompt: '',
//				}]

				var body = {
					companyId:that.companyId,
					centerName: that.seekList.name,
					areaName: that.seekList.area,
					cityName: that.seekList.city,
					localCenterCode: that.seekList.coding,
				}
				this.$api
					.get("/store/exportStores", body)
					.then(res => {
						console.log(res.data);
						//  window.open(this.$parent.$parent.$parent.weburl  + res.data.url);
						let a = document.createElement("a");
						//  console.log(require("../assets/qrcode.png"));
						a.href = res.data; // href链接指向的地址
						a.download = '导出门店' + '.xlsx'; // 下载的的名称
						console.log(a.download);
						a.click(); // 触发a标签的单击事件
					})
					.catch(err => {
						console.log("err", err);
					});
			},
			getAllcity() {
				var that = this;
				var body = {
					page: "1",
					pageSize: '999999'

				};
				this.$api
					.get("/city/pullAll", body)
					.then(res => {
						res.data.data.map(item => {
							var temp = {
								value: item.CityName,
								label: item.CityName
							};
							this.city.push(temp);

						})
						console.log(this.city);
					})
					.catch(err => {
						console.log(err);
					});

			},
			yueyuMendianSHEZHI() {
				this.issubscribeShop = true
				this.shopValue = [];

			},
			compileaffirm_cancel() {
				var that = this;
				that.compileShop = false
				that.getunselectedshop()
				that.getHaveChosen()
				that.getmessage()
			},
			compileaffirm() {
				var that = this;
				console.log(this.selectlist)
				console.log(this.companyId)
				console.log(this.companyId)

				if(!that.selectlist.centerName) {
					that.$message({
						type: 'info',
						message: '请输入门店名称！'
					});
					return;
				}
				if(!that.selectlist.phoneNumber) {
					that.$message({
						type: 'info',
						message: '请输入联系电话！'
					});
					return;
				}
				if(!that.selectlist.workTime) {
					that.$message({
						type: 'info',
						message: '请输入营业时间！'
					});
					return;
				}
//				if(!that.selectlist.workTime) {
//					that.$message({
//						type: 'info',
//						message: '请输入营业时间！'
//					});
//					return;
//				}

				var body = {
					companyId: that.selectlist.companyId,
					companyPid: that.selectlist.companyPid,
					id: that.selectlist.id,
					centerName: that.selectlist.centerName,
					localCenterCode: that.selectlist.localCenterCode,
					areaName: that.selectlist.areaName,
					cityName: that.selectlist.cityName,
					remark: that.selectlist.remark,
					address: that.selectlist.address,
					phoneNumber: that.selectlist.phoneNumber,
					workTime: that.selectlist.workTime,
					updateTime: that.selectlist.updateTime,
					createTime: that.selectlist.createTime,
					baiDuMap: that.selectlist.baiDuMap,
					warmPrompt: that.selectlist.warmPrompt,
					storePhotos: that.selectlist.storePhotos,

				};
				this.$api
					.post("/store/updateStore", body)
					.then(res => {
						that.compileShop = false
						that.getunselectedshop()
						that.getHaveChosen()
						that.getmessage()
						//						this.tableData = res.data.storeList
						//						this.tableselectenterMeal.total = res.data.count
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});

			},
			deletePicture(e) { //删除图片
				this.selectlist.storePhotos.splice(e, 1)
			},
			amendDescribe(val) {
				console.log(val)
				this.selectlist = val
				this.compileShop = true
				//    compilemesgg:{
				//     shopname:"",
				//     phone:"",
				//     businesstime:"",
				//     reminder:"",
				//  },
				this.compilemesgg.shopname = val.centerName
				this.compilemesgg.phone = val.phoneNumber
				this.compilemesgg.businesstime = val.updateTime
				this.compilemesgg.reminder = val.centerName
			},
			getFileImg() { //选择图片
				//  var input = document.getElementById("imgTest");
				//    console.log(input);
				console.log("888888")  
				document.getElementById("commodityimage").addEventListener("change", this.imgChange); //把imgChange的事件绑定到input的change事件上
				   
				document.getElementById("commodityimage").click(); //执行input事件

			},

			imgChange(e) { //转化图片
				console.log(e)
				if(this.selectlist.storePhotos.length > 7) {
					this.$message.error('图片数量不能大于8张')
					return;
				}
				console.log(e.target.files.length)
				console.log(e.target.files[0].size)

				var imageSize = e.target.files[0].size
				if(imageSize > 2000000) {
					document.getElementById('commodityimage').value = null; //保证可用选择重复图片
					this.$message.error('图片大小不能超过2M');
				} else {
					var file = "";
					var  fd  = "";
					var index = e.target.files.length
					for(var i = 0; i < index; i++) {
						console.log(i)
						file = e.target.files[i]
						fd  = new  FormData(); 
						fd.append("imgs",  file);
						var body = {

						};
						this.$api.post("/manage/msjGoodsImgInsert", fd)
							.then(res => {
								console.log(res.data[0])
								this.selectlist.storePhotos.push(res.data[0])
								document.getElementById('commodityimage').value = null; //保证可用选择重复图片
							})
							.catch(res => {

							});
					} 

				}

			},

			search() {
				this.tableselectenterMeal.pageindex = 1
				this.tableselectenterMeal.pagesize = 10
				this.getmessage()
			},
			getmessage() {
				var that = this;
				var body = {
					companyId: this.companyId,
					//      accountType:"3",
					centerName: that.seekList.name,
					areaName: that.seekList.area,
					cityName: that.seekList.city,
					localCenterCode: that.seekList.coding,
					page: this.tableselectenterMeal.pageindex,
					pageSize: this.tableselectenterMeal.pagesize,
				};
				this.$api
					.get("/store/selectStoreList", body)
					.then(res => {
						this.tableData = res.data.storeList
						this.tableselectenterMeal.total = res.data.count
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			},

			affirmShop() {
				console.log(this.shopValue)
				var that = this;

				var body = {
					companyId: this.companyId,
					localCenterCodes: this.shopValue,
				};
				this.$api
					.post("/store/insertStores", body)
					.then(res => {
						that.issubscribeShop = false
						console.log(res);
						that.getmessage()
					})
					.catch(err => {
						console.log(err);
					});
			},

			getunselectedshop() {
				var body = {
					companyId: this.companyId,
				};
				this.$api
					.get("/store/findNotSetStores", body)
					.then(res => {

						for(var i = 0; i < res.data.length; i++) {
							var oj = {
								label: res.data[i].CenterName,
								key: res.data[i].LocalCenterCode
							}
							this.shopList.push(oj)
						}
						for(var i = 0; i < this.shopList.length; i++) {

							if(this.shopList[i].key == "10") {
								console.log(89898989999);
							}
						}
						console.log(this.shopList);
					})
					.catch(err => {
						console.log(err);
					});
			},

			getHaveChosen() {
				var body = {
					companyId: this.companyId,
				};
				this.$api
					.get("/store/selectStores", body)
					.then(res => {
						console.log(res);
						for(var i = 0; i < res.data.length; i++) {
							//							var oj = {
							//								label: res.data[i].centerName,
							//								key: res.data[i].localCenterCode
							//							}
							this.shopValue.push(res.data[i].localCenterCode)
						}

						console.log(this.shopValue);
					})
					.catch(err => {
						console.log(err);
					});
			},

			looknote(val) {
				console.log(val)
				this.selectlist = val

				this.compileShop_detail = true
			},

			scheduleSet(e) {
				console.log(e)
				this.$router.push("/enterprisemanagement/setschedule?storeId=" + e.id + "&&localCenterCode=" + e.localCenterCode + "&&companyId=" + this.companyId);
			},

			goback() { //返回
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
	.addimage {
		width: 100px;
		height: 100px;
		box-sizing: border-box;
		border: 2px dashed #DDDDDD;
		float: left;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	
	.modality {
		width: 80%;
		// height: 500px;
		margin: 20px auto;
	}
</style>

<style lang="scss">
	.modality .el-input {
		width: auto;
	}
	
	.modality .el-transfer__buttons .el-button {
		margin: 5px 0;
		padding: 10px;
		border-radius: 50%;
		color: #fff;
		border: 1px solid #409eff;
		background-color: #409eff;
		font-size: 0;
	}
</style>