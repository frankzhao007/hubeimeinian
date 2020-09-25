<template>
	<div class="app-container">
		<div style=" font-size: 20px;">
			<i @click="goback()" class="el-icon-my-back backbtn"></i>
			<span>&nbsp&nbsp&nbsp权益详情</span>
		</div>
		<div style="min-width: 1200px;">
			<el-row style="margin-top: 20px;">
				<el-col :span="2.5" style="margin-top: 4px;">
					<span class="cityred" style="position:absolute;left:3px;top:17px">*</span>
					<span class="grid_lable01">权益名称：</span>
				</el-col>
				<el-col :span="6">
					<div class="grid_content">
						<el-input placeholder="权益名称最多20个字" maxlength="20" v-model="quanyiName" clearable size="medium" style="width:100%;"></el-input>
					</div>
				</el-col>

				<el-col :span="2.5" style="margin-top: 4px;margin-left: -10px;position:relative">
					<span class="cityred" style="position:absolute;left:2px;top:14px">*</span>
					<span class="grid_lable01">giftcode：</span>
				</el-col>
				<el-col :span="6">
					<div class="grid_content">
						<el-input placeholder="请输入内容" maxlength="15" v-model="giftcode" clearable size="medium" style="width:100%;"></el-input>
					</div>
				</el-col>
			</el-row>

			<el-row style="margin-top: 20px;">
				<el-col :span="2.5" style="margin-top: 4px;">
					<span class="cityred" style="position:absolute;left:3px;top:16px">*</span>
					<span class="grid_lable01" style="width:150px">抵扣金额（元）：</span>
				</el-col>
				<el-col :span="4">
					<div class="grid_content">
						<el-input placeholder @input="priceConfirm_input" @blur="priceConfirm" maxlength="20" v-model="price" clearable size="medium" style="width:100%;"></el-input>
					</div>
				</el-col>

				<el-col :span="2.5" style="margin-top: 4px;margin-left: 40px;position:relative">
					<span class="cityred" style="position:absolute;left:4px;top:12px">*</span>
					<span class="grid_lable01">发放数量：</span>
				</el-col>
				<el-col :span="6">
					<div class="grid_content">
						<el-input placeholder @input="quantityConfirm_input" @blur="quantityConfirm" maxlength="15" v-model="quantity" clearable size="medium" style="width:100%;"></el-input>
					</div>
				</el-col>
			</el-row>

			<el-row style="margin-top: 20px;">
				<el-col :span="2.5" style="margin-top: 4px;">
					<span class="cityred" style="position:absolute;left:0;top:17px">*</span>
					<span class="grid_lable01">可约套餐：</span>
				</el-col>
				<el-col :span="2.5" style="margin-top: 4px;">
					<div @click="selectPhysicalBtn()" style="cursor:pointer;padding: 4px 4px 4px 4px; background-color: #409EFF;text-align: center;color: #FFFFFF;font-size: 14px;border-radius: 5px;">选择套餐</div>
				</el-col>
				<div class="cityselectbox_interestAdd">
					<el-tag v-for="item in selectAddPackage.confirmProjectList" :key="item.id" class="cityitembox" closable color="#ffffff" @close="Closecity(item.id)">{{item.label}}</el-tag>
				</div>
			</el-row>

			<!-- 选择体检项目弹窗 -->
			<div>
				<el-dialog title=" 选择体检项目" :visible.sync="selectAddPackage.isshow" width="800px">
					<!-- <div v-if="selectPhysical.isshow"> -->
					<!-- <el-row style="line-height:32px;">
              <el-col :span="2">
                <div style="float:right">一级类别：</div>
              </el-col>
              <el-col :span="3">
                <el-select
                  v-model="selectPhysical.FirstTypeValue"
                  placeholder="请选择"
                  size="small"
                  style="width:100%;"
                  clearable
                >
                  <el-option
                    v-for="item in selectPhysical.FirstTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="float:right">二级类别：</div>
              </el-col>
              <el-col :span="3">
                <el-select
                  v-model="selectPhysical.SecondTypevalue"
                  :disabled="!selectPhysical.FirstTypeValue||selectPhysical.FirstTypeValue==''||selectPhysical.FirstTypeValue=='全部'"
                  filterable
                  placeholder="选择一级类别后可选"
                  size="small"
                  style="width:100%;"
                  clearable
                >
                  <el-option
                    v-for="item in selectPhysical.SecondTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="float:right">项目名称：</div>
              </el-col>
              <el-col :span="3">
                <el-input
                  size="small"
                  style="width:100%;"
                  placeholder="点击输入"
                  v-model="selectPhysical.seekPackageName"
                  clearable
                ></el-input>
              </el-col>
              <el-col :span="2">
                <div style="float:right">性别：</div>
              </el-col>
              <el-col :span="3">
                <el-select
                  v-model="selectPhysical.seeksex"
                  placeholder="请选择"
                  size="small"
                  style="width:100%;"
                  clearable
                >
                  <el-option
                    v-for="item in selectPhysical.AddPackageseeklist.sex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-button
                  size="small"
                  type="primary"
                  style="float:right"
                  @click="ProjectListQuery('1')"
                >搜 索</el-button>
              </el-col>
            </el-row>
            <div style="margin:30px">
              <div
                style="margin:30px;text-align: center;color:#F56C6C"
                v-if="selectPhysical.projectCount==0"
              >分公司未创建该类型体检项目，请先创建体检项目!</div>
              <div v-else>
                <div v-show="selectPhysical.isshowtable">
                  <el-table
                    :row-key="getRowKeys"
                    ref="ProjectRef"
                    :data="selectPhysical.projectList"
                    style="width: 100%;"
                    size="medium"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
                    <el-table-column label="一级类目">
                      <template slot-scope="scope">
                        <span>{{ scope.row.packageName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="二级类目">
                      <template slot-scope="scope">
                        <span>{{ scope.row.checktypesec }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="项目名称">
                      <template slot-scope="scope">
                        <div class="alinehidden">{{ scope.row.checkname }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="详细描述">
                      <template slot-scope="scope">
                        <div class="alinehidden">{{ scope.row.checkdescribe }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="性别" width="100">
                      <template slot-scope="scope">
                        <div>{{ scope.row.checkgender }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- 分页 -->
					<!-- <div class="block" style="text-align: right;margin-top: 20px;">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="selectPhysical.projectcurrentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="selectPhysical.projectpageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="selectPhysical.projectCount"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div> -->
					<div class="projectmytransfer">
						<el-transfer v-loading="selectAddPackage.loading" :titles="['选择可约套餐', '已选套餐']" :button-texts="['到上边', '到下边']" v-model="selectAddPackage.selectProjectList" filterable filter-placeholder="请输入" :data="selectAddPackage.projectList"></el-transfer>
					</div>
					<span slot="footer" class="dialog-footer">
            <el-button @click="selectAddPackage.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmProjectBtn()">确 定</el-button>
          </span>
				</el-dialog>
			</div>
		</div>

		<el-row style="margin-top: 20px;position: relative;height: 100px;">
			<div style="min-width: 100px;">
				<span class="cityred" style="position:absolute;left:0;top: 6px;">*</span>
				<span style="position:absolute;left:15px;">有效期限：</span>
			</div>
			<el-radio-group v-model="time.radio">
				<el-radio @change="choose()" :label="1" style="position: absolute;top: 5px;left: 104px;">按领取日</el-radio>
				<el-radio @change="choose()" :label="2" style="position: absolute;top: 55px;left: 104px;">按固定日期</el-radio>
			</el-radio-group>
			<div style="position: absolute;top:-5px;left: 214px;">
				自领取
				<el-input size="small" :disabled="time.daychooseValue" @input="dayConfirm_input" @blur="dayConfirm" style="width:120px;" placeholder="请输入整数" v-model="time.day" clearable></el-input>日天内有效
			</div>
			<div style="position: absolute;top:20px;left: 214px;">
				<div class="block">
					<!--<span class="demonstration">默认</span>-->
					<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="time.value1" @change="change" :disabled="time.dayBetweenChooseValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</div>
			</div>
		</el-row>

		<div style="color: #409EFF;font-size: 14px;">提示：有效期限均截止到最后一天24点</div>
		<div style="min-width: 1100px;margin-top: 50px;">
			<el-button style="float: right;" type="primary" @click="confirm()">确 认</el-button>
			<el-button style="float: right;margin-right: 20px;" @click="goback">取 消</el-button>
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
				time: {
					radio: '',
					day: "",
					daychooseValue: true,
					dayBetweenChooseValue: true,
					value1: []
				},
				selectPhysical: {
					loading: false,
					addPhysical: false,
					confirmProjectList: [],
					confirmProjectfirsttype: [],
					selectProjectList: [],
					isshow: false,
					isshowtable: false,
					FirstTypeList: [], //一级类别列表
					FirstTypeValue: "", //一级类别选择的值
					SecondTypeList: [], //二级类别列表，根据一级类别生成
					SecondTypevalue: "", //二级类别选择的值
					seeksex: "", //搜索框性别
					seekPackageName: "", //搜索栏项目名称
					//搜索栏属性列表
					AddPackageseeklist: {
						sex: [{
								value: "通用",
								label: "通用"
							},
							{
								value: "男",
								label: "男"
							},
							{
								value: "女",
								label: "女"
							}
						]
					},
					projectList: [], //体检项目列表
					projectCount: 0, //体检项目总数
					projectpageSize: 10, //每页条数
					projectcurrentPage: 1 //当前页
				},
				selectAddPackage: {
					loading: false,
					addpackage: false,
					confirmProjectList: [],
					selectProjectList: [],
					isshow: false,
					isshowtable: false,
					seekPackageName: "", //加项包名称：
					SecondTypevalue: "", //加项包类别：
					projectList: [], //加项包列表
					projectCount: 0, //加项包目总数
					projectpageSize: 10, //每页条数
					projectcurrentPage: 1 //当前页
				},
				selectTaocan: [],
				quanyiName: "",
				giftcode: "",
				price: "",
				quantity: "",
				radio: '', //单选框的值
				id: "", //  查询单个权益id
				data: [],
				ids: [], //请求可约套餐id,
				alllist: [], //请求所有可约套餐
				danlist: []
			};
		},
		created() {
			this.id = this.$route.query.val
			console.log(this.id)
		},
		mounted() {

			if(this.id != undefined) {
				this.Getinfoid()
			}
		},
		methods: {
			goback() {
				if(this.id) {
					this.$confirm('确定退出编辑吗？退出后将不保存已修改的内容。', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.go(-1);
					})

				} else {
					this.$router.go(-1);

				}

			},
			change() {

				console.log(this.time.value1)
			},
			choose() {
				console.log(this.time.radio);
				this.radio = this.time.radio
				if(this.time.radio == 1) {
					this.time.daychooseValue = false;
					this.time.dayBetweenChooseValue = true;
				} else if(this.time.radio == 2) {
					this.time.daychooseValue = true;
					this.time.dayBetweenChooseValue = false;
				}
			},

			//穿梭框改变事件
			handleChange(value, direction, movedKeys) {
				this.ids = value
				console.log(value, direction, movedKeys)

				for(var i = 0; i < value.length; i++) {
					this.data.map(item => {
						if(value[i] == item.id) {
							this.selectTaocan.push(item.label)
						}
					})
				}
			},
			selectPhysicalBtn() {
				// this.selectPhysical.loading = true;
				console.log(this.selectAddPackage.projectList)
				console.log(this.selectAddPackage.confirmProjectList)
				this.selectAddPackage.selectProjectList = [];
				this.data = []
				this.selectAddPackage.addPhysical = false;
				this.selectAddPackage.isshowtable = false;
				this.selectAddPackage.isshow = true;

				this.selectAddPackage.projectList = [];
				this.selectAddPackage.projectcurrentPage = 1;
				this.selectAddPackage.FirstTypeValue = "";
				this.selectAddPackage.SecondTypevalue = "";
				this.selectAddPackage.confirmProjectList.map(item => {
					this.selectAddPackage.selectProjectList.push(item.id);
				});
				var body = {
					ids: ''
				};
				this.$api
					.post("manage/queryMealsForSca", body)
					.then(res => {
						console.log(res);
						if(res.code == "200") {
							console.log(res.data.data)
							this.selectAddPackage.projectList = [];
							this.alllist = res.data.data
							res.data.data.map(res => {
								this.selectAddPackage.projectList.push({
									label: res.mealName,
									key: res.id,
									id: res.id
								})
							})
						}
					})
					.catch(res => {
						this.goodsloading = false;
					});
				console.log(this.selectAddPackage.confirmProjectList)
				console.log(this.selectAddPackage.projectList)
				console.log(this.selectAddPackage.selectProjectList)
			},

			confirmProjectBtn() {
				this.selectAddPackage.confirmProjectList = [];
				console.log(this.selectAddPackage.selectProjectList);
				console.log(this.selectAddPackage.addpackage);
				if(this.selectAddPackage.addpackage) {
					this.selectAddPackage.confirmProjectList.map(item => {
						this.selectAddPackage.selectProjectList = this.selectAddPackage.selectProjectList.filter(
							temp => temp.id != item.id
						);
					});
					this.selectAddPackage.confirmProjectList = this.selectAddPackage.confirmProjectList.concat(
						this.selectAddPackage.selectProjectList
					);
				} else {
					this.selectAddPackage.projectList.map(item => {
						if(
							this.selectAddPackage.selectProjectList.indexOf(item.id) >= 0
						) {
							this.selectAddPackage.confirmProjectList.push(item);
						}
					});
					// this.selectAddPackage.confirmProjectList = this.selectAddPackage.selectProjectList;
				}
				console.log(this.selectAddPackage.projectList);
				console.log(this.selectAddPackage.selectProjectList);
				console.log(this.selectAddPackage.confirmProjectList);
				this.selectAddPackage.isshow = false;
				console.log(this.selectAddPackage.confirmProjectList)
				console.log(this.selectAddPackage.selectProjectList)
			},
			//Closecity
			Closecity(obj) {
				console.log(this.selectTaocan)
				console.log(this.selectAddPackage.confirmProjectList)
				console.log(obj)
				if(this.$route.query.look) {} else {
					console.log(obj);
					console.log(this.selectAddPackage.confirmProjectList.indexOf(obj));
					this.selectAddPackage.confirmProjectList.map((item,index) => {
					if(item.id.indexOf(obj)!=-1) {
						console.log(item.id.indexOf(obj));
						this.selectAddPackage.confirmProjectList.splice(index, 1);
					}
				});
					
					//					this.selectShop.confirmshopList = this.selectShop.confirmshopList.filter(
					//						item => item.CityName != obj
					//					);
				}

				//				if(this.$route.query.look) {} else {
				//					console.log(obj);
				//					this.selectTaocan.splice(
				//						this.selectTaocan.indexOf(obj),1);
				//					//					this.selectShop.confirmshopList = this.selectShop.confirmshopList.filter(
				//					//						item => item.CityName != obj
				//					//					);
				//				}
				console.log(this.selectAddPackage.confirmProjectList)
				console.log(this.selectTaocan)
			},
			dayConfirm() {},
			dayConfirm_input() {
				console.log(this.time.day);
				var bool = /^(0|[1-9][0-9]*)$/.test(this.time.day);
				if(this.time.day.length == 1) {
					this.time.day = this.time.day.replace(/[^0-9]/g, "");
				} else {
					console.log(787777777777);
					this.time.day = this.time.day.replace(/^0[0-9]+/g, "0");
					this.time.day = this.time.day.replace(/\D/g, "");
				}
			},
			quantityConfirm() {},
			quantityConfirm_input() {
				var bool = /^(0|[1-9][0-9]*)$/.test(this.quantity);
				if(this.quantity.length == 1) {
					this.quantity = this.quantity.replace(/[^0-9]/g, "");
				} else {
					console.log(787777777777);
					this.quantity = this.quantity.replace(/^0[0-9]+/g, "0");
					this.quantity = this.quantity.replace(/\D/g, "");
				}
			},
			priceConfirm() {},
			priceConfirm_input() {
				this.price = this.price.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
				this.price = this.price.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				this.price = this.price
					.replace(".", "$#$")
					.replace(/\./g, "")
					.replace("$#$", ".");
				this.price = this.price.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
				if(this.price.indexOf(".") < 0 && this.price != "") {
					//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					this.price = parseFloat(this.price);
				}
				if(!this.price ||
					this.price == "0" ||
					this.price == "0.0" ||
					this.price == "0.00"
				) {
					if(this.price == "0" || this.price == "0.00") {
						this.price = 0;
					}
				}
			},
			//提交新增权益
			confirm() {
				var that = this;
				if(!this.quanyiName) return this.$message.error("请输入权益名称");
				if(!this.giftcode) return this.$message.error("请输入权益代码");
				if(!this.price) return this.$message.error("请输入抵扣金额");
				if(!this.quantity) return this.$message.error("请输入发放数量");
				if(this.selectAddPackage.confirmProjectList.length == 0) return this.$message.error("请选择可约套餐");
				console.log(this.time.radio)
				console.log(this.time.day)
				console.log(this.time.value1)
				if(!this.time.radio) {
					return this.$message.error("请输入有效期限");

				} else {
					if(this.time.radio == "1") {
						if(!this.time.day) {
							return this.$message.error("请输入有效的天数");

						}

					} else if(this.time.radio == "2") {
						if(this.time.value1.length == 0) {

							return this.$message.error("请输入有效的天数");
						}

					}

				}
				const arr = []
				console.log(this.selectAddPackage.confirmProjectList)
				var package_confirm = [];
				this.selectAddPackage.confirmProjectList.map(item => {
					let obj = {
						packageName: item.label,
						packageId: item.id
					};
					package_confirm.push(obj);
				});
				for(var i = 0; i < this.ids.length; i++) {
					this.alllist.map(res => {
						if(this.ids[i] == res.id) {
							arr.push({
								'id': res.id,
								'label': res.mealName
							})
						}
					})
				}

				console.log(this.time.radio)
				console.log(this.id)
				//判断是新增权益还是编辑权益
				if(this.id !== undefined) {
					console.log(this.time.radio)
					if(this.time.radio == "1") {
						var body = {
							giftName: this.quanyiName, //名称
							giftCode: this.giftcode, //代码
							deductibleAmount: this.price.toString(), //价格
							count: Number(this.quantity), //数量
							package: package_confirm, //可约套餐
							receiveType: "1", //单选框
							days: this.time.day,
						};
						this.$api
							.post("weibao/UpdateGift", body)
							.then(res => {
								console.log(res);
								if(res.code == "200") {
									this.$router.push("/vbmanager/interest")
									this.$message({
										message: res.msg,
										type: 'success'
									});

									this.quanyiName = ""
									this.giftcode = ""
									this.price = ""
									this.quantity = ""
									this.radio = ""
									this.time.day = ""
									this.selectTaocan = []
								}
							})
							.catch(res => {
								this.goodsloading = false;
								this.$message.error(res.msg);
							});
					} else {
						console.log(this.time.radio)
						var body = {
							giftName: this.quanyiName, //名称
							giftCode: this.giftcode, //代码
							deductibleAmount: this.price.toString(), //价格
							count: Number(this.quantity), //数量
							package: package_confirm, //可约套餐
							receiveType: "2", //单选框
							startDate: this.time.value1[0],
							endDate: this.time.value1[1]
						};
						this.$api
							.post("weibao/UpdateGift", body)
							.then(res => {
								console.log(res);
								if(res.code == "200") {
									this.$router.push("/vbmanager/interest")
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.quanyiName = ""
									this.giftcode = ""
									this.price = ""
									this.quantity = ""
									this.radio = ""
									this.this.time.value1[0] = ""
									this.this.time.value1[1] = ""
									this.selectTaocan = []
								}
							})
							.catch(res => {
								this.goodsloading = false;
								this.$message.error(res.msg);
							});
					}
				} else {
					console.log(this.time.radio)
					if(this.time.radio == "1") {
						var body = {
							giftName: this.quanyiName, //名称
							giftCode: this.giftcode, //代码
							deductibleAmount: this.price.toString(), //价格
							count: Number(this.quantity), //数量
							package: package_confirm, //可约套餐
							receiveType: "1", //单选框
							days: this.time.day,
						};
						this.$api
							.post("weibao/InsertGift", body)
							.then(res => {
								console.log(res);
								if(res.code == "200") {
									this.$router.push("/vbmanager/interest")
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.quanyiName = ""
									this.giftcode = ""
									this.price = ""
									this.quantity = ""
									this.radio = ""
									this.time.day = ""
									this.selectTaocan = []
								}
							})
							.catch(res => {
								this.goodsloading = false;
								this.$message.error(res.msg);
							});
					} else {
						console.log(this.time.radio)
						var body = {
							giftName: this.quanyiName, //名称
							giftCode: this.giftcode, //代码
							deductibleAmount: this.price.toString(), //价格
							count: Number(this.quantity), //数量
							package: package_confirm, //可约套餐
							receiveType: "2", //单选框
							startDate: this.time.value1[0],
							endDate: this.time.value1[1]
						};
						this.$api
							.post("weibao/InsertGift", body)
							.then(res => {
								console.log(res);
								if(res.code == "200") {
									this.$router.push("/vbmanager/interest")
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.quanyiName = ""
									this.giftcode = ""
									this.price = ""
									this.quantity = ""
									this.radio = ""
									this.this.time.value1[0] = ""
									this.this.time.value1[1] = ""
									this.selectTaocan = []
								}
							})
							.catch(res => {
								this.goodsloading = false;
								this.$message.error(res.msg);
							});
					}
				}
			},

			//查询单个权益
			Getinfoid() {
				var body = {
					giftCode: this.id
				};
				this.$api
					.get("weibao/QueryGiftByCode", body)
					.then(res => {
						console.log(res);
						if(res.code == "200") {
							this.quanyiName = res.data.giftName
							this.giftcode = res.data.giftCode
							this.price = res.data.deductibleAmount
							this.quantity = res.data.count
							//							this.selectAddPackage.confirmProjectList = res.data.package;
							res.data.package.map(item => {
								var obj = {
									label: item.packageName,
									key: item.packageId,
									id: item.packageId
								}
								this.selectAddPackage.confirmProjectList.push(obj);
								this.selectAddPackage.selectProjectList.push(item.packageId);
							});
							this.selectAddPackage.confirmProjectList.map(item => {
								this.selectAddPackage.selectProjectList.push(item.id);
							});
							console.log(this.selectAddPackage.confirmProjectList)
							res.data.package.map(res => {
								this.selectTaocan.push(res.packageName)
							})
							if(res.data.receiveType == "1") {
								this.time.radio = 1
								this.time.daychooseValue = false
								this.time.day = res.data.days
							} else if(res.data.receiveType == "2") {
								this.time.radio = 2
								this.time.dayBetweenChooseValue = false
								this.time.value1.push(res.data.startDate)
								this.time.value1.push(res.data.endDate)
							}

							this.danlist = res.data.package
						}
					})
					.catch(res => {
						this.goodsloading = false;
					});
			}
		},
		computed: {}
	};
</script>

<style>
	.grid_lable01 {
		margin-top: -5px;
		margin-left: 13px;
		/*float: left;*/
		width: 20%;
		min-width: 100px;
		text-align: right;
		min-height: 36px;
		line-height: 36px;
	}
	
	.cityselectbox_interestAdd {
		min-height: 100px;
		margin: 50px 200px 20px 10px;
		border: 1px solid #cccccc;
		border-radius: 4px;
		padding-bottom: 10px;
	}
	
	.block>>>.el-date-editor .el-range-separator {
		padding: 0;
	}
</style>