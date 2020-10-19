<template>
	<div style="margin:20px">
		<div class="checkSchedule"  >
			<div style="font-size: 20px; margin-bottom: 20px;">
				<i @click="goback()" class="el-icon-my-back backbtn"></i>
				<span>&nbsp&nbsp&nbsp返回</span>
			</div>
			<div class="checkSchedule_form">
				<el-form  :inline="false" :model="AllHospitalMsg" label-position='left' label-width="120px" size="medium">

				 <div class="checkSchedule_paiqi">
				 	<el-form-item label="订单排期" style="font-size: 24px;">

	       			 </el-form-item>
				 </div>

				<el-form-item label="单据号：">
			         <el-input  v-model="AllHospitalMsg.id" :disabled="true" placeholder="请填写" style="width:200px" size="mini"></el-input>
       			 </el-form-item>
       			 <el-form-item label="提交时间：">
			         <el-input  v-model="AllHospitalMsg.submitAt" :disabled="true" placeholder="0000000000000" style="width:200px" size="mini"></el-input>
       			 </el-form-item>
       			 <el-form-item label="* 选择分院：">
               <el-select v-model="AllHospitalMsg.HospitalShow" @change="selectChange" placeholder="请选择分院" style="width:200px">
                 <el-option v-for="item in AllHospitalMsg.AllHospital" :key="item.code" :label="item.name" :value="item.code"></el-option>
               </el-select>
       			 </el-form-item>
       			 <el-form-item label="* 排期时间：">
       			 	 <div class="timeChoose" v-if="AllHospitalMsg.choiceTime" @click="chooseSchedule">{{AllHospitalMsg.choiceTime}}</div>
               <div class="timeChoose" style="color:#C0C4CC;" v-else @click="chooseSchedule">请选择时间</div>
       			 </el-form-item>
          <el-form-item label="* 排期场次：">
            <el-select v-model="AllHospitalMsg.PQCCtitle" visible-change="visibleChange" @change="selectPQCCChange" placeholder="请选择场次" style="width:200px">
              <el-option v-for="item in AllHospitalMsg.PQCCList" :key="item.PQCCtitle" :label="item.PQCCtitle" :value="item.PQCCtitle"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="* 排期人数：">
            <el-input v-model.trim="AllHospitalMsg.PQRS" maxlength=10000 @change="input_change_leadTime(AllHospitalMsg.PQRS)" placeholder="请输入人数" style="width:200px" clearable></el-input>
          </el-form-item>
          <div style="margin-top: 30px">
            <el-button type="primary" @click="submit">提交审核</el-button>
            <el-button type="primary" @click="goback">取消</el-button>
          </div>


			</el-form>
			</div>



          <el-dialog title="排期时间" :visible.sync="operate.dialogFormVisible" >
			<div style="margin:20px"   >

        <el-calendar v-model="value">
          <template slot="dateCell" slot-scope="{date, data}" class="kalendar">
            <div style="width:100%;height:100%" @click="selectDate(data,matchingdata(AllHospitalMsg.days,data.day))">
              <div style="font-size: 15px;">{{data.day.split('-').slice(2).join('-')}}</div>
              <div style=" font-size: 10px;float:right;width:calc(100% - 24px);overflow: hidden;">
                <div style="float:left;width:33%;text-align: center;">总数</div>
                <div style="float:left;width:34%;text-align: center;">已约</div>
                <div style="float:left;width:33%;text-align: center;">剩余</div>
              </div>
              <div style="font-size: 10px;float:left;width:24px;width:100%;overflow: hidden;">
                <div style="float:left;">上午</div>
                <div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="AllHospitalMsg.days.length>0">
                  <div style="float:left;width:33%;text-align: center;">
                    <span v-if="matchingdata(AllHospitalMsg.days,data.day)">{{matchingdata(AllHospitalMsg.days,data.day).limit_mor}}</span>
                    <span v-else>-</span>
                  </div>

                  <div style="float:left;width:34%;text-align: center;">
                    <span v-if="matchingdata(AllHospitalMsg.days,data.day)">{{matchingdata(AllHospitalMsg.days,data.day).sched_mor}}</span>
                    <span v-else>-</span>
                  </div>
                  <div style="float:left;width:33%;text-align: center;">
                    <span v-if="matchingdata(AllHospitalMsg.days,data.day)">{{matchingdata(AllHospitalMsg.days,data.day).remain_mor}}</span>
                    <span v-else>-</span>
                  </div>
                </div>
                <div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="AllHospitalMsg.days.length==0">
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
                <div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="AllHospitalMsg.days.length>0">
                  <div style="float:left;width:33%;text-align: center;">
                    <span v-if="matchingdata(AllHospitalMsg.days,data.day)">{{matchingdata(AllHospitalMsg.days,data.day).limit_aft}}</span>
                    <span v-else>-</span>
                  </div>
                  <div style="float:left;width:34%;text-align: center;">
                    <span v-if="matchingdata(AllHospitalMsg.days,data.day)">{{matchingdata(AllHospitalMsg.days,data.day).sched_aft}}</span>
                    <span v-else>-</span>
                  </div>
                  <div style="float:left;width:33%;text-align: center;">
                    <span v-if="matchingdata(AllHospitalMsg.days,data.day)">{{matchingdata(AllHospitalMsg.days,data.day).remain_aft}}</span>
                    <span v-else>-</span>
                  </div>
                </div>
                <div style="width:calc(100% - 24px);float:left;overflow: hidden;" v-if="AllHospitalMsg.days.length==0">
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
            <span slot="footer" class="dialog-footer">
    <el-button @click="operate.dialogFormVisible=false">取 消</el-button>
    <el-button type="primary" @click="confirm_kuang">确 定</el-button>
  </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

        value: new Date(),
        TimePickervalue1:[],
        TimePickervalue1_model:[],
        AllHospitalMsg:{
          id:'',
          orderID:'',
          submitAt:'',
          hospitalCode:'',
          AllHospital:[],
          HospitalShow:'',
          schedule:[],
          days:[],
          schedules_modify:[],
          current_month:'',
          PQCCList:[],
          PQCC:'',
          PQCCtitle:'',
          choiceTime:'',
          PQRS:'',
          session:1,
          comparePQRS:''
        },
				 activeNames: ['1'],
				operate:{
					dialogFormVisible: false,
				},

			}
		},
    create(){
      console.log(this.$route.query.id);
      this.AllHospitalMsg.id=this.$route.query.id
    },
		mounted() {
      console.log(this.$route.query.id);
      this.AllHospitalMsg.id=this.$route.query.id
      this.GetAllHospital();
      // this.getRequestDetail()

    },
		methods: {
      goback() {
        // if(this.ischange) {
          console.log("++++++++++++++++++");
          this.$confirm("您还未保存，离开将不保存该数据", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$router.go(-1);
            })
            .catch(() => {});
        // } else {
        //   this.$router.go(-1);
        // }
      },
		  getRequestDetail(){
        var body={
          id:this.AllHospitalMsg.id,

        };
        this.$network3
          .get("/mnoracle/schedule/RequestDetail",body)
          .then((res)=>{
            this.AllHospitalMsg.hospitalCode=res.data.hospitalCode
            this.AllHospitalMsg.HospitalShow=res.data.hospitalName
            this.AllHospitalMsg.submitAt=res.data.submitAt
            this.AllHospitalMsg.orderID=res.data.orderID
            this.AllHospitalMsg.choiceTime=res.data.date
            this.AllHospitalMsg.session=res.data.session
            this.AllHospitalMsg.PQRS=res.data.quota
            // if(res.data.session==1){
            //   this.AllHospitalMsg.PQCCtitle=
            //     res.data.date+"上午"+"（剩余"+res.data.remain+")";
            // }else if(res.data.session==2){
            //   this.AllHospitalMsg.PQCCtitle=
            //     res.data.date+"下午"+"（剩余"+res.data.remain+")";
            // }
            console.log(this.AllHospitalMsg);
            this. PQCClook();
          })
          .catch((err)=>{
            console.log(err);
          });
      },
      submit(){
        var that=this
       var verify= this.verify();
        if(verify){
          return
        }
        console.log(56565656)
        console.log(this.AllHospitalMsg.choiceTime)
        this.$confirm('确认提交审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var body={
            MsjBILLCODE:this.AllHospitalMsg.id,
            hospitalCode:this.AllHospitalMsg.hospitalCode,//分院代码
            date:this.AllHospitalMsg.choiceTime,//日期
            session: this.AllHospitalMsg.session, // 场次
            quota:Number(this.AllHospitalMsg.PQRS)  // 人数
          };
          this.$network3
            .post("/mnoracle/schedule/Request",body)
            .then((res)=>{
              if(res.code==200){
                that.$router.push('/ScheduleManagement/ScheduleList')
              }else if(res.code==600){
                this.$message.error('排期失败');

              }

            })
            .catch((err)=>{
              console.log(err);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      verify(){
        var that=this
        if(!this.AllHospitalMsg.hospitalCode) {
          that.$message({
            type: 'info',
            message: '请选择分院!'
          });
          return true;
        }
        if(!this.AllHospitalMsg.choiceTime) {
          that.$message({
            type: 'info',
            message: '请选择排期时间!'
          });
          return true;
        }
        if(!this.AllHospitalMsg.session) {
          that.$message({
            type: 'info',
            message: '请选择排期场次!'
          });
          return true;
        }
        if(!this.AllHospitalMsg.PQRS) {
          that.$message({
            type: 'info',
            message: '请选择排期人数!'
          });
          return true;
        }else{
          if(Number(this.AllHospitalMsg.comparePQRS)<Number(this.AllHospitalMsg.PQRS)){
            that.$message({
              type: 'info',
              message: '超出当天排期人数，无法进行排期!'
            });
            return true;
          }
        }
      },
      submitToFWQ(){

      },
      input_change_leadTime(e) {

        console.log(22222222)
        console.log(e)
        var eString = e.toString()
        console.log(eString)

        if(eString == "0" || eString == "00" || eString == "000" || eString == "0000" || eString == "1") {
          console.log(5555555)
          this.AllHospitalMsg.PQRS = "1"
          this.$message.error('请输入整数')
        }
        console.log(this.AllHospitalMsg.PQRS)

        if(e.length == 1) {
          //					this.MSJschedules[index].leadTime = e.replace(/[^0-9]/g, '')
        } else if(e > 30) {
          // this.MSJschedules[index].leadTime = "30"
          // this.$message.error('不能大于30')

        } else {
          console.log(66666666666)
          this.AllHospitalMsg.PQRS = e.replace(/^0[0-9]+/g, '0')

          this.AllHospitalMsg.PQRS = e.replace(/\D/g, '')
        }
        console.log(this.AllHospitalMsg.PQRS)

      },
      cancel(){
         this.$router.push('/ScheduleManagement/ScheduleList')
      },
      confirm_kuang(){
        console.log(this.choicetiem)
        console.log(this.AllHospitalMsg.choiceTime)
        console.log(this.AllHospitalMsg.days);
        if(this.AllHospitalMsg.days.length>0){
          if(this.AllHospitalMsg.days.length>0){
            this.AllHospitalMsg.days.map((item,index)=>{
              if(item.date==this.choicetiem){
                if(Number(item.remain_aft)===0&&Number(item.remain_mor)===0){
                  this.choicetiem=""
                  this.$message({
                    type: 'info',
                    message: '当天无排期!'
                  });
                  return;
                }else{
                  this.operate.dialogFormVisible = false
                }
              }
            })
          }

        }else{
          this.choicetiem=""
          this.$message({
            type: 'info',
            message: '当天无排期!'
          });
          return;
        }
        // this.operate.dialogFormVisible = false

        if(this.choicetiem!=this.AllHospitalMsg.choiceTime){
          console.log(this.AllHospitalMsg.PQCCtitle)
          this.AllHospitalMsg.PQCCtitle=""
          this.AllHospitalMsg.session=""
        }
        this.AllHospitalMsg.choiceTime=this.choicetiem
        this.PQCClook()
        console.log(this.AllHospitalMsg.choiceTime)
        console.log(this.AllHospitalMsg.PQCCtitle)

      },
      visibleChange(){
        console.log(787878788787)

      },
      selectPQCCChange(e){
        console.log(e)
        console.log(this.AllHospitalMsg.choiceTime)
        this.AllHospitalMsg.PQCCtitle=e
        if(this.AllHospitalMsg.PQCCList.length>0){
          this.AllHospitalMsg.PQCCList.map((item,index)=>{
            if(item.PQCCtitle==e){
              this.AllHospitalMsg.session=item.session
              this.AllHospitalMsg.comparePQRS=item.remain
            }
          })
        }
        console.log(this.AllHospitalMsg.PQCCList);
        console.log(this.AllHospitalMsg.session);


      },
      selectChange(e){
        this.AllHospitalMsg.hospitalCode=e
        this.getCalendar()


        console.log(e)
      },
      PQCClook(){
        var that=this;
        var body={
          code:this.AllHospitalMsg.hospitalCode,//分院代码
          date:this.AllHospitalMsg.choiceTime,//日期
        };
        this.$network3
          .post("/mnoracle/schedule/CheckHospitalQuota",body)
          .then((res)=>{
            console.log(res.data);
            if(res.data){
              if(res.data.length==0){

                console.log("当天无排期!")
                that.$message({
                  type: 'info',
                  message: '当天无排期!'
                });
                return;
              }
              res.data.map((item)=>{
                if(item.session==1){
                  if(this.AllHospitalMsg.session&&this.AllHospitalMsg.choiceTime){
                    this.AllHospitalMsg.PQCCtitle=item.date+"上午"+"（剩余"+item.remain+")";
                  }

                  item.PQCCtitle= item.date+"上午"+"（剩余"+item.remain+")";
                }else if(item.session==2){
                  if(this.AllHospitalMsg.session&&this.AllHospitalMsg.choiceTime){
                    this.AllHospitalMsg.PQCCtitle=item.date+"上午"+"（剩余"+item.remain+")";
                  }
                  item.PQCCtitle=item.date+"下午"+"（剩余"+item.remain+")";
                }
              });
              this.AllHospitalMsg.PQCCList=res.data;
              console.log(this.AllHospitalMsg.PQCCList);
            }else{
              this.AllHospitalMsg.choiceTime=""
            }

          })
          .catch((err)=>{
            console.log(err);
          });
      },
      // 获取所有分院
      GetAllHospital() {
        var that = this;
        var body = {
          // page:1, // 页码
          // size:9999 // 单页条数
        }
        this.$network3
          .get("/mnoracle/schedule/HospitalList")
          .then(res => {
            console.log(res.data);
            that.AllHospitalMsg.AllHospital=[];
            that.AllHospitalMsg.AllHospital=res.data||[];
            console.log(that.AllHospitalMsg.AllHospital);

          })
          .catch(err => {
            console.log("err", err);
          });
      },
			handleChange(){
				console.log(val);
			},
			chooseSchedule(){
				console.log(111111111111)

        if(this.AllHospitalMsg.hospitalCode){
          this.operate.dialogFormVisible=true
          this.getCalendar()
        }else{
          this.$message({
            type: 'info',
            message: '请选择分院!'
          });
          return;
        }
  				console.log(this.operate.dialogFormVisible)
			},
      selectDate(val, dataval, id) {
        console.log(56565656)

        console.log(val)
        console.log(dataval)

        if(val.type == "current-month") {
          this.timechina = val.day.substring(0, 4) + '年' + val.day.substring(5, 7) + '月' + val.day.substring(8, 10) + '日'
          this.choicetiem = val.day


        } else {

        }
        console.log(val.day)
        console.log(this.choicetiem)

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
												// console.log(dayList)
				//				console.log(dayData)
				//				console.log(this.megliast)
				//				console.log(this.megliast.leadTime)
				//				console.log(this.megliast.endTime)
				// var start = this.fun_date(new Date(this.megliast.startTime.substring(0, 10)), this.megliast.leadTime)
        // console.log(this.TimePickervalue1)
        // var end = this.changeTime(this.TimePickervalue1[1]).substring(0, 10)
				// if(new Date(dayData) <= new Date(end)) {
					for(var i = 0; i < dayList.length; i++) {
						if(dayData == dayList[i].date) {
							var mes = dayList[i]
														// console.log(mes)
							return mes
						} else if(i == dayList.length - 1) {
							return false
						}
					}
				// } else {
				// 	return false
				// }
				//				console.log(dayList)
				// return true

			},
      getCalendar(){
        var that = this;
        var tt=this.changeTime(this.value);

        console.log(tt)
        var end = tt.substring(0, 7)
        console.log(end)
        this.AllHospitalMsg.current_month=end
        var body = {
          hospitalCode:this.AllHospitalMsg.hospitalCode,
          month:this.AllHospitalMsg.current_month,
          startDate: "",
          endDate: "",
          // startDate:this.changeTime(this.TimePickervalue1[0]),
          // endDate:this.changeTime(this.TimePickervalue1[1]),

        };
        this.$network3
          .post("/mnoracle/schedule/Calendar", body)
          .then(res => {
            console.log(res);
            console.log(res.data)
            if (res.data) {
              console.log(res.data.length-1)
              console.log(res.data[res.data.length-1].date)

              // this.TimePickervalue1[0]=res.data[0].date
              // this.TimePickervalue1[1]=res.data[res.data.length-1].date
              this.AllHospitalMsg.days=[];
              var taocanTemp = [];

              for (var i = 0; i < res.data.length; i++) {
                const newObj = JSON.parse(JSON.stringify(res.data[i]));
                taocanTemp.push(newObj)

              }
              var days=[];
              let tempArr = [], newArr = [] ,anArray=[],suplusArray=[]
              for (let i = 0; i < taocanTemp.length; i++) {
                // console.log(that.TimePickervalue1)
                // console.log(typeof that.TimePickervalue1)
                that.TimePickervalue1.push(taocanTemp[0].date)
                that.TimePickervalue1.push(taocanTemp[taocanTemp.length-1].date)

                if (tempArr.indexOf(taocanTemp[i].date) === -1) {



                  newArr.push(taocanTemp[i])
                  tempArr.push(taocanTemp[i].date);
                } else {
                  suplusArray.push(taocanTemp[i].date)
                  anArray.push(taocanTemp[i])

                }

                // newArr.push(obj)
              }
              console.log(tempArr)
              console.log(newArr)
              console.log(anArray)
              var obj={
                date:'',
                limit_mor:'',
                limit_aft:'',
                sched_mor:'',
                sched_aft:'',
                indSched_mor:'',
                indSched_aft:'',
                remain_mor:'',
                remain_aft:'',
                descs_mor:'',
                descs_aft:'',
              }
              let daysArray=[]
              for (var i = 0; i < newArr.length;i++){
                for (var j = 0; j < anArray.length;j++){
                  // console.log(suplusArray);
                  // console.log(newArr[i].date);
                  if(suplusArray.indexOf(newArr[i].date) == -1){
                    // console.log(newArr[i].date);
                    var obj={
                      date:'',
                      limit_mor:'',
                      limit_aft:'',
                      sched_mor:'',
                      sched_aft:'',
                      indSched_mor:'',
                      indSched_aft:'',
                      remain_mor:'',
                      remain_aft:'',
                      descs_mor:'',
                      descs_aft:'',
                    }

                    if(newArr[i].session===1){

                      obj.date=newArr[i].date
                      obj.limit_mor=newArr[i].limit
                      obj.sched_mor=newArr[i].sched
                      obj.indSched_mor=newArr[i].indSched
                      obj.remain_mor=newArr[i].remain
                      obj. descs_mor=newArr[i].descs
                      obj.limit_aft=""
                      obj.sched_aft=""
                      obj.indSched_aft=""
                      obj.remain_aft=""
                      obj. descs_aft=""

                    }else if(newArr[i].session===2){
                      obj.date=newArr[i].date
                      obj.limit_mor=""
                      obj.sched_mor=""
                      obj.indSched_mor=""
                      obj.remain_mor=""
                      obj. descs_mor=""
                      obj.limit_aft=newArr[i].limit
                      obj.sched_aft=newArr[i].sched
                      obj.indSched_aft=newArr[i].indSched
                      obj.remain_aft=newArr[i].remain
                      obj. descs_aft=newArr[i].descs
                    }
                    // console.log(obj);
                    daysArray.push(obj)


                  }
                  if(newArr[i].date==anArray[j].date){
                    // console.log(newArr[i]);
                    var obj={
                      date:'',
                      limit_mor:'',
                      limit_aft:'',
                      sched_mor:'',
                      sched_aft:'',
                      indSched_mor:'',
                      indSched_aft:'',
                      remain_mor:'',
                      remain_aft:'',
                      descs_mor:'',
                      descs_aft:'',
                    }
                    if(newArr[i].session===1){

                      obj.date=newArr[i].date
                      obj.limit_mor=newArr[i].limit
                      obj.sched_mor=newArr[i].sched
                      obj.indSched_mor=newArr[i].indSched
                      obj.remain_mor=newArr[i].remain
                      obj. descs_mor=newArr[i].descs
                      obj.limit_aft=anArray[j].limit
                      obj.sched_aft=anArray[j].sched
                      obj.indSched_aft=anArray[j].indSched
                      obj.remain_aft=anArray[j].remain
                      obj. descs_aft=anArray[j].descs

                    }else if(newArr[i].session===2){
                      obj.date=newArr[i].date
                      obj.limit_mor=anArray[j].limit
                      obj.sched_mor=anArray[j].sched
                      obj.indSched_mor=anArray[j].indSched
                      obj.remain_mor=anArray[j].remain
                      obj. descs_mor=anArray[j].descs
                      obj.limit_aft=newArr[i].limit
                      obj.sched_aft=newArr[i].sched
                      obj.indSched_aft=newArr[i].indSched
                      obj.remain_aft=newArr[i].remain
                      obj. descs_aft=newArr[i].descs
                    }
                    daysArray.push(obj)
                  }

                }
              }
              console.log(daysArray);

              var obj_days= {};
              daysArray =  daysArray.reduce(function(item, next) {
                obj_days[next.date] ?  '' : obj_days[next.date] = true && item.push(next);
                return item;
              }, []);
              console.log(daysArray);
              this.AllHospitalMsg.days=daysArray;
              console.log(this.AllHospitalMsg.days);

            }else{
              console.log(5656656566556)
              this.AllHospitalMsg.choiceTime=""
              this.AllHospitalMsg.PQCCtitle=""
              this.AllHospitalMsg.PQCCList=[];
              this.AllHospitalMsg.days=[];
            }
          })
          .catch(err => {
            console.log(err);
          });

      },
      changeTime(day){
        // console.log(day)
        // console.log(day1)
        var dayString=day.toString();
        if(dayString.indexOf("中国标准时间")==-1){
          // console.log(dayString)
          var day1 = new Date(day);
          day=day1
        }


        // console.log(day)

        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        //初始化时间
        //Year= day.getYear();//有火狐下2008年显示108的bug
        Year = day.getFullYear(); //ie火狐下都可以
        Month = day.getMonth() + 1;
        Day = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10)
        {
          CurrentDate += Month + "-";
        }
        else
        {
          CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10)
        {
          CurrentDate += Day;
        }
        else
        {
          CurrentDate += "0" + Day;
        }
        // console.log(CurrentDate)
        return CurrentDate
      },
		},
    watch: {
      value: {
        handler(newName, oldName) {
          console.log(this.value)

          this.getCalendar();

          console.log(this.value)
        },
        immediate: true
      }



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
			padding: 0px 35px 0px 15px;
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
