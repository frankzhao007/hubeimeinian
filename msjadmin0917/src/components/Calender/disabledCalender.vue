<template>
    <div class="date-container">
        <div class="date-years">
            <div class="left-arrow">
                <img src="@/assets/img/left-arrow.png" class="left-arrow-img" @click="subMonth(panelYear,panelMonth)">
            </div>
            <div class="date-title">{{panelYear}}年{{panelMonth + 1}}月</div>
            <div class="right-arrow">
                <img src="@/assets/img/right-arrow.png" class="right-arrow-img" @click="addMonth(panelYear,panelMonth)">
            </div>
        </div>
        <div class="date-weeks">
            <div class="weekday">日</div>
            <div class="weekday">一</div>
            <div class="weekday">二</div>
            <div class="weekday">三</div>
            <div class="weekday">四</div>
            <div class="weekday">五</div>
            <div class="weekday">六</div>
        </div>
        <div class="date-days">
            <div v-for="(item,index) in dayFullList">
                <div v-if="item.day!=0" class="every-day" @click="showSpecialConfigBox(item.day)">
                  <!--:class="hasSetScheduel(item.day)"-->
                    <!-- <div class="circle" :class="beforeToday(item.day)?'before-today':isToday(item.day)?'activeToday':hasSetScheduel(item.day)==true?'selected-day':''" >
                        {{item.today}}
                    </div> -->
                     <!-- <div class="circle" :class="beforeToday1(item.day)?'before-today':notselectableDay(item.day)?'before-today':weekNotChoose(item.day)?'':hasSetScheduel(item.day)==true?'selected-day':''" >
                        {{item.today}}
                    </div> -->
                    <div class="circle" :class="!selectableDay(item.day)?'before-today':hasSetScheduel(item.day)==true?'selected-day':''" >
                        {{item.today}}
                    </div>
                </div>
                <div v-else style="opacity: 0" class="every-day">{{item.today}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default ({
        props: {
          calenArr: Array,//可选的数组
          notcalenArr:Array,//不可选的数组  
          selectcalendarArr:Array,//选中的数组    
        },
        data() {
            return {
                panelYear: '',//日历头部显示的年
                panelMonth: '',//日历头部显示的月（从0开始）
                dayList: [],//所有的天数列表，前面空位补0
                dayFullList: [],//所有的天数列表，前面空位补0
                firstDay: '',//每月第一天
                lastDay: '',//每月最后一天也即每月多少天
                firstDayIsWhat:'',//每月第一天是星期几0-6（星期日到星期六）



            }
        },
        methods: {
            dateInit(year = (new Date()).getFullYear() , month = (new Date()).getMonth()) {
                console.log('日期初始化')
                let self = this
                let y = year
                let m = month
                self.panelYear = year
                self.panelMonth = month
                self.firstDay = (new Date(y,m,1)).getDate()
                self.lastDay = (new Date(y,m+1,0)).getDate()
                self.firstDayIsWhat = (new Date(y,m,1)).getDay()
                //初始化长度为firstDayIsWhat的数组并全部填充为0，后面用来判断每月第一天前填充多少个空格
                let beginTmp = new Array(self.firstDayIsWhat).fill(0)
                let lastTmp = []//初始化长度为当月天数的数组并填充为1-30或1-31或1-28或1-29
                let lastFullTmp = []//初始化完整的月的每天格式为年月日20180627
                for(let i = 1;i <= self.lastDay;i++) {
                    lastTmp.push(i)
                    lastFullTmp.push(''+self.panelYear+self.addPreZero(self.panelMonth+1)+self.addPreZero(i))
                }
                self.dayList=[...beginTmp,...lastTmp];//用解构的方式生成新日期数组
                self.dayFullList = [...beginTmp,...lastFullTmp];//用解构的方式生成年月日完整的新日期数组

                let records = [];
                for(let i in self.dayFullList) {
                    var j = {}
                    j.day = self.dayFullList[i]
                    records.push(j)
                }
                records.forEach(item => {
                    item['choose'] = false
                    item['today'] = parseInt(item.day.toString().slice(-2))
                })
                this.dayFullList = records
                console.log(this.dayFullList)
            },

            addPreZero(num){//小于9的需要添加0前缀
                return (num>9) ? num:('0'+num);
            },

            beforeToday(day) {//小于当天不可选
           
              const y = day.substring(0,4)
              const m = day.substring(4,6)
              const d = day.substring(6,8)
              const clickDay = y + '-'+ m + '-'+ d + ' 00:00:00'

              const yToday = new Date().getFullYear().toString();
              const mToday = (new Date().getMonth()+1).toString();
              const dToday = new Date().getDate().toString();
              const today = yToday + '-' + mToday + '-'+ dToday + ' 00:00:00'

              const msClickDay = new Date(clickDay).getTime()
              const msToday = new Date(today).getTime()
              console.log(clickDay,today)
              console.log(msClickDay,msToday)


              if(msClickDay < msToday) {
                return true
              }else {
                return false
              }
            },

          beforeToday1(day){//提前几天不可选
              const y = day.substring(0,4)
              const m = day.substring(4,6)
              const d = day.substring(6,8)
              const clickDay = y + '-'+ m + '-'+ d + ' 00:00:00'
              const msClickDay = new Date(clickDay).getTime()
              const minday =new Date(this.fun_date(-2)).getTime()
              const maxday =new Date(this.fun_date(-60)).getTime()


              if(msClickDay > minday&&msClickDay < maxday) {
                return false
              }else {
                return true
              }
          
         },

    fun_date(aa) { //提前几天后的日期
 
      var date2 = new Date()
      date2.setDate(date2.getDate() - aa);
   
      var month01 = date2.getMonth() + 1
      var day01 = date2.getDate()
      var time2 = date2.getFullYear() + '-' + month01 + '-' + day01 + ' 00:00:00' ;
      return time2
   },
       weekDayEvent(days){//日期转星期
           var ss=days.substring(0, 4)+"/"+days.substring(4, 6)+"/"+days.substring(6, 8)
           var dates= (new Date(ss.replace(/-/g, '/') + ' 00:00:00').getTime() / 1000).toFixed(0); 
        
           let dateObj = {};
           let show_day = new Array('星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
           var ds = dates * 1000
           var date = new Date(ds);
           date.setDate(date.getDate());
           let day = date.getDay();
           dateObj.week = show_day[day];
           return dateObj.week;
       },
      weekNotChoose(day){//星期几不可选
    
        if(this.weekDayEvent(day)=='星期天'){
           return false;
        }else{
           return true;
        }
      },


       
            //判断是不是今天
            isToday(day){
                console.log(day)
                let y = new Date().getFullYear().toString();
                let m = (new Date().getMonth()+1).toString();
                let num = new Date().getDate();
                let d = 0;
                if(num>9){
                    d=num
                }else{
                    d='0'+num
                }
                d=d.toString()



                let dates = y.concat(m).concat(d);
                let self = this
                if(!self.optForData){
                    self.optForData=dates
                }
                

                if(day==self.optForData){
                    return true
                }else {
                    return false
                }
            },
            hasSetScheduel(day) {//选中的日期      
        // calenArr
              const { selectcalendarArr } = this
              for(let item of selectcalendarArr) {
                if(item.scheduleDate == day) {  
                  return true
                }
              }
 
            },

          selectableDay(day){//特殊天数可选
        
              const { calenArr } = this
              for(let item of calenArr) {
                if(item.scheduleDate== day) {  
                  return true
                }
              }
            },


           notselectableDay(day){//特殊天数不可选
            console.log(day)
              const { notcalenArr } = this
              for(let item of notcalenArr) {
                if(item.scheduleDate == day) {  
                  return true
                }
              }
            },

            subMonth(remYear,remMonth){
                let self = this;
                if(self.panelMonth>0){
                    self.panelMonth--;
                }else if(self.panelMonth==0){
                    //跳转到上一年的12月
                    remYear --;
                    self.panelYear = remYear;
                    remMonth = 11
                    self.panelMonth = remMonth
                }
            },
            addMonth(addYear,addMouth){
                let self = this;
                if(self.panelMonth<11){
                    self.panelMonth++;
                }else if(self.panelMonth==11){
                    //跳转到下一年的一月份
                    addYear ++;
                    self.panelYear = addYear
                    addMouth = 0;
                    self.panelMonth = addMouth
                }
            },
            showSpecialConfigBox(selectedDay) {//点击
                
                   
                const isBefore = this.jurisdiction(selectedDay)
                var ss=""
               
                const { calenArr } = this

                console.log(calenArr)
                if(isBefore){                       
                 for(let item of calenArr) {
                    if(item.scheduleDate == selectedDay) {  
                     ss=item
                   }
                 }        
                }else{
                   ss= selectedDay
                }
                this.$emit('config_selected_Day',ss,isBefore)
                console.log(selectedDay,isBefore)

        //    this.$emit('config_selected_Day',selectedDay,isBefore)

                // if(isBefore){
                //     this.optForData=selectedDay
                // }



            },

 

        jurisdiction(selectedDay){    //是否能点击  
            // if(this.beforeToday1(selectedDay)){
            //      return false
            // }else if(this.notselectableDay(selectedDay)){
            //      return false
            // }else if(this.weekNotChoose(selectedDay)){
            //     return true
            // }else if(this.selectableDay(selectedDay)){
            //     return true
            // }else{
            //     return false
            // }
            if(this.selectableDay(selectedDay)){
                 return true
            }else{
                return false
             }
          }
        },
        watch: {
            panelMonth(newVal,oldVal){//检测月份变化
                this.dateInit(this.panelYear,this.panelMonth);
            },
            panelYear(newVal,oldVal){//检测年份变化
                this.dateInit(this.panelYear,this.panelMonth);
            }
        },
        created() {
            this.dateInit()
        }
    })
</script>

<style>
    .date-container {
        width: 322px;
        height: 270px;
        background: #FFF;
        border: 1px solid #DDD;
        box-shadow: -3px -3px 5px #DDD;
    }
    .date-years {
        width: 100%;
        height: 50px;
        display: flex;
    }
    .left-arrow {
        width: 50px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .left-arrow-img {
        width: 16px;
        height: 16px;
    }
    .date-title {
        width: 180px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .right-arrow {
        width: 50px;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .right-arrow-img {
        width: 16px;
        height: 16px;
    }
    .date-weeks {
        padding: 0 20px;
        display: flex;
        margin-bottom: 10px;
    }
    .weekday {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 20px;
    }
    .date-days {
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px;
    }
    .every-day {
        width: 40px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        /*color: #323232;*/
        position: relative;
        cursor: pointer;
    }
    .circle {
        position: absolute;
        top: 5px;
        left: 10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        color: #323232;
    }
    .activeToday {
        background: #FD3B30;
        color: #FFF;
    }
    .selected-day {
      border-bottom: 1px solid #D9001B;
    }
    .before-today {
      color: #ccc;
    }
</style>
