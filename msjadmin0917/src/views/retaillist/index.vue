<template>
  <!-- 散户 -->
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">昵称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.name" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6" style="margin-left: 6%;">
            <div class="grid_lable">手机号：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.phone" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="8" style="margin-left:6%;">
            <div class="grid_lable">注册时间：</div>
            <div class="grid_content">
              <el-date-picker v-model="yearSelect" size="medium" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium" @click="findCasualClient('搜索')" icon="el-icon-search">搜索</el-button>
      </div>
    </div>

    <!-- 信息列表 -->
    <div>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="DisableAccount(scope.row)" v-if="scope.row.disable==0" :disabled="!Clickable.banned">封号</el-button>
            <el-button type="text" size="small" @click="unDisableAccount(scope.row)" v-if="scope.row.disable==1" :disabled="!Clickable.import">解封</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Inquire.page" :page-sizes="[10, 20, 50, 100]" :page-size="Inquire.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "retaillist",
  components: {},
  watch: {},
  data() {
    return {
      Inquire: {
        name: "", //	名称
        phone: "", //电话
        page: 1,
        pageSize: 10
      },
      count: 0,
      yearSelect: [], //选择的年份
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
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
    this.findCasualClient();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        name: this.Inquire.name,
        phone: this.Inquire.phone,
        page: this.Inquire.page,
        pageSize: this.Inquire.pageSize,
        yearSelect: this.yearSelect
      };
      this.$store.commit("setretaillistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getretaillistmsg;
      this.Inquire.name = body.name || "";
      this.Inquire.phone = body.phone || "";
      this.Inquire.page = body.page || 1;
      this.Inquire.pageSize = body.pageSize || 10;
      this.yearSelect = body.yearSelect || [];
      console.log(body);
    },
    // 查询散户列表
    findCasualClient(val) {
      if (val == "搜索") {
        this.Inquire.page = 1;
      }
      console.log(this.yearSelect);
      if (this.yearSelect.length == 0) {
        this.Inquire.startTime = ""; //导入时间
        this.Inquire.endTime = ""; //导入时间
      } else {
        this.Inquire.startTime = this.yearSelect[0]; //导入时间
        this.Inquire.endTime = this.yearSelect[1]; //导入时间
      }
      this.$api
        .get("/employee/findCasualClient", this.Inquire)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data;
          this.count = res.data.count;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    DisableAccount(row) {
      console.log(row);
      this.$confirm("此操作将封禁此账号，不可在小程序端登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/employee/upCasualClient", {
              disable: "1",
              userId: row.userId
            })
            .then(res => {
              console.log(res.data);
              this.findCasualClient();
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    unDisableAccount(row) {
      console.log(row.usid);
      this.$confirm("此操作将恢复此账号，可在小程序端登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/employee/upCasualClient", {
              disable: "0",
              userId: row.userId
            })
            .then(res => {
              console.log(res.data);
              this.findCasualClient();
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
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
      this.Inquire.pageSize = val;
      this.findCasualClient();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findCasualClient();

      console.log(`当前页: ${val}`);
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("散户列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
</style>