<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
    <div style="font-size: 20px; ">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>
    <div style="margin:20px">
      <el-form :inline="true" :model="seekList" label-position="right" label-width="120px" size="medium">
        <el-form-item label="体检人姓名：">
          <el-input v-model="seekList.name" placeholder="请输入体检人姓名" style="width:200px" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="体检状态：">
          <el-select v-model="seekList.physical" placeholder style="width:200px" clearable>
            <el-option label="全部" value></el-option>
            <el-option label="已预约" value="1"></el-option>
            <el-option label="已到检" value="4"></el-option>
            <el-option label="已出报告" value="5"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="邮寄状态：">
          <el-select v-model="seekList.mail" placeholder style="width:200px" clearable>
            <el-option label="全部" value></el-option>
            <el-option label="待邮寄" value="1"></el-option>
            <el-option label="已邮寄" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="ygplczbtn">批量导入</el-button>
          <el-button type="primary" @click="gotodcsz">导 出</el-button>
          <el-button type="primary" icon="el-icon-search" @click="search()">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%;margin-top:20px" v-loading="loadings">
      <el-table-column prop="joinEnterprise" label="所属企业" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reMan" label="体检人姓名" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orNumber" label="订单编号" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="Viewordermsg(scope.row)" type="text" size="medium">{{scope.row.orNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="data" label="收件人信息" min-width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="lookDetails(scope.row)" type="text" size="medium">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="applicationTime" label="申请邮寄时间" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="expressDelivery" label="邮寄快递" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="expressNumber" label="快递单号" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="140" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="remarks(scope.row)" type="text" size="medium">{{scope.row.remarks}}</el-button>
          <!-- {{scope.$index}} -->
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="220" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="immediatelyMail(scope.row)" type="text" size="medium" v-if="scope.row.status==1">立即邮寄</el-button>
          <el-button @click="mailDetails(scope.row)" type="text" size="medium">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收件人信息" :visible.sync="isrecipients" width="500px">
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">收件人：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;">{{selectmessage.recipientName}}</div>
      </div>
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">手机号：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;">{{selectmessage.recipientPhone}}</div>
      </div>
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">收货地址：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;">{{selectmessage.recipientAddress}}</div>
      </div>
    </el-dialog>

    <el-dialog title="备注" :visible.sync="isremark" width="500px">
      <div>{{selectmessage.remarks}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isremark = false">取 消</el-button>
        <el-button type="primary" @click="isremark = false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="填写发货信息" :visible.sync="isshipments" width="500px">
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">收件人：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;">{{selectmessage.recipientName}}</div>
      </div>
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">手机号：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;">{{selectmessage.recipientPhone}}</div>
      </div>
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">收货地址：</div>
        <div style="float:left;margin-left:10px;width:calc(100% - 130px);line-height:40px;color: #999999;">{{selectmessage.recipientAddress}}</div>
      </div>
      <div style="overflow:hidden;">
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">物流公司：</div>
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
        <div style="width:120px;float:left;text-align: right;line-height:40px;font-size: 16px;">物流单号：</div>
        <el-input v-model="odd" placeholder="请输入物流单号" style="width:240px" clearable></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isshipments = false">取 消</el-button>
        <el-button type="primary" @click="affirmshipments">确定</el-button>
      </div>
    </el-dialog>

    <div class="ygplcz">
      <el-dialog title="邮件批量操作" :visible.sync="ygplczobj.isshow" width="800px" :before-close="handleClose">
        <el-tabs v-model="ygplczobj.activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane label="邮件批量导入" name="first">
            <div v-loading="ygplczobj.drobj.loading" :element-loading-text="ygplczobj.drobj.loadingtext">
              <el-steps style="margin-top:10px" :active="ygplczobj.drobj.active" finish-status="success" process-status="finish" simple>
                <el-step title="上传文件" icon="el-icon-upload"></el-step>
                <el-step title="执行导入" icon="el-icon-s-platform"></el-step>
                <el-step title="导入完成" icon="el-icon-success"></el-step>
              </el-steps>
              <div v-if="ygplczobj.drobj.active==0">
                <el-card>
                  <div class="box-card">
                    <div>
                      <i style="font-size:50px;margin:10px" class="el-icon-my-download"></i>
                    </div>
                    <div style="width:100%;margin-left:20px">
                      <div style>
                        <div style="font-size:18px;">填写导入邮件信息</div>
                        <div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="DownloadTemplate">下载模板</el-button>
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
                        <div style="font-size:18px;">上传填好的邮件信息表</div>
                        <div style="font-size:14px; color:#9E9E9E">仅支持xlsx或xls（即Excel格式），文件大小≤4M。</div>
                        <div style="font-size:14px; color:#3A83FF">
                          {{ygplczobj.drobj.fileName}}
                          <i v-if="ygplczobj.drobj.fileName" @click="delfile" style="cursor: pointer;" class="el-icon-error"></i>
                        </div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="text-align:center;margin-top:20px">
                  <el-button type="primary" @click="ygplczcheckData">校验数据</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.drobj.active==1">
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style>
                        <div style="font-size:16px;">正确数据条数</div>
                        <div style="font-size:14px; color:#4CCA32 ">{{succaa.success}}条</div>
                      </div>
                    </div>
                  </div>
                </el-card>
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style>
                        <div style="font-size:16px;">异常数据条数</div>
                        <div style="font-size:14px; color:#F63649  ">{{succaa.mis}}条</div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="downloadfaildata">下载异常数据</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="margin-top:20px">
                  <el-button type="primary" @click="confirmdrbtn">确认导入</el-button>
                  <el-button style="float:right" @click="resetupload">重新上传</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.drobj.active==2">
                <div style="text-align:center">
                  <div style="font-size:28px;color:#00000;margin:20px">批量导入完成</div>
                  <div style="font-size:16px;color:#4CCA32;margin-bottom:20px">成功导入{{imporsaz.success}}条</div>
                  <div style="font-size:16px;color:#999;margin-bottom:20px">失败导入{{imporsaz.mis}}条</div>
                  <el-button type="primary" style="margin:20pxl.;padding:15px 50px" @click="gotoshow">完 成</el-button>
                  <!--  -->
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
    <input ref="ygplczinput" id="ygplczinputid" style="display:none" type="file" @change="ygplczimportfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    <!-- 分页 -->
    <div style="height:30px;margin-top:20px;">
      <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableselectenterMeal.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableselectenterMeal.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableselectenterMeal.total"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      ygplczobj: {
        isshow: false,
        activeName: "first",
        companyList: [],
        drobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          succaa: "",
          successSum: [],
          mistake: [],
          loading: false,
          loadingtext: ""
        },
        xgobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        },
        scobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        }
      },
      isrecipients: false,
      isremark: false,
      imporsaz: "",
      companyId: "",
      isshipments: false,
      logisticsname: "顺丰快递", //物流名字
      odd: "", //物流单号
      selectmessage: {}, //选择的信息
      seekList: {
        name: "",
        physical: "",
        mail: ""
      },
      tableselectenterMeal: {
        //分页
        pageindex: 1,
        pagesize: 10,
        total: 0
      },

      tableData: [
        {
          data: ""
        }
      ], //列表
      loadings: false
    };
  },
  components: {},
  mounted() {
    this.companyId = this.$route.query.companyId;
    this.getmessage();
  },
  methods: {
    //员工批量操作
    ygplczbtn() {
      this.ygplczobj = {
        isshow: false,
        activeName: "first",
        companyList: [],
        drobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        },
        xgobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        },
        scobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        }
      };
      this.ygplczobj.isshow = true;
      this.getpullOrg2account();
    },
    //删除文件
    delfile() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      this.ygplczobj[nametemp].fileName = "";
      this.ygplczobj[nametemp].yglist = [];
    },
    getpullOrg2account() {
      this.$api
        .get("account/pullOrg2", {
          AccountType: this.$store.getters.getRoleInfo.AccountType,
          AccountName: this.$store.getters.getRoleInfo.AccountName
        })
        .then(res => {
          console.log(res);
          this.ygplczobj.companyList = [];
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map(temp => {
                this.ygplczobj.companyList.push(temp);
              });
            }
          });
        });
    },
    search() {
      this.tableselectenterMeal.pageindex = 1;
      this.tableselectenterMeal.pagesize = 10;
      console.log(this.seekList.mail);
      var body = {
        companyId: this.companyId,
        reMan: this.seekList.name,
        reStatus: this.seekList.physical,
        status: this.seekList.mail,
        each: this.tableselectenterMeal.pagesize,
        page: this.tableselectenterMeal.pageindex
      };
      this.$api
        .post("/orderExpressDelivery/queryAllOrderExpressDelivery", body)
        .then(res => {
          this.tableData = res.data.data;
          this.tableselectenterMeal.total = res.data.count;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    resetupload() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      this.ygplczobj[nametemp].active -= 1;
    },
    confirmdrbtn() {
      var that = this;
      var nametemp = "";
      var url = "";
      var type = "";
      var text = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          url = "/employee/excelInsertEmployees";
          type = "1";
          text = "数据导入中,请稍后...";
          break;
        case "second":
          nametemp = "xgobj";
          url = "/employee/excelUpdateEmployees";
          type = "2";
          text = "数据修改中,请稍后...";
          break;
        case "third":
          nametemp = "scobj";
          url = "/employee/excelDelEmployees";
          type = "3";
          text = "数据删除中,请稍后...";
          break;
      }
      if (this.successSum) {
        var body = this.successSum;
        // this.ygplczobj[nametemp].loading = true;
        // this.ygplczobj[nametemp].loadingtext = text;
        this.$api
          .post("/orderExpressDelivery/importExpressDelivery", body)
          .then(res => {
            if (res.code == 200) {
              console.log(res);
              this.imporsaz = res.data;
              this.$message.success("成功");
              this.ygplczobj[nametemp].drResult = res.data;
              this.ygplczobj[nametemp].active += 1;
              that.getmessage();
            } else {
              this.$message.error(res.mag);
            }
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      } else {
        this.$message.error("暂无正确数据！");
      }
    },
    //下载异常数据
    downloadfaildata() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      if (this.mistake.length > 0) {
        this.$api
          .post("/orderExpressDelivery/downloadMisTakeData", this.mistake)
          .then(res => {
            console.log(res);
            let zs = `${this.$parent.$parent.$parent.weburl}${res.data}`;
            let a = document.createElement("a");
            a.href = zs; // href链接指向图片的地址
            a.download = zs; // 下载的图片的名称
            a.click(); // 触发a标签的单击事件
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.msg);
          });
      } else {
        this.$message.info("暂无异常数据！");
      }
    },
    Viewordermsg(row) {
      console.log(row);
      var body = {
        orNumber: row.orNumber
      };
      this.$api
        .post("/order/queryOrder", body)
        .then(res => {
          console.log(res);
          this.$router.push(
            "/ordermanagement/ordermsg?orNumber=" +
              row.orNumber +
              "&sonNumber=" +
              res.data[0].goSonNumber
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    getmessage() {
      var body = {
        companyId: this.companyId,
        reMan: this.seekList.name,
        reStatus: this.seekList.physical,
        status: this.seekList.mail,
        each: this.tableselectenterMeal.pagesize,
        page: this.tableselectenterMeal.pageindex
      };
      this.$api
        .post("/orderExpressDelivery/queryAllOrderExpressDelivery", body)
        .then(res => {
          this.tableData = res.data.data;
          this.tableselectenterMeal.total = res.data.count;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotoshow() {
      var that = this;
      this.ygplczobj.isshow = false;
      that.reload();
      console.log(111);
    },

    affirmshipments() {
      var that = this;
      console.log(this.logisticsname);
      if (!that.logisticsname) {
        this.$message({
          message: "请选择快递公司",
          type: "warning"
        });
        return;
      }
      if (!that.odd) {
        this.$message({
          message: "请输入物流单号",
          type: "warning"
        });
        return;
      }
      var body = {
        orNumber: this.selectmessage.orNumber,
        expressDelivery: this.logisticsname,
        expressNumber: this.odd
      };
      this.$api
        .post("/orderExpressDelivery/updateExpressDelivery", body)
        .then(res => {
          this.isshipments = false;
          that.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    immediatelyMail(val) {
      this.isshipments = true;
      this.selectmessage = val;
    },

    remarks(val) {
      this.isremark = true;
      this.selectmessage = val;
    },

    lookDetails(val) {
      this.selectmessage = val;
      this.isrecipients = true;
    },

    mailDetails(val) {
      this.$router.push(
        "/enterprisemanagement/mailParticulars?orNumber=" + val.orNumber
      );
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //员工批量操作excel生成json
    ygplczimportfxx(e) {
      let _this = this;
      console.log(event);
      var myevent = event;
      var nametemp = "";
      switch (_this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      _this.ygplczobj[nametemp].loading = true;
      _this.ygplczobj[nametemp].loadingtext = "数据解析中,请稍后...";
      setTimeout(() => {
        let inputDOM = _this.$refs.inputer;
        // 通过DOM取文件数据
        console.log(myevent);
        var rABS = false; //是否将文件读取为二进制字符串
        var f = myevent.target.files[0];

        _this.ygplczobj[nametemp].fileName = f.name;
        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
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
            console.log("outdata", outdata);
            _this.ygplczobj[nametemp].yglist = [];
            try {
              outdata.forEach((element, index) => {
                // if (!element.序号) {
                //   throw new Error("请完善表格序号！");
                // }
                // if (!element.证件类型) {
                //   throw new Error("请完善表格证件类型！");
                // }
                // if (!element.证件号码) {
                //   throw new Error("请完善表格证件号码！");
                // }
                let body = {
                  // id: Number(element.序号 || index + 1),
                  orNumber: String(element.订单号 || ""),
                  expressDelivery: String(element.邮寄快递 || ""),
                  expressNumber: String(element.快递单号 || "")
                };
                _this.ygplczobj[nametemp].yglist.push(body);
              });
              console.log(_this.ygplczobj[nametemp].yglist);
              _this.ygplczobj[nametemp].loading = false;
              _this.ygplczobj[nametemp].loadingtext = "";
              _this.$message.success("数据解析完成");
            } catch (error) {
              _this.$message.error(error.message);
              _this.ygplczobj[nametemp].yglist = [];
              _this.ygplczobj[nametemp].fileName = "";
              _this.ygplczobj[nametemp].loading = false;
              _this.ygplczobj[nametemp].loadingtext = "";
            }
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }, 100);
    },
    // 下载模板
    DownloadTemplate() {
      var xhr = new XMLHttpRequest();
      var str = "";
      xhr.open(
        "GET",
        this.$parent.$parent.$parent.weburl +
          "/orderExpressDelivery/downloadTemplate",
        true
      ); //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.responseType = "blob"; //返回类型blob
      xhr.onload = function() {
        //定义请求完成的处理函数
        if (this.status === 200) {
          6;
          var blob = this.response;
          if (blob.size > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
            reader.onload = function(e) {
              // 转换完成，创建一个a标签用于下载
              var a = document.createElement("a");
              var bb = new Date();
              a.download = "邮件模板" + ".xlsx";
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              a.remove();
            };
          } else {
            // window.location.reload();
          }
        }
      };
      xhr.send();
    },

    tgplzcinput() {
      this.$refs.ygplczinput.value = "";
      document.getElementById("ygplczinputid").click();
    },

    gotodcsz() {
      this.$api
        .post("/orderExpressDelivery/enterpriseMore", this.tableData)
        .then(res => {
          console.log(res);
          console.log(res);
          let zs = `${this.$parent.$parent.$parent.weburl}${res.data}`;
          let a = document.createElement("a");
          a.href = zs; // href链接指向图片的地址
          a.download = zs; // 下载的图片的名称
          a.click(); // 触发a标签的单击事件
        })
        .catch(err => {
          console.log(err);
        });
    },

    //员工批量操作数据检验
    ygplczcheckData() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      console.log(this.ygplczobj[nametemp].yglist);
      if (this.ygplczobj[nametemp].yglist.length <= 0) {
        this.$message({
          message: "请选择上传文件",
          type: "warning"
        });
        return;
      }
      // for(let i in this.ygplczobj[nametemp].yglist){
      //   console.log(this.ygplczobj[nametemp].yglist[i])

      // }
      var body = {
        companyId:this.companyId,
        import:this.ygplczobj[nametemp].yglist
      };
      this.ygplczobj[nametemp].loading = true;
      this.ygplczobj[nametemp].loadingtext = "数据校验中,请稍后...";
      this.$api
        .post("/orderExpressDelivery/check", body)
        .then(res => {
          console.log(res);
          this.succaa = res.data;
          this.successSum = res.data.successSum;
          this.mistake = res.data.misSum;
          this.ygplczobj[nametemp].loading = false;
          this.ygplczobj[nametemp].loadingtext = "";
          if (res.code == 200) {
            this.ygplczobj[nametemp].drResult = res.data;
            this.ygplczobj[nametemp].active += 1;
          } else {
            this.$message.error(res.mag);
          }
        })
        .catch(err => {
          console.log(JSON.parse(err))
          this.ygplczobj[nametemp].loading = false;
          this.ygplczobj[nametemp].loadingtext = "";
          console.log(err);
          this.$message.error(err.mag);
        });
    },
    goback() {
      //返回
      this.$router.go(-1);
    },

    handleSizeChange(val) {
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;
      this.getmessage();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      this.getmessage();
      console.log(`当前页: ${val}`);
    }
  },
  watch: {}
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
</style>




