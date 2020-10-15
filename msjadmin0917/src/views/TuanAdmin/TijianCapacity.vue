<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
    <div style="font-size: 20px; ">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp返回</span>
    </div>


    <div style="overflow:hidden;margin-top:10px;font-size:18px;min-width: 1200px;">

    </div>

    <div v-if="item.scheduleName==activeName" v-for="(item,index) in MSJschedules">

      <div style="width:350px;float:left;text-align: right;line-height:40px;text-align: left;">
        <span style="color:#F64649">*</span>
        <span style="font-size: 18px;">分院选择</span>
        <el-select v-model="AllHospitalMsg.HospitalShow" @change="selectChange" placeholder="请选择分院" style="width:200px">
          <!--<el-option label="全部" value=""></el-option>-->
          <el-option v-for="item in AllHospitalMsg.AllHospital" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </div>
      <div style="clear: both"></div>
      <div style="overflow:hidden;margin-top:10px;font-size:18px">

        <div style="width:150px;float:left;text-align: right;line-height:40px;text-align: left;">
          <span style="color:#f64649">*</span>
          <span>选择配置日期</span>
        </div>
        <div style="float:left;width:100%;margin-top:10px">
          <el-date-picker

            v-model="TimePickervalue1_model"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
<!--          <el-date-picker value-format="yyyy-MM-dd" @change="begainTime(item.startTime,index)" v-model="item.startTime" type="date" placeholder="选择日期时间">-->
<!--          </el-date-picker>-->

<!--          <span style="color:#606266;margin-left:10px">预约结束时间：</span>-->

