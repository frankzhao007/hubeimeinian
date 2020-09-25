<template>
  <div style="margin:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="单位代码：">
          <el-input v-model="seekobj.DWDM" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="seekobj.DWMC" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="seekobj.LXR" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="seekobj.LXDH" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="登记人：">
          <el-input v-model="seekobj.DJR" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="业务员代码：">
          <el-input v-model="seekobj.YWYDM" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekobj.timer" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="resetbtn">重 置</el-button>
          <el-button type="primary" @click="seekbtn">搜 索</el-button>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button type="primary" @click="addunit()">新增单位</el-button>
          <el-button type="primary" @click="importProject">导入单位</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="DWDM" label="单位代码"></el-table-column>
        <el-table-column prop="DWMC" label="单位名称"></el-table-column>
        <el-table-column prop="LXR" label="联系人"></el-table-column>
        <el-table-column prop="LXDH" label="联系电话"></el-table-column>
        <el-table-column prop="DJR" label="登记人"></el-table-column>
        <el-table-column prop="DJSJ" label="登记时间"></el-table-column>
        <el-table-column prop="YWYDM" label="业务员代码"></el-table-column>
        <el-table-column prop="DW_PASSWORD" label="单位密码"></el-table-column>
        <el-table-column prop="OP_DATETIME" label="操作时间"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editunitbtn(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="delunitbtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="pagesizechange" @current-change="pageindexchange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>
    
    
    <!-- 项目导入 -->
		<div class="ygplcz">
			<el-dialog title="单位批量导入" :visible.sync="dialogImportEmployee" width="800px">

				<div v-loading="updataobj.isshow" :element-loading-text="updataobj.loadingtext" element-loading-spinner="el-icon-loading">
					<!--<span>选择企业：</span>
              <el-select :disabled="ygplczobj.drobj.active!=0" aria-label="选择企业" size="small" v-model="ygplczobj.drobj.company" filterable>
                <el-option v-for="(item,index) in ygplczobj.companyList" :key="index" :label="item" :value="item"></el-option>
              </el-select>-->
					<el-steps style="margin-top:10px" :active="ygplczobj.drobj.active" finish-status="success" process-status="finish" simple>
						<el-step title="上传文件" icon="el-icon-upload"></el-step>
						<el-step title="导入完成" icon="el-icon-s-platform"></el-step>
						<!--<el-step title="导入完成" icon="el-icon-success"></el-step>-->
					</el-steps>
					<div v-if="ygplczobj.drobj.active==0">
						<el-card>
							<div class="box-card">
								<div>
									<i style="font-size:50px;margin:10px" class="el-icon-my-download "></i>
								</div>
								<div style="width:100%;margin-left:20px">
									<div style="">
										<div style="font-size:18px;">请按照模板填写信息后导入</div>
										<div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
									</div>
									<el-button class="carbtn" type="primary" size="small" @click="DownloadTemplate">下载模板</el-button>
								</div>
							</div>
						</el-card>
						<el-card>
							<div class="box-card">
								<div>
									<i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
								</div>
								<div style="width:100%;margin-left:20px">
									<div style="">
										<div style="font-size:18px;">上传数据</div>
										<div style="font-size:14px; color:#9E9E9E">仅支持xlsx或xls（即Excel格式），文件大小≤4M。</div>
										<div style="font-size:14px; color:#3A83FF">{{filename}} <i v-if="filename" @click="delfile" style="cursor: pointer;" class="el-icon-error"></i></div>
									</div>
									<el-button class="carbtn" type="primary" size="small" @click="returnAllUsers">上传文件</el-button>
								</div>
							</div>
						</el-card>
						<div style="text-align:center;margin-top:20px">
							<el-button type="primary" @click="verifyImport">确认导入</el-button>
						</div>
					</div>
					<div v-if="ygplczobj.drobj.active==1">
						<el-card>
							<div class="box-card">
								<div style="width:100%;margin-left:20px">
									<div style="">
										<div style="font-size:16px;">正确数据条数</div>
										<div style="font-size:14px; color:#4CCA32 ">{{goodXlsx.length-badXlsx.length}}条</div>
									</div>
								</div>
							</div>
						</el-card>
						<el-card>
							<div class="box-card">
								<div style="width:100%;margin-left:20px">
									<div style="">
										<div style="font-size:16px;">异常数据条数</div>
										<div style="font-size:14px; color:#F63649  ">{{badXlsx.length}}条</div>
									</div>
									<!--<el-button class="carbtn" type="primary" size="small" @click="downloadfaildata">下载异常数据</el-button>-->
								</div>
							</div>
						</el-card>
						<div style="margin-top:20px">
							<el-button type="primary" @click="okBtn">批量导入完成</el-button>
							<el-button style="float:right" @click="resetupload">重新上传</el-button>
						</div>
						<div style="margin-top: 20px;" v-if="badXlsx.length>0">
							无效数据：
							<div style="text-align: left;position: relative;margin-top: 20px;" v-for="item in badXlsx">
								<!--<div style="float:left;margin-left: 0px; ">门店编码：{{item.localCenterCode||"无门店编码"}}</div>-->

								<div style=" float:left;color: red;margin-left: 30px;">错误提示：{{item}}</div>
								<div style="clear: both;"></div>
							</div>
						</div>

					</div>
					<!--<div v-if="ygplczobj.drobj.active==2">
						<div style="text-align:center">
							<div style="font-size:28px;color:#00000;margin:20px">批量导入完成</div>
							<div style="font-size:16px;color:#4CCA32;margin-bottom:20px">成功导入数量{{goodXlsx.length-badXlsx.length}}条</div>
							<el-button type="primary" style="margin:20pxl.;padding:15px 50px" @click="okBtn()">完 成</el-button>
						</div>
					</div>-->
				</div>

			</el-dialog>
		</div>
		<input ref="inputer" id="upload" style="display:none" type="file" @change="importfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    
  </div>
</template>
<script>
export default {
  data() {
    return {
    	// 上传表格
				goodXlsx: [],
				badXlsx: [],
				errorFile: false,
				rightWord: false,
				filename: '',
				file: '',
				updataobj: {
					isshow: false,
					errshow: false,
					errdata: [],
					loadingtext: ''
				},

				updataobj: {
					isshow: false,
					errshow: false,
					errdata: [],
					loadingtext: ''
				},
				dialogImportEmployee: false, //批量导入员工弹窗
				//				time56:'2020-05-14 00:00:00',
				ygplczobj: {
					isshow: false,
					activeName: "first",
					companyList: [],
					drobj: {
						company: "", //企业名称，
						fileName: "", //文件名称
						active: 0, //当前步骤
						yglist: [],
						drResult: "",
						loading: false,
						loadingtext: ""
					},

				},
      seekobj: {
        DWDM: "",
        DWMC: "",
        LXR: "",
        LXDH: "",
        DJR: "",
        YWYDM: "",
        timer: "",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      }
    };
  },
  mounted() {
    this.fuzzyFirmMn();
  },
  methods: {
  	closeimport() {
				this.$refs.inputer.value = ''
				this.filename = ''
				this.goodXlsx = []
				this.badXlsx = []
				this.errorFile = false
				this.rightWord = false
				this.dialogImportEmployee = false
			},
			okBtn() {
				this.dialogImportEmployee = false
				this.closeimport()
				this.ygplczobj.drobj.active = 0;
				this.fuzzyFirmMn();
				console.log(this.ygplczobj.drobj.active)
			},
			//重新上传
			resetupload() {
				//    var nametemp = "";
				//    switch (this.ygplczobj.activeName) {
				//      case "first":
				//        nametemp = "drobj";
				//        break;
				//      case "second":
				//        nametemp = "xgobj";
				//        break;
				//      case "third":
				//        nametemp = "scobj";
				//        break;
				//      default:
				//        break;
				//    }
				this.ygplczobj.drobj.active -= 1;
			},
			// 导入请求
			confirmimport() {

				var that = this;
				if(that.badXlsx.length > 0) {
					this.$message.error('格式错误请重新上传！')
					return;
				}
				//				if(this.UploadForm.company == "") {
				//					this.$message.error("请选择企业名称");
				//					return;
				//				}
				console.log(this.goodXlsx)
				if(this.goodXlsx.length == 0) {
					this.$message.error('请上传文件')
					return
				}

				// console.log(this.goodXlsx);
				var temp = JSON.parse(JSON.stringify(this.goodXlsx))
				// for (let i = 0; i < temp.length; i++) {
				//   const element = temp[i];
				//   element.phone = JSON.stringify(element.phone);
				// }
				console.log(temp)
				var body = {
					msjId: this.paiqiID,
					storeId: this.storeId,
					formInfos: temp
				}
				this.updataobj.isshow = true
				this.updataobj.loadingtext = '上传员工数据至服务器，请耐心等待...'
				this.$api
					.post('/MSJschedule/importSJschedulesData', body)
					.then(res => {
						that.ygplczobj.drobj.active += 1;
						this.updataobj.isshow = false
						console.log(res)
						//						this.$message.success('上传成功！')
						//						this.closeimport()

						this.fuzzyFirmMn();
					})
					.catch(err => {
						this.updataobj.isshow = true
						console.log('err', err)
						console.log(err.data)
						this.updataobj.errdata = err.data || []
						if(this.updataobj.errdata.length > 0) {
							this.updataobj.errshow = true

						} else {
							this.$message.error(err.msg)
						}
						// var str = "";
						// for (let i = 0; i < err.data.length; i++) {
						//   const element = err.data[i];
						//   str =
						//     str +
						//     element.Num +
						//     " " +
						//     element.identityRemarks +
						//     " " +
						//     element.phoneRemarks +
						//     " " +
						//     "<br/>";
						// }

						// this.$msgbox({
						//   title: "上传失败员工数据",
						//   dangerouslyUseHTMLString: true,
						//   message: str,
						//   type: "error"
						// });
						// this.$message({
						//   dangerouslyUseHTMLString: true,
						//   message: str,
						//   type: "error"
						// });
					})
			},
			//删除文件
			delfile() {
				//				var nametemp = "";
				//				switch(this.ygplczobj.activeName) {
				//					case "first":
				//						nametemp = "drobj";
				//						break;
				//					case "second":
				//						nametemp = "xgobj";
				//						break;
				//					case "third":
				//						nametemp = "scobj";
				//						break;
				//					default:
				//						break;
				//				}
				this.filename = "";
				this.goodXlsx = [];
			},
			importfxx(e) {
				let _this = this
				_this.updataobj.isshow = true
				_this.updataobj.loadingtext = '解析数据中，请耐心等待...'
				console.log(event)
				var myevent = event
				setTimeout(() => {
					// _this.$refs.inputer.value = "";
					let inputDOM = _this.$refs.inputer
					// 通过DOM取文件数据
					console.log(myevent)
					_this.file = myevent.target.files[0]
					console.log(_this.file)
					_this.filename = _this.file.name
					var rABS = false //是否将文件读取为二进制字符串
					var f = _this.file
					var reader = new FileReader()
					//if (!FileReader.prototype.readAsBinaryString) {
					FileReader.prototype.readAsBinaryString = function(f) {
						var binary = ''
						var rABS = false //是否将文件读取为二进制字符串
						var wb //读取完成的数据
						var outdata
						var reader = new FileReader()
						reader.onload = function(e) {
							var bytes = new Uint8Array(reader.result)
							var length = bytes.byteLength
							for(var i = 0; i < length; i++) {
								binary += String.fromCharCode(bytes[i])
							}
							var XLSX = require('xlsx')
							if(rABS) {
								wb = XLSX.read(btoa(fixdata(binary)), {
									//手动转化
									type: 'base64'
								})
							} else {
								wb = XLSX.read(binary, {
									type: 'binary'
								})
							}
							outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) //outdata就是你想要的东西
							console.log('outdata', outdata)
							//							outdata.splice(0, 1)

							function getdateOfBirth(value1) {
								if(value1) {
									var y = value1.substring(6, 10)
									var m = value1.substring(10, 12)
									var d = value1.substring(12, 14)
									var days = y + '-' + m + '-' + d
									return days
								} else {
									var days = ''
									return days
								}
							}

							function standardization(value1) {
								if(value1 && value1.length == 8) {
									var y = value1.substring(0, 4)
									var m = value1.substring(4, 6)
									var d = value1.substring(6, 8)
									var days = y + '-' + m + '-' + d
									console.log(days)
									return days
								} else {
									var days = ''
									return days
								}
							}

							outdata.forEach(e => {
																var de = {
																	DWDM: String(e.单位代码 || ''),
																	DWMC: String(e.单位名称 || ''),
																  DWDZ: String(e.单位地址 || ''),
																  YZBM: String(e.邮政编码 || ''),
																  LXR: String(e.联系人 || ''),
																  LXDH: String(e.联系电话 || ''),
																  DJR: String(e.登记人 || ''),
																  DJSJ: String(e.登记时间 || ''),
																  YWYDM: String(e.业务员代码 || ''),
																  DW_PASSWORD: String(e.单位密码 || ''),

																}
//																if(e.预约日期) {
//																	console.log("预约日期", e.预约日期);
//																	de.date = _this.getFormatDate(
//																		_this.exceldataParse(e.预约日期)
//																	);
//																}
								// console.log(de)

								_this.goodXlsx.push(de)
								//								if(de.localCenterCode) {
								//									 
								//
								//									_this.goodXlsx.push(de)
								//									 
								//									
								//									console.log(_this.goodXlsx)
								//								} else {
								//									_this.badXlsx.push(de)
								//									 
								//								}
								_this.rightWord = true
							})
							console.log("预约日期", e.预约日期);
							//							_this.verifyImport();
							_this.updataobj.isshow = false
							_this.updataobj.loadingtext = ''
						}
						reader.readAsArrayBuffer(f)
					}
					if(rABS) {
						reader.readAsArrayBuffer(f)
					} else {
						reader.readAsBinaryString(f)
					}
				}, 100)
			},
			// 校验导入请求
			verifyImport() {
				var that = this;
				//				if(this.UploadForm.company == "") {
				//					this.$message.error("请选择企业名称");
				//					return;
				//				}
				console.log(this.goodXlsx)
				if(this.goodXlsx.length == 0) {
					this.$message.error('请上传文件')
					return
				}

				// console.log(this.goodXlsx);
				var goodXlsxTemp = [];
				//				this.goodXlsx.forEach(e => {
				// 
				//								var de = {
				//									localCenterCode: e.localCenterCode.toString(),
				//									date: e.date.toString(),
				//									numberMorning: Number(e.numberMorning),
				//									numberAfternoon: Number(e.numberAfternoon),
				// 
				//
				//								}
				//							 goodXlsxTemp.push(de)
				//							})

				var temp = JSON.parse(JSON.stringify(this.goodXlsx))
				// for (let i = 0; i < temp.length; i++) {
				//   const element = temp[i];
				//   element.phone = JSON.stringify(element.phone);
				// }
				console.log(temp)
				var body = temp
 
//				var body = {
////					genre: "1",
////					SETMEALID: this.SETMEALID,
//					items: temp
//				}
				this.updataobj.isshow = true
				this.updataobj.loadingtext = '数据校验中，请耐心等待...'
				this.$network3
					.post('/mnoracle/msj/addFirmMn', body)
					.then(res => {
						that.updataobj.isshow = false
						console.log(res)

						console.log('res', res)
						console.log(res.data)
						that.badXlsx = res.data || []
						that.updataobj.errdata = res.data || []
						if(that.updataobj.errdata.length > 0) {
							that.updataobj.errshow = true
							that.errorFile = true
						} else {
							//							that.$message.error(res.msg)
						}
						that.updataobj.isshow = false
						that.ygplczobj.drobj.active += 1;
						console.log(res)
						console.log(that.ygplczobj)
						console.log(that.updataobj.errdata)

					})
					.catch(err => {
						//						this.updataobj.isshow = false
						console.log('err', err)
						console.log(err.data)

						this.updataobj.errdata = err.data || []
						if(this.updataobj.errdata.length > 0) {
							this.updataobj.errshow = true

						} else {
							this.$message.error(err.msg)
						}

						// var str = "";
						// for (let i = 0; i < err.data.length; i++) {
						//   const element = err.data[i];
						//   str =
						//     str +
						//     element.Num +
						//     " " +
						//     element.identityRemarks +
						//     " " +
						//     element.phoneRemarks +
						//     " " +
						//     "<br/>";
						// }

						// this.$msgbox({
						//   title: "上传失败员工数据",
						//   dangerouslyUseHTMLString: true,
						//   message: str,
						//   type: "error"
						// });
						// this.$message({
						//   dangerouslyUseHTMLString: true,
						//   message: str,
						//   type: "error"
						// });
					})
			},
			//批量导入员工数据
			importProject() {
				//    this.UploadForm.company = "";
				//    if (this.$store.getters.getRoleInfo.AccountType == "3") {
				//      this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
				//    }
				this.dialogImportEmployee = true
			},
			returnAllUsers() {
				this.$refs.inputer.value = ''
				this.filename = ''
				this.goodXlsx = []
				this.badXlsx = []
				this.errorFile = false
				this.rightWord = false
				document.getElementById('upload').click()
			},
			// 下载模板
			DownloadTemplate() {
				// console.log(
				//   this.$parent.$parent.$parent.weburl +
				//     "/film/web/downloadXlsx?xlsxName=EmployeeTemplate.xlsx"
				// );
				// window.open(
				//   this.$parent.$parent.$parent.weburl +
				//     "/film/web/downloadXlsx?xlsxName=EmployeeTemplate.xlsx"
				// );

				//				var body = {
				//
				//
				//						}
				//						this.$api
				//							.get('/xinguan/DownLoad', body)
				//							.then(res => {
				//								console.log(res)
				//								if(res.code == 200) {
				//
				//
				//								}
				//							})
				//							.catch(err => {
				//								console.log(err)
				//							})

				var xhr = new XMLHttpRequest()
				var str = ''
				console.log(this.$parent.$parent.$parent.weburl_hb)
				var urlWithoutCom = this.$parent.$parent.$parent.weburl_hb
//				var urlCom = urlWithoutCom.substring(0, 26)
				console.log(urlWithoutCom)
				window.open(urlWithoutCom+"/mnoracle/static/单位(模板).xlsx")
				//				xhr.open('GET', urlCom + '/mnoracle/static/项目导入模板.xlsx', true) //也可以使用POST方式，根据接口
				//				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
				//				xhr.responseType = 'blob' //返回类型blob
				//				xhr.onload = function() {
				//					console.log(11111111111)
				//					//定义请求完成的处理函数
				//					if(this.status === 200) {
				//						console.log(2222222222222)
				//						var blob = this.response
				//						if(blob.size > 0) {
				//							var reader = new FileReader()
				//							reader.readAsDataURL(blob) // 转换为base64，可以直接放入a标签href
				//							reader.onload = function(e) {
				//								// 转换完成，创建一个a标签用于下载
				//								var a = document.createElement('a')
				//								var newDate = new Date()
				//								a.download = '上传导入预约信息模板' + '.xlsx'
				//								a.href = e.target.result
				//								document.body.appendChild(a)
				//								// $("body").append(a); // 修复firefox中无法触发click
				//								a.click()
				//								// $(a).remove();
				//								a.remove()
				//								// window.location.reload();
				//							}
				//						} else {
				//							// window.location.reload();
				//						}
				//					}
				//				}
				//				xhr.send()
			},

    editunitbtn(row){
      console.log(row);
         this.$router.push("/DataManagement/UnitCodemsg?isadd=false&DWDM="+row.DWDM);
    },
    delunitbtn(row) {
      console.log(row);
      // 删除单位信息
      this.$confirm("是否删除该单位?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$network3
            .get("/mnoracle/msj/deleteFirmMn", {
              DWDM: row.DWDM
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.fuzzyFirmMn();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    resetbtn() {
      this.seekobj.DWDM = "";
      this.seekobj.DWMC = "";
      this.seekobj.LXR = "";
      this.seekobj.LXDH = "";
      this.seekobj.DJR = "";
      this.seekobj.YWYDM = "";
      this.seekobj.timer = "";
    },
    addunit() {
      this.$router.push("/DataManagement/UnitCodemsg?isadd=true");
    },
    pagesizechange(val) {
      this.seekobj.pagesize = val;
      this.seekobj.pageindex = 1;
      this.fuzzyFirmMn();
    },
    pageindexchange(val) {
      this.seekobj.pageindex = val;
      this.fuzzyFirmMn();
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.fuzzyFirmMn();
    },
    fuzzyFirmMn() {
      var body = {
        DWDM: this.seekobj.DWDM,
        DWMC: this.seekobj.DWMC,
        LXR: this.seekobj.LXR,
        LXDH: this.seekobj.LXDH,
        DJR: this.seekobj.DJR,
        YWYDM: this.seekobj.YWYDM,
        startTime: "",
        endTime: "",
        page: this.seekobj.pageindex,
        size: this.seekobj.pagesize
      };
      if (
        this.seekobj.timer &&
        Array.isArray(this.seekobj.timer) &&
        this.seekobj.timer.length > 1
      ) {
        body.startTime = this.seekobj.timer[0];
        body.endTime = this.seekobj.timer[1];
      }
      this.tableobj.loading = true;
      this.$network3
        .post("/mnoracle/msj/fuzzyFirmMn", body)
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            this.tableobj.loading = false;
            this.tableobj.list = res.data.firmList;
            this.tableobj.total = res.data.count;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    }
  }
};
</script>