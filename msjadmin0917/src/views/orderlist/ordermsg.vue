<template>
  <div class="app-container" style="padding-top:0px;padding-right:100px">
    <div class="ordermsgtitle">
      <i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp订单详情</span>
    </div>

    <div class="ordersteps">
      <el-steps space="13%" :active="timeline.length-1" process-status='finish' finish-status='wait'>
        <el-step v-for="(item,index) in timeline" :key="index" :title="orderStatuschange(item.orderReStatus)" :description="item.editTime"></el-step>
      </el-steps>
    </div>
    <div style="margin:10px 0 10px 25px">
      <el-button style="float:right" type="primary" @click="openeditNote()">备注订单</el-button>
      <div style="line-height:40px">
        基本信息：
      </div>
      <el-table :data="[orderobj]" style="width: 100%" border>
        <el-table-column label="订单编号" min-width="160">
          <template slot-scope="scope">{{scope.row.bindId||scope.row.orNumber}}</template>
        </el-table-column>
        <el-table-column prop="goSonNumber" label="子订单编号" min-width="210"></el-table-column>
        <el-table-column prop="payWaterNumber" label="支付流水号" min-width="250"></el-table-column>
        <el-table-column prop="payStyle" label="付款方式" min-width="100"></el-table-column>
        <el-table-column prop="buyChannel" label="购买渠道" min-width="100"></el-table-column>
      </el-table>
      <el-table :data="[orderobj]" style="width: 100%" border>
        <el-table-column prop="userPhone" label="买家" min-width="160"></el-table-column>
        <el-table-column prop="sellerName" label="所属销售" min-width="210"></el-table-column>
        <el-table-column prop="goodsType" label="商品类型" min-width="150"></el-table-column>
        <el-table-column prop="userName" label="购买人姓名" min-width="100"> </el-table-column>
        <el-table-column prop="goRemarks" label="备注信息" min-width="100"></el-table-column>
        <el-table-column prop="goRefundReason" label="退款理由" min-width="100"></el-table-column>
      </el-table>
    </div>
    <div style="margin:10px 0 10px 25px" v-if="orderobj.goodsType=='体检套餐'">
      <div style="line-height:40px">
        套餐预约人信息：
      </div>
      <el-table :data="orderobj.reservation? [orderobj.reservation[orderobj.reservation.length-1]]:[]" style="width: 100%" border>
        <el-table-column prop="reType" label="预约类型" min-width="80px"></el-table-column>
        <el-table-column prop="reRelation" label="关系" min-width="80px"></el-table-column>
        <el-table-column prop="medicalStatus" label="体检状态" min-width="200px"></el-table-column>
        <el-table-column prop="reMan" label="姓名" min-width="80px"></el-table-column>
        <el-table-column prop="reSex" label="性别" min-width="80px"></el-table-column>
        <el-table-column prop="documentType" label="证件类型" min-width="80px"></el-table-column>
        <el-table-column prop="reIDCard" label="证件号" min-width="180px"></el-table-column>
        <el-table-column prop="reBirthday" label="出生日期" min-width="100px">
          <template slot-scope="scope">
            {{scope.row.reBirthday.substring(0,4)+'-'+scope.row.reBirthday.substring(4,6)+'-'+scope.row.reBirthday.substring(6,8)}}
          </template>
        </el-table-column>
        <el-table-column prop="rePhone" label="手机号" min-width="120px"></el-table-column>
        <el-table-column prop="reCity" label="预约城市" min-width="100px"></el-table-column>
        <el-table-column prop="reHospital" label="预约分院" min-width="130px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="reTime" label="预约时间" min-width="160px"></el-table-column>
      </el-table>
    </div>
    <div style="margin:10px 0 10px 25px" v-if="orderobj.goodsType=='电子体检卡'">
      <el-button style="float:right" type="primary" @click="changecardmsg('发送卡密')" v-if="orderobj.goodsStatus==2">发送卡密</el-button>
      <el-button style="float:right" type="primary" @click="changecardmsg('修改卡密')" v-else-if="orderobj.goodsStatus==7">修改卡密</el-button>
      <div style="line-height:40px">
        卡密信息：
      </div>
      <el-table :data="[orderobj]" style="width: 100%" border>
        <el-table-column prop="electronicCheckNumber" label="卡号" min-width="80px"></el-table-column>
        <el-table-column prop="electronicCheckPassword" label="卡密" min-width="80px"></el-table-column>
        <el-table-column prop="electronicCheckAddress" label="预约地址" min-width="80px"></el-table-column>
      </el-table>
    </div>
    <div style="margin:10px 0 10px 25px" v-if="orderobj.goodsType=='电子体检卡'">
      <!-- 电子体检卡图片 -->
      <div class="dzkimg" v-if="!entityCardImg" @click="selectimg">
        <i class="el-icon-plus"></i>
        <div>上传实体卡照片</div>
      </div>
      <div v-else>
        <el-image style="width:240px" :preview-src-list="[entityCardImg]" :src="entityCardImg">
        </el-image>
        <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click=""></el-button> -->
        <el-button @click="entityCardImg=''" type="danger" icon="el-icon-delete" circle></el-button>
        <el-button @click="uploadEntityCard" type="primary">确认上传</el-button>
      </div>
    </div>

    <div style="margin:10px 0 10px 25px">
      <div style="line-height:40px">
        商品信息：
      </div>
      <el-table :data="[orderobj]" style="width: 100%" border>
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="scope">
            <div>{{scope.row.goodsName}}</div>
            <div>ID:{{scope.row.goodsid}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="odSum" label="数量"></el-table-column>
        <el-table-column prop="goodPrice" label="小计"></el-table-column>
      </el-table>
    </div>
    <div style="margin:10px 0 10px 25px">
      <div style="line-height:40px">
        费用信息：
      </div>
      <el-table :data="[orderobj]" style="width: 100%" border>
        <el-table-column prop="goodPrice" label="商品合计"></el-table-column>
        <el-table-column prop="goodsDeduction" :label="orderobj.deductionName||'员工福利抵扣'"></el-table-column>
        <el-table-column prop="goodsPay" label="实付金额"></el-table-column>
      </el-table>
    </div>
    <div style="margin:10px 0 10px 25px">
      <div style="line-height:40px">
        操作信息：
      </div>
      <el-table :data="orderobj.operatorDto" style="width: 100%" border>
        <el-table-column prop="operator" label="操作者"></el-table-column>
        <el-table-column prop="editTime" label="操作时间"></el-table-column>
        <el-table-column prop="operateDetails" label="操作"></el-table-column>
      </el-table>
    </div>
    <!-- 编辑备注弹窗 -->
    <el-dialog title="备注" :visible.sync="SpeakerNote.isshow" width="500px">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="40" show-word-limit v-model="textarea2">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SpeakerNote.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmNoteBtn()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改卡号卡密 -->
    <el-dialog :title="changepassword.title" :visible.sync="changepassword.isshow" width="450px">
      <div>
        <el-form :model="changepassword" label-position='right' label-width="120px" size="medium">
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

    <!-- <div class="ordermsgbox">
      <div class="ordermsgleft">
        <div style="padding:10px 0">订单信息</div>
        <div class="order_A">订单编号：<div class="order_B">{{orderobj.orNumber}}</div>
        </div>
        <div class="order_A">子订单编号： <div class="order_B">{{orderobj.goSonNumber}}</div>
        </div>
        <div class="order_A">支付流水号： <div class="order_B">{{orderobj.payWaterNumber}}</div>
        </div>
        <div class="order_A">付款方式： <div class="order_B">{{orderobj.payStyle}}</div>
        </div>
        <div class="order_A">买家： <div class="order_B">{{orderobj.userPhone}}</div>
        </div>
        <div class="order_A">销售： <div class="order_B">{{orderobj.sellerPhone}}</div>
        </div>
        <div class="order_A">购买渠道： <div class="order_B">{{orderobj.buyChannel}}</div>

        </div>
      </div>
      <div class="ordermsgright">
        <div style="padding:10px 0;width:50%;float:left">
          <div>订单状态</div>
          <div class="order_state">{{orderStatuschange(orderobj.goodsStatus)}}</div>
          <div style="margin-top: 20px;">退款原因</div>
          <div class="order_state1">{{orderobj.goRefundReason}}</div>
        </div>
        <div style="padding:10px 0;width:50%;float:left">
          <div>备注</div>
          <el-input class="ordrr_noteinput" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" maxlength="40" show-word-limit v-model="textarea2">
          </el-input>
          <el-button style="margin-top:20px" type="primary" @click="confirmNoteBtn()">确 定</el-button>
        </div>
      </div>
    </div>
    <div class="order_goods">
      <el-row style=" padding: 0% 20px;line-height:50px;background: rgba(0,0,0,.04);">
        <el-col :span="5">商品</el-col>
        <el-col :span="4">销售价</el-col>
        <el-col :span="4">{{orderobj.deductionName}}</el-col>
        <el-col :span="4">支付金额</el-col>
        <el-col :span="4">数量</el-col>
        <el-col :span="3">小计（元）</el-col>
      </el-row>
      <el-row style=" padding: 10px 20px;line-height:30px">
        <el-col :span="5">
          <div>{{orderobj.sortCompany}}</div>
          <div>{{orderobj.goodsName}}</div>
          <div>ID：{{orderobj.goodsid}}</div>
        </el-col>
        <el-col :span="4">{{orderobj.goodPrice}}</el-col>
        <el-col :span="4">{{orderobj.goodsDeduction}}</el-col>
        <el-col :span="4">{{orderobj.goodsPay}}</el-col>
        <el-col :span="4">{{orderobj.odSum}}</el-col>
        <el-col :span="3">{{orderobj.goodsPay}}</el-col>
      </el-row>
    </div>
    <div style="margin:20px 0 0 40px">
      操作信息：
    </div>
    <div class="order_goods" style="margin-top:10px">
      <el-row style=" padding: 0% 20px;line-height:50px;background: rgba(0,0,0,.04);">
        <el-col :span="5">操作者</el-col>
        <el-col :span="5">操作时间</el-col>
        <el-col :span="14">操作信息</el-col>
      </el-row>
      <div v-for="item in orderobj.operatorDto">
        <el-row style=" padding: 10px 20px;line-height:30px">
          <el-col :span="5">{{item.operator}}</el-col>
          <el-col :span="5">{{item.editTime}}</el-col>
          <el-col :span="14">{{item.operateDetails}}</el-col>
        </el-row>
      </div>

    </div> -->
    <input style="display:none" type="file" id="imgTest" ref='imgTest' @change="imgChange" accept=".gif, .jpg, .jpeg, .png">

  </div>
</template>

<script>
export default {
  name: "ordermsg",
  components: {},
  watch: {},
  data() {
    return {
      entityCardImg: "",
      changepassword: {
        isshow: false,
        title: "",
        cardnum: "",
        password: "",
      },
      textarea2: "",
      timeline: [],
      orderobj: "",
      SpeakerNote: {
        isshow: false,
      },
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.$api.post("/order/lookOrder", this.$route.query).then((res) => {
      console.log(res);
      this.orderobj = res.data;
      this.entityCardImg = res.data.entityCardImg;
      this.timeline = res.data.reOrderRecordDto;
      console.log(this.timeline);
      this.textarea2 = res.data.goRemarks;
    });
  },
  methods: {
    uploadEntityCard() {
      this.$api
        .post("/order/uploadEntityCard", {
          entityCardImg: this.entityCardImg,
          orNumber: this.orderobj.orNumber,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("上传成功！");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(res.msg);
        });
    },
    imgChange(e) {
      console.log(e);
      var that = this;
      var evn = e;
      console.log(e.target.files);
      var imgobj = {};
      var fileObj = e.target.files[0]; //获取文件对象
      var lastindex = e.target.files[0].name.lastIndexOf(".");
      console.log(e.target.files[0].name.lastIndexOf("."));
      imgobj.imgName = e.target.files[0].name.substring(0, lastindex);
      console.log(e.target.files[0]);
      console.log(imgobj.name);
      let reader = new FileReader(); //新建一个FileReader对象
      reader.readAsDataURL(fileObj); //将读取的文件转换成base64格式
      reader.onload = function (e) {
        console.log(e);
        // console.log(e.target.result); //转换后的文件数据存储在e.target.result中
        imgobj.imgContent = e.target.result;
        console.log(imgobj);
        that.entityCardImg = imgobj.imgContent;
      };
    },
    selectimg() {
      console.log(this.$refs);
      this.$refs.imgTest.value = ""; //清空上一次的数据
      document.getElementById("imgTest").click();
    },
    lookordermsg() {
      this.$api.post("/order/lookOrder", this.$route.query).then((res) => {
        console.log(res);
        this.orderobj = res.data;
        this.entityCardImg = res.data.entityCardImg;
        this.timeline = res.data.reOrderRecordDto;
        console.log(this.timeline);
        this.textarea2 = res.data.goRemarks;
      });
    },
    sendcardmsg() {
      if (!this.changepassword.cardnum || this.changepassword.cardnum == "") {
        this.$message.error("请输入卡号！");
        return;
      }
      if (!this.changepassword.password || this.changepassword.password == "") {
        this.$message.error("请输入卡密！");
        return;
      }
      this.$api
        .post("/order/sendElectronicCheckNumber", {
          orNumber: this.orderobj.orNumber,
          electronicCheckNumber: this.changepassword.cardnum,
          electronicCheckPassword: this.changepassword.password,
        })
        .then((res) => {
          this.$message.success(res.msg);
          this.changepassword.isshow = false;
          this.lookordermsg();
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    changecardmsg(text) {
      this.changepassword.title = text;
      this.changepassword.cardnum = "";
      this.changepassword.password = "";
      this.changepassword.isshow = true;
    },
    openeditNote() {
      this.SpeakerNote.isshow = true;
    },
    //确认备注信息
    confirmNoteBtn() {
      if (this.textarea2 == "") {
        this.$message.error("请填写备注信息！");
        return;
      }
      var body = {
        orNumber: this.orderobj.orNumber,
        sonNumber: this.orderobj.goSonNumber,
        remarks: this.textarea2,
      };
      this.$api
        .post("order/remarks", body)
        .then((res) => {
          console.log(res);
          this.$message.success("成功添加备注");
          this.$api.post("/order/lookOrder", this.$route.query).then((res) => {
            console.log(res);
            this.SpeakerNote.isshow = false;
            this.orderobj = res.data;
            this.entityCardImg = res.data.entityCardImg;

            this.timeline = res.data.reOrderRecordDto;
            console.log(this.timeline);
            this.textarea2 = res.data.goRemarks;
          });
          // this.$router.go(0)
        })
        .catch((res) => {
          console.log(res);
          this.$message.success("添加备注失败");
        });
    },
    goback() {
      var body = {
        orNumber: this.orderobj.orNumber,
        sonNumber: this.orderobj.goSonNumber,
        remarks: this.textarea2,
      };
      this.$api
        .post("order/remarks", body)
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
      window.history.go(-1);
    },
    //订单状态转换
    orderStatuschange(val) {
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
        // case 10:
        //   return "申请退款";
        //   break;
        case 11:
          return "申请预约";
          break;
        case 12:
          return "取消预约";
          break;
        case 13:
          return "已落单";
          break;
        case 14:
          return "已到检";
          break;
        case 15:
          return "已出报告";
          break;
        case 16:
          return "改期";
          break;
        case 17:
          return "取消申请退款";
          break;
        case 18:
          return "等待预约";
          break;

        default:
          break;
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.ordermsgtitle {
  line-height: 50px;
  font-size: 20px;
}
.ordersteps {
  padding: 30px 0 20px 0;
  margin-left: 25px;
}
.order_goods {
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 25px;
}
.ordermsgbox {
  position: relative;
}
.ordermsgleft {
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 20px;
  margin-left: 25px;
  width: 40%;
  height: 300px;
  box-sizing: border-box;
}
.ordermsgright {
  position: absolute;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 10px 20px;
  height: 300px;
  box-sizing: border-box;
  top: 0%;
  right: 0%;
  left: 40%;
  margin-left: 50px;
}
.order_A {
  position: relative;
  line-height: 28px;
}
.order_B {
  position: absolute;
  left: 100px;
  top: 0%;
  // width: 70%;
}
.order_state {
  width: 90%;
  margin-top: 20px;
  height: 50px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  line-height: 50px;
  text-align: center;
}
.order_state1 {
  width: 90%;
  margin-top: 20px;
  height: 100px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 5px 10px;
}
.ordrr_noteinput {
  margin-top: 20px;
}
.dzkimg {
  cursor: pointer;
  width: 140px;
  height: 140px;
  border: 1px solid #cccccc;
  position: relative;
  display: inline-block;
  i {
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -15px;
    margin-top: -15px;
    font-size: 30px;
  }
  div {
    text-align: center;
    margin-top: 100px;
  }
}
</style>


