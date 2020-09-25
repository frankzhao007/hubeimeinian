<template>
  <div style="margin:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="150px" size="medium">
        <el-form-item label="活动名称：">
          <el-input v-model="seekobj.name" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="时间范围：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekobj.timehorizon" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <div></div>
        <el-form-item label="活动企业名称：">
          <!-- <el-input v-model="seekobj.companyname" placeholder="请填写" style="width:200px" clearable></el-input> -->
          <el-select v-model="seekobj.companyname" placeholder="请选择" clearable filterable style="width:200px">
            <el-option v-for="item in companynamelist" :label="item.Name" :value="item.Name" :key="item.ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-search" @click="seekbtn()">搜 索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="opennewpop()">新增活动</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="ActivityName" label="活动名称" min-width="200px" show-overflow-tooltip></el-table-column>
        <el-table-column label="活动时间" min-width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.StartDate}} - {{scope.row.EndDate}}
          </template>
        </el-table-column>
        <el-table-column prop="Company" label="活动企业" min-width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column label="奖励详情" min-width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.RewardInfo.Reward}}
          </template>
        </el-table-column>
        <el-table-column label="员工名单" min-width="110px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="gotoFbselectemp(scope.row)">查看</el-button>
            <el-button type="text" size="mini" :disabled="scope.row.Employee.IsAll==1" @click="openselectemp(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="备注" min-width="60px" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="opensetremark(scope.row)">{{scope.row.Remarks||'备注'}}</el-button>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column prop="date" label="操作" min-width="110px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openeditpop(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.ActivityType=='1'" :disabled="scope.row.ActivityType=='1'" type="text" size="mini" @click="delActivity(scope.row)">已失效</el-button>
            <el-button v-else type="text" size="mini" @click="delActivity(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹窗 -->
    <div>
      <!-- 新增/编辑活动 -->
      <div>
        <el-dialog title="新增/编辑活动" :visible.sync="addoreditpop.isshow" width="800px">
          <el-form :model="addoreditpop" label-position='right' label-width="120px" size="medium">
            <el-form-item label="活动名称：">
              <el-input :disabled="addoreditpop.isedit" v-model="addoreditpop.ActivityName" placeholder="请填写" style="width:200px" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="活动时间：">
              <el-date-picker :disabled="addoreditpop.isedit" value-format="yyyy-MM-dd HH:mm:ss" v-model="addoreditpop.timehorizon" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动企业：">
              <!-- <el-input v-model="addoreditpop.Company" placeholder="请填写" style="width:200px"></el-input> -->
              <el-select :disabled="addoreditpop.isedit" v-model="addoreditpop.Company" placeholder="请选择企业" style="width:200px" filterable>
                <el-option :label="item.Name" :value="item.ID" :key="item.ID" v-for="item in CompanyList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="福利内容：">
              每个人&nbsp&nbsp<el-input :disabled="addoreditpop.isedit" v-model="addoreditpop.Quota" placeholder="请填写" style="width:80px" @input="Quotainput"></el-input>&nbsp&nbsp个赠送名额。
            </el-form-item>
            <el-form-item label="">
              每个名额&nbsp&nbsp<el-input :disabled="addoreditpop.isedit" v-model="addoreditpop.Amount" placeholder="请填写" style="width:80px" @input="Amountinput"></el-input>&nbsp&nbsp元家属福利金。
            </el-form-item>
            <el-form-item label="支持套餐：">
              <el-button icon="el-icon-plus" @click="openselectActivity()">选择套餐</el-button>
            </el-form-item>

            <div style="margin:0 0 10px 110px">
              <el-tag style="margin:10px" @close="delactivitygoods(item)" v-for="item in addoreditpop.confirmActivity" :key="item.goodid" closable>
                {{item.goodname}}
              </el-tag>
            </div>
            <el-form-item label="活动员工：">
              <el-radio :disabled="addoreditpop.isedit" v-model="addoreditpop.IsAll" label="1">该企业所有员工包含新增</el-radio>
              <el-radio :disabled="addoreditpop.isedit" v-model="addoreditpop.IsAll" label="2">部分员工（创建活动后编辑员工）</el-radio>
            </el-form-item>
          </el-form>
          <!-- 选择套餐 -->
          <el-dialog width="800px" title="选择套餐" :visible.sync="tableselectenterMeal.isshow" append-to-body>
            <div style="margin-bottom:20px">
              <span>套餐名称：</span>
              <el-input size="small" style="width:200px" placeholder="请输入" clearable v-model="tableselectenterMeal.enterName"></el-input>
              <el-button type="primary" size="small" style="margin-left:20px" @click="seekfindActivityEnter()"> 搜 索 </el-button>
            </div>
            <el-table ref="multipleTable" :row-key="getRowKeys" :data="tableselectenterMeal.tablelist" style="width: 100%" v-loading="tableselectenterMeal.loading" @selection-change="selectActivityEnter">
              <el-table-column type="selection" width="55" :reserve-selection="true"> </el-table-column>
              <el-table-column prop="goodname" label="套餐名称"></el-table-column>
              <el-table-column prop="payMethod" label="付费方式"></el-table-column>
              <el-table-column prop="goodprice" label="门市价"></el-table-column>
              <el-table-column prop="goodlowprice" label="企业内部价"></el-table-column>
              <el-table-column prop="goodsaleprice" label="折扣"></el-table-column>
            </el-table>
            <div style="height:20px;margin-top:20px;">
              <el-pagination style="float:right" @size-change="enterMealhandleSizeChange" @current-change="enterMealhandleCurrentChange" :current-page="tableselectenterMeal.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableselectenterMeal.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableselectenterMeal.total">
              </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="tableselectenterMeal.isshow = false">取 消</el-button>
              <el-button type="primary" @click="confirmfindActivityEnter">确 定</el-button>
            </div>
          </el-dialog>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addoreditpop.isshow = false">取 消</el-button>
            <el-button type="primary" @click="addoreditActivity()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 选择员工 -->
      <div>
        <el-dialog title="选择员工" :visible.sync="selectemp.isshow" width="1200px">
          <el-form :inline="true" :model="selectemp" label-position='right' label-width="120px" size="medium" clearable>
            <el-form-item label="婚否：">
              <el-select v-model="selectemp.isMarital" placeholder="请选择" clearable style="width:200px">
                <el-option label="已婚" value="已婚"></el-option>
                <el-option label="未婚" value="未婚"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select v-model="selectemp.sex" placeholder="请选择" clearable style="width:200px">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：">
              <el-input v-model="selectemp.branch" placeholder="请填写" style="width:200px" clearable></el-input>
            </el-form-item>
            <div></div>
            <el-form-item label="姓名：">
              <el-input v-model="selectemp.name" placeholder="请填写" style="width:200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="年龄段：">
              <el-input v-model="selectemp.startAge" placeholder="请填写" style="width:90px" clearable @input="startAgeinput"></el-input>
              至
              <el-input v-model="selectemp.endAge" placeholder="请填写" style="width:90px" clearable @input="endAgeinput"></el-input>
            </el-form-item>
            <el-form-item label="后台标记字段：">
              <el-select v-model="selectemp.sign" placeholder="请选择" size="medium" style="width:200px;" v-loading="singload">
                <el-option v-for="(item,index) in singlist" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" @click="seekselectempbtn()">搜 索</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="multipleTable1" :row-key="getRowKeys1" :data="selectemp.emplist" style="width: 100%" v-loading="selectemp.loading" @selection-change="selectemplistbtn">
            <el-table-column type="selection" width="55" :reserve-selection="true"> </el-table-column>
            <el-table-column prop="name" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column label="证件类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.cardType=='1'">身份证</span>
                <span v-else-if="scope.row.cardType=='2'">港澳台通行证</span>
                <span v-else="scope.row.cardType=='3'">护照</span>
              </template>
            </el-table-column>
            <el-table-column prop="identity" label="证件号" width="200px"> </el-table-column>
            <el-table-column prop="branch" label="部门"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="Age" label="年龄"></el-table-column>
            <el-table-column prop="isMarital" label="婚否"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="Sign" label="后台标记字段" width="150px"> </el-table-column>

          </el-table>
          <div style="height:30px;margin-top:20px;">
            <el-pagination style="float:right" @size-change="emplistsizechange" @current-change="emplistcurrentchange" :current-page="selectemp.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="selectemp.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="selectemp.total">
            </el-pagination>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="selectemp.isshow = false">取 消</el-button>
            <el-button type="primary" @click="updateActivityEmp()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 备注窗口 -->
      <div>
        <el-dialog title="体检套餐" :visible.sync="remarkpop.isshow" width="400px">
          <el-input type="textarea" v-model="remarkpop.remarkmsg" placeholder="备注最多30个字" show-word-limit :rows="4" maxlength="30"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="remarkpop.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmsetremark()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      singlist: ["全部"], //标记下拉框
      singload: false,
      getRowKeys1(row) {
        return row.userId;
      },
      getRowKeys(row) {
        //翻页选择row的key值
        return row.goodid;
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      companynamelist: [],
      remarkpop: {
        obj: "",
        isshow: false,
        remarkmsg: ""
      },
      CompanyList: [],
      seekobj: {
        name: "",
        timehorizon: [],
        companyname: "",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      },
      addoreditpop: {
        isedit: false,
        isshow: false,
        ActivityName: "",
        timehorizon: [],
        Company: "",
        Quota: "",
        Amount: "",
        IsAll: "1",
        confirmActivity: [],
        selectActivity: []
      },
      tableselectenterMeal: {
        enterName: "",
        tablelist: [],
        isshow: false,
        loading: false,
        pageindex: 1,
        pagesize: 10,
        total: 0
      },
      selectemp: {
        sign: "",
        isshow: false,
        isMarital: "",
        sex: "",
        branch: "",
        name: "",
        startAge: "",
        endAge: "",

        selectemplist: [],

        emplist: [],
        loading: false,
        pageindex: 1,
        pagesize: 10,
        total: 0
      }
    };
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  mounted() {
    console.log(this.$store.getters.getRoles("家属福利金"));
    // console.log(this.$store.getters.getRoutes);

    this.findActivitys();
    this.$api
      .get("/account/pullOrg2", {
        AccountType: "0",
        AccountName: "运营"
      })
      .then(res => {
        console.log(res);
        if (res.code == 200) {
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                var body = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.companynamelist.push(body);
              });
            }
          });
        }
      });
  },
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
    delactivitygoods(row) {
      console.log(row);
      var delindex = this.addoreditpop.confirmActivity.indexOf(row);
      this.addoreditpop.confirmActivity.splice(delindex, 1);
    },
    //保存列表页面数据
    copypagemsg() {
      var body = {
        name: this.seekobj.name,
        timehorizon: this.seekobj.timehorizon,
        companyname: this.seekobj.companyname,
        pageindex: this.seekobj.pageindex,
        pagesize: this.seekobj.pagesize
      };
      this.$store.commit("setFamilybenefitmsg", body);
    },
    //赋值列表页面数据
    setpagemsg() {
      var body = this.$store.getters.getFamilybenefitmsg;
      this.seekobj.name = body.name || "";
      this.seekobj.timehorizon = body.timehorizon || "";
      this.seekobj.companyname = body.companyname || "";
      this.seekobj.pageindex = body.pageindex || 1;
      this.seekobj.pagesize = body.pagesize || 10;
      console.log(body);
    },
    gotoFbselectemp(row) {
      console.log(row);
      this.$router.push("/marketing/Fbselectemp?id=" + row.Id + "&type=1");
    },
    updateActivityEmp() {
      console.log(this.selectemp.selectemplist);
      console.log(this.selectemp.obj);
      if (
        !this.selectemp.selectemplist ||
        !Array.isArray(this.selectemp.selectemplist) ||
        this.selectemp.selectemplist.length < 1
      ) {
        this.$message.error("请选择员工");
        return;
      }
      var body = {
        id: this.selectemp.obj.Id,
        Status: "+",
        IsAll: "2",
        Usids: []
      };
      this.selectemp.selectemplist.map(item => {
        body.Usids.push(item.userId);
      });
      this.$api.post("/familyBenef/updateActivityEmp", body).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.selectemp.isshow = false;
          this.findActivitys();
        }
      });
    },
    selectemplistbtn(val) {
      console.log(val);
      this.selectemp.selectemplist = val;
    },
    emplistsizechange(val) {
      this.selectemp.pagesize = val;
      this.selectemp.pageindex = 1;
      this.findActivityEmp();
    },
    emplistcurrentchange(val) {
      this.selectemp.pageindex = val;
      this.findActivityEmp();
    },
    Quotainput() {
      this.addoreditpop.Quota = this.addoreditpop.Quota.replace(/[^\.\d]/g, "");
      this.addoreditpop.Quota = this.addoreditpop.Quota.replace(".", "");
    },
    Amountinput() {
      this.addoreditpop.Amount = this.addoreditpop.Amount.replace(
        /[^\.\d]/g,
        ""
      );
    },
    startAgeinput() {
      this.selectemp.startAge = this.selectemp.startAge.replace(/[^\.\d]/g, "");
      this.selectemp.startAge = this.selectemp.startAge.replace(".", "");
    },
    endAgeinput() {
      this.selectemp.endAge = this.selectemp.endAge.replace(/[^\.\d]/g, "");
      this.selectemp.endAge = this.selectemp.endAge.replace(".", "");
    },
    seekselectempbtn() {
      if (Number(this.selectemp.startAge) > Number(this.selectemp.endAge)) {
        this.$message.error("开始年龄端不可大于结束年龄段");
        return;
      }
      this.selectemp.pageindex = 1;
      this.findActivityEmp();
    },
    openselectemp(row) {
      this.selectemp = {
        isshow: true,
        isMarital: "",
        sex: "",
        branch: "",
        name: "",
        startAge: "",
        endAge: "",
        selectemplist: [],
        emplist: [],
        loading: false,
        pageindex: 1,
        pagesize: 10,
        total: 0
      };
      setTimeout(() => {
        this.$refs.multipleTable1.clearSelection();
      }, 1);
      this.selectemp.obj = row;
      console.log(this.selectemp.obj);
      this.findActivityEmp();
      this.getsign();
    },
    findActivityEmp() {
      this.selectemp.loading = true;
      this.$api
        .get("/familyBenef/findActivityEmp", {
          company: this.selectemp.obj.Company,
          startDate: this.selectemp.obj.StartDate,
          endDate: this.selectemp.obj.EndDate,
          isMarital: this.selectemp.isMarital,
          sex: this.selectemp.sex,
          startAge: this.selectemp.startAge,
          endAge: this.selectemp.endAge,
          branch: this.selectemp.branch,
          sign: this.selectemp.sign,
          name: this.selectemp.name,
          page: this.selectemp.pageindex,
          pageSize: this.selectemp.pagesize
        })
        .then(res => {
          console.log(res);
          this.selectemp.loading = false;
          this.selectemp.emplist = res.data.data;
          this.selectemp.total = res.data.count;
        })
        .catch(res => {
          console.log(res);
        });
    },
    opensetremark(row) {
      console.log(row);
      this.remarkpop.obj = row;
      this.remarkpop.remarkmsg = row.Remarks;
      this.remarkpop.isshow = true;
    },
    confirmsetremark() {
      if (!this.remarkpop.remarkmsg || this.remarkpop.remarkmsg == "") {
        this.$message.error("请输入备注");
        return;
      }
      var body = this.remarkpop.obj;
      body.Remarks = this.remarkpop.remarkmsg;
      this.$api
        .post("/familyBenef/updateActivity", body)
        .then(res => {
          if (res.code == 200) {
            this.remarkpop.isshow = false;
            this.$message.success("备注成功！");
            this.findActivitys();
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },

    delActivity(row) {
      this.$confirm("删除活动后不可恢复，请确认后操作！", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/familyBenef/delActivity", {
              ids: [row.Id]
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.findActivitys();
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openselectActivity() {
      if (!this.addoreditpop.Company || this.addoreditpop.Company == "") {
        this.$message.error("请选择活动企业");
        return;
      }
      this.tableselectenterMeal.tablelist = [];
      this.addoreditpop.selectActivity = [];
      this.tableselectenterMeal.isshow = true;
      setTimeout(() => {
        this.$refs.multipleTable.clearSelection();
      }, 1);
      this.findActivityEnter();
    },
    seekfindActivityEnter() {
      this.tableselectenterMeal.pageindex = 1;
      this.findActivityEnter();
    },
    findActivityEnter() {
      this.tableselectenterMeal.loading = true;
      var body = {
        company: "",
        id: this.addoreditpop.Company,
        enterName: this.tableselectenterMeal.enterName,
        page: this.tableselectenterMeal.pageindex,
        pageSize: this.tableselectenterMeal.pagesize
      };
      this.CompanyList.map(item => {
        if (item.ID == this.addoreditpop.Company) {
          body.company = item.Name;
        }
      });
      this.$api
        .get("/familyBenef/findActivityEnter", body)
        .then(res => {
          console.log(res);
          this.tableselectenterMeal.loading = false;
          this.tableselectenterMeal.tablelist = res.data.data;
          this.tableselectenterMeal.total = res.data.count;
        })
        .catch(res => {
          console.log(res);
        });
    },
    addoreditActivity() {
      console.log(this.addoreditpop);
      if (
        !this.addoreditpop.ActivityName ||
        this.addoreditpop.ActivityName == ""
      ) {
        this.$message.error("请输入活动名称");
        return;
      }
      if (
        !this.addoreditpop.timehorizon ||
        !Array.isArray(this.addoreditpop.timehorizon) ||
        this.addoreditpop.timehorizon.length < 2
      ) {
        this.$message.error("请选择活动时间");
        return;
      }
      if (!this.addoreditpop.Company || this.addoreditpop.Company == "") {
        this.$message.error("请选择活动企业");
        return;
      }
      if (
        !this.addoreditpop.Quota ||
        this.addoreditpop.Quota == "" ||
        !this.addoreditpop.Amount ||
        this.addoreditpop.Amount == ""
      ) {
        this.$message.error("请完整填写福利内容");
        return;
      }
      if (Number(this.addoreditpop.Quota) < 1) {
        this.$message.error("赠送名额必须大于1");
        return;
      }
      if (Number(this.addoreditpop.Quota) > 10000) {
        this.$message.error("赠送名额不可大于10000");
        return;
      }
      var text1 = /^[0-9]+(.[0-9]{1})?$/;
      if (!text1.test(this.addoreditpop.Amount)) {
        this.$message.error("请输入正确金额,每个名额金额大于0，保留1位小数");
        return;
      }

      if (!Number(this.addoreditpop.Amount) > 0) {
        this.$message.error("请输入正确金额,每个名额金额大于0，保留1位小数");
        return;
      }
      if (Number(this.addoreditpop.Amount) > 100000) {
        this.$message.error("金额不可大于100000");
        return;
      }

      if (
        !this.addoreditpop.confirmActivity ||
        this.addoreditpop.confirmActivity == "" ||
        !Array.isArray(this.addoreditpop.confirmActivity) ||
        this.addoreditpop.confirmActivity.length < 1
      ) {
        this.$message.error("请选择支持套餐");
        return;
      }
      var body = {
        ActivityName: this.addoreditpop.ActivityName,
        RewardInfo: {
          Reward:
            "每人" +
            this.addoreditpop.Quota +
            "个名额，每人" +
            this.addoreditpop.Amount +
            "元家属福利金",
          Quota: Number(this.addoreditpop.Quota),
          Amount: Number(this.addoreditpop.Amount)
        },
        CompanyId: this.addoreditpop.Company,
        StartDate: this.addoreditpop.timehorizon[0],
        EndDate: this.addoreditpop.timehorizon[1],
        Employee: {
          IsAll: this.addoreditpop.IsAll,
          EmpId: this.addoreditpop.EmpId || []
        },
        EnterMealId: []
      };
      this.CompanyList.map(item => {
        if (item.ID == this.addoreditpop.Company) {
          body.Company = item.Name;
        }
      });
      this.addoreditpop.confirmActivity.map(item => {
        body.EnterMealId.push(item.goodid);
      });
      // body.EnterMealId
      // body.Remarks=""//备注
      if (this.addoreditpop.isedit) {
        body.id = this.addoreditpop.id;
        body.Remarks = this.addoreditpop.Remarks;
      }
      this.$api
        .post("/familyBenef/updateActivity", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.addoreditpop.isshow = false;
            this.findActivitys();
            this.$message.success("修改成功！");
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    opennewpop() {
      this.CompanyList = [];
      this.addoreditpop = {
        isedit: false,
        isshow: true,
        ActivityName: "",
        timehorizon: "",
        Company: "",
        Quota: "",
        Amount: "",
        IsAll: "1",
        confirmActivity: [],
        selectActivity: []
      };
      this.$api
        .get("/account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            res.data.map(item => {
              if (item.AccountType == "3") {
                item.Name.map((temp, index) => {
                  var body = {
                    Name: temp,
                    ID: item.ID[index]
                  };
                  console.log(body);
                  this.CompanyList.push(body);
                });
              }
            });
          }
        });
    },
    openeditpop(row) {
      this.CompanyList = [];
      console.log(row);
      this.addoreditpop = {
        isedit: true,
        isshow: true,
        ActivityName: row.ActivityName,
        timehorizon: [row.StartDate, row.EndDate],
        Company: row.CompanyId,
        Quota: row.RewardInfo.Quota,
        Amount: row.RewardInfo.Amount,
        IsAll: row.Employee.IsAll,
        EmpId: row.Employee.EmpId,
        confirmActivity: row.EnterMealId,
        id: row.Id,
        Remarks: row.Remarks,
        selectActivity: []
      };
      this.$api
        .get("/account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            res.data.map(item => {
              if (item.AccountType == "3") {
                item.Name.map((temp, index) => {
                  var body = {
                    Name: temp,
                    ID: item.ID[index]
                  };
                  // console.log(body);
                  this.CompanyList.push(body);
                });
              }
            });
          }
        });
      this.$api
        .get("/familyBenef/findActivityById", { id: row.Id })
        .then(res => {
          if (res.code == 200) {
            this.addoreditpop.confirmActivity = res.data.EnterMeal;
          }
        });
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.findActivitys();
    },
    //001-查询家属福利金
    findActivitys() {
      this.tableobj.loading = true;
      var body = {
        activityName: this.seekobj.name,
        company: this.seekobj.companyname,
        startDate: "",
        endDate: "",
        page: this.seekobj.pageindex,
        pageSize: this.seekobj.pagesize
      };
      if (
        this.seekobj.timehorizon &&
        Array.isArray(this.seekobj.timehorizon) &&
        this.seekobj.timehorizon.length > 1
      ) {
        body.startDate = this.seekobj.timehorizon[0];
        body.endDate = this.seekobj.timehorizon[1];
      }
      this.$api
        .get("/familyBenef/findActivitys", body)
        .then(res => {
          this.tableobj.loading = false;
          console.log(res);
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    enterMealhandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;
      this.findActivityEnter();
    },
    enterMealhandleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      this.findActivityEnter();
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.seekobj.pageindex = 1;
      this.seekobj.pagesize = val;
      this.findActivitys();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.seekobj.pageindex = val;
      this.findActivitys();
    },
    selectActivityEnter(val) {
      console.log(val);
      this.addoreditpop.selectActivity = val;
    },
    confirmfindActivityEnter() {
      // this.addoreditpop.confirmActivity = this.addoreditpop.selectActivity;
      this.addoreditpop.confirmActivity = this.addoreditpop.confirmActivity.concat(
        this.addoreditpop.selectActivity
      );
      this.addoreditpop.confirmActivity = this.filterRepeat(
        this.addoreditpop.confirmActivity,
        "goodid"
      );
      this.tableselectenterMeal.isshow = false;
    },
    filterRepeat(arr, prop) {
      return arr.filter(function(element, index, self) {
        return self.findIndex(el => el[prop] == element[prop]) === index;
      });
    }
  },
  watch: {
    "addoreditpop.Company": {
      handler(nul) {
        this.addoreditpop.confirmActivity = [];
      }
    }
  }
};
</script>
<style>
</style>