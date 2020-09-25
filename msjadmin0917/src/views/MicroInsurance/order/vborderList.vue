<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire" style="margin-bottom: 0px;">
        <el-row>
          <!-- <el-col :span="6">
            <div class="grid_lable">所属分公司：</div>
            <div class="grid_content">
              <el-select filterable clearable v-model="confirmseekorder.filialeValue" placeholder="请选择" size="medium" style="width:100%;" :disabled="seekorder.FilialeList.length==0">
                <el-option v-for="item in seekorder.FilialeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col> -->
          <el-col :span="6">
            <div class="grid_lable">主订单编号：</div>
            <div class="grid_content">
              <el-form :model="confirmseekorder" :rules="confirmseekorderrules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="orNumber">
                  <el-input placeholder="输入订单号后六位数" v-model="confirmseekorder.orNumber" clearable size="medium" style="width:100%;" maxlength="6"></el-input>
                </el-form-item>
              </el-form>
              <!-- <el-input placeholder="输入订单号后六位数" v-model="confirmseekorder.orNumber" clearable size="medium" style="width:100%;"></el-input> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品类型：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.type" placeholder="请选择" size="medium" style="width:100%;" @change="goodstypechange()">
                <el-option v-for="item in seekorder.goodslist" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品ID：</div>
            <div class="grid_content">
              <el-input :disabled="confirmseekorder.type==''" :placeholder="confirmseekorder.type==''? '商品类型为全部时不可选':'请输入内容'" v-model="confirmseekorder.goodsid" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品名称：</div>
            <div class="grid_content">
              <el-input :disabled="confirmseekorder.type==''" :placeholder="confirmseekorder.type==''? '商品类型为全部时不可选':'请输入内容'" v-model="confirmseekorder.goodsName" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">订单状态：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.goodsStatus" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in seekorder.goodsStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>

            <el-col :span="6">
            <div class="grid_lable">时间类型：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.timeType" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in seekorder.timetypelist" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
            <el-col :span="6">
            <div class="grid_lable">时间范围：</div>
            <div class="grid_content">
              <el-date-picker v-model="yearSelect" size="medium" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="timechange">
              </el-date-picker>
            </div>
          </el-col>
       
        
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <!-- <el-col :span="6">
            <div class="grid_lable">销售：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" :disabled="RoleInfo.AccountType=='2'" v-model="confirmseekorder.sellerPhone" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">购买渠道：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.buyChannel" style="width:100%" clearable placeholder="请选择" size="medium">
                <el-option label="全部" value=""></el-option>
                <el-option label="企业内部优惠" value="企业内部优惠"></el-option>
                <el-option label="企业HR分享" value="企业HR分享"></el-option>
                <el-option label="小企业购买" value="小企业购买"></el-option>
                <el-option label="销售店铺" value="销售店铺"></el-option>
                <el-option label="散户列表" value="散户列表"></el-option>
                <el-option label="家属福利金" value="家属福利金"></el-option>
              </el-select>
            </div>
          </el-col> -->
         

             <el-col :span="6">
            <div class="grid_lable">买家：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="confirmseekorder.userPhone" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
      
        </el-row>
      </div>
   
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium" @click="gotoorderexportrecord()" >导出记录</el-button>
        <el-button class="grid_button" type="primary" size="medium" @click="exportordermsg()" >导出</el-button>
        <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search"  @click="queryOrderList()">搜索</el-button>
        <el-button class="grid_button" type="primary" size="medium" @click="openSmSedit()" v-if="$store.getters.getRoleInfo.AccountType==2">短信发送设置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="orderlist" style="width: 100%">
        <el-table-column prop="goodsName" label="商品" min-width="200" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="buyChannel" label="购买渠道" min-width="120"></el-table-column> -->
        <el-table-column prop="goodsType" label="商品类型" min-width="100"></el-table-column>
        <!-- <el-table-column prop="sortCompany" label="所属分公司" min-width="150" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="payTime" label="支付时间" min-width="160"></el-table-column>
        <el-table-column prop="goodsPay" label="支付金额（元）" min-width="120"></el-table-column>
        <!-- <el-table-column prop="sellerPhone" label="销售" min-width="150" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="userPhone" label="买家" min-width="120"></el-table-column>
        <el-table-column label="体检状态" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            {{reStatuschange(scope.row.reStatus)}}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="100">
          <template slot-scope="scope">
            {{goodsStatuschange(scope.row.goodsStatus)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="160">
          <template slot-scope="scope">
            <div style="float: left;width: 50%;">
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==9">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="RefundBtn(scope.$index,scope.row)" type="text" size="small">退款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==9">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="CancelrefundBtn(scope.$index,scope.row)" type="text" size="small">取消申请退款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==2||scope.row.goodsStatus==6">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="ApplyrefundBtn(scope.$index,scope.row)" type="text" size="small">发起退款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==4">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="RemitBtn(scope.$index,scope.row)" type="text" size="small">退款打款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==2&&scope.row.goodsType=='电子体检卡'">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="changecardmsg('发送卡密',scope.row)" type="text" size="small">发送卡密</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==7&&scope.row.goodsType=='电子体检卡'">
                  <div class="grid-content bg-purple-dark">
                    <el-button disabled  type="text" size="small">已发送卡密</el-button>
                  </div>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==2">
                  <div class="grid-content bg-purple-dark">
                    <el-button :disabled="!Clickable.initiate" @click="orderconfirm(scope.row)" type="text" size="small">订单完成</el-button>
                  </div>
                </el-col>
              </el-row> -->
            </div>
            <div style="float: left;width: 50%;">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <!-- <el-button :disabled="!Clickable.remarks" v-if="!scope.row.goRemarks||scope.row.goRemarks==''" @click="SpeakerNotebtn(scope.$index,scope.row)" type="text" size="small">备注</el-button> -->
                    <!-- <div v-else class="alinehidden">
                      <el-button :disabled="!Clickable.remarks" @click="SpeakerNotebtn(scope.$index,scope.row)" type="text" size="small">{{scope.row.goRemarks}}</el-button>
                    </div> -->
                    <!-- <el-button v-if="scope.row.goodsStatus==2&&scope.row.goMsgStatus=='未发送'" @click="opensendsms(scope.$index,scope.row)" type="text" size="small">发送短信</el-button>
                    <el-button v-if="scope.row.goodsStatus==2&&scope.row.goMsgStatus!='未发送'" @click="opensendsms(scope.$index,scope.row)" type="text" size="small">已发送短信</el-button> -->
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="Viewordermsg(scope.$index,scope.row)" type="text" size="small">查看详情</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
    <!-- 编辑备注弹窗 -->
    <el-dialog title="备注" :visible.sync="SpeakerNote.isshow" width="25%" style="min-width:1200px">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="40" show-word-limit v-model="SpeakerNote.textarea2">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SpeakerNote.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmNoteBtn()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发起退款弹窗 -->
    <el-dialog title="发起退款" :visible.sync="Applyrefund.isshow" width="30%" style="min-width:1200px">
      <el-row>
        <el-col :span="1" style="min-width:80px;text-align:center">
          <div>退款原因：</div>
        </el-col>
        <el-col :span="18">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="20" show-word-limit v-model="Applyrefund.refundmsg">
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Applyrefund.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmApply()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退款弹窗 -->
    <el-dialog title="退款处理" :visible.sync="Refund.isshow" width="30%" style="min-width:1200px">
      <div>
        <el-row style="line-height:40px">
          <el-col :span="1" style="min-width:100px;text-align:center">退款原因：</el-col>
          <el-col :span="16">{{selectorder.goRefundReason}}</el-col>
        </el-row>
        <el-row style="line-height:40px;margin-top:10px;">
          <el-col :span="1" style="min-width:100px;text-align:center">支付金额：</el-col>
          <el-col :span="16">{{selectorder.goodsPay}}</el-col>
        </el-row>
        <!-- <el-row style="line-height:40px;margin-top:10px;">
          <el-col :span="1" style="min-width:100px;text-align:center">到检状态：</el-col>
          <el-col :span="16">未到检</el-col>
        </el-row> -->
        <el-row style="line-height:40px;margin-top:10px;">
          <el-col :span="1" style="min-width:100px;text-align:center">退款结果：</el-col>
          <el-col :span="16">
            <el-select size="small" v-model="Refund.RefundResult" placeholder="请选择" clearable style="width:80%">
              <el-option v-for="item in Refund.RefundResultList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="line-height:40px;margin-top:10px;" v-if="Refund.RefundResult===1">
          <el-col :span="1" style="min-width:100px;text-align:center">退款金额：</el-col>
          <el-col :span="16">
            <el-input placeholder="退款金额" size="small" clearable v-model="Refund.RefundMoney" @input="RefundMoneyinput()" style="width:80%"></el-input>
          </el-col>

        </el-row>
        <el-row style="line-height:30px;margin-left:15px;marfin-top:20px;color:#2A86FF" v-if="Refund.RefundResult===1">
          <div>
            说明：
          </div>
          <div>
            1、套餐或者加项退款时，本次购买的加项或者套餐会一起退款
          </div>

        </el-row>
        <el-row style="line-height:40px;margin-top:10px;" v-if="Refund.RefundResult===2">
          <el-col :span="1" style="min-width:100px;text-align:center">拒绝理由：</el-col>
          <el-col :span="16">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" maxlength="100" show-word-limit v-model="Refund.RefuseMsg" style="width:80%;line-height:10px"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Refund.isshow = false">取 消</el-button>
        <el-button type="primary" @click="Resultsrefund()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退款打款 -->
    <el-dialog title="打款处理" :visible.sync="Remit.isshow" width="800px">
      <!-- <el-row style="background: rgba(0,0,0,.04);line-height:50px;padding:0 20px">
        <el-col :span="6">订单号</el-col>
        <el-col :span="5">支付金额</el-col>
        <el-col :span="5">退款金额</el-col>
        <el-col :span="8">校正退款金额</el-col>
      </el-row>
      <el-row style="line-height:100px;padding:0 20px">
        <el-col :span="6">{{selectorder.orNumber}}</el-col>
        <el-col :span="5">{{selectorder.goodsPay}}</el-col>
        <el-col :span="5">{{selectorder.goCoRefundMoney}}</el-col>
        <el-col :span="8">
          <el-input placeholder="不输入则直接默认系统退款金额" size="small" clearable v-model="Remit.RefundMoney"></el-input>
        </el-col>
      </el-row> -->
      <el-table :data="selectorderlist" style="width: 100%">
        <el-table-column prop="orNumber" label="订单号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsPay" label="支付金额"></el-table-column>
        <el-table-column prop="goCoRefundMoney" label="退款金额"></el-table-column>
        <el-table-column label="校正退款金额">
          <template slot-scope="scope">
            <el-input placeholder="不输入则直接默认系统退款金额" size="small" clearable v-model="scope.row.RefundMoney" @input="changerefund(scope.$index)"></el-input>

          </template>
        </el-table-column>

      </el-table>
      <div style="padding:30px 20px;color:#2A86FF">
        <div>
          说明：
        </div>
        <div>
          1、确定打款，会将退款金额直接退回到原支付账号，请仔细审核后操作
        </div>
        <div>
          2、套餐或者加项退款时，本次购买的加项或者套餐会一起退款
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Remit.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirrefund()">确定打款</el-button>
      </span>
    </el-dialog>
    <!-- 短信设置弹窗 -->
    <div>
      <el-dialog title="短信发送设置" :visible.sync="SMSobj.isshow" width="700px">
        <el-form :model="SMSobj" label-position='right' label-width="200px" size="medium">
          <el-form-item label="是否自动发送短信：">
            <el-radio v-model="SMSobj.ifAutomatic" :label="true">是</el-radio>
            <el-radio v-model="SMSobj.ifAutomatic" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item label="发送时机：">
            {{SMSobj.sendOpportunity}}
          </el-form-item>
          <div style="color:#0466FA;margin:0 30px 10px 200px">
            说明：每个订单仅可发送一条短信，请注意设置短信内容！
          </div>
          <el-form-item label="内容：">
            <el-input placeholder="请填写" style="width:300px" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="SMSobj.content"></el-input>
          </el-form-item>
          <div style="color:#0466FA;margin:0 30px 10px 200px">
            说明：短信内容为默认模板内容，固定不可编辑内容为“您的购买的{商品名称}商品已经支付成功，”后面可以添加40个字以内！
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="SMSobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="updateMsg()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 短信设置弹窗 -->
    <div>
      <el-dialog title="短信发送：" :visible.sync="sendSMSobj.isshow" width="600px">
        <el-form :model="sendSMSobj" label-position='right' label-width="180px" size="medium">
          <el-form-item label="购买商品：">
            {{sendSMSobj.goodsName}}
          </el-form-item>
          <el-form-item label="发送手机号：">
            {{sendSMSobj.userPhone}}
          </el-form-item>
          <el-form-item label="发送状态：">
            {{sendSMSobj.sendStatus}}
          </el-form-item>
          <el-form-item label="内容：">
            <el-input placeholder="请填写" :disabled="sendSMSobj.sendStatus!='未发送'" style="width:300px" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="sendSMSobj.sendMsg" prepend='123'></el-input>
          </el-form-item>
          <div style="color:#0466FA;margin:0 30px 10px 180px" v-if="sendSMSobj.sendStatus!='未发送'">
            说明：已发送1条短信不可再次发送！点击确定返回订单详情页短信不会再次发送！
          </div>
          <div style="color:#0466FA;margin:0 30px 10px 180px" v-if="sendSMSobj.sendStatus=='未发送'">
            说明：短信文本限制在64个字以内！
          </div>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="sendSMSobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmsendsms()" :disabled="sendSMSobj.sendStatus!='未发送'">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    
    <!-- 修改卡号卡密 -->
    <el-dialog :title="changepassword.title" :visible.sync="changepassword.isshow" width="450px">
      <div>
        <el-form  :model="changepassword" label-position='right' label-width="120px" size="medium">
          <el-form-item label="体检卡号：">
            <el-input v-model="changepassword.cardnum" placeholder="请输入卡号（必填）" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="changepassword.password" placeholder="请输入密码（必填）" style="width:200px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changepassword.isshow = false">取 消</el-button>
        <el-button type="primary" @click="sendcardmsg()">确 定</el-button>
      </span>
    </el-dialog>

    <a id="adownload" href="" download="" style="display:none">导出</a>
  </div>
</template>

<script>
export default {
  name: "orderlist",
  components: {},
  watch: {
    "SMSobj.content": {
      handler(nvl, ovl) {
        console.log();
        if (this.SMSobj.isshow) {
          setTimeout(() => {
            if (
              String(nvl).substring(0, 24) !=
              "【码上检】您的购买的{商品名称}商品已经支付成功"
            ) {
              this.SMSobj.content = ovl;
              this.$message.error("头部固定内容不可编辑,请勿修改！");
            }
          }, 1);
        }
      },
      // deep: true,
      immediate: true
    },
    "sendSMSobj.sendMsg": {
      handler(nvl, ovl) {
        console.log();
        if (this.sendSMSobj.isshow && this.sendSMSobj.sendStatus == "未发送") {
          if (
            String(nvl).substring(0, 24) !=
            "【码上检】您的购买的{商品名称}商品已经支付成功"
          ) {
            this.sendSMSobj.sendMsg = ovl;
            this.$message.error("头部固定内容不可编辑,请勿修改！");
          }
        }
      },
      // deep: true,
      immediate: true
    }
  },
  data() {
    return {
  
       changepassword: {
        isshow: false,
        title: "",
        cardnum: "",
        password: ""
      },
      joinEnterpriselist: [],
      sendSMSobj: {
        isshow: false,
        goodsName: "",
        userPhone: "",
        sendStatus: "",
        sendMsg: "",
        head: "",
        row: ""
      },
      //搜索栏属性
      seekorder: {
        //订单状态列表
        goodsStatusList: [
          //搜索栏状态列表
          {
            value: "",
            label: "全部"
          },
          {
            value: 1,
            label: "待付款"
          },
          {
            value: 2,
            label: "已付款"
          },
          {
            value: 4,
            label: "同意退款"
          },
          {
            value: 5,
            label: "退款成功"
          },
          {
            value: 6,
            label: "拒绝退款"
          },
          {
            value: 7,
            label: "订单完成"
          },
          {
            value: 8,
            label: "已取消"
          },
          {
            value: 9,
            label: "申请退款"
          }
        ],
        //所属分公司列表
        FilialeList: ["全部", "优健康自营"],
        goodslist: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "体检套餐",
            label: "体检套餐"
          },
          // {
          //   value: "电子体检卡",
          //   label: "电子体检卡"
          // },
          {
            value: "加项包",
            label: "加项包"
          }
          // {
          //   value:'虚拟商品',
          //   label:'虚拟商品'
          // },
        ],
        timetypelist: [
          "下单时间",
          "付款时间",
          "申请退款时间",
          "发起退款时间",
          "退款打款时间"
        ]
      },
      //确认搜索栏属性
      confirmseekorder: {
        filialeValue: "", //所属分公司
        goodsStatus: "", //订单状态
        orNumber: "",
        goodsid: "",
        goodsName: "",
        type: "",
        userPhone: "",
        timeType: "下单时间",
        buyChannel: "",
        // orTime1: "",
        // orTime2: "",
        sellerPhone: "",
        joinEnterprise: ""
      },
      confirmseekorderrules: {
        orNumber: [
          { min: 6, max: 6, message: "请输入订单后六位", trigger: "change" }
        ]
      },
      //备注弹窗属性
      SpeakerNote: {
        isshow: false,
        textarea2: "" //备注文字
      },
      //发起退款弹窗属性
      Applyrefund: {
        isshow: false,
        refundmsg: "" //退款原因
      },
      //退款弹窗属性
      Refund: {
        isshow: false,
        RefundResult: "", //退款结果
        RefundMoney: "", //退款金额
        RefuseMsg: "", //拒绝理由
        RefundResultList: [
          {
            value: 1,
            label: "同意退款"
          },
          {
            value: 2,
            label: "拒绝退款"
          }
        ]
      },
      //
      Remit: {
        isshow: false,
        RefundMoney: "" //校正后的退款金额
      },

      value: "全部",
      input: "",
      currentPage: 1,
      pagesize: 10,
      count: 0,
      yearSelect: [],
      orderlist: [],
      selectorder: "",
      selectorderlist: [],
      SMSobj: {
        isshow: false,
        content: "",
        ifAutomatic: false,
        sellerId: "",
        sendOpportunity: ""
      }
    };
  },
  mounted() {
    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      //运营
      console.log(this.$store.getters.getBranchOffice);
      this.seekorder.FilialeList = this.seekorder.FilialeList.concat(
        this.$store.getters.getBranchOffice
      );
      this.joinEnterpriselist = [
        {
          Name: "全部",
          ID: ""
        }
      ];
      this.$api
        .get("account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                var body = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.joinEnterpriselist.push(body);
              });
            }
          });
        })
        .catch(res => {
          console.log(res);
        });
    } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
      //分公司
      console.log(this.$store.getters.getRoleInfo.AccountName);
      this.seekorder.FilialeList = [];
      this.confirmseekorder.filialeValue = this.$store.getters.getRoleInfo.AccountName;
      this.joinEnterpriselist = [
        {
          Name: "全部",
          ID: ""
        }
      ];
      this.$api
        .get("account/pullOrg2", {
          AccountType: "1",
          AccountName: this.$store.getters.getRoleInfo.AccountName
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                var body = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.joinEnterpriselist.push(body);
              });
            }
          });
        })
        .catch(res => {
          console.log(res);
        });
    } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
      //销售
      this.seekorder.FilialeList = [];
      this.confirmseekorder.filialeValue = this.$store.getters.getRoleInfo.FromCompany;
      this.confirmseekorder.sellerPhone = this.$store.getters.getRoleInfo.Mobile;
      this.joinEnterpriselist = [
        {
          Name: "全部",
          ID: ""
        }
      ];
      this.$api
        .get("account/pullOrg2", {
          AccountType: "2",
          AccountName: this.$store.getters.getRoleInfo.AccountName
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                var body = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.joinEnterpriselist.push(body);
              });
            }
          });
        })
        .catch(res => {
          console.log(res);
        });
    }
    this.OrderListQuery();
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
     changecardmsg(text,row){
      this.changepassword.obj=row;
      this.changepassword.title=text;
      this.changepassword.cardnum='';
      this.changepassword.password='';
      this.changepassword.isshow=true;
    },
    sendcardmsg(){
      if (!this.changepassword.cardnum||this.changepassword.cardnum=='') {
        this.$message.error('请输入卡号！')
        return;
      }
      if (!this.changepassword.password||this.changepassword.password=='') {
        this.$message.error('请输入卡密！')
        return;
      }
      this.$api.post("/order/sendElectronicCheckNumber",{
        orNumber:this.changepassword.obj.orNumber,
        electronicCheckNumber	:this.changepassword.cardnum,
        electronicCheckPassword:this.changepassword.password,
      }).then(res=>{
        this.$message.success(res.msg);
        this.changepassword.isshow=true;
        this.OrderListQuery();
        // this.lookordermsg();
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    changerefund(index) {
      console.log(index);
      this.selectorderlist[index].RefundMoney = this.selectorderlist[
        index
      ].RefundMoney.replace(/[^\.\d]/g, "");
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

        default:
          break;
      }
    },
    //保存数据
    copypagemsg() {
      var body = {
        filialeValue: this.confirmseekorder.filialeValue,
        goodsStatus: this.confirmseekorder.goodsStatus,
        orNumber: this.confirmseekorder.orNumber,
        goodsid: this.confirmseekorder.goodsid,
        goodsName: this.confirmseekorder.goodsName,
        type: this.confirmseekorder.type,
        userPhone: this.confirmseekorder.userPhone,
        timeType: this.confirmseekorder.timeType,
        buyChannel: this.confirmseekorder.buyChannel,
        sellerPhone: this.confirmseekorder.sellerPhone,
        joinEnterprise: this.confirmseekorder.joinEnterprise,
        yearSelect: this.yearSelect,
        currentPage: this.currentPage,
        pagesize: this.pagesize
      };
      this.$store.commit("setorderlistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      if (this.$route.query.orderStatus) {
        this.confirmseekorder.goodsStatus = Number(
          this.$route.query.orderStatus
        );
        return;
      }
      var body = this.$store.getters.getorderlistmsg;
      this.confirmseekorder.filialeValue = body.filialeValue || "";
      this.confirmseekorder.goodsStatus = body.goodsStatus || "";
      this.confirmseekorder.orNumber = body.orNumber || "";
      this.confirmseekorder.goodsid = body.goodsid || "";
      this.confirmseekorder.goodsName = body.goodsName || "";
      this.confirmseekorder.type = body.type || "";
      this.confirmseekorder.userPhone = body.userPhone || "";
      this.confirmseekorder.timeType = body.timeType || "下单时间";
      this.confirmseekorder.buyChannel = body.buyChannel || "";
      this.confirmseekorder.sellerPhone = body.sellerPhone || "";
      this.confirmseekorder.joinEnterprise = body.joinEnterprise || "";
      this.yearSelect = body.yearSelect || [];
      this.currentPage = body.currentPage || 1;
      this.pagesize = body.pagesize || 10;
      console.log(body);
    },
    sendmsgchange(e) {
      console.log(e);
    },
    confirmsendsms() {
      if (!this.sendSMSobj.sendMsg || this.sendSMSobj.sendMsg == "") {
        this.$message.error("请填写短信内容");
        return;
      }
      this.$api
        .post("/order/sendMsg", {
          orNumber: this.sendSMSobj.row.orNumber,
          sonNumber: this.sendSMSobj.row.goSonNumber,
          goMsg: this.sendSMSobj.sendMsg
        })
        .then(res => {
          this.sendSMSobj.isshow = false;
          this.$message.success(res.msg);
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    opensendsms(index, row) {
      console.log(index, row);
      this.sendSMSobj.isshow = true;
      this.sendSMSobj.row = row;
      this.$api
        .post("/order/queryMsg", {
          orNumber: row.orNumber,
          sonNumber: row.goSonNumber
        })
        .then(res => {
          console.log(res);
          this.sendSMSobj.goodsName = res.data.goodsName;
          this.sendSMSobj.head = res.data.head;
          this.sendSMSobj.sendMsg = res.data.sendMsg;
          this.sendSMSobj.sendStatus = res.data.sendStatus;
          this.sendSMSobj.userPhone = res.data.userPhone;
        });
    },
    updateMsg() {
      if (!this.SMSobj.content || this.SMSobj.content == "") {
        this.$message.error("请填写短信内容");
        return;
      }
      this.$api
        .post("/order/updateMsg", {
          ifAutomatic: String(this.SMSobj.ifAutomatic),
          content: this.SMSobj.content
        })
        .then(res => {
          this.SMSobj.isshow = false;
          this.$message.success(res.msg);
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    openSmSedit() {
      this.$api
        .post("/order/queryMsgSetting")
        .then(res => {
          console.log(res);
          this.SMSobj.isshow = true;
          this.SMSobj.content = res.data.content;
          this.SMSobj.ifAutomatic = res.data.ifAutomatic;
          this.SMSobj.sellerId = res.data.sellerId;
          this.SMSobj.sendOpportunity = res.data.sendOpportunity;
        })
        .catch(res => {
          console.log(res);
        });
    },
    timechange(val) {
      console.log(val);
    },
    //RefundMoneyinput 退款金额输入限制
    RefundMoneyinput() {
      this.Refund.RefundMoney = this.Refund.RefundMoney.replace(/[^\.\d]/g, "");
    },
    //搜索按钮
    queryOrderList() {
      this.currentPage = 1;
      this.OrderListQuery();
    },
    //订单导出
    exportordermsg() {
      var body = {
        sortCompany: this.confirmseekorder.filialeValue,
        orNumber: this.confirmseekorder.orNumber,
        goodsid: this.confirmseekorder.goodsid,
        goodsName: this.confirmseekorder.goodsName,
        orderStatus: this.confirmseekorder.goodsStatus,
        type: this.confirmseekorder.type,
        userPhone: this.confirmseekorder.userPhone,
        timeType: this.confirmseekorder.timeType,
        sellerPhone: this.confirmseekorder.sellerPhone,
        each: this.pagesize,
        page: this.currentPage,
        uid: this.$store.getters.getRoleInfo.Id,
        joinEnterprise: this.confirmseekorder.joinEnterprise,
        export: "1"
      };
      if (body.joinEnterprise == "全部") {
        body.joinEnterprise = "";
      }
      if (this.yearSelect) {
        body.orTime1 = this.yearSelect[0];
        body.orTime2 = this.yearSelect[1];
      } else {
        body.orTime1 = "";
        body.orTime2 = "";
      }
      this.$api
        .post("/order/orderSearch", body)
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
          console.log(res);
          this.$message.error("导出失败");
        });
    },
    //是否显示时间类型
    isshowtimetype(type) {
      if (this.confirmseekorder.type == "") {
        if (type == "退款打款时间" || type == "发起退款时间") {
          return true;
        }
      } else {
        return false;
      }
    },

    //商品类型change
    goodstypechange() {
      if (this.confirmseekorder.type == "") {
        this.confirmseekorder.goodsid = "";
        this.confirmseekorder.goodsName = "";
        this.confirmseekorder.timeType = "下单时间";
      }
    },
    //订单查询接口
    OrderListQuery() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          var body = {
            sortCompany: this.confirmseekorder.filialeValue,
            orNumber: this.confirmseekorder.orNumber,
            goodsid: this.confirmseekorder.goodsid,
            goodsName: this.confirmseekorder.goodsName,
            orderStatus: this.confirmseekorder.goodsStatus,
            type: this.confirmseekorder.type,
            userPhone: this.confirmseekorder.userPhone,
            timeType: this.confirmseekorder.timeType,
            sellerPhone: this.confirmseekorder.sellerPhone,
            buyChannel: this.confirmseekorder.buyChannel,
            joinEnterprise: this.confirmseekorder.joinEnterprise,
            each: this.pagesize,
            page: this.currentPage,
            uid: this.$store.getters.getRoleInfo.Id,
            export: "0"
          };
          if (body.joinEnterprise == "全部") {
            body.joinEnterprise = "";
          }
          if (this.yearSelect) {
            body.orTime1 = this.yearSelect[0];
            body.orTime2 = this.yearSelect[1];
          } else {
            body.orTime1 = "";
            body.orTime2 = "";
          }
          this.$api
            .post("/order/orderSearch", body)
            .then(res => {
              console.log(res);
              this.orderlist = res.data.data;
              this.count = res.data.count;
            })
            .catch(res => {
              console.log(res);
              if (res.code == "600") {
                this.orderlist = [];
                this.count = 0;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //订单状态转换
    goodsStatuschange(val) {
      switch (val) {
        case 1:
          return "待付款";
          break;
        case 2:
          return "已付款";
          break;
        case 3:
          return "发起退款";
          break;
        case 4:
          return "同意退款";
          break;
        case 5:
          return "退款成功";
          break;
        case 6:
          return "拒绝退款";
          break;
        case 7:
          return "订单完成";
          break;
        case 8:
          return "已取消";
          break;
        case 9:
          return "申请退款";
          break;

        default:
          break;
      }
    },
    //备注按钮
    SpeakerNotebtn(index, row) {
      console.log(row);
      this.selectorder = row;
      this.SpeakerNote.isshow = true;
      this.SpeakerNote.textarea2 = row.goRemarks;
    },
    //确认备注信息
    confirmNoteBtn() {
      if (this.SpeakerNote.textarea2 == "") {
        this.$message.error("请填写备注信息！");
        return;
      }
      var body = {
        orNumber: this.selectorder.orNumber,
        sonNumber: this.selectorder.goSonNumber,
        remarks: this.SpeakerNote.textarea2
      };
      this.$api
        .post("order/remarks", body)
        .then(res => {
          console.log(res);
          this.SpeakerNote.isshow = false;
          this.$message.success("成功添加备注");
          this.OrderListQuery();
        })
        .catch(res => {
          console.log(res);
          this.$message.success("添加备注失败");
        });
    },
    //查看订单详情按钮
    Viewordermsg(index, row) {
         this.$router.push(
        "/vbordermanage/vbordermsg?orNumber=" +
          row.orNumber +
          "&sonNumber=" +
          row.goSonNumber
      );

    },
    //查看订单导出记录
    gotoorderexportrecord() {
      this.$router.push("/vbordermanage/importexcelorder");
    },
    //取消退款申请按钮
    CancelrefundBtn(index, row) {
      this.$confirm("确认要取消申请退款吗？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/order/operationOrder", {
              orNumber: row.orNumber,
              sonNumber: row.goSonNumber,
              status: "2"
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "确认取消申请退款!"
              });
              this.OrderListQuery();
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消此操作。"
          });
        });
    },
    //发起退款按钮
    ApplyrefundBtn(index, row) {
      this.Applyrefund.refundmsg = "";
      this.selectorder = row;
      console.log(this.selectorder);
      this.Applyrefund.isshow = true;
    },
    //确认发起退款--> 订单状态 申请退款
    confirmApply() {
      if (this.Applyrefund.refundmsg == "") {
        this.$message.error("请填写退款信息");
        return;
      }
      this.$api
        .post("/order/operationOrder", {
          orNumber: this.selectorder.orNumber,
          sonNumber: this.selectorder.goSonNumber,
          status: "9",
          goRefundReason: this.Applyrefund.refundmsg
        })
        .then(res => {
          if (res.code == "200") {
            this.$message({
              type: "success",
              message: "申请退款成功!"
            });
            this.OrderListQuery();
            this.Applyrefund.isshow = false;
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    //退款按钮
    RefundBtn(index, row) {
      this.Refund.RefundResult = "";
      this.Refund.RefundMoney = "";
      this.Refund.RefuseMsg = "";
      this.selectorder = row;
      console.log(row);
      this.Refund.isshow = true;
 console.log(this.selectorder);



    },
    //退款结果
    Resultsrefund() {
      if (this.Refund.RefundResult == "") {
        this.$message.error("请选择退款结果！");
        return;
      } else {
        if (this.Refund.RefundResult == "1") {
          if (this.Refund.RefundMoney == "") {
            this.$message.error("请输入退款金额");
            return;
          }
          let myreg1 = /^[0-9]+(.[0-9]{1})?$/;
          let myreg2 = /^[0-9]+(.[0-9]{2})?$/;
          console.log(this.Refund.RefundMoney);
          if (
            !(
              myreg1.test(this.Refund.RefundMoney) ||
              myreg2.test(this.Refund.RefundMoney)
            )
          ) {
            this.$message.error("请输入正确金额");
            return;
          }
          if (
            Number(this.Refund.RefundMoney) > Number(this.selectorder.goodPrice)
          ) {
            this.$message.error("退款金额不能大于支付金额");
            return;
          }
          this.$api
            .post("/order/operationOrder", {
              orNumber: this.selectorder.orNumber,
              sonNumber: this.selectorder.goSonNumber,
              status: "4",
              goCoRefundMoney: this.Refund.RefundMoney
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "同意退款!"
                });
                if(this.selectorder.reType=="全国单接口预约"&&this.selectorder.serverNumber){
                   this.cancelSubscribe()
                }
                

                this.OrderListQuery();
                this.Refund.isshow = false;
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        }
        if (this.Refund.RefundResult == "2") {
          if (this.Refund.RefuseMsg == "") {
            this.$message.error("请输入拒绝理由");
            return;
          }
          this.$api
            .post("/order/operationOrder", {
              orNumber: this.selectorder.orNumber,
              sonNumber: this.selectorder.goSonNumber,
              status: "6",
              goNoRefundReason: this.Refund.RefuseMsg
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "拒绝退款!"
                });
                this.OrderListQuery();
                this.Refund.isshow = false;
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        }
      }
    },

   cancelSubscribe(row){

        this.$network1
              .post(
                "/appointment/postCancel",
                {
                  serviceNumber:this.selectorder.serverNumber
                },
               ""
              )
              .then(res => {
                console.log(res);
          });

   },
   

    //打款按钮
    RemitBtn(index, row) {
      console.log(row);
      this.selectorderlist = [];
      this.selectorder = row;
      this.$api
        .post("/order/orNumberQueryRefund", {
          orNumber: row.orNumber
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            var obj = item;
            obj.RefundMoney = "";
            this.selectorderlist.push(obj);
            this.OrderListQuery()
          });
          this.Remit.isshow = true;
        });
      this.Remit.RefundMoney = "";
    },
    // confirrefund
    confirrefund() {
      console.log(this.selectorderlist);

      // if (this.Remit.RefundMoney > this.selectorder.goodPrice) {
      //   this.$message.error("退款金额不可大于支付金额");
      //   return;
      // }
      for (let i = 0; i < this.selectorderlist.length; i++) {
        if (
          Number(this.selectorderlist[i].RefundMoney) >
          Number(this.selectorderlist[i].goodsPay)
        ) {
          this.$message.error("退款金额不可大于支付金额");
          return;
        }
      }

      var body = {
        orNumber: this.selectorderlist[0].orNumber,
        rufundOrder: []
      };
      this.selectorderlist.map(item => {
        var obj = {
          sonNumber: item.goSonNumber,
          refundAmount: Number(item.RefundMoney) || Number(item.goodsPay)
        };
        body.rufundOrder.push(obj);
      });

      this.$api
        .post("/weiBaoRefund", body)
        .then(res => {
          console.log(res);
          this.Remit.isshow = false;
          this.$message.success(res.msg);
          this.OrderListQuery();
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //订单完成按钮
    orderconfirm(row) {
      console.log(row);
      this.$confirm("确认订单完成，操作后不可删除。", "服务确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/order/operationOrder", {
              orNumber: row.orNumber,
              sonNumber: row.goSonNumber,
              status: "7"
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "订单已完成!"
                });
                this.OrderListQuery();
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消。"
          });
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.currentPage = 1;
      this.OrderListQuery();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.OrderListQuery();
    }
  },
  computed: {
    // 获取按钮权限信息
    // Clickable() {
    //   var temp = this.$store.getters.getRoles("订单列表");
    //   console.log("vuex中获取按钮权限*****************");
    //   console.log("temp.rolesList", temp.rolesList);
    //   return temp.rolesList;
    // },
    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss">
</style>


<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire" style="margin-bottom: 0px;">
        <el-row>
          <!-- <el-col :span="6">
            <div class="grid_lable">所属分公司：</div>
            <div class="grid_content">
              <el-select filterable clearable v-model="confirmseekorder.filialeValue" placeholder="请选择" size="medium" style="width:100%;" :disabled="seekorder.FilialeList.length==0">
                <el-option v-for="item in seekorder.FilialeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col> -->
          <el-col :span="6">
            <div class="grid_lable">主订单编号：</div>
            <div class="grid_content">
              <el-form :model="confirmseekorder" :rules="confirmseekorderrules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="orNumber">
                  <el-input placeholder="输入订单号后六位数" v-model="confirmseekorder.orNumber" clearable size="medium" style="width:100%;" maxlength="6"></el-input>
                </el-form-item>
              </el-form>
              <!-- <el-input placeholder="输入订单号后六位数" v-model="confirmseekorder.orNumber" clearable size="medium" style="width:100%;"></el-input> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品类型：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.type" placeholder="请选择" size="medium" style="width:100%;" @change="goodstypechange()">
                <el-option v-for="item in seekorder.goodslist" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品ID：</div>
            <div class="grid_content">
              <el-input :disabled="confirmseekorder.type==''" :placeholder="confirmseekorder.type==''? '商品类型为全部时不可选':'请输入内容'" v-model="confirmseekorder.goodsid" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品名称：</div>
            <div class="grid_content">
              <el-input :disabled="confirmseekorder.type==''" :placeholder="confirmseekorder.type==''? '商品类型为全部时不可选':'请输入内容'" v-model="confirmseekorder.goodsName" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">订单状态：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.goodsStatus" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in seekorder.goodsStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>

            <el-col :span="6">
            <div class="grid_lable">时间类型：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.timeType" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in seekorder.timetypelist" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
            <el-col :span="6">
            <div class="grid_lable">时间范围：</div>
            <div class="grid_content">
              <el-date-picker v-model="yearSelect" size="medium" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="timechange">
              </el-date-picker>
            </div>
          </el-col>
       
        
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <!-- <el-col :span="6">
            <div class="grid_lable">销售：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" :disabled="RoleInfo.AccountType=='2'" v-model="confirmseekorder.sellerPhone" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">购买渠道：</div>
            <div class="grid_content">
              <el-select v-model="confirmseekorder.buyChannel" style="width:100%" clearable placeholder="请选择" size="medium">
                <el-option label="全部" value=""></el-option>
                <el-option label="企业内部优惠" value="企业内部优惠"></el-option>
                <el-option label="企业HR分享" value="企业HR分享"></el-option>
                <el-option label="小企业购买" value="小企业购买"></el-option>
                <el-option label="销售店铺" value="销售店铺"></el-option>
                <el-option label="散户列表" value="散户列表"></el-option>
                <el-option label="家属福利金" value="家属福利金"></el-option>
              </el-select>
            </div>
          </el-col> -->
         

             <el-col :span="6">
            <div class="grid_lable">买家：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="confirmseekorder.userPhone" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
      
        </el-row>
      </div>
   
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium" @click="gotoorderexportrecord()" >导出记录</el-button>
        <el-button class="grid_button" type="primary" size="medium" @click="exportordermsg()" >导出</el-button>
        <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search"  @click="queryOrderList()">搜索</el-button>
        <el-button class="grid_button" type="primary" size="medium" @click="openSmSedit()" v-if="$store.getters.getRoleInfo.AccountType==2">短信发送设置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="orderlist" style="width: 100%">
        <el-table-column prop="goodsName" label="商品" min-width="200" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="buyChannel" label="购买渠道" min-width="120"></el-table-column> -->
        <el-table-column prop="goodsType" label="商品类型" min-width="100"></el-table-column>
        <!-- <el-table-column prop="sortCompany" label="所属分公司" min-width="150" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="payTime" label="支付时间" min-width="160"></el-table-column>
        <el-table-column prop="goodsPay" label="支付金额（元）" min-width="120"></el-table-column>
        <!-- <el-table-column prop="sellerPhone" label="销售" min-width="150" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="userPhone" label="买家" min-width="120"></el-table-column>
        <el-table-column label="体检状态" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            {{reStatuschange(scope.row.reStatus)}}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="100">
          <template slot-scope="scope">
            {{goodsStatuschange(scope.row.goodsStatus)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="160">
          <template slot-scope="scope">
            <div style="float: left;width: 50%;">
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==9">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="RefundBtn(scope.$index,scope.row)" type="text" size="small">退款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==9">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="CancelrefundBtn(scope.$index,scope.row)" type="text" size="small">取消申请退款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==2||scope.row.goodsStatus==6">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="ApplyrefundBtn(scope.$index,scope.row)" type="text" size="small">发起退款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==4">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="RemitBtn(scope.$index,scope.row)" type="text" size="small">退款打款</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==2&&scope.row.goodsType=='电子体检卡'">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="changecardmsg('发送卡密',scope.row)" type="text" size="small">发送卡密</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==7&&scope.row.goodsType=='电子体检卡'">
                  <div class="grid-content bg-purple-dark">
                    <el-button disabled  type="text" size="small">已发送卡密</el-button>
                  </div>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="24" v-if="scope.row.goodsStatus==2">
                  <div class="grid-content bg-purple-dark">
                    <el-button :disabled="!Clickable.initiate" @click="orderconfirm(scope.row)" type="text" size="small">订单完成</el-button>
                  </div>
                </el-col>
              </el-row> -->
            </div>
            <div style="float: left;width: 50%;">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <!-- <el-button :disabled="!Clickable.remarks" v-if="!scope.row.goRemarks||scope.row.goRemarks==''" @click="SpeakerNotebtn(scope.$index,scope.row)" type="text" size="small">备注</el-button> -->
                    <!-- <div v-else class="alinehidden">
                      <el-button :disabled="!Clickable.remarks" @click="SpeakerNotebtn(scope.$index,scope.row)" type="text" size="small">{{scope.row.goRemarks}}</el-button>
                    </div> -->
                    <el-button v-if="scope.row.goodsStatus==2&&scope.row.goMsgStatus=='未发送'" @click="opensendsms(scope.$index,scope.row)" type="text" size="small">发送短信</el-button>
                    <el-button v-if="scope.row.goodsStatus==2&&scope.row.goMsgStatus!='未发送'" @click="opensendsms(scope.$index,scope.row)" type="text" size="small">已发送短信</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-button  @click="Viewordermsg(scope.$index,scope.row)" type="text" size="small">查看详情</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
    <!-- 编辑备注弹窗 -->
    <el-dialog title="备注" :visible.sync="SpeakerNote.isshow" width="25%" style="min-width:1200px">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="40" show-word-limit v-model="SpeakerNote.textarea2">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SpeakerNote.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmNoteBtn()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发起退款弹窗 -->
    <el-dialog title="发起退款" :visible.sync="Applyrefund.isshow" width="30%" style="min-width:1200px">
      <el-row>
        <el-col :span="1" style="min-width:80px;text-align:center">
          <div>退款原因：</div>
        </el-col>
        <el-col :span="18">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="20" show-word-limit v-model="Applyrefund.refundmsg">
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Applyrefund.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmApply()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退款弹窗 -->
    <el-dialog title="退款处理" :visible.sync="Refund.isshow" width="30%" style="min-width:1200px">
      <div>
        <el-row style="line-height:40px">
          <el-col :span="1" style="min-width:100px;text-align:center">退款原因：</el-col>
          <el-col :span="16">{{selectorder.goRefundReason}}</el-col>
        </el-row>
        <el-row style="line-height:40px;margin-top:10px;">
          <el-col :span="1" style="min-width:100px;text-align:center">支付金额：</el-col>
          <el-col :span="16">{{selectorder.goodsPay}}</el-col>
        </el-row>
        <!-- <el-row style="line-height:40px;margin-top:10px;">
          <el-col :span="1" style="min-width:100px;text-align:center">到检状态：</el-col>
          <el-col :span="16">未到检</el-col>
        </el-row> -->
        <el-row style="line-height:40px;margin-top:10px;">
          <el-col :span="1" style="min-width:100px;text-align:center">退款结果：</el-col>
          <el-col :span="16">
            <el-select size="small" v-model="Refund.RefundResult" placeholder="请选择" clearable style="width:80%">
              <el-option v-for="item in Refund.RefundResultList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="line-height:40px;margin-top:10px;" v-if="Refund.RefundResult===1">
          <el-col :span="1" style="min-width:100px;text-align:center">退款金额：</el-col>
          <el-col :span="16">
            <el-input placeholder="退款金额" size="small" clearable v-model="Refund.RefundMoney" @input="RefundMoneyinput()" style="width:80%"></el-input>
          </el-col>

        </el-row>
        <el-row style="line-height:30px;margin-left:15px;marfin-top:20px;color:#2A86FF" v-if="Refund.RefundResult===1">
          <div>
            说明：
          </div>
          <div>
            1、套餐或者加项退款时，本次购买的加项或者套餐会一起退款
          </div>

        </el-row>
        <el-row style="line-height:40px;margin-top:10px;" v-if="Refund.RefundResult===2">
          <el-col :span="1" style="min-width:100px;text-align:center">拒绝理由：</el-col>
          <el-col :span="16">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" maxlength="100" show-word-limit v-model="Refund.RefuseMsg" style="width:80%;line-height:10px"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Refund.isshow = false">取 消</el-button>
        <el-button type="primary" @click="Resultsrefund()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退款打款 -->
    <el-dialog title="打款处理" :visible.sync="Remit.isshow" width="800px">
      <!-- <el-row style="background: rgba(0,0,0,.04);line-height:50px;padding:0 20px">
        <el-col :span="6">订单号</el-col>
        <el-col :span="5">支付金额</el-col>
        <el-col :span="5">退款金额</el-col>
        <el-col :span="8">校正退款金额</el-col>
      </el-row>
      <el-row style="line-height:100px;padding:0 20px">
        <el-col :span="6">{{selectorder.orNumber}}</el-col>
        <el-col :span="5">{{selectorder.goodsPay}}</el-col>
        <el-col :span="5">{{selectorder.goCoRefundMoney}}</el-col>
        <el-col :span="8">
          <el-input placeholder="不输入则直接默认系统退款金额" size="small" clearable v-model="Remit.RefundMoney"></el-input>
        </el-col>
      </el-row> -->
      <el-table :data="selectorderlist" style="width: 100%">
        <el-table-column prop="orNumber" label="订单号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsPay" label="支付金额"></el-table-column>
        <el-table-column prop="goCoRefundMoney" label="退款金额"></el-table-column>
        <el-table-column label="校正退款金额">
          <template slot-scope="scope">
            <el-input placeholder="不输入则直接默认系统退款金额" size="small" clearable v-model="scope.row.RefundMoney" @input="changerefund(scope.$index)"></el-input>

          </template>
        </el-table-column>

      </el-table>
      <div style="padding:30px 20px;color:#2A86FF">
        <div>
          说明：
        </div>
        <div>
          1、确定打款，会将退款金额直接退回到原支付账号，请仔细审核后操作
        </div>
        <div>
          2、套餐或者加项退款时，本次购买的加项或者套餐会一起退款
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Remit.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirrefund()">确定打款</el-button>
      </span>
    </el-dialog>
    <!-- 短信设置弹窗 -->
    <div>
      <el-dialog title="短信发送设置" :visible.sync="SMSobj.isshow" width="700px">
        <el-form :model="SMSobj" label-position='right' label-width="200px" size="medium">
          <el-form-item label="是否自动发送短信：">
            <el-radio v-model="SMSobj.ifAutomatic" :label="true">是</el-radio>
            <el-radio v-model="SMSobj.ifAutomatic" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item label="发送时机：">
            {{SMSobj.sendOpportunity}}
          </el-form-item>
          <div style="color:#0466FA;margin:0 30px 10px 200px">
            说明：每个订单仅可发送一条短信，请注意设置短信内容！
          </div>
          <el-form-item label="内容：">
            <el-input placeholder="请填写" style="width:300px" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="SMSobj.content"></el-input>
          </el-form-item>
          <div style="color:#0466FA;margin:0 30px 10px 200px">
            说明：短信内容为默认模板内容，固定不可编辑内容为“您的购买的{商品名称}商品已经支付成功，”后面可以添加40个字以内！
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="SMSobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="updateMsg()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 短信设置弹窗 -->
    <div>
      <el-dialog title="短信发送：" :visible.sync="sendSMSobj.isshow" width="600px">
        <el-form :model="sendSMSobj" label-position='right' label-width="180px" size="medium">
          <el-form-item label="购买商品：">
            {{sendSMSobj.goodsName}}
          </el-form-item>
          <el-form-item label="发送手机号：">
            {{sendSMSobj.userPhone}}
          </el-form-item>
          <el-form-item label="发送状态：">
            {{sendSMSobj.sendStatus}}
          </el-form-item>
          <el-form-item label="内容：">
            <el-input placeholder="请填写" :disabled="sendSMSobj.sendStatus!='未发送'" style="width:300px" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="sendSMSobj.sendMsg" prepend='123'></el-input>
          </el-form-item>
          <div style="color:#0466FA;margin:0 30px 10px 180px" v-if="sendSMSobj.sendStatus!='未发送'">
            说明：已发送1条短信不可再次发送！点击确定返回订单详情页短信不会再次发送！
          </div>
          <div style="color:#0466FA;margin:0 30px 10px 180px" v-if="sendSMSobj.sendStatus=='未发送'">
            说明：短信文本限制在64个字以内！
          </div>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="sendSMSobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmsendsms()" :disabled="sendSMSobj.sendStatus!='未发送'">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    
    <!-- 修改卡号卡密 -->
    <el-dialog :title="changepassword.title" :visible.sync="changepassword.isshow" width="450px">
      <div>
        <el-form  :model="changepassword" label-position='right' label-width="120px" size="medium">
          <el-form-item label="体检卡号：">
            <el-input v-model="changepassword.cardnum" placeholder="请输入卡号（必填）" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="changepassword.password" placeholder="请输入密码（必填）" style="width:200px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changepassword.isshow = false">取 消</el-button>
        <el-button type="primary" @click="sendcardmsg()">确 定</el-button>
      </span>
    </el-dialog>

    <a id="adownload" href="" download="" style="display:none">导出</a>
  </div>
</template>

<script>
export default {
  name: "orderlist",
  components: {},
  watch: {
    "SMSobj.content": {
      handler(nvl, ovl) {
        console.log();
        if (this.SMSobj.isshow) {
          setTimeout(() => {
            if (
              String(nvl).substring(0, 24) !=
              "【码上检】您的购买的{商品名称}商品已经支付成功"
            ) {
              this.SMSobj.content = ovl;
              this.$message.error("头部固定内容不可编辑,请勿修改！");
            }
          }, 1);
        }
      },
      // deep: true,
      immediate: true
    },
    "sendSMSobj.sendMsg": {
      handler(nvl, ovl) {
        console.log();
        if (this.sendSMSobj.isshow && this.sendSMSobj.sendStatus == "未发送") {
          if (
            String(nvl).substring(0, 24) !=
            "【码上检】您的购买的{商品名称}商品已经支付成功"
          ) {
            this.sendSMSobj.sendMsg = ovl;
            this.$message.error("头部固定内容不可编辑,请勿修改！");
          }
        }
      },
      // deep: true,
      immediate: true
    }
  },
  data() {
    return {
  
       changepassword: {
        isshow: false,
        title: "",
        cardnum: "",
        password: ""
      },
      joinEnterpriselist: [],
      sendSMSobj: {
        isshow: false,
        goodsName: "",
        userPhone: "",
        sendStatus: "",
        sendMsg: "",
        head: "",
        row: ""
      },
      //搜索栏属性
      seekorder: {
        //订单状态列表
        goodsStatusList: [
          //搜索栏状态列表
          {
            value: "",
            label: "全部"
          },
          {
            value: 1,
            label: "待付款"
          },
          {
            value: 2,
            label: "已付款"
          },
          {
            value: 4,
            label: "同意退款"
          },
          {
            value: 5,
            label: "退款成功"
          },
          {
            value: 6,
            label: "拒绝退款"
          },
          {
            value: 7,
            label: "订单完成"
          },
          {
            value: 8,
            label: "已取消"
          },
          {
            value: 9,
            label: "申请退款"
          }
        ],
        //所属分公司列表
        FilialeList: ["全部", "优健康自营"],
        goodslist: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "体检套餐",
            label: "体检套餐"
          },
          // {
          //   value: "电子体检卡",
          //   label: "电子体检卡"
          // },
          {
            value: "加项包",
            label: "加项包"
          }
          // {
          //   value:'虚拟商品',
          //   label:'虚拟商品'
          // },
        ],
        timetypelist: [
          "下单时间",
          "付款时间",
          "申请退款时间",
          "发起退款时间",
          "退款打款时间"
        ]
      },
      //确认搜索栏属性
      confirmseekorder: {
        filialeValue: "", //所属分公司
        goodsStatus: "", //订单状态
        orNumber: "",
        goodsid: "",
        goodsName: "",
        type: "",
        userPhone: "",
        timeType: "下单时间",
        buyChannel: "",
        // orTime1: "",
        // orTime2: "",
        sellerPhone: "",
        joinEnterprise: ""
      },
      confirmseekorderrules: {
        orNumber: [
          { min: 6, max: 6, message: "请输入订单后六位", trigger: "change" }
        ]
      },
      //备注弹窗属性
      SpeakerNote: {
        isshow: false,
        textarea2: "" //备注文字
      },
      //发起退款弹窗属性
      Applyrefund: {
        isshow: false,
        refundmsg: "" //退款原因
      },
      //退款弹窗属性
      Refund: {
        isshow: false,
        RefundResult: "", //退款结果
        RefundMoney: "", //退款金额
        RefuseMsg: "", //拒绝理由
        RefundResultList: [
          {
            value: 1,
            label: "同意退款"
          },
          {
            value: 2,
            label: "拒绝退款"
          }
        ]
      },
      //
      Remit: {
        isshow: false,
        RefundMoney: "" //校正后的退款金额
      },

      value: "全部",
      input: "",
      currentPage: 1,
      pagesize: 10,
      count: 0,
      yearSelect: [],
      orderlist: [],
      selectorder: "",
      selectorderlist: [],
      SMSobj: {
        isshow: false,
        content: "",
        ifAutomatic: false,
        sellerId: "",
        sendOpportunity: ""
      }
    };
  },
  mounted() {
    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      //运营
      console.log(this.$store.getters.getBranchOffice);
      this.seekorder.FilialeList = this.seekorder.FilialeList.concat(
        this.$store.getters.getBranchOffice
      );
      this.joinEnterpriselist = [
        {
          Name: "全部",
          ID: ""
        }
      ];
      this.$api
        .get("account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                var body = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.joinEnterpriselist.push(body);
              });
            }
          });
        })
        .catch(res => {
          console.log(res);
        });
    } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
      //分公司
      console.log(this.$store.getters.getRoleInfo.AccountName);
      this.seekorder.FilialeList = [];
      this.confirmseekorder.filialeValue = this.$store.getters.getRoleInfo.AccountName;
      this.joinEnterpriselist = [
        {
          Name: "全部",
          ID: ""
        }
      ];
      this.$api
        .get("account/pullOrg2", {
          AccountType: "1",
          AccountName: this.$store.getters.getRoleInfo.AccountName
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                var body = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.joinEnterpriselist.push(body);
              });
            }
          });
        })
        .catch(res => {
          console.log(res);
        });
    } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
      //销售
      this.seekorder.FilialeList = [];
      this.confirmseekorder.filialeValue = this.$store.getters.getRoleInfo.FromCompany;
      this.confirmseekorder.sellerPhone = this.$store.getters.getRoleInfo.Mobile;
      this.joinEnterpriselist = [
        {
          Name: "全部",
          ID: ""
        }
      ];
      this.$api
        .get("account/pullOrg2", {
          AccountType: "2",
          AccountName: this.$store.getters.getRoleInfo.AccountName
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                var body = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.joinEnterpriselist.push(body);
              });
            }
          });
        })
        .catch(res => {
          console.log(res);
        });
    }
    this.OrderListQuery();
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
     changecardmsg(text,row){
      this.changepassword.obj=row;
      this.changepassword.title=text;
      this.changepassword.cardnum='';
      this.changepassword.password='';
      this.changepassword.isshow=true;
    },
    sendcardmsg(){
      if (!this.changepassword.cardnum||this.changepassword.cardnum=='') {
        this.$message.error('请输入卡号！')
        return;
      }
      if (!this.changepassword.password||this.changepassword.password=='') {
        this.$message.error('请输入卡密！')
        return;
      }
      this.$api.post("/order/sendElectronicCheckNumber",{
        orNumber:this.changepassword.obj.orNumber,
        electronicCheckNumber	:this.changepassword.cardnum,
        electronicCheckPassword:this.changepassword.password,
      }).then(res=>{
        this.$message.success(res.msg);
        this.changepassword.isshow=true;
        this.OrderListQuery();
        // this.lookordermsg();
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    changerefund(index) {
      console.log(index);
      this.selectorderlist[index].RefundMoney = this.selectorderlist[
        index
      ].RefundMoney.replace(/[^\.\d]/g, "");
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

        default:
          break;
      }
    },
    //保存数据
    copypagemsg() {
      var body = {
        filialeValue: this.confirmseekorder.filialeValue,
        goodsStatus: this.confirmseekorder.goodsStatus,
        orNumber: this.confirmseekorder.orNumber,
        goodsid: this.confirmseekorder.goodsid,
        goodsName: this.confirmseekorder.goodsName,
        type: this.confirmseekorder.type,
        userPhone: this.confirmseekorder.userPhone,
        timeType: this.confirmseekorder.timeType,
        buyChannel: this.confirmseekorder.buyChannel,
        sellerPhone: this.confirmseekorder.sellerPhone,
        joinEnterprise: this.confirmseekorder.joinEnterprise,
        yearSelect: this.yearSelect,
        currentPage: this.currentPage,
        pagesize: this.pagesize
      };
      this.$store.commit("setorderlistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      if (this.$route.query.orderStatus) {
        this.confirmseekorder.goodsStatus = Number(
          this.$route.query.orderStatus
        );
        return;
      }
      var body = this.$store.getters.getorderlistmsg;
      this.confirmseekorder.filialeValue = body.filialeValue || "";
      this.confirmseekorder.goodsStatus = body.goodsStatus || "";
      this.confirmseekorder.orNumber = body.orNumber || "";
      this.confirmseekorder.goodsid = body.goodsid || "";
      this.confirmseekorder.goodsName = body.goodsName || "";
      this.confirmseekorder.type = body.type || "";
      this.confirmseekorder.userPhone = body.userPhone || "";
      this.confirmseekorder.timeType = body.timeType || "下单时间";
      this.confirmseekorder.buyChannel = body.buyChannel || "";
      this.confirmseekorder.sellerPhone = body.sellerPhone || "";
      this.confirmseekorder.joinEnterprise = body.joinEnterprise || "";
      this.yearSelect = body.yearSelect || [];
      this.currentPage = body.currentPage || 1;
      this.pagesize = body.pagesize || 10;
      console.log(body);
    },
    sendmsgchange(e) {
      console.log(e);
    },
    confirmsendsms() {
      if (!this.sendSMSobj.sendMsg || this.sendSMSobj.sendMsg == "") {
        this.$message.error("请填写短信内容");
        return;
      }
      this.$api
        .post("/order/sendMsg", {
          orNumber: this.sendSMSobj.row.orNumber,
          sonNumber: this.sendSMSobj.row.goSonNumber,
          goMsg: this.sendSMSobj.sendMsg
        })
        .then(res => {
          this.sendSMSobj.isshow = false;
          this.$message.success(res.msg);
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    opensendsms(index, row) {
      console.log(index, row);
      this.sendSMSobj.isshow = true;
      this.sendSMSobj.row = row;
      this.$api
        .post("/order/queryMsg", {
          orNumber: row.orNumber,
          sonNumber: row.goSonNumber
        })
        .then(res => {
          console.log(res);
          this.sendSMSobj.goodsName = res.data.goodsName;
          this.sendSMSobj.head = res.data.head;
          this.sendSMSobj.sendMsg = res.data.sendMsg;
          this.sendSMSobj.sendStatus = res.data.sendStatus;
          this.sendSMSobj.userPhone = res.data.userPhone;
        });
    },
    updateMsg() {
      if (!this.SMSobj.content || this.SMSobj.content == "") {
        this.$message.error("请填写短信内容");
        return;
      }
      this.$api
        .post("/order/updateMsg", {
          ifAutomatic: String(this.SMSobj.ifAutomatic),
          content: this.SMSobj.content
        })
        .then(res => {
          this.SMSobj.isshow = false;
          this.$message.success(res.msg);
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    openSmSedit() {
      this.$api
        .post("/order/queryMsgSetting")
        .then(res => {
          console.log(res);
          this.SMSobj.isshow = true;
          this.SMSobj.content = res.data.content;
          this.SMSobj.ifAutomatic = res.data.ifAutomatic;
          this.SMSobj.sellerId = res.data.sellerId;
          this.SMSobj.sendOpportunity = res.data.sendOpportunity;
        })
        .catch(res => {
          console.log(res);
        });
    },
    timechange(val) {
      console.log(val);
    },
    //RefundMoneyinput 退款金额输入限制
    RefundMoneyinput() {
      this.Refund.RefundMoney = this.Refund.RefundMoney.replace(/[^\.\d]/g, "");
    },
    //搜索按钮
    queryOrderList() {
      this.currentPage = 1;
      this.OrderListQuery();
    },
    //订单导出
    exportordermsg() {
      var body = {
        sortCompany: this.confirmseekorder.filialeValue,
        orNumber: this.confirmseekorder.orNumber,
        goodsid: this.confirmseekorder.goodsid,
        goodsName: this.confirmseekorder.goodsName,
        orderStatus: this.confirmseekorder.goodsStatus,
        type: this.confirmseekorder.type,
        userPhone: this.confirmseekorder.userPhone,
        timeType: this.confirmseekorder.timeType,
        sellerPhone: this.confirmseekorder.sellerPhone,
        each: this.pagesize,
        page: this.currentPage,
        uid: this.$store.getters.getRoleInfo.Id,
        joinEnterprise: this.confirmseekorder.joinEnterprise,
        export: "1"
      };
      if (body.joinEnterprise == "全部") {
        body.joinEnterprise = "";
      }
      if (this.yearSelect) {
        body.orTime1 = this.yearSelect[0];
        body.orTime2 = this.yearSelect[1];
      } else {
        body.orTime1 = "";
        body.orTime2 = "";
      }
      this.$api
        .post("/order/orderSearch", body)
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
          console.log(res);
          this.$message.error("导出失败");
        });
    },
    //是否显示时间类型
    isshowtimetype(type) {
      if (this.confirmseekorder.type == "") {
        if (type == "退款打款时间" || type == "发起退款时间") {
          return true;
        }
      } else {
        return false;
      }
    },

    //商品类型change
    goodstypechange() {
      if (this.confirmseekorder.type == "") {
        this.confirmseekorder.goodsid = "";
        this.confirmseekorder.goodsName = "";
        this.confirmseekorder.timeType = "下单时间";
      }
    },
    //订单查询接口
    OrderListQuery() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          var body = {
            sortCompany: this.confirmseekorder.filialeValue,
            orNumber: this.confirmseekorder.orNumber,
            goodsid: this.confirmseekorder.goodsid,
            goodsName: this.confirmseekorder.goodsName,
            orderStatus: this.confirmseekorder.goodsStatus,
            type: this.confirmseekorder.type,
            userPhone: this.confirmseekorder.userPhone,
            timeType: this.confirmseekorder.timeType,
            sellerPhone: this.confirmseekorder.sellerPhone,
            buyChannel: this.confirmseekorder.buyChannel,
            joinEnterprise: this.confirmseekorder.joinEnterprise,
            each: this.pagesize,
            page: this.currentPage,
            uid: this.$store.getters.getRoleInfo.Id,
            export: "0"
          };
          if (body.joinEnterprise == "全部") {
            body.joinEnterprise = "";
          }
          if (this.yearSelect) {
            body.orTime1 = this.yearSelect[0];
            body.orTime2 = this.yearSelect[1];
          } else {
            body.orTime1 = "";
            body.orTime2 = "";
          }
          this.$api
            .post("/order/orderSearch", body)
            .then(res => {
              console.log(res);
              this.orderlist = res.data.data;
              this.count = res.data.count;
            })
            .catch(res => {
              console.log(res);
              if (res.code == "600") {
                this.orderlist = [];
                this.count = 0;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //订单状态转换
    goodsStatuschange(val) {
      switch (val) {
        case 1:
          return "待付款";
          break;
        case 2:
          return "已付款";
          break;
        case 3:
          return "发起退款";
          break;
        case 4:
          return "同意退款";
          break;
        case 5:
          return "退款成功";
          break;
        case 6:
          return "拒绝退款";
          break;
        case 7:
          return "订单完成";
          break;
        case 8:
          return "已取消";
          break;
        case 9:
          return "申请退款";
          break;

        default:
          break;
      }
    },
    //备注按钮
    SpeakerNotebtn(index, row) {
      console.log(row);
      this.selectorder = row;
      this.SpeakerNote.isshow = true;
      this.SpeakerNote.textarea2 = row.goRemarks;
    },
    //确认备注信息
    confirmNoteBtn() {
      if (this.SpeakerNote.textarea2 == "") {
        this.$message.error("请填写备注信息！");
        return;
      }
      var body = {
        orNumber: this.selectorder.orNumber,
        sonNumber: this.selectorder.goSonNumber,
        remarks: this.SpeakerNote.textarea2
      };
      this.$api
        .post("order/remarks", body)
        .then(res => {
          console.log(res);
          this.SpeakerNote.isshow = false;
          this.$message.success("成功添加备注");
          this.OrderListQuery();
        })
        .catch(res => {
          console.log(res);
          this.$message.success("添加备注失败");
        });
    },
    //查看订单详情按钮
    Viewordermsg(index, row) {
         this.$router.push(
        "/vbordermanage/vbordermsg?orNumber=" +
          row.orNumber +
          "&sonNumber=" +
          row.goSonNumber
      );

    },
    //查看订单导出记录
    gotoorderexportrecord() {
      this.$router.push("/vbordermanage/importexcelorder");
    },
    //取消退款申请按钮
    CancelrefundBtn(index, row) {
      this.$confirm("确认要取消申请退款吗？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/order/operationOrder", {
              orNumber: row.orNumber,
              sonNumber: row.goSonNumber,
              status: "2"
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "确认取消申请退款!"
              });
              this.OrderListQuery();
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消此操作。"
          });
        });
    },
    //发起退款按钮
    ApplyrefundBtn(index, row) {
      this.Applyrefund.refundmsg = "";
      this.selectorder = row;
      console.log(this.selectorder);
      this.Applyrefund.isshow = true;
    },
    //确认发起退款--> 订单状态 申请退款
    confirmApply() {
      if (this.Applyrefund.refundmsg == "") {
        this.$message.error("请填写退款信息");
        return;
      }
      this.$api
        .post("/order/operationOrder", {
          orNumber: this.selectorder.orNumber,
          sonNumber: this.selectorder.goSonNumber,
          status: "9",
          goRefundReason: this.Applyrefund.refundmsg
        })
        .then(res => {
          if (res.code == "200") {
            this.$message({
              type: "success",
              message: "申请退款成功!"
            });
            this.OrderListQuery();
            this.Applyrefund.isshow = false;
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    //退款按钮
    RefundBtn(index, row) {
      this.Refund.RefundResult = "";
      this.Refund.RefundMoney = "";
      this.Refund.RefuseMsg = "";
      this.selectorder = row;
      console.log(row);
      this.Refund.isshow = true;
 console.log(this.selectorder);



    },
    //退款结果
    Resultsrefund() {
      if (this.Refund.RefundResult == "") {
        this.$message.error("请选择退款结果！");
        return;
      } else {
        if (this.Refund.RefundResult == "1") {
          if (this.Refund.RefundMoney == "") {
            this.$message.error("请输入退款金额");
            return;
          }
          let myreg1 = /^[0-9]+(.[0-9]{1})?$/;
          let myreg2 = /^[0-9]+(.[0-9]{2})?$/;
          console.log(this.Refund.RefundMoney);
          if (
            !(
              myreg1.test(this.Refund.RefundMoney) ||
              myreg2.test(this.Refund.RefundMoney)
            )
          ) {
            this.$message.error("请输入正确金额");
            return;
          }
          if (
            Number(this.Refund.RefundMoney) > Number(this.selectorder.goodPrice)
          ) {
            this.$message.error("退款金额不能大于支付金额");
            return;
          }
          this.$api
            .post("/order/operationOrder", {
              orNumber: this.selectorder.orNumber,
              sonNumber: this.selectorder.goSonNumber,
              status: "4",
              goCoRefundMoney: this.Refund.RefundMoney
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "同意退款!"
                });
                if(this.selectorder.reType=="全国单接口预约"){
                   this.cancelSubscribe()
                }
                

                this.OrderListQuery();
                this.Refund.isshow = false;
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        }
        if (this.Refund.RefundResult == "2") {
          if (this.Refund.RefuseMsg == "") {
            this.$message.error("请输入拒绝理由");
            return;
          }
          this.$api
            .post("/order/operationOrder", {
              orNumber: this.selectorder.orNumber,
              sonNumber: this.selectorder.goSonNumber,
              status: "6",
              goNoRefundReason: this.Refund.RefuseMsg
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "拒绝退款!"
                });
                this.OrderListQuery();
                this.Refund.isshow = false;
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        }
      }
    },

   cancelSubscribe(row){

        this.$network1
              .post(
                "/appointment/postCancel",
                {
                  serviceNumber:this.selectorder.serverNumber
                },
               ""
              )
              .then(res => {
                console.log(res);
          });

   },
   

    //打款按钮
    RemitBtn(index, row) {
      console.log(row);
      this.selectorderlist = [];
      this.selectorder = row;
      this.$api
        .post("/order/orNumberQueryRefund", {
          orNumber: row.orNumber
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            var obj = item;
            obj.RefundMoney = "";
            this.selectorderlist.push(obj);
            this.OrderListQuery()
          });
          this.Remit.isshow = true;
        });
      this.Remit.RefundMoney = "";
    },
    // confirrefund
    confirrefund() {
      console.log(this.selectorderlist);

      // if (this.Remit.RefundMoney > this.selectorder.goodPrice) {
      //   this.$message.error("退款金额不可大于支付金额");
      //   return;
      // }
      for (let i = 0; i < this.selectorderlist.length; i++) {
        if (
          Number(this.selectorderlist[i].RefundMoney) >
          Number(this.selectorderlist[i].goodsPay)
        ) {
          this.$message.error("退款金额不可大于支付金额");
          return;
        }
      }

      var body = {
        orNumber: this.selectorderlist[0].orNumber,
        rufundOrder: []
      };
      this.selectorderlist.map(item => {
        var obj = {
          sonNumber: item.goSonNumber,
          refundAmount: Number(item.RefundMoney) || Number(item.goodsPay)
        };
        body.rufundOrder.push(obj);
      });

      this.$api
        .post("/weiBaoRefund", body)
        .then(res => {
          console.log(res);
          this.Remit.isshow = false;
          this.$message.success(res.msg);
          this.OrderListQuery();
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //订单完成按钮
    orderconfirm(row) {
      console.log(row);
      this.$confirm("确认订单完成，操作后不可删除。", "服务确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/order/operationOrder", {
              orNumber: row.orNumber,
              sonNumber: row.goSonNumber,
              status: "7"
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "订单已完成!"
                });
                this.OrderListQuery();
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消。"
          });
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.currentPage = 1;
      this.OrderListQuery();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.OrderListQuery();
    }
  },
  computed: {
    // 获取按钮权限信息
    // Clickable() {
    //   var temp = this.$store.getters.getRoles("订单列表");
    //   console.log("vuex中获取按钮权限*****************");
    //   console.log("temp.rolesList", temp.rolesList);
    //   return temp.rolesList;
    // },
    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss">
</style>


