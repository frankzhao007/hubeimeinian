<template>
	<div style="margin:20px">
		<div class="checkSchedule" v-if="item.scheduleName==activeName" v-for="(item,index) in MSJschedules">
			<div style="font-size: 20px; margin-bottom: 20px;">
				<i @click="goback()" class="el-icon-my-back backbtn"></i>
				<span>&nbsp&nbsp&nbsp返回</span>
			</div>
			<div class="checkSchedule_form">
				<el-form  :inline="false" :model="seekobj" label-position='left' label-width="120px" size="medium">

				 <div class="checkSchedule_paiqi">
				 	<el-form-item label="订单排期" style="font-size: 24px;">

	       			 </el-form-item>
				 </div>

				<el-form-item label="单据号01：">
			         <el-input  v-model="seekobj.DJH" :disabled="true" placeholder="请填写" style="width:200px" size="mini"></el-input>
       			 </el-form-item>
       			 <el-form-item label="单位代码：">
			         <el-input  v-model="seekobj.DJH" :disabled="true" placeholder="请填写" style="width:200px" size="mini"></el-input>
       			 </el-form-item>
       			 <el-form-item label="单位名称：">
			         <el-input  v-model="seekobj.DJH" :disabled="true" placeholder="请填写" style="width:200px" size="mini"></el-input>
       			 </el-form-item>
       			 <el-form-item label="提交时间：">
			         <el-input  v-model="seekobj.DJH" :disabled="true" placeholder="请填写" style="width:200px" size="mini"></el-input>
       			 </el-form-item>
       			 <el-form-item label="* 选择分院：">
			         <el-select v-model="seekobj.XB" placeholder="" style="width:200px">
			            <!--<el-option label="全部" value=""></el-option>-->
			            <el-option label="男" value="1"></el-option>
			            <el-option label="女" value="0"></el-option>
			            <el-option label="全部" value="3"></el-option>
			          </el-select>
       			 </el-form-item>
       			 <el-form-item label="* 排期时间：">
       			 	 <div class="timeChoose" @click="chooseSchedule">日期控件(可选时间)</div>
			         <!--<el-select v-model="seekobj.XB" placeholder="请选择时间" @visible-change="chooseSchedule" style="width:200px">

			          </el-select>-->
       			 </el-form-item>

			</el-form>
			</div>



          <el-dialog title="排期时间" :visible.sync="operate.dialogFormVisible">
			<div style="margin:20px"   >

				<el-calendar>
					<template slot="dateCell" slot-scope="{date, data}" class="kalendar">
						<div style="width:100%;height:100%">
							<div style="font-size: 15px;">{{data.day.split('-').slice(2).join('-')}}</div>
							<div style=" font-size: 10px;float:right;width:calc(100% - 24px);overflow: hidden;">
								<div style="float:left;width:33%;text-align: center;">总数</div>
								<div style="float:left;width:34%;text-align: center;">已约</div>
								<div style="float:left;width:33%;text-align: center;">剩余</div>
							</div>
							<div style="font-size: 10px;float:left;width:24px;width:100%;overflow: hidden;">
								<div style="float:left;">上午</div>
								<div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="days.length>0">
									<el-tooltip placement="top">
										<div slot="content">多行信息多行信息多行信息<br/>第二行信息<br/>第二行信息</div>
										<div class="word" style="float:left;width:33%;text-align: center;">
											<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).numberMorning}}</span>
											<span v-else>-</span>
										</div>
									</el-tooltip>

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
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				 activeNames: ['1'],
				operate:{
					dialogFormVisible: false,
				},
				activeName: "selected",
				days: [],
				MSJschedules: [],
				seekobj:{
					DJH:"",
					DWDM:'',
					TJDW:'',
					TJSJ:''
				}
			}
		},
		mounted() {
			this.getmessage()
		},
		methods: {
			handleChange(){
				console.log(val);
			},
			chooseSchedule(){
				console.log(111111111111)
				this.operate.dialogFormVisible=true
  				console.log(this.operate.dialogFormVisible)
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
			getmessage() {
				var that = this;
				var body = {
					storeId: "4452dc9e-891a-4530-86c7-02f00c65c277",
					companyId: "6967907830569504768",
				};
				this.$api
					.get("/MSJschedule/findMSJschedules", body)
					.then(res => {
						console.log(res.data)
						console.log(that.MSJschedules)
						var taocanTemp = [];
						that.MSJschedules = [];

						console.log(that.MSJschedules)

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

								console.log(1111111111111)
								that.days = taocanTemp[i].showDays
								that.megliast = taocanTemp[i]
								that.paiqiID = taocanTemp[i].id
								//								that.selectPhysical.selectProjectList = taocanTemp[i].containingProjects
								that.whetherOpen = taocanTemp[i].whetherOpen.toString()

							}

//							for(var i = 0; i < tempArray.length; i++) {
//								taocanTemp.push({
//									scheduleName: "selected",
//									id: '',
//									whetherOpen: '2',
//									storeId: "",
//									schedulingType: 1,
//									containingProjects: [],
//									leadTime: "",
//									startTime: "",
//									endTime: "",
//									numberMorning: "",
//									remarksMon: "",
//									numberAfternoon: "",
//									remarksAft: "",
//									weekS: [1, 2, 3, 4, 5],
//								})
//
//							}
						} else {

						}
						that.MSJschedules = taocanTemp
						console.log(that.MSJschedules)
//						var obj = {};
//						that.MSJschedules = that.MSJschedules.reduce(function(item, next) {
//							obj[next.scheduleName] ? '' : obj[next.scheduleName] = true && item.push(next);
//							return item;
//						}, []);
//
//						var obj_editableTabs = {};
//						that.editableTabs = that.editableTabs.reduce(function(item, next) {
//							obj_editableTabs[next.name] ? '' : obj_editableTabs[next.name] = true && item.push(next);
//							return item;
//						}, []);

						//						console.log(that.selectPhysical.selectProjectList)
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
		}

	}
</script>

<style lang="scss">
	.word:hover {
		color: #409EFF;
	}

	.checkSchedule {
		.checkSchedule_form{
			margin-left: 27px;
		}
		.el-calendar__title {
			font-size: 18px;
		}
		.el-form-item__label{
			font-size: 18px;
		}
		.timeChoose{
			width: 200px;
			border: 1px solid #DCDFE6;
			padding: 0px 35px 0px 5px;
			color:#606266;
			border-radius: 4px;
			cursor: pointer;
		}

		.checkSchedule_paiqi{
			.el-form-item__label{
				font-size: 24px;
			}
		}
	}
</style>
