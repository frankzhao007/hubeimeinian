<template>
  <div class="app-container">
    <div class="filmorderdetails">
      <!-- 按钮和流程图 -->
      <div class="pageTop" v-if="order.length>0">
        <img src="../../assets/back.png" alt class="TopbackImg" @click="$router.go(-1)">
        <el-steps :active="2" align-center v-if="order[0].filmStatus==1">
          <el-step title="支付订单" :description="order[0].payTime"></el-step>
          <el-step title="订单发货" :description="order[0].deliveryTime"></el-step>
        </el-steps>
        <el-steps :active="2" align-center v-if="order[0].filmStatus==0">
          <el-step title="支付订单" :description="order[0].payTime"></el-step>
          <!-- <el-step title="订单发货" description=""></el-step> -->
        </el-steps>
      </div>
      <!-- 操作按钮 -->
      <div v-if="order.length>0">
        <div class="inquire">
          <el-button class="grid_button" type="primary" size="medium" @click="showRemark" :disabled="!Clickable.remarks">备注订单</el-button>
          <el-button class="grid_button" type="primary" size="medium" v-if="order[0].filmStatus==1" @click="showChangeDeliver":disabled="!Clickable.modify">修改发货信息</el-button>
          <el-button class="grid_button" type="primary" size="medium" v-if="order[0].filmStatus==0" @click="showDeliver":disabled="!Clickable.ship">订单发货</el-button>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="filmorderdetails">
        <div v-if="order.length>0">
          <div class="baseWord">
            <img src="../../assets/information.png" alt class="baseImg">
            <div>基本信息</div>
          </div>
          <el-table :data="order" border style="width: 100%" resizable="false">
            <el-table-column prop="orderNumber" label="订单编号" :resizable="false"></el-table-column>
            <el-table-column prop="phone" label="用户手机" :resizable="false"></el-table-column>
            <el-table-column prop="checkNumber" label="体检号码" :resizable="false">
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.checkNumber }}</span> -->
                <el-popover trigger="hover" placement="top">
                  <p v-for="(checkNumber,index) in scope.row.checkNumberList">{{checkNumber}}</p>
                  <div slot="reference" class="name-wrapper">
                    <p v-for="(checkNumber,index) in scope.row.checkNumberList" v-if="index<2">{{checkNumber}}</p>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="payType" label="支付类型" :resizable="false">
              <template slot-scope="scope">
                <span>{{ payType(scope.row.payType) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="storeNumber" label="门店号" :resizable="false"></el-table-column>
            <el-table-column prop="storeName" label="门店名称" :resizable="false"></el-table-column>
          </el-table>
          <el-table :data="order" border style="width: 100%">
            <el-table-column prop="payWay" label="支付方式" :resizable="false">
              <template slot-scope="scope">
                <span>{{ payWay(scope.row.payWay) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="payTime" label="支付时间" :resizable="false"></el-table-column>
            <el-table-column prop="payAmount" label="支付金额" :resizable="false"></el-table-column>
            <el-table-column prop="distribution" label="配送方式" :resizable="false"></el-table-column>
            <el-table-column prop="logisticsNumber" label="物流单号" :resizable="false"></el-table-column>
            <el-table-column prop="address" label="物流详情" :resizable="false">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="showLogistics" v-if="order[0].filmStatus==1">查看详情</el-button>
                <el-button size="mini" type="text" @click="showDeliver" v-if="order[0].filmStatus==0">订单发货</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 收货信息 -->
        <div v-if="order.length>0">
          <div class="baseWord">
            <img src="../../assets/information.png" alt class="baseImg">
            <div>收货信息</div>
          </div>
          <el-table :data="order" border style="width: 80%" v-if="order.length>0">
            <el-table-column prop="consignee" label="收货人" :resizable="false">
              <template slot-scope="scope">
                <span>{{scope.row.consignee}}</span>
                <el-button :class="'consignee'+scope.$index.toString()" data-clipboard-action="copy" :data-clipboard-text="scope.row.consignee" @click="getcopy('.'+'consignee'+scope.$index.toString())">复制</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="consigneePhone" label="手机号码" :resizable="false">
              <template slot-scope="scope">
                <span>{{scope.row.consigneePhone}}</span>
                <el-button :class="'consigneePhone'+scope.$index.toString()" data-clipboard-action="copy" :data-clipboard-text="scope.row.consigneePhone" @click="getcopy('.'+'consigneePhone'+scope.$index.toString())">复制</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="deliveryAddress" label="收货地址" :resizable="false">
              <template slot-scope="scope">
                <span>{{scope.row.deliveryAddress}}</span>
                <el-button :class="'deliveryAddress'+scope.$index.toString()" data-clipboard-action="copy" :data-clipboard-text="scope.row.deliveryAddress" @click="getcopy('.'+'deliveryAddress'+scope.$index.toString())">复制</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 订单明细 -->
        <div v-if="order.length>0">
          <div class="baseWord">
            <img src="../../assets/information.png" alt class="baseImg">
            <div>订单明细</div>
          </div>
          <el-table :data="order[0].filmitems" border style="width: 70%">
            <el-table-column prop="vid" label="体检号" :resizable="false"></el-table-column>
            <el-table-column prop="filmname" label="项目名称" :resizable="false"></el-table-column>
            <el-table-column prop="itemid" label="项目编码" :resizable="false"></el-table-column>
            <el-table-column prop="count" label="胶片张数" :resizable="false"></el-table-column>
            <el-table-column prop="amount" label="支付金额" :resizable="false"></el-table-column>
          </el-table>
        </div>
        <!-- 操作信息 -->
        <div v-if="order.length>0">
          <div class="baseWord">
            <img src="../../assets/information.png" alt class="baseImg">
            <div>操作信息</div>
          </div>
          <el-table :data="noteList" border style="width: 85%">
            <el-table-column prop="operator" label="操作者" :resizable="false"></el-table-column>
            <el-table-column prop="time" label="操作时间" :resizable="false"></el-table-column>
            <el-table-column prop="message" label="操作" :resizable="false"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 发货信息 -->
      <el-dialog title="操作记录" :visible.sync="isDeliver" width="450px" :before-close="closeDeliver" v-if="order.length>0">
        <div class="PopBaseBox">
          <div class="PopBaseWord">收件人：</div>
          <div class="PopBaseValue">{{order[0].consignee}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">手机号：</div>
          <div class="PopBaseValue">{{order[0].consigneePhone}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">地址：</div>
          <div class="PopBaseValue">{{order[0].deliveryAddress}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">*物流类型：</div>
          <div class="PopBaseValue">
            <el-select v-model="distribution" placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in DHLlist" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">*物流单号：</div>
          <div class="PopBaseValue">
            <el-input placeholder="请输入内容" v-model="logisticsNumber" clearable size="medium" style="width:100%;"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDeliver">取 消</el-button>
          <el-button type="primary" @click="DeliverFilm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改发货信息 -->
      <el-dialog title="操作记录" :visible.sync="isChangeDeliver" width="450px" :before-close="closeChangeDeliver" v-if="order.length>0">
        <div class="PopBaseBox">
          <div class="PopBaseWord">收件人：</div>
          <div class="PopBaseValue">{{order[0].consignee}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">手机号：</div>
          <div class="PopBaseValue">{{order[0].consigneePhone}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">地址：</div>
          <div class="PopBaseValue">{{order[0].deliveryAddress}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">*物流类型：</div>
          <div class="PopBaseValue">
            <el-select v-model="order[0].distribution" placeholder="请选择" size="medium" style="width:100%;" :disabled="true">
              <el-option v-for="item in DHLlist" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">*物流单号：</div>
          <div class="PopBaseValue">
            <el-input placeholder="请输入内容" v-model="order[0].logisticsNumber" clearable size="medium" style="width:100%;" :disabled="true"></el-input>
          </div>
        </div>
        <div>
          <div class="PopBaseBox newLogistics">新物流信息</div>
          <div class="PopBaseBox">
            <div class="PopBaseWord">*物流类型：</div>
            <div class="PopBaseValue">
              <el-select v-model="distribution" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in DHLlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="PopBaseBox">
            <div class="PopBaseWord">*物流单号：</div>
            <div class="PopBaseValue">
              <el-input placeholder="请输入内容" v-model="logisticsNumber" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeChangeDeliver">取 消</el-button>
          <el-button type="primary" @click="ChangeDeliverFilm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 备注 -->
      <el-dialog title="备注" :visible.sync="isRemark" width="400px">
        <el-input type="textarea" placeholder="请输入内容" v-model="remarkWord" maxlength="30" show-word-limit></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isRemark = false">取 消</el-button>
          <el-button type="primary" @click="affirmRemark">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看物流 -->
      <el-dialog title="物流详情" :visible.sync="isLogistics" width="450px" :before-close="closeLogistics" v-if="order.length>0">
        <div class="PopBaseBox">
          <div class="PopBaseWord">物流公司：</div>
          <div class="PopBaseValue">{{order[0].distribution}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">物流单号：</div>
          <div class="PopBaseValue">{{order[0].logisticsNumber}}</div>
        </div>
        <div class="PopBaseBox">
          <div class="PopBaseWord">物流轨迹：</div>
        </div>
        <div class="stepsCss">
          <el-timeline :reverse="true">
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.time">{{activity.context}}</el-timeline-item>
          </el-timeline>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeLogistics">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  name: "filmorderdetails",
  components: {},
  watch: {
    isRemark(value) {
      console.log(value);
      if (!value) {
        this.tempOrderNumber = "";
        this.getOrderDetail();
      }
    },
    isLogistics(value) {
      if (!value) {
        this.activities = [];
      }
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      website: "https://qrhealth.ihaozhuo.com",
      orderNumber: "",
      order: [],
      noteList: [],
      isDeliver: false,
      isRemark: false,
      remarkWord: "",
      isChangeDeliver: false,
      isLogistics: false,
      DHLlist: [
        {
          value: "邮政包裹"
        },
        {
          value: "EMS"
        },
        {
          value: "顺丰"
        },
        {
          value: "申通"
        },
        {
          value: "圆通"
        },
        {
          value: "中通"
        },
        {
          value: "汇通"
        },
        {
          value: "韵达"
        },
        {
          value: "宅急送"
        },
        {
          value: "天天"
        },
        {
          value: "德邦"
        },
        {
          value: "国通"
        },
        {
          value: "增益"
        },
        {
          value: "速尔"
        },
        {
          value: "中铁物流"
        },
        {
          value: "中铁快运"
        },
        {
          value: "能达"
        },
        {
          value: "优速"
        },
        {
          value: "全峰"
        },
        {
          value: "京东"
        }
      ],
      distribution: "",
      logisticsNumber: "",
      activities: []
    };
  },
  mounted() {
    var that = this;
    console.log(that.$route.query);
    if (that.$route.query.orderNumber) {
      that.orderNumber = that.$route.query.orderNumber;
      that.getOrderDetail();
    }
  },
  methods: {
    payType(payType) {
      switch (payType) {
        case 1:
          return "报告打印";
          break;
        case 2:
          return "体检自费";
          break;
        case 3:
          return "邮寄胶片";
          break;
        case 4:
          return "电子胶片";
          break;
        default:
          break;
      }
    },
    payWay(payWay) {
      switch (payWay) {
        case 1:
          return "支付宝";
          break;
        case 0:
          return "微信";
          break;
        default:
          break;
      }
    },
    getcopy(id) {
      console.log(id);
      console.log(id);
      var that = this;
      var clipboard = new Clipboard(id);
      console.log(clipboard);
      clipboard.on("success", e => {
        console.log(e);
        // success("复制成功"); //这里你如果引入了elementui的提示就可以用，没有就注释即可
        // 释放内存
        that.$message({
          message: "复制成功",
          type: "success"
        });
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    getOrderDetail() {
      var body = {
        orderNumber: this.orderNumber
      };
      this.$api
        .post("/film/web/orderDetails", body)
        .then(res => {
          console.log(res.data);
          this.order = [];
          this.order.push(res.data.order);
          this.noteList = res.data.noteList;
          for (let i = 0; i < this.order.length; i++) {
            this.$set(this.order[i], "checkNumberList");
            this.order[i].checkNumberList = [];
            this.order[i].checkNumberList = this.order[i].checkNumber.split(
              "_"
            );
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    showDeliver() {
      // this.temporderNumber=orderNumber
      this.isDeliver = true;
    },
    DeliverFilm() {
      var body = {
        orderNumber: this.order[0].orderNumber,
        distribution: this.distribution,
        logisticsNumber: this.logisticsNumber
      };
      this.$api
        .post("/film/web/singleConsignment", body)
        .then(res => {
          console.log(res.data);
          this.isDeliver = false;
          this.distribution = "";
          this.logisticsNumber = "";
          this.getOrderDetail();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    closeDeliver() {
      this.isDeliver = false;
      this.distribution = "";
      this.logisticsNumber = "";
    },

    showChangeDeliver() {
      // this.temporderNumber=orderNumber
      this.isChangeDeliver = true;
    },
    ChangeDeliverFilm() {
      var body = {
        orderNumber: this.order[0].orderNumber,
        distribution: this.distribution,
        logisticsNumber: this.logisticsNumber
      };
      this.$api
        .post("/film/web/alertLogistics", body)
        .then(res => {
          console.log(res.data);
          this.isChangeDeliver = false;
          this.distribution = "";
          this.logisticsNumber = "";
          this.getOrderDetail();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    closeChangeDeliver() {
      this.isChangeDeliver = false;
      this.distribution = "";
      this.logisticsNumber = "";
    },
    showRemark() {
      this.isRemark = true;
    },
    affirmRemark() {
      if (this.remarkWord) {
        var body = {
          orderNumber: this.order[0].orderNumber,
          noteOrder: this.remarkWord
        };
        this.$api
          .post("/film/web/setNote", body)
          .then(res => {
            console.log(res.data);
            this.isRemark = false;
            this.getOrderDetail();
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        alert("请输入备注信息");
      }
    },
    showLogistics() {
      this.isLogistics = true;
      this.queryLogistics();
    },
    closeLogistics() {
      this.isLogistics = false;
      this.activities = "";
    },
    queryLogistics() {
      var body = {
        distribution: this.order[0].distribution,
        logisticsNumber: this.order[0].logisticsNumber,
        consigneePhone: this.order[0].consigneePhone
      };
      this.$api
        .post("/film/web/queryLogistics", body)
        .then(res => {
          console.log(res);
          this.activities = res.data;
        })
        .catch(res => {
          console.log("err", err);
        });
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("胶片管理");
      console.log("vuex中获取按钮权限",temp.rolesList);
      return temp.rolesList;
    },
  }
};
</script>
<style scoped>
.pageTop {
  height: 100px;
}
.TopbackImg {
  height: 40px;
  position: absolute;
  z-index: 99999;
}
.baseImg {
  height: 40px;
}
.baseWord {
  margin-top: 20px;
  height: 45px;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.PopBaseBox {
  width: 100%;
  min-height: 40px;
  line-height: 40px;
  display: flex;
}
.PopBaseWord {
  width: 25%;
  text-align: right;
  font-size: 14px;
}
.PopBaseValue {
  width: 70%;
  font-size: 14px;
  min-height: 40px;
  padding-left: 5%;
}
.newLogistics {
  color: red;
  border-top: 1px solid #dcdfe6;
  font-size: 16px;
  margin-top: 10px;
}
.stepsCss {
  padding-left: 10%;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.stepsCss::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
