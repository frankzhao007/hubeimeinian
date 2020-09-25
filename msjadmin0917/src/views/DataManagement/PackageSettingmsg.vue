<template>
  <div style="margin:30px">
    <div style="font-size:20px">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp新增/编辑套餐模板</span>
    </div>
    <div>
      <el-table :data="[msgobj]" style="width: 100%">
        <el-table-column prop="GROUPNAME" label="套餐名称"></el-table-column>
        <el-table-column prop="XB" label="性别">
          <template slot-scope="scope">
            <el-select v-model="scope.row.XB" placeholder="" style="width:100%" @change="UpdatePopout">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="HYZK" label="婚否">
          <template slot-scope="scope">
            <el-select v-model="scope.row.HYZK" placeholder="" style="width:100%" @change="UpdatePopout">
              <el-option label="已婚" value="01"></el-option>
              <el-option label="未婚" value="02"></el-option>
              <el-option label="通用" value="03"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="PREFERENCES" label="自选项否">
          <template slot-scope="scope">
            <el-select v-model="scope.row.PREFERENCES" placeholder="" style="width:100%" @change="UpdatePopout">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="2"></el-option>
              <el-option label="检验阳性" :value="3"></el-option>
              <el-option label="检验阴性" :value="4"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="PRICE" label="原价"></el-table-column>
      </el-table>
    </div>
    <div>
      <div style="margin:20px 0  0">
        <span style="font-size:20px;line-height:40px">套餐明细</span>
        <span style="margin-left:20px">总计：{{tableobj2.total||0}}&nbsp&nbsp项</span>
        <span style="margin-left:20px">原价：{{msgobj.PRICE}}&nbsp&nbsp元</span>
        <div style="float:right">
          <el-button type="primary" @click="selectxmobjbtn" :disabled="tableobj2.loading">选择体检项目</el-button>
          <el-button type="primary" @click="importProject" :disabled="tableobj2.loading">项目导入</el-button>
          <el-button type="primary" @click="alldelbtn" :disabled="tableobj2.loading">批量删除</el-button>
        </div>
      </div>
    </div>

    <!-- 数据列表2 套餐明细 -->
    <div>
      <el-table :row-key="getRowKeys" :data="tableobj2.list" style="width: 100%" v-loading="tableobj2.loading" max-height="500px" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :reserve-selection="true">
        </el-table-column>
        <el-table-column label="序号" width="80px">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="项目代码" width="180px">
          <template slot-scope="scope">
            {{scope.row.ITEM_ID}}
          </template>
        </el-table-column>
        <el-table-column prop="ITEM_NAME" label="项目名称">
        </el-table-column>
        <el-table-column prop="PRICE" label="价格" width="80px">
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delcombodetail(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="pagesizechange" @current-change="pageindexchange" :current-page="tableobj2.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj2.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj2.total">
        </el-pagination>
      </div>
    </div>

    <!-- 选择体检项目 -->
    <SelectItem :isshow="isshowselectItem" :itemFilter="itemFilter" :selectlist="selectlist" @changeisshow="listenST" @confirmselectpackage="confirmselectpackage"></SelectItem>
    
    <!-- 项目导入 -->
		<div class="ygplcz">
			<el-dialog title="项目批量导入" :visible.sync="dialogImportEmployee" width="800px">

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
							 
								<div style=" float:left;color: red;margin-left: 30px;">错误提示：第{{item}}</div>
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
import SelectItem from "./component/SelectItem";
export default {
  components: { SelectItem },
  data() {
    return {
    	// 上传表格
    	  itemFilter:true,
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
    	
    	
    	
      getRowKeys(row) {
        return row.ITEM_ID;
      },
      isshowselectItem: false,
      selectlist: [],
      SETMEALID: "",
      dimtext: "",
      ITEM_IDlist: [],
      isadd: false,
      msgobj: {
        GROUPNAME: "",
        XB: "",
        HYZK: "",
        PREFERENCES: "",
        PRICE: ""
      },
      tableobj1: {
        list: [],
        loading: false,
        total: 0
      },
      tableobj2: {
        list: [],
        loading: false,
        total: 0,
        pageindex: 1,
        pagesize: 10
      },
      SelecttableItem: []
    };
  },
  mounted() {
    console.log(this.$route.query.msgobj);
    if (this.$route.query.msgobj) {
      var temp = JSON.parse(this.$route.query.msgobj);
      this.msgobj.GROUPNAME = temp.GROUPNAME;
      this.msgobj.XB = temp.XB;
      this.msgobj.HYZK = temp.HYZK;
      this.msgobj.PREFERENCES = temp.PREFERENCES;
    }
    if (this.$route.query.isadd == "true") {
      this.isadd = true;
    } else {
      this.isadd = false;
    }
    if (this.$route.query.SETMEALID) {
      this.SETMEALID = this.$route.query.SETMEALID;
    }
    if (this.isadd == false && this.SETMEALID) {
      this.FindOneSetmeal();
    }
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
				this.FindOneSetmeal();
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

						this.FindOneSetmeal();
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
//								var de = {
//									CHECK_ITEM: String(e.项目代码 || ''),
//									DRCC: String(e.项目名称 || ''),
//								 
//									
//			 
//
//								}
//								if(e.预约日期) {
//									console.log("预约日期", e.预约日期);
//									de.date = _this.getFormatDate(
//										_this.exceldataParse(e.预约日期)
//									);
//								}
								// console.log(de)

								_this.goodXlsx.push(String(e.项目代码))
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
				var body = {
					genre: "1",
					SETMEALID: this.SETMEALID ,
					Packages: temp
				}
				this.updataobj.isshow = true
				this.updataobj.loadingtext = '数据校验中，请耐心等待...'
				this.$network3
					.post('/mnoracle/setmeal/UpdatePackageDetails', body)
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
        var urlWithoutCom=this.$parent.$parent.$parent.weburl_hb
        var urlCom=urlWithoutCom.substring(0,26)
        console.log(urlWithoutCom)
        window.open(urlWithoutCom+"/mnoracle/static/项目模板1.xlsx")
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
  	
    handleSelectionChange(row) {
      console.log(row);
      this.SelecttableItem = row;
    },
    //批量删除
    alldelbtn() {
      if (this.SelecttableItem.length > 0) {
        this.$confirm("是否删除勾选的体检项目?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.tableobj2.loading = true;
            var body = {
              genre: "2",
              SETMEALID: this.SETMEALID,
              Packages: []
            };
            this.SelecttableItem.map(item => {
              body.Packages.push(item.ITEM_ID);
            });
            this.$network3
              .post("/mnoracle/setmeal/UpdatePackageDetails", body)
              .then(res => {
                console.log(res);
                if (res.code == 200) {
                  this.tableobj2.pageindex = 1;
                  this.FindOneSetmeal();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
                this.$message.error(err.msg);
              });
          })
          .catch(() => {});
      } else {
        this.$message.error("请先勾选需要删除的体检项目！");
      }
    },
    pageindexchange(val) {
      this.tableobj2.pageindex = val;
      this.FindOneSetmeal();
    },
    pagesizechange(val) {
      this.tableobj2.pagesize = val;
      this.tableobj2.pageindex = 1;
      this.FindOneSetmeal();
    },
    UpdatePopout() {
      this.$network3
        .get("/mnoracle/setmeal/UpdatePopout", {
          SETMEALID: this.SETMEALID,
          XB: this.msgobj.XB,
          HYZK: this.msgobj.HYZK,
          PREFERENCES: this.msgobj.PREFERENCES
        })
        .then(res => {
          if (res.code == 200) {
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    listenST(data) {
      console.log(data);
      this.isshowselectItem = data;
    },
    //查询单个套餐
    FindOneSetmeal() {
      this.tableobj2.loading = true;
      this.$network3
        .get("/mnoracle/setmeal/FindOneSetmeal", {
          SETMEALID: this.SETMEALID,
          pageIndex: this.tableobj2.pageindex,
          pageSize: this.tableobj2.pagesize
        })
        .then(res => {
          this.tableobj2.loading = false;
          console.log(res);
          this.msgobj.GROUPNAME = res.data.GROUPNAME;
          this.msgobj.XB = res.data.XB;
          this.msgobj.HYZK = res.data.HYZK;
          this.msgobj.PREFERENCES = res.data.PREFERENCES;
          this.msgobj.PRICE = res.data.PRICE;
          this.tableobj2.list = res.data.PackageDetails;
          this.tableobj2.total = res.data.Packages.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加套餐
    InsertSetmeal() {
      var body = {
        GROUPNAME: this.msgobj.GROUPNAME,
        XB: this.msgobj.XB,
        HYZK: this.msgobj.HYZK,
        PREFERENCES: this.msgobj.PREFERENCES,
        Packages: []
      };
      this.tableobj2.list.map(item => {
        body.Packages.push(item.ITEM_ID);
      });
      this.tableobj2.loading = true;
      this.$network3
        .post("/mnoracle/setmeal/InsertSetmeal", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("新增模板套餐成功");
            this.$router.go(-1);
            // this.SETMEALID = res.data;
            // this.$route.query.isadd=false;
            // this.isadd=false;
            // this.FindOneSetmeal();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //修改套餐详情
    UpdatePackageDetails() {
      var body = {
        genre: "1",
        SETMEALID: this.SETMEALID,
        Packages: []
      };
      console.log(this.tableobj2.list);
      this.tableobj2.list.map(item => {
        body.Packages.push(item.ITEM_ID);
      });
      console.log(body);
      this.tableobj2.loading = true;
      this.$network3
        .post("/mnoracle/setmeal/UpdatePackageDetails", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("修改套餐详情成功！");
            this.FindOneSetmeal();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    delcombodetail(row, index) {
      console.log(row, index);
      this.$confirm("是否删除该体检项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableobj2.loading = true;
          this.$network3
            .post("/mnoracle/setmeal/UpdatePackageDetails", {
              genre: "2",
              SETMEALID: this.SETMEALID,
              Packages: [row.ITEM_ID]
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                if (
                  this.tableobj2.pageindex > 1 &&
                  this.tableobj2.list.length == 1
                ) {
                  this.tableobj2.pageindex -= 1;
                }
                this.FindOneSetmeal();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.msg);
            });
        })
        .catch(() => {});
    },
    confirmselectpackage(data) {
      console.log(data);
      this.tableobj2.list = data || [];
      if (this.tableobj2.list.length == 0) {
        this.$message.error("请选择体检项目！");
        return;
      }
      console.log(this.isadd);
      if (this.isadd) {
        this.InsertSetmeal();
      } else {
        this.UpdatePackageDetails();
      }
    },

    selectxmobjbtn() {
      this.tableobj2.loading = true;
      this.$network3
        .get("/mnoracle/setmeal/FindOneSetmeal", {
          SETMEALID: this.SETMEALID,
          pageIndex: 1,
          pageSize: this.tableobj2.total || 99999
        })
        .then(res => {
          this.tableobj2.loading = false;
          if (res.data && res.data.PackageDetails) {
            this.selectlist = res.data.PackageDetails || [];
          } else {
            this.selectlist = [];
          }
          this.isshowselectItem = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    yuanjiachange() {
      var price = 0;
      this.tableobj1.list.map(item => {
        price += Number(item.OLDPRICE);
      });
      return price;
    },
    chengjiaochange() {
      var price = 0;
      this.tableobj1.list.map(item => {
        price += Number(item.PRICE);
      });
      return price;
    },
    sexchange(xb) {
      switch (xb) {
        case "2":
          return "女";
          break;
        case "1":
          return "男";
          break;
        case "0":
          return "全部";
          break;
        default:
          break;
      }
    },
    HYZKchange(HYZK) {
      switch (HYZK) {
        case "01":
          return "已婚";
          break;
        case "02":
          return "未婚";
          break;
        case "03":
          return "通用";
          break;
        default:
          break;
      }
    }
  },
  computed: {
    dimchange() {
      if (this.dimtext) {
        return this.ITEM_IDlist.filter(item => {
          if (
            item.ITEM_ID.indexOf(this.dimtext) >= 0 ||
            item.ITEM_NAME.indexOf(this.dimtext) >= 0
          ) {
            console.log(item.ITEM_ID);
            console.log(item.ITEM_NAME);
            return item;
          }
        });
      } else {
        return this.ITEM_IDlist;
      }
    }
  }
};
</script>
<style lang="scss" >
.sxmobj {
  .el-dialog__body {
    padding: 10px 20px;
  }
  .sxmclass {
    width: 49%;
    position: relative;
    .sxmmainclass {
      height: 450px;
      padding: 10px;
      width: 95%;
      margin-top: 5px;
      border: 1px solid #cccccc;
      overflow: auto;
      .sxmmainclassdiv {
        min-width: 100%;
        margin: 5px 0 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        i {
          position: absolute;
          font-size: 20px;
          right: 5px;
          cursor: pointer;
        }
      }
      .sxmmainclassinput {
        position: absolute;
        width: 90%;
        height: 50px;
        top: 27px;
        left: 1px;
        z-index: 1000;
        background-color: #fff;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