<!--          <el-date-picker value-format="yyyy-MM-dd" @change="overTime(item.endTime,index)" v-model="item.endTime" type="date" placeholder="选择日期时间">-->
<!--          </el-date-picker>-->

        </div>
      </div>
      <div style="overflow:hidden;margin-top:10px;font-size:18px">
        <div style="float:left;text-align: right;line-height:40px;text-align: left;">
          <span style="color:#f64649">*</span>
          <span>人数配置</span>
          <span style="color:#606266">（若当天人数有特殊控制请选择具体日期设置）</span>
        </div>
        <div style="float:left;width:100%;margin-top:10px;">
          <div style="float:left;line-height:40px;">默认可约总人数</div>
          <div style="width:600px;float:left;margin-left:20px">
            <div style="float:left;">
              <span>上午</span>
              <el-input v-model="AllHospitalMsg.maxHC_mor" maxlength=4 @input="input_change_Mor(AllHospitalMsg.maxHC_mor)" placeholder="请输入0~1000之间的整数" style="width:200px" clearable></el-input>
            </div>
            <div style="float:left;margin-left:20px">
              <span>备注</span>
              <el-input v-model="item.remarksMon" placeholder="非必填" style="width:200px" clearable></el-input>
            </div>
            <div style="float:left;margin-top:20px">
              <span>下午</span>
              <el-input v-model="AllHospitalMsg.maxHC_aft" maxlength=4 @input="input_change_Aft(AllHospitalMsg.maxHC_aft,)" placeholder="请输入0~1000之间的整数" style="width:200px" clearable></el-input>
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
<!--              <el-button style="float: right;margin-right: 20px;" type="primary" @click="EmployeeExport()">导出预约信息</el-button>-->
<!--              <el-button style="float: right;" type="primary" @click="importEmployee">导入预约信息</el-button>-->
            </el-col>
          </el-row>
        </div>

        <!-- {{matchingdata(days,'2020-04-11')}} -->
        <div style="margin:20px">
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

      </div>
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
        hospitalCode:'',
        AllHospital:[],
        HospitalShow:'',
        startDate:'',
        endDate:'',
        maxHC_mor:'',
        maxHC_aft:'',
        schedule:[],
        days:[],
        schedules_modify:[],
        chooseDate:'',
        current_month:''
      },
      seekobj:{XB:'0'},



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
    this.GetAllHospital();
    var current_month = this.changeTime(new Date()).substring(0, 7)
    this.AllHospitalMsg.current_month=current_month
    console.log(current_month)

    this.localCenterCode = this.$route.query.localCenterCode;




  },
  methods: {
    selectChange(e){
      this.AllHospitalMsg.hospitalCode=e
      this.getCalendar()
      console.log(e)
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
    okBtn() {
      this.dialogImportEmployee = false
      this.closeimport()
      this.ygplczobj.drobj.active = 0;
      this.getmessage()
      console.log(this.ygplczobj.drobj.active)
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


    input_change_Aft(e, index) {

      console.log(22222222)
      if(e.length == 1) {
        this.AllHospitalMsg.maxHC_aft = e.replace(/[^0-9]/g, '')
      } else if(e == "0" || e == "00" || e == "000" || e == "0000") {
        this.AllHospitalMsg.maxHC_aft = "0"
      } else if(e > 1000) {
        this.AllHospitalMsg.maxHC_aft = "1000"
        this.$message.error('不能大于1000')

      } else if(e.indexOf(".") < 0 && e != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.AllHospitalMsg.maxHC_aft = parseFloat(e);
      } else {
        this.AllHospitalMsg.maxHC_aft = e.replace(/^0[0-9]+/g, '0')

        this.AllHospitalMsg.maxHC_aft = e.replace(/\D/g, '')
      }
      console.log(this.AllHospitalMsg.maxHC_aft)

    },
    input_change_Mor(e, index) {

      console.log(22222222)
      console.log(e)
      if(e.length == 1) {
        this.AllHospitalMsg.maxHC_mor = e.replace(/[^0-9]/g, '')
      } else if(e == "0" || e == "00" || e == "000" || e == "0000") {
        this.AllHospitalMsg.maxHC_mor = "0"
      } else if(e > 1000) {
        this.AllHospitalMsg.maxHC_mor = "1000"
        this.$message.error('不能大于1000')

      } else if(e.indexOf(".") < 0 && e != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.AllHospitalMsg.maxHC_mor = parseFloat(e);
      } else {
        this.AllHospitalMsg.maxHC_mor = e.replace(/^0[0-9]+/g, '0')

        this.AllHospitalMsg.maxHC_mor = e.replace(/\D/g, '')
      }
      console.log(this.AllHospitalMsg.maxHC_mor)

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


    fun_date: function(date2, aa) { //查看几天前的日期
      function PrefixInteger(num, n) { //在数值前面加个0
        return(Array(n).join(0) + num).slice(-n);
      }
      date2.setDate(date2.getDate() - aa);
      var time2 = date2.getMonth()
      return time2
    },

    matchingdata(dayList, dayData) {
      								console.log(dayList)
      //				console.log(dayData)
      //				console.log(this.megliast)
      //				console.log(this.megliast.leadTime)
      //				console.log(this.megliast.endTime)
      // var start = this.fun_date(new Date(this.megliast.startTime.substring(0, 10)), this.megliast.leadTime)
      var end = this.changeTime(this.TimePickervalue1[1]).substring(0, 10)
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
      return true

    },
    selectweek() {
      console.log(this.ruleForm.week)
    },


    selectDate(val, dataval) {
      console.log(56565656)

      console.log(val)
      console.log(dataval)

      if(val.type == "current-month") {
        this.timechina = val.day.substring(0, 4) + '年' + val.day.substring(5, 7) + '月' + val.day.substring(8, 10) + '日'
        this.choicetiem = val.day
        if(this.matchingdata(this.AllHospitalMsg.days, val.day)) {
          this.modificationM = dataval.limit_mor
          this.modificationA = dataval.limit_aft
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
    calculateDays(e){
      console.log(e)
      var startDate=e[0]
      var stopDate=e[1]
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }

      Date.prototype.shortDate = function () {
        return `${this.getFullYear()}-${(this.getMonth() + 1).toString().padStart(2, '0')}-${this.getDate().toString().padStart(2, '0')}`;
      }

      console.log(new Date("2020-01-01").shortDate());


        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
          dateArray.push(new Date(currentDate).shortDate());
          currentDate = currentDate.addDays(1);
        }
       console.log(dateArray)
       this.combinSchedule(dateArray)
        // return dateArray;

    },
    combinSchedule(dateArray){
      console.log(this.AllHospitalMsg.maxHC_mor)
      console.log(this.AllHospitalMsg.maxHC_aft)
      var schedule=[];
      if(dateArray.length>0){
        var obj1={};
        var obj2={};
        dateArray.map((item,index)=>{

          obj1={
            date:item,
            session:1,
            headcount:Number(this.AllHospitalMsg.maxHC_mor)
          }
          obj2={
            date:item,
            session:2,
            headcount:Number(this.AllHospitalMsg.maxHC_aft)
          }
          schedule.push(obj1)
          schedule.push(obj2)

         })
        this.AllHospitalMsg.schedule=schedule;
        console.log(schedule)
        console.log(this.AllHospitalMsg.schedule)


      }
    },
    generate(e) {
      var that = this;

      console.log(this.TimePickervalue1)

      // this.changeTime(this.TimePickervalue1[0])

      console.log(11111111111)
      var index = "";
      console.log(e)

      console.log(11111111111)
      if(!this.AllHospitalMsg.hospitalCode) {
        that.$message({
          type: 'info',
          message: '请选择分院!'
        });
        return;
      }
      if(this.TimePickervalue1_model.length==0) {
        that.$message({
          type: 'info',
          message: '请输入配置日期！'
        });
        return;
      }else{

      }


      if(!this.AllHospitalMsg.maxHC_mor.toString()) {
        console.log(11111111111)
        that.$message({
          type: 'info',
          message: '请输入上午可约总人数！'
        });
        return;
      }
      if(!this.AllHospitalMsg.maxHC_aft.toString()) {
        console.log(2222222222222)
        that.$message({
          type: 'info',
          message: '请输入下午可约总人数！'
        });
        return;
      }

      this.$confirm('确定立即生效吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.calculateDays(this.TimePickervalue1_model)

        this.generate_add(index);


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });

    },
    generate_add(index) {
      console.log(index)
      console.log(this.AllHospitalMsg.hospitalCode)
      console.log(this.AllHospitalMsg.schedule)
      var that = this;

      var body = {
        hospitalCode:this.AllHospitalMsg.hospitalCode,
        schedules:this.AllHospitalMsg.schedule,

      };
      this.$network3
        .post("/mnoracle/schedule/Config", body)
        .then(res => {
          console.log(res);
          that.getCalendar()
        })
        .catch(err => {
          console.log(err);
        });
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
                  console.log(newArr[i].date);
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
                    console.log(obj);
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
            this.AllHospitalMsg.days=[];
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    affirmamend() {
      var that = this;
      console.log(this.paiqiID)
      this.AllHospitalMsg.schedules_modify=[];
      var Obj_schedules_modify_mor={
        date:this.choicetiem,
        session:1,
        headcount:this.modificationM
      }
      var Obj_schedules_modify_aft={
        date:this.choicetiem,
        session:2,
        headcount:this.modificationA
      }
      this.AllHospitalMsg.schedules_modify.push(Obj_schedules_modify_mor)
      this.AllHospitalMsg.schedules_modify.push(Obj_schedules_modify_aft)
      console.log(this.AllHospitalMsg.schedules_modify)
      var body = {
        hospitalCode: this.AllHospitalMsg.hospitalCode,
        schedules: this.AllHospitalMsg.schedules_modify,


      };
      this.$network3
        .post("/mnoracle/schedule/Config", body)
        .then(res => {
          this.isdate = false
          that.getCalendar()
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeTime(day){
      console.log(day)
      // console.log(day1)
      var dayString=day.toString();
      if(dayString.indexOf("中国标准时间")==-1){
        console.log(dayString)
        var day1 = new Date(day);
        day=day1
      }


      console.log(day)

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
      console.log(CurrentDate)
      return CurrentDate
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
