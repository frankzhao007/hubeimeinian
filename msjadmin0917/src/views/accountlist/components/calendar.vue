<template>
  <div>
    <div style="position: relative;">
      <el-card class="calendarbg">
        <!-- 日历 -->
        <div style="font-size:18px;margin-left:10px;line-height:40px">
          <div class="calendarbtn">
            <el-button type="text" style="font-size:20px" @click="lastmonth()">
              <</el-button> <span>{{year}}年{{month+1}}月</span>
                <el-button type="text" style="font-size:20px" @click="nextmonth()">></el-button>
          </div>
        </div>
        <div>
          <div style="font-weight: bold">
            <div class="calendarth">星期一</div>
            <div class="calendarth">星期二</div>
            <div class="calendarth">星期三</div>
            <div class="calendarth">星期四</div>
            <div class="calendarth">星期五</div>
            <div class="calendarth">星期六</div>
            <div class="calendarth">星期日</div>
          </div>
          <div>
            <div v-for="(item,index) in calendatArr" :key="index">
              <div class="calendartd" :class="item.month!=month+1?'calendartdblack':''">
                <div :class="datecolorchange(item)" @click="selectdate(item)">
                  {{item.day}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="calendarbg1">
        当前已选择日期：
        <div v-for="item in selectdateArr">
          {{item.date}}
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    date: "",
    selectdatetemp:null
  },
  data() {
    return {
      year: "", //当前显示年份
      month: "", //当前显示月份
      day: "",
      nowdate: {
        year: "",
        month: "",
        day: ""
      },
      calendatArr: [],
      selectdateArr: []
    };
  },
  mounted() {
    this.getdatemsg(this.date);
  },
  methods: {
    datecolorchange(item) {
      // if (this.selectdateArr.indexOf(item)>=0) {
      //   return 'selectcolor'
      // }
      for (let i = 0; i < this.selectdateArr.length; i++) {
        if (this.selectdateArr[i].date == item.date) {
          return "selectcolor";
        }
      }
      // this.selectdateArr.map((temp)=>{
      //   if (temp.date==item.date) {
      //     return 'selectcolor'
      //   }
      // })
      if (
        item.year == this.nowdate.year &&
        item.month == this.nowdate.month + 1 &&
        item.day == this.nowdate.day
      ) {
        return "highlight";
      }
    },
    lastmonth() {
      if (this.month == 0) {
        this.month = 11;
        this.year = this.year - 1;
      } else {
        this.month -= 1;
      }
      this.getcalendatArr(this.year, this.month);
    },
    nextmonth() {
      if (this.month == 11) {
        this.month = 0;
        this.year = this.year + 1;
      } else {
        this.month += 1;
      }
      this.getcalendatArr(this.year, this.month);
    },
    getcalendatArr(year, month) {
      let calendatArr = [];
      // 先得到当前的年，月，日
      // let {year, month, day} = utils.getNewDate(utils.getDate(this.year, this.month, 1));

      // 获取当月的第一天 得到2019-5-1
      let currentFirstDay = new Date(year, month, 1);
      console.log(currentFirstDay.getFullYear());
      console.log(currentFirstDay.getMonth());
      console.log(currentFirstDay.getDate());

      // 获取第一天是星期几 得到 3
      let weekDay = currentFirstDay.getDay();
      console.log(weekDay);

      // 用当月的第一天减去 周几前面几天 这样就能得到上个月开始的天数 （当前月1号是周三，那么周一就是上个月的最后两天）
      let startTime = "";
      if (weekDay == 0) {
        startTime = currentFirstDay - 6 * 24 * 60 * 60 * 1000;
      } else {
        startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000;
      }

      // 然后得到所有的日期
      for (let i = 0; i < 42; i++) {
        var body = {
          year: new Date(startTime + i * 24 * 60 * 60 * 1000).getFullYear(),
          month: new Date(startTime + i * 24 * 60 * 60 * 1000).getMonth() + 1,
          day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
          date: ""
        };
        body.date =
          body.year +
          "-" +
          (body.month < 10 ? "0" + body.month : body.month) +
          "-" +
          (body.day < 10 ? "0" + body.day : body.day);
        calendatArr.push(body);
      }
      console.log(calendatArr);

      this.calendatArr = calendatArr;
    },
    getdatemsg(date) {
      this.selectdateArr=JSON.parse(JSON.stringify(this.selectdatetemp))  
      console.log(date);
      this.year = date.getFullYear(); //年
      this.month = date.getMonth(); //月
      this.day = date.getDate(); //日
      this.nowdate.year = date.getFullYear(); //年
      this.nowdate.month = date.getMonth(); //月
      this.nowdate.day = date.getDate(); //日
      console.log(this.year, this.month, this.day);

      this.getcalendatArr(this.year, this.month);
    },
    selectdate(item) {
      console.log(item);
      let num = 0;
      for (let i = 0; i < this.selectdateArr.length; i++) {
        if (this.selectdateArr[i].date == item.date) {
          this.selectdateArr.splice(i, 1);
          this.$emit("selectdate", this.selectdateArr);
          return;
        }
      }
      this.selectdateArr.push(item);
      console.log(this.selectdateArr);
      this.$emit("selectdate", this.selectdateArr);
    }
  }
};
</script>
<style scoped lang="scss">
.calendarbtn {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.calendarbg {
  width: 60%;
}
.calendarbg1 {
  width: 40%;
  height: 100%;
  position: absolute;
  overflow: auto;
  top: 0%;
  right: 0%;
}
.calendarth {
  width: 14%;
  float: left;
  line-height: 40px;
  text-align: center;
}
.calendartd {
  width: 14%;
  height: 60px;
  float: left;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center; //垂直
  justify-content: center; //水平
}
.calendartd div {
  line-height: 36px;
  width: 60%;
  border-radius: 50%;
  cursor: pointer;
}
.calendartdblack {
  // background-color: rgb(245, 247, 250);
  color: #c0c4cc;
}
.highlight {
  color: #409eff;
}
.selectcolor {
  background-color: #409eff;
  color: #ffffff;
}
</style>