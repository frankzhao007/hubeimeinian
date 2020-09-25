<template>
  <div style="margin:30px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="项目代码：">
          <el-input v-model="seekobj.ITEM_ID" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input v-model="seekobj.ITEM_NAME" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="seekobj.XB" placeholder="" style="width:200px">
            <!--<el-option label="全部" value=""></el-option>-->
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            <el-option label="全部" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚否：">
          <el-select v-model="seekobj.HYZK" placeholder="" style="width:200px">
            <!--<el-option label="全部" value=""></el-option>-->
            <el-option label="已婚" value="01"></el-option>
            <el-option label="未婚" value="02"></el-option>
            <el-option label="通用" value="03"></el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item style="float:right">
          <el-button type="primary" @click="resetbtn">重 置</el-button>
          <el-button type="primary" @click="seekbtn">搜 索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addprojectbtn">新增项目</el-button>
          <el-button type="primary" @click="importProject">导入项目</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%;" v-loading="tableobj.loading">
        <el-table-column prop="ITEM_ID" label="项目代码"  >
        	 <template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.ITEM_ID}}</span>
        	 	<span v-else  >{{scope.row.ITEM_ID}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ITEM_NAME" label="项目名称">
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.ITEM_NAME}}</span>
        	 	<span v-else  >{{scope.row.ITEM_NAME}}</span>
          </template>
        	
        </el-table-column>
        <!--<el-table-column prop="CHECK_ITEM" label="所属检查项" wi-dth="100px"></el-table-column>-->
        <el-table-column prop="targetCode" label="指标代码" width="100px">
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.targetCode}}</span>
        	 	<span v-else  >{{scope.row.targetCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="targetName" label="明细指标名称" width="110px">
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.targetName}}</span>
        	 	<span v-else  >{{scope.row.targetName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DRCC" label="成本系数">
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.DRCC}}</span>
        	 	<span v-else  >{{scope.row.DRCC}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="XB" label="性别">
          <template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{sexchange(scope.row.XB)}}</span>
        	 	<span v-else  >{{sexchange(scope.row.XB) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="HYZK" label="婚否">
          <template slot-scope="scope">
          	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{HYZKchange(scope.row.HYZK) }}</span>
        	 	<span v-else  >{{HYZKchange(scope.row.HYZK) }}</span>
            
          </template>
        </el-table-column>
        <el-table-column prop="SIGNIFICANCE" label="意义" show-overflow-tooltip>
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.SIGNIFICANCE}}</span>
        	 	<span v-else  >{{scope.row.SIGNIFICANCE}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PRICE" label="价格">
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.PRICE}}</span>
        	 	<span v-else  >{{scope.row.PRICE}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CREATETIME" label="创建时间">
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.CREATETIME}}</span>
        	 	<span v-else  >{{scope.row.CREATETIME}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="effectiveTime" label="生效时间">
        		<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.effectiveTime}}</span>
        	 	<span v-else  >{{scope.row.effectiveTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
        	<template slot-scope="scope">
        	 	<span v-if="scope.row.showFonz" style="width: 100%;font-size: 13px;font-weight: 600;">{{scope.row.endTime}}</span>
        	 	<span v-else  >{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="HEAT" label="热度">
          <template slot-scope="scope">
            <el-input size="small" @change="HEATblur(scope.row)" v-model="scope.row.HEAT"></el-input>
          </template>
        </el-table-column>-->
        <el-table-column prop="date" label="操作" width="100px">
          <template slot-scope="scope">
          	<div v-if="scope.row.showFonz==true">
          		<el-button   style="font-size: 13px;font-weight: 600;" type="text" size="mini" @click="edititembtn(scope.row)">编辑</el-button>
              <el-button   style="font-size: 13px;font-weight: 600;" type="text" size="mini" @click="DELITEMbtn(scope.row)">删除</el-button>
          	</div>
          	<div v-if="scope.row.showFonz==false">
            	<el-button     type="text" size="mini" @click="edititembtn(scope.row)">编辑</el-button>
              <el-button     type="text" size="mini" @click="DELITEMbtn(scope.row)">删除</el-button>
          	</div>
            
          </template>
          <!--<template slot-scope="scope"  >
            <el-button v-if="scope.row.showFonz==false"  v- type="text" size="mini" @click="edititembtn(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.showFonz==false" type="text" size="mini" @click="DELITEMbtn(scope.row)">删除</el-button>
          </template>-->
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="pagesizechange" @current-change="pageindexchange" :current-page="seekobj.pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>
    
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
        ITEM_ID: "",
        ITEM_NAME: "",
        XB: "",
        HYZK: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      }
    };
  },
  watch: {},
  mounted() {
    this.FindITEMS();
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
				this.FindITEMS()
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

						this.getmessage()
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
									CHECK_ITEM: String(e.所属检查项 || ''),
									CHECK_ID:String(e.所属检查项代码 || ''),
									DRCC: String(e.成本系数 || ''),
									HYZK: String(e.婚否 || ''),
									ITEM_ID: String(e.项目代码 || ''),
									ITEM_NAME: String(e.项目名称 || ''),
									PRICE: Number(e.价格 || ''),
									SIGNIFICANCE: String(e.临床意义 || ''),
									XB: String(e.性别 || ''),
									
			 

								}
