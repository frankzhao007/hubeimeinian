<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 运动项目列表 --- sportslist -->
    <div>
      <el-form
        :inline="true"
        :model="sportsBody"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <el-form-item label="运动名称：">
          <el-input v-model="sportsBody.sportsName" clearable></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-search" @click='searchBtn'>搜 索</el-button>
          <!-- <el-button type="primary" icon="el-icon-plus" @click>新增</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="sportList" style="width: 100%">
        <el-table-column prop="sport_name" label="运动名称" style="text-align: center"></el-table-column>
        <el-table-column prop="name" label="能量消耗">
          <template slot-scope="scope">
            {{(scope.row.calorie*30).toFixed(2)}}千卡/30分钟
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" disabled>编辑</el-button>
            <el-button type="text" size="small" disabled>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "sportslist",
  components: {},
  data() {
    return {
      sportsBody: {
        sportsName: ""
      },
      pagesize: 10,
      currentPage: 1,
      count: 0,
      sportList: []
    };
  },
  created() {},
  mounted() {
    this.sportListQuery();
  },
  methods: {
    searchBtn(){
      this.currentPage=1
      this.sportListQuery()
    },
    sportListQuery() {
      var body = {
        sportsName: this.sportsBody.sportsName,
        pageIndex: this.currentPage.toString(),
        pageSize: this.pagesize.toString()
      };
      this.$network
        .post("/healthClub/hm/getCommonSportList", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.count = res.data.count;
            this.sportList = res.data.sportList;
            console.log(this.sportList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.currentPage = 1;
      this.sportListQuery();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.sportListQuery();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>