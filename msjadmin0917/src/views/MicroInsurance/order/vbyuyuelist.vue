<template>
<div class="app-container">
    <div v-if="!isshowexcel">
      <!-- 查询表单 -->
      <div>
        <div class="inquire">
          <el-row>
            <!-- <el-col :span="6">
              <div class="grid_lable">所属分公司：</div>
              <div class="grid_content">
                <el-select v-model="filialeValue" filterable placeholder="请选择" size="medium" style="width:100%;" clearable @change="filialevaluechange()">
                  <el-option v-for="item in FilialeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>-->
            <!-- <el-col :span="6">
              <div class="grid_lable">合作企业：</div>
              <div class="grid_content">
                <el-select :disabled="filialeValue==''||filialeValue=='优健康自营'" filterable v-model="seekobj.joinEnterprise" placeholder="请选择" size="medium" style="width:100%;">
                  <el-option v-for="item in seekobjlist. joinEnterpriselist" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>-->
            <el-col :span="6">
              <div class="grid_lable">预约状态：</div>
              <div class="grid_content">
                <el-select
                  v-model="seekobj.reStatus"
                  placeholder="请选择"
                  size="medium"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in seekobjlist.reStatuslist"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid_lable">商品类型：</div>
              <div class="grid_content">
                <el-select
                  v-model="seekobj.type"
                  placeholder="请选择"
                  size="medium"
                  style="width:100%;"
                >
                  <el-option label="全部" value="全部"></el-option>
                  <el-option label="体检套餐" value="体检套餐"></el-option>
                  <el-option label="加项包" value="加项包"></el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="grid_lable">预约类型：</div>
              <div class="grid_content">
                <el-select
                  v-model="seekobj.reType"
                  placeholder="请选择"
                  style="width:100%"
                  size="medium"
                  clearable
                >
                  <el-option label="全部" value></el-option>
                  <!-- <el-option label="ID身份证预约" value="ID身份证预约"></el-option> -->
                  <el-option label="人工预约" value="人工预约"></el-option>
                  <el-option label="全国单接口预约" value="全国单接口预约"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid_lable">证件类型：</div>
              <div class="grid_content">
                <el-select
                  v-model="seekobj.IDType"
                  placeholder="请选择"
                  style="width:100%"
                  size="medium"
                  clearable
                >
                  <el-option label="全部" value></el-option>
                  <el-option label="身份证" value="身份证"></el-option>
                  <el-option label="护照" value="护照"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="inquire" style="margin-bottom: 0px;">
          <el-row>
            <!-- <el-col :span="6">
              <div class="grid_lable">所属销售：</div>
              <div class="grid_content">
                <el-input placeholder="请输入内容"  v-model="seekobj.sellerPhone" clearable size="medium" style="width:100%;">
                </el-input>
              </div>
            </el-col>-->
            <el-col :span="6" style="  position: relative;">
              <div class="grid_lable">主订单编号：</div>
              <div class="grid_content">
                <!-- <el-input placeholder="输入订单号后六位数" v-model="seekobj.orNumber" clearable size="medium" style="width:100%;">
                </el-input>-->
                <el-form
                  :model="seekobj"
                  :rules="seekobjrules"
                  ref="ruleForm"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="orNumber">
                    <el-input
                      placeholder="输入订单号后六位数"
                      v-model="seekobj.orNumber"
                      clearable
                      size="medium"
                      style="width:100%;"
                      maxlength="6"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid_lable">买家：</div>
              <div class="grid_content">
                <el-input
                  placeholder="请输入内容"
                  v-model="seekobj.userPhone"
                  clearable
                  size="medium"
                  style="width:100%;"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid_lable">体检人姓名：</div>
              <div class="grid_content">
                <el-input
                  placeholder="请输入内容"
                  v-model="seekobj.reMan"
                  clearable
                  size="medium"
                  style="width:100%;"
                ></el-input>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="grid_lable">是否录入：</div>
              <div class="grid_content">
                <el-select
                  v-model="seekobj.entryOrExclude"
                  placeholder="请选择"
                  style="width:100%"
                  size="medium"
                  clearable
                >
                  <el-option label="已录入" value="1"></el-option>
                  <el-option label="未录入" value="2"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="inquire">
          <el-row>
            <el-col :span="6">
              <div class="grid_lable">体检手机号：</div>
              <div class="grid_content">
                <el-input
                  placeholder="请输入内容"
                  v-model="seekobj.rePhone"
                  clearable
                  size="medium"
                  style="width:100%;"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid_lable">时间类型：</div>
              <div class="grid_content">
                <el-select
                  v-model="seekobj.timeType"
                  placeholder="请选择"
                  size="medium"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in seekobjlist.timelist"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid_lable">时间范围：</div>
              <div class="grid_content">
                <el-date-picker
                  v-model="yearSelect"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH-mm-ss"
                ></el-date-picker>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="inquire">
          <el-row></el-row>
        </div>
      </div>
      <!-- 按钮 -->
      <div>
        <div class="inquire">
          <el-button class="grid_button" type="primary" size="medium" @click="excelpop()" >导出记录</el-button>
          <el-button class="grid_button" type="primary" size="medium" @click="exportyuyuemsg()" >导出</el-button>
          <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search"  @click="queeryreservationlist()">搜索</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div v-if="tableData&&tableData.length>0">
        <el-checkbox v-model="allreStatus1" :indeterminate="indeterminate" style="line-height:39px;margin-left:10px;margin-right:10px" @change='allreStatus(allreStatus1)'></el-checkbox>
        <el-button @click="openchangeentryOrExcludeobj(1)">批量录入系统</el-button>
        <el-button  @click="openchangeentryOrExcludeobj(2)">批量剔除系统</el-button>
        <el-button  @click="Bookingstatus1.isshow=true;Bookingstatus1.reStatus=''">批量修改预约状态</el-button>
        <div v-for="(v,index) in tableData" class="reservation_table">
          <div class="reservation_table_inquire" :class="{ 'reservation_table_inquire1': v.reType=='ID身份证预约',  'reservation_table_inquire2': v.reType=='人工预约', 'reservation_table_inquire3': v.reType=='全国单接口预约' }">
            <el-row>
              <el-col :span="0.5">
                <el-checkbox :disabled="!(v.reStatus==1||v.reStatus==2||v.reStatus==4||v.reStatus==9)" style="line-height:39px;margin-left:10px" v-model="v.checkStatus" @change='onereStatus(v.checkStatus)'></el-checkbox>
              </el-col>
              <el-col :span="5">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">所属分公司：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.sortCompany}}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">商品ID：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.goodsid}}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">商品名称：</div>
                <div class="reservation_table_list_content">{{v.goodsName}}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">订单编号：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.orNumber}}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">商品类型：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.goodsType}}
                </div>
              </el-col>
            </el-row>
            <el-row style="border-bottom: 1px solid #dcdfe6;border-top: 1px solid #dcdfe6;">
              <el-col :span="0.5">
                <div style="width:25px;height:35px"></div>
              </el-col>
              <el-col :span="5">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">买家：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.userPhone}}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">合作企业：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.joinEnterprise}}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">支付金额：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove" v-if="v.deductionName&&v.deductionName!=''">{{v.goodsPay}}（{{v.deductionName}}：{{v.goodsDeduction}}）
                </div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove" v-else>{{v.goodsPay}}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">付款时间：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.payTime}}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="reservation_table_list_name" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">预约类型：</div>
                <div class="reservation_table_list_content" @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove">{{v.reType}} </div>
              </el-col>
            </el-row>
          </div>
          <el-table :data="[tableData[index]]" style="width: 100%; hight:80px;">
            <el-table-column prop="reMan" label="姓名" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="reSex" label="性别" min-width="100">
            </el-table-column>
            <el-table-column prop="reMarry" label="婚否" min-width="100">
            </el-table-column>
            <el-table-column prop="documentType" label="证件类型" min-width="110">
            </el-table-column>
            <el-table-column prop="reIDCard" label="证件号" min-width="210">
            </el-table-column>
            <el-table-column label="出生日期" min-width="170">
              <template slot-scope="scope">
                {{scope.row.reBirthday.substring(0,4)+'-'+scope.row.reBirthday.substring(4,6)+'-'+scope.row.reBirthday.substring(6,8)}}
              </template>
            </el-table-column>
            <el-table-column prop="rePhone" label="手机号" min-width="120">
            </el-table-column>
            <!-- <el-table-column prop="reRelation" label="关系" min-width="80">
            </el-table-column> -->
          </el-table>
          <el-table :data="[tableData[index]]" style="width: 100%; hight:80px;">
            <el-table-column prop="reCity" label="预约城市" min-width="100">
            </el-table-column>
            <el-table-column prop="reHospital" label="预约分院" min-width="140">
            </el-table-column>
            <el-table-column prop="reTime" label="预约时间" min-width="170">
            </el-table-column>
            <el-table-column prop="data" label="到店方式" min-width="100">
            </el-table-column>
            <el-table-column label="是否录入系统" min-width="110px">
              <template slot-scope="scope">
                <div v-if="scope.row.reType!='全国单接口预约'">
                  <div class="yuyueclass">

                    <el-button type="text" size="mini" :disabled="scope.row.reStatus==10||scope.row.reStatus==11||scope.row.reStatus==12" @click="changeentryOrExclude(scope.row)"> {{entryOrExcludechange(scope.row.entryOrExclude)}}</el-button>
                  </div>
                </div>
                <div v-else>——————</div>
              </template>
            </el-table-column>
            <el-table-column label="预约状态" min-width="85">
              <template slot-scope="scope">
                <!-- <el-button :disabled="!(scope.row.reStatus=='1'||scope.row.reStatus=='2'||scope.row.reStatus=='9')" @click="changeBookingstatus(scope.row)" type="text" size="small">{{reStatuschange(scope.row.reStatus)}}</el-button> -->
                <!-- <el-button disabled @click="changeBookingstatus(scope.row)" type="text" size="small">{{reStatuschange(scope.row.reStatus)}}</el-button> -->
                {{reStatuschange(scope.row.reStatus)}}
              </template>
            </el-table-column>
            <el-table-column min-width="85">
              <template slot-scope="scope">
                <div class="yuyueclass">
                  <el-button style="position: relative;" @click="BookingstatusNodebtn(scope.row)" type="text" size="small">预约记录&nbsp&nbsp
                    <div class="redpoint" v-if="scope.row.goodRed=='2'">
                    </div>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="120px">
              <template slot-scope="scope">
                <!-- <el-button v-if="scope.row.reType=='人工预约'" :disabled="scope.row.reStatus=='2' || !Clickable.edit" type="text" size="small" @click="editBooking(scope.row)">编辑</el-button> -->
                <div class="yuyueclass">
                  <!--  
                    待预约———>后台预约
                    已预约———>取消预约
                    待预约、已预约、取消预约————>确认到检
                    已到检———>已出报告
                    取消预约———>重新预约 
                  -->
                  <!-- <el-button @click="" type="text" v-if="scope.row.reStatus==9&&scope.row.reType=='人工预约'" :disabled="scope.row.entryOrExclude!=1" @click="BackAppointment(scope.row)">后台预约</el-button> -->
                  <!-- <el-button @click="" type="text" v-if="scope.row.reStatus==9&&scope.row.reType=='ID身份证预约'" :disabled="scope.row.entryOrExclude!=1" @click="IDAppointment (scope.row)">后台预约</el-button> -->
                  <!-- <el-button @click="" type="text" v-if="scope.row.reStatus==9&&scope.row.reType=='全国单接口预约'" @click="NationalAppointment(scope.row)">后台预约</el-button> -->
                  <el-button @click="" type="text" v-if="scope.row.reStatus==14"  @click="confirmchangedate(scope.row)">确认改期</el-button>
                  <!-- <el-button @click="changerestatus(scope.row,2)" type="text" v-if="scope.row.reStatus==1" >取消预约</el-button> -->
                  <el-button @click="changerestatus(scope.row,4)" type="text" v-if="scope.row.reStatus==1||scope.row.reStatus==2||scope.row.reStatus==9" >确认到检</el-button>
                  <el-button @click="changerestatus(scope.row,5)" type="text" v-if="scope.row.reStatus==4 " >确认已出报告</el-button>
                  <!-- <el-button @click="changerestatus(scope.row,9)" type="text" v-if="scope.row.reStatus==2" >重新预约</el-button> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" min-width="80px">
              <template slot-scope="scope">
                <div class="yuyueclass">
                  <!-- <el-button v-if="scope.row.reType=='人工预约'" :disabled="scope.row.reStatus=='2' || !Clickable.edit" type="text" size="small" @click="editBooking(scope.row)">编辑</el-button> -->
                  <el-button v-if="scope.row.reType!='ID身份证预约'&&scope.row.reStatus==1" @click="" type="text"  @click="yuyuechange(scope.row)">预约改期</el-button>
                  <!-- <div></div> -->
                  <el-button @click="SpeakerNotebtn(scope.row)" type="text" >备注</el-button>
                  <!-- <el-button v-else class="alinehidden" @click="SpeakerNotebtn(scope.row)" type="text" size="small" style="max-width:60px">{{scope.row.goReservationRemarks}}</el-button> -->
                </div>

              </template>
            </el-table-column>
            <!-- <el-table-column label="是否录入系统" min-width="110px">
              <template slot-scope="scope">
                <div v-if="scope.row.reType!='全国单接口预约'">
                  <el-button type="text" size="mini" :disabled="scope.row.reStatus==10||scope.row.reStatus==11||scope.row.reStatus==12" @click="changeentryOrExclude(scope.row)"> {{entryOrExcludechange(scope.row.entryOrExclude)}}</el-button>
                </div>
                <div v-else>——————</div>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="block" style="text-align: right;margin-top: 20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count">
          </el-pagination>
        </div>
      </div>
      <div v-else class="nonemsg">
        暂无数据
      </div>
    </div>

    <div v-else>
      <div style="font-size: 20px;">
        <i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp预约导出记录</span>
      </div>
      <div class="orderExcelcordbox" v-for="item in yuyueexcellist">
        <div class="ordertime">
          报表导出时间：{{item.editTime}}
        </div>
        <div class="ordermsg">
          <div v-if="item.sortCompany!=''">所属分公司：{{item.sortCompany}}</div>
          <div v-else>所属分公司：全部</div>
          <div v-if="item.reStatus!=0">预约状态：{{reStatuschange(item.reStatus)}}</div>
          <div v-else>预约状态：全部</div>
          <div>时间类型：{{item.timeType}}</div>
          <div v-if="item.time1!=''&&item.time2!=''">时间范围：{{item.time1}}——{{item.time2}}</div>
          <div v-else>时间范围：全部</div>
        </div>
      </div>
    </div>

    <!-- 编辑备注弹窗 -->
    <el-dialog title="备注" :visible.sync="SpeakerNote.isshow" width="800px">
      <!-- 数据表格 -->
      <div>
        <el-table :data="SpeakerNote.notelist" style="width: 100%" v-loading="SpeakerNote.loading">
          <el-table-column prop="editTime" label="备注时间" min-width="150px"></el-table-column>
          <el-table-column prop="operator" label="操作账号" min-width="130px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="reservationRemarks" label="备注信息" min-width="250px" show-overflow-tooltip></el-table-column>

        </el-table>

      </div>
      <div style="margin-top:20px;margin-bottom:10px;font-size:18px">
        新增备注：
      </div>
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="50" show-word-limit v-model="SpeakerNote.textarea2">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SpeakerNote.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmNoteBtn()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修稿预约状态 -->
    <el-dialog title="修改预约状态" :visible.sync="Bookingstatus.isshow" width="500px">
      <div class="Bookingstatusbox">
        <el-radio v-model="Bookingstatus.reStatus" size='medium' :label="4">已到检</el-radio>
        <el-radio v-model="Bookingstatus.reStatus" size='medium' :label="5">已出报告</el-radio>
        <div style="color:#E51C23;line-height:28px;margin:20px 20px 0 0">
          <div>说明：</div>
          <div> 1、取消预约，未预约，已预约可以修改成已到检，确认已到检不可修改请谨慎操作！</div>
          <div> 2、已到检可以批量修改成已出报告
          </div>
        </div>
        <!-- <el-radio v-model="Bookingstatus.reStatus" size='medium' :label="0">可以预约</el-radio>
        <el-radio v-if="selectorder.reStatus!=8" v-model="Bookingstatus.reStatus" size='medium' :label="1">申请预约</el-radio>
        <el-radio v-if="selectorder.reStatus!=8" v-model="Bookingstatus.reStatus" size='medium' :label="3">已落单</el-radio> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Bookingstatus.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmchangeBookingStatus()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量修改预约状态 -->
    <el-dialog title="批量修改预约状态" :visible.sync="Bookingstatus1.isshow" width="500px">
      <div class="Bookingstatusbox">
        <el-radio v-model="Bookingstatus1.reStatus" size='medium' :label="4">已到检</el-radio>
        <el-radio v-model="Bookingstatus1.reStatus" size='medium' :label="5">已出报告</el-radio>
        <div style="color:#E51C23;line-height:28px;margin:20px 20px 0 0">
          <div>说明：</div>
          <div> 1、取消预约，未预约，已预约可以修改成已到检，确认已到检不可修改请谨慎操作！</div>
          <div> 2、已到检可以批量修改成已出报告
          </div>
        </div>
        <!-- <el-radio v-model="Bookingstatus1.reStatus" size='medium' :label="0">可以预约</el-radio>
        <el-radio v-model="Bookingstatus1.reStatus" size='medium' :label="1">申请预约</el-radio>
        <el-radio v-model="Bookingstatus1.reStatus" size='medium' :label="3">已落单</el-radio> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Bookingstatus1.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmchangeBookingStatus1()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 批量修改录入状态 -->
    <div>
      <el-dialog :title="changeentryOrExcludeobj.title" :visible.sync="changeentryOrExcludeobj.isshow" width="1000px">
        <div>
          <el-table :data="changeentryOrExcludeobj.list" style="width: 100%" v-loading="changeentryOrExcludeobj.loading">
            <el-table-column prop="reMan" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reIDCard" label="身份证" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reCity" label="预约城市" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reHospital" label="分院" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reTime" label="时间" show-overflow-tooltip></el-table-column>

          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeentryOrExcludeobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmchangeorexludeall(changeentryOrExcludeobj.num)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 预约状态记录 -->
    <el-dialog title="预约记录" :visible.sync="BookingstatusNode.isshow" width="1000px">
      <!-- <div v-for="item in BookingstatusNode.statusNodelist" style="line-height:30px">
        {{item.editTime}} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp {{reStatuschange1(item.reStatus)}}
      </div> -->
      <!-- 数据表格 -->
      <div>
        <el-table :data=" BookingstatusNode.statusNodelist" style="width: 100%" v-loading="BookingstatusNode.loading">
          <el-table-column prop="editTime" label="操作时间"></el-table-column>
          <el-table-column prop="operateType" label="操作类型"></el-table-column>
          <el-table-column prop="operator" label="操作账号"></el-table-column>
          <el-table-column prop="reCity" label="预约城市"></el-table-column>
          <el-table-column prop="reHospital" label="分院"></el-table-column>
          <el-table-column prop="reTime" label="时间"></el-table-column>
        </el-table>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="BookingstatusNode.isshow = false">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </span> -->
    </el-dialog>

    <!-- 后台预约 -->
    <el-dialog title="后台预约" :visible.sync="changeBookinglist.isshow" width="500px">
      <el-row style="line-height:40px;margin-bottom:30px" v-if="IDyuyueobj.sessionId&&IDyuyueobj.sessionId!=''">
        <el-col :span="8" style="text-align: center;">订单ID：</el-col>
        <el-col :span="14">
          <el-select v-model="IDyuyueobj.selectorder" placeholder="请选择" style="width:100%" filterable clearable @change="orderchange">
            <el-option v-for="item in IDyuyueobj.orderList" :key="item.ID号码" :label="item.ID号码" :value="item.ID号码">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="line-height:40px">
        <el-col :span="8" style="text-align: center;">预约城市：</el-col>
        <el-col :span="14">
          <el-select v-model="changeBookinglist.city" placeholder="请选择" style="width:100%" filterable clearable @change="citychange" v-loading="changeBookinglist.isshowcity">
            <el-option v-for="item in changeBookinglist.citylist" :key="item.cityname" :label="item.cityname" :value="item.cityname">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="line-height:40px;margin-top:30px">
        <el-col :span="8" style="text-align: center;">预约门店：</el-col>
        <el-col :span="14">
          <el-select v-model="changeBookinglist.shop" placeholder="请选择" style="width:100%" filterable :disabled="changeBookinglist.city==''||changeBookinglist.city==null" @change="shopchange">
            <el-option v-for="item in changeBookinglist.shoplist" :key="item.CheckUnitCode" :label="item.CheckUnitName" :value="item.CheckUnitCode">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="line-height:40px;margin-top:30px">
        <el-col :span="8" style="text-align: center;">预约时间：</el-col>
        <el-col :span="14">
          <el-date-picker v-model="changeBookinglist.time" :disabled="changeBookinglist.timelist.length<=0" v-loading="changeBookinglist.timeloading" type="date" placeholder="选择日期" style="width:100%" value-format="yyyyMMdd" :picker-options="orderDateOptions">
          </el-date-picker>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeBookinglist.isshow = false">取 消</el-button>
        <el-button type="primary" :loading="changeBookinglist.loadingbtn" @click="confirmchangebookmsg()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 预约改期 -->
    <el-dialog title="预约改期" :visible.sync="changeBookinglist1.isshow" width="600px">
      <el-row style="line-height:40px">
        <el-col :span="8" style="text-align: center;">预约城市：</el-col>
        <el-col :span="14">
          <el-select v-model="changeBookinglist1.city" placeholder="请选择" style="width:100%" disabled>
            <!-- <el-option v-for="item in changeBookinglist1.citylist" :key="item" :label="item" :value="item">
            </el-option> -->
          </el-select>
        </el-col>
      </el-row>
      <el-row style="line-height:40px;margin-top:30px">
        <el-col :span="8" style="text-align: center;">预约门店：</el-col>
        <el-col :span="14">
          <el-select v-model="changeBookinglist1.shop" placeholder="请选择" style="width:100%" disabled>
            <!-- <el-option v-for="item in changeBookinglist1.shoplist" :key="item.CheckUnitCode" :label="item.CheckUnitName" :value="item.CheckUnitCode">
            </el-option> -->
          </el-select>
        </el-col>
      </el-row>
      <!-- <el-row style="line-height:40px;margin-top:30px">
        <el-col :span="8" style="text-align: center;">预约时间：</el-col>
        <el-col :span="14">
          <el-date-picker v-model="changeBookinglist1.time" :disabled="this.changeBookinglist1.timelist.length <= 0" v-loading="changeBookinglist1.timeloading" type="date" placeholder="选择日期" style="width:100%" value-format="yyyyMMdd" :picker-options="orderDateOptions1">
          </el-date-picker>
        </el-col>
      </el-row> -->


       
    <div style="margin-top:20px;overflow:hidden;display:flex; justify-content:center;" v-if="this.calendarArr.length>0" >
      <disabledCalender
        @config_selected_Day="configSelectedDay"
        :calenArr="calendarArr"
        :selectcalendarArr="selectcalendar"
        style="float:left"
      ></disabledCalender>

    <div style="width:200px;height:100px;border: 1px solid #DDD;box-sizing: border-box;  box-shadow: -3px -3px 5px #DDD;font-size:22px; float:left" v-if="this.selectcalendar.length>0" >
      <div style="display:flex; justify-content:center; align-items:center;width:100%;height:100%;">
       <el-radio v-model="changeBookinglist1.apm" label="0" :disabled="this.selectcalendar[0].stockNumberM>0?false:true">上午</el-radio>
       <el-radio v-model="changeBookinglist1.apm" label="1" :disabled="this.selectcalendar[0].stockNumberA>0?false:true">下午</el-radio>
      </div>  
    </div>

      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="changeBookinglist1.isshow = false">取 消</el-button>
        <el-button type="primary" :loading="changeBookinglist1.loadingbtn" @click="yuyuechangebtn()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 确认改期 -->
    <el-dialog title="确认改期" :visible.sync="changeBookinglist2.isshow" width="500px">
      <el-row style="line-height:40px">
        <el-col :span="8" style="text-align: center;">预约城市：</el-col>
        <el-col :span="14">
          <el-select v-model="changeBookinglist2.city" placeholder="请选择" style="width:100%" disabled>
            <!-- <el-option v-for="item in changeBookinglist1.citylist" :key="item" :label="item" :value="item">
            </el-option> -->
          </el-select>
        </el-col>
      </el-row>
      <el-row style="line-height:40px;margin-top:30px">
        <el-col :span="8" style="text-align: center;">预约门店：</el-col>
        <el-col :span="14">
          <el-select v-model="changeBookinglist2.shop" placeholder="请选择" style="width:100%" disabled>
            <!-- <el-option v-for="item in changeBookinglist1.shoplist" :key="item.CheckUnitCode" :label="item.CheckUnitName" :value="item.CheckUnitCode">
            </el-option> -->
          </el-select>
        </el-col>
      </el-row>
      <el-row style="line-height:40px;margin-top:30px">
        <el-col :span="8" style="text-align: center;">预约时间：</el-col>
        <el-col :span="14">
          <el-date-picker v-model="changeBookinglist2.time" disabled type="date" placeholder="选择日期" style="width:100%" value-format="yyyyMMdd">
          </el-date-picker>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeBookinglist2.isshow = false">取 消</el-button>
        <el-button type="primary" :loading="changeBookinglist2.loadingbtn" @click="confirmchangedatebtn()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- ID预约弹窗 -->
    <el-dialog title="填写验证码" :visible.sync="IDyuyueobj.isshow" width="500px">
      <div style="text-align:center">
        <div style="margin-bottom:20px">
          <img style="width:120px" :src="IDyuyueobj.cardimg" alt="" @click="IDgetCode">
        </div>
        <span>请输入验证码： </span>
        <el-input v-model="IDyuyueobj.cardcode" placeholder="输入图中验证码" style="width:200px" @input="cardcodeinput()"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="IDyuyueobj.isshow = false">取 消</el-button>
        <el-button type="primary" @click="IDlogin">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ID取消预约 -->
    <el-dialog title="填写验证码" :visible.sync="IDyuyueobj1.isshow" width="500px">
      <div style="text-align:center">
        <div style="margin-bottom:20px">
          <img style="width:120px" :src="IDyuyueobj1.cardimg" alt="" @click="IDgetCode">
        </div>
        <span>请输入验证码： </span>
        <el-input v-model="IDyuyueobj1.cardcode" placeholder="输入图中验证码" style="width:200px" @input="cardcodeinput1()"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="IDyuyueobj1.isshow = false">取 消</el-button>
        <el-button type="primary" @click="IDlogin1">确 定</el-button>
      </div>
    </el-dialog>

    <a id="adownload" href="" download="" style="display:none">导出</a>

  </div>
