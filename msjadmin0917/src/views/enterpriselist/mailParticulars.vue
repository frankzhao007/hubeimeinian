<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
    <div style="font-size: 20px; ">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>

    <div style="overflow:hidden;margin-top:20px">
      <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">所属企业：</div>
      <div
        style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
      >{{dataList.joinEnterprise}}</div>
    </div>
    <div style="overflow:hidden;margin-top:10px;">
      <div
        style="width:120px;float:left;text-align: right;line-height:40px;font-size: 14px;font-size: 16px;"
      >订单编号：</div>
      <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px">
        <span style="color: #999999;">{{dataList.orNumber}}</span>
        <el-button type="primary" style="margin-left:10px;" @click="gotodatas">查看订单详情</el-button>
      </div>
    </div>
    <div style="overflow:hidden;margin-top:10px;">
      <div
        style="width:120px;float:left;text-align: right;line-height:40px;font-size: 14px;font-size: 16px;"
      >收件人信息：</div>
      <div
        style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:28px;margin-top:6px"
      >
        <div style="color: #999999;">
          <span style="color: #999999;">收件人：</span>
          <span style="color: #999999;">{{dataList.recipientName}}</span>
        </div>
        <div style="color: #999999;">
          <span style="color: #999999;">联系电话：</span>
          <span style="color: #999999;">{{dataList.recipientPhone}}</span>
        </div>
        <div style="color: #999999;">
          <span style="color: #999999;">收货地址：</span>
          <span style="color: #999999;">{{dataList.recipientAddress}}</span>
        </div>
      </div>
    </div>
    <div style="overflow:hidden;margin-top:10px;">
      <div
        style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;"
      >报告邮寄状态：</div>
      <div
        v-if="dataList.status==1"
        style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
      >待邮寄</div>
      <div
        v-if="dataList.status==2"
        style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
      >已邮寄</div>
    </div>
    <div style="overflow:hidden;margin-top:10px;">
      <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">备注：</div>
      <div
        style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
      >
        <el-input
          v-model.trim="remarks"
          @blur="getremarksz"
          placeholder="请输入备注，最多20个字"
          maxlength="20"
          style="width: calc(30% - 10px);"
        ></el-input>
      </div>
    </div>
    <div style="overflow:hidden;margin-top:10px;" v-if="dataList.expressDelivery!=''">
      <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">快递详情：</div>
      <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px">
        <span style="color: #999999;">{{dataList.expressDelivery}}</span>
        <el-button type="primary" style="margin-left:10px;" @click="isshipments=true">更改快递</el-button>
      </div>
      <div
        style="float:left;margin-left:130px;width:calc(100% - 130px);line-height:40px;overflow: hidden;"
      >
        <span style="color: #999999;">运单号：</span>
        <span style="color: #999999;">{{dataList.expressNumber}}</span>
      </div>
    </div>
    <div style="margin-left:130px">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.ftime"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </div>

    <el-dialog title="填写发货信息" :visible.sync="isshipments" width="500px">
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">收件人：</div>
        <div
          style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
        >{{dataList.recipientName}}</div>
      </div>
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">手机号：</div>
        <div
          style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
        >{{dataList.recipientPhone}}</div>
      </div>
      <div style="overflow:hidden;">
        <div
          style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;"
        >收货地址：</div>
        <div
          style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
        >{{dataList.recipientAddress}}</div>
      </div>

      <div style="overflow:hidden;">
        <div
          style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;"
        >原物流公司：</div>
        <div
          style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
        >{{dataList.expressDelivery}}</div>
      </div>
      <div style="overflow:hidden;">
        <div
          style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;"
        >原物流单号：</div>
        <div
          style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;"
        >{{dataList.expressNumber}}</div>
      </div>
      <div style="overflow:hidden;">
        <div
          style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;"
        >新物流公司：</div>
        <el-select v-model="logisticsname" placeholder style="width:240px">
          <el-option label="顺丰快递" value="顺丰"></el-option>
          <el-option label="圆通快递" value="圆通"></el-option>
          <el-option label="中通快递" value="中通"></el-option>
          <el-option label="邮政" value="邮政包裹"></el-option>
          <el-option label="EMS" value="EMS"></el-option>
          <el-option label="申通快递" value="申通"></el-option>
          <el-option label="汇通快递" value="汇通"></el-option>
          <el-option label="韵达快递" value="韵达"></el-option>
          <el-option label="宅急送" value="宅急送"></el-option>
          <el-option label="天天快递" value="天天"></el-option>
          <el-option label="德邦" value="德邦"></el-option>
          <el-option label="国通快递" value="国通"></el-option>
          <el-option label="增益快递" value="增益"></el-option>
          <el-option label="速尔快递" value="速尔"></el-option>
          <el-option label="中铁物流" value="中铁物流"></el-option>
          <el-option label="中铁快运" value="中铁快运"></el-option>
          <el-option label="能达快递" value="能达"></el-option>
          <el-option label="优速快递" value="优速"></el-option>
          <el-option label="全峰快递" value="全峰"></el-option>
          <el-option label="京东快递" value="京东"></el-option>
        </el-select>
      </div>
      <div style="overflow:hidden;margin-top:10px">
        <div
          style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;"
        >新物流单号：</div>
        <el-input v-model="odd" placeholder="请输入物流单号" style="width:240px" clearable></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isshipments = false">取 消</el-button>
        <el-button type="primary" @click="affirmshipments">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      orNumber: "",
      dataList: "",
      isshipments: false,
      logisticsname: "顺丰快递",
      odd: "",
      activities: [],
      remarks: "",
      goSonNumber: ""
    };
  },
  components: {},
  mounted() {
    this.orNumber = this.$route.query.orNumber;
    this.getmessage(this.$route.query.orNumber);
  },
  methods: {
    getmessage(val) {
      var body = {
        orNumber: val
      };
      this.$api
        .post("/orderExpressDelivery/queryExpressDelivery", body)
        .then(res => {
          this.dataList = res.data;
          this.remarks = res.data.remarks;
          this.goSonNumber = res.data.goSonNumber;
          if(this.dataList.expressDelivery!=''){
          this.getlogistics();
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotodatas() {
      this.$router.push(
        "/ordermanagement/ordermsg?orNumber=" +
          this.orNumber +
          "&sonNumber=" +
          this.goSonNumber
      );
    },
    affirmshipments() {
      var that = this;
      console.log(this.logisticsname)
      if (!that.logisticsname) {
        this.$message({
          message: "请选择新快递公司",
          type: "warning"
        });
        return;
      }
      if (!that.odd) {
        this.$message({
          message: "请输入新物流单号",
          type: "warning"
        });
        return;
      }
      console.log(this.logisticsname);
      var body = {
        orNumber: this.orNumber,
        expressDelivery: this.logisticsname,
        expressNumber: this.odd
      };
      this.$api
        .post("/orderExpressDelivery/updateExpressDelivery", body)
        .then(res => {
          console.log(res);
          this.isshipments = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          that.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getremarksz() {
      console.log(this.remarks);
      var body = {
        orNumber: this.orNumber,
        remarks: this.remarks
      };
      this.$api
        .post("/orderExpressDelivery/remarksExpressDelivery", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlogistics() {
      var body = {
        distribution: this.dataList.expressDelivery,
        logisticsNumber: this.dataList.expressNumber,
        consigneePhone: this.dataList.recipientPhone
      };
      this.$api
        .post("/orderExpressDelivery/queryTransport", body)
        .then(res => {
          this.activities = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    goback() {
      //返回
      this.$router.go(-1);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>




