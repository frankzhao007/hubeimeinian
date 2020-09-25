<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div class="paymentorder">
      <div class="baseSearchBox">
        <div style="min-width:225px">
          <div class="baseSearchWord">订单编号：</div>
          <div class="grid_content">
            <el-input placeholder="请输入内容" v-model="orderNumber" clearable size="medium" style="width:100%;" @input="orderNumberClick"></el-input>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">用户手机：</div>
          <div class="grid_content">
            <el-input placeholder="请输入内容" v-model="phone" clearable size="medium" style="width:100%;" maxlength="11" @input="phoneClick"></el-input>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">体检卡号：</div>
          <div class="grid_content">
            <el-input placeholder="请输入内容" v-model="checkNumber" clearable size="medium" style="width:100%;" @input="checkNumberClick()"></el-input>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">支付状态：</div>
          <div class="grid_content">
            <el-select v-model="orderStatus" placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in orderStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">支付类型：</div>
          <div class="grid_content">
            <el-select v-model="payStatus" filterable placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in payStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">订单来源：</div>
          <div class="grid_content">
            <el-select v-model="storeName" filterable placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in storeList" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">时间范围：</div>
          <div class="grid_date">
            <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
      </div>

      <!-- 数据大屏 -->
      <div class="baseSearchBox" style="margin-top:10px">
        <!-- <div class="database">下单数{{orderCount}}</div>
        <div class="database">支付数{{payCount}}</div>
        <div class="database">支付金额{{payAmount}}</div> -->
        <div class="database">
          <span>下单数</span>
          <br>
          <span style="font-size:24px">{{orderCount}}</span>
        </div>
        <div class="database">
          <span>支付数</span>
          <br>
          <span style="font-size:24px">{{payCount}}</span>
        </div>
        <div class="database">
          <span>支付金额</span>
          <br>
          <span style="font-size:24px">{{payAmount}}</span>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div style="margin-top:10px;">
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium" @click="allexportOrder" :disabled="!Clickable.export">全部订单导出</el-button>
        <el-button class="grid_button" type="primary" size="medium" @click="exportOrder" :disabled="!Clickable.export">选择订单导出</el-button>
        <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="searchBotton">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="orderData" ref="multipleTable" style="width: 100%" size="medium" tooltip-effect="dark" @selection-change="handleSelectionChange" :row-key="getRowKeys1">
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="订单编号" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付类型" width="180">
          <template slot-scope="scope">
            <span>{{payType(scope.row.payType)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.orderTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户手机" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="体检号" width="180">
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
        <el-table-column label="支付时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.payTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="180">
          <template slot-scope="scope">
            <span>{{ payWay(scope.row.payWay) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.payAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" width="180">
          <template slot-scope="scope">
            <span>{{setorderStatus(scope.row.orderStatus)}}</span>
            <br>
            <el-button size="mini" @click="showHistory(scope.row.orderTime,scope.row.payTime,scope.row.refundTime)" :disabled="!Clickable.details">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="门店号" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.storeNumber }}-{{ scope.row.storeName }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="showRemark(scope.row.orderNumber)" :disabled="!Clickable.remarks">备注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="changePage" :current-page="orderPage" :page-sizes="[10]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="orderCount"></el-pagination>
    </div>
    <!-- 历史记录弹窗 -->
    <el-dialog title="历史记录" :visible.sync="isHistory" width="30%">
      <div class="PopBaseBox">
        <div class="PopBaseWord">待支付：</div>
        <div class="PopBaseValue">{{tempCreateOrderTime}}</div>
      </div>
      <div class="PopBaseBox" v-if="tempPayOrderTime">
        <div class="PopBaseWord">已支付：</div>
        <div class="PopBaseValue">{{tempPayOrderTime}}</div>
      </div>
      <div class="PopBaseBox" v-if="tempRefundOrderTime">
        <div class="PopBaseWord">订单退款：</div>
        <div class="PopBaseValue">{{tempRefundOrderTime}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="isHistory = false">取 消</el-button> -->
        <el-button type="primary" @click="isHistory = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 备注弹窗 -->
    <el-dialog title="备注" :visible.sync="isRemark" width="400px">
      <el-input type="textarea" placeholder="请输入内容" v-model="remarkWord" maxlength="30" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRemark = false">取 消</el-button>
        <el-button type="primary" @click="affirmRemark">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "paymentorder",
  components: {},
  watch: {
    date(value) {
      console.log(value);
      if (value == null) {
        this.startTime = "";
        this.endTime = "";
      } else {
        this.startTime = value[0] + " 00:00:00";
        this.endTime = value[1] + " 23:59:59";
      }
      console.log(this.startTime);
      console.log(this.endTime);
    },
    isRemark(value) {
      console.log(value);
      if (!value) {
        this.tempOrderNumber = "";
      }
    },
    isHistory(value) {
      if (!value) {
        this.tempCreateOrderTime = "";
        this.tempPayOrderTime = "";
        this.tempRefundOrderTime = "";
      }
    }
  },
  data() {
    return {
      website: "https://qrhealth.ihaozhuo.com",
      multipleSelection: "",
      input: "",
      orderData: [],
      orderPage: 1,
      date: "",
      isHistory: false,
      isRemark: false,
      remarkWord: "",
      orderNumber: "",
      phone: "",
      checkNumber: "",
      orderStatus: "",
      orderStatusList: [
        {
          value: "",
          label: "所有"
        },
        {
          value: "0",
          label: "未支付"
        },
        {
          value: "1",
          label: "已支付"
        },
        {
          value: "2",
          label: "已退款"
        }
      ],
      storeName: "所有",
      storeList: [
        {
          value: "所有"
        }
      ],
      payStatus: "",
      payStatusList: [
        {
          value: "",
          label: "所有"
        },
        {
          value: "1",
          label: "打印报告"
        },
        {
          value: "2",
          label: "体检自付费"
        },
        {
          value: "3",
          label: "邮寄胶片"
        },
        {
          value: "4",
          label: "电子胶片"
        }
      ],
      startTime: "",
      endTime: "",
      orderCount: 0,
      payCount: 0,
      payAmount: 0,
      tempOrderNumber: "",
      tempCreateOrderTime: "",
      tempPayOrderTime: "",
      tempRefundOrderTime: "",
      selectOrder: []
    };
  },
  computed: {},
  created() {
    this.getStoreList();
    this.getOrderList();
  },
  mounted() {},
  methods: {
    getRowKeys1(row) {
      return row.orderNumber;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    changePage(val) {
      console.log(`当前页: ${val}`);
      this.orderPage = val;
      this.getOrderList();
    },
    handleSelectionChange(val) {
      this.selectOrder = val;
    },
    searchBotton() {
      this.orderPage = 1;
      this.getOrderList();
    },
    getOrderList() {
      var body = {
        orderNumber: this.orderNumber,
        phone: this.phone,
        checkNumber: this.checkNumber,
        payType: this.payStatus,
        orderStatus: this.orderStatus,
        storeName: this.storeName == "所有" ? "" : this.storeName,
        startTime: this.startTime,
        endTime: this.endTime,
        page: this.orderPage.toString(),
        each: "10"
      };
      this.$api
        .post("/film/web/searchOrder", body)
        .then(res => {
          console.log(res.data);
          this.orderCount = res.data.orderCount;
          this.payCount = res.data.payCount;
          this.payAmount = res.data.payAmount;
          this.orderData = res.data.orderList;
          for (let i = 0; i < res.data.orderList.length; i++) {
            this.$set(res.data.orderList[i], "checkNumberList");
            res.data.orderList[i].checkNumberList = [];
            res.data.orderList[i].checkNumberList = res.data.orderList[
              i
            ].checkNumber.split("_");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getStoreList() {
      this.storeList = [
        {
          value: "所有"
        }
      ];
      var body = {};
      this.$api
        .post("/film/web/getStoreNameList", body)
        .then(res => {
          console.log(res.data);
          if (res.data.storeNameList) {
            for (let i = 0; i < res.data.storeNameList.length; i++) {
              var temp = {
                value: ""
              };
              temp.value = res.data.storeNameList[i];
              this.storeList.push(temp);
            }
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    showRemark(orderNumber) {
      this.tempOrderNumber = orderNumber;
      this.isRemark = true;
    },
    affirmRemark() {
      if (this.remarkWord) {
        var body = {
          orderNumber: this.tempOrderNumber,
          noteOrder: this.remarkWord
        };
        this.$api
          .post("/film/web/setNote", body)
          .then(res => {
            console.log(res.data);
            this.isRemark = false;
            this.getOrderList();
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        alert("请输入备注信息");
      }
    },
    phoneClick() {
      console.log(111);
      this.phone = this.phone.replace(/[^\.\d]/g, "");
      this.phone = this.phone.replace(".", "");
    },
    checkNumberClick() {
      this.checkNumber = this.checkNumber.replace(/[\u4e00-\u9fa5]/g, "");
    },
    orderNumberClick() {
      this.orderNumber = this.orderNumber.replace(/[\u4e00-\u9fa5]/g, "");
    },
    showHistory(tempCreateOrderTime, tempPayOrderTime, tempRefundOrderTime) {
      this.isHistory = true;
      this.tempCreateOrderTime = tempCreateOrderTime;
      this.tempPayOrderTime = tempPayOrderTime;
      this.tempRefundOrderTime = tempRefundOrderTime;
    },
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
    setorderStatus(orderStatus) {
      switch (orderStatus) {
        case 0:
          return "未支付";
          break;
        case 1:
          return "已支付";
          break;
        case 2:
          return "已退款";
          break;
        default:
          break;
      }
    },
    exportOrder() {
      var exportModel = "";
      var orderNumberList = "";
      var body = {};
      exportModel = "1";
      if (this.selectOrder.length != 0) {
        for (var i = 0; i < this.selectOrder.length; i++) {
          if (i == 0) {
            orderNumberList = this.selectOrder[i].orderNumber;
          } else {
            orderNumberList =
              orderNumberList + "_" + this.selectOrder[i].orderNumber;
          }
        }
        var temp = {
          exportModel: exportModel,
          orderNumberList: orderNumberList
        };
        body = temp;

        this.$api
          .post("/film/web/orderExport", body)
          .then(res => {
            console.log(res.data);
            window.open(res.data.url);
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        alert("请选要导出的订单!");
      }
    },
    allexportOrder() {
      var body = {
        orderNumber: this.orderNumber,
        phone: this.phone,
        checkNumber: this.checkNumber,
        filmStatus: this.filmStatus,
        storeName: this.storeName == "所有" ? "" : this.storeName,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.$api
        .post("/film/web/orderExport", body)
        .then(res => {
          console.log(res.data);
          window.open(res.data.url);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("支付订单");
      console.log("vuex中获取按钮权限", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style scoped>
.baseSearchBox {
  /* min-width: 900px; */
  /* margin-bottom: 20px; */
  min-height: 50px;
  font-size: 14px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}
.baseSearchWord {
  float: left;
  width: 20%;
  min-width: 100px;
  text-align: center;
  min-height: 50px;
  line-height: 50px;
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
/* .database {
  min-width: 225px;
  height: 50px;
  line-height: 50px;
  background-color: #5270c7;
  border-radius: 10px;
  margin-right: 20px;
  text-align: center;
  color: white;
} */
.database {
  min-width: 225px;
  height: 80px;
  line-height: 40px;
  background-color: #5270c7;
  border-radius: 10px;
  margin-right: 20px;
  text-align: center;
  color: white;
}
.el-dialog__body {
  padding-top: 20px;
}
</style>

