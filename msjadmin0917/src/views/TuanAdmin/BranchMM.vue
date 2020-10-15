<template>
  <div>
    <div style="margin: 20px">
      <!-- 搜索栏 -->
      <div>
        <el-form
          :inline="true"
          :model="seekobj"
          label-position="right"
          label-width="120px"
          size="medium"
        >
          <el-form-item label="分院代码：">
            <el-input v-model="seekobj.FYDM" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="分院名称：">
            <el-input v-model="seekobj.FYMC" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item style="float: right">
            <el-button
              type="primary"
              icon="el-icon-refresh-right"
              @click="replaceseek"
              >重 置</el-button
            >
            <el-button type="primary" icon="el-icon-search" @click="seekbtn"
              >搜 索</el-button
            >
          </el-form-item>
          <div>
            <el-button type="primary" @click="AddBranch()">新增分院</el-button>
            <el-button type="primary" @click="">导入分院</el-button>
          </div>
        </el-form>
      </div>
      <!-- 数据列表 -->
      <div>
        <el-table
          :data="tableobj.list"
          style="width: 100%; margin-top: 20px"
          v-loading="tableobj.loading"
          max-height="600px"
          ref="singleTable"
          highlight-current-row
          @current-change="handleCurrentTableobjChange"
        >
          >
          <el-table-column prop="code" label="分院代码"></el-table-column>
          <el-table-column prop="name" label="体检分院"></el-table-column>

          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="Delete(scope.row)"
                >删除</el-button
              >
              <!-- <el-button disabled size="mini" type="text" v-if="role=='湖北销售主管'||role=='内勤'">锁定</el-button> -->
              <el-button size="mini" type="text" @click="EditBranch(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="height: 30px; margin-top: 20px">
          <el-pagination
            style="float: right"
            @size-change="tablesizechange"
            @current-change="tablepagechange"
            :current-page="seekobj.pageindex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="seekobj.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableobj.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BranchMM",
  components: {},
  data() {
    return {
      seekobj: {
        FYDM: "",
        FYMC: "",

        pageindex: 1,
        pagesize: 10,
      },
      tableobj: {
        list: [],
        loading: "",
        total: 0,
      },

      current_chang: "",
    };
  },
  mounted() {
    this.GetFYList();
  },
  methods: {
    GetFYList() {
      this.tableobj.loading = true;
      var body = {
        hospitalCode: this.seekobj.FYDM, // 分院代码
        hospitalName: this.seekobj.FYMC, // 分院名称
        page: 1, // 页码
        size: 10, // 单页条数
      };
      this.$network3
        .post("/mnoracle/schedule/HospitalSearch", body)
        .then((res) => {
          console.log(res);
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
          this.tableobj.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AddBranch() {
      this.$router.push("/DataManagement/AddBranchMM");
    },
    EditBranch(row) {
      this.$router.push(
        "/DataManagement/AddBranchMM?FYDM=" + row.code + "&FYMC=" + row.name
      );
    },
    replaceseek() {
      this.seekobj = {
        FYDM: "",
        FYMC: "",
        pageindex: 1,
        pagesize: 10,
      };
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.GetFYList();
    },
    Delete(row) {
      console.log(row);
      this.$confirm("你确定要删除该分院吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var body = {
            hospitalCode: row.code,
          };
          this.$network3
            .post("/mnoracle/schedule/DeleteHospital", body)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.GetFYList();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentTableobjChange(val) {
      console.log(val);
      this.current_chang = val;
    },
    tablesizechange(val) {
      console.log(val);
      this.seekobj.pagesize = val;
      this.seekobj.pageindex = 1;
      this.GetFYList();
    },
    tablepagechange(val) {
      console.log(val);
      this.seekobj.pageindex = val;
      this.GetFYList();
    },
    STATUSchange(val) {
      switch (val) {
        case 0:
          return "未审核";
          break;
        case 1:
          return "审核中";
          break;
        case 2:
          return "审核通过";
          break;
        case 3:
          return "审核拒绝";
          break;

        default:
          break;
      }
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped>
</style>
