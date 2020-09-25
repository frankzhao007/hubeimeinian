<template>
  <!-- 导入记录 -->
  <div class="app-container">
    <!-- 查询 -->
    <div>
      <div class="goodsmsgtitle">
        <i @click="$router.back(-1);" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp导入记录</span>
      </div>
      <div class="inquire employeeimport_inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">文件名：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.name" size="medium" style="width:100%;" clearable>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">时间：</div>
            <div class="grid_content">
              <el-date-picker v-model="yearSelect" size="medium" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
              <!-- <el-date-picker v-model="Inquire.yearSelect" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
            </div>
          </el-col>
          <el-col :span="11">
            <el-button class="grid_button" type="primary" size="medium" @click="searchFor()" icon="el-icon-search">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="createDate" label="导入时间">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="totalData" label="数据总量" width="80px">
        </el-table-column>
        <el-table-column prop="correctData" label="成功数量" width="80px">
        </el-table-column>
        <el-table-column label="失败数量" width="80px">
          <template slot-scope="scope">
            <el-button @click="ErrorMessage(scope.row)" type="text" size="small">{{scope.row.errData}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="fileCreator" label="导入账号">
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Inquire.page" :page-sizes="[10, 20, 50, 100]" :page-size="Inquire.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
    <!-- 弹窗 -->
    <div v-if="ErrorDialog">
      <el-dialog title="错误详情" :visible.sync="ErrorDialog" width="750px">
        <div>
          <el-table :data="ErrorDialogData" style="width:750px">
            <el-table-column prop="Num" label="	序号" width="80px">
            </el-table-column>
            <el-table-column prop="name" label="姓名" max-width="180px">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="80px">
            </el-table-column>
            <el-table-column label="手机号" width="150px">
              <template slot-scope="scope">
                <span style="color:#F56C6C;" v-if="scope.row.phoneRemarks">{{scope.row.phoneRemarks}}</span>
                <span v-else>{{scope.row.phone}}</span>
              </template>
            </el-table-column>
            <el-table-column label="证件号" min-width="120px">
              <template slot-scope="scope">
                <span style="color:#F56C6C;" v-if="scope.row.identityRemarks">{{scope.row.identityRemarks}}</span>
                <span v-else>{{scope.row.identity}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="branch" label="部门" width="100px">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ErrorDialog = false">取 消</el-button>
          <el-button type="primary" @click="ErrorDialog = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "employeeimport",
  components: {},
  data() {
    return {
      Inquire: {
        name: "",
        createDate: "",
        endDate: "",
        page: 1, //
        pageSize: 10 //
      },
      count: 0,
      yearSelect: [],
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
      },
      //弹窗
      ErrorDialog: false,
      ErrorDialogData: []
    };
  },
  created() {
    this.findImportExcels();
  },
  mounted() {},
  methods: {
    searchFor() {
      this.Inquire.page = 1;
      console.log(this.Inquire);
      this.findImportExcels();
    },
    findImportExcels() {
      if (this.yearSelect.length != 0) {
        this.Inquire.createDate = this.yearSelect[0];
        this.Inquire.endDate = this.yearSelect[1];
      }
      this.$api
        .get("/excel/findImportExcels", this.Inquire)
        .then(res => {
          console.log(res.data);
          this.count = res.data.count;
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    ErrorMessage(val) {
      console.log(val);
      this.ErrorDialog = true;
      this.$api
        .get("/excel/findStaffManage", { isKey: val.fileId })
        .then(res => {
          console.log(res.data);
          this.ErrorDialogData = res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    handleSizeChange(val) {
      this.Inquire.page = 1;
      this.Inquire.pageSize = val;
      this.findImportExcels();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findImportExcels();
      console.log(`当前页: ${val}`);
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.employeeimport_inquire {
  margin-top: 20px;
}
</style>
