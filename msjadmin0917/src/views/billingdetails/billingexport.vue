<template>
  <div class="app-container">
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createDate" label="报表导出时间">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名">
        </el-table-column>
        <el-table-column prop="fileCreator" label="导出人">
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size=pageSize layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "billingexport",
  components: {},
  watch: {},
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      count: 0
    };
  },
  created() {
    this.fildOrderExcels();
  },
  mounted() {},
  methods: {
    fildOrderExcels() {
      this.$api
        .get("/excel/fildOrderExcels", {
          modulType: "zd",
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res.data);
          this.count = res.data.count;
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.fildOrderExcels();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fildOrderExcels();
      console.log(`当前页: ${val}`);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
