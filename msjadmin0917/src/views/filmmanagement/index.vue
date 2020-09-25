<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div class="filmmanagement">
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
            <el-input placeholder="请输入内容" v-model="checkNumber" clearable size="medium" style="width:100%;" @input="checkNumberClick"></el-input>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">订单状态：</div>
          <div class="grid_content">
            <el-select v-model="filmStatus" placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in filmStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div style="min-width:225px">
          <div class="baseSearchWord">门店：</div>
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
        <div class="database">
          <span>待发货</span>
          <br>
          <span style="font-size:24px">{{unShipments}}</span>
        </div>
        <div class="database">
          <span>已发货</span>
          <br>
          <span style="font-size:24px">{{shipments}}</span>
        </div>
        <!-- <div class="database">已发货{{shipments}}</div> -->
      </div>
    </div>
    <!-- 按钮 -->
    <div style="margin-top:10px">
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium" @click="allexportOrder" :disabled="!Clickable.export">全部订单导出</el-button>
        <el-button class="grid_button" type="primary" size="medium" @click="exportOrder" :disabled="!Clickable.export">订单导出</el-button>
        <el-button class="grid_button" type="primary" size="medium" @click="showBatch" :disabled="!Clickable.batch">批量发货</el-button>
        <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="searchBotton" :disabled="!Clickable.inquire">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="orderList" ref="multipleTable" style="width: 100%" size="medium" tooltip-effect="dark" @selection-change="handleSelectionChange" :row-key="getRowKeys1">
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="订单编号" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.payTime }}</span>
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
        <el-table-column label="支付金额" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.payAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门店" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.storeNumber }}-{{ scope.row.storeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="180">
          <template slot-scope="scope">
            <span>{{ setfilmStatus(scope.row.filmStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="checkDetails(scope.row.orderNumber)" :disabled="!Clickable.details">查看详情</el-button>
            <el-button size="mini" type="text" @click="showDeliver(scope.row)" v-if="scope.row.filmStatus==0&&scope.row.orderStatus==1" :disabled="!Clickable.ship">操作发货</el-button>
            <el-button size="mini" type="text" @click="showChangeDeliver(scope.row)" v-if="scope.row.filmStatus==1&&scope.row.orderStatus==1" :disabled="!Clickable.modify">修改发货信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filePage" :page-sizes="[10]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
    <!-- 发货信息 -->
    <el-dialog title="操作记录" :visible.sync="isDeliver" width="450px" :before-close="closeDeliver">
      <div class="PopBaseBox">
        <div class="PopBaseWord">收件人：</div>
        <div class="PopBaseValue">{{temporder.consignee}}</div>
      </div>
      <div class="PopBaseBox">
        <div class="PopBaseWord">手机号：</div>
        <div class="PopBaseValue">{{temporder.consigneePhone}}</div>
      </div>
      <div class="PopBaseBox">
        <div class="PopBaseWord">地址：</div>
        <div class="PopBaseValue">{{temporder.deliveryAddress}}</div>
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
    <el-dialog title="操作记录" :visible.sync="isChangeDeliver" width="450px" :before-close="closeChangeDeliver">
      <div class="PopBaseBox">
        <div class="PopBaseWord">收件人：</div>
        <div class="PopBaseValue">{{temporder.consignee}}</div>
      </div>
      <div class="PopBaseBox">
        <div class="PopBaseWord">手机号：</div>
        <div class="PopBaseValue">{{temporder.consigneePhone}}</div>
      </div>
      <div class="PopBaseBox">
        <div class="PopBaseWord">地址：</div>
        <div class="PopBaseValue">{{temporder.deliveryAddress}}</div>
      </div>
      <div class="PopBaseBox">
        <div class="PopBaseWord">*物流类型：</div>
        <div class="PopBaseValue">
          <el-select v-model="temporder.distribution" placeholder="请选择" size="medium" style="width:100%;" :disabled="true">
            <el-option v-for="item in DHLlist" :key="item.value" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="PopBaseBox">
        <div class="PopBaseWord">*物流单号：</div>
        <div class="PopBaseValue">
          <el-input placeholder="请输入内容" v-model="temporder.logisticsNumber" clearable size="medium" style="width:100%;" :disabled="true"></el-input>
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
    <!-- 批量发货上传 -->
    <el-dialog title="批量发货" :visible.sync="isBatch" width="500px" :before-close="closeimport">
      <div>请按照以下格式上传.xlsx文件：三列数据分别为订单编号，物流类型，物流单号。请按照要求录入数据。</div>
      <input ref="inputer" id="upload" style="display:none" type="file" @change="importfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
      <div style="width:100%;text-align:center;margin-top:10px;">
        <el-button size="small" type="primary" @click="returnAllUsers">点击上传</el-button>
        <div style="line-height:30px" v-if="errorFile">格式错误请重新上传！</div>
        <div style="line-height:30px" v-if="filename!=''">已上传"{{filename}}"</div>
        <div style="line-height:30px" v-if="rightWord">匹配到{{goodXlsx.length}}条订单信息，{{badXlsx.length}}条无法匹配</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeimport">取 消</el-button>
        <el-button type="primary" @click="confirmimport">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "filmmanagement",
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
    fileList(value) {
      console.log(value);
    }
  },
  data() {
    return {
      website: "https://qrhealth.ihaozhuo.com",
      options: [
        {
          value: "所有",
          label: "所有"
        },
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        },
        {
          value: "龙须面",
          label: "龙须面"
        },
        {
          value: "北京烤鸭",
          label: "北京烤鸭"
        }
      ],
      value: "全部",

      input: "",
      orderList: [],
      filePage: 1,
      date: "",
      isDeliver: false,
      isChangeDeliver: false,
      isBatch: false,
      unShipments: 0,
      shipments: 0,
      orderNumber: "",
      phone: "",
      checkNumber: "",
      fileList: [],
      filmStatus: "",
      filmStatusList: [
        {
          value: "",
          label: "所有"
        },
        {
          value: 0,
          label: "待发货"
        },
        {
          value: 1,
          label: "已发货"
        }
      ],
      storeName: "所有",
      storeList: [
        {
          value: "所有"
        }
      ],
      startTime: "",
      endTime: "",
      count: 0,
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
      temporder: {},
      logisticsNumber: "",
      selectOrder: [],
      goodXlsx: [],
      badXlsx: [],
      errorFile: false,
      rightWord: false,
      filename: ""
    };
  },
  mounted() {},
  created() {
    this.getStoreList();
    this.getfilmOrderList();
  },
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.filePage = val;
      this.getfilmOrderList();
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectOrder = val;
      console.log(this.selectOrder);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
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
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    searchBotton() {
      this.filePage = 1;
      this.getfilmOrderList();
    },
    getStoreList() {
      this.storeList = [
        {
          value: "所有"
        }
      ];
      this.$api
        .post("/film/web/getStoreNameList")
        .then(res => {
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
    getfilmOrderList() {
      var body = {
        orderNumber: this.orderNumber,
        phone: this.phone,
        checkNumber: this.checkNumber,
        filmStatus: this.filmStatus,
        storeName: this.storeName == "所有" ? "" : this.storeName,
        startTime: this.startTime,
        endTime: this.endTime,
        page: this.filePage,
        each: 10
      };
      this.$api
        .post("/film/web/filmOrder", body)
        .then(res => {
          console.log(res.data);
          this.count = res.data.count;
          this.shipments = res.data.shipments;
          this.unShipments = res.data.unShipments;
          this.orderList = res.data.orderList;
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
    setfilmStatus(filmStatus) {
      switch (filmStatus) {
        case 0:
          return "待发货";
          break;
        case 1:
          return "已发货";
          break;
        default:
          break;
      }
    },
    showDeliver(order) {
      // this.temporderNumber=orderNumber
      this.isDeliver = true;
      this.temporder = order;
      console.log(order);
    },
    DeliverFilm() {
      var body = {
        orderNumber: this.temporder.orderNumber,
        distribution: this.distribution,
        logisticsNumber: this.logisticsNumber
      };
      this.$api
        .post("/film/web/singleConsignment", body)
        .then(res => {
          console.log(res.data);
          this.isDeliver = false;
          this.temporder = {};
          this.distribution = "";
          this.logisticsNumber = "";
          this.getfilmOrderList();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    closeDeliver() {
      this.isDeliver = false;
      this.temporder = {};
      this.distribution = "";
      this.logisticsNumber = "";
    },

    showChangeDeliver(order) {
      // this.temporderNumber=orderNumber
      this.isChangeDeliver = true;
      this.temporder = order;
      console.log(order);
    },
    ChangeDeliverFilm() {
      var body = {
        orderNumber: this.temporder.orderNumber,
        distribution: this.distribution,
        logisticsNumber: this.logisticsNumber
      };
      this.$api
        .post("/film/web/alertLogistics", body)
        .then(res => {
          console.log(res.data);
          this.isChangeDeliver = false;
          this.temporder = {};
          this.distribution = "";
          this.logisticsNumber = "";
          this.getfilmOrderList();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    closeChangeDeliver() {
      this.isChangeDeliver = false;
      this.distribution = "";
      this.logisticsNumber = "";
      this.temporder = {};
    },
    checkDetails(orderNumber) {
      this.$router.push(
        "/SelfServiceDeviceManagement/filmorderdetails?orderNumber=" +
          orderNumber
      );
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
          .post("/film/web/filmOrderExport", body)
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
        .post("/film/web/filmOrderExport", body)
        .then(res => {
          console.log(res.data);
          window.open(res.data.url);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    showBatch() {
      this.isBatch = true;
    },
    returnAllUsers() {
      this.$refs.inputer.value = "";
      this.filename = "";
      this.goodXlsx = [];
      this.badXlsx = [];
      this.errorFile = false;
      this.rightWord = false;
      document.getElementById("upload").click();
    },
    importfxx() {
      let _this = this;
      // _this.$refs.inputer.value = "";
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      console.log(this.file);
      this.filename = this.file.name;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          console.log(outdata);
          if (outdata[0]) {
            var keys = Object.keys(outdata[0]);
            if (keys.length != 3) {
              alert("文件内容格式不对，请重新上传！");
              _this.errorFile = true;
              _this.filename = "";
            } else {
              var a = keys.indexOf("订单编号");
              var b = keys.indexOf("物流类型");
              var c = keys.indexOf("物流单号");
              console.log(a, b, c);
              if (a != -1 && b != -1 && c != -1) {
                outdata.forEach(e => {
                  var de = {};
                  de.orderNumber = e.订单编号;
                  de.distribution = e.物流类型;
                  de.logisticsNumber = e.物流单号;
                  if (e.订单编号 && e.物流类型 && e.物流单号) {
                    _this.goodXlsx.push(de);
                  } else {
                    _this.badXlsx.push(de);
                  }
                  _this.rightWord = true;
                });
              } else {
                alert("文件内容格式不对，请重新上传！");
                _this.errorFile = true;
                _this.filename = "";
              }
            }

            console.log(keys);
          }
          // _this.$message({
          //     message: "请耐心等待导入成功",
          //     type: "success"
          // });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    confirmimport() {
      if (this.goodXlsx.length > 0) {
        var body = {
          orderList: this.goodXlsx
        };
        this.$api
          .post("/film/web/bulkConsignment", body)
          .then(res => {
            console.log(res.data);
            this.closeimport();
            this.getfilmOrderList();
          })
          .catch(err => {
            console.log("err", err);
            console.log(err);
            // var data=JSON.parse(err)
            // console.log(data);
            // alert(err.msg)
            var str = "";
            for (let i = 0; i < err.data.errList.length; i++) {
              console.log(err.data.errList[i]);
              str = str + err.data.errList[i] + "<br/>";
            }
            this.$message({
              dangerouslyUseHTMLString: true,
              message: str
            });
          });
      } else {
        this.closeimport();
      }
    },
    closeimport() {
      this.$refs.inputer.value = "";
      this.filename = "";
      (this.goodXlsx = []),
        (this.badXlsx = []),
        (this.errorFile = false),
        (this.rightWord = false);
      this.isBatch = false;
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("胶片管理");
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
.newLogistics {
  color: red;
  border-top: 1px solid #dcdfe6;
  font-size: 16px;
  margin-top: 10px;
}
</style>

