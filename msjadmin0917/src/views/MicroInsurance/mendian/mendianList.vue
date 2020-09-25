<template>
  <div class="container">
    <el-row class="header">
      <el-col :span="2.5" class="shop-name">
        <div>门店名称：</div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-input placeholder="请输入内容" v-model="shopName" clearable size="medium" style="width:80%;">
          </el-input>
        </div>
      </el-col>
      <el-col :span="2.5" class="area-name">
        <div>所在区域：</div>
      </el-col>
      <el-col :span="3">
        <div>
          <el-select v-model="area" placeholder="请选择" size="medium" @change="selectOneArea">
            <el-option v-for="item in areaArr" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="2.5" class="city-name">
        <div>所在城市：</div>
      </el-col>
      <el-col :span="3">
        <div>
          <el-select v-model="city" placeholder="请选择" size="medium">
            <el-option v-for="item in cityArr" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row class="header">
      <el-col :span="2.5" class="shop-code">
        <div>门店编码：</div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-input placeholder="请输入内容" v-model="shopCode" clearable size="medium" style="width:80%;">
          </el-input>
        </div>
      </el-col>
      <el-col :span="3" style="float: right;">
        <el-button type="primary" size="medium" icon="el-icon-search" class="btn" @click="searchShopList">搜索</el-button>
      </el-col>
      <el-col :span="3" style="float: right;">
        <el-button type="info" size="medium" icon="el-icon-plus" class="btn-add" disabled>新增门店</el-button>
      </el-col>
    </el-row>

    <el-table :data="shopList" style="width:100%" :header-cell-style="{background: '#F5F5F5'}" show-overflow-tooltip>
      <el-table-column label="体检中心名称" width="200px" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="center-name-class">
            {{scope.row.CenterName}}
          </div>
        </template>

      </el-table-column>
      <el-table-column prop="AreaName"
                       label="所属区域">
      </el-table-column>
      <el-table-column prop="CityName"
                       label="所属城市">
      </el-table-column>
      <el-table-column label="详细信息">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toggleShopDetailDialog(scope.row.Id)">
            点击预览
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="remark-class">{{ scope.row.Remark != 'NULL'? scope.row.Remark: '' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" disabled>
            修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="排期设置">
        <template slot-scope="scope">
          <div class="date-set" >
          <el-button type="text" size="small">
              <span @click="openDateOptionsDialog(scope.row.Id,scope.row.Scheduling)">设置</span>
          </el-button>
            <div class="dot-icon-outer" v-if="scope.row.Scheduling!='1'">
              <div class="dot-icon-inner"></div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="pagination-row">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPageIndex"
        :page-sizes="[10,20,30,40]"
        :page-size="pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="totalCount"
      ></el-pagination>
    </el-row>

    <el-dialog
      :visible.sync="showDateOptionsDialog"
      width="900px">
      <div class="date-dialog-title">排期设置</div>
      <div class="week-check-box">
        <div class="week-title">* 每周可约天数</div>
        <div>
          <el-checkbox-group  v-model="weekdays">
            <el-checkbox label="1">周一</el-checkbox>
            <el-checkbox label="2">周二</el-checkbox>
            <el-checkbox label="3">周三</el-checkbox>
            <el-checkbox label="4">周四</el-checkbox>
            <el-checkbox label="5">周五</el-checkbox>
            <el-checkbox label="6">周六</el-checkbox>
            <el-checkbox label="0">周日</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="advance-box">
        <div class="advance-title">* 提前可约天数</div>
        <div>
          <el-input class="advance-input" placeholder="请输入0～30整数" v-model="advancedDays" clearable size="medium">
          </el-input>
          <span class="err-tips" v-if="isAdvancedDaysErr">请输入0到30的整数</span>
        </div>
      </div>
      <div class="person-config">
        <div class="person-title">* 人数配置</div>
        <div class="person-tips">提示：若当日有特殊人数配置，请选择具体日期进行设置</div>
        <div class="default-person">
          <div :class="isAmInputErr?'am-box-err':'am-box'">
            <span class="am-title">默认可约人数：</span>
            <span>上午</span>
            <el-input class="am-input" placeholder="请输入0～10000整数" v-model="amInput" clearable></el-input>
            <span>备注</span>
            <el-input class="am-input-remarks" placeholder="选填，请输入20字内" v-model="amInputRemarks" clearable maxlength	="20"></el-input>
          </div>
          <div class="error-tips" v-if="isAmInputErr">请输入0～10000整数</div>
          <div class="pm-box">
            <span class="pm-text">下午</span>
            <el-input class="pm-input" placeholder="请输入0～10000整数" v-model="pmInput" clearable></el-input>
            <span>备注</span>
            <el-input class="pm-input-remarks" placeholder="选填，请输入20字内" v-model="pmInputRemarks" clearable maxlength	="20"></el-input>
          </div>
          <div class="error-tips" v-if="isPmInputErr">请输入0～10000整数</div>
        </div>
        <div class="calender-box">
          <Calender @config_selected_Day="configSelectedDay" :calenArr="calendarArr"></Calender>
          <div class="calender-config" v-if="showDayBox">
            <div class="calender-config-header">
              <span style="margin-left:10px;margin-right: 30px;">当前选择</span>
              <span>{{specialConfigYear}}年{{specialConfigMonth}}月{{specialConfigDay}}日</span>
              <img src="@/assets/img/close.png" class="close-icon" @click="closeSelectedBox">
            </div>
            <div class="calender-config-input">
              <div :class="isCalenderAmInputErr?'calender-am-box-err':'calender-am-box'">
                <span class="calender-text">上午</span>
                <el-input class="calender-am-input" placeholder="请输入0～10000整数" v-model="calenderAmInput" clearable size="medium">
                </el-input>
              </div>
              <div class="calender-error-tips" v-if="isCalenderAmInputErr">请输入0～10000整数</div>
              <div class="calender-pm-box">
                <span class="calender-text">下午</span>
                <el-input class="calender-pm-input" placeholder="请输入0～10000整数" v-model="calenderPmInput" clearable size="medium">
                </el-input>
              </div>
              <div class="calender-error-tips" v-if="isCalenderPmInputErr">请输入0～10000整数</div>
            </div>
            <div :class="(isCalenderAmInputErr || isCalenderPmInputErr)? 'calender-config-button-err':'calender-config-button'">
              <el-button type="info" size="medium" class="calender-config-cancel" @click="closeSelectedBox">取消</el-button>
              <el-button type="primary" size="medium" class="calender-config-confirm" @click="SaveOneDaySchedule">确认</el-button>
            </div>
          </div>
        </div>
        <div class="dialog-button">
          <el-button type="info" size="medium" class="dialog-button-cancel" @click="closeDateOptionsDialog">取消</el-button>
          <el-button type="primary" size="medium" class="dialog-button-confirm" @click="SaveSchedule">确认</el-button>
        </div>
      </div>
    </el-dialog>

    <!--查看门店详细信息-->
    <el-dialog title="美年门店信息" width="1000px" :visible.sync="showShopDetailDialog">
      <el-container>
          <el-aside width="400px">
            <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" size="medium" style="margin-top: 25px;">
              <el-form-item label="门店名称：" prop="CenterName">
                <el-input v-model="ruleForm.CenterName" placeholder="请输入门店名称" style="width:230px;" clearable disabled></el-input>
              </el-form-item>
              <el-form-item label="地区：" prop="AreaName">
                <el-select v-model="ruleForm.AreaName"  filterable placeholder="请选择所在地区" style="width:230px;" disabled>
                  <el-option v-for="item in areaArr" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="城市：" prop="CityName">
                <el-select v-model="ruleForm.CityName"  filterable placeholder="请选择所在城市" style="width:230px;" disabled>
                  <el-option v-for="item in cityArr" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="体检中心编码：" prop="LocalCenterCode">
                <el-input v-model="ruleForm.LocalCenterCode" placeholder="请输入体检中心编码" style="width:230px;" clearable disabled></el-input>
              </el-form-item>
              <el-form-item label="门店地址：" prop="Address">
                <el-input v-model="ruleForm.Address" placeholder="请输入门店地址" style="width:230px;" clearable disabled></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="PhoneNumber">
                <el-input v-model="ruleForm.PhoneNumber" placeholder="请输入联系电话" style="width:230px;" clearable disabled></el-input>
              </el-form-item>
              <el-form-item label="营业时间：" prop="WorkTime">
                <el-input v-model="ruleForm.WorkTime" placeholder="请输入营业时间" style="width:230px;" clearable disabled></el-input>
              </el-form-item>
              <el-form-item label="经纬度：" prop="BaiDuMap">
                <el-input v-model="ruleForm.BaiDuMap" placeholder="请输入经纬度" style="width:230px;" clearable disabled></el-input>
              </el-form-item>
              <el-form-item label="备注说明" prop="Remark">
                <el-input type="textarea" v-model="ruleForm.Remark" placeholder="请输入备注说明" style="width:230px;" clearable disabled></el-input>
              </el-form-item>
            </el-form>
          </el-aside>
          <el-main>
            <div id="storelist_baidu">
              <iframe src="https://api.map.baidu.com/lbsapi/getpoint/index.html" height="680" width="560" frameborder="0" scrolling="0"></iframe>
            </div>
          </el-main>
        </el-container>
      <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button>取 消</el-button>-->
          <!--<el-button>确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
  </div>
</template>

<script>
  import Calender from '@/components/Calender/Calender'
  export default {
    data() {
      return {
        shopName: '',//输入的门店名称
        shopCode: '',
        shopList: [],
        totalCount: 0,
        pageSize: 20,
        currentPageIndex: 0,
        showDateOptionsDialog: false,
        weekdays: [],
        advancedDays: '',
        amInput: '',
        amInputRemarks: '',
        pmInput: '',
        pmInputRemarks: '',
        calendarArr: [],
        calenderAmInput: '',
        calenderPmInput: '',
        showDayBox: false,
        specialConfigYear: '',
        specialConfigMonth: '',
        specialConfigDay: '',
        area: '',
        areaArr: [],
        city: '',
        cityArr: [],
        showShopDetailDialog: false,
        ruleForm: {
          CenterName: "", //门店名称
          AreaName: "", //区域名称
          CityName: "", //城市名称
          LocalCenterCode: "", //门店编码
          Address: "", //地址
          PhoneNumber: "", //手机号
          WorkTime: "", //营业时间
          BaiDuMap: "", //百度地图
          Remark: "" //备注
        },
        // 表单规则
        rules: {
          CenterName: [
            { required: true, message: "请输入门店名称", trigger: "change" }
          ],
          AreaName: [
            { required: true, message: "请选择所在地区", trigger: "change" }
          ],
          CityName: [
            { required: true, message: "请选择所在城市", trigger: "change" }
          ],
          LocalCenterCode: [
            { required: true, message: "请输入体检中心编码", trigger: "change" }
          ],
          Address: [
            { required: true, message: "请输入门店地址", trigger: "change" }
          ],
          PhoneNumber: [
            { required: true, message: "请输入联系电话", trigger: "change" }
          ],
          WorkTime: [
            { required: true, message: "请输入营业时间", trigger: "change" }
          ],
          BaiDuMap: [
            { required: true, message: "请输入经纬度", trigger: "change" }
          ],
          Remark: [
            { required: true, message: "请输入备注说明", trigger: "change" }
          ]
        },
        hasSetSchedule: '',
        shopId: '',
        dateSchedule: [],
        dayS: [],
        daySTmp: [],
        isAdvancedDaysErr: false,
        isAmInputErr: false,
        isPmInputErr: false,
        isCalenderAmInputErr: false,
        isCalenderPmInputErr: false
      }
    },
    components: {
      Calender
    },
    mounted() {
      const today = new Date()
      this.specialConfigYear = today.getFullYear()
      this.specialConfigMonth = today.getMonth() + 1
      this.specialConfigDay = today.getDate()

      //获取所在区域与所在城市选框的内容
      this.$api.get('/center/getStoreCascade',{})
          .then(res => {
              console.log(res.data)
              const result = res.data;

              this.areaArr = result.AreaName
              this.cityArr = result.CityName
          })
          .catch(err => {
              console.log(err)
          })

      //进入页面获取所有门店列表
      this.getShopList({page: this.currentPageIndex,pageSize: this.pageSize})
    },
    methods: {
      openDateOptionsDialog(shopId,hasSetSchedule) {
        console.log(shopId,typeof shopId)
        console.log(hasSetSchedule,typeof hasSetSchedule)

        this.hasSetSchedule = hasSetSchedule
        this.shopId = shopId

        //该门店之前已经设置过排期，查询之前设置的排期
        if(hasSetSchedule == '1') {
          console.log('maninininininininnini')
          this.$api.get('/scheduling/AddWeek',{ id: shopId })
            .then(res => {
              console.log(res.data)
              const result = res.data
              const subsidiaryWeek = result.subsidiaryWeek
              console.log(subsidiaryWeek)

              let weeks = []
              for(let item of subsidiaryWeek) {
                weeks.push(item.week.toString())
              }

              const firstDay = subsidiaryWeek[0]
              // const amInput = firstDay.numberMorning == 0 ? '': firstDay.numberMorning
              // const pmInput = firstDay.numberAfternoon == 0? '': firstDay.numberAfternoon
              const amInput = firstDay.numberMorning
              const pmInput = firstDay.numberAfternoon
              const amInputRemarks = firstDay.remarksM
              const pmInputRemarks = firstDay.remarksA


              console.log(weeks)
              console.log(amInput,pmInput,amInputRemarks,pmInputRemarks)

              this.amInput = amInput
              this.pmInput = pmInput
              this.amInputRemarks = amInputRemarks
              this.pmInputRemarks = pmInputRemarks
              this.weekdays = weeks
            })
            .catch(err => {
              console.log(err)
            })

          this.$api.get('/scheduling/QueryScheduling',{ id: shopId })
            .then(res => {
              console.log(res.data)
              const result = res.data

              // const advancedDays = result.appointmentDay == 0 ? '': result.appointmentDay
              const advancedDays = result.appointmentDay
              const dayS = result.dayS

              for(let item of dayS) {
                item.date = item.date.substr(0,4) + item.date.substr(5,2) + item.date.substr(8,2)
              }
              console.log(dayS)

              this.advancedDays = advancedDays
              this.calendarArr = dayS.slice()
              this.daySTmp = dayS.slice()
              this.dayS = dayS
            })
            .catch(err => {
              console.log(err)
            })
        }else {
          //之前该门店没有查询过排期，此时显示为空的状态
          console.log('hahhahahhahhahahha')
          this.amInput = ''
          this.pmInput = ''
          this.amInputRemarks = ''
          this.pmInputRemarks = ''
          this.weekdays = []

          this.advancedDays = ''
          this.calendarArr = []
          this.dayS = []
          this.daySTmp = []
        }

        this.showDateOptionsDialog = true
      },
      closeDateOptionsDialog() {
        this.showDateOptionsDialog = false
      },
      toggleShopDetailDialog(shopId) {
        console.log(shopId)

        this.$api.get('center/pullOne',{ id: shopId })
          .then(res => {
              console.log(res.data)
            this.ruleForm = res.data
          })
          .catch(err => {
              console.log(err)
          })

        const { showShopDetailDialog } = this
        this.showShopDetailDialog = !showShopDetailDialog
      },
      selectOneArea(areaName) {
        console.log(areaName)

        this.$api.get('/center/getStoreCascade',{ areaName })
          .then(res => {
            const result = res.data;

            // this.area = result.AreaName
            this.area = areaName
            this.cityArr = result.CityName
          })
          .catch(error => {
            console.log(err)
          })
      },
      configSelectedDay(selectedDay,isBefore) {
        console.log(selectedDay,typeof selectedDay,isBefore)

        if(!isBefore) {
          if(!this.showDayBox) {
            this.showDayBox = true
          }

          console.log(selectedDay,typeof selectedDay)
          const year = selectedDay.substring(0,4)
          const month = selectedDay.substring(4,6)
          const day = selectedDay.substring(6)
          const fullDay = year + month + day
          // const calendarArr = this.calendarArr
          const daySTmp = this.daySTmp
          // console.log(calendarArr,fullDay)

          const isConfig = daySTmp.some(function(elem) {
            if(elem.date == fullDay) {
              return true
            }
          })

          if(isConfig) {
            // const arr = calendarArr.filter(function(item) {
            //   return item.date == fullDay
            // })
            // console.log(arr)
            var dateArr = []
            for(let item of daySTmp) {
              if(item.date == fullDay) {
                dateArr.push(item)
                break
              }
            }

            console.log(dateArr)
            if(dateArr.length > 0) {
              // this.calenderAmInput = dateArr[0].numberMorning
              // this.calenderPmInput = dateArr[0].numberAfternoon
              // this.calenderAmInput = dateArr[0].numberMorning == 0 ? '': dateArr[0].numberMorning
              // this.calenderPmInput = dateArr[0].numberAfternoon == 0 ? '': dateArr[0].numberAfternoon
              this.calenderAmInput = dateArr[0].numberMorning
              this.calenderPmInput = dateArr[0].numberAfternoon
            }
          }else {
            this.calenderAmInput = ""
            this.calenderPmInput = ""
          }

          this.specialConfigYear = year
          this.specialConfigMonth = month
          this.specialConfigDay = day
        }
      },
      closeSelectedBox() {
        this.showDayBox = false
        this.calenderAmInput = ""
        this.calenderPmInput = ""
      },
      SaveOneDaySchedule() {
        var { daySTmp } = this

        console.log(daySTmp)
        const date = this.specialConfigYear + this.specialConfigMonth + this.specialConfigDay

        var numberMorning = this.calenderAmInput
        // var stockNumberM = this.calenderAmInput
        var numberAfternoon = this.calenderPmInput
        // var stockNumberA = this.calenderPmInput

        if(numberMorning > 10000) {
          this.$alert('上午的天数过大','提示',{
            showConfirmButton: false,
            center: true
          })
        }else if(numberAfternoon > 10000) {
          this.$alert('下午的天数过大','提示',{
            showConfirmButton: false,
            center: true
          })
        }else {
          console.log(date,typeof date)
          console.log(daySTmp)

          let dateIndex = -1
          // let alreadyNumberM = 0
          // let alreadyNumberA = 0
          //
          for(let i = 0;i < daySTmp.length; i++) {
            if(daySTmp[i].date == date) {
              dateIndex = i
              // alreadyNumberM = daySTmp[i].alreadyNumberM
              // alreadyNumberA = daySTmp[i].alreadyNumberA
            }
          }

          if(dateIndex != -1) {
            daySTmp.splice(dateIndex,1)
          }

          if(numberMorning != "" || numberAfternoon != "") {
            numberMorning = numberMorning != ""?parseInt(numberMorning): 0
            // stockNumberM = stockNumberM != ""?parseInt(stockNumberM): 0
            numberAfternoon = numberAfternoon != ""?parseInt(numberAfternoon): 0
            // stockNumberA = stockNumberA != ""?parseInt(stockNumberA): 0

            // stockNumberM = numberMorning - alreadyNumberM
            // stockNumberA = numberAfternoon - alreadyNumberA

            // const oneday = { date,numberMorning,stockNumberM,alreadyNumberM,numberAfternoon,stockNumberA,alreadyNumberA}
          const oneday = { date,numberMorning,numberAfternoon }
          daySTmp.push(oneday)
            console.log(daySTmp)
          }
          // else {
          //   numberMorning = 0
          //   numberAfternoon = 0
          //   stockNumberM = numberMorning - alreadyNumberM
          //   stockNumberA = numberAfternoon - alreadyNumberA
          //
          //   const oneday = { date,numberMorning,stockNumberM,alreadyNumberM,numberAfternoon,stockNumberA,alreadyNumberA}
          //   daySTmp.push(oneday)
          // }
          this.daySTmp = daySTmp

          this.closeSelectedBox()
        }
      },
      // SaveOneDaySchedule() {
      //   var { daySTmp } = this
      //
      //   console.log(daySTmp)
      //   const date = this.specialConfigYear + this.specialConfigMonth + this.specialConfigDay
      //
      //   // var dateArr = []
      //   // for(let item of daySTmp) {
      //   //   if(item.date == date) {
      //   //     dateArr.push(item)
      //   //     break
      //   //   }
      //   // }
      //   //
      //   // console.log(dateArr)
      //   // if(dateArr.length > 0) {
      //   //   this.calenderAmInput = dateArr[0].numberMorning
      //   //   this.calenderPmInput = dateArr[0].numberAfternoon
      //   // }
      //
      //   // const numberMorning = this.calenderAmInput != ""? parseInt(this.calenderAmInput): 0
      //   // const stockNumberM = this.calenderAmInput != ""? parseInt(this.calenderAmInput): 0
      //   // const numberAfternoon = this.calenderPmInput != ""? parseInt(this.calenderPmInput): 0
      //   // const stockNumberA = this.calenderPmInput != ""? parseInt(this.calenderPmInput): 0
      //
      //   var numberMorning = this.calenderAmInput
      //   // var stockNumberM = this.calenderAmInput
      //   var numberAfternoon = this.calenderPmInput
      //   // var stockNumberA = this.calenderPmInput
      //
      //   if(numberMorning > 10000) {
      //     this.$alert('上午的天数过大','提示',{
      //       showConfirmButton: false,
      //       center: true
      //     })
      //   }else if(numberAfternoon > 10000) {
      //     this.$alert('下午的天数过大','提示',{
      //       showConfirmButton: false,
      //       center: true
      //     })
      //   }else {
      //     console.log(date,typeof date)
      //     console.log(daySTmp)
      //
      //     let dateIndex = -1
      //     //stockNumberM
      //     let alreadyNumberM = 0
      //     let alreadyNumberA = 0
      //     // let stockNumberM = 0
      //     // let stockNumberA = 0
      //
      //     for(let i = 0;i < daySTmp.length; i++) {
      //       if(daySTmp[i].date == date) {
      //         dateIndex = i
      //         alreadyNumberM = daySTmp[i].alreadyNumberM
      //         alreadyNumberA = daySTmp[i].alreadyNumberA
      //       }
      //     }
      //     // for(let i = 0;i < daySTmp.length; i++) {
      //     //   if(daySTmp[i].date == date) {
      //     //     dateIndex = i
      //     //     stockNumberM = daySTmp[i].stockNumberM
      //     //     stockNumberA = daySTmp[i].stockNumberA
      //     //   }
      //     // }
      //     console.log(dateIndex,stockNumberM,stockNumberA)
      //     if(dateIndex != -1) {
      //       daySTmp.splice(dateIndex,1)
      //     }
      //
      //     if(numberMorning != "" || numberAfternoon != "") {
      //       // console.log(date,typeof date)
      //       // console.log(daySTmp)
      //       //
      //       // let dateIndex = -1
      //       // for(let i = 0;i < daySTmp.length; i++) {
      //       //   if(daySTmp[i].date == date) {
      //       //     dateIndex = i
      //       //   }
      //       // }
      //       // console.log(dateIndex)
      //       // if(dateIndex != -1) {
      //       //   daySTmp.splice(dateIndex,1)
      //       // }
      //       numberMorning = numberMorning != ""?parseInt(numberMorning): 0
      //       stockNumberM = stockNumberM != ""?parseInt(stockNumberM): 0
      //       numberAfternoon = numberAfternoon != ""?parseInt(numberAfternoon): 0
      //       stockNumberA = stockNumberA != ""?parseInt(stockNumberA): 0
      //
      //       // let alreadyNumberM = numberMorning - stockNumberM
      //       // let alreadyNumberA = numberAfternoon - stockNumberA
      //
      //       alreadyNumberM = numberMorning - stockNumberM
      //       alreadyNumberA = numberAfternoon - stockNumberA
      //
      //       const oneday = { date,numberMorning,stockNumberM,alreadyNumberM,numberAfternoon,stockNumberA,alreadyNumberA}
      //       daySTmp.push(oneday)
      //     }
      //     // else {
      //     //   numberMorning = 0
      //     //   numberAfternoon = 0
      //     //   stockNumberM = numberMorning - alreadyNumberM
      //     //   stockNumberA = numberAfternoon - alreadyNumberA
      //     //
      //     //   const oneday = { date,numberMorning,stockNumberM,alreadyNumberM,numberAfternoon,stockNumberA,alreadyNumberA}
      //     //   daySTmp.push(oneday)
      //     // }
      //     this.daySTmp = daySTmp
      //
      //     this.closeSelectedBox()
      //   }
      // },
      handleCurrentChange(newPage) {
        this.currentPageIndex = newPage

        const params = {
          page: this.currentPageIndex,
          pageSize: this.pageSize
        }

        this.getShopList(params)
      },
      handleSizeChange(newPageSize) {
        this.pageSize = newPageSize
        this.currentPageIndex = 1
        const params = {
          page: this.currentPageIndex,
          pageSize: this.pageSize
        }
        this.getShopList(params)
      },
      searchShopList() {
        console.log('333')
        const {
          shopName,
          area,
          city,
          shopCode
        } = this
        const page = this.currentPageIndex
        const pageSize = this.pageSize
        console.log(shopName,area,city,shopCode)

        const params = {
          centerName: shopName,
          areaName: area,
          cityName: city,
          localCenterCode: shopCode,
          page,
          pageSize
        }

        this.getShopList(params)
      },
      //获取门店列表函数
      getShopList(params) {
        this.$api.get('/center/pullAll',params)
          .then(res => {
            console.log(res.data)
            const data = res.data

            const totalCount = data.count
            const shopList = data.data
            console.log(totalCount,shopList)

            this.shopList = shopList
            this.totalCount = totalCount
          })
          .catch(err => {
            console.log(err)
          })
      },
      SaveSchedule() {
        const { shopId, hasSetSchedule } = this
        console.log(shopId,hasSetSchedule,typeof hasSetSchedule)

        if(this.weekdays.length == 0) {
          // this.$alert('请选择每周可约天数','提示',{
          //   showConfirmButton: false,
          //   center: true
          // })
          this.$message({
            showClose: true,
            message: '请选择每周可约天数',
            type: 'error'
          });
        }else if(this.advancedDays == "") {
          // this.$alert('请输入提前可约天数','提示',{
          //   showConfirmButton: false,
          //   center: true
          // })
          this.$message({
            showClose: true,
            message: '请输入提前可约天数',
            type: 'error'
          });
        }else if(this.amInput == "" && this.pmInput == "") {
          // this.$alert('请输入默认可约人数','提示',{
          //   showConfirmButton: false,
          //   center: true
          // })
          this.$message({
            showClose: true,
            message: '请输入默认可约人数',
            type: 'error'
          });
        }else {
          if(this.advancedDays > 30) {
            // this.$alert('提前可约天数输入过大','提示',{
            //   showConfirmButton: false,
            //   center: true
            // })
            this.$message({
              showClose: true,
              message: '提前可约天数输入过大',
              type: 'error'
            });
          }else if(this.amInput > 10000) {
            // this.$alert('上午的默认可约人数过大','提示',{
            //   showConfirmButton: false,
            //   center: true
            // })
            this.$message({
              showClose: true,
              message: '上午的默认可约人数过大',
              type: 'error'
            });
          }else if(this.pmInput > 10000) {
            // this.$alert('下午的默认可约人数过大','提示',{
            //   showConfirmButton: false,
            //   center: true
            // })
            this.$message({
              showClose: true,
              message: '下午的默认可约人数过大',
              type: 'error'
            });
          }else {
            const id = shopId
            const appointmentDay = this.advancedDays == '' ? 0 : parseInt(this.advancedDays)
            let subsidiaryWeek = []

            for(let item of this.weekdays) {
              let aDay = {}
              aDay.week = parseInt(item)
              aDay.numberMorning = this.amInput == '' ? 0 : parseInt(this.amInput)
              aDay.remarksM = this.amInputRemarks
              aDay.numberAfternoon = this.pmInput == '' ? 0 : parseInt(this.pmInput)
              aDay.remarksA = this.pmInputRemarks
              subsidiaryWeek.push(aDay)
            }
            const weekS = {id,subsidiaryWeek}

            var { daySTmp } = this
            daySTmp.forEach(function (item) {
              console.log(item.date.substring(0,4), item.date.substring(4,6),item.date.substring(6,8))
              const dateString = item.date.substring(0,4) + "-" + item.date.substring(4,6) + "-" + item.date.substring(6,8)
              console.log(dateString)
              item.date = dateString
            })

            const dayS = daySTmp.slice()

            const params = { id,appointmentDay,weekS,dayS }
            console.log(params)

            if(hasSetSchedule != "1") {
              //之前没有设置过排期，此时添加排期
              console.log('111')
              this.$api.post('/scheduling/AddScheduling',params)
                .then(res => {
                  console.log(res)
                  this.searchShopList()
                })
                .catch(err => {
                  console.log(err)
                })
            }else {
              console.log('222')
              const {
                weekdays,
                advancedDays,
                amInput,
                amInputRemarks,
                pmInput,
                pmInputRemarks
              } = this
              console.log(id)
              console.log(weekdays,
                advancedDays,
                amInput,
                amInputRemarks,
                pmInput,
                pmInputRemarks)

              let week = []
              for(let item of weekdays) {
                let weekday = {}
                weekday.week = parseInt(item)
                weekday.numberMorning = this.amInput == '' ? 0 : parseInt(this.amInput)
                weekday.remarksM = amInputRemarks
                weekday.numberAfternoon = this.pmInput == '' ? 0 : parseInt(this.pmInput)
                weekday.remarksA = pmInputRemarks
                week.push(weekday)
              }

              console.log({id,week})

              // this.$api.post('/scheduling/ModifyWeek',{ id, week })
              //   .then(res => {
              //     console.log(res)
              //   }).catch(err => {
              //   console.log(err)
              // })

              this.$api.post('/scheduling/ModifyAppointmentDay',{ id,appointmentDay: advancedDays == '' ? 0 :parseInt(advancedDays)})
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  console.log(err)
                })

              console.log(daySTmp)
              const dayS = daySTmp.slice()

              this.modifyWeek({ id, week })
                .then(this.modifyDay({id,dayS}))
                .then(this.searchShopList)
                .catch(err => {
                  console.log(err)
                })

              // this.$api.post('/scheduling/ModifyDay',{id,dayS})
              //   .then(res => {
              //     console.log(res)
              //   })
              //   .catch(err => {
              //     console.log(err)
              //   })
              // this.searchShopList()
            }
            this.daySTmp = []
            this.showDateOptionsDialog = false
            if(this.showDayBox) {
              this.showDayBox = false
            }

          }
        }
      },
      //修改星期
      modifyWeek({id,week}) {
        return new Promise((resolve,reject) => {
          console.log('111')
          this.$api.post('/scheduling/ModifyWeek',{ id, week })
            .then(res => {
              console.log(res)
              resolve();
            }).catch(err => {
              reject(err);
          })
        })
      },
      //修改日期排期
      modifyDay({id,dayS}) {
        return new Promise((resolve,reject) => {
          console.log('222')
          this.$api.post('/scheduling/ModifyDay',{ id,dayS })
            .then(res => {
              console.log(res)
              resolve();
            })
            .catch(err => {
              reject(err);
            })
        })
      }
    },
    watch: {
      advancedDays: function(val) {
        console.log(val,typeof val)
        val = val.toString().replace(/(^\s*)|(\s*$)/g, "")   //去掉前后的空格
        val = val.replace(/[^\.\d]/g, "");        //禁止输入正整数之外的字符
        val = val.replace('.', '');               //禁止输入小数点

        this.advancedDays = val

        if(parseInt(val) >= 0 && parseInt(val) <= 30) {
          console.log('正常')
          this.isAdvancedDaysErr = false
        }else if(val == '') {
          console.log('正常')
          this.isAdvancedDaysErr = false
        }else {
          console.log('输入数字不对')
          this.isAdvancedDaysErr = true
        }
      },
      amInput: function (val) {
        console.log(val,typeof val)
        val = val.toString().replace(/(^\s*)|(\s*$)/g, "")   //去掉前后的空格
        val = val.replace(/[^\.\d]/g, "");        //禁止输入正整数之外的字符
        val = val.replace('.', '');               //禁止输入小数点

        this.amInput = val

        if(parseInt(val) >= 0 && parseInt(val) <= 10000) {
          console.log('正常')
          this.isAmInputErr = false
        }else if(val == '') {
          console.log('正常')
          this.isAmInputErr = false
        }else {
          console.log('输入数字不对')
          this.isAmInputErr = true
        }
      },
      pmInput: function (val) {
        console.log(val,typeof val)
        val = val.toString().replace(/(^\s*)|(\s*$)/g, "")   //去掉前后的空格
        val = val.replace(/[^\.\d]/g, "");        //禁止输入正整数之外的字符
        val = val.replace('.', '');               //禁止输入小数点

        this.pmInput = val

        if(parseInt(val) >= 0 && parseInt(val) <= 10000) {
          console.log('正常')
          this.isPmInputErr = false
        }else if(val == '') {
          console.log('正常')
          this.isPmInputErr = false
        }else {
          console.log('输入数字不对')
          this.isPmInputErr = true
        }
      },
      calenderAmInput: function (val) {
        console.log(val,typeof val)
        val = val.toString().replace(/(^\s*)|(\s*$)/g, "")   //去掉前后的空格
        val = val.replace(/[^\.\d]/g, "");        //禁止输入正整数之外的字符
        val = val.replace('.', '');               //禁止输入小数点

        this.calenderAmInput = val

        if(parseInt(val) >= 0 && parseInt(val) <= 10000) {
          console.log('正常')
          this.isCalenderAmInputErr = false
        }else if(val == '') {
          console.log('正常')
          this.isCalenderAmInputErr = false
        }else {
          console.log('输入数字不对')
          this.isCalenderAmInputErr = true
        }
      },
      calenderPmInput: function (val) {
        console.log(val,typeof val)
        val = val.toString().replace(/(^\s*)|(\s*$)/g, "")   //去掉前后的空格
        val = val.replace(/[^\.\d]/g, "");        //禁止输入正整数之外的字符
        val = val.replace('.', '');               //禁止输入小数点

        this.calenderPmInput = val

        if(parseInt(val) >= 0 && parseInt(val) <= 10000) {
          console.log('正常')
          this.isCalenderPmInputErr = false
        }else if(val == '') {
          console.log('正常')
          this.isCalenderPmInputErr = false
        }else {
          console.log('输入数字不对')
          this.isCalenderPmInputErr = true
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    padding-left: 30px;
  }
  .header {
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .shop-name {
    line-height: 36px;
    font-size: 14px;
    margin-right: 30px;
  }
  .area-name {
    line-height: 36px;
    font-size: 14px;
    margin-right: 30px;
  }
  .city-name {
    line-height: 36px;
    font-size: 14px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .shop-code {
    line-height: 36px;
    font-size: 14px;
    margin-right: 30px;
  }
  .btn-add {
    border-radius: 0;
    border: none;
  }
  .btn {
    background: #5270C7;
    border-radius: 0;
    border: none;
  }
  .btn:hover {
    background: #5270C7;
    opacity: 0.9;
  }
  .date-set {
    position: relative;
  }
  .dot-icon-outer {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border:1px solid #F4B6BE;
    position: absolute;
    top: 3px;
    left: 27px;
  }
  .dot-icon-inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #D9001B;
    position: absolute;
    left: 1px;
    top: 1px;
  }
  .pagination-row {
    margin-top: 20px;
    text-align: right;
  }
  .el-dialog__header {
    padding-bottom: 0;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .date-dialog-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .week-title {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .week-check-box {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .advance-box {
    margin-bottom: 20px;
  }
  .advance-title {
    margin-bottom: 10px;
  }
  .advance-input {
    width: 200px;
  }
  .person-config {
    position: relative;
  }
  .person-title {
    margin-bottom: 10px;
  }
  .person-tips {
    margin-bottom: 20px;
  }
  .default-person {
    margin-bottom: 20px;
  }
  .am-box {
    margin-bottom: 20px;
  }
  .am-box-err {
    margin-bottom: 10px;
  }
  .am-title {
    margin-right: 60px;
  }
  .am-input {
    width: 200px;
    margin-left: 10px;
    margin-right: 50px;
  }
  .am-input-remarks {
    width: 200px;
    margin-left: 10px;
  }
  .pm-box {
    margin-bottom: 10px;
  }
  .pm-text {
    margin-left: 162px;
  }
  .pm-input {
    width: 200px;
    margin-left: 10px;
    margin-right: 50px;
  }
  .pm-input-remarks {
    width: 200px;
    margin-left: 10px;
  }
  .calender-box {
    display: flex;
  }
  .calender-config {
    width: 300px;
    height: 270px;
    background: #FFF;
    border: 1px solid #DDD;
    box-shadow: -3px -3px 5px #DDD;
  }
  .calender-config-header {
    height: 50px;
    line-height: 50px;
    position: relative;
  }
  .close-icon {
    /*float: right;*/
    width: 16px;
    height: 16px;
    position: absolute;
    top: 17px;
    right: 10px;
  }
  .calender-config-input {
    margin-top: 15px;
    padding-left: 25px;
  }
  .calender-am-box {
    margin-bottom: 15px;
  }
  .calender-am-box-err {
    margin-bottom: 5px;
  }
  .calender-pm-box {
    margin-bottom: 5px;
  }
  .calender-text {
    margin-right: 10px;
  }
  .calender-am-input {
    width: 180px;
  }
  .calender-pm-input {
    width: 180px;
  }
  .calender-config-button {
    margin-top: 30px;
    margin-right: 10px;
    text-align: right;
  }
  .calender-config-button-err {
    margin-top: 10px;
    margin-right: 10px;
    text-align: right;
  }
  .calender-config-cancel {
    border-radius: 0;
    border: none;
  }
  .calender-config-confirm {
    background: #5270C7;
    border-radius: 0;
    border: none;
  }
  .dialog-button {
    margin-top: 20px;
    text-align: right;
  }
  .dialog-button-cancel {
    border-radius: 0;
    border: none;
  }
  .dialog-button-confirm {
    background: #5270C7;
    border-radius: 0;
    border: none;
  }
  #storelist_baidu {
    width: 200px;
  }
  .err-tips {
    margin-left: 20px;
    color: #f00;
  }
  .error-tips {
    margin-left: 210px;
    margin-bottom: 10px;
    color: #f00;
  }
  .calender-error-tips {
    color: #f00;
    margin-left: 45px;
    margin-bottom: 10px;
  }
  .center-name-class {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .remark-class {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
