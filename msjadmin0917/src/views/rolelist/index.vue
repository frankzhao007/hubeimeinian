<template>
  <!-- 角色列表----------------------------------------------------------------------------------------------------------------- -->
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">角色名称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="queryRoleName" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="getRoleList()">搜索</el-button>
        <el-button :disabled="!Clickable.add||AccountType=='7'" class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="goNewRole()">新增角色</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%" v-loading="tableDataLoading">
        <el-table-column prop="RoleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="Desc" label="角色描述">
        </el-table-column>
        <el-table-column prop="CreateTime" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button :disabled="!Clickable.delete" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 40, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total=count>
      </el-pagination>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------------------- -->

  </div>
</template>

<script>
export default {
  name: "rolelist",
  components: {},
  watch: {},
  data() {
    return {
      //----------------
      value: "全部",
      // 查询参数
      queryRoleName: "",
      tableData: [],
      // 分页
      page: 1,
      pageSize: 20,
      count: 0,
      // 表格加载
      tableDataLoading: false,
      AccountType:"",//当前账号的权限
    };
  },
  mounted() {
     this.AccountType=this.$store.getters.getRoleInfo.AccountType
    // 获取角色列表
    this.getRoleList();
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      this.tableDataLoading = true;
      var body = {
        roleName: this.queryRoleName,
        page: this.page,
        pageSize: this.pageSize
      };
      this.$api
        .get("/role/pullAll", body)
        .then(res => {
          // 执行某些操作
          console.log(res);
          this.tableData = res.data.data;
          this.count = res.data.count;
          // console.log(res.data[0].Routes);
          this.tableDataLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goNewRole() {
      this.$router.push("/accountmanagement/newrole");
    },
    handleEdit(index, row) {
      console.log(row.Id);
      this.$router.push("/accountmanagement/newrole?id=" + row.Id);
    },
    delRole() {},
    handleDelete(row) {
      console.log(row.Id);
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .del("/role/DeleteById", {
              id: row.Id
            })
            .then(res => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 删除成功请求一下角色列表刷新数据
               if (this.tableData.length == 1 && this.page != 1) {
                this.page -= 1;
              }
              this.getRoleList();
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = 1;
      this.pageSize = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getRoleList();
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("角色列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
.rolelist_Dialog_title {
  font-size: 20px;
  margin-bottom: 20px;
  padding-left: 30px;
}
.rolelist_Dialog_checkbox {
  padding-top: 10px;
}
</style>


