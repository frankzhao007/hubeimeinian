<template>
	<!-- 账号列表----------------------------------------------------------------------------------------------------------------- -->
	<div class="app-container">
		<!-- 查询表单 -->
		<div>
			<div class="inquire">
				<el-row>

					<el-col :span="10">
						<div class="grid_lable_phone">手机号码：</div>
						<div class="grid_content">
							<el-input placeholder="请输入手机号码" v-model="table.phone" clearable size="medium" style="width:100%;">
							</el-input>
						</div>
					</el-col>
					<div style="float: right;">
						<el-col :span="10">

							<el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="sousuo('搜索')">搜索</el-button>
						</el-col>
						<el-col :span="10" style="margin-left: 20px;">
							<el-button :disabled="!Clickable.add" v-if="RoleInfo.AccountType != 3&&RoleInfo.AccountType != 5" class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="openNewAccount()">新增</el-button>
						</el-col>

					</div>

				</el-row>

			</div>
		</div>
		<!-- 按钮 -->
		<div>
			<div class="inquire">
				<!--<el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="sousuo('搜索')">搜索</el-button>-->
				<!--<el-button :disabled="!Clickable.add" v-if="RoleInfo.AccountType != 3&&RoleInfo.AccountType != 5" class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="openNewAccount()">新增账号</el-button>-->
			</div>
		</div>
		<!-- 表格 -->
		<div>
			<el-table :data="tableData" style="width: 100%" v-loading="tableDataLoading">
				<el-table-column prop="phone" label="手机号码" width="350">

				</el-table-column>
				<el-table-column prop="scTime" label="添加时间" width="350">
				</el-table-column>
				<el-table-column prop="scMan" label="添加人" width="300">
				</el-table-column>
				<el-table-column prop="scRemark" label="备注" width="350">
					<template slot-scope="scope">

						<!--<el-button v-if="scope.row.scRemark" class="remark" size="small" type="text" @click="addRemark(scope.row)">{{scope.row.scRemark}}</el-button>-->
						<div v-if="scope.row.scRemark" class="remark" size="small" type="text" @click="addRemark(scope.row)">{{scope.row.scRemark}}</div>
						<el-button type="text" v-else size="small" @click="addRemark(scope.row)">添加备注</el-button>
					</template>
				</el-table-column>

				<el-table-column prop="content" label="操作内容" fixed="right" width="300">
					<template slot-scope="scope">
						<!--<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>-->
						<el-button size="small" type="danger" @click="deleteAccount(scope.row)">删除</el-button>
					</template>
				</el-table-column>

			</el-table>
		</div>

		<!-- 新增白名单弹窗 -->
		<div>
			<el-dialog title="新增白名单" :visible.sync="newAdd.dialogFormVisible" width="800px">
				<div>
					<el-input type="textarea" :rows="15" placeholder="多行输入（多个手机号码添加换行输入）" v-model="newAdd.textarea">
					</el-input>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="newAdd.dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm('subAccountForm')">确认添加</el-button>
					<!--<el-button v-else type="primary" @click="submitForm('subAccountForm')">确认编辑</el-button>-->
				</div>
			</el-dialog>
		</div>
		<!-- 新增备注弹窗 -->
		<div>
			<el-dialog title="添加备注" :visible.sync="newRemark.dialogFormVisible" width="800px">
				<div>
					<el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="newRemark.textarea">
					</el-input>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="newRemark.dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitRemark('subAccountForm')">确认添加</el-button>
					<!--<el-button v-else type="primary" @click="submitForm('subAccountForm')">确认编辑</el-button>-->
				</div>
			</el-dialog>
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
				if(n == false) {
					console.log("初始化数据");
					// 初始化数据
					this.AccountType = 0;
					// this.InitializationType();
				}
			},
			//监听账号类型，不同类型显示不同内容
			"selectiveTypeForm.type": function(n, o) {
				// console.log(n, o);
				switch(n) {
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
				if(value === "") {
					callback(new Error("请输入手机号"));
				} else {
					var telStr = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
					// var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
					if(!telStr.test(value)) {
						callback(new Error("手机号码输入不规范"));
					} else {
						callback();
					}
				}
			};
			return {
				newAdd: {
					dialogFormVisible: false,
					textarea: ''

				},
				newRemark: {
					dialogFormVisible: false,
					textarea: '',
					phone: '',

				},
				table: {
					phone: '',

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
			this.getBaimingdan();
		},
		methods: {
			addRemark(e) {
				console.log(e)
				this.newRemark.dialogFormVisible = true
				this.newRemark.phone = e.phone
				this.newRemark.textarea = e.scRemark

			},
			submitRemark() {
				var that = this;
				var remark = this.newRemark.textarea
				remark = remark.replace(/\s+/g, ""); //去空格
				if(remark) {
					var body = {
						scRemark: remark,
						phone: this.newRemark.phone,

					};
					this.$api
						.post("/schindler/updateSchindlerRemark", body)
						.then(res => {
							console.log(res)
							if(res.code == 200) {
								that.newRemark.dialogFormVisible = false;
								that.getBaimingdan();
							}

						})
						.catch(err => {
							console.log(err);
						});
				} else {
					that.$message({
						type: 'info',
						message: '请输入备注内容'
					});
				}

			},
			deleteAccount(e) {
				console.log(e)
				this.$confirm('确定删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					var body = {
						phone: e.phone,

					};
					this.$api
						.post("/schindler/removeSchindler", body)
						.then(res => {
							console.log(res)
							if(res.code == 200) { 
								console.log(this.tableData)
								console.log(this.page)
								if (this.tableData.length == 1 && this.page > 1)  {                  
									this.page = this.page - 1  
//									this.newAdd.dialogFormVisible = false;
								                 
								}
								this.getBaimingdan(); 
								
							}

						})
						.catch(err => {
							console.log(err);
						});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			submitForm() {
				var that = this
				console.log(this.newAdd.textarea)
				//				this.newAdd.textarea=this.newAdd.textarea.replace(/↵/g,"<br/>");//去掉回车换行
				console.log(this.newAdd.textarea)
				var phone = this.newAdd.textarea
				//				var phoneArray = phone.split(" ")
				var phoneArray = phone.split("\n")
				console.log(phoneArray)
				var phonetemp = [];
				phoneArray.map(function(item, index) {
					console.log(item)
					if(item != '') {
						phonetemp.push(item)
					}

				})

				for(var i = 0; i < phonetemp.length; i++) {
					var index01 = Number(i) + 1
					if(phonetemp[i].length == 11) {

						var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
						console.log(myreg.test(phonetemp[i]))
						if(myreg.test(phonetemp[i])) {

						} else {
							console.log(1111111111)
							console.log(phonetemp[i])
							that.$message({
								message: "第" + index01 + "行手机号格式有误",
								type: "warning"
							});
							return;
						}
					} else if(phonetemp[i].length > 11) {
						console.log(222222222)
						console.log(phonetemp[i])
						that.$message({
							message: "第" + index01 + "行手机号格式有误，请按行输入",
							type: "warning"
						});
						return;
					} else {
						console.log(222222222)
						console.log(phonetemp[i])
						that.$message({
							message: "第" + index01 + "行手机号格式有误",
							type: "warning"
						});
						return;
					}
				}

				var body = {
					phoneList: phonetemp,

				};
				this.$api
					.post("/schindler/insertSchindler", body)
					.then(res => {
						console.log(res)
						if(res.code == 200) {
							this.newAdd.dialogFormVisible = false;
							this.getBaimingdan();
						}

					})
					.catch(err => {
						console.log(err);
						that.$message({
							message: err.msg,
							type: "warning"
						});
					});

				//				phonetemp.forEach(function(item, index) {
				//					if(item.length == 11) {
				//						var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				//						console.log(myreg.test(item))
				//						if(myreg.test(item)) {
				//
				//						} else {
				//							that.$message({
				//								message: "第"+index+"手机号格式有误",
				//								type: "warning"
				//							});
				//
				//						}
				//					} else {
				//						console.log(7878787)
				//						var index01=Number(index)+1
				//          that.$message({
				//								message: "第"+index01+"手机号格式有误",
				//								type: "warning"
				//							});
				//							return true;
				//					}
				//         
				//				})
				console.log(phonetemp)
				console.log(phonetemp[2])
			},
			openNewAccount() {
				this.newAdd.dialogFormVisible = true
				this.newAdd.textarea = ""

			},
			//获取白名单
			getBaimingdan(val) {
				var that = this;
				if(val == "搜索") {
					this.page = 1;
				}

				this.tableDataLoading = true;
				var body = {
					phone: that.table.phone,
					page: that.page,
					each: that.pageSize
				};
				this.$api
					.post("/schindler/schindlerSearch", body)
					.then(res => {
						console.log(res.data);
						if(res.code == 200) {
							that.tableData = res.data.data
							that.count = res.data.count;

							that.tableDataLoading = false;
						}

					})
					.catch(err => {
						console.log(err);
					});
			},
			// 搜索功能
			sousuo(val) {
				var that = this;

				if(val == "搜索") {
					this.page = 1;
				}
				this.tableDataLoading = true;
				var body = {
					phone: that.table.phone,
					page: that.page,
					each: that.pageSize
				};
				this.$api
					.post("/schindler/schindlerSearch", body)
					.then(res => {
						console.log(res.data);
						if(res.code == 200) {
							that.tableData = res.data.data
							that.count = res.data.count;

							that.tableDataLoading = false;
						}
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
	
	.grid_lable_phone {
		float: left;
		width: 29%;
		min-width: 100px;
		text-align: right;
		min-height: 36px;
		line-height: 36px;
	}
	
	.remark {
		color: #6985d3;
		text-align: left;
		width: 250px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		cursor: pointer;
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