<template>
  <!-- 配置套餐 -->
  <div class="app-container">
    <div>
      <div class="configurationpackage_wrap">
        <div class="configurationpackage_header">
          <h3> <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i> 企业</h3>
          <el-divider></el-divider>
        </div>
        <el-form :model="packageInfo" :rules="packageInfoRules" ref="form" label-position="left" label-width="80px" size="medium" class="demo-ruleForm">
          <el-form-item label="企业：" prop="fromCompany">
            <el-select v-model="packageInfo.company" @change="packageInfoCompany()" :disabled="companyData.length == 0" filterable placeholder="请选择企业" size="medium" style="width:250px;">
              <el-option v-for="(item,inex) in companyData" :key="item.index" :label="item.index" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form v-if="type != 0" label-width="80px" size="medium" label-position="left">
          <el-form-item label="部门：">
            {{packageInfo.branch}}
          </el-form-item>
          <el-form-item label="员工：">
            {{packageInfo.name}}
          </el-form-item>
        </el-form>
        <el-form label-width="80px" size="medium" label-position="left">
          <el-form-item label="配置套餐：">
            <el-button @click="ChoosePackage()" :disabled="packageInfo.company==''" plain>选择套餐</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="configurationpackage_block">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="套餐名称" prop="goodName">
          </el-table-column>
          <el-table-column label="套餐价格" prop="price">
          </el-table-column>
          <el-table-column label="付费方式" prop="payMethod">
            <!-- <template>
              公费
            </template> -->
          </el-table-column>
          <el-table-column label="限购/人/件">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.count" :min="1" :max="5" size="small" style="width:80%;"></el-input-number>
              <!-- <el-input placeholder="请输入内容" v-model="scope.row.count" clearable size="medium" style="width:100%;">
              </el-input> -->
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="DeletePackage(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="type == 0" class="configurationpackage_wrap">
        <el-form :inline="true" size="medium" label-position="left">
          <el-form-item label="员工：">
            <el-button @click="ChooseEmployee" :disabled="packageInfo.company==''||!tableData||tableData.length<=0" plain>选择员工</el-button>
          </el-form-item>
          <el-form-item label="统一添加福利金：">
            <el-input style="width:200px" v-model="amount"></el-input>
            <el-button style="margin-left:20px" type="primary" @click="ConfirmAll()">确认添加</el-button>
            <el-button @click="AllClear()" type="danger">批量清零</el-button>
          </el-form-item>
        </el-form>
        <div style="margin:20px 0">当前选择员工数：{{dynamicTags.length||0}}个</div>
      </div>

      <div v-if="type == 0" class="configurationpackage_block">
        <!-- <el-table :data="dynamicTags" style="width: 100%" max-height="500">
          <el-table-column prop="branch" label="部门"></el-table-column>
          <el-table-column prop="name" label="员工姓名"></el-table-column>
          <el-table-column label="剩余金额（元）">
            <template slot-scope="scope">
              <span v-if="scope.row.benefits>0">{{scope.row.benefits/100}}</span>
              <span v-else-if="scope.row.benefits==0">{{scope.row.benefits}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="oneClear(scope.row)">清零</el-button>
              <el-button type="danger" size="mini" @click="handleClose(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table> -->

        <div style="height: 100%;width: 780px" id="plTable">
          <div style="height: 480px;width: 100%">
            <pl-table :datas="dynamicTags" big-data-checkbox header-drag-style use-virtual :row-height="55" :pagination-show='false'>
              <pl-table-column prop="branch" label="部门" :resizable='false' show-overflow-tooltip />
              <pl-table-column prop="name" label="员工姓名" :resizable='false' show-overflow-tooltip />
              <pl-table-column label="剩余金额（元）" :resizable='false' show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.benefits>0">{{scope.row.benefits/100}}</span>
                  <span v-else-if="scope.row.benefits==0">{{scope.row.benefits}}</span>
                </template>
              </pl-table-column>
              <pl-table-column prop="date" label="操作" :resizable='false' show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button size="mini" @click="oneClear(scope.row)">清零</el-button>
                  <el-button type="danger" size="mini" @click="handleClose(scope.row)">删除</el-button>
                </template>
              </pl-table-column>
            </pl-table>
          </div>
        </div>
        <!-- <el-tag :key="index" v-for="(tag,index) in dynamicTags" @close="handleClose(tag)" effect="plain" type="info" color="#ffffff" class="configurationpackage_tag" closable>
          {{tag.name}}
        </el-tag> -->
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- 选择套餐弹窗 -->
    <div v-if="dialogPackage">
      <el-dialog title="选择套餐" :visible.sync="dialogPackage" width="600px">
        <el-form :inline="true" :model="seekgoods" label-position='right' label-width="120px" size="medium">
          <el-form-item label="付费方式：">
            <el-select v-model="seekgoods.payMethod" placeholder="" style="width:200px">
              <el-option label="全部" value=""></el-option>
              <el-option label="公费" value="公费"></el-option>
              <el-option label="自费" value="自费"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="primary" @click="seekgoodslist">搜 索</el-button>
          </el-form-item>
        </el-form>
        <el-table :row-key="getRowKeysPackage" ref="PackagetableDataTable" :data="PackagetableData" tooltip-effect="dark" style="width: 100%" @select="PackageSelectionChange" @selection-change="PackageSelectionChange1">
          <el-table-column type="selection" :reserve-selection="true" width="55">
          </el-table-column>
          <el-table-column prop="goodname" label="套餐名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="创建人" show-overflow-tooltip prop="CreateBy" width="100px">
          </el-table-column>
          <el-table-column label="付费方式" show-overflow-tooltip prop="payMethod" width="100px">
          </el-table-column>
        </el-table>
        <div v-if="$route.query.type==0" class="zindex"></div>
        <!-- 分页 -->
        <!-- <div class="block">
          <el-pagination :page-sizes="[10, 20, 50, 100]" @size-change="PackageSizeChange" @current-change="PackageCurrentChange" :current-page="InquirePackage.page" :page-size=InquirePackage.pageSize layout="total, sizes, prev, pager, next, jumper" :total="countPackage"></el-pagination>
        </div> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPackage = false">取 消</el-button>
          <el-button type="primary" @click="determinePackage()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 员工弹窗 -->
    <div v-if="dialogStaff" class="selectstaff_table">
      <el-dialog title="选择员工" :visible.sync="dialogStaff" width="1200px" top="5vh">
        <!-- 查询 -->
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
            <el-input v-model="seekEmployees.startAge" placeholder="开始年龄" style="width:90px" @input="startAgeinput"></el-input>
            <!-- <el-input v-model="seekEmployees.endAge" placeholder="结束年龄" style="width:95px" @input="endAgeinput"></el-input> -->
          </el-form-item>

          <el-form-item prop="endAge">
            <!-- <el-input v-model="seekEmployees.startAge" placeholder="开始年龄" style="width:100px" @input="startAgeinput"></el-input> -->
            <el-input v-model="seekEmployees.endAge" placeholder="结束年龄" style="width:95px" @input="endAgeinput"></el-input>
          </el-form-item>

          <el-form-item label="后台标记字段：">
            <el-select v-model="seekEmployees.sign" placeholder="请选择" size="medium" style="width:200px;" v-loading="singload">
              <el-option v-for="(item,index) in singlist" :key="item.index" :label="item.index" :value="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="float:right">
            <el-button type="primary" @click="findEmployees">搜 索</el-button>
            <!-- <el-button type="primary" @click="">新 增</el-button> -->
          </el-form-item>
        </el-form>
        <el-table v-loading='selectstaffloading' :row-key="getRowKeysStafft" ref="StafftableDataTable" max-height="500" :data="StafftableData" tooltip-effect="dark" style="width: 100%" @selection-change="StaffSelectionChange">
          <el-table-column type="selection" :reserve-selection="true" width="55">
          </el-table-column>
          <el-table-column prop="name" label="员工姓名" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="证件类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.cardType=='1'">身份证</span>
              <span v-else-if="scope.row.cardType=='2'">港澳台通行证</span>
              <span v-else="scope.row.cardType=='3'">护照</span>
            </template>
          </el-table-column>

          <el-table-column prop="identity" label="证件号" width="200px">
          </el-table-column>
          <el-table-column prop="branch" label="部门" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="Age" label="年龄" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="isMarital" label="婚否" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="150px">
          </el-table-column>
          <el-table-column prop="Sign" label="后台标记字段" width="150px">
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="height:60px">
          <div style="margin:20px 0;float:left">已选择员工：{{StaffSelection.length||0}}个</div>
          <el-pagination style="float:right;margin:15px 0;" :page-sizes="[10, 20, 50, 100,500]" @size-change="StaffSizeChange" @current-change="StaffCurrentChange" :current-page="InquireStafft.page" :page-size="InquireStafft.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="countStafft"></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStaff = false">取 消</el-button>
          <el-button type="primary" @click="determineStaff()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="configurationpackage_footer">
      <el-button plain @click="$router.back(-1);">取 消</el-button>
      <el-button type="primary" @click="submitForm()">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "configurationpackage",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (Number(value) < 0 || Number(value) > 200) {
        callback(new Error("年龄段0~200"));
      } else {
        callback();
      }
    };
    return {
      seekgoods: {
        payMethod: ""
      },
      singlist: ["全部"], //标记下拉框
      singload: false,

      selectstaffloading: false,
      //批量配置福利金金额
      isAll: false,
      oneitem: "",
      amount: "",
      seekEmployeesrules: {
        startAge: [{ validator: validatePass, trigger: "change" }],
        endAge: [{ validator: validatePass, trigger: "change" }]
      },
      seekEmployees: {
        isMarital: "",
        sex: "",
        startAge: "",
        endAge: "",
        isBenefits: "",
        name: "",

        sign: "全部"
      },
      packageInfo: {
        company: "",
        branch: "",
        name: "",
        phone: ""
      },
      companyData: [],
      packageInfoRules: {
        company: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      InquirePackage: {
        page: 1,
        pageSize: 999999
      },
      InquireStafft: {
        company: "",
        branch: "全部",
        goodname: "",

        payMethod: "",
        goodType: "",

        page: 1,
        pageSize: 10
      },
      countStafft: 0,
      countPackage: 0,
      type: this.$route.query.type,
      // 员工tag
      dynamicTags: [],
      // 选中后套餐表格
      tableData: [],
      // 弹窗表格数据
      PackagetableData: [],
      StafftableData: [],
      // 部门下拉框
      SubsidiaryOptions: ["全部"],
      // 弹窗
      dialogPackage: false,
      dialogStaff: false,
      // 选中数据
      PackageSelection: [],
      StaffSelection: [],
      // 复现使用的临时数据
      stafftempList: [],
      packagetempList: [],
      getRowKeysStafft(row) {
        return row.userId;
      },
      getRowKeysPackage(row) {
        return row.goodid;
      }
    };
  },
  created() {
    this.getSelectionData();
    if (this.$route.query.userId) {
      this.$api
        .get("/employee/findGenMemberById", {
          userId: this.$route.query.userId
        })
        .then(res => {
          if (res.code == 200) {
            var temp = res.data;
            this.packageInfo.fromCompany = temp.fromCompany;
            this.packageInfo.name = temp.name;
            this.packageInfo.branch = temp.branch;
            this.packageInfo.company = temp.placeCompanyName;
            this.packageInfo.phone = temp.phone;
            this.packageInfo.userId = temp.userId;
            this.InquireStafft.company = temp.placeCompanyName;
            console.log(this.InquireStafft.company);
            this.companyData = [];
            if (this.$route.query.type == 2) {
              console.log("type == 2 编辑", temp.publicExpenses);
              this.tableData = temp.publicExpenses;
              this.packagetempList = JSON.parse(
                JSON.stringify(temp.publicExpenses)
              );
            }
          }
        });
    }
  },
  mounted() {},
  methods: {
    seekgoodslist() {
      this.InquireStafft.page = 1;
      this.findEnterMeal();
    },
    //批量清零
    getsign() {
      //获取标记下拉框
      this.singload = true;
      this.singlist = ["全部"];
      this.$api
        .get("/employee/findSignInfo", { company: this.packageInfo.company })
        .then(res => {
          this.singlist = this.singlist.concat(res.data.signs);
          console.log(res);
          this.singload = false;
        })
        .catch(err => {
          this.singload = false;
        });
    },

    AllClear() {
      this.$confirm("此操作将清空员工福利券金额, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var uids = [];
          this.dynamicTags.forEach(element => {
            uids.push(element.userId);
          });
          this.isAll = true;
          this.clearPost(uids);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空"
          });
        });
    },
    oneClear(row) {
      this.$confirm("此操作将清空员工福利券金额, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var uids = [row.userId];
          this.isAll = false;
          this.oneitem = row;
          this.clearPost(uids);
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
          company: this.packageInfo.company,
          uids: uids
        })
        .then(res => {
          if (this.isAll) {
            // this.updateData(uids);
            this.dynamicTags.map((item, index) => {
              this.dynamicTags[index].benefits = 0;
            });
          } else {
            this.dynamicTags.map((item, index) => {
              // this.dynamicTags[index].benefits = 0;
              if (item.userId == this.oneitem.userId) {
                this.dynamicTags[index].benefits = 0;
              }
            });
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
    // 统一配置金额
    ConfirmAll() {
      console.log("统一配置金额");
      if (this.dynamicTags.length == 0) {
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
      this.dynamicTags.forEach(element => {
        tempList.push(element.userId);
      });
      console.log("tempList", tempList);
      this.$api
        .post("/sales/insertWelfareVoucher", {
          type: "10011001",
          uids: tempList,
          company: this.packageInfo.company,
          amountF: Number(this.amount)
        })
        .then(res => {
          // this.updateData(tempList);
          console.log(this.dynamicTags);
          this.dynamicTags.map((item, index) => {
            console.log(this.dynamicTags[index].benefits);
            console.log(this.amount);
            this.dynamicTags[index].benefits =
              Number(this.dynamicTags[index].benefits) +
              Number(this.amount) * 100;
          });
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
    // 确认提交校验
    submitForm() {
      if (this.packageInfo.company == "") {
        this.$message.error("请选择企业");
        return;
      }
      // if (this.tableData.length == 0) {
      //   this.$message.error("请选择套餐");
      //   return;
      // }
      console.log(this.$route.query.val);

      if (this.$route.query.userId) {
        console.log("单个员工");
        console.log(this.packageInfo);

        let body = {
          UserIds: [this.packageInfo.userId],
          publicExpenses: [],
          company: this.packageInfo.company
        };
        // body.phone[0] = this.packageInfo.phone;
        for (let i = 0; i < this.tableData.length; i++) {
          const element = this.tableData[i];
          console.log(element);
          body.publicExpenses.push({
            goodId: element.goodId,
            goodName: element.goodName,
            count: Number(element.count),
            price: element.price,
            payMethod: element.payMethod,
            goodType: element.goodType
          });
        }
        // 请求服务器
        this.updataPubMealPost(body);
      } else {
        console.log("多个员工");
        if (this.StaffSelection.length == 0) {
          this.$message.error("请选择员工");
          return;
        }
        let body = {
          UserIds: [],
          publicExpenses: [],
          IsAllUp: "Y",
          company: this.packageInfo.company
        };
        for (let i = 0; i < this.StaffSelection.length; i++) {
          const element = this.StaffSelection[i];
          console.log(element);

          body.UserIds.push(element.userId);
        }

        for (let i = 0; i < this.tableData.length; i++) {
          const element = this.tableData[i];
          console.log(element);
          body.publicExpenses.push({
            goodId: element.goodId,
            goodName: element.goodName,
            count: Number(element.count),
            price: element.price,

            payMethod: element.payMethod,
            goodType: element.goodType
          });
        }
        // 请求服务器
        this.updataPubMealPost(body);
      }
    },
    updataPubMealPost(body) {
      console.log(body);
      this.$api
        .post("/employee/updataPubMeal", body)
        .then(res => {
          console.log(res.data);
          this.$message.success("提交成功！");
          this.$router.push("/staffmanagement/stafflist");
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.msg);
        });
    },
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      if (this.$store.getters.getRoleInfo.AccountType == "0") {
        // 企业
        this.companyData = this.$store.getters.getEnterprise;
        console.log(this.companyData);
      } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
        // 企业
        this.companyData = this.$store.getters.getEnterprise;
      } else if (this.$store.getters.getRoleInfo.AccountType == "3") {
        this.companyData = [];
        // 企业
        this.packageInfo.company = this.$store.getters.getRoleInfo.AccountName;
      }
    },
    // 获取部门数据
    getBranch() {
      this.SubsidiaryOptions = ["全部"];
      this.$api
        .get("/employee/getBranch", { company: this.packageInfo.company })
        .then(res => {
          console.log(res.data);
          if (res.data && res.data.length != 0) {
            this.SubsidiaryOptions = this.SubsidiaryOptions.concat(res.data);
          }
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error("部门数据为空");
        });
    },
    // 查询员工列表
    findEmployees() {
      this.getBranch();
      console.log(this.tableData);
      this.selectstaffloading = true;
      var body = {
        company: this.packageInfo.company,
        name: this.seekEmployees.name,
        branch: this.seekEmployees.branch,
        page: this.InquireStafft.page,
        pageSize: this.InquireStafft.pageSize,
        isMarital: this.seekEmployees.isMarital,
        sex: this.seekEmployees.sex,
        startAge: this.seekEmployees.startAge,
        endAge: this.seekEmployees.endAge,
        sign: this.seekEmployees.sign,
        goodid: this.tableData[0].goodId
      };
      // if (this.InquireStafft.branch == "全部") {
      //   body.branch = "";
      // }
      this.$api
        .get("/employee/getDeployStaff", body)
        .then(res => {
          console.log(res.data);
          this.StafftableData = res.data.data;
          this.countStafft = res.data.count;
          this.selectstaffloading = false;
          // console.log("this.stafftempList :", this.stafftempList);
          // identity
          // var temp = [];
          // this.stafftempList.map((i, n) => {
          //   res.data.data.map((j, m) => {
          //     if (i.identity == j.identity) {
          //       temp.push(m);
          //     }
          //   });
          // });
          // console.log(temp);
          // temp.forEach(row => {
          //   this.$refs.StafftableDataTable.toggleRowSelection(
          //     this.StafftableData[row]
          //   );
          // });
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 查询套餐列表
    findEnterMeal() {
      var body = {
        company: this.packageInfo.company, //	公司名称
        // payMethod: "公费", //	员工姓名
        payMethod: this.seekgoods.payMethod, //	员工姓名
        page: this.InquirePackage.page, //当前页面
        pageSize: this.InquirePackage.pageSize //	每页条数
      };
      this.$api
        .get("/busines/findPubMeal", body)
        .then(res => {
          console.log(res.data);
          this.PackagetableData = res.data.data;
          this.countPackage = res.data.count;
          console.log(this.packagetempList);
          var temp = [];
          this.packagetempList.map((i, n) => {
            res.data.data.map((j, m) => {
              if (i.goodId == j.goodid) {
                temp.push(m);
              }
            });
          });
          console.log(temp);
          this.$refs.PackagetableDataTable.clearSelection();
          temp.forEach(row => {
            this.$refs.PackagetableDataTable.toggleRowSelection(
              this.PackagetableData[row]
            );
          });
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 选择员工
    ChooseEmployee() {
      // this.findEmployees();
      console.log(this.dynamicTags);
      console.log(this.StafftableData);
      this.InquireStafft.page = 1;
      this.InquireStafft.pageSize = 10;
      setTimeout(() => {
        this.findEmployees();
        this.$refs.StafftableDataTable.clearSelection();
      }, 1);
      setTimeout(() => {
        this.dynamicTags.map(item => {
          this.$refs.StafftableDataTable.toggleRowSelection(item);
        });
      }, 1);
      this.getsign();
      this.dialogStaff = true;
    },
    // 选择套餐
    ChoosePackage() {
      this.packagetempList = JSON.parse(JSON.stringify(this.tableData));
      this.findEnterMeal();
      this.dialogPackage = true;
    },
    // 员工全选
    StaffSelectionChange(val) {
      console.log(val);
      this.StaffSelection = val;
    },
    // 员工选中后确认按钮---赋值并校验
    determineStaff() {
      if (this.StaffSelection.length == 0) {
        this.$message.error("请勾选员工");
        return;
      }
      this.dynamicTags = this.StaffSelection;
      this.stafftempList = JSON.parse(JSON.stringify(this.StaffSelection));
      this.dialogStaff = false;
    },
    // 套餐全选
    PackageSelectionChange(selection, row) {
      // console.log(val);
      // this.PackageSelection = val;
      if (this.$route.query.type == 0) {
        console.log(selection);
        console.log(row);

        //clearSelection：用于多选表格，清空用户的选择
        //此时所有的checkbox处于未勾选，当用户第一次点击的时候，selectio为一个数组，里面存放的为当前这一行的数据
        this.$refs.PackagetableDataTable.clearSelection();
        //此时selection仍然有值 ，只是勾选状态不显示了。
        if (selection.length === 0) {
          return;
        }
        //这这里将这行的状态又变为了勾选
        this.$refs.PackagetableDataTable.toggleRowSelection(row, true);
        this.PackageSelection = [row];
        console.log(selection);
      }

      //用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    },
    PackageSelectionChange1(val) {
      // console.log(val);
      if (this.$route.query.type != 0) {
        this.PackageSelection = val;
      }
    },

    // 套餐选中后确认按钮---赋值并校验
    determinePackage() {
      if (this.PackageSelection.length == 0) {
        this.$message.error("请勾选套餐");
        return;
      }
      let temp = [];
      console.log("套餐选中后确认按钮---赋值并校验");
      console.log(this.PackageSelection);
      console.log(this.packagetempList);
      this.packagetempList.map((i, n) => {
        this.PackageSelection.map((j, m) => {
          if (i.goodId == j.goodid) {
            temp.push({
              goodId: i.goodId,
              goodName: i.goodName,
              price: i.price,
              count: i.count,
              payMethod: i.payMethod,
              goodType: i.GoodType
            });
          }
        });
      });
      temp.map((i, n) => {
        this.PackageSelection = this.PackageSelection.filter(
          item => item.goodid != i.goodId
        );
      });
      console.log("temp :", temp);
      console.log("this.PackageSelection", this.PackageSelection);
      this.PackageSelection.map(i => {
        temp.push({
          goodId: i.goodid,
          goodName: i.goodname,
          price: i.goodprice,
          count: 1,

          payMethod: i.payMethod,
          goodType: i.GoodType
        });
      });
      this.tableData = temp;
      this.packagetempList = JSON.parse(JSON.stringify(temp));
      this.dialogPackage = false;
    },
    // 删除套餐
    DeletePackage(index, row) {
      console.log("index", index);
      console.log("row", row);
      this.tableData.splice(index, 1);
    },
    // 删除选中员工
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.stafftempList = JSON.parse(JSON.stringify(this.dynamicTags));
    },
    // 分页方法
    StaffSizeChange(val) {
      this.InquireStafft.page = 1;
      this.InquireStafft.pageSize = val;
      this.findEmployees();
      console.log(`每页 ${val} 条`);
    },
    StaffCurrentChange(val) {
      this.InquireStafft.page = val;
      this.findEmployees();
      console.log(`员工当前页: ${val}`);
    },
    PackageSizeChange(val) {
      this.packageInfo.page = 1;
      this.packageInfo.pageSize = val;
      this.findEnterMeal();
      console.log(`每页 ${val} 条`);
    },
    PackageCurrentChange(val) {
      this.packageInfo.page = val;
      this.findEnterMeal();
      console.log(`当前页: ${val}`);
    },
    // 企业下拉款改变时清空员工和套餐数据
    packageInfoCompany() {
      this.dynamicTags = [];
      this.tableData = [];
    }
  },
  watch: {
    tableData(nvl, ovl) {
      console.log(nvl);
      this.dynamicTags = [];
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.configurationpackage_wrap {
  // width: 400px;
  padding: 20px 40px 0 40px;
  .el-form-item__label {
    padding: 0;
  }
}
.configurationpackage_header {
  width: 150px;
  //   padding-bottom: 10px;
}
.configurationpackage_block {
  width: 780px;
  margin: 0 40px 0 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.configurationpackage_tag {
  margin: 10px;
}

.configurationpackage_footer {
  margin: 30px 20px 20px 40px;
}
.zindex {
  background-color: rgb(245, 245, 245);
  position: absolute;
  width: 40px;
  height: 40px;
  top: 144px;
  left: 20px;
  z-index: 100;
}
</style>
