<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
    <!-- <div style="font-size: 20px; ">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>-->
    <div style="margin:20px;min-width: 1200px;">
      <el-form
        :inline="true"
        :model="seekList"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <!-- <el-form-item label="订单编号">
          <el-input v-model="seekList.ordernam" placeholder="订单编号" style="width:200px" clearable></el-input>
        </el-form-item>-->
        <el-form-item label="营销部">
          <el-input
            v-model.trim="seekList.yingxiao"
            placeholder="请输入内容"
            style="width:200px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="销售部">
          <el-input
            v-model.trim="seekList.shopman"
            placeholder="请输入内容"
            style="width:200px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="业务员">
          <el-input
            v-model.trim="seekList.yewuman"
            placeholder="请输入内容"
            style="width:200px"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin:20px;margin-left:80px;min-width: 1200px;">
      <el-tooltip class="item" effect="dark" :content="overview.paidInAmount+''" placement="top">
        <div class="overtit">实收金额：{{overview.paidInAmount}}</div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="overview.headcount+''" placement="top">
        <div class="overtit">体检人数：{{overview.headcount}}</div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="overview.commissionAmount+''"
        placement="top"
      >
        <div class="overtit">提成金额：{{overview.commissionAmount}}</div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="overview.lateFeeReceivable+''"
        placement="top"
      >
        <div class="overtit">应收滞纳金：{{overview.lateFeeReceivable}}</div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="overview.probableCommission+''"
        placement="top"
      >
        <div class="overtit">应发提成：{{overview.probableCommission}}</div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="overview.actualCommission+''"
        placement="top"
      >
        <div class="overtit">实发提成：{{overview.actualCommission}}</div>
      </el-tooltip>
    </div>
    <div style="margin:20px;float:right">
      <el-button type="primary" @click="ygplczbtn">数据导入</el-button>
      <el-button type="primary" @click="gotodcsz">数据导出</el-button>
      <!--   -->
      <!-- <el-button type="primary">导出记录</el-button> -->
      <!--  @click="isrecipients=true" -->
      <el-button type="primary" icon="el-icon-search" @click="search()">搜 索</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%;margin-top:20px" v-loading="loadings">
      <!-- <el-table-column prop="joinEnterprise" label="订单代码" min-width="140" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="protocol" label="合作协议" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="DWMC" label="单位名称" min-width="140" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="serialNumber" label="业务员代码" min-width="140" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="name" label="业务员" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="marketingDepartment" label="营销部" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="saleDepartment" label="销售部" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="headcount" label="体检人数" min-width="160" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="expressDelivery" label="单位挂账" min-width="160" show-overflow-tooltip></el-table-column> -->
      <!-- <el-table-column prop="addPackageCost" label="加项" min-width="160" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="totalOriginalPrice" label="原价合计" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="totalReturn" label="回款合计" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column label="回款周期 / 逾期天数" min-width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="resAnd">
            <div v-for="(item,indexz) in scope.row.returnCycle" :key="indexz">
              <span>{{item.date}}</span>&nbsp;&nbsp;/&nbsp;&nbsp;
              <span>{{item.overdueDays}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="invoicedAmount" label="开票金额" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column label="发票高开金额" min-width="160" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            v-if="scope.row.invoiceDiff!=0"
            content="开票金额异常"
            placement="top-start"
          >
            <div :class="scope.row.invoiceDiff==0?classC:classD">{{scope.row.invoiceDiff}}</div>
          </el-tooltip>
          <div v-if="scope.row.invoiceDiff==0">{{scope.row.invoiceDiff}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="saleSpend" label="销售费用" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="fare" label="租车费" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="paidInAmount" label="实收金额" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="commissionRatio" label="提成比例" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="rewardRatio" label="奖励比例" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="commissionAmount" label="提成金额" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lateFeeReceivable" label="应收滞纳金" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="deduction" label="扣款" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="hrDeduction" label="人事扣款" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column
        prop="probableCommission"
        label="应发提成金额"
        min-width="160"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="cooperationOrder" label="合作单" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column
        prop="actualCommission"
        fixed="right"
        label="实发提成"
        min-width="160"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="提示" min-width="140" show-overflow-tooltip>
        <template slot-scope="scope">
          <div
            :class="scope.row.hasInvoice==false?classA:classB"
          >{{scope.row.hasInvoice==false?'发票表数据缺失':'发票表数据完整'}}</div>
          <div
            :class="scope.row.hasMedTest==false?classA:classB"
          >{{scope.row.hasMedTest==false?'对账表数据缺失':'对账表数据完整'}}</div>
          <div
            :class="scope.row.hasReturn==false?classA:classB"
          >{{scope.row.hasReturn==false?'回款表数据缺失':'回款表数据完整'}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" fixed="right" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="immediatelyMail(scope.row)" type="text" size="medium">修改</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <!-- 导出记录 -->
    <el-dialog title="导出记录" :visible.sync="isrecipients" width="800px">
      <el-table :data="tableDataMSG" style="width: 100%;margin-top:20px" v-loading="loadings">
        <el-table-column prop="joinEnterprise" label="报表导出时间" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="applicationTime" label="文件名" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="expressDelivery" label="导出人" min-width="160" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 空置弹窗 需要使用 -->
    <el-dialog title="备注" :visible.sync="isremark" width="500px">
      <div slot="footer" class="dialog-footer">
        <el-button @click="isremark = false">取 消</el-button>
        <el-button type="primary" @click="isremark = false">确定</el-button>
      </div>
    </el-dialog>

    <!-- // 点击修改按钮弹窗 -->
    <el-dialog title="修改信息" :visible.sync="isshipments" width="500px">
      <div slot="footer" class="dialog-footer">
        <el-button @click="isshipments = false">取 消</el-button>
        <el-button type="primary" @click="affirmshipments">确定</el-button>
      </div>
    </el-dialog>

    <!-- :before-close="handleClose" @close="nogonewname" -->
    <el-dialog title="数据导入" :visible.sync="showmodelr" width="800px" :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="导入团单提成表" name="first" :key="'first'">
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-download"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">下载团单提成模板</div>
                  <div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
                </div>
                <el-button
                  class="carbtn"
                  type="primary"
                  size="small"
                  @click="DownloadTemplatgo"
                >下载模板</el-button>
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">导入团单提成模板</div>
                  <div style="font-size:14px; color:#9E9E9E">仅支持xlsx（即Excel格式），文件大小≤4M。</div>
                  <div v-for="(item,index) in ygplczobj.drobj.newuptlode" :key="index">
                    <div style="font-size:14px; color:#3A83FF">
                      {{item.filename}}
                      <i
                        @click="delfile(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-error"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmo === index"
                        @click="lodingasd(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-bottom"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmo!= index"
                        @click="lodingasd(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-top"
                      ></i>
                    </div>
                    <div v-show="showmo === index">
                      <div v-for="(item,index) in firstname" :key="index">单位名称：{{item.DWMC}}</div>
                    </div>
                  </div>
                </div>
                <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
              </div>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="导入人员信息表" name="second" :key="'second'">
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-download"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">下载人员信息表</div>
                  <div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
                </div>
                <el-button
                  class="carbtn"
                  type="primary"
                  size="small"
                  @click="DownloadTemplatgo"
                >下载模板</el-button>
                <!--  -->
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">导入体检对账表</div>
                  <div style="font-size:14px; color:#9E9E9E">仅支持xlsx（即Excel格式），文件大小≤4M。</div>
                  <div v-for="(item,index) in ygplczobj.xgobj.newuptlode" :key="index">
                    <div style="font-size:14px; color:#3A83FF">
                      {{item.filename}}
                      <i
                        @click="delfile(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-error"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmoa === index"
                        @click="lodingasdc(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-bottom"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmoa!= index"
                        @click="lodingasdc(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-top"
                      ></i>
                    </div>
                    <div v-show="showmoa === index" style="max-height: 255px;overflow-y: auto;">
                      <div v-for="(item,index) in thrmsg.medTestsInfo" :key="index">
                        <div>单位名称：{{item.DWMC}}</div>
                        <div>体检人数：{{item.headcount}}</div>
                        <div>挂账金额：{{item.totalRegister}}</div>
                        <div>预约日期：{{item.lastTestDate}}</div>
                        <div>套餐数量：{{item.combos!=null?item.combos.length:0}}</div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
              </div>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="导入单位回款明细表" name="three" :key="'three'">
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-download"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">下载单位回款明细表</div>
                  <div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
                </div>
                <el-button
                  class="carbtn"
                  type="primary"
                  size="small"
                  @click="DownloadTemplatgo"
                >下载模板</el-button>
                <!--   -->
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">导入单位回款明细表</div>
                  <div style="font-size:14px; color:#9E9E9E">仅支持xlsx（即Excel格式），文件大小≤4M。</div>
                  <div v-for="(item,index) in ygplczobj.scobj.newuptlode" :key="index">
                    <div style="font-size:14px; color:#3A83FF">
                      {{item.filename}}
                      <i
                        @click="delfile(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-error"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmot === index"
                        @click="lodingasdt(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-bottom"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmot!= index"
                        @click="lodingasdt(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-top"
                      ></i>
                    </div>
                    <div v-show="showmot === index">
                      <div>回款单位数量：{{scrmsg}}</div>
                      <!-- <div v-for="(itemr,indexz) in scrmsg.returnCycle" :key="indexz">
                        <div>回款日期：{{itemr.date}}</div>
                        <div>回款金额：{{itemr.money}}</div>
                      </div>-->
                    </div>
                  </div>
                </div>
                <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
              </div>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="导入发票登记统计表" name="four" :key="'four'">
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-download"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">下载发票登记统计表</div>
                  <div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
                </div>
                <el-button
                  class="carbtn"
                  type="primary"
                  size="small"
                  @click="DownloadTemplatgo"
                >下载模板</el-button>
                <!--   -->
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">导入发票登记统计表</div>
                  <div style="font-size:14px; color:#9E9E9E">仅支持xlsx（即Excel格式），文件大小≤4M。</div>
                  <div v-for="(item,index) in ygplczobj.fpobj.newuptlode" :key="index">
                    <div style="font-size:14px; color:#3A83FF">
                      {{item.filename}}
                      <i
                        @click="delfile(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-error"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmof === index"
                        @click="lodingasdf(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-bottom"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmof!= index"
                        @click="lodingasdf(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-top"
                      ></i>
                    </div>
                    <div v-show="showmof === index">
                      <div v-for="(itemz,indexq) in formsg.DWList" :key="indexq">
                        <div>单位代码：{{itemz.DWDM}}</div>
                        <div>发票金额：{{itemz.money}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
              </div>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="导入套餐信息表" name="five" :key="'five'">
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-download"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">下载套餐信息表</div>
                  <div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
                </div>
                <el-button
                  class="carbtn"
                  type="primary"
                  size="small"
                  @click="DownloadTemplatgo"
                >下载模板</el-button>
                <!--  -->
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="box-card">
              <div>
                <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
              </div>
              <div style="width:100%;margin-left:20px">
                <div style>
                  <div style="font-size:18px;">导入套餐信息表</div>
                  <div style="font-size:14px; color:#9E9E9E">仅支持xlsx（即Excel格式），文件大小≤4M。</div>
                  <div v-for="(item,index) in ygplczobj.qtobj.newuptlode" :key="index">
                    <div style="font-size:14px; color:#3A83FF">
                      {{item.filename}}
                      <i
                        @click="delfile(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-error"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmov === index"
                        @click="lodingasdv(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-bottom"
                      ></i>
                      <i
                        v-if="item.id"
                        v-show="showmov!= index"
                        @click="lodingasdv(index,item)"
                        style="cursor: pointer;"
                        class="el-icon-caret-top"
                      ></i>
                    </div>
                    <div v-show="showmov === index" style="max-height: 255px;overflow-y: auto;">
                      <div v-for="(item,index) in fivmsg.combos" :key="index">
                        <div>套餐名称：{{item.groupName}}</div>
                        <div>套餐原价：{{item.oldPrice}}</div>
                        <div>套餐结算价：{{item.price}}</div>
                        <div>&nbsp;</div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <div style="text-align:center;margin-top:20px">
          <el-button type="primary" @click="nonefile">暂时不导入</el-button>
          <el-button type="primary" @click="gotoactiveo">完成导入</el-button>
        </div>
      </el-tabs>
    </el-dialog>
    <input
      ref="ygplczinput"
      id="ygplczinputid"
      style="display:none"
      type="file"
      @change="ygplczimportfxx()"
      multiple
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    />
    <!-- accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" -->
    <!-- 分页 -->
    <div style="height:30px;margin-top:20px;">
      <el-pagination
        style="float:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableselectenterMeal.pageindex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableselectenterMeal.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableselectenterMeal.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],

  data() {
    return {
      classA: "classA",
      classB: "classB",
      classC: "classC",
      classD: "classD",
      activeName: "first",
      showmodelr: false,
      firstname: [],
      showmo: -1,
      showmoa: -1,
      showmot: -1,
      showmof: -1,
      showmov: -1,
      ygplczobj: {
        isshow: false,
        drobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          succaa: "",
          successSum: [],
          mistake: [],
          loadingb: false,
          loadingtext: "",
          newuptlode: [],
        },
        xgobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          loadingb: false,
          loadingtext: "",
          newuptlode: [],
        },
        scobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          loadingb: false,
          loadingtext: "",
          newuptlode: [],
        },
        fpobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          loading: false,
          loadingtext: "",
          newuptlode: [],
        },
        qtobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          loadingb: false,
          loadingtext: "",
          newuptlode: [],
        },
      },
      drmsg: "",
      scrmsg: "",
      thrmsg: [],
      formsg: "",
      fivmsg: "",
      isrecipients: false,
      isremark: false,
      companyId: "",
      isshipments: false,
      selectmessage: {}, //选择的信息
      // 搜索
      seekList: {
        ordernam: "",
        yingxiao: "",
        shopman: "",
        yewuman: "",
      },
      tableselectenterMeal: {
        //分页
        pageindex: 1,
        pagesize: 10,
        total: 0,
      },

      tableData: [], //列表
      tableDataMSG: [], //导出记录
      loadings: false,
      firstoffer: [],
      secodeoffer: [],
      threeoffer: [],
      fouroffer: [],
      fiveoffer: [],
      overview: "",
    };
  },

  props: {
    polar: String,
  },
  components: {},
  mounted() {
    // console.log(this.polar);
    this.getmessage();
    this.getoffer();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(this.activeName);
    },
    lodingasd(index, item) {
      let that = this;
      // console.log(index, item.id);
      let drmsg = "";
      for (let i in that.ygplczobj.drobj.newuptlode) {
        if (item.id == that.ygplczobj.drobj.newuptlode[i].id) {
          // console.log(that.ygplczobj.drobj.newuptlode[i]);
          drmsg = that.ygplczobj.drobj.newuptlode[i];
          this.drmsg = drmsg;
          this.firstname = this.drmsg.orders;
          // console.log(this.drmsg.orders[0].DWMC);
        }
      }
      if (that.showmo === index) {
        that.showmo = -1;
      } else {
        that.showmo = index;
      }
    },
    lodingasdc(index, item) {
      let that = this;
      console.log(index, item.DWDM);
      let thrmsg = [];
      for (let i in that.ygplczobj.xgobj.newuptlode) {
        if (item.id == that.ygplczobj.xgobj.newuptlode[i].id) {
          console.log(that.ygplczobj.xgobj.newuptlode[i]);
          thrmsg = that.ygplczobj.xgobj.newuptlode[i];
          this.thrmsg = thrmsg;
        }
      }
      if (that.showmoa === index) {
        that.showmoa = -1;
      } else {
        that.showmoa = index;
      }
    },
    lodingasdt(index, item) {
      let that = this;
      console.log(index, item.id);
      let scrmsg = "";
      for (let i in that.ygplczobj.scobj.newuptlode) {
        if (item.id == that.ygplczobj.scobj.newuptlode[i].id) {
          console.log(that.ygplczobj.scobj.newuptlode[i]);
          scrmsg = that.ygplczobj.scobj.newuptlode[i];
          if (scrmsg.returns != null || scrmsg.returns != "") {
            console.log(scrmsg);
            this.scrmsg = scrmsg.returns.length;
          }else{
            this.scrmsg = 0
          }
        }
      }
      if (that.showmot === index) {
        that.showmot = -1;
      } else {
        that.showmot = index;
      }
    },
    lodingasdf(index, item) {
      let that = this;
      console.log(index, item.id);
      let formsg = "";
      for (let i in that.ygplczobj.fpobj.newuptlode) {
        if (item.id == that.ygplczobj.fpobj.newuptlode[i].id) {
          console.log(that.ygplczobj.fpobj.newuptlode[i]);
          formsg = that.ygplczobj.fpobj.newuptlode[i];
          this.formsg = formsg;
        }
      }
      if (that.showmof === index) {
        that.showmof = -1;
      } else {
        that.showmof = index;
      }
    },
    lodingasdv(index, item) {
      let that = this;
      // console.log(index, item.id);
      let fivmsg = "";
      for (let i in that.ygplczobj.qtobj.newuptlode) {
        if (item.id == that.ygplczobj.qtobj.newuptlode[i].id) {
          // console.log(that.ygplczobj.qtobj.newuptlode[i]);
          fivmsg = that.ygplczobj.qtobj.newuptlode[i];
          this.fivmsg = fivmsg;
        }
      }
      if (that.showmov === index) {
        that.showmov = -1;
      } else {
        that.showmov = index;
      }
    },

    //员工批量操作
    ygplczbtn() {
      this.showmodelr = true;
      // console.log(111);
    },

    //员工批量操作excel
    ygplczimportfxx(e, file) {
      // console.log(this.ygplczobj.xgobj.newuptlode);
      var that = this;
      var oFiles = document.getElementById("ygplczinputid").files;
      var params = new FormData();
      // console.log(oFiles);
      var arrcont = [];
      for (let i in oFiles) {
        // console.log(i, ":", oFiles[i]);
        // console.log(oFiles[i].type);
        if (oFiles[i].name) {
          switch (this.activeName) {
            case "first":
              for (let z in that.ygplczobj.drobj.newuptlode) {
                if (
                  oFiles[i].name == that.ygplczobj.drobj.newuptlode[z].filename
                ) {
                  this.$message.error("上传文件重复");
                  return;
                }
              }
              break;

            case "second":
              for (let z in that.ygplczobj.xgobj.newuptlode) {
                if (
                  oFiles[i].name == that.ygplczobj.xgobj.newuptlode[z].filename
                ) {
                  this.$message.error("上传文件重复");
                  return;
                }
              }
              break;

            case "three":
              for (let z in that.ygplczobj.scobj.newuptlode) {
                if (
                  oFiles[i].name == that.ygplczobj.scobj.newuptlode[z].filename
                ) {
                  this.$message.error("上传文件重复");
                  return;
                }
              }
              break;

            case "four":
              for (let z in that.ygplczobj.fpobj.newuptlode) {
                if (
                  oFiles[i].name == that.ygplczobj.fpobj.newuptlode[z].filename
                ) {
                  this.$message.error("上传文件重复");
                  return;
                }
              }
              break;

            case "five":
              for (let z in that.ygplczobj.qtobj.newuptlode) {
                if (
                  oFiles[i].name == that.ygplczobj.qtobj.newuptlode[z].filename
                ) {
                  this.$message.error("上传文件重复");
                  return;
                }
              }
              break;

            default:
              break;
          }
        }
        if (oFiles[i].type) {
          var arrlist = { filename: oFiles[i].name, type: oFiles[i].type };
          var comefile = oFiles[i];
          // console.log(arrlist);
          arrcont.push(arrlist);
          // console.log(arrcont, comefile);
        }
      }
      switch (this.activeName) {
        case "first":
          if (this.firstoffer.length == 0) {
            this.firstoffer = Object.values(oFiles);
          } else {
            this.firstoffer.push(comefile);
          }

          if (this.ygplczobj.drobj.newuptlode.length == 0) {
            this.ygplczobj.drobj.newuptlode = arrcont;
          } else {
            this.ygplczobj.drobj.newuptlode.push(arrlist);
          }
          break;
        case "second":
          // this.secodeoffer.push(Object.values(oFiles));
          if (this.secodeoffer.length == 0) {
            this.secodeoffer = Object.values(oFiles);
          } else {
            this.secodeoffer.push(comefile);
          }
          // console.log(this.secodeoffer);
          if (this.ygplczobj.xgobj.newuptlode.length == 0) {
            this.ygplczobj.xgobj.newuptlode = arrcont;
          } else {
            this.ygplczobj.xgobj.newuptlode.push(arrlist);
          }
          break;
        case "three":
          if (this.threeoffer.length == 0) {
            this.threeoffer = Object.values(oFiles);
          } else {
            this.threeoffer.push(comefile);
          }

          if (this.ygplczobj.scobj.newuptlode.length == 0) {
            this.ygplczobj.scobj.newuptlode = arrcont;
          } else {
            this.ygplczobj.scobj.newuptlode.push(arrlist);
          }

          break;
        case "four":
          if (this.fouroffer.length == 0) {
            this.fouroffer = Object.values(oFiles);
          } else {
            this.fouroffer.push(comefile);
          }

          if (this.ygplczobj.fpobj.newuptlode.length == 0) {
            this.ygplczobj.fpobj.newuptlode = arrcont;
          } else {
            this.ygplczobj.fpobj.newuptlode.push(arrlist);
          }
          break;
        case "five":
          if (this.fiveoffer.length == 0) {
            this.fiveoffer = Object.values(oFiles);
          } else {
            this.fiveoffer.push(comefile);
          }

          if (this.ygplczobj.qtobj.newuptlode.length == 0) {
            this.ygplczobj.qtobj.newuptlode = arrcont;
          } else {
            this.ygplczobj.qtobj.newuptlode.push(arrlist);
          }
          break;

        default:
          break;
      }
    },
    //删除文件
    delfile(index, item) {
      var that = this;
      var contid = item.id;
      // console.log(item.id);
      if (item.id) {
        var body = {
          id: contid,
          wid: this.polar,
        };
        this.$network5
          .get("/workspace/deleteExcel", body)
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              switch (this.activeName) {
                case "first":
                  that.ygplczobj.drobj.newuptlode.splice(index, 1);
                  that.showmo = -1;
                  that.getmessage();
                  break;
                case "second":
                  that.ygplczobj.xgobj.newuptlode.splice(index, 1);
                  that.showmoa = -1;
                  that.getmessage();
                  break;
                case "three":
                  that.ygplczobj.scobj.newuptlode.splice(index, 1);
                  that.showmot = -1;
                  that.getmessage();
                  break;
                case "four":
                  that.ygplczobj.fpobj.newuptlode.splice(index, 1);
                  that.showmof = -1;
                  that.getmessage();
                  break;
                case "five":
                  that.ygplczobj.qtobj.newuptlode.splice(index, 1);
                  that.showmov = -1;
                  that.getmessage();
                  break;

                default:
                  break;
              }
            } else {
              this.$message.error(err.msg);
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.msg);
          });
      } else {
        switch (this.activeName) {
          case "first":
            that.firstoffer.splice(index, 1);
            that.ygplczobj.drobj.newuptlode.splice(index, 1);
            break;
          case "second":
            that.secodeoffer.splice(index, 1);
            that.ygplczobj.xgobj.newuptlode.splice(index, 1);
            // console.log(that.secodeoffer);
            break;
          case "three":
            that.threeoffer.splice(index, 1);
            that.ygplczobj.scobj.newuptlode.splice(index, 1);
            break;
          case "four":
            that.fouroffer.splice(index, 1);
            that.ygplczobj.fpobj.newuptlode.splice(index, 1);
            break;
          case "five":
            that.fiveoffer.splice(index, 1);
            that.ygplczobj.qtobj.newuptlode.splice(index, 1);
            break;

          default:
            break;
        }
      }
    },

    // 搜索
    search() {
      // console.log(this.seekList);
      this.tableselectenterMeal.pageindex = 1;
      this.tableselectenterMeal.pagesize = 10;
      var body = {
        wid: this.polar,
        page: this.tableselectenterMeal.pageindex,
        size: this.tableselectenterMeal.pagesize,
        YWYXM: this.seekList.yewuman,
        md: this.seekList.yingxiao,
        sd: this.seekList.shopman,
      };
      this.$network5
        .post("/workspace/findOrders", body)
        .then((res) => {
          this.tableData = res.data.orders;
          this.overview = res.data.overview;
          this.tableselectenterMeal.total = res.data.overview.count;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 暂不导入
    nonefile() {
      var that = this;
      this.$confirm("取消导入后数据已导入数据将不保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.showmodelr = false;
          this.$message({
            type: "success",
            message: "取消成功!",
          });
          setTimeout(function () {
            that.ygplczobj.drobj.newuptlode = [];
            that.ygplczobj.xgobj.newuptlode = [];
            that.ygplczobj.scobj.newuptlode = [];
            that.ygplczobj.fpobj.newuptlode = [];
            that.ygplczobj.qtobj.newuptlode = [];
            that.firstoffer = [];
            that.secodeoffer = [];
            that.threeoffer = [];
            that.fouroffer = [];
            that.fiveoffer = [];
            that.getoffer();
          }, 300);
        })
        .catch(() => {
          console.log(2222);
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 上传文件
    getoffer() {
      var that = this;
      var body = {
        wid: this.polar,
      };
      this.$network5
        .get("/workspace/excelList", body)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            that.ygplczobj.drobj.newuptlode = res.data.orders
              ? res.data.orders
              : [];
            that.ygplczobj.xgobj.newuptlode = res.data.medTests
              ? res.data.medTests
              : [];
            that.ygplczobj.scobj.newuptlode = res.data.returns
              ? res.data.returns
              : [];
            that.ygplczobj.fpobj.newuptlode = res.data.invoices
              ? res.data.invoices
              : [];
            that.ygplczobj.qtobj.newuptlode = res.data.combos
              ? res.data.combos
              : [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    affirmshipments() {
      var that = this;
    },

    // 点击修改按钮弹窗
    immediatelyMail(val) {
      this.isshipments = true;
      this.selectmessage = val;
    },

    // 空置点击按钮
    remarks(val) {
      this.isremark = true;
      this.selectmessage = val;
    },

    // 导入控制按钮
    handleClose() {
      var that = this;
      this.$confirm("取消导入后数据已导入数据将不保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.showmodelr = false;
          this.$message({
            type: "success",
            message: "取消成功!",
          });
          setTimeout(function () {
            that.ygplczobj.drobj.newuptlode = [];
            that.ygplczobj.xgobj.newuptlode = [];
            that.ygplczobj.scobj.newuptlode = [];
            that.ygplczobj.fpobj.newuptlode = [];
            that.ygplczobj.qtobj.newuptlode = [];
            that.firstoffer = [];
            that.secodeoffer = [];
            that.threeoffer = [];
            that.fouroffer = [];
            that.fiveoffer = [];
            that.getoffer();
          }, 300);
        })
        .catch(() => {
          console.log(2222);
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },

    // 下载模板
    DownloadTemplatgo() {
      switch (this.activeName) {
        case "first":
          window.open(
            "https://whiot.ihaozhuo.com/mnCMCalc/static/templates/orders.xlsx"
          );
          break;
        case "second":
          window.open(
            "https://whiot.ihaozhuo.com/mnCMCalc/static/templates/medTests.xlsx"
          );
          break;
        case "three":
          window.open(
            "https://whiot.ihaozhuo.com/mnCMCalc/static/templates/returns.xlsx"
          );
          break;
        case "four":
          window.open(
            "https://whiot.ihaozhuo.com/mnCMCalc/static/templates/invoices.xlsx"
          );
          break;
        case "five":
          window.open(
            "https://whiot.ihaozhuo.com/mnCMCalc/static/templates/invoices.xlsx"
          );
          break;

        default:
          break;
      }
    },

    // 上传文件
    tgplzcinput() {
      this.$refs.ygplczinput.value = "";
      document.getElementById("ygplczinputid").click();
    },
    // 数据导出
    gotodcsz() {
      window.open(
        "https://whiot.ihaozhuo.com/mnCMCalc/workspace/exportOrders?wid=" +
          this.polar
      );
    },
    // 完成导入
    gotoactiveo() {
      var that = this;
      if (
        that.firstoffer.length != 0 ||
        that.secodeoffer.length != 0 ||
        that.threeoffer.length != 0 ||
        that.fouroffer.length != 0 ||
        that.fiveoffer.length != 0
      ) {
        var orderz = new FormData();
        orderz.append("wid", that.polar);
        for (let i = 0; i < that.firstoffer.length; i++) {
          orderz.append("orders", that.firstoffer[i]);
        }

        for (let i = 0; i < that.secodeoffer.length; i++) {
          orderz.append("medTests", that.secodeoffer[i]);
        }

        for (let i = 0; i < that.threeoffer.length; i++) {
          orderz.append("returns", that.threeoffer[i]);
        }
        for (let i = 0; i < that.fouroffer.length; i++) {
          orderz.append("invoices", that.fouroffer[i]);
        }
        for (let i = 0; i < that.fiveoffer.length; i++) {
          orderz.append("combos", that.fiveoffer[i]);
        }
        var body = {};
        // console.log(orderz);
        this.$network5
          .post("/workspace/uploadExcel", orderz)
          .then((res) => {
            // console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "上传成功",
                type: "success",
              });
              that.getmessage();
              this.getoffer();
              that.showmodelr = false;
              (that.firstoffer = []),
                (that.secodeoffer = []),
                (that.threeoffer = []),
                (that.fouroffer = []),
                (that.fiveoffer = []);
            } else {
              this.$message.error(res.msg);
              (that.firstoffer = []),
                (that.secodeoffer = []),
                (that.threeoffer = []),
                (that.fouroffer = []),
                (that.fiveoffer = []);
              this.getoffer();
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.msg);
          });
      } else {
        that.showmodelr = false;
        // this.$message.error("请选择文件上传");
      }
    },

    nogonewname() {
      var that = this;
      // that.showmodelr = false;
      // that.firstoffer = [];
      // that.secodeoffer = [];
      // that.threeoffer = [];
      // that.fouroffer = [];
      // that.fiveoffer = [];
    },
    goback() {
      //返回
      this.$router.go(-1);
    },
    getmessage() {
      var body = {
        wid: this.polar,
        page: this.tableselectenterMeal.pageindex,
        size: this.tableselectenterMeal.pagesize,
        YWYXM: "",
        md: "",
        sd: "",
      };
      this.$network5
        .post("/workspace/findOrders", body)
        .then((res) => {
          console.log(res);
          this.tableData = res.data.orders;
          this.overview = res.data.overview;
          this.tableselectenterMeal.total = res.data.overview.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;
      this.getmessage();
      console.log(`每页 ${val} 条`, this.tableselectenterMeal.pagesize);
    },
    handleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      this.getmessage();
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.box-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .carbtn {
    position: absolute;
    bottom: 10px;
    right: 0%;
  }
}
.ygplcz {
  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }
}
.stafflist_UploadForm {
  margin: 0 30px;
  font-size: 15px;
}
.stafflist_ReviewDialog {
  .el-dialog__body {
    padding: 10px;
  }
}
.lineReview {
  height: 50px;
  border-bottom: 1px solid #dddddd;
  box-sizing: border-box;
}
.classA {
  color: red;
}
.classB {
  color: #5270c7;
}

.classD {
  color: red;
  text-align: center;
}
.classD:hover {
  content: attr(title);
  cursor: pointer;
}

.classC {
}
.overtit {
  margin-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 210px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.overtit:hover {
  // cursor: pointer;
  color: #409eff;
  border: 1px solid #409eff;
}

.resAnd {
  max-height: 120px;
  overflow-y: auto;
}
</style>




