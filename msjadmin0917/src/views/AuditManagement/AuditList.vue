<template>
	<div style="margin:20px">
		<!-- 搜索栏 -->
		<div>
			<el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
				<el-form-item label="审核状态：">
					<el-select v-model="seekobj.Status" placeholder="" style="width:200px">
						<el-option label="全部" :value="-1"></el-option>
						<!--<el-option label="未审核" :value="0"></el-option>-->
						<el-option label="审核中" :value="1"></el-option>
						<el-option label="审核通过" :value="2"></el-option>
						<el-option label="审核拒绝" :value="3"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="我的审核">
					<el-checkbox border v-model="seekobj.todo" @change="checkBoxChange">待处理订单</el-checkbox>
				</el-form-item>

				<!-- <el-form-item label="单位：">
          <el-input v-model="seekobj.DWMC" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item> -->
				<!-- <el-form-item label="业务员：">
          <el-input v-model="seekobj.data2" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="制单人：">
          <el-input v-model="seekobj.data2" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="内勤审核人：">
          <el-input v-model="seekobj.data2" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="财务审核人：">
          <el-input v-model="seekobj.data3" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item> -->
				<!-- <el-form-item label="时间范围：">
          <el-date-picker value-format="yyyy-MM-dd" v-model="seekobj.TimeHorizon" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
				</el-form-item>-->
				<el-form-item style="float:right">
					<!-- <el-button type="primary" icon="el-icon-refresh-right" @click="">重 置</el-button> -->
					<el-button type="primary" icon="el-icon-search" @click="seekbtn">搜 索</el-button>
				</el-form-item>
				<div></div>
				<!-- <el-form-item>
          <el-button type="primary" @click="gotoOBD">导 出</el-button>
          <el-button type="primary" @click="">审 核</el-button>
          <el-button type="primary" @click="">消 审</el-button>
          <el-button type="primary" @click="">作 废</el-button>
        </el-form-item> -->
			</el-form >
			<el-form v-if="role=='内勤'" :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
				<el-form-item>
					<el-button v-if="seekobj.MsjBILLCODE" type="primary" @click="packageExport('package')">套餐信息导出</el-button>
					<el-button v-else type="info"  >套餐信息导出</el-button>
				</el-form-item>
				<el-form-item>
					<el-button v-if="seekobj.MsjBILLCODE" type="primary" @click="packageExport('person')">人员信息导出</el-button>
					<el-button v-else type="info"  >人员信息导出</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 数据列表 -->
		<div>
			<el-table :data="tableobj.list" style="width: 100%" highlight-current-row @current-change="handleCurrentChange" v-loading="tableobj.loading">
				<!--<el-table-column type="selection" width="55"></el-table-column>-->
				<el-table-column prop="orderID" label="订单id" min-width="150px"></el-table-column>
				<el-table-column prop="MsjBILLCODE" label="单据号" min-width="140px"></el-table-column>
				<el-table-column prop="DWDM" label="单位代码" min-width="100px"></el-table-column>
				<el-table-column prop="DWMC" label="单位名称" min-width="160px"></el-table-column>
				<el-table-column prop="YWYDM" label="业务员" min-width="100px"></el-table-column>
				<el-table-column prop="YWYXM" label="制单人"></el-table-column>
				<el-table-column label="状态" min-width="100px">
					<template slot-scope="scope">
						<el-popover v-if="scope.row.ShowStatus" trigger="hover" placement="top">
							<p>{{ scope.row.ShowStatus }}</p>

							<div slot="reference" class="name-wrapper">
								{{STATUSchange(scope.row.Status) }}
							</div>
						</el-popover>
						<div v-if="!scope.row.ShowStatus" class="name-wrapper">
							{{STATUSchange(scope.row.Status) }}
						</div>

					</template>
				</el-table-column>
				<el-table-column label="登记时间" min-width="150px">
					<template slot-scope="scope">
						{{CreatedAtchange(scope.row.createdAt)}}
					</template>
				</el-table-column>
				<el-table-column label="付款方式" min-width="100px">
					<template slot-scope="scope">
						{{FKFSchange(scope.row.FKFS) }}
					</template>
				</el-table-column>
				<el-table-column label="取报告方式" min-width="100px">
					<template slot-scope="scope">
						{{ZXFWchange(scope.row.ZXFW) }}
					</template>
				</el-table-column>
				<!--<el-table-column prop="YWY_ZG" label="内勤审核人" min-width="100px"></el-table-column>
				<el-table-column prop="YWY_ZG_SHSJ" label="内勤审核时间" min-width="110px"></el-table-column>
				<el-table-column prop="LCDJR" label="财务审核人" min-width="100px"></el-table-column>
				<el-table-column prop="ZXWCSJ" label="财务审核时间" min-width="110px"></el-table-column>-->
				<el-table-column label="操作" fixed="right" min-width="100px">
					<!--<template v-if="STATUSchange(scope.row.Status)!='审核通过'" slot-scope="scope">
						<el-button size="mini" type="text" @click="gotoOBD(scope.row)">查看</el-button>
						<div></div>
						<el-button size="mini" type="text" v-if="role!='内勤'&&'财务'" @click="passverification(scope.row)">通过审核</el-button>
						<div></div>
						<el-button size="mini" type="text" v-if="role!='内勤'&&'财务'" @click="Refusetoreview(scope.row)">拒绝审核</el-button>
					</template>-->
					<template slot-scope="scope">
						<div v-if="STATUSchange(scope.row.Status)=='审核通过'||STATUSchange(scope.row.Status)=='审核拒绝'">
							<el-button size="mini" type="text" @click="gotoOBD(scope.row)">查看</el-button>
							<div></div>
							<el-button size="mini" type="text" v-if="role!='内勤'&&'财务'" @click="passverification(scope.row)">通过审核</el-button>
							<div></div>
							<el-button size="mini" type="text" v-if="role!='内勤'&&'财务'" @click="Refusetoreview(scope.row)">拒绝审核</el-button>
						</div>
						<div v-if="STATUSchange(scope.row.Status)!='审核通过'&&STATUSchange(scope.row.Status)!='审核拒绝'">
							<el-button size="mini" type="text" @click="gotoOBD(scope.row)">查看</el-button>
							<div></div>
							<el-button size="mini" type="text" @click="passverification(scope.row)">通过审核</el-button>
							<div></div>
							<el-button size="mini" type="text" @click="Refusetoreview(scope.row)">拒绝审核</el-button>
						</div>

					</template>
				</el-table-column>
			</el-table>
			<div style="height:30px;margin-top:20px;">
				<el-pagination style="float:right" @size-change="tablesizechange" @current-change="tablepagechange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
				</el-pagination>
			</div>
		</div>

		<!-- 提交审核弹窗 -->
		<div>
			<el-dialog title="订单审核" :visible.sync="TJSHobj.isshow" width="600px">
				<el-form :model="TJSHobj.msg" label-position='right' label-width="200px" size="medium">
					<el-form-item label="单据号：">
						{{TJSHobj.msg.orderID}}
					</el-form-item>
					<!-- <el-form-item label="下任审核人业务员代码：" v-if="TJSHobj.msg.FlowRoles&&TJSHobj.msg.FlowRoles.length!=TJSHobj.msg.Progress+1">
            <el-select v-model="NextYWYXM" placeholder="" style="width:200px" placeholder="请选择审核人">
              <el-option v-for="item in YWYList" :label="item.YWYXM" :key="item.YWYDM" :value="item.YWYXM"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下任审核人业务员代码：" v-if="TJSHobj.msg.FlowRoles&&TJSHobj.msg.FlowRoles.length!=TJSHobj.msg.Progress+1">
            {{NextYWYDM}}
          </el-form-item> -->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="TJSHobj.isshow = false">取 消</el-button>
					<el-button type="primary" @click="confirmAddAudit()">确 定</el-button>
				</div>
			</el-dialog>
		</div>

	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				role: '',
				YWYList: [],
				NextYWYXM: "",
				NextYWYDM: "",
				TJSHobj: {
					msg: {},
					isshow: false
				},
				usermsg: "",
				seekobj: {
					passStatus:0,
					MsjBILLCODE: '',
					todo: true,
					Status: -1,
					DWMC: "",
					data3: "",
					TimeHorizon: "",
					data5: "",
					pageindex: 1,
					pagesize: 10
				},
				tableobj: {
					list: [],
					loading: "",
					total: 0
				}
			};
		},
		mounted() {
			this.usermsg = this.$store.getters.getRoleInfo;
			this.role = this.$store.getters.getrolemsg
			console.log(this.usermsg)
			console.log(this.role)
			this.GetOrderList();
		},
		methods: {
			handleCurrentChange(val) {
				console.log(555555555555)
				this.seekobj.MsjBILLCODE=val.MsjBILLCODE
				this.seekobj.passStatus=val.Status
				console.log(val);

			},
			exportEXcel(Interface) {
				console.log(Interface);
				var body = {
					MsjBILLCODE: this.seekobj.MsjBILLCODE,

				};

				this.$network3
					.get(Interface, body)
					.then(res => {
						console.log(res);
						if(res.code == 200) {
							this.$message.success("导出成功");
							console.log(res.data);
							var downloadURL=this.$parent.$parent.$parent.weburl_hb + res.data;
							console.log(downloadURL);
//							  window.open(this.$parent.$parent.$parent.weburl  + res.data.url);
							let a = document.createElement("a");
							//  console.log(require("../assets/qrcode.png"));
							a.href = downloadURL; // href链接指向的地址
							a.download = downloadURL; // 下载的的名称
							a.click(); // 触发a标签的单击事件
						} else {
							this.$message.error(res.msg);
						}
					})
					.catch(err => {
						console.log(err);
						this.$message.error(err.msg);
					});
			},
			packageExport(val) {
				if(this.seekobj.MsjBILLCODE) {
					if(this.seekobj.passStatus=="1"){
						if(val=="package"){
							this.exportEXcel("/mnoracle/msj/exportDetail");
						}else if(val=="person"){
							this.exportEXcel("/mnoracle/msj/exportGuest");
						}
					}else{
						this.$message.error("订单未审核通过，请审核通过后进行导出操作");
					}


				}else{
					this.$message.error("请选择订单");
				}

			},
			checkBoxChange() {

				this.seekbtn();
			},
			tablesizechange(val) {
				console.log(val);
				this.seekobj.pagesize = val;
				this.seekobj.pageindex = 1;
				this.GetOrderList();
			},
			tablepagechange(val) {
				console.log(val);
				this.seekobj.pageindex = val;
				this.GetOrderList();
			},
			seekbtn() {
				this.seekobj.pageindex = 1;
				this.GetOrderList();
			},
			confirmAddAudit() {
				var body = {
					id: this.TJSHobj.msg.id,
					//					uid:"002"
					uid: this.$store.getters.getRoleInfo.MNId
					// ID: this.TJSHobj.msg.ID,
					// YWYDM: this.usermsg.LinkMan,
					// NextYWYDM: this.NextYWYDM,
					// NextYWYXM: this.NextYWYXM,
					// Remark: ""
				};
				// if (
				//   this.TJSHobj.msg.FlowRoles &&
				//   this.TJSHobj.msg.FlowRoles.length == this.TJSHobj.msg.Progress + 1
				// ) {
				//   body.NextYWYDM = "";
				//   body.NextYWYXM = "";
				// } else {
				//   if (!this.NextYWYXM || this.NextYWYXM == "") {
				//     this.$message.error("请选择审核业务员");
				//     return;
				//   }
				// }
				this.$network3
					.post("/mnoracle/orderAudit/accept", body)
					.then(res => {
						console.log(res);
						if(res.code == 200) {
							this.$message.success(res.msg);
							this.TJSHobj.isshow = false;
							this.GetOrderList();
						} else {
							this.$message.error(res.msg);
						}
					})
					.catch(err => {
						console.log(err);
						this.$message.error(err.msg);
					});
			},
			CreatedAtchange(time) {
				var date = new Date(time * 1000);
				return(
					date.toLocaleDateString().replace(/\//g, "-") +
					" " +
					date.toTimeString().substr(0, 8)
				);
			},
			passverification(row) {
				console.log(row);
				this.TJSHobj.isshow = true;
				this.TJSHobj.msg = row;
				// this.NextYWYXM = "";
				// this.NextYWYDM = "";
				// this.FindYWYByRoleID();
			},
			FindYWYByRoleID() {
				if(
					this.TJSHobj.msg.FlowRoles &&
					this.TJSHobj.msg.FlowRoles.length == this.TJSHobj.msg.Progress + 1
				) {
					return;
				}
				this.$network3
					.get("/mnoracle/FindYWYByRoleID", {
						RoleID: this.TJSHobj.msg.FlowRoles[this.TJSHobj.msg.Progress + 1].ID
					})
					.then(res => {
						console.log(res);
						if(res.code == 200) {
							this.YWYList = res.data;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			Refusetoreview(row) {
				console.log(row);
				this.$confirm("是否拒绝此单通过审核?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.$network3
							.post("/mnoracle/orderAudit/reject", {
								id: row.id,
								uid: this.$store.getters.getRoleInfo.MNId
								// ID: row.ID,
								// YWYDM: this.usermsg.LinkMan,
								// Remark: ""
							})
							.then(res => {
								console.log(res);
								if(res.code == 200) {
									this.GetOrderList();
									this.$message.success(res.msg);
								} else {
									this.$message.error(res.msg);
								}
							})
							.catch(err => {
								console.log(err);
								this.$message.error(err.msg);
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			STATUSchange(val) {
				switch(val) {
					case 0:
						return "审核中";
						break;
					case 1:
						return "审核通过";
						break;
					case 2:
						return "审核拒绝";
						break;
					default:
						break;
				}

        // switch(val) {
        //   case 0:
        //     return "未审核";
        //     break;
        //   case 1:
        //     return "审核中";
        //     break;
        //   case 2:
        //     return "审核通过";
        //     break;
        //   case 3:
        //     return "审核拒绝";
        //     break;
        //
        //   default:
        //     break;
        // }
			},
			FKFSchange(val) {
				switch(val) {
					case "1":
						return "套餐挂账+加选项自付费";
						break;
					case "2":
						return "全自付费";
						break;
					case "3":
						return "全挂账";
						break;
					case "4":
						return "套餐用销售卡+加选项自付费";
						break;
					case "5":
						return "全用销售卡";
						break;

					default:
						break;
				}
			},
			ZXFWchange(val) {
				switch(val) {
					case "1":
						return "送达单位";
						break;
					case "2":
						return "自取";
						break;
					case "3":
						return "邮寄";
						break;
					case "4":
						return "网络邮寄";
						break;
					case "5":
						return "给业务员";
						break;
					case "6":
						return "个人邮寄（到付）";
						break;
					case "7":
						return "单位邮寄（到付）";
						break;

					default:
						break;
				}
			},
			fmmmdatatime(time) {
				console.log(time);

				var date = new Date(time);
				console.log(date);
				console.log(date.getFullYear());
				console.log(date.getMonth());
				console.log(date.getDate());

				var date_value =
					String(date.getFullYear()) +
					this.xiaoyushi(date.getMonth() + 1) +
					this.xiaoyushi(date.getDate());
				return date_value;
			},
			xiaoyushi(str) {
				if(str < 10) {
					return "0" + str;
				} else {
					return str;
				}
			},
			// 02-获取订单列表
			GetOrderList() {
				console.log(this.usermsg.MNId)
				var body = {
					// OPYWYDM: this.usermsg.LinkMan,
					// Status: this.seekobj.Status,
					// DWMC: this.seekobj.DWMC,
					// StartAt: "",
					// EndAt: "",
					uid: this.usermsg.MNId,
					//					uid: '002',
					s: this.seekobj.Status,
					todo: this.seekobj.todo,
					page: this.seekobj.pageindex,
					size: this.seekobj.pagesize
				};
				// if (
				//   this.seekobj.TimeHorizon &&
				//   Array.isArray(this.seekobj.TimeHorizon) &&
				//   this.seekobj.TimeHorizon.length > 1
				// ) {
				//   body.StartAt = this.seekobj.TimeHorizon[0];
				//   body.EndAt = this.seekobj.TimeHorizon[1];
				// }
				this.$network3
					.post("/mnoracle/orderAudit/find", body)
					.then(res => {
						console.log(res);
						if(res.code == 200) {

							this.tableobj.total = res.data.count;
							var taocanTemp = [];
							console.log(res.data.data)
							// var taocanTemp = res.data.additional.concat();
							for(var i = 0; i < res.data.data.length; i++) {
								const newObj = JSON.parse(JSON.stringify(res.data.data[i]));
								taocanTemp.push(newObj)

							}

							console.log(taocanTemp);
							var list = [];
							taocanTemp.forEach(item => {
								var obj = {
									id: item.Oas.id,
									orderID: item.Oas.orderID,
									MsjBILLCODE: item.Ord.MsjBILLCODE, //单据号
									DWDM: item.Ord.DWDM, //单位代码
									DWMC: item.Ord.DWMC, //单位名称
									YWYDM: item.Ord.YWYDM, //业务员
									YWYXM: item.Ord.ZRHS, //制单人
                  Status: item.Oas.status, //状态
									auditStatus: item.Ord.auditStatus, //状态
									//									Status:1,//状态

									createdAt: item.Oas.createdAt, //登记时间
									//									Status:item.Oas.orderID,//登记时间
									FKFS: item.Ord.FKFS, //付款方式
									ZXFW: item.Ord.ZXFW, //取报告方式
									YWY_ZG: item.Ord.YWY_ZG, //内勤审核人
									YWY_ZG_SHSJ: item.Ord.YWY_ZG_SHSJ, //内勤审核时间
									LCDJR: item.Ord.LCDJR, //财务审核人
									ZXWCSJ: item.Ord.ZXWCSJ, //财务审核时间
									logs: item.Oas.logs, //操作日志数组
									curNode: item.Oas.curNode, //审核中
									//									curNodeMmembers:item.Oas.curNode.members||[],
									ShowStatus: ''

								}
								list.push(obj)

							})
							if(list.length > 0) {
								for(var i = 0; i < list.length; i++) {
									if(list[i].logs.length > 0) {
										for(var j = 0; j < list[i].logs.length; j++) {
											if(list[i].logs[j].type === 0) {
												if(list[i].logs[j].userName) {
													list[i].ShowStatus = list[i].logs[j].userName + "  审核通过"
												}

											} else if(list[i].logs[j].type === 1) {
												if(list[i].logs[j].userName) {
													list[i].ShowStatus = list[i].logs[j].userName + "  审核拒绝"
												}

											} else if(list[i].logs[j].type === 1) {

												list[i].ShowStatus = ""
											}

										}
									}

								}
								console.log(list);
								for(var i = 0; i < list.length; i++) {

									//							       	console.log(typeof list[i].curNode);

									if(list[i].curNode) {
										//											console.log(list[i].curNode);
										for(var j = 0; j < list[i].curNode.members.length; j++) {
											if(list[i].curNode.members.length > 1) {
												if(list[i].ShowStatus.length > 0) {
													list[i].ShowStatus = list[i].ShowStatus + "," + list[i].curNode.members[0].userName + "  ...审核中"
												} else {
													list[i].ShowStatus = list[i].curNode.members[0].userName + "...审核中"
												}

											} else {
												if(list[i].ShowStatus.length > 0) {
													list[i].ShowStatus = list[i].ShowStatus + "," + list[i].curNode.members[0].userName + "  审核中"
												} else {
													list[i].ShowStatus = list[i].curNode.members[0].userName + "  审核中"
												}
											}

										}
									} else {

									}

								}

							}

							this.tableobj.list = list;
							console.log(this.tableobj.list);

						} else {
							this.tableobj.list = [];
							this.tableobj.total = 0;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			gotoOBD(row) {
				this.$router.push(
					"/AuditManagement/AmOrderBasicDetails?MsjBILLCODE=" + row.orderID+"&Status=" +row.Status+"&id=" +row.id
				);
			}
		},
		watch: {
			NextYWYXM(nvl, ovl) {
				console.log(nvl, ovl);
				this.YWYList.map(item => {
					console.log(item);

					if(item.YWYXM == nvl) {
						this.NextYWYDM = item.YWYDM;
					}
				});
			}
		},
		computed: {}
	};
</script>
<style lang="scss">

</style>