</template>

<script>
import disabledCalender from "@/components/Calender/disabledCalender";
import MouseEvent from "../../../api/MouseEvent";
export default {
  name: "reservationlist",
  components: {
    disabledCalender
  },
  watch: {
    "BookingstatusNode.isshow": {
      handler(newName, oldName) {
        if (!newName && this.numtest > 1) {
          this.reservationSearch();
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      calendarArr: [], //可选日期
      selectcalendar: [],//修改的日期

      IDyuyueobj: {
        isshow: false,
        cardimg: "",
        sessionId: "",
        cardcode: "",
        selectreobj: "",
        orderList: [],
        selectorder: ""
      },
      IDyuyueobj1: {
        isshow: false,
        cardimg: "",
        cardcode: ""
      },
      changeentryOrExcludeobj: {
        isshow: false,
        num: "",
        title: "",
        list: [],
        loading: false
      },
      indeterminate: false,
      allreStatus1: false,
      orderDateOptions: {
        disabledDate: time => {
          var nowY = time.getFullYear();
          var nowM = time.getMonth() + 1;
          var nowD = time.getDate();
          var timedata =
            String(nowY) +
            String(nowM < 10 ? "0" + nowM : nowM) +
            String(nowD < 10 ? "0" + nowD : nowD); //当前日期
          if (this.changeBookinglist.timelist.indexOf(timedata) > -1) {
            return false;
          } else {
            return true;
          }
        }
      },
      orderDateOptions1: {
        disabledDate: time => {
          var nowY = time.getFullYear();
          var nowM = time.getMonth() + 1;
          var nowD = time.getDate();
          var timedata =
            String(nowY) +
            String(nowM < 10 ? "0" + nowM : nowM) +
            String(nowD < 10 ? "0" + nowD : nowD); //当前日期
          // console.log(timedata);
          if (this.changeBookinglist1.timelist.indexOf(timedata) > -1) {
            return false;
          } else {
            return true;
          }
        }
      },
      numtest: 1,
      selectorder: "",
      //备注弹窗属性
      SpeakerNote: {
        notelist: [],
        loading: false,
        isshow: false,
        textarea2: "" //备注文字
      },
      //预约状态属性
      Bookingstatus: {
        isshow: false,
        reStatus: 1
      },
      //批量预约状态属性
      Bookingstatus1: {
        isshow: false,
        reStatus: 1
      },
      BookingstatusNode: {
        loading: false,
        isshow: false,
        statusNodelist: []
      },
      changeBookinglist: {
        isshowcity: false,
        loadingbtn: false,
        retype: "",
        isshow: false,
        citylist: [],
        city: "",
        shop: "",
        shoplist: [],
        time: "",
        timelist: [],
        timeloading: false
      },
      changeBookinglist1: {
        loadingbtn: false,
        retype: "",
        isshow: false,
        city: "",
        // citylist: [],
        shop: "",
        // shoplist: [],
        time: "",
        timelist: [],
        timeloading: false,

        apm:"",
        registerTime:""
      },
      changeBookinglist2: {
        loadingbtn: false,
        retype: "",
        isshow: false,
        city: "",
        // citylist: [],
        shop: "",
        // shoplist: [],
        time: "",
        timelist: [],
        timeloading: false
      },
      isshowexcel: false,
      //预约导出记录
      yuyueexcellist: [],
      value: "全部",
      currentPage: 1,
      pagesize: 10,
      count: 0,
      yearSelect: [],
      tableData: [],
      FilialeList: ["全部", "优健康自营"],
      filialeValue: "",
      seekobj: {
        joinEnterprise: "", //	合作企业
        reStatus: "全部", //预约状态
        type: "全部", //	商品类型
        sellerPhone: "", //	销售员手机号
        orNumber: "", //	订单编号
        userPhone: "", //买家手机号
        reMan: "", //预约人姓名
        rePhone: "", //体检人手机号
        timeType: "付款时间", //	时间类型
        reType: "", //预约类型
        IDType: "", //身份证
        entryOrExclude: ""
      },
      seekobjrules: {
        orNumber: [
          { min: 6, max: 6, message: "请输入订单后六位", trigger: "change" }
        ]
      },
      seekobjlist: {
        joinEnterpriselist: [],
        reStatuslist: [
          // { value: "全部", label: "全部" },
          // { value: 1, label: "申请预约" },
          // { value: 3, label: "已落单" },
          // { value: 4, label: "已预约" },
          // { value: 2, label: "取消预约" },
          // { value: 8, label: "等待预约" },
          // { value: 0, label: "可以预约" }
          { value: "全部", label: "全部" },
          { value: 9, label: "待预约" },
          // { value: '1', label: "已预约1" },
          { value: 1, label: "已预约" },
          { value: 14, label: "预约改期-未确认" },
          { value: 2, label: "取消预约" },
          { value: 4, label: "已到检" },
          { value: 5, label: "已出报告" },
          { value: 10, label: "待预约-退款不可操作" },
          { value: 11, label: "取消预约-退款不可操作" },
          { value: 12, label: "已预约-退款不可操作" },
          { value: 13, label: "预约失效" }
        ],
        timelist: ["付款时间", "预约时间"]
      }
    };
  },
  mounted() {
    // console.log(MouseEvent);

    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      //运营
      console.log(this.$store.getters.getBranchOffice);
      this.FilialeList = this.FilialeList.concat(
        this.$store.getters.getBranchOffice
      );
    } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
      //分公司
      console.log(this.$store.getters.getRoleInfo.AccountName);
      this.FilialeList = [];
      this.filialeValue = this.$store.getters.getRoleInfo.AccountName;
    } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
      //销售
      this.FilialeList = [];
      this.filialeValue = this.$store.getters.getRoleInfo.FromCompany;
      this.seekobj.sellerPhone = this.$store.getters.getRoleInfo.Mobile;
    }

    this.filialevaluechange();
    this.reservationSearch();

    // console.log("Clickable*********************", this.Clickable);
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
    configSelectedDay(selectedDay, isBefore) {//选择修改日期
      this.selectcalendar = [];
      if (isBefore) {
        this.selectcalendar.push(selectedDay);
        this.changeBookinglist1.time=selectedDay.scheduleDate
        this.changeBookinglist1.apm=""
      }else{
        this.selectcalendar=[]
         this.changeBookinglist1.time=""
        this.changeBookinglist1.apm=""
      }

    },


    confirmchangedatebtn(){
      console.log(this.changeBookinglist2);
      this.confirmchangerestatus(this.changeBookinglist2.selectreobj,1)
    },
    confirmchangedate(row) {
      console.log(row);
      if (row.entryOrExclude != "1") {
        this.$message.error("请确认订单是否录入。");
        return;
      }
      this.changeBookinglist2.isshow = true;
      this.changeBookinglist2.selectreobj = row;
      this.changeBookinglist2.city = row.reCity;
      this.changeBookinglist2.shop = row.reHospital;
      this.changeBookinglist2.time = row.reTime;
    },
    mouseover(e) {
      MouseEvent.mouseover(e);
    },
    mouseout(e) {
      MouseEvent.mouseout(e);
    },
    mousemove(e) {
      MouseEvent.mousemove(e);
    },
    orderchange(val) {
      this.IDyuyueobj.orderList.map(item => {
        if (val == item.ID号码) {
          this.IDyuyueobj.token = item.token;
        }
      });
    },
    cardcodeinput() {
      this.IDyuyueobj.cardcode = this.IDyuyueobj.cardcode.replace(" ", "");
    },
    cardcodeinput1() {
      this.IDyuyueobj1.cardcode = this.IDyuyueobj1.cardcode.replace(" ", "");
    },
    IDAppointment(row) {
      console.log("ID预约", row);
      this.changeBookinglist.selectreobj = row;
      this.changeBookinglist.citylist = [];
      this.changeBookinglist.city = "";
      this.changeBookinglist.shop = "";
      this.changeBookinglist.shoplist = [];
      this.changeBookinglist.timelist = [];
      this.changeBookinglist.time = "";
      this.changeBookinglist.retype = "ID身份证预约";

      this.IDyuyueobj.selectreobj = row;
      // this.IDyuyueobj.selectreobj.reIDCard = "51222219701220766X";
      // this.IDyuyueobj.selectreobj.reMan = "陶中琼（家属）";
      this.IDyuyueobj.isshow = true;
      this.IDyuyueobj.cardcode = "";
      this.IDyuyueobj.sessionId = "";
      this.IDgetCode();
    },
    // ID预约获取验证码 -01
    IDgetCode() {
      this.IDyuyueobj.cardcode = "";
      this.$network2
        .post("/appointment/getCode")
        .then(res => {
          console.log(res);
          if (res.state == 200) {
            console.log(this.IDyuyueobj.cardimg);
            this.IDyuyueobj.cardimg =
              "data:image/jpeg;base64," + res.result.code;
            this.IDyuyueobj.sessionId = res.result.sessionId;
          } else {
            this.$message.error(res.message || res.result);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || err.result);
        });
    },
    IDgetCode1() {
      this.IDyuyueobj1.cardcode = "";
      this.$network2
        .post("/appointment/getCode")
        .then(res => {
          console.log(res);
          if (res.state == 200) {
            console.log(this.IDyuyueobj1.cardimg);
            this.IDyuyueobj1.cardimg =
              "data:image/jpeg;base64," + res.result.code;
            this.IDyuyueobj1.sessionId = res.result.sessionId;
          } else {
            this.$message.error(res.message || res.result);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || err.result);
        });
    },
    // 登陆 1
    IDlogin() {
      if (!this.IDyuyueobj.cardcode || this.IDyuyueobj.cardcode == "") {
        this.$message.error("请输入验证码");
        return;
      }
      this.$network2
        .post("/appointment/login", {
          useridNumber: this.IDyuyueobj.selectreobj.reIDCard,
          userName: this.IDyuyueobj.selectreobj.reMan,
          sessionId: this.IDyuyueobj.sessionId,
          code: this.IDyuyueobj.cardcode
        })
        .then(res => {
          console.log(res);
          if (res.state == 200) {
            if (res.result.orderList.length > 0) {
              this.IDyuyueobj.orderList = res.result.orderList;
              this.IDyuyueobj.selectorder = res.result.orderList[0].ID号码;
              this.IDyuyueobj.token = res.result.orderList[0].token;
              this.changeBookinglist.isshow = true;
              this.changeBookinglist.isshowcity = true;
              this.IDgetUserInfo();
            } else {
              this.$message.error("该用户暂时无法预约，请稍后重试。");
            }
            this.IDyuyueobj.isshow = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || err.result);
        });
    },
    IDlogin1() {
      //id取消预约
      if (!this.IDyuyueobj1.cardcode || this.IDyuyueobj1.cardcode == "") {
        this.$message.error("请输入验证码");
        return;
      }
      this.$network2
        .post("/appointment/login", {
          useridNumber: this.IDyuyueobj1.selectreobj.reIDCard,
          userName: this.IDyuyueobj1.selectreobj.reMan,
          sessionId: this.IDyuyueobj1.sessionId,
          code: this.IDyuyueobj1.cardcode
        })
        .then(res => {
          console.log(res);
          if (res.state == 200) {
            this.$network2
              .post("/appointment/cancelReservation", {
                sessionId: this.IDyuyueobj1.sessionId,
                token: this.IDyuyueobj1.selectreobj.reserveToken
              })
              .then(res => {
                if (res.state == 200) {
                  this.IDyuyueobj1.isshow = false;
                  this.$message.success(res.result || res.message);
                  this.confirmchangerestatus(this.IDyuyueobj1.selectreobj, 2);
                } else {
                  this.$message.error(res.message || res.result);
                }
              })
              .catch(err => {
                this.$message.error(err.message || err.result);
              });
          } else {
            this.$message.error(res.message || res.result);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || err.result);
        });
    },
    // 获取用户信息 2
    IDgetUserInfo() {
      var body = {
        sessionId: this.IDyuyueobj.sessionId,
        token: ""
      };
      this.IDyuyueobj.orderList.map(item => {
        if (item.ID号码 == this.IDyuyueobj.selectorder) {
          body.token = item.token;
        }
      });
      this.$network2
        .post("/appointment/getUserInfo", body)
        .then(res => {
          console.log(res);
          if (res.state == 200) {
            var idCard = this.IDyuyueobj.selectreobj.reIDCard;
            var birthday = "";
            var birthdate = "";
            if (idCard.length == 15) {
              birthday = "19" + idCard.substr(6, 6);
            } else if (idCard.length == 18) {
              birthday = idCard.substr(6, 8);
            }
            birthdate = birthday.replace(/(.{4})(.{2})/, "$1$2");
            var body1 = {
              sessionId: this.IDyuyueobj.sessionId,
              token: body.token,
              birthdate: birthdate,
              phone: this.IDyuyueobj.selectreobj.rePhone
            };
            this.$network2
              .post("/appointment/saveUserInfo", body1) //保存用户信息 03
              .then(res => {
                console.log(res);
                if (res.state == 200) {
                  this.$network2
                    .post("/appointment/getPackage", {
                      //获取套餐信息 04
                      sessionId: this.IDyuyueobj.sessionId
                    })
                    .then(res => {
                      console.log(res);
                      if (res.state == 200) {
                        this.$network2
                          .post("/appointment/selectPackage", {
                            //
                            sessionId: this.IDyuyueobj.sessionId,
                            packageId: res.result[0].套餐编码,
                            isSelect: "true"
                          })
                          .then(res => {
                            console.log(res);
                            if (res.state == 200) {
                              this.changeBookinglist.citylis = [];
                              this.$network2
                                .post("/appointment/getCity", {
                                  //获取城市 06
                                  sessionId: this.IDyuyueobj.sessionId
                                })
                                .then(res => {
                                  console.log(res);
                                  if (res.state == 200) {
                                    res.result.map(city => {
                                      let cityobj = city;
                                      cityobj.cityname = city.name;
                                      this.changeBookinglist.citylist.push(
                                        cityobj
                                      );
                                    });
                                    this.changeBookinglist.isshowcity = false;
                                  } else {
                                    this.$message.error(
                                      res.message || res.result
                                    );
                                  }
                                })
                                .catch(err => {
                                  console.log(err);
                                  this.$message.error(err.message);
                                });
                            }
                          })
                          .catch(err => {
                            console.log(err);
                            this.$message.error(err.message);
                          });
                      } else {
                        this.$message.error(res.message || res.result);
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      this.$message.error(err.message);
                    });
                } else {
                  this.$message.error(res.message || res.result);
                }
              })
              .catch(err => {
                console.log(err);
                this.$message.error(err.message);
              });
          } else {
            this.$message.error(res.message || res.result);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || err.result);
        });
    },

    BackAppointment(row) {
      this.IDyuyueobj.sessionId = "";
      console.log("人工预约", row);
      this.changeBookinglist.selectreobj = row;
      this.changeBookinglist.citylist = [];
      this.changeBookinglist.city = "";
      this.changeBookinglist.shop = "";
      this.changeBookinglist.shoplist = [];
      this.changeBookinglist.timelist = [];
      this.changeBookinglist.time = "";
      this.changeBookinglist.retype = "人工预约";
      this.changeBookinglist.isshow = true;
      this.$api
        .post("/web/queryCityByGoodid", {
          id: row.goodsid
        })
        .then(res => {
          res.data.map(item => {
            let cityobj = {
              cityname: item
            };
            this.changeBookinglist.citylist.push(cityobj);
          });
        });
    },
    NationalAppointment(row) {
      this.IDyuyueobj.sessionId = "";
      console.log("全国单接口预约", row);
      this.changeBookinglist.selectreobj = row;
      this.changeBookinglist.citylist = [];
      this.changeBookinglist.city = "";
      this.changeBookinglist.shop = "";
      this.changeBookinglist.shoplist = [];
      this.changeBookinglist.timelist = [];
      this.changeBookinglist.time = "";
      this.changeBookinglist.retype = "全国单接口预约";
      this.changeBookinglist.isshow = true;
      this.$api
        .post("/web/queryCityByGoodid", {
          id: row.goodsid
        })
        .then(res => {
          res.data.map(item => {
            let cityobj = {
              cityname: item
            };
            this.changeBookinglist.citylist.push(cityobj);
          });
        });
      // this.postQueryCheckUnitListByPackageCode(row)
    },
       yuyuechange(row) {
  
       this.selectcalendar=[]
       this.changeBookinglist1.apm=""
       var retime=row.reTime.substring(0,4)+row.reTime.substring(5,7)+row.reTime.substring(8,10)


      switch (row.reType) {
        case "全国单接口预约":
            this.calendarArr = [];
          this.changeBookinglist1.selectreobj = row;
          this.changeBookinglist1.city = row.reCity;
          this.changeBookinglist1.shop = row.reHospital;
          this.changeBookinglist1.time = "";
          this.changeBookinglist1.timelist = [];
          this.changeBookinglist1.retype = "全国单接口预约";
          this.changeBookinglist1.isshow = true;
          //获取当前日期
          var myDate = new Date();
          var nowY = myDate.getFullYear();
          var nowM = myDate.getMonth() + 1;
          var nowD = myDate.getDate();
          var enddate =
            String(nowY) +
            String(nowM < 10 ? "0" + nowM : nowM) +
            String(nowD < 10 ? "0" + nowD : nowD); //当前日期
          //获取三十天前日期
          //  lw =   lw.setDate(myDate.getDate() + 30); //最后一个数字30可改，30天的意思
          var lw = new Date(nowY, nowM, nowD + 30);
          var lastY = lw.getFullYear();
          var lastM = lw.getMonth() + 1;
          var lastD = lw.getDate();
          var startdate =
            String(lastY) +
            String(lastM < 10 ? "0" + lastM : lastM) +
            String(lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
          var body = {
            code: row.storeCode,
            beginDate: enddate,
            endDate: startdate
          };
          console.log(myDate);
          console.log(lw);
          console.log(enddate);
          console.log(startdate);
          this.changeBookinglist1.timeloading = true;
          this.changeBookinglist1.timelist = [];
          this.changeBookinglist1.time = "";

          this.$network1 //获取门店排期
            .post("/appointment/postScheduleByCode", body, row.companyId)
            .then(res => {
              console.log(res);
              if (res.code == 200 && res.message == "成功") {
                console.log(res);
                res.result.map(item => {
                  if (item.stockNumberA > 0 || item.stockNumberM > 0) {
                    var numberPeople = item.stockNumberA + item.stockNumberM;
                    this.changeBookinglist1.timelist.push(numberPeople);
                    this.calendarArr.push(item);
            
                    // this.changeBookinglist.personCountlist.push(item.personCount);
                  }
                });
              }
              console.log(this.calendarArr)
              if (this.changeBookinglist1.timelist.length > 0) {
              } else {
                this.$message.error("该门店暂无预约排期");
              }
              this.changeBookinglist1.timeloading = false;
            })
            .catch(err => {
              this.changeBookinglist1.timeloading = false;
              // this.$message.error(err);
            });

          break;
        case "ID身份证预约":
          break;
        case "人工预约":

          this.calendarArr = [];
          // this.changeBookinglist1.apm=row.apm
          // this.selectcalendar=[retime]

          this.changeBookinglist1.selectreobj = row;
          this.changeBookinglist1.city = row.reCity;
          this.changeBookinglist1.shop = row.reHospital;
          this.changeBookinglist1.time = "";
          this.changeBookinglist1.timelist = [];
          this.changeBookinglist1.retype = "人工预约";
          this.changeBookinglist1.isshow = true;

          var body = {
            code: row.storeCode,
          };

         this.$network2 //获取门店排期
            .post("/qrhealth/weibaoAppointment/postScheduleByCode", body)
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                console.log(res);
                res.result.map(item => {
                  if (item.stockNumberA > 0 || item.stockNumberM > 0) {
                    var numberPeople = item.stockNumberA + item.stockNumberM;
                    this.changeBookinglist1.timelist.push(numberPeople);
                    this.calendarArr.push(item);
          
                    // this.changeBookinglist.personCountlist.push(item.personCount);
                  }
                         
                });
              }
              console.log(this.calendarArr)
              if (this.changeBookinglist1.timelist.length > 0) {
              } else {
                this.$message.error("该门店暂无预约排期");
              }
              this.changeBookinglist1.timeloading = false;
            })
            .catch(err => {
                 console.log(err);
              this.changeBookinglist1.timeloading = false;
              // this.$message.error(err);
            });



          // this.changeBookinglist1.selectreobj = row;
          // this.changeBookinglist1.city = row.reCity;
          // this.changeBookinglist1.shop = row.reHospital;
          // this.changeBookinglist1.time = "";
          // this.changeBookinglist1.timelist = [];
          // this.changeBookinglist1.retype = "人工预约";
          // this.changeBookinglist1.isshow = true;
          // this.$api
          //   .post("/enterParam/queryEnterParamConfByTwoMonth", {
          //     Company: this.changeBookinglist1.selectreobj.joinEnterprise,
          //     Centerid: this.changeBookinglist1.selectreobj.storeCode
          //   })
          //   .then(res => {
          //     console.log(res);
          //     res.data.data.map(item => {
          //       if (item.personCount > 0) {
          //         var str = "";
          //         item.scheduleDate.split("-").map(temp => {
          //           str += temp;
          //         });
          //         this.changeBookinglist1.timelist.push(str);
          //       }
          //     });
          //     if (this.changeBookinglist1.timelist.length > 0) {
          //     } else {
          //       this.$message.error("该门店暂无预约排期");
          //     }
          //     this.changeBookinglist1.timeloading = false;
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });

          break;

        default:
          break;
      }
    },

    citychange(val) {
      console.log(val);
      this.changeBookinglist.shoplist = [];
      this.changeBookinglist.timelist = [];
      this.changeBookinglist.shop = "";
      this.changeBookinglist.time = "";
      switch (this.changeBookinglist.retype) {
        case "全国单接口预约":
          this.$api
            .get("/manage/queryGroupId", {
              goodid: this.changeBookinglist.selectreobj.goodsid
            })
            .then(res => {
              console.log(res);
              this.postQueryCheckUnitListByPackageCode(
                res.data.data.groupid,
                val,
                this.changeBookinglist.selectreobj.companyId
              );
            })
            .catch(err => {
              this.$message.error(err.msg);
            });

          break;

        case "ID身份证预约":
          var body = {
            sessionId: this.IDyuyueobj.sessionId,
            id: ""
          };
          this.changeBookinglist.citylist.map(item => {
            if (item.cityname == this.changeBookinglist.city) {
              body.id = item.id;
            }
          });
          this.$network2
            .post("/appointment/getStore", body)
            .then(res => {
              console.log(res);
              res.result.map(item => {
                var obj = item;
                obj.CheckUnitCode = item.LocalCenterCode || item.number;
                obj.CheckUnitName =
                  item.CenterName || item.name.replace("体检中心名称：", "");
                this.changeBookinglist.shoplist.push(obj);
              });
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.message);
            });
          break;
        case "人工预约":
          this.$api
            .post("/web/goodQueryCityAndInst", {
              id: this.changeBookinglist.selectreobj.goodsid,
              city: val
            })
            .then(res => {
              console.log(res);
              res.data.data.map(item => {
                var obj = item;
                obj.CheckUnitCode = item.LocalCenterCode;
                obj.CheckUnitName = item.CenterName;
                this.changeBookinglist.shoplist.push(obj);
              });
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.msg);
            });
          break;

        default:
          break;
      }

      // this.changeBookinglist.shop = "";
      // console.log(this.changeBookinglist.city);
      // this.$api
      //   .post("/web/queryInstByCityName", {
      //     city: this.changeBookinglist.city,
      //     id: this.selectorder.goodsid
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.changeBookinglist.shoplist = res.data;
      //   });
    },
    shopchange(val) {
      switch (this.changeBookinglist.retype) {
        case "全国单接口预约":
          console.log(val);
          //获取当前日期
          var myDate = new Date();
          var nowY = myDate.getFullYear();
          var nowM = myDate.getMonth() + 1;
          var nowD = myDate.getDate();
          var enddate =
            String(nowY) +
            String(nowM < 10 ? "0" + nowM : nowM) +
            String(nowD < 10 ? "0" + nowD : nowD); //当前日期
          //获取三十天前日期
          //  lw =   lw.setDate(myDate.getDate() + 30); //最后一个数字30可改，30天的意思
          var lw = new Date(nowY, nowM, nowD + 30);
          var lastY = lw.getFullYear();
          var lastM = lw.getMonth() + 1;
          var lastD = lw.getDate();
          var startdate =
            String(lastY) +
            String(lastM < 10 ? "0" + lastM : lastM) +
            String(lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
          var body = {
            code: val,
            beginDate: enddate,
            endDate: startdate
          };
          console.log(myDate);
          console.log(lw);
          console.log(enddate);
          console.log(startdate);
          this.changeBookinglist.timeloading = true;
          this.changeBookinglist.timelist = [];
          this.changeBookinglist.time = "";
          this.$network1 //获取门店排期
            .post(
              "/appointment/postScheduleByCode",
              body,
              this.changeBookinglist.selectreobj.companyId
            )
            .then(res => {
              console.log(res);

              res.result.map(item => {
                if (item.personCount > 0) {
                  this.changeBookinglist.timelist.push(item.scheduleDate);
                  // this.changeBookinglist.personCountlist.push(item.personCount);
                }
              });
              if (this.changeBookinglist.timelist.length > 0) {
              } else {
                this.$message.error("该门店暂无预约排期");
              }
              this.changeBookinglist.timeloading = false;
            })
            .catch(err => {
              this.changeBookinglist.timeloading = false;
              // this.$message.error(err);
            });
          break;

        case "ID身份证预约":
          this.changeBookinglist.timeloading = true;
          this.changeBookinglist.timelist = [];
          this.changeBookinglist.time = "";
          this.$network2
            .post("/appointment/getDate", {
              sessionId: this.IDyuyueobj.sessionId,
              number: this.changeBookinglist.shop
            })
            .then(res => {
              console.log(res);
              if (res.state == 200) {
                for (const key in res.result[0].day) {
                  console.log(res.result[0].day[key]);
                  if (res.result[0].day.hasOwnProperty(key)) {
                    if (res.result[0].day[key] == "enable") {
                      let str =
                        res.result[0].month.substring(0, 4) +
                        res.result[0].month.substring(5, 7) +
                        String(key < 10 ? "0" + key : key);
                      this.changeBookinglist.timelist.push(str);
                    }
                  }
                }
                for (const key in res.result[1].day) {
                  console.log(res.result[1].day[key]);
                  if (res.result[1].day.hasOwnProperty(key)) {
                    if (res.result[1].day[key] == "enable") {
                      let str =
                        res.result[1].month.substring(0, 4) +
                        res.result[1].month.substring(5, 7) +
                        String(key < 10 ? "0" + key : key);
                      this.changeBookinglist.timelist.push(str);
                    }
                  }
                }
                for (const key in res.result[2].day) {
                  console.log(res.result[2].day[key]);
                  if (res.result[2].day.hasOwnProperty(key)) {
                    if (res.result[2].day[key] == "enable") {
                      let str =
                        res.result[2].month.substring(0, 4) +
                        res.result[2].month.substring(5, 7) +
                        String(key < 10 ? "0" + key : key);
                      this.changeBookinglist.timelist.push(str);
                    }
                  }
                }
                console.log(this.changeBookinglist.timelist);
              }
              if (this.changeBookinglist.timelist.length > 0) {
              } else {
                this.$message.error("该门店暂无预约排期");
              }
              this.changeBookinglist.timeloading = false;
            })
            .catch(err => {
              console.log(err);
              this.changeBookinglist.timeloading = false;
            });
          break;
        case "人工预约":
          this.changeBookinglist.timeloading = true;
          this.changeBookinglist.timelist = [];
          this.changeBookinglist.time = "";
          this.$api
            .post("/enterParam/queryEnterParamConfByTwoMonth", {
              Company: this.changeBookinglist.selectreobj.joinEnterprise,
              Centerid: this.changeBookinglist.shop
            })
            .then(res => {
              console.log(res);
              res.data.data.map(item => {
                if (item.personCount > 0) {
                  var str = "";
                  item.scheduleDate.split("-").map(temp => {
                    str += temp;
                  });
                  this.changeBookinglist.timelist.push(str);
                }
              });
              console.log(this.changeBookinglist.timelist);

              if (this.changeBookinglist.timelist.length > 0) {
              } else {
                this.$message.error("该门店暂无预约排期");
              }
              this.changeBookinglist.timeloading = false;
            })
            .catch(err => {
              console.log(err);
            });
          break;

        default:
          break;
      }
    },

    //后台预约or预约改期
    confirmchangebookmsg() {
      this.changeBookinglist.loadingbtn = true;
      console.log(this.changeBookinglist.city);
      console.log(this.changeBookinglist.shop);
      console.log(this.changeBookinglist.time);
      if (!this.changeBookinglist.city || this.changeBookinglist.city == "") {
        this.$message.error("请选择预约城市");
        return;
      }
      if (!this.changeBookinglist.shop || this.changeBookinglist.shop == "") {
        this.$message.error("请选择预约门店");
        return;
      }
      if (!this.changeBookinglist.time || this.changeBookinglist.time == "") {
        this.$message.error("请选择预约时间");
        return;
      }
      switch (this.changeBookinglist.retype) {
        case "全国单接口预约":
          var idCard = this.changeBookinglist.selectreobj.reIDCard;
          var birthday = "";
          var birthdate = "";
          if (idCard.length == 15) {
            birthday = "19" + idCard.substr(6, 6);
          } else if (idCard.length == 18) {
            birthday = idCard.substr(6, 8);
          }
          birthdate = birthday.replace(/(.{4})(.{2})/, "$1$2");
          this.$api
            .get("/manage/queryGroupId", {
              goodid: this.changeBookinglist.selectreobj.goodsid
            })
            .then(res => {
              var body = {
                customerName: this.changeBookinglist.selectreobj.reMan,
                customerIdentityNo: this.changeBookinglist.selectreobj.reIDCard,
                customerGender:
                  this.changeBookinglist.selectreobj.reSex == "男" ? "1" : "2",
                customerBirthday:
                  this.changeBookinglist.selectreobj.reBirthday || birthdate,
                customerMedicalStatus:
                  this.changeBookinglist.selectreobj.reMarry == "已婚"
                    ? "1"
                    : "2",
                appointmentHospitalCode: this.changeBookinglist.shop,
                appointmentPackageCode: res.data.data.groupid,
                appointmentDate: this.changeBookinglist.time,
                outOrderCode: this.changeBookinglist.selectreobj.orNumber,
                hasAuthorized: "Y",
                AddItems: ""
              };
              this.$network1
                .post(
                  "/appointment/postCreate",
                  body,
                  this.changeBookinglist.selectreobj.companyId
                )
                .then(res => {
                  console.log(res);
                  if (res.state == 200 && res.message == "成功") {
                    var body1 = {
                      houtai: "后台",
                      orNumber: this.changeBookinglist.selectreobj.orNumber,
                      reCity: this.changeBookinglist.city,
                      reHospital: "",
                      reStatus: "1",
                      reTime:
                        this.changeBookinglist.time.substring(0, 4) +
                        "-" +
                        this.changeBookinglist.time.substring(4, 6) +
                        "-" +
                        this.changeBookinglist.time.substring(6, 8) +
                        " 00:00:00",
                      reserveToken: "",
                      storeCode: this.changeBookinglist.shop,
                      serverNumber: res.result.serviceNumber,
                      reType: this.changeBookinglist.retype
                    };
                    this.changeBookinglist.shoplist.map(item => {
                      console.log(item);

                      if (item.CheckUnitCode == this.changeBookinglist.shop) {
                        body1.reHospital = item.CheckUnitName;
                      }
                    });
                    this.$api
                      .post("/order/reOrder", body1)
                      .then(res => {
                        console.log(res);
                        if (res.code == 200) {
                          this.$message.success("预约成功！");
                          this.changeBookinglist.isshow = false;
                          this.changeBookinglist.loadingbtn = false;
                          this.reservationSearch();
                        }
                      })
                      .catch(err => {
                        this.$message.error("预约失败！");
                        this.changeBookinglist.loadingbtn = false;
                      });
                  } else {
                    //  this.$message.error(res.message)
                    this.$message.error("预约失败！");
                    this.changeBookinglist.loadingbtn = false;
                  }
                })
                .catch(err => {
                  // this.$message.error(err.msg)
                  this.$message.error("预约失败！");
                  this.changeBookinglist.loadingbtn = false;
                });
            })
            .catch(err => {
              this.$message.error("预约失败！");
              this.changeBookinglist.loadingbtn = false;
            });

          break;

        case "ID身份证预约":
          this.$network2
            .post("/appointment/getConfirm", {
              sessionId: this.IDyuyueobj.sessionId,
              date:
                this.changeBookinglist.time.substring(0, 4) +
                "-" +
                this.changeBookinglist.time.substring(4, 6) +
                "-" +
                this.changeBookinglist.time.substring(6, 8)
            })
            .then(res => {
              if (res.state == 200) {
                this.$network2
                  .post("appointment/saveConfirm", {
                    sessionId: this.IDyuyueobj.sessionId
                  })
                  .then(res => {
                    console.log(res);
                    var body1 = {
                      houtai: "后台",
                      orNumber: this.changeBookinglist.selectreobj.orNumber,
                      reCity: this.changeBookinglist.city.replace("地区", "市"),
                      reHospital: "",
                      reStatus: "1",
                      reTime:
                        this.changeBookinglist.time.substring(0, 4) +
                        "-" +
                        this.changeBookinglist.time.substring(4, 6) +
                        "-" +
                        this.changeBookinglist.time.substring(6, 8) +
                        " 00:00:00",
                      reserveToken: this.IDyuyueobj.token,
                      storeCode: this.changeBookinglist.shop,
                      serverNumber: "",
                      reType: this.changeBookinglist.retype
                    };
                    this.changeBookinglist.shoplist.map(item => {
                      console.log(item);
                      if (item.CheckUnitCode == this.changeBookinglist.shop) {
                        body1.reHospital = item.CheckUnitName;
                      }
                    });
                    this.$api
                      .post("/order/reOrder", body1)
                      .then(res => {
                        console.log(res);
                        if (res.code == 200) {
                          this.$message.success("预约成功！");
                          this.changeBookinglist.isshow = false;
                          this.changeBookinglist.loadingbtn = false;
                          this.reservationSearch();
                        }
                      })
                      .catch(err => {
                        this.$message.error("预约失败！");
                        this.changeBookinglist.loadingbtn = false;
                      });
                  })
                  .catch(err => {
                    this.$message.error(err.message);
                  });
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.message);
            });
          break;
        case "人工预约":
          var body1 = {
            houtai: "后台",
            orNumber: this.changeBookinglist.selectreobj.orNumber,
            reCity: this.changeBookinglist.city,
            reHospital: "",
            reStatus: "1",
            reTime:
              this.changeBookinglist.time.substring(0, 4) +
              "-" +
              this.changeBookinglist.time.substring(4, 6) +
              "-" +
              this.changeBookinglist.time.substring(6, 8) +
              " 00:00:00",
            reserveToken: "",
            storeCode: this.changeBookinglist.shop,
            serverNumber: "",
            reType: this.changeBookinglist.retype
          };
          this.changeBookinglist.shoplist.map(item => {
            console.log(item);

            if (item.CheckUnitCode == this.changeBookinglist.shop) {
              body1.reHospital = item.CheckUnitName;
            }
          });
          this.$api
            .post("/order/reOrder", body1)
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("预约成功！");
                this.changeBookinglist.isshow = false;
                this.changeBookinglist.loadingbtn = false;
                this.reservationSearch();
              }
            })
            .catch(err => {
              this.$message.error("预约失败！");
              this.changeBookinglist.loadingbtn = false;
            });

          break;

        default:
          break;
      }

      // var body = {
      //   orNumber: this.selectorder.orNumber,
      //   reCity: this.changeBookinglist.city,
      //   reHospital: "", //门店名称
      //   id: this.changeBookinglist.shop, //id
      //   reservationTime: this.changeBookinglist.time
      // };
      // this.changeBookinglist.shoplist.map(item => {
      //   if (item.Id == this.changeBookinglist.shop) {
      //     body.reHospital = item.CenterName;
      //   }
      // });
      // console.log(body);

      // this.$api.post("/order/updateReserve", body).then(res => {
      //   console.log(res);
      //   this.changeBookinglist.isshow = false;
      //   this.reservationSearch();
      // });
    },
  yuyuechangebtn() {
   

   if(this.changeBookinglist1.apm){
     if(this.changeBookinglist1.apm=="0"){
      this.changeBookinglist1.registerTime=this.selectcalendar[0].remarksM
     }else{
      this.changeBookinglist1.registerTime=this.selectcalendar[0].remarksA
    }
   
   
      switch (this.changeBookinglist1.selectreobj.reType) {
        case "全国单接口预约":
  
          this.$network1
            .post(
              "/appointment/postModifyAppointmentDate",
              {
                serviceNumber: this.changeBookinglist1.selectreobj.ServerNumber,
                appointmentDate: this.changeBookinglist1.time
              },
              this.changeBookinglist1.selectreobj.companyId
            )
            .then(res => {
             
              if (res.state == 200) {
                this.$api
                  .post("/order/reTimeChange", {
                    houtai: "后台",
                    storeCode: this.changeBookinglist1.selectreobj.storeCode,
                    orNumber: this.changeBookinglist1.selectreobj.orNumber,
                    operator: this.$store.getters.getRoleInfo.AccountName,
                    reStatus: "1",
                    registerTime:this.changeBookinglist1.registerTime,
                    apm:this.changeBookinglist1.apm,
                    reTime:
                      this.changeBookinglist1.time.substring(0, 4) +
                      "-" +
                      this.changeBookinglist1.time.substring(4, 6) +
                      "-" +
                      this.changeBookinglist1.time.substring(6, 8) +
                      " 00:00:00"
                  })
                  .then(res => {
                    this.changeBookinglist1.isshow = false;
                    this.reservationSearch();
                  })
                .catch(err => {
                        this.$message.error("预约失败！");
                     
                });
              }
            });
          break;

        case "ID身份证预约":
          break;
        case "人工预约":
          this.$api
            .post("/order/reTimeChange", {
                 houtai: "后台",
                 storeCode: this.changeBookinglist1.selectreobj.storeCode,
                 orNumber: this.changeBookinglist1.selectreobj.orNumber,
                 operator: this.$store.getters.getRoleInfo.AccountName,
                 reStatus: "1",
                 registerTime:this.changeBookinglist1.registerTime,
                 apm:this.changeBookinglist1.apm,
                 reTime:
                      this.changeBookinglist1.time.substring(0, 4) +
                      "-" +
                      this.changeBookinglist1.time.substring(4, 6) +
                      "-" +
                      this.changeBookinglist1.time.substring(6, 8) +
                      " 00:00:00"
            })
            .then(res => {
              this.changeBookinglist1.isshow = false;
              this.reservationSearch();
            })
             .catch(err => {
                 this.$message.error(err.msg);
                     
              });

          break;

        default:
          break;
      }
   }else{
       this.$message.error("请选择具体修改日期");
   }

    },

    // 全国单接口预约
    // 根据套餐编码查询体检门店列表（1）
    postQueryCheckUnitListByPackageCode(PackageCode, cityName, companyid) {
      console.log(companyid);
      this.$network1
        .get(
          "/appointment/postQueryCheckUnitListByPackageCode",
          {
            PackageCode: PackageCode,
            cityName: cityName
          },
          companyid
        )
        .then(res => {
          console.log(res);
          if (res.state == 200) {
            if (res.result == null || res.result.length <= 0) {
              this.$message.error("暂无可预约门店");
            } else {
              this.changeBookinglist.shoplist = res.result;
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },

    confirmchangeorexludeall(num) {
      if (num == 1) {
        var str = "确认将以上信息批量录入系统吗？";
        var title = "确认批量录入";
      } else {
        var str = "确认将以上信息批量移除系统吗？";
        var title = "确认批量移除";
      }
      this.$confirm(str, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var body = {
            orNumber: [],
            entryOrExclude: String(num)
          };
          // this.tableData.map(item)
          this.changeentryOrExcludeobj.list.map(item => {
            body.orNumber.push(item.orNumber);
          });
          this.$api
            .post("/order/reservationOperateAll", body)
            .then(res => {
              this.changeentryOrExcludeobj.isshow = false;
              this.indeterminate = false;
              this.allreStatus1 = false;
              this.reservationSearch();
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    openchangeentryOrExcludeobj(num) {
      console.log(num);
      console.log(this.tableData);
      this.changeentryOrExcludeobj.list = [];
      this.changeentryOrExcludeobj.num = num;
      if (num == 1) {
        this.changeentryOrExcludeobj.title = "批量确认录入系统";
      }
      if (num == 2) {
        this.changeentryOrExcludeobj.title = "批量确认移除系统";
      }
      this.tableData.map(item => {
        console.log(item.checkStatus);
        if (item.checkStatus) {
          this.changeentryOrExcludeobj.list.push(item);
        }
      });
      if (this.changeentryOrExcludeobj.list.length > 0) {
        console.log();
        this.changeentryOrExcludeobj.isshow = true;
      } else {
        this.$message.error("请勾选需要批量操作的预约信息");
      }
    },
    changerestatus(row, num) {
      console.log(row, num);
      var str = "";
      var title = "";
      switch (num) {
        case 2: //取消预约
          str = "取消后不可恢复，请谨慎操作！";
          title = "操作取消预约";
          break;
        case 4: //已到检
          str = "请确认已到检，确认后订单完成不可退款！";
          title = "确认已到检";
          break;
        case 5: //已出报告
          str = "请确认已出报告，操作后不可恢复！";
          title = "确认已出报告";
          break;
        case 9: //重新预约
          str = "确认需要重新预约吗？";
          title = "操作重新预约";
          break;
        default:
          break;
      }
      this.$confirm(str, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (num == 2 && row.reType == "全国单接口预约") {
            this.$network1
              .post(
                "/appointment/postCancel",
                {
                  serviceNumber: row.ServerNumber
                },
                row.companyId
              )
              .then(res => {
                console.log(res);
                if (res.state == 200 && res.message == "成功") {
                  this.confirmchangerestatus(row, num);
                  return;
                } else {
                  this.$message.error("取消预约失败");
                  return;
                }
              });
          } else {
            if (num == 2 && row.reType == "ID身份证预约") {
              this.IDyuyueobj1.selectreobj = row;
              // this.IDyuyueobj1.selectreobj.reIDCard = "51222219701220766X";
              // this.IDyuyueobj1.selectreobj.reMan = "陶中琼（家属）";
              this.IDyuyueobj1.isshow = true;
              this.IDyuyueobj1.cardcode = "";
              this.IDyuyueobj1.sessionId = "";
              this.IDgetCode1();

              // this.$
            } else {
              this.confirmchangerestatus(row, num);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    changeentryOrExclude(row) {
      //       reMan
      // reIDCard
      // reCity
      // reHospital
      // reTime
      console.log(row);
      var str = "";
      if (row.entryOrExclude == 1) {
        str =
          "是否将本条预约信息剔除系统？" +
          "<br/>姓名：" +
          row.reMan +
          "<br/>身份证：" +
          row.reIDCard +
          "<br/>预约城市：" +
          row.reCity +
          "<br/>分院：" +
          row.reHospital +
          "<br/>时间：" +
          row.reTime;
      } else {
        str =
          "是否将本条预约信息录入系统？" +
          "<br/>姓名：" +
          row.reMan +
          "<br/>身份证：" +
          row.reIDCard +
          "<br/>预约城市：" +
          row.reCity +
          "<br/>分院：" +
          row.reHospital +
          "<br/>时间：" +
          row.reTime;
      }
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          if (row.entryOrExclude == 1) {
            this.confirmchangeorexlude(row, 2);
          } else {
            this.confirmchangeorexlude(row, 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //修改录入状态
    confirmchangeorexlude(row, num) {
      console.log(num);
      this.$api
        .post("/order/reservationOperate", {
          orNumber: row.orNumber,
          entryOrExclude: String(num)
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("修改成功！");
            this.reservationSearch();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    entryOrExcludechange(val) {
      switch (val) {
        case "1":
          return "已录入";
          break;
        case "2":
          return "未录入";
          break;

        default:
          break;
      }
    },
    //保存数据
    copypagemsg() {
      var body = {
        joinEnterprise: this.seekobj.joinEnterprise,
        reStatus: this.seekobj.reStatus,
        type: this.seekobj.type,
        sellerPhone: this.seekobj.sellerPhone,
        orNumber: this.seekobj.orNumber,
        userPhone: this.seekobj.userPhone,
        reMan: this.seekobj.reMan,
        rePhone: this.seekobj.rePhone,
        timeType: this.seekobj.timeType,
        reType: this.seekobj.reType,
        IDType: this.seekobj.IDType,
        entryOrExclude: this.seekobj.entryOrExclude,
        yearSelect: this.yearSelect,
        filialeValue: this.filialeValue,
        currentPage: this.currentPage,
        pagesize: this.pagesize
      };
      this.$store.commit("setreservationlistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      if (this.$route.query.restatus) {
        this.seekobj.reStatus = Number(this.$route.query.restatus);
        return;
      }
      if (this.$route.query.entryOrExclude) {
        this.seekobj.entryOrExclude = String(this.$route.query.entryOrExclude);
        return;
      }
      var body = this.$store.getters.getreservationlistmsg;
      this.seekobj.joinEnterprise = body.joinEnterprise || "";
      this.seekobj.reStatus = body.reStatus || "全部";
      this.seekobj.type = body.type || "全部";
      this.seekobj.sellerPhone = body.sellerPhone || "";
      this.seekobj.orNumber = body.orNumber || "";
      this.seekobj.userPhone = body.userPhone || "";
      this.seekobj.reMan = body.reMan || "";
      this.seekobj.rePhone = body.rePhone || "";
      this.seekobj.timeType = body.timeType || "付款时间";
      this.seekobj.reType = body.reType || "";
      this.seekobj.IDType = body.IDType || "";
      this.seekobj.entryOrExclude = body.entryOrExclude || "";
      this.yearSelect = body.yearSelect || "";
      this.filialeValue = body.filialeValue || "";
      this.currentPage = body.currentPage || 1;
      this.pagesize = body.pagesize || 10;

      console.log(body);
    },
    allreStatus(val) {
      console.log(val);
      if (val) {
        let addnum = 0;
        this.tableData.map((item, index) => {
          if (
            item.reStatus == 1 ||
            item.reStatus == 2 ||
            item.reStatus == 4 ||
            item.reStatus == 9
          ) {
            addnum++;
            //scope.row.reStatus=='2'
            this.tableData[index].checkStatus = true;
          }
        });
        if (addnum == 0 || addnum == this.tableData.length) {
          console.log("11111" + addnum);
          this.indeterminate = false;
        } else {
          console.log("2222" + addnum);
          this.indeterminate = true;
        }
      } else {
        this.tableData.map((item, index) => {
          this.tableData[index].checkStatus = false;
          this.indeterminate = false;
        });
      }
    },
    onereStatus(val) {
      console.log(val);
      var addnum = 0;
      this.tableData.map(item => {
        if (item.checkStatus) {
          addnum++;
        }
      });
      if (addnum == 0 || addnum == this.tableData.length) {
        this.indeterminate = false;
      } else {
        this.indeterminate = true;
      }
    },
    goback() {
      this.isshowexcel = false;
    },
    editBooking(row) {
      console.log(row);
      this.selectorder = row;
      this.changeBookinglist.citylist = [];
      this.changeBookinglist.city = "";
      this.changeBookinglist.shop = "";
      this.changeBookinglist.shoplist = [];
      this.changeBookinglist.time = "";
      this.changeBookinglist.isshow = true;
      this.$api
        .post("/web/queryCityByGoodid", {
          id: row.goodsid
        })
        .then(res => {
          this.changeBookinglist.citylist = res.data;
        });
    },

    changeBookingstatus(row) {
      console.log(row);
      this.selectorder = row;
      this.Bookingstatus.reStatus = row.reStatus;
      console.log(this.Bookingstatus.reStatus);
      this.Bookingstatus.isshow = true;
    },
    //修改预约状态
    confirmchangerestatus(row, num) {
      this.$api
        .post("/order/reservationOperate", {
          orNumber: row.orNumber,
          reStatus: String(num)
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("修改成功！");
            this.changeBookinglist2.isshow=false;
            this.reservationSearch();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    //修改预约状态确认按钮
    confirmchangeBookingStatus() {
      this.$api
        .post("/order/reservationOperate", {
          orNumber: this.selectorder.orNumber,
          reStatus: this.Bookingstatus.reStatus
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("修改成功！");
            this.reservationSearch();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    //批量修改预约状态确认按钮
    confirmchangeBookingStatus1() {
      var body = {
        orNumber: [],
        reStatus: this.Bookingstatus1.reStatus
      };
      this.tableData.map(item => {
        if (item.checkStatus) {
          body.orNumber.push(item.orNumber);
        }
      });
      if (body.orNumber.length == 0) {
        this.$message.error("请勾选需要修改的预约信息");
        // return;
      }
      if (!this.Bookingstatus1.reStatus || this.Bookingstatus1.reStatus == "") {
        this.$message.error("请选择修改的状态");
        return;
      }
      console.log(body);

      this.$api.post("/order/reservationOperateAll", body).then(res => {
        console.log(res);
        this.Bookingstatus1.isshow = false;
        this.reservationSearch();
      });
    },

    //预约记录按钮
    BookingstatusNodebtn(row) {
      console.log(row);
      this.BookingstatusNode.isshow = true;
      this.BookingstatusNode.loading = true;
      this.$api
        .post("/order/lookDetailsReserve", {
          orNumber: row.orNumber,
          sonNumber: row.goSonNumber
        })
        .then(res => {
          this.BookingstatusNode.loading = false;
          this.BookingstatusNode.statusNodelist = res.data;
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    //导出记录
    excelpop() {
      this.isshowexcel = true;
      this.$api
        .post("/order/reserveEx", { uid: this.$store.getters.getRoleInfo.Id })
        .then(res => {
          console.log(res);
          this.yuyueexcellist = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    //备注按钮
    SpeakerNotebtn(row) {
      console.log(row);
      this.selectorder = row;
      this.SpeakerNote.isshow = true;
      this.SpeakerNote.loading = true;
      this.$api
        .post("/order/queryRemarks", {
          sonNumber: row.goSonNumber
        })
        .then(res => {
          console.log(res);
          this.SpeakerNote.notelist = res.data;
          this.SpeakerNote.loading = false;
        })
        .catch(err => {
          // console.log(err.msg);
          this.$message.error(err.msg);
        });
      this.SpeakerNote.textarea2 = "";
    },
    //确认备注信息
    confirmNoteBtn() {
      if (this.SpeakerNote.textarea2.trim() == "") {
        this.$message.error("请填写备注信息！");
        return;
      }
      var body = {
        orNumber: this.selectorder.orNumber,
        sonNumber: this.selectorder.goSonNumber,
        reservationRemarks: this.SpeakerNote.textarea2.trim()
      };
      this.$api
        .post("order/remarks", body)
        .then(res => {
          console.log(res);
          this.SpeakerNote.isshow = false;
          this.$message.success("成功添加备注");
          this.reservationSearch();
        })
        .catch(res => {
          console.log(res);
          this.$message.success("添加备注失败");
        });
    },
    //预约记录导出
    exportyuyuemsg() {
      var body = {
        sortCompany: this.filialeValue,
        joinEnterprise: this.seekobj.joinEnterprise,
        reStatus: this.seekobj.reStatus,
        type: this.seekobj.type,
        sellerPhone: this.seekobj.sellerPhone,
        orNumber: this.seekobj.orNumber,
        userPhone: this.seekobj.userPhone,
        reMan: this.seekobj.reMan,
        rePhone: this.seekobj.rePhone,
        timeType: this.seekobj.timeType,
        orTime1: "",
        orTime2: "",
        each: this.pagesize,
        page: this.currentPage,
        uid: this.$store.getters.getRoleInfo.Id,
        reType: this.seekobj.reType,
        documentType: this.seekobj.IDType,
        entryOrExclude: this.seekobj.entryOrExclude,
        export: "1"
      };
      if (body.joinEnterprise == "全部") {
        body.joinEnterprise = "";
      }
      if (this.yearSelect && this.yearSelect.length > 0) {
        body.orTime1 = this.yearSelect[0];
        body.orTime2 = this.yearSelect[1];
      } else {
        body.orTime1 = "";
        body.orTime2 = "";
      }
      this.$api
        .post("/order/reservationSearch", body)
        .then(res => {
          console.log(res);
          const adownload = document.getElementById("adownload");
          adownload.setAttribute(
            "download",
            this.$parent.$parent.$parent.weburl + res.data
          ); // download属性
          adownload.setAttribute(
            "href",
            this.$parent.$parent.$parent.weburl + res.data
          ); // href链接
          adownload.click();
        })
        .catch(res => {
          this.$message.error("导出失败");
        });
    },
    //预约状态转换
    reStatuschange(val) {
      switch (val) {
        //旧预约状态
        // case 1:
        //   return "申请预约";
        //   break;
        // case 2:
        //   return "取消预约";
        //   break;
        // case 3:
        //   return "已落单";
        //   break;
        // case 4:
        //   return "已到检";
        //   break;

        // case 8:
        //   return "等待预约";
        //   break;
        // case 0:
        //   return "可以预约";
        //   break;

        //新预约状态
        case 1:
          return "已预约";
          break;
        case 2:
          return "取消预约";
          break;
        case 4:
          return "已到检";
          break;
        case 5:
          return "已出报告";
          break;
        case 9:
          return "待预约";
          break;
        case 10:
          return "待预约-退款中不可操作";
          break;
        case 11:
          return "取消预约-退款中不可操作";
          break;
        case 12:
          return "已预约-退款中不可操作";
          break;
        case 13:
          return "预约失效";
          break;
        case 14:
          return "预约改期-未确认";
          break;

        default:
          break;
      }
    },

    // 1：申请预约 2:取消预约	3:已落单	4:已到检(未实现)	5:已出报告(未实现)	6 改期（app客户取消预约以及后台改预约三个字段）
    reStatuschange1(val) {
      switch (val) {
        case 1:
          return "申请预约";
          break;
        case 2:
          return "取消预约";
          break;
        case 3:
          return "已落单";
          break;
        case 4:
          return "已到检";
          break;
        case 5:
          return "已出报告";
          break;
        case 6:
          return "改期";
          break;
        case 8:
          return "可以预约";
          break;
        default:
          break;
      }
    },
    //搜索按钮
    queeryreservationlist() {
      this.allreStatus1 = false;
      this.currentPage = 1;
      this.reservationSearch();
    },
    //预约列表查询接口
    reservationSearch() {
      this.numtest++;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          var body = {
            sortCompany: this.filialeValue,
            joinEnterprise: this.seekobj.joinEnterprise,
            reStatus: this.seekobj.reStatus,
            type: this.seekobj.type,
            sellerPhone: this.seekobj.sellerPhone,
            orNumber: this.seekobj.orNumber,
            userPhone: this.seekobj.userPhone,
            reMan: this.seekobj.reMan,
            rePhone: this.seekobj.rePhone,
            timeType: this.seekobj.timeType,
            reType: this.seekobj.reType,
            orTime1: "",
            orTime2: "",
            each: this.pagesize,
            page: this.currentPage,
            uid: this.$store.getters.getRoleInfo.Id,
            documentType: this.seekobj.IDType,
            entryOrExclude: this.seekobj.entryOrExclude,
            export: "0"
          };
          if (body.joinEnterprise == "全部") {
            body.joinEnterprise = "";
          }
          if (this.yearSelect && this.yearSelect.length > 0) {
            body.orTime1 = this.yearSelect[0];
            body.orTime2 = this.yearSelect[1];
          } else {
            body.orTime1 = "";
            body.orTime2 = "";
          }
          this.$api
            .post("/order/reservationSearch", body)
            .then(res => {
              console.log(res);
              this.indeterminate = false;
              this.allreStatus1 = false;

              this.tableData = [];
              res.data.data.map(item => {
                var obj = {};
                obj = item;
                obj.checkStatus = false;
                this.tableData.push(obj);
              });

              this.count = res.data.count;
            })
            .catch(res => {
              console.log(res);
              this.tableData = [];
              this.count = 0;
            });
        } else {
        }
      });
    },
    //通过所属分公司查找企业
    filialevaluechange() {
      console.log(this.$store.getters.getEnterprise);
      if (
        this.filialeValue == "全部" ||
        this.filialeValue == "" ||
        this.filialeValue == "优健康自营"
      ) {
        var body = {
          AccountType: "0",
          AccountName: "运营"
        };
      } else {
        if (this.$store.getters.getRoleInfo.AccountType == "2") {
          var body = {
            AccountType: "2",
            AccountName: this.$store.getters.getRoleInfo.AccountName
          };
        } else {
          var body = {
            AccountType: "1",
            AccountName: this.filialeValue
          };
        }
      }

      this.seekobjlist.joinEnterpriselist = ["全部"];
      this.$api.get("account/pullOrg2", body).then(res => {
        console.log(res);
        res.data.map(item => {
          if (item.AccountType == "3") {
            item.Name.map(temp => {
              this.seekobjlist.joinEnterpriselist.push(temp);
            });
          }
        });
      });
      // if (
      //   this.filialeValue &&
      //   this.filialeValue != "" &&
      //   this.filialeValue != "优健康自营"
      // ) {
      //   this.$api
      //     .get(
      //       "/account/GetEnterpriseByFromCompany?FromCompany=" +
      //         this.filialeValue
      //     )
      //     .then(res => {
      //       console.log(res);
      //       this.seekobjlist.joinEnterpriselist = res.data;
      //     })
      //     .catch(res => {
      //       console.log(res);
      //       this.seekobjlist.joinEnterpriselist = [];
      //     });
      // }
    },
    handleClick(index, row) {
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.allreStatus1 = false;
      this.indeterminate = false;
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.currentPage = 1;
      this.reservationSearch();
    },
    handleCurrentChange(val) {
      this.allreStatus1 = false;
      this.indeterminate = false;
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.reservationSearch();
    }
  },
  computed: {
    // 获取按钮权限信息
    // Clickable() {
    //   var temp = this.$store.getters.getRoles("预约列表");
    //   console.log("vuex中获取按钮权限*****************");
    //   console.log("temp.rolesList", temp.rolesList);
    //   return temp.rolesList;
    // },
    // 获取个人权限信息
    // RoleInfo() {
    //   console.log("vuex中获取个人信息");
    //   console.log(this.$store.getters.getRoleInfo);
    //   return this.$store.getters.getRoleInfo;
    // }
  }
};
</script>

<style lang="scss">
.redpoint {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #f56c6c;
  width: 10px;
  height: 10px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.Bookingstatusbox {
  margin-left: 30px;
  line-height: 50px;
}
.nonemsg {
  text-align: center;
  color: #f56c6c;
}
.reservation_table {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-top: 10px;
  .el-table td,
  .el-table th {
    padding: 8px 0;
  }
}
.reservation_table_inquire {
  border-radius: 4px;
  // margin-bottom: 20px;
  font-size: 14px;
  overflow: hidden;
  background: #f2f6fc;
}
.reservation_table_inquire1 {
  border-radius: 4px;
  // margin-bottom: 20px;
  font-size: 14px;
  overflow: hidden;
  background: #bbbbbb;
}
.reservation_table_inquire2 {
  border-radius: 4px;
  // margin-bottom: 20px;
  font-size: 14px;
  overflow: hidden;
  background: #ffffff;
}
.reservation_table_inquire3 {
  border-radius: 4px;
  font-size: 14px;
  overflow: hidden;
  background: rgb(151, 161, 215);
}
.reservation_table_list_name {
  float: left;
  width: 35%;
  text-align: right;
  min-height: 36px;
  line-height: 36px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
  // background: #99a9bf;
}
.reservation_table_list_content {
  width: 65%;
  text-align: left;
  display: inline-block;
  // background: #d3dce6;
  min-height: 36px;
  line-height: 36px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.orderExcelcordbox {
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin: 25px;
  margin-bottom: 0%;
}
.ordertime {
  border-bottom: 1px solid #cccccc;
  padding: 15px;
}
.ordermsg {
  padding: 15px;
  line-height: 30px;
}
</style>