//								if(e.预约日期) {
//									console.log("预约日期", e.预约日期);
//									de.date = _this.getFormatDate(
//										_this.exceldataParse(e.预约日期)
//									);
//								}
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
//				if(this.goodXlsx.length == 0) {
//					this.$message.error('请上传文件')
//					return
//				}
        console.log(this.file)
         if(!this.file) {
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
				
				 var  fd  =  new  FormData();      
                fd.append("details",  this.file);
//              fd.append("MSJID",  this.file);
                console.log(fd)
				
				var body = {
//					msjId: this.paiqiID,
//					storeId: this.storeId,
					items: temp
				}
				this.updataobj.isshow = true
				this.updataobj.loadingtext = '数据校验中，请耐心等待...'
				this.$network3
					.post('/mnoracle/item/ImportItems', fd)
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
//      var urlCom=urlWithoutCom.substring(0,26)
        console.log(urlWithoutCom)
        console.log(urlWithoutCom+"/mnoracle/static/项目导入模板.xlsx")
        window.open(urlWithoutCom+"/mnoracle/static/项目导入模板.xlsx")
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
    HEATblur(row) {
      console.log(row);
      this.$network3
        .get("/mnoracle/item/UpdateHEAT", {
          MSJID: row.MSJID,
          HEAT: row.HEAT
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.FindITEMS();
          } else {
            this.$message.success(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    resetbtn() {
      this.seekobj.ITEM_ID = "";
      this.seekobj.ITEM_NAME = "";
      this.seekobj.XB = "";
      this.seekobj.HYZK = "";
    },
    edititembtn(row) {
      console.log(row);

      this.$router.push(
        "/DataManagement/ProjectSeetingmsg?isadd=false&MSJID=" + row.MSJID
      );
    },
    addprojectbtn() {
      this.$router.push("/DataManagement/ProjectSeetingmsg?isadd=true");
    },
    sexchange(xb) {
      switch (xb) {
        case "0":
          return "女";
          break;
        case "1":
          return "男";
          break;
        case "3":
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
    },
    seekbtn() {
      this.seekobj.pageIndex = 1;
      this.FindITEMS();
    },
    pagesizechange(val) {
      this.seekobj.pageIndex = 1;
      this.seekobj.pageSize = val;
      this.FindITEMS();
    },
    pageindexchange(val) {
      this.seekobj.pageIndex = val;
      this.FindITEMS();
    },
    FindITEMS() {
    	
     
    	 
    	 
    	
      this.tableobj.loading = true;
      this.$network3
        .get("/mnoracle/item/FindITEMS", {
          ITEM_ID: this.seekobj.ITEM_ID,
          ITEM_NAME: this.seekobj.ITEM_NAME,
          XB: this.seekobj.XB,
          // CHECK_ITEM: this.seekobj.CHECK_ITEM,
          HYZK: this.seekobj.HYZK,
          pageIndex: this.seekobj.pageIndex,
          pageSize: this.seekobj.pageSize
        })
        .then(res => {
          this.tableobj.loading = false;
          console.log(res);
          var tempArry_no=[];
          var tempArryWith=[];
          if (res.code == 200) {
          	
          	
          	var time1="2020-07-18";
			    	console.log(1111111111)
			    	console.log(Date.parse(time1))
//			    	if(Date.parse(time1)>new Date()){
//			    		console.log(222222222)
//			    	}
			    	if(res.data.ITEMlist.length>=0){
			    		
			    		res.data.ITEMlist=res.data.ITEMlist.forEach(function(item,index) {
			    			console.log(item)
			    			console.log(item.endTime)
			    			console.log(Date.parse(item.endTime))
			    			if(Date.parse(item.endTime)>new Date()){
			    				console.log(item)
			    				
			    			}
			    			
			    			if(Date.parse(item.endTime)>new Date()&&Date.parse(item.effectiveTime)<new Date()){
			    			console.log(item)
			    			res.data.ITEMlist[index].showFonz=true;
			    				tempArryWith.push(res.data.ITEMlist[index])
			    			}else{
			    				res.data.ITEMlist[index].showFonz=false;
			    				tempArry_no.push(res.data.ITEMlist[index])
			    			}
			    		})
			    		console.log(tempArryWith)
			    		tempArryWith=tempArryWith.concat(tempArry_no)
			    		console.log(tempArry_no)
			    		console.log(tempArryWith)
			    		this.tableobj.list = tempArryWith;
			    	}
			          	
//        	 console.log(res.data.ITEMlist)
            
            this.tableobj.total = res.data.count;
            
            console.log(this.tableobj.list)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    DELITEMbtn(row) {
      console.log(row);

      this.$confirm("确认删除该套餐吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$network3
            .get("/mnoracle/item/DELITEM", {
              MSJID: row.MSJID
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("删除成功");
                this.FindITEMS();
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
    }
  },
  components: {}
};
</script>
<style lang="scss" >
  .el-tooltip__popper{font-size: 14px; max-width:30% } /*设置显示隐藏部分内容，按50%显示*/
</style>