<template>
  <div style="margin: 20px">
    <div style="font-size: 20px">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp订单排期</span>
    </div>

    <el-form
      :inline="true"
      :model="seekobj"
      style="margin-top: 20px"
      label-position="right"
      label-width="120px"
      size="medium"
    >
      <div>
        <el-form-item label="单据号：">
          <el-input
            v-model="seekobj.MsjBILLCODE"
            disabled
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="提交时间：">
          <el-input
            v-model="seekobj.DJSJ"
            disabled
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label=" * 体检分院：">
          <el-select
            v-model="seekobj.TJFY"
            @change="FYchange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in TJFYList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="* 排期时间：">
          <div class="timeChoose" @click="chooseSchedule">
            <span v-if="seekobj.PQtime">{{ seekobj.PQtime }}</span
            ><span v-else>日期控件(可选时间)</span>
          </div>
        </el-form-item>
      </div>

      <div>
        <el-form-item label=" * 排期场次：">
          <el-select v-model="seekobj.PQCC" placeholder="请选择">
            <el-option
              v-for="item in PQCCList"
              :key="item.code"
              :label="item.PQCCtitle"
              :value="item.session"
            >
              <span style="float: left"
                >{{ item.date }}<span v-if="item.session == 1">上午</span
                ><span v-else>下午</span>（剩余{{ item.remain }}）</span
              >
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div>
        <el-form-item label=" * 排期人数：">
          <el-input v-model="seekobj.PQRS" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-dialog title="排期时间" :visible.sync="operate.dialogFormVisible">
      <div style="margin: 20px">
        <el-calendar v-model="value">
          <template
            slot="dateCell"
            slot-scope="{ date, data }"
            class="kalendar"
          >
            <div
              style="width: 100%; height: 100%"
              @click="
                selectDate(
                  data,
                  matchingdata(AllHospitalMsg.days, data.day),
                  item.id
                )
              "
            >
              <div style="font-size: 15px">
                {{ data.day.split("-").slice(2).join("-") }}
              </div>
              <div
                style="
                  font-size: 10px;
                  float: right;
                  width: calc(100% - 24px);
                  overflow: hidden;
                "
              >
                <div style="float: left; width: 33%; text-align: center">
                  总数
                </div>
                <div style="float: left; width: 34%; text-align: center">
                  已约
                </div>
                <div style="float: left; width: 33%; text-align: center">
                  剩余
                </div>
              </div>
              <div
                style="
                  font-size: 10px;
                  float: left;
                  width: 24px;
                  width: 100%;
                  overflow: hidden;
                "
              >
                <div style="float: left">上午</div>
                <div
                  style="
                    width: calc(100% - 24px);
                    float: left;
                    overflow: hidden;
                  "
                  v-if="AllHospitalMsg.days.length > 0"
                >
                  <div style="float: left; width: 33%; text-align: center">
                    <span v-if="matchingdata(AllHospitalMsg.days, data.day)">{{
                      matchingdata(AllHospitalMsg.days, data.day).limit_mor
                    }}</span>
                    <span v-else>-</span>
                  </div>

                  <div style="float: left; width: 34%; text-align: center">
                    <span v-if="matchingdata(AllHospitalMsg.days, data.day)">{{
                      matchingdata(AllHospitalMsg.days, data.day).sched_mor
                    }}</span>
                    <span v-else>-</span>
                  </div>
                  <div style="float: left; width: 33%; text-align: center">
                    <span v-if="matchingdata(AllHospitalMsg.days, data.day)">{{
                      matchingdata(AllHospitalMsg.days, data.day).remain_mor
                    }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
                <div
                  style="
                    width: calc(100% - 24px);
                    float: left;
                    overflow: hidden;
                  "
                  v-if="AllHospitalMsg.days.length == 0"
                >
                  <div style="float: left; width: 33%; text-align: center">
                    <span>-</span>
                  </div>
                  <div style="float: left; width: 34%; text-align: center">
                    <span>-</span>
                  </div>
                  <div style="float: left; width: 33%; text-align: center">
                    <span>-</span>
                  </div>
                </div>

                <div style="float: left">下午</div>
                <div
                  style="
                    width: calc(100% - 24px);
                    float: left;
                    overflow: hidden;
                  "
                  v-if="AllHospitalMsg.days.length > 0"
                >
                  <div style="float: left; width: 33%; text-align: center">
                    <span v-if="matchingdata(AllHospitalMsg.days, data.day)">{{
                      matchingdata(AllHospitalMsg.days, data.day).limit_aft
                    }}</span>
                    <span v-else>-</span>
                  </div>
                  <div style="float: left; width: 34%; text-align: center">
                    <span v-if="matchingdata(AllHospitalMsg.days, data.day)">{{
                      matchingdata(AllHospitalMsg.days, data.day).sched_aft
                    }}</span>
                    <span v-else>-</span>
                  </div>
                  <div style="float: left; width: 33%; text-align: center">
                    <span v-if="matchingdata(AllHospitalMsg.days, data.day)">{{
                      matchingdata(AllHospitalMsg.days, data.day).remain_aft
                    }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
                <div
                  style="
                    width: calc(100% - 24px);
                    float: left;
                    overflow: hidden;
                  "
                  v-if="AllHospitalMsg.days.length == 0"
                >
                  <div style="float: left; width: 33%; text-align: center">
                    <!--<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).numberAfternoon}}</span>-->
                    <span>-</span>
                  </div>
                  <div style="float: left; width: 34%; text-align: center">
                    <!--<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).alreadyNumberA}}</span>-->
                    <span>-</span>
                  </div>
                  <div style="float: left; width: 33%; text-align: center">
                    <!--<span v-if="matchingdata(days,data.day)">{{matchingdata(days,data.day).stockNumberA}}</span>-->
                    <span>-</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
      <div>
        <el-button @click="operate.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeChoose">确 定</el-button>
      </div>
    </el-dialog>

    <div style="float: left; margin-top: 50px">
      <el-button type="primary" @click="PQcreate()">排期生效</el-button>
      <el-button type="primary" @click="PQrevocation()">排期撤销</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckTuanDetail",
  components: {},
  data() {
    return {
      value: new Date(),
      activeNames: ["1"],
      operate: {
        dialogFormVisible: false,
      },
      TimePickervalue1: [],
      TimePickervalue1_model: [],
      AllHospitalMsg: {
        hospitalCode: "",
        AllHospital: [],
        HospitalShow: "",
        startDate: "",
        endDate: "",
        maxHC_mor: "",
        maxHC_aft: "",
        schedule: [],
        days: [],
        schedules_modify: [],
        chooseDate: "",
        current_month: "",
      },
      activeName: "selected",
      days: [],
      MSJschedules: [],
      seekobj: {
        MsjBILLCODE: "",
        DJSJ: "",
        TJFY: "",
        TJFYcode: "",
        PQtime: "",
        PQRS: 0,
        PQCC: "",
        id: "",
      },
      days: [],
      TJFYList: [],
      PQCCList: [],
      current_chang: "",
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.seekobj.MsjBILLCODE = this.$route.query.MsjBILLCODE;
    this.seekobj.DJSJ = this.$route.query.DJSJ;
    this.seekobj.TJFY = this.$route.query.TJFY;
    this.seekobj.PQtime = this.$route.query.date;
    this.seekobj.id = this.$route.query.id;
    this.seekobj.PQRS = this.$route.query.quota;
    this.seekobj.TJFYcode = this.$route.query.TJFYcode;
    this.GetFYList();
    this.PQCClook();
  },
  methods: {
    GetFYList() {
      this.$network3
        .get("/mnoracle/schedule/HospitalList")
        .then((res) => {
          console.log(res.data);
          this.TJFYList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseSchedule() {
      console.log(111111111111);
      this.operate.dialogFormVisible = true;
      console.log(this.operate.dialogFormVisible);
      console.log(this.seekobj.TJFY);
      this.getCalendar();
    },
    closeChoose() {
      this.seekobj.PQtime = this.changeTime(this.value);
      this.operate.dialogFormVisible = false;
      this.seekobj.PQCC="";
      this.PQCClook();
    },
    FYchange(val) {
      console.log(val);
      this.seekobj.TJFYcode = val;
      this.PQCClook();
      this.seekobj.PQCC="";
    },
    PQCClook() {
      var body = {
        code: this.seekobj.TJFYcode, // 分院代码
        date: this.seekobj.PQtime, // 日期
      };
      this.$network3
        .post("/mnoracle/schedule/CheckHospitalQuota", body)
        .then((res) => {
          console.log(res.data);
          res.data.map((item) => {
            if (item.session == 1) {
              item.PQCCtitle =
                item.date + "上午" + "（剩余" + item.remain + ")";
            } else if (item.session == 2) {
              item.PQCCtitle =
                item.date + "下午" + "（剩余" + item.remain + ")";
            }
          });
          this.PQCCList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    PQcreate() {
      if (this.seekobj.PQCC != "") {
        if (this.seekobj.PQRS != "") {
          var body = {
            id: this.seekobj.id, // 申请记录ID
            hospitalCode: this.seekobj.TJFYcode, // 分院代码
            date: this.seekobj.PQtime, // 日期
            session: this.seekobj.PQCC, // 场次
            quota: parseInt(this.seekobj.PQRS), // 人数
          };
          this.$confirm("你确定要生效此条排期吗？?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$network3
                .post("/mnoracle/schedule/UpdateAndAllowRequest", body)
                .then((res) => {
                  console.log(res);
                  if (res.code == 200) {
                    this.$message({
                      type: "success",
                      message: "排期已生效!",
                    });
                    setTimeout(() => {
                      this.$router.go(-1);
                    }, 1000);
                  } else {
                    this.$message.error(res.msg);
                  }
                })
                .catch((err) => {
                  this.$message.error(err.msg);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消",
              });
            });
        } else {
          this.$message.error("请输入排期人数！！");
        }
      } else {
        this.$message.error("请选择排期场次！！");
      }
    },
    PQrevocation() {
      var body = {
        id: this.seekobj.id, // 申请记录ID
      };

      this.$confirm("你确定要撤销此条排期吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$network3
            .post("/mnoracle/schedule/RevokeRequest", body)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "排期已撤销!",
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    changeTime(day) {
      console.log(day);
      // console.log(day1)
      var dayString = day.toString();
      if (dayString.indexOf("中国标准时间") == -1) {
        console.log(dayString);
        var day1 = new Date(day);
        day = day1;
      }

      console.log(day);

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
      if (Month >= 10) {
        CurrentDate += Month + "-";
      } else {
        CurrentDate += "0" + Month + "-";
      }
      if (Day >= 10) {
        CurrentDate += Day;
      } else {
        CurrentDate += "0" + Day;
      }
      console.log(CurrentDate);
      // this.seekobj.PQtime = CurrentDate;
      return CurrentDate;
    },
    selectDate(val, dataval, id) {
      console.log(56565656);
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
        if (this.matchingdata(this.AllHospitalMsg.days, val.day)) {
          this.modificationM = dataval.limit_mor;
          this.modificationA = dataval.limit_aft;
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
      console.log(dayList);
      //				console.log(dayData)
      //				console.log(this.megliast)
      //				console.log(this.megliast.leadTime)
      //				console.log(this.megliast.endTime)
      // var start = this.fun_date(new Date(this.megliast.startTime.substring(0, 10)), this.megliast.leadTime)
      var end = this.changeTime(this.TimePickervalue1[1]).substring(0, 10);
      //				console.log(start)
      //				console.log(new Date(dayData))
      //				console.log(start)
      //				console.log(new Date(end))
      //				if(start < new Date(dayData) && new Date(dayData) < new Date(end))
      //				if(new Date(dayData) <= new Date(end))
      if (new Date(dayData) <= new Date(end)) {
        for (var i = 0; i < dayList.length; i++) {
          if (dayData == dayList[i].date) {
            var mes = dayList[i];
            //							console.log(mes)
            return mes;
          } else if (i == dayList.length - 1) {
            return false;
          }
        }
      } else {
        return false;
      }
      //				console.log(dayList)
      return true;
    },
    getCalendar() {
      var that = this;
      var tt = this.changeTime(this.value);

      console.log(tt);
      var end = tt.substring(0, 7);
      console.log(end);
      this.AllHospitalMsg.current_month = end;
      var body = {
        hospitalCode: this.seekobj.TJFYcode,
        month: this.AllHospitalMsg.current_month,
        startDate: "",
        endDate: "",
        // startDate:this.changeTime(this.TimePickervalue1[0]),
        // endDate:this.changeTime(this.TimePickervalue1[1]),
      };
      this.$network3
        .post("/mnoracle/schedule/Calendar", body)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.length > 0) {
            console.log(res.data.length - 1);
            console.log(res.data[res.data.length - 1].date);

            // this.TimePickervalue1[0]=res.data[0].date
            // this.TimePickervalue1[1]=res.data[res.data.length-1].date
            this.AllHospitalMsg.days = [];
            var taocanTemp = [];

            for (var i = 0; i < res.data.length; i++) {
              const newObj = JSON.parse(JSON.stringify(res.data[i]));
              taocanTemp.push(newObj);
            }
            var days = [];
            let tempArr = [],
              newArr = [],
              anArray = [],
              suplusArray = [];
            for (let i = 0; i < taocanTemp.length; i++) {
              // console.log(that.TimePickervalue1)
              // console.log(typeof that.TimePickervalue1)
              that.TimePickervalue1.push(taocanTemp[0].date);
              that.TimePickervalue1.push(
                taocanTemp[taocanTemp.length - 1].date
              );

              if (tempArr.indexOf(taocanTemp[i].date) === -1) {
                newArr.push(taocanTemp[i]);
                tempArr.push(taocanTemp[i].date);
              } else {
                suplusArray.push(taocanTemp[i].date);
                anArray.push(taocanTemp[i]);
              }

              // newArr.push(obj)
            }
            console.log(tempArr);
            console.log(newArr);
            console.log(anArray);
            var obj = {
              date: "",
              limit_mor: "",
              limit_aft: "",
              sched_mor: "",
              sched_aft: "",
              indSched_mor: "",
              indSched_aft: "",
              remain_mor: "",
              remain_aft: "",
              descs_mor: "",
              descs_aft: "",
            };
            let daysArray = [];
            for (var i = 0; i < newArr.length; i++) {
              for (var j = 0; j < anArray.length; j++) {
                // console.log(suplusArray);
                // console.log(newArr[i].date);
                if (suplusArray.indexOf(newArr[i].date) == -1) {
                  console.log(newArr[i].date);
                  var obj = {
                    date: "",
                    limit_mor: "",
                    limit_aft: "",
                    sched_mor: "",
                    sched_aft: "",
                    indSched_mor: "",
                    indSched_aft: "",
                    remain_mor: "",
                    remain_aft: "",
                    descs_mor: "",
                    descs_aft: "",
                  };

                  if (newArr[i].session === 1) {
                    obj.date = newArr[i].date;
                    obj.limit_mor = newArr[i].limit;
                    obj.sched_mor = newArr[i].sched;
                    obj.indSched_mor = newArr[i].indSched;
                    obj.remain_mor = newArr[i].remain;
                    obj.descs_mor = newArr[i].descs;
                    obj.limit_aft = "";
                    obj.sched_aft = "";
                    obj.indSched_aft = "";
                    obj.remain_aft = "";
                    obj.descs_aft = "";
                  } else if (newArr[i].session === 2) {
                    obj.date = newArr[i].date;
                    obj.limit_mor = "";
                    obj.sched_mor = "";
                    obj.indSched_mor = "";
                    obj.remain_mor = "";
                    obj.descs_mor = "";
                    obj.limit_aft = newArr[i].limit;
                    obj.sched_aft = newArr[i].sched;
                    obj.indSched_aft = newArr[i].indSched;
                    obj.remain_aft = newArr[i].remain;
                    obj.descs_aft = newArr[i].descs;
                  }
                  console.log(obj);
                  daysArray.push(obj);
                }
                if (newArr[i].date == anArray[j].date) {
                  // console.log(newArr[i]);
                  var obj = {
                    date: "",
                    limit_mor: "",
                    limit_aft: "",
                    sched_mor: "",
                    sched_aft: "",
                    indSched_mor: "",
                    indSched_aft: "",
                    remain_mor: "",
                    remain_aft: "",
                    descs_mor: "",
                    descs_aft: "",
                  };
                  if (newArr[i].session === 1) {
                    obj.date = newArr[i].date;
                    obj.limit_mor = newArr[i].limit;
                    obj.sched_mor = newArr[i].sched;
                    obj.indSched_mor = newArr[i].indSched;
                    obj.remain_mor = newArr[i].remain;
                    obj.descs_mor = newArr[i].descs;
                    obj.limit_aft = anArray[j].limit;
                    obj.sched_aft = anArray[j].sched;
                    obj.indSched_aft = anArray[j].indSched;
                    obj.remain_aft = anArray[j].remain;
                    obj.descs_aft = anArray[j].descs;
                  } else if (newArr[i].session === 2) {
                    obj.date = newArr[i].date;
                    obj.limit_mor = anArray[j].limit;
                    obj.sched_mor = anArray[j].sched;
                    obj.indSched_mor = anArray[j].indSched;
                    obj.remain_mor = anArray[j].remain;
                    obj.descs_mor = anArray[j].descs;
                    obj.limit_aft = newArr[i].limit;
                    obj.sched_aft = newArr[i].sched;
                    obj.indSched_aft = newArr[i].indSched;
                    obj.remain_aft = newArr[i].remain;
                    obj.descs_aft = newArr[i].descs;
                  }
                  daysArray.push(obj);
                }
              }
            }
            console.log(daysArray);

            var obj_days = {};
            daysArray = daysArray.reduce(function (item, next) {
              obj_days[next.date]
                ? ""
                : (obj_days[next.date] = true && item.push(next));
              return item;
            }, []);
            console.log(daysArray);
            this.AllHospitalMsg.days = daysArray;
            console.log(this.AllHospitalMsg.days);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    value: {
      handler(newName, oldName) {
        console.log(this.value);

        this.getCalendar();

        console.log(this.value);
      },
      immediate: true,
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>
