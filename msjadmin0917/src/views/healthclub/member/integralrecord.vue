<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 积分获取记录 --- integralrecord -->
    <!-- 健康俱乐部 --- 积分获取记录 --- integralrecord  -->
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekjifen" label-position='right' label-width="120px" size="medium">
        <el-form-item label="手机号码：">
          <el-input v-model="seekjifen.telenumber" placeholder="请填写" style="width:200px" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="变更类型：">
          <el-select v-model="seekjifen.changeTheType" placeholder="" style="width:200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="获取健康豆" value="1"></el-option>
            <el-option label="消耗健康豆" value="2"></el-option>
            <!-- <el-option label="虚拟商品" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="行为：">
          <el-select v-model="seekjifen.behavior" placeholder="" style="width:200px">
            <el-option v-for="item in seekjifen.Behaviorslist" :label="item" :value="item" :key="item"></el-option>
            <!-- <el-option label="虚拟商品" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="seekbtn()">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div>
      <el-table :data="tablejifen.jifenList" style="width: 100%" v-loading="tablejifen.loading">
        <el-table-column prop="fullTime" label="时间"></el-table-column>
        <el-table-column prop="telenumber" label="用户手机号"></el-table-column>
        <el-table-column prop="behavior" label="行为"></el-table-column>
        <el-table-column prop="getOrOffsetBean" label="健康豆"></el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablejifen.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tablejifen.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tablejifen.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "integralrecord",
  components: {},
  data() {
    return {
      seekjifen: {
        telenumber: "",
        changeTheType: "",
        behavior: "全部",
        Behaviorslist: []
      },
      tablejifen: {
        loading: false,
        jifenList: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      }
    };
  },
  created() {},
  mounted() {
    this.findGetOrOffsetHealthBeanByPaging();
    this.findBehaviors();
  },
  methods: {
    seekbtn() {
      this.tablejifen.currentPage = 1;
      this.findGetOrOffsetHealthBeanByPaging();
    },
    // 后台查询积分获取记录
    findGetOrOffsetHealthBeanByPaging() {
      this.tablejifen.loading = true;
      this.$network
        .post("/healthClub/healthBeans/findGetOrOffsetHealthBeanByPaging", {
          telenumber: this.seekjifen.telenumber,
          changeTheType: this.seekjifen.changeTheType,
          pageIndex: this.tablejifen.currentPage,
          pageSize: this.tablejifen.pagesize,
          behavior: this.seekjifen.behavior
        })
        .then(res => {
          this.tablejifen.loading = false;
          console.log(res);
          this.tablejifen.jifenList = res.data.getOrOffsetHealthBeans;
          this.tablejifen.total = res.data.count;
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    findBehaviors() {
      this.$network
        .post("/healthClub/healthBeans/findBehaviors")
        .then(res => {
          console.log(res);
          this.seekjifen.Behaviorslist = ["全部"];
          this.seekjifen.Behaviorslist = this.seekjifen.Behaviorslist.concat(
            res.data
          );
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tablejifen.currentPage = 1;
      this.tablejifen.pagesize = val;
      this.findGetOrOffsetHealthBeanByPaging();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tablejifen.currentPage = val;
      this.findGetOrOffsetHealthBeanByPaging();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>