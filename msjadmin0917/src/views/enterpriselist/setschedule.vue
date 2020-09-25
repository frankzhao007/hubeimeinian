<template>
	<!-- 配置分销套餐 -->
	<div style="margin:20px">
		<div style="font-size: 20px; ">
			<i @click="goback()" class="el-icon-my-back backbtn"></i>
			<span>&nbsp&nbsp&nbsp返回</span>
		</div>

		<el-button type="primary" style="margin-top:20px" @click="addschedule()">添加排期</el-button>

		<el-tabs v-model="activeName" style="margin-top:20px" @tab-click="handleClick">

			<!-- <el-tab-pane label="人工排期" name="selected"></el-tab-pane>
      <el-tab-pane label="全国单排期干预" name="commonality"></el-tab-pane> -->
			<el-tab-pane v-for="itm in editableTabs" :key="itm.name" :label="itm.title" :name="itm.name"></el-tab-pane>
			<!-- <el-tab-pane label="特殊排期一" name="commonality"></el-tab-pane>
      <el-tab-pane label="特殊排期二" name="commonality"></el-tab-pane>
      <el-tab-pane label="特殊排期三" name="commonality"></el-tab-pane> -->
		</el-tabs>

		<div style="overflow:hidden;margin-top:10px;font-size:18px;min-width: 1200px;">
			<div style="overflow:hidden;margin-top:10px;font-size:18px;width: 200px;float: left;">
				<div style="max-width:150px;float:left;text-align: right;">是否开启： </div>

				<!--<div style="float:left;margin-left:10px;width:calc(100% - 160px)">
						<el-switch v-model="activeName" active-color="#409eff" inactive-color="#DDDDDD" active-value="selected" inactive-value="commonality" ></el-switch>
					</div>-->
				<div style="float:left;margin-left:10px;width:calc(100% - 160px)">
					<el-switch v-model="whetherOpen" active-color="#409eff" inactive-color="#DDDDDD" active-value="2" inactive-value="1"></el-switch>
				</div>
			</div>
			<div v-if="activeName!='selected'&&activeName!='commonality'">
				<div style="float:left;margin-left:10px; ">包含项目：</div>
				<el-button style="float: left;" size="medium" @click="selectPhysicalBtn()" type="primary">选择体检项目</el-button>
				<div class="cityselectbox_setschedule">
					<el-tag v-for="item in selectPhysical.selectProjectList_show" :key="item.label" class="cityitembox" closable color="#ffffff" @close="Closeshop(item.value)">{{item.label}}</el-tag>
				</div>
			</div>
		</div>

		<div v-if="item.scheduleName==activeName" v-for="(item,index) in MSJschedules">

			<div style="overflow:hidden;margin-top:10px;font-size:18px">
				<div style="width:150px;float:left;text-align: right;text-align: left;">
					<span style="color:#F64649">*</span>
					<span>每周可约天数</span>
				</div>
				<div style="float:left;width:100%;margin-top:10px">

					<el-checkbox-group v-model="item.weekS" @change="selectweek">
						<el-checkbox :label=1>周一</el-checkbox>
						<el-checkbox :label=2>周二</el-checkbox>
						<el-checkbox :label=3>周三</el-checkbox>
						<el-checkbox :label=4>周四</el-checkbox>
						<el-checkbox :label=5>周五</el-checkbox>
						<el-checkbox :label=6>周六</el-checkbox>
						<el-checkbox :label=7>周日</el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
			<div style="overflow:hidden;margin-top:10px;font-size:18px">
				<div style="width:150px;float:left;text-align: right;line-height:40px;text-align: left;">
					<span style="color:#F64649">*</span>
					<span>提前可约天数</span>
				</div>
				<div style="float:left;width:100%;margin-top:10px">
					<el-input v-model="item.leadTime" maxlength=2 @change="input_change_leadTime(item.leadTime,index)" placeholder="请输入2~30之间的整数" style="width:200px" clearable></el-input>
					<span style="color:#606266;margin-left:10px">预约开始时间：</span>
					<el-date-picker value-format="yyyy-MM-dd" @change="begainTime(item.startTime,index)" v-model="item.startTime" type="date" placeholder="选择日期时间">
					</el-date-picker>
					<!--<el-date-picker start-placeholder="开始月份" :picker-options="pickerOptions" v-model="item.startTime" type="date" placeholder="选择日期"></el-date-picker>-->
					<span style="color:#606266;margin-left:10px">预约结束时间：</span>
					<!--@change="overTime(item.endTime,index)"-->
					<!--<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"  v-model="time56"  type="datetime" placeholder="选择日期时间">
					</el-date-picker>-->
					<el-date-picker value-format="yyyy-MM-dd" @change="overTime(item.endTime,index)" v-model="item.endTime" type="date" placeholder="选择日期时间">
					</el-date-picker>
					<!--<el-date-picker v-model="item.endTime" :picker-options="pickerOptions" type="date" placeholder="选择日期"></el-date-picker>-->
				</div>
			</div>
			<div style="overflow:hidden;margin-top:10px;font-size:18px">
				<div style="float:left;text-align: right;line-height:40px;text-align: left;">
					<span style="color:#F64649">*</span>
					<span>人数配置</span>
					<span style="color:#606266">（若当天人数有特殊控制请选择具体日期设置）</span>
				</div>
				<div style="float:left;width:100%;margin-top:10px;">
					<div style="float:left;line-height:40px;">默认可约总人数</div>
					<div style="width:600px;float:left;margin-left:20px">
						<div style="float:left;">
							<span>上午</span>
							<el-input v-model="item.numberMorning" maxlength=4 @input="input_change_Mor(item.numberMorning,index)" placeholder="请输入0~1000之间的整数" style="width:200px" clearable></el-input>
						</div>
						<div style="float:left;margin-left:20px">
							<span>备注</span>
							<el-input v-model="item.remarksMon" placeholder="非必填" style="width:200px" clearable></el-input>
						</div>
						<div style="float:left;margin-top:20px">
							<span>下午</span>
							<el-input v-model="item.numberAfternoon" maxlength=4 @input="input_change_Aft(item.numberAfternoon,index)" placeholder="请输入0~1000之间的整数" style="width:200px" clearable></el-input>
						</div>
						<div style="float:left;margin-left:20px;margin-top:20px">
							<span>备注</span>
							<el-input v-model="item.remarksAft" placeholder="非必填" style="width:200px" clearable></el-input>
						</div>
					</div>
				</div>
				<div style="clear: both;"></div>
				<div>
					<el-row>

						<el-col style="margin:30px;">
							<el-button style="float: right;margin-right: 50px;" type="primary" @click="generate(item.scheduleName)">立即生效</el-button>
							<el-button style="float: right;margin-right: 20px;" type="primary" @click="EmployeeExport()">导出预约信息</el-button>
							<el-button style="float: right;" type="primary" @click="importEmployee">导入预约信息</el-button>
						</el-col>
					</el-row>
				</div>

				<!-- {{matchingdata(days,'2020-04-11')}} -->
				<div style="margin:20px">
					<el-calendar>
						<template slot="dateCell" slot-scope="{date, data}" class="kalendar">
							<div style="width:100%;height:100%" @click="selectDate(data,matchingdata(days,data.day),item.id)">
								<div style="font-size: 15px;">{{data.day.split('-').slice(2).join('-')}}</div>
								<div style=" font-size: 10px;float:right;width:calc(100% - 24px);overflow: hidden;">
									<div style="float:left;width:33%;text-align: center;">总数</div>
									<div style="float:left;width:34%;text-align: center;">已约</div>
									<div style="float:left;width:33%;text-align: center;">剩余</div>
								</div>
								<div style="font-size: 10px;float:left;width:24px;width:100%;overflow: hidden;">
									<div style="float:left;">上午</div>
									<div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="days.length>0">
										<div style="float:left;width:33%;text-align: center;">
											<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).numberMorning}}</span>
											<span v-else>-</span>
										</div>

										<div style="float:left;width:34%;text-align: center;">
											<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).alreadyNumberM}}</span>
											<span v-else>-</span>
										</div>
										<div style="float:left;width:33%;text-align: center;">
											<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).stockNumberM}}</span>
											<span v-else>-</span>
										</div>
									</div>
									<div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="days.length==0">
										<div style="float:left;width:33%;text-align: center;">

											<span>-</span>
										</div>
										<div style="float:left;width:34%;text-align: center;">

											<span>-</span>
										</div>
										<div style="float:left;width:33%;text-align: center;">

											<span>-</span>
										</div>
									</div>

									<div style="float:left;">下午</div>
									<div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="days.length>0">
										<div style="float:left;width:33%;text-align: center;">
											<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).numberAfternoon}}</span>
											<span v-else>-</span>
										</div>
										<div style="float:left;width:34%;text-align: center;">
											<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).alreadyNumberA}}</span>
											<span v-else>-</span>
										</div>
										<div style="float:left;width:33%;text-align: center;">
											<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).stockNumberA}}</span>
											<span v-else>-</span>
										</div>
									</div>
									<div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="days.length==0">
										<div style="float:left;width:33%;text-align: center;">
											<!--<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).numberAfternoon}}</span>-->
											<span>-</span>
										</div>
										<div style="float:left;width:34%;text-align: center;">
											<!--<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).alreadyNumberA}}</span>-->
											<span>-</span>
										</div>
										<div style="float:left;width:33%;text-align: center;">
											<!--<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).stockNumberA}}</span>-->
											<span>-</span>
										</div>
									</div>
								</div>
							</div>
						</template>
					</el-calendar>
				</div>

			</div>
		</div>
		<!-- 选择体检项目弹窗 -->
		<div>
			<el-dialog title=" 选择体检项目" :visible.sync="selectPhysical.isshow" width="800px">

				<div class="projectmytransfer">
					<el-transfer v-loading="selectPhysical.loading" :titles="['未选项目', '已选项目']" :button-texts="['到上边', '到下边']" v-model="selectPhysical.selectProjectList" filterable filter-placeholder="请输入" :data="selectPhysical.projectList"></el-transfer>
				</div>
				<span slot="footer" class="dialog-footer">
          <el-button @click="selectPhysical.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmProjectBtn(index)">确 定</el-button>
        </span>
			</el-dialog>
		</div>

		<el-dialog title="当前选择" :visible.sync="isdate" top="10vh" width="500px" center="">
			<div>
				<div style="font-size:18px;text-align: center;">{{timechina}}</div>
				<div style="margin-left:40px;margin-top:10px;display: flex;justify-content: center;line-height:40px ;">
					<span>上午</span>
					<el-input v-model="modificationM" maxlength=4 @input="input_change_modificationM(modificationM)" placeholder="请输入0~1000之间的整数" style="width:300px;margin-left:20px;" clearable></el-input>
				</div>
				<div style="margin-left:40px;margin-top:10px;display: flex;justify-content: center;line-height:40px ;">
					<span>下午</span>
					<el-input v-model="modificationA" maxlength=4 @input="input_change_modificationA(modificationA)" placeholder="请输入0~1000之间的整数" style="width:300px;margin-left:20px;" clearable></el-input>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isdate = false">取 消</el-button>
				<el-button type="primary" @click="affirmamend">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 批量导入员工弹窗 -->
		<!--<div v-if="dialogImportEmployee">
			<el-dialog title="上传表格" :visible.sync="dialogImportEmployee" width="600px">
				<div v-loading="updataobj.isshow" :element-loading-text="updataobj.loadingtext" element-loading-spinner="el-icon-loading">
					<div>
					 
						<div class="stafflist_UploadForm">请按照以下格式上传.xlsx文件：四列数据分别为门店编码 ，预约日期，上午，下午。请按照要求录入数据。</div>
						<input ref="inputer" id="upload" style="display:none" type="file" @change="importfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
						<div style="width:100%;text-align:center;margin-top:10px;">
							<el-button size="small" type="primary" @click="returnAllUsers">点击上传</el-button>
							<div style="line-height:30px" v-if="errorFile">格式错误请重新上传！</div>
							<div style="line-height:30px" v-if="filename!=''">已选择"{{filename}}"</div>
							<div style="line-height:30px" v-if="rightWord">匹配到{{goodXlsx.length}}条有效员工信息，{{badXlsx.length}}条无效数据</div>
							<div v-if="badXlsx.length>0">
								无效数据：
								<div style="text-align: left;margin-left: 140px;position: relative;margin-top: 20px;" v-for="item in badXlsx">
									 <div style="float:left;margin-left: 0px; ">门店编码：{{item.localCenterCode||"无门店编码"}}</div> <div style="max-width:200px;float:left;color: red;margin-left: 30px;">错误提示：{{item.misdescription}}</div>
								     <div style="clear: both;"></div>
								</div>
							</div>
						</div>
						<div style=" text-align: center; margin-top: 15px;">
							<el-button type="text" @click="DownloadTemplate">
								下载模板文件
								<i class="el-icon-download el-icon--right"></i>
							</el-button>
						</div>
					</div>

					<div style="float:right">
						<el-button @click="closeimport">取 消</el-button>
						<el-button type="primary" @click="confirmimport">确 定</el-button>
					</div>
					<div style="height:40px"></div>
				</div>
			</el-dialog>
		</div>-->

		<!-- 员工批量操作 -->
		<div class="ygplcz">
			<el-dialog title="排期批量导入" :visible.sync="dialogImportEmployee" width="800px">

				<div v-loading="updataobj.isshow" :element-loading-text="updataobj.loadingtext" element-loading-spinner="el-icon-loading">
					<!--<span>选择企业：</span>
              <el-select :disabled="ygplczobj.drobj.active!=0" aria-label="选择企业" size="small" v-model="ygplczobj.drobj.company" filterable>
                <el-option v-for="(item,index) in ygplczobj.companyList" :key="index" :label="item" :value="item"></el-option>
              </el-select>-->
					<el-steps style="margin-top:10px" :active="ygplczobj.drobj.active" finish-status="success" process-status="finish" simple>
						<el-step title="上传文件" icon="el-icon-upload"></el-step>
						<el-step title="执行导入" icon="el-icon-s-platform"></el-step>
						<el-step title="导入完成" icon="el-icon-success"></el-step>
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
							<el-button type="primary" @click="verifyImport">校验数据</el-button>
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
							<el-button type="primary" @click="confirmimport">确认导入</el-button>
							<el-button style="float:right" @click="resetupload">重新上传</el-button>
						</div>
						<div style="margin-top: 20px;" v-if="badXlsx.length>0">
							无效数据：
							<div style="text-align: left;position: relative;margin-top: 20px;" v-for="item in badXlsx">
								<div style="float:left;margin-left: 0px; ">门店编码：{{item.localCenterCode||"无门店编码"}}</div>
							 
								<div style="max-width:200px;float:left;color: red;margin-left: 30px;">错误提示：第{{item.serialNumber}}行，{{item.misdescription}}</div>
								<div style="clear: both;"></div>
							</div>
						</div>

					</div>
					<div v-if="ygplczobj.drobj.active==2">
						<div style="text-align:center">
							<div style="font-size:28px;color:#00000;margin:20px">批量导入完成</div>
							<div style="font-size:16px;color:#4CCA32;margin-bottom:20px">成功导入数量{{goodXlsx.length-badXlsx.length}}条</div>
							<el-button type="primary" style="margin:20pxl.;padding:15px 50px" @click="okBtn()">完 成</el-button>
						</div>
					</div>
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
				index: '0',
				whetherOpen: "2",
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
				selectPhysical: {
					loading: false,
					addPhysical: false,
					confirmProjectList: [],
					confirmProjectfirsttype: [],
					selectProjectList: [],
					selectProjectList_show: [],
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
				seekList: {
					name: "",
					area: "",
					city: "",
					coding: "",
				},
				storeId: '',
				companyId: '',
				localCenterCode: '',
				paiqiID: '',
				pickerOptions: { // 限制收货时间不让选择今天以前的
					disabledDate(time) {　　　　
						return time.getTime() < Date.now() - 24 * 60 * 60 * 1000　　
					}
				},
				megliast: {},
				isdate: false,
				days: [],
				timechina: "",
				modificationM: "",
				modificationA: "",
				ruleForm: {
					name: '',
					week: [],
					startTime: "",
					finishTime: "",
				},
				choicetiem: "",
				activeName: "selected",
				isopen: 'true',
				scheduleint: 0,
				editableTabs: [{
					title: '人工排期',
					name: 'selected',
				}, {
					title: '全国单排期干预',
					name: 'commonality',
				}, ],

				rules: {
					name: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
				},
				MSJschedules: [{
					scheduleName: "selected",
					id: '',
					whetherOpen: '2',
					storeId: "",
					schedulingType: 1,
					containingProjects: [],
					leadTime: "",
					startTime: "",
					endTime: "",
					numberMorning: "",
					remarksMon: "",
					numberAfternoon: "",
					remarksAft: "",
					weekS: [1, 2, 3, 4, 5],
				}, {
					scheduleName: "commonality",
					id: '',
					whetherOpen: '2',
					storeId: "",
					schedulingType: 2,
					containingProjects: [],
					leadTime: "",
					startTime: "",
					endTime: "",
					numberMorning: "",
					remarksMon: "",
					numberAfternoon: "",
					remarksAft: "",
					weekS: [1, 2, 3, 4, 5],
				}]
			};
		},
		components: {

		},
		mounted() {
			this.storeId = this.$route.query.storeId;
			this.companyId = this.$route.query.companyId;
			this.localCenterCode = this.$route.query.localCenterCode;
			console.log(this.$route.query)
			console.log(this.storeId)
			if(this.storeId) {
				//				this.getpaiqiID(this.storeId);
				this.getmessage()
			}
			this.queryAllCheckDirFir()
			console.log(this.activeName)
		},
		methods: {
			okBtn() {
				this.dialogImportEmployee = false
				this.closeimport()
				this.ygplczobj.drobj.active = 0;
				this.getmessage()
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
			overTime(time, index) {
				console.log(2222222222)
				console.log(time)
				console.log(index)
				console.log(this.MSJschedules[index])
				if(Date.parse(time) < new Date()) {
					console.log("今天之前的日期")
					var d = new Date();
					var Month = d.getMonth() + 1;
					var dateDay = d.getDate();
					var CurrentDate = ""
					var CurrentDay = ""
					console.log(Month)
					if(Month >= 10) {
						console.log(11111111111)
						CurrentDate += Month + "-";
					} else {
						console.log(222222222222)
						CurrentDate += "0" + Month + "-";
					}
					if(dateDay >= 10) {
						console.log(11111111111)
						CurrentDay += dateDay + "-";
					} else {
						console.log(222222222222)
						CurrentDay += "0" + dateDay;
					}
					var mintine = d.getMinutes();
					var Currentmintine = ""
					if(mintine > 10) {
						Currentmintine += mintine
					} else {
						Currentmintine += "0" + mintine;
					}
					console.log(CurrentDate)
					var youWant = d.getFullYear() + '-' + CurrentDate + CurrentDay + ' ' + d.getHours() + ':' + Currentmintine + ':' + d.getSeconds();
					console.log(youWant)
					this.$message.error('不能选择过去的时间')
					this.MSJschedules[index].endTime = ""
				}

				if(Date.parse(time) < new Date(this.MSJschedules[index].startTime)) {
					console.log("大于之前的日期")
					this.$message.error('不能小于开始时间')
					this.MSJschedules[index].endTime = ""
				}

			},
			begainTime(time, index) {

				console.log(time)
				console.log(index)
				console.log(new Date())
				if(Date.parse(time) < new Date()) {
					console.log("今天之前的日期")
					var d = new Date();
					var Month = d.getMonth() + 1;
					var CurrentDate = ""
					var dateDay = d.getDate();

					var CurrentDay = ""
					if(Month >= 10) {
						CurrentDate += Month + "-";
					} else {
						CurrentDate += "0" + Month + "-";
					}
					if(dateDay >= 10) {
						console.log(11111111111)
						CurrentDay += dateDay;
					} else {
						console.log(222222222222)
						CurrentDay += "0" + dateDay;
					}
					var mintine = d.getMinutes();
					var Currentmintine = ""
					if(mintine > 10) {
						Currentmintine += mintine
					} else {
						Currentmintine += "0" + mintine;
					}

					var youWant = d.getFullYear() + '-' + CurrentDate + CurrentDay + ' ' + d.getHours() + ':' + Currentmintine + ':' + d.getSeconds();
					console.log(youWant)
					//					this.$message.error('不能选择过去的时间')
					//					this.MSJschedules[index].startTime = youWant

				}

			},
			input_change_leadTime(e, index) {

				console.log(22222222)
				console.log(e)
				var eString = e.toString()
				console.log(eString)

				if(eString == "0" || eString == "00" || eString == "000" || eString == "0000" || eString == "1") {
					console.log(5555555)
					this.MSJschedules[index].leadTime = "2"
					this.$message.error('请输入2~30之间的整数')
				}
				console.log(this.MSJschedules[index].leadTime)

				if(e.length == 1) {
					//					this.MSJschedules[index].leadTime = e.replace(/[^0-9]/g, '')
				} else if(e > 30) {
					this.MSJschedules[index].leadTime = "30"
					this.$message.error('不能大于30')

				} else {
					console.log(66666666666)
					this.MSJschedules[index].leadTime = e.replace(/^0[0-9]+/g, '0')

					this.MSJschedules[index].leadTime = e.replace(/\D/g, '')
				}
				console.log(this.MSJschedules[index].leadTime)

			},
			input_change_modificationA(e) {
				console.log(22222222)
				if(e.length == 1) {
					this.modificationA = e.replace(/[^0-9]/g, '')
				} else if(e == "0" || e == "00" || e == "000" || e == "0000") {
					this.modificationA = "0"
				} else if(e > 1000) {
					this.modificationA = "1000"
					this.$message.error('不能大于1000')

				} else if(e.indexOf(".") < 0 && e != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					this.modificationA = parseFloat(e);
				} else {
					this.modificationA = e.replace(/^0[0-9]+/g, '0')

					this.modificationA = e.replace(/\D/g, '')
				}
				console.log(this.modificationA)
			},
			input_change_modificationM(e) {
				console.log(22222222)
				if(e.length == 1) {
					this.modificationM = e.replace(/[^0-9]/g, '')
				} else if(e == "0" || e == "00" || e == "000" || e == "0000") {
					this.modificationM = "0"
				} else if(e > 1000) {
					this.modificationM = "1000"
					this.$message.error('不能大于1000')

				} else if(e.indexOf(".") < 0 && e != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					this.modificationM = parseFloat(e);
				} else {
					this.modificationM = e.replace(/^0[0-9]+/g, '0')

					this.modificationM = e.replace(/\D/g, '')
				}
				console.log(this.modificationM)
			},
			input_change_Aft(e, index) {

				console.log(22222222)
				if(e.length == 1) {
					this.MSJschedules[index].numberAfternoon = e.replace(/[^0-9]/g, '')
				} else if(e == "0" || e == "00" || e == "000" || e == "0000") {
					this.MSJschedules[index].numberAfternoon = "0"
				} else if(e > 1000) {
					this.MSJschedules[index].numberAfternoon = "1000"
					this.$message.error('不能大于1000')

				} else if(e.indexOf(".") < 0 && e != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					this.MSJschedules[index].numberAfternoon = parseFloat(e);
				} else {
					this.MSJschedules[index].numberAfternoon = e.replace(/^0[0-9]+/g, '0')

					this.MSJschedules[index].numberAfternoon = e.replace(/\D/g, '')
				}
				console.log(this.MSJschedules[index].numberAfternoon)

			},
			input_change_Mor(e, index) {

				console.log(22222222)
				if(e.length == 1) {
					this.MSJschedules[index].numberMorning = e.replace(/[^0-9]/g, '')
				} else if(e == "0" || e == "00" || e == "000" || e == "0000") {
					this.MSJschedules[index].numberMorning = "0"
				} else if(e > 1000) {
					this.MSJschedules[index].numberMorning = "1000"
					this.$message.error('不能大于1000')

				} else if(e.indexOf(".") < 0 && e != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					this.MSJschedules[index].numberMorning = parseFloat(e);
				} else {
					this.MSJschedules[index].numberMorning = e.replace(/^0[0-9]+/g, '0')

					this.MSJschedules[index].numberMorning = e.replace(/\D/g, '')
				}
				console.log(this.MSJschedules[index].numberMorning)

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
					msjId: this.paiqiID,
					storeId: this.storeId,
					formInfos: temp
				}
				this.updataobj.isshow = true
				this.updataobj.loadingtext = '数据校验中，请耐心等待...'
				this.$api
					.post('/MSJschedule/verifySchedule', body)
					.then(res => {
						that.updataobj.isshow = false
						console.log(res)

						console.log('res', res)
						console.log(res.data)
						that.badXlsx = res.data.errFormInfo || []
						that.updataobj.errdata = res.data.errFormInfo || []
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
									localCenterCode: String(e.门店编码 || ''),
									date: "",
									numberMorning: Number(e.上午 || ''),
									numberAfternoon: Number(e.下午 || ''),
									//									detailAdress: e.所属街道 + '',
									//									rollOutHospital: e['转出医院（方舱）'],
									//									rollOutTime: e.转出时间 + '',

								}
								if(e.预约日期) {
									console.log("预约日期", e.预约日期);
									de.date = _this.getFormatDate(
										_this.exceldataParse(e.预约日期)
									);
								}
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
			getFormatDate(date) {
				console.log(5555555555)
				console.log(date)
				// var date = new Date();
				var seperator1 = "/";
				console.log(5555555555)
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			},
			exceldataParse(date) {
				console.log(date)
				console.log(/^\d{1,5}$/.test(date))
				console.log(parseInt(date) - 1)
				console.log(/^\d{4}(0[0-9]|1[0-2])([0-3][0-9])?$/.test(date))
				let result = "";
				if(/^\d{1,5}$/.test(date)) {
					result = new Date(1900, 0, parseInt(date) - 1);
					console.log(result)
				} else if(/^\d{4}(0[0-9]|1[0-2])([0-3][0-9])?$/.test(date)) {
					if(date.length === 6) {
						date = date.slice(0, 4) + "/" + date.slice(4);
					} else {
						date =
							date.slice(0, 4) + "/" + data.slice(4, 6) + "/" + date.slice(6);
					}
					result = new Date(date);
				} else {
					result = new Date(date);
				}
				if(isNaN(result.getFullYear())) {
					return null;
				}
				return result;
			},
			//批量导入员工数据
			importEmployee() {
				//    this.UploadForm.company = "";
				//    if (this.$store.getters.getRoleInfo.AccountType == "3") {
				//      this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
				//    }
				this.dialogImportEmployee = true
			},
			closeimport() {
				this.$refs.inputer.value = ''
				this.filename = ''
				this.goodXlsx = []
				this.badXlsx = []
				this.errorFile = false
				this.rightWord = false
				this.dialogImportEmployee = false
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

				xhr.open('GET', this.$parent.$parent.$parent.weburl + '/manage/DownLoadFile?id=5', true) //也可以使用POST方式，根据接口
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
				xhr.responseType = 'blob' //返回类型blob
				xhr.onload = function() {
					console.log(11111111111)
					//定义请求完成的处理函数
					if(this.status === 200) {
						console.log(2222222222222)
						var blob = this.response
						if(blob.size > 0) {
							var reader = new FileReader()
							reader.readAsDataURL(blob) // 转换为base64，可以直接放入a标签href
							reader.onload = function(e) {
								// 转换完成，创建一个a标签用于下载
								var a = document.createElement('a')
								var newDate = new Date()
								a.download = '上传导入预约信息模板' + '.xlsx'
								a.href = e.target.result
								document.body.appendChild(a)
								// $("body").append(a); // 修复firefox中无法触发click
								a.click()
								// $(a).remove();
								a.remove()
								// window.location.reload();
							}
						} else {
							// window.location.reload();
						}
					}
				}
				xhr.send()
			},
			// 门店导出
			EmployeeExport() {
				var that = this;
				console.log(this.paiqiID);
				//              console.log(this.$parent.$data.weburl);
				var body = {
					mjId: this.paiqiID,
				}
				this.$api
					.get("/MSJschedule/exportJschedulesData", body)
					.then(res => {
						console.log(res.data);
						//  window.open(this.$parent.$parent.$parent.weburl  + res.data.url);
						let a = document.createElement("a");
						//  console.log(require("../assets/qrcode.png"));
						a.href = res.data; // href链接指向的地址
						a.download = res.data; // 下载的的名称
						a.click(); // 触发a标签的单击事件
					})
					.catch(err => {
						console.log("err", err);
					});
			},

			//查询所有--一级类目
			queryAllCheckDirFir() {
				this.selectPhysical.FirstTypeList = [{
					value: "全部",
					label: "全部"
				}];
				this.$api.post("/manage/queryAllCheckDirFir").then(res => {
					console.log(res);
					if(res.code == "200") {
						res.data.map(item => {
							var temp = {
								value: item.checktypefirst,
								label: item.checktypefirst
							};
							this.selectPhysical.FirstTypeList.push(temp);
						});
						//        if (this.isedit || this.$route.query.copy) {
						//          this.manageQueryGoodById(this.$route.query.goodsid);
						//        } else {
						//          this.GetOneByName();
						//          this.firstTxtisshow = true;
						//        }
					}
				});
			},
			//确认选择的体检项目btn
			confirmProjectBtn() {
				console.log(this.selectPhysical.projectList);
				console.log(this.MSJschedules[this.index]);
				console.log(this.selectPhysical.selectProjectList);
				console.log(this.selectPhysical.selectProjectList_show);
				var selectProjectListTemp = [];

				console.log(this.selectPhysical.selectProjectList);
				console.log(selectProjectListTemp);

				//				this.MSJschedules[this.index].containingProjects = this.selectPhysical.selectProjectList

				this.selectPhysical.isshow = false;

				if(this.MSJschedules[this.index].containingProjects.length > 0) {

					this.MSJschedules[this.index].containingProjects.map((item, index) => {

						this.MSJschedules[this.index].projectsName.map((itm, idx) => {
							if(index==idx){
								var obj = {

								label: itm,
								value: item

							}
							this.selectPhysical.projectList.push(obj)
								
							}
							
						});

					});
				}
				console.log(this.selectPhysical.projectList);
				if(this.selectPhysical.selectProjectList.length > 0) {
					this.selectPhysical.selectProjectList.map((item, index) => {
						this.selectPhysical.projectList.map((itm, idx) => {
							if(item == itm.value) {
								var obj = {
									label: itm.label,
									value: itm.value
								}

								selectProjectListTemp.push(obj)
							}
						});
					});

				}

				this.selectPhysical.selectProjectList_show = selectProjectListTemp
				console.log(this.selectPhysical.selectProjectList_show);
				console.log(this.selectPhysical.selectProjectList);
				console.log(this.selectPhysical.projectList);

			},
			//Closeshop
			Closeshop(obj) {
				console.log(obj);
				console.log(this.selectPhysical.selectProjectList_show);
				//				if(this.$route.query.look) {} else {
				this.selectPhysical.selectProjectList_show.map((item, index) => {
					if(item.value == obj) {
						console.log(index);
						this.selectPhysical.selectProjectList_show.splice(index, 1);
					}
				});
				console.log(this.selectPhysical.selectProjectList_show);
				//				}
			},
			//选择体检项目按钮
			selectPhysicalBtn() {
				this.selectPhysical.loading = true;
				console.log(this.selectPhysical.confirmProjectList);
				console.log(this.selectPhysical.projectList);
				console.log(this.selectPhysical.selectProjectList);
				//				this.selectPhysical.selectProjectList = [];
				this.selectPhysical.confirmProjectList.map(item => {
					this.selectPhysical.selectProjectList.push(item.checkid);
				});
				this.selectPhysical.addPhysical = false;
				this.selectPhysical.isshowtable = false;
				this.selectPhysical.isshow = true;

				console.log(this.MSJschedules[this.index])
				this.selectPhysical.projectList = [];
				this.selectPhysical.projectcurrentPage = 1;
				this.selectPhysical.FirstTypeValue = "";
				this.selectPhysical.SecondTypevalue = "";
				this.ProjectListQuery("1"); //查询体检项目
			},
			//查询体检项目列表
			ProjectListQuery(bool) {
				console.log(this.selectPhysical.projectList);
				var that = this;
				var body = {
					companyId: this.companyId.toString(),
					localCenterCode: this.localCenterCode,
					//					checkname: this.selectPhysical.seekPackageName,
					//					checkgender: this.selectPhysical.seeksex,
					//					page: 1,
					//					pagesize: 99999999,
					//      instname: this.AddGoodsmsg.Filiale
				};
				this.$api.get("/MSJschedule/findEnterPackage", body).then(res => {
						console.log(res);
						if(res.code == "200") {
							console.log(res);
							console.log(res.data);
							this.selectPhysical.loading = false;
							//							this.selectPhysical.projectList = res.data;
							//						this.selectPhysical.projectCount = res.data.count;
							console.log(this.selectPhysical.projectList);
							if(res.data.length > 0) {
								res.data.map((item, index) => {
									var obj = {
										label: item.goodname,
										value: item.goodid,
										key: item.goodid,

									}
									this.selectPhysical.projectList.push(obj)
									//								this.selectPhysical.projectList[index].key = item.goodid;
									//								this.selectPhysical.projectList[index].label = item.goodname
								});
							}

							console.log(this.selectPhysical.projectList);
							// if (bool == "1") {
							// }
						} else {
							console.log(898989898)
							this.selectPhysical.loading = false;
							this.$message.error(res.msg);
						}
					})
					.catch(err => {
						console.log(898989898)
						this.selectPhysical.loading = false;
						//						this.$message.error(err.msg);
					});
			},
			fun_date: function(date2, aa) { //查看几天前的日期
				function PrefixInteger(num, n) { //在数值前面加个0
					return(Array(n).join(0) + num).slice(-n);
				}
				date2.setDate(date2.getDate() - aa);
				var time2 = date2.getMonth()
				return time2
			},

			matchingdata(dayList, dayData) {
				//								console.log(dayList)
				//				console.log(dayData)
				//				console.log(this.megliast)
				//				console.log(this.megliast.leadTime)
				//				console.log(this.megliast.endTime)
				var start = this.fun_date(new Date(this.megliast.startTime.substring(0, 10)), this.megliast.leadTime)
				var end = this.megliast.endTime.substring(0, 10)
				//				console.log(start)
				//				console.log(new Date(dayData))
				//				console.log(start)
				//				console.log(new Date(end))
				//				if(start < new Date(dayData) && new Date(dayData) < new Date(end)) 
				//				if(new Date(dayData) <= new Date(end)) 
				if(new Date(dayData) <= new Date(end)) {
					for(var i = 0; i < dayList.length; i++) {
						if(dayData == dayList[i].date) {
							var mes = dayList[i]
							//							console.log(mes)
							return mes
						} else if(i == dayList.length - 1) {
							return false
						}
					}
				} else {
					return false
				}
				//				console.log(dayList)
				// return true

			},
			selectweek() {
				console.log(this.ruleForm.week)
			},

			affirmamend() {
				var that = this;
				console.log(this.paiqiID)

				var body = {
					appointmentDate: this.choicetiem,
					mjID: this.paiqiID,
					numberMorning: parseInt(this.modificationM),
					numberAfternoon: parseInt(this.modificationA),

				};
				this.$api
					.get("/MSJschedule/setDailySchedule", body)
					.then(res => {
						this.isdate = false
						this.getmessage()
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			},
			getmessage() {
				var that = this;
				var body = {
					storeId: that.storeId,
					companyId: that.companyId,
				};
				this.$api
					.get("/MSJschedule/findMSJschedules", body)
					.then(res => {
						console.log(res.data)
						console.log(that.MSJschedules)
						var taocanTemp = [];
						that.MSJschedules = [];
						console.log(that.editableTabs)
						that.editableTabs = [];
						//						if(that.MSJschedules.length > 1) {
						//
						//							that.MSJschedules.splice(2, that.MSJschedules.length);
						//						}
						console.log(that.MSJschedules)
						that.editableTabs.push({
								title: '人工排期',
								name: 'selected',
							}, {
								title: '全国单排期干预',
								name: 'commonality',
							}),

							console.log(that.activeName)
						// var taocanTemp = res.data.additional.concat();
						if(res.data.length > 0) {
							for(var i = 0; i < res.data.length; i++) {
								const newObj = JSON.parse(JSON.stringify(res.data[i]));
								taocanTemp.push(newObj)

							}
						}

						console.log(taocanTemp)

						var tempArray = [];
						if(taocanTemp.length > 0) {
							for(var i = 0; i < taocanTemp.length; i++) {
								tempArray.push(taocanTemp[i].scheduleName)

								if(taocanTemp[i].scheduleName != "selected" && taocanTemp[i].scheduleName != "commonality") {
									//								console.log(taocanTemp[i])

									if(taocanTemp[i].scheduleName) {
										//										that.MSJschedules.push(taocanTemp[i])
										var tablist = {
											title: taocanTemp[i].scheduleName,
											name: taocanTemp[i].scheduleName,
										}

										that.editableTabs.push(tablist)
									}

									//								console.log(that.editableTabs)
									if(that.activeName == taocanTemp[i].scheduleName) {
										console.log(1111111111111)
										that.days = taocanTemp[i].showDays
										that.megliast = taocanTemp[i]
										that.paiqiID = taocanTemp[i].id
										that.selectPhysical.selectProjectList = taocanTemp[i].containingProjects
										that.whetherOpen = taocanTemp[i].whetherOpen.toString()
									}
								} else if(taocanTemp[i].scheduleName == "selected" || taocanTemp[i].scheduleName == "commonality") {

									if(that.activeName == "selected") {
										if(taocanTemp[i].scheduleName == "selected") {

											//										that.MSJschedules.splice(, 1);
											console.log(that.MSJschedules)
											//											that.MSJschedules.push(taocanTemp[i])
											console.log(that.MSJschedules)
											console.log(22222222222222)
											that.days = taocanTemp[i].showDays
											that.megliast = taocanTemp[i]
											that.paiqiID = taocanTemp[i].id
											that.selectPhysical.selectProjectList = taocanTemp[i].containingProjects
											that.whetherOpen = taocanTemp[i].whetherOpen.toString()
											console.log(that.megliast)
										}

									} else if(that.activeName == "commonality") {

										if(taocanTemp[i].scheduleName == "commonality") {
											//										that.MSJschedules.splice(1, 1);
											//											that.MSJschedules.push(taocanTemp[i])
											console.log(33333333333333)
											that.days = taocanTemp[i].showDays
											that.megliast = taocanTemp[i]
											that.paiqiID = taocanTemp[i].id
											that.selectPhysical.selectProjectList = taocanTemp[i].containingProjects
											that.whetherOpen = taocanTemp[i].whetherOpen.toString()
											console.log(that.megliast)
										}

									}

								}

							}

							for(var i = 0; i < tempArray.length; i++) {
								if(tempArray.indexOf("selected") == -1) {
									taocanTemp.push({
										scheduleName: "selected",
										id: '',
										whetherOpen: '2',
										storeId: "",
										schedulingType: 1,
										containingProjects: [],
										leadTime: "",
										startTime: "",
										endTime: "",
										numberMorning: "",
										remarksMon: "",
										numberAfternoon: "",
										remarksAft: "",
										weekS: [1, 2, 3, 4, 5],
									})
								}
								if(tempArray.indexOf("commonality") == -1) {
									taocanTemp.push({
										scheduleName: "commonality",
										id: '',
										whetherOpen: '2',
										storeId: "",
										schedulingType: 2,
										containingProjects: [],
										leadTime: "",
										startTime: "",
										endTime: "",
										numberMorning: "",
										remarksMon: "",
										numberAfternoon: "",
										remarksAft: "",
										weekS: [1, 2, 3, 4, 5],
									})
								}

							}
						} else {
							taocanTemp.push({
								scheduleName: "selected",
								id: '',
								whetherOpen: '2',
								storeId: "",
								schedulingType: 1,
								containingProjects: [],
								leadTime: "",
								startTime: "",
								endTime: "",
								numberMorning: "",
								remarksMon: "",
								numberAfternoon: "",
								remarksAft: "",
								weekS: [1, 2, 3, 4, 5],
							}, {
								scheduleName: "commonality",
								id: '',
								whetherOpen: '2',
								storeId: "",
								schedulingType: 2,
								containingProjects: [],
								leadTime: "",
								startTime: "",
								endTime: "",
								numberMorning: "",
								remarksMon: "",
								numberAfternoon: "",
								remarksAft: "",
								weekS: [1, 2, 3, 4, 5],
							})
						}
						that.MSJschedules = taocanTemp
						console.log(that.MSJschedules)
						var obj = {};
						that.MSJschedules = that.MSJschedules.reduce(function(item, next) {
							obj[next.scheduleName] ? '' : obj[next.scheduleName] = true && item.push(next);
							return item;
						}, []);

						var obj_editableTabs = {};
						that.editableTabs = that.editableTabs.reduce(function(item, next) {
							obj_editableTabs[next.name] ? '' : obj_editableTabs[next.name] = true && item.push(next);
							return item;
						}, []);

						console.log(that.selectPhysical.selectProjectList)
						console.log(that.MSJschedules)
						console.log(that.editableTabs)

						console.log(res);
						console.log(that.megliast);
						console.log(that.days);
					})
					.catch(err => {
						console.log(err);
					});
			},
			selectDate(val, dataval, id) {
				this.paiqiID = id
				console.log(val)
				console.log(dataval)
				console.log(id)
				console.log(this.paiqiID)
				if(val.type == "current-month") {
					this.timechina = val.day.substring(0, 4) + '年' + val.day.substring(5, 7) + '月' + val.day.substring(8, 10) + '日'
					this.choicetiem = val.day
					if(this.matchingdata(this.days, val.day)) {
						this.modificationM = dataval.numberMorning
						this.modificationA = dataval.numberAfternoon
						this.isdate = true
					}

				} else {

				}
				console.log(val.day)
				console.log(this.timechina)

			},
			addschedule() {
				if(this.MSJschedules.length)
					var length = this.MSJschedules.length - 1

				//				this.scheduleint = this.scheduleint + 1
				var tablist = {
					title: '特殊排期' + this.transformation(length),
					name: '特殊排期' + this.transformation(length),
				}
				this.editableTabs.push(tablist)

				this.MSJschedules.push({
					scheduleName: '特殊排期' + this.transformation(length),
					whetherOpen: '2',
					storeId: "",
					schedulingType: 3,
					containingProjects: [],
					leadTime: "",
					startTime: "",
					endTime: "",
					numberMorning: 0,
					remarksMon: "",
					numberAfternoon: 0,
					remarksAft: "",
					weekS: [],

				})
				//				console.log(this.MSJschedules)
				console.log(this.MSJschedules)
				console.log(this.editableTabs)
				// this.affirmadd()
			},
			generate(e) {
				var that = this;
                console.log(11111111111)
				var index = "";
				console.log(e)
				
				for(var i = 0; i < this.MSJschedules.length; i++) {
					console.log(this.MSJschedules[i].scheduleName)
					if(e == this.MSJschedules[i].scheduleName) {
						index = i

					}

				}
               console.log(this.MSJschedules[index])
               
               console.log(this.MSJschedules[index].numberAfternoon.toString())
				console.log(this.MSJschedules[index].numberMorning)
               console.log(11111111111)
				if(this.MSJschedules[index].weekS.length == 0) {
					that.$message({
						type: 'info',
						message: '请输入每周可约天数！'
					});
					return;
				}
				if(!this.MSJschedules[index].leadTime) {
					that.$message({
						type: 'info',
						message: '提前可约天数需为2-30之间的整数！'
					});
					return;
				}
				if(!this.MSJschedules[index].startTime) {
					that.$message({
						type: 'info',
						message: '请输入预约开始时间！'
					});
					return;
				}
				if(!this.MSJschedules[index].endTime) {
					that.$message({
						type: 'info',
						message: '请输入预约结束时间！'
					});
					return;
				}
				
				if(!this.MSJschedules[index].numberMorning.toString()) {
					console.log(11111111111)
					that.$message({
						type: 'info',
						message: '请输入上午可约总人数！'
					});
					return;
				}
				if(!this.MSJschedules[index].numberAfternoon.toString()) {
					console.log(2222222222222)
					that.$message({
						type: 'info',
						message: '请输入下午可约总人数！'
					});
					return;
				}
				console.log(this.MSJschedules)
				this.$confirm('确定立即生效吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					//					var body = {
					//						phone: e.phone,
					//
					//					};
					//					this.$api
					//						.post("/schindler/removeSchindler", body)
					//						.then(res => {
					//							console.log(res)
					//							if(res.code == 200) { 

					console.log(this.MSJschedules)

					console.log(index)
					console.log(11111111111)
					console.log(this.MSJschedules[index])
					console.log(this.MSJschedules[index].id)

					var MSJschedulesTemp = []
					if(this.selectPhysical.selectProjectList_show.length >= 0) {
						this.selectPhysical.selectProjectList_show.map(item => {
							MSJschedulesTemp.push(item.value)
						})
						this.MSJschedules[index].containingProjects = MSJschedulesTemp
					}

					console.log(this.MSJschedules[index].containingProjects)

					//					return;
					if(this.MSJschedules[index].id) {
						this.generate_edit(index);
						console.log(33333333333333)
					} else {
						this.generate_add(index);
						console.log(55555555555555)
					}
					console.log(index)
					console.log(this.MSJschedules[index])
					//
					//							}
					//
					//						})
					//						.catch(err => {
					//							console.log(err);
					//						});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});

			},
			generate_add(index) {
				console.log(index)
				var that = this;

				var body = {
					MSJschedules: [{
						whetherOpen: Number(this.whetherOpen),
						storeId: this.storeId,
						schedulingType: this.MSJschedules[index].schedulingType,
						containingProjects: this.MSJschedules[index].containingProjects,
						leadTime: Number(this.MSJschedules[index].leadTime),
						startTime: this.MSJschedules[index].startTime,
						endTime: this.MSJschedules[index].endTime,
						numberMorning: Number(this.MSJschedules[index].numberMorning),
						remarksMon: this.MSJschedules[index].remarksMon,
						numberAfternoon: Number(this.MSJschedules[index].numberAfternoon),
						remarksAft: this.MSJschedules[index].remarksAft,
						scheduleName: that.activeName,
						weekS: this.MSJschedules[index].weekS,
					}]
				};
				this.$api
					.post("/MSJschedule/insertMSJschedules", body)
					.then(res => {
						console.log(res);
						that.getmessage()
					})
					.catch(err => {
						console.log(err);
					});
			},
			generate_edit(index) {
				console.log(index)
				console.log(this.MSJschedules[index])

				var that = this;

				var body = {
					MSJschedules: [{
						whetherOpen: Number(this.whetherOpen),
						storeId: this.storeId,
						id: this.MSJschedules[index].id,
						schedulingType: this.MSJschedules[index].schedulingType,
						containingProjects: this.MSJschedules[index].containingProjects,
						leadTime: Number(this.MSJschedules[index].leadTime),
						startTime: this.MSJschedules[index].startTime,
						//                      startTime: "2020-04-25 23:16:36",
						//						endTime: "2020-04-30 23:16:36",
						endTime: this.MSJschedules[index].endTime,
						numberMorning: Number(this.MSJschedules[index].numberMorning),
						remarksMon: this.MSJschedules[index].remarksMon,
						numberAfternoon: Number(this.MSJschedules[index].numberAfternoon),
						remarksAft: this.MSJschedules[index].remarksAft,
						scheduleName: that.activeName,
						weekS: this.MSJschedules[index].weekS,
						dayS: this.MSJschedules[index].dayS,
					}]
				};
				this.$api
					.post("/MSJschedule/updateMSJschedules", body)
					.then(res => {
						console.log(res);
						that.getmessage()
					})
					.catch(err => {
						console.log(err);
					});
			},
			goback() { //返回
				this.$router.go(-1);
			},
			handleClick(tab, event)  {
				var that = this
				that.selectPhysical.selectProjectList = [];
				that.selectPhysical.selectProjectList_show = [];
				console.log(this.whetherOpen)
				console.log(that.selectPhysical.selectProjectList_show)
				console.log(this.MSJschedules)
				console.log(this.activeName)
				console.log(tab, event);
				//				that.getmessage();
				console.log(this.MSJschedules)
				var MSJschedules_containingProjects = [];
				var MSJschedules_projectsName = [];

				for(var i = 0; i < this.MSJschedules.length; i++) {
					if(this.MSJschedules[i].scheduleName == this.activeName) {
						console.log(i)
						this.index = i
						if(this.MSJschedules[i].dayS) {

							that.days = this.MSJschedules[i].showDays

						} else {
							that.days = [];
						}

						that.megliast = this.MSJschedules[i]
						that.paiqiID = this.MSJschedules[i].id
						MSJschedules_containingProjects = this.MSJschedules[i].containingProjects
						MSJschedules_projectsName = this.MSJschedules[i].projectsName
						that.selectPhysical.selectProjectList = this.MSJschedules[i].containingProjects
						that.whetherOpen = this.MSJschedules[i].whetherOpen.toString()
					}

				}

				//				this.selectPhysical.projectList

				if(MSJschedules_containingProjects.length > 0) {
					MSJschedules_containingProjects.map((item,index) => {
						MSJschedules_projectsName.map((itm,idx) => {
							if(index==idx){
								that.selectPhysical.projectList.push({
								label: itm,
								value: item

							})
								
							}
							
						})
					})
				}
				console.log(that.selectPhysical.projectList);
				console.log(that.selectPhysical.selectProjectList);
				var selectProjectListTemp = [];
				if(this.selectPhysical.selectProjectList.length > 0) {
					this.selectPhysical.selectProjectList.map((item, index) => {
						this.selectPhysical.projectList.map((itm, idx) => {
							if(item == itm.value) {
								console.log(itm)
								var obj = {
									label: itm.label,
									value: itm.value
								}

								selectProjectListTemp.push(obj)
							}
						});
					});

				}
               console.log(selectProjectListTemp);
				this.selectPhysical.selectProjectList_show = selectProjectListTemp

				var obj_editableTabs = {};
				that.selectPhysical.selectProjectList_show = that.selectPhysical.selectProjectList_show.reduce(function(item, next) {
					obj_editableTabs[next.value] ? '' : obj_editableTabs[next.value] = true && item.push(next);
					return item;
				}, []);

				console.log(that.selectPhysical.selectProjectList);
				console.log(that.selectPhysical.projectList);
				console.log(that.selectPhysical.selectProjectList_show);

				console.log(that.days);
				console.log(that.megliast);

				console.log(this.activeName);
				console.log(this.MSJschedules);
			},

			transformation(num) { //将阿拉伯数字转化为中文数字
				var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
				var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
				var chnUnitChar = ["", "十", "百", "千"];

				function SectionToChinese(section) {
					var strIns = '',
						chnStr = '';
					var unitPos = 0;
					var zero = true;
					while(section > 0) {
						var v = section % 10;
						if(v === 0) {
							if(!zero) {
								zero = true;
								chnStr = chnNumChar[v] + chnStr;
							}
						} else {
							zero = false;
							strIns = chnNumChar[v];
							strIns += chnUnitChar[unitPos];
							chnStr = strIns + chnStr;
						}
						unitPos++;
						section = Math.floor(section / 10);
					}
					return chnStr;
				}

				function NumberToChinese(num) {
					var unitPos = 0;
					var strIns = '',
						chnStr = '';
					var needZero = false;

					if(num === 0) {
						return chnNumChar[0];
					}

					while(num > 0) {
						var section = num % 10000;
						if(needZero) {
							chnStr = chnNumChar[0] + chnStr;
						}
						strIns = SectionToChinese(section);
						strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
						chnStr = strIns + chnStr;
						needZero = (section < 1000) && (section > 0);
						num = Math.floor(num / 10000);
						unitPos++;
					}
					return chnStr;
				}
				return NumberToChinese(num);
			},
		},
		watch: {}
	};
</script>
<style lang="scss">
	.box-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	.cityitembox {
  margin: 10px 0px 0 10px;
}
	.carbtn {
		position: absolute;
		bottom: 10px;
		right: 0%;
	}
	
	.kalendar.el-backtop,
	.el-calendar-table td.is-today {
		color: #000000;
	}
	
	.cityselectbox_setschedule {
		float: left;
		margin-left: 20px;
		min-height: 70px;
		/*border: 1px solid #ccc;*/
		border-radius: 4px;
		max-width: 625px;
	}
</style>