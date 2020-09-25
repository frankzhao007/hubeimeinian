<template>
  <div class="app-container">
    <!-- saleswelfarevoucher -->
    <el-page-header @back="goBack" content="员工福利劵金额配置">
    </el-page-header>
    <div class="saleswelfarevoucher_form">
      <el-form :label-width="isAll?'':'100px'" :inline="true" size="medium">
        <el-form-item label="企业：">
          <el-select v-model="companyvalue" :disabled="options.length == 1 ||isAll==false" placeholder="请选择" filterable>
            <el-option v-for="(item,index) in options" :key="index" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="isAll" class="saleswelfarevoucher">
      <!-- isAll -->
      <el-form :inline="true" size="medium">
        <el-form-item label="员工：">
          <el-button @click="xzygbtn">选择员工</el-button>
        </el-form-item>
        <el-form-item style="margin-left:30px;" label="统一增加金额：">
          <el-input v-model="amount" maxlength="15" clearable show-word-limit placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item v-if="amount!=''">
          {{changeMoneyToChinese(amount)}}
        </el-form-item>
        <!-- <el-form-item>
          <el-button @click="goWelfarevoucher()" type="primary">历史记录</el-button>
        </el-form-item> -->
      </el-form>
      <el-form :inline="true" size="medium">
        <el-form-item>
          <el-button @click="ConfirmAll()" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="Clear()" type="danger">批量清零</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-table :data="tableData" max-height="500px" style="width: 720px">
          <el-table-column prop="branch" label="部门">
          </el-table-column>
          <el-table-column prop="name" label="员工姓名">
          </el-table-column>
          <el-table-column label="剩余金额（元）">
            <template slot-scope="scope">
              <span v-if="scope.row.benefits>0">{{scope.row.benefits/100}}</span>
              <span v-else-if="scope.row.benefits==0">{{scope.row.benefits}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="170">
            <template slot-scope="scope">
              <el-button size="mini" @click="Clear(scope.row)">清零</el-button>
              <el-button size="mini" type="danger" @click="ifHandleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination class="saleswelfarevoucher_pagination" v-if="tableData.length>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 40, 60, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="tableCopyTableList.length">
        </el-pagination> -->
      </div>
      <!-- 弹窗 -->
      <el-dialog title="选择员工" :visible.sync="dialog" width="1200px">
        <div v-if="true">
          <el-form :inline="true" :model="seekEmployees" :rules="seekEmployeesrules" label-position='right' label-width="120px" size="medium">
            <el-form-item label="婚否：">
              <!-- <el-input v-model="seekEmployees.isMarital" placeholder="请填写" style="width:200px"></el-input> -->
              <el-select v-model="seekEmployees.isMarital" placeholder="" style="width:200px">
                <el-option label="全部" value=""></el-option>
                <el-option label="已婚" value="已婚"></el-option>
                <el-option label="未婚" value="未婚"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <!-- <el-input v-model="seekEmployees.sex" placeholder="请填写" style="width:200px"></el-input> -->
              <el-select v-model="seekEmployees.sex" placeholder="" style="width:200px">
                <el-option label="全部" value=""></el-option>
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：">
              <el-input v-model="seekEmployees.branch" placeholder="请填写" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="seekEmployees.name" placeholder="请填写" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="年龄段：" prop="startAge">
              <el-input v-model="seekEmployees.startAge" placeholder="开始年龄" style="width:100px" @input="startAgeinput()"></el-input>
              <!-- <el-input v-model="seekEmployees.endAge" placeholder="结束年龄" style="width:95px"></el-input> -->
            </el-form-item>
            <el-form-item prop="endAge">
              <!-- <el-input v-model="seekEmployees.startAge" placeholder="开始年龄" style="width:100px"></el-input> -->
              <el-input v-model="seekEmployees.endAge" placeholder="结束年龄" style="width:95px" @input="endAgeinput()"></el-input>
            </el-form-item>
            <el-form-item label="是否有福利金：">
              <!-- <el-input v-model="seekEmployees.isMarital" placeholder="请填写" style="width:200px"></el-input> -->
              <el-select v-model="seekEmployees.isBenefits" placeholder="" style="width:200px">
                <el-option label="全部" value=""></el-option>
                <el-option label="账户有福利金" value="y"></el-option>
                <el-option label="账户无福利金" value="n"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后台标记字段：">
              <el-select v-model="seekEmployees.sign" placeholder="请选择" size="medium" style="width:200px;" v-loading="singload">
                <el-option v-for="(item,index) in singlist" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" @click="seekEmployeesbtn">搜 索</el-button>
              <!-- <el-button type="primary" @click="">新 增</el-button> -->
            </el-form-item>

            <!-- 数据表格 -->
            <div>
              <el-table :data="transferdata" style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable" :row-key="getRowKeys" v-loading="transferloading">
                <el-table-column type="selection" width="55" :reserve-selection="true">
                </el-table-column>
                <el-table-column prop="name" label="员工姓名"></el-table-column>
                <el-table-column label="证件类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span v-if="scope.row.cardType=='1'">身份证</span>
                    <span v-else-if="scope.row.cardType=='2'">港澳台通行证</span>
                    <span v-else="scope.row.cardType=='3'">护照</span>
                  </template>
                </el-table-column>
                <el-table-column prop="identity" label="证件号" width="200px">
                </el-table-column>
                <el-table-column prop="branch" label="部门"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="Age" label="年龄"></el-table-column>
                <el-table-column prop="isMarital" label="婚否"></el-table-column>
                <el-table-column prop="phone" label="手机号" width="120px"></el-table-column>
                <el-table-column prop="Sign" label="后台标记字段" width="150px">
                </el-table-column>
                <el-table-column prop="benefits" label="福利金">
                  <template slot-scope="scope">
                    {{scope.row.benefits/100}}
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin:20px 0 50px 0 ">
                <el-pagination style="float:right" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="tablexzyg.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tablexzyg.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tablexzyg.total">
                </el-pagination>
              </div>
            </div>

          </el-form>
        </div>

        <div class="saleswelfarevoucher_transfer" v-if="false">
          <el-transfer v-loading="transferloading" v-model="transfervalue" :data="transferdata" :titles="['未选员工', '已选员工']" filterable filter-placeholder="请输入关键字">
          </el-transfer>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="determine()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <div v-else class="saleswelfarevoucher">
      <!-- noAll -->
      <el-form label-width="100px" size="medium">
        <el-form-item label="部门：">
          {{userInfo.branch}}
        </el-form-item>
        <el-form-item label="员工：">
          {{userInfo.name}}
        </el-form-item>
      </el-form>
      <el-form :inline="true" label-width="100px" size="medium">
        <el-form-item label="福利金金额：" style="min-width:200px">
          {{userInfo.benefits/100}}元
        </el-form-item>
        <el-form-item>
          <el-button @click="Clear('row')" type="danger">清零</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="Add()" type="primary">增加福利金</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="viewHistory()" type="primary">查看历史</el-button>
        </el-form-item>
      </el-form>
      <!-- 弹窗 -->
      <div>
        <el-dialog title="历史记录" :visible.sync="dialogTableVisible">
          <el-table :data="gridData" height="600px">
            <el-table-column property="updateTime" label="操作日期"></el-table-column>
            <el-table-column label="福利金金额">
              <template slot-scope="scope">
                <span v-if="scope.row.empSpAmount>0" style="color:#67C23A;">+{{scope.row.empSpAmount/100}}</span>
                <span v-else-if="scope.row.empSpAmount==0">{{scope.row.empSpAmount}}</span>
                <span v-else-if="scope.row.empSpAmount<0" style="color:#F56C6C;">{{scope.row.empSpAmount/100}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <!-- 弹窗 -->
      <div v-if="dialogFormVisible" class="saleswelfarevoucher_amount_dialog">
        <el-dialog title="添加福利金金额" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form" :rules="formrules" ref="form" size="medium" class="demo-ruleForm">
            <el-form-item label="" prop="Amount">
              <el-input v-model="form.Amount" maxlength="15" show-word-limit></el-input>
            </el-form-item>
            <el-form-item v-if="form.Amount!=''">
              {{changeMoneyToChinese(form.Amount)}}
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "saleswelfarevoucher",
  components: {},
  data() {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("金额不能为空"));
      }
      if (!/^[0-9]+(.[0-9]{2})?$/.test(value)) {
        return callback(new Error("请输入整数或保留两位小数的数字！"));
      }
      if (value == 0) {
        return callback(new Error("添加金额必须大于0！"));
      }
      if (value.length > 15) {
        return callback(new Error("不能超过15位字符"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (Number(value) < 0 || Number(value) > 200) {
        callback(new Error("年龄段0~200"));
      } else {
        callback();
      }
    };
    return {
      singlist: ["全部"], //标记下拉框
      singload: false,
      getRowKeys(row) {
        return row.userId;
      },
      tablexzyg: {
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      seekEmployees: {
        isMarital: "",
        sex: "",
        startAge: "",
        endAge: "",
        isBenefits: "",
        name: ""
      },
      seekEmployeesrules: {
        startAge: [{ validator: validatePass, trigger: "change" }],
        endAge: [{ validator: validatePass, trigger: "change" }]
      },
      isAll: Boolean,
      id: String,
      options: [],
      companyvalue: "",
      amount: "",
      tableData: [],
      transferdata: [],
      transfervalue: [],
      transferloading: false,
      dialog: false,
      dialogTableVisible: false,
      userInfo: {
        benefits: ""
      },
      // 历史数据
      gridData: [],
      tableCopyTableList: [],
      currentPage: 1,
      size: 20,
      dialogFormVisible: false,
      form: {
        Amount: ""
      },
      formrules: {
        Amount: [{ required: true, validator: check, trigger: "change" }]
      }
    };
  },
  created() {
    if (!this.$route.query.id) {
      this.isAll = true;
    } else {
      this.id = this.$route.query.id;
      this.company = this.$route.query.company;
      console.log("this.$route.query.company :", this.$route.query.company);
      console.log("this.id :", this.id);
      this.singleInfo();
      this.isAll = false;
    }
    // 获取选择框数据
    this.getSelectionData();
  },
  mounted() {},
  methods: {
    getsign() {
      //获取标记下拉框
      this.singload = true;
      this.singlist = ["全部"];
      this.$api
        .get("/employee/findSignInfo", { company: this.companyvalue })
        .then(res => {
          this.singlist = this.singlist.concat(res.data.signs);
          console.log(res);
          this.singload = false;
        })
        .catch(err => {
          this.singload = false;
        });
    },
    startAgeinput() {
      this.seekEmployees.startAge = this.seekEmployees.startAge.replace(
        /[^\.\d]/g,
        ""
      );
      this.seekEmployees.startAge = this.seekEmployees.startAge.replace(
        ".",
        ""
      );
    },
    endAgeinput() {
      this.seekEmployees.endAge = this.seekEmployees.endAge.replace(
        /[^\.\d]/g,
        ""
      );
      this.seekEmployees.endAge = this.seekEmployees.endAge.replace(".", "");
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.tablexzyg.currentPage = 1;
      this.tablexzyg.pagesize = val;
      this.findEmployees();
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.tablexzyg.currentPage = val;
      this.findEmployees();
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      console.log(val);
      this.selecttableyuangong = val;
    },
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      console.log(
        "/***********************/",
        this.$store.getters.getRoleInfo.AccountType
      );
      if (
        this.$store.getters.getRoleInfo.AccountType == "2" ||
        this.$store.getters.getRoleInfo.AccountType == "0"
      ) {
        this.$api
          .get("account/pullOrg2", {
            AccountType: this.$store.getters.getRoleInfo.AccountType,
            AccountName: this.$store.getters.getRoleInfo.AccountName
          })
          .then(res => {
            console.log(res);
            // this.ygplczobj.companyList = [];
            var Name = [];
            res.data.map(item => {
              if (item.AccountType == "3") {
                item.Name.map(temp => {
                  Name.push(temp);
                });
              }
            });
            for (let i = 0; i < Name.length; i++) {
              this.options.push({
                value: Name[i]
                // value: Mobile[i],
                // label: Name[i]
              });
            }
            console.log("this.options :", this.options);
            if (this.options.length == 1) {
              this.companyvalue = this.options[0].value;
              console.log("this.companyvalue :", this.companyvalue);
            }
            if (this.isAll == false) {
              this.companyvalue = this.company;
            }
          });
        // var Mobile = this.$store.getters.getBranchOfficeMobile.Mobile;
        // var Name = this.$store.getters.getBranchOfficeMobile.Name;
        // console.log("Name :", JSON.stringify(Name));
        // console.log("Mobile :", JSON.stringify(Mobile));
      } else if (this.$store.getters.getRoleInfo.AccountType == "3") {
        console.log("企业账号", this.$store.getters.getRoleInfo);
        this.options.push({
          value: this.$store.getters.getRoleInfo.AccountName
          // label: this.$store.getters.getRoleInfo.AccountName
          // label: this.$store.getters.getRoleInfo.Id
        });
        console.log("this.options", this.options);
        this.companyvalue = this.$store.getters.getRoleInfo.AccountName;
        console.log("this.companyvalue", this.companyvalue);
      }
    },
    // 单个员工方法--------------------
    // 单个员工信息
    singleInfo() {
      this.$api
        .get("/employee/findEmployees", {
          userId: this.id
        })
        .then(res => {
          console.log("res :", res);
          this.userInfo = res.data.data[0];
          console.log("this.userInfo :", this.userInfo);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 单个员工添加福利券金额
    Add() {
      console.log("Add");
      this.form.Amount = "";
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addPost(this.form.Amount);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    inputValidator(val) {
      if (!/^[0-9]+(.[0-9]{2})?$/.test(val)) {
        return "请输入整数或保留两位小数的数字！";
      }
      if (val == 0) {
        return "添加金额必须大于0！";
      }
    },
    addPost(val) {
      var tempList = [];
      tempList.push(this.id);
      console.log("addPost(val)", val);
      this.$api
        .post("/sales/insertWelfareVoucher", {
          type: "10011001",
          uids: tempList,
          company: this.companyvalue,
          amountF: Number(val)
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "增加成功!"
          });
          this.dialogFormVisible = false;
          this.singleInfo();
        })
        .catch(err => {
          this.$message.error(err.msg);
          console.log("err", err);
        });
    },
    // 查看历史记录
    viewHistory() {
      this.dialogTableVisible = true;
      this.$api
        .get("/sales/findWelfareVoucher", {
          type: "1100011",
          company: this.company,
          uid: this.id,
          page: 1,
          pageSize: 99999
        })
        .then(res => {
          console.log("res :", res.data);
          this.gridData = res.data.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 批量操作员工--------------------
    // 查询员工列表
    xzygbtn() {
      if (this.companyvalue == "") {
        this.$message.error("请选择企业！");
        return;
      }
      this.dialog = true;
      this.transferloading = true;
      this.tablexzyg.currentPage = 1;
      this.tablexzyg.pagesize = 10;
      this.selecttableyuangong = [];
      setTimeout(() => {
        this.findEmployees();
        this.$refs.multipleTable.clearSelection();
      }, 1);
      setTimeout(() => {
        this.tableData.map(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
          // console.log(row);
          // this.transferdata.map(item => {
          //   if (item.userId == row.userId) {
          //     console.log(111111111);
          //     this.$refs.multipleTable.toggleRowSelection(item);
          //   }
          // });
        }, 1);
      });
      this.getsign();
    },
    seekEmployeesbtn() {
      this.findEmployees();
    },
    findEmployees() {
      this.$api
        .get("/employee/findEmployees", {
          company: this.companyvalue,
          name: this.seekEmployees.name,
          isMarital: this.seekEmployees.isMarital,
          sex: this.seekEmployees.sex,
          startAge: this.seekEmployees.startAge,
          endAge: this.seekEmployees.endAge,
          isBenefits: this.seekEmployees.isBenefits,
          branch: this.seekEmployees.branch,
          sign: this.seekEmployees.sign,
          page: this.tablexzyg.currentPage,
          pageSize: this.tablexzyg.pagesize
        })
        .then(res => {
          console.log(res.data.data);
          if (res.data.data.length == 0) {
            this.transferdata = [];
            this.transferloading = false;
            return;
          }
          // 给穿梭框加label和key
          this.tablexzyg.total = res.data.count;
          var resList = res.data.data;
          // resList.forEach((res, index) => {
          //   resList[index].label =
          //     res.branch + "-" + res.name + "-" + res.benefits / 100 + "元";
          //   resList[index].key = index;
          // });
          console.log("resList :", resList);
          // 穿梭框数据
          this.transferdata = resList;
          this.transferloading = false;
          // this.StafftableData = res.data.data;
          // this.countStafft = res.data.count;
        })
        .catch(err => {
          console.log("err", err);
          this.transferloading = false;
        });
    },
    // 校验金额
    check() {},
    // 获取最新数据
    updateData(uids) {
      this.$api
        .get("/employee/findEmployees", {
          company: this.companyvalue,
          page: 1,
          pageSize: 99999
        })
        .then(res => {
          var tempData = res.data.data;
          for (let i = 0; i < this.transferdata.length; i++) {
            const transferdata = this.transferdata[i];
            for (let j = 0; j < tempData.length; j++) {
              const temp = tempData[j];
              if (transferdata.userId == temp.userId) {
                this.transferdata[i].label =
                  temp.branch +
                  "-" +
                  temp.name +
                  "-" +
                  temp.benefits / 100 +
                  "元";
                console.log(
                  "this.transferdata[i].label",
                  this.transferdata[i].label
                );
              }
            }
          }

          for (let i = 0; i < this.tableData.length; i++) {
            const tableData = this.tableData[i];
            for (let j = 0; j < tempData.length; j++) {
              const temp = tempData[j];
              if (tableData.userId == temp.userId) {
                this.tableData[i].benefits = temp.benefits;
                console.log(
                  "this.tableData[i].benefits",
                  this.tableData[i].benefits
                );
              }
            }
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 统一配置金额
    ConfirmAll() {
      console.log("统一配置金额");
      if (this.tableData.length == 0) {
        this.$message.error("请先选择员工！");
        return;
      }
      if (!/^[0-9]+(.[0-9]{2})?$/.test(this.amount)) {
        this.$message.error(
          "请输入整数或保留两位小数的数字！例如：1000或999.99"
        );
        return;
      }
      if (this.amount == 0) {
        this.$message.error("添加金额必须大于0！");
        return;
      }
      if (this.amount == "") {
        this.$message.error("请输入金额！");
        return;
      }
      var tempList = [];
      this.tableData.forEach(element => {
        tempList.push(element.userId);
      });
      console.log("tempList", tempList);
      this.$api
        .post("/sales/insertWelfareVoucher", {
          type: "10011001",
          uids: tempList,
          company: this.companyvalue,
          amountF: Number(this.amount)
        })
        .then(res => {
          this.amount = "";
          this.updateData(tempList);
          this.$message({
            type: "success",
            message: "添加成功"
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
          console.log("err", err);
        });
    },
    // 弹窗确定
    determine() {
      console.log(this.transferdata);
      console.log(this.transfervalue);
      this.tableData = JSON.parse(JSON.stringify(this.selecttableyuangong));
      // var tempdata = JSON.parse(JSON.stringify(this.transferdata));
      // var tempvalue = JSON.parse(JSON.stringify(this.transfervalue));
      // tempdata = tempdata.filter(item => tempvalue.indexOf(item.key) >= 0);
      // this.tableData = tempdata;
      this.dialog = false;
      console.log("this.tableData", this.tableData);
    },
    Clear(row) {
      var tempList = [];
      if (row) {
        if (this.isAll) {
          console.log("row.userId :", row.userId);
          tempList.push(row.userId);
        } else {
          tempList.push(this.id);
        }
      } else {
        this.tableData.forEach(element => {
          tempList.push(element.userId);
        });
      }
      console.log("tempList :", tempList);
      this.$confirm("此操作将清空员工福利券金额, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.clearPost(tempList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空"
          });
        });
    },
    clearPost(uids) {
      console.log("clearPost(val)");
      this.$api
        .post("/sales/insertWelfareVoucher", {
          type: "10010001",
          company: this.companyvalue,
          uids: uids
        })
        .then(res => {
          if (this.isAll) {
            this.updateData(uids);
          } else {
            this.singleInfo();
          }
          this.$message({
            type: "success",
            message: "清空成功!"
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
          console.log("err", err);
        });
    },
    // 删除提示
    ifHandleDelete(index, row) {
      this.$confirm(
        "此操作将删除配置员工,但不影响其福利劵金额, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.handleDelete(index, row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除
    handleDelete(index, row) {
      console.log("index", index);
      console.log("row", row.key);
      this.tableData.splice(index, 1);
      for (let i = 0; i < this.transfervalue.length; i++) {
        const element = this.transfervalue[i];
        if (element == row.key) {
          this.transfervalue.splice(i, 1);
        }
      }
      // this.transfervalue.splice(row.key, 1);
      this.$message({
        type: "success",
        message: "删除成功"
      });
    },
    goWelfarevoucher() {
      console.log("goWelfarevoucher()");
      this.$router.push("/enterprisemanagement/welfarevoucher?id=" + val.id);
    },
    // 返回
    goBack() {
      this.$router.go(-1);
      console.log("go back");
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.tableData;
    // },
    // 页数改变事件
    handleSizeChange(size) {
      this.size = size;
      this.tableData = this.paging(size, this.currentPage);
    },
    // 页码改变事件
    handleCurrentChange(current) {
      this.currentPage = current;
      this.tableData = this.paging(this.size, current);
    },
    // 本地分页的方法
    paging(size, current) {
      const tableList = JSON.parse(JSON.stringify(this.tableCopyTableList));
      const tablePush = [];
      tableList.forEach((item, currentPage) => {
        if (
          size * (current - 1) <= currentPage &&
          currentPage <= size * current - 1
        ) {
          tablePush.push(item);
        }
      });
      return tablePush;
    },
    // 数字转大写汉字
    // 数字转大写汉字
    changeMoneyToChinese(money) {
      var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      ); //汉字的数字
      var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
      var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
      var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
      //var cnInteger = "整"; //整数金额时后面跟的字符
      var cnIntLast = "元"; //整型完以后的单位
      var maxNum = 999999999999999.9999; //最大处理的数字
      var IntegerNum; //金额整数部分
      var DecimalNum; //金额小数部分
      var ChineseStr = ""; //输出的中文金额字符串
      var parts; //分离金额后用的数组，预定义
      var zeroCount;
      var IntLen;
      var decLen;
      if (money == "") {
        return "";
      }
      money = parseFloat(money);
      if (money >= maxNum) {
        $.alert("超出最大处理数字");
        return "";
      }
      if (money == 0) {
        //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
        ChineseStr = cnNums[0] + cnIntLast;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
      }
      money = money.toString(); //转换为字符串
      if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = "";
      } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
      }
      if (parseInt(IntegerNum, 10) > 0) {
        //获取整型部分转换
        zeroCount = 0;
        IntLen = IntegerNum.length;
        for (var i = 0; i < IntLen; i++) {
          var n = IntegerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              ChineseStr += cnNums[0];
            }
            zeroCount = 0; //归零
            ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            ChineseStr += cnIntUnits[q];
          }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
      }
      if (DecimalNum != "") {
        //小数部分
        decLen = DecimalNum.length;
        for (i = 0; i < decLen; i++) {
          n = DecimalNum.substr(i, 1);
          if (n != "0") {
            ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (ChineseStr == "") {
        //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
        ChineseStr += cnNums[0] + cnIntLast;
      } /* else if( DecimalNum == '' ){ 
        ChineseStr += cnInteger; 
        ChineseStr += cnInteger; 
    } */
      return ChineseStr;
    }
  },
  watch: {
    companyvalue: function(n, o) {
      console.log("companyvalue改变");
      this.tableData = [];
      this.transferdata = [];
      this.transfervalue = [];
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.saleswelfarevoucher_form {
  margin: 20px 0 0 0;
}
.saleswelfarevoucher {
  margin: 0;
}
.saleswelfarevoucher_pagination {
  margin-top: 20px;
  text-align: right;
}
.saleswelfarevoucher_amount_dialog {
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
}
</style>