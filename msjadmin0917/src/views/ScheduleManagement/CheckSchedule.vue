<template>
  <div style="margin: 20px">
    <div class="checkSchedule">
      <div style="font-size: 20px; margin-bottom: 20px">
        <i @click="goback()" class="el-icon-my-back backbtn"></i>
        <span>&nbsp&nbsp&nbsp返回</span>
      </div>
      <div class="checkSchedule_form">
        <el-form
          :inline="false"
          :model="seekobj"
          label-position="left"
          label-width="120px"
          size="medium"
        >
          <div class="checkSchedule_paiqi">
            <el-form-item label="查看排期" style="font-size: 24px">
            </el-form-item>
          </div>

          <el-form-item label="*分院选择：">
            <el-select v-model="AllHospitalMsg.HospitalShow" @change="selectChange" placeholder="请选择分院" style="width:200px">
              <el-option v-for="item in AllHospitalMsg.AllHospital" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

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
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      TimePickervalue1:[],
      TimePickervalue1_model:[],
      activeName: "selected",
      days: [],
      MSJschedules: [],

      seekobj: {
        XB: "",
      },

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
    };
  },
  mounted() {
    this.GetAllHospital();
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
    selectDate(val, dataval, id) {
      this.paiqiID = id;
      console.log(val);
      console.log(dataval);
      console.log(id);
      console.log(this.paiqiID);
      if (val.type == "current-month") {
        this.timechina =
          val.day.substring(0, 4) +
          "年" +
          val.day.substring(5, 7) +
          "月" +
          val.day.substring(8, 10) +
          "日";
        this.choicetiem = val.day;
        if (this.matchingdata(this.days, val.day)) {
          this.modificationM = dataval.numberMorning;
          this.modificationA = dataval.numberAfternoon;
          this.isdate = true;
        }
      } else {
      }
      console.log(val.day);
      console.log(this.timechina);
    },
    fun_date: function (date2, aa) {
      //查看几天前的日期
      function PrefixInteger(num, n) {
        //在数值前面加个0
        return (Array(n).join(0) + num).slice(-n);
      }
      date2.setDate(date2.getDate() - aa);
      var time2 = date2.getMonth();
      return time2;
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
  },
};
</script>

<style lang="scss">
.word:hover {
  color: #409eff;
}

.checkSchedule {
  .checkSchedule_form {
    margin-left: 27px;
  }
  .el-calendar__title {
    font-size: 18px;
  }
  .el-form-item__label {
    font-size: 18px;
  }
  .checkSchedule_paiqi {
    .el-form-item__label {
      font-size: 24px;
    }
  }
}
</style>
