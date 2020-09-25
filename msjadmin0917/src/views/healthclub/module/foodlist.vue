<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 食物列表 --- foodlist -->
    <!-- 健康俱乐部 --- 食物列表 --- foodlist
    <el-button @click="goSubpage('/healthclub/foodMsg')">查看/新增/编辑食物</el-button>-->
    <div>
      <el-form
        :inline="true"
        :model="FoodListBody"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <el-form-item label="食物名称：">
          <el-input v-model="FoodListBody.foodName" clearable></el-input>
        </el-form-item>
        <el-form-item label="食物分类：">
          <el-select v-model="FoodListBody.foodType" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜 索</el-button>
          <!-- <el-button type="primary" icon="el-icon-plus" @click>新增</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="FoodList" style="width: 100%">
        <el-table-column prop="simple_food_name" label="食物名称" style="text-align: center"></el-table-column>
        <el-table-column prop="nameA" label="所属分类" style="text-align: center"></el-table-column>
        <el-table-column prop="name" label="卡路里含量">
          <template slot-scope="scope">{{scope.row.calorie}}千卡/{{scope.row.amount}}克</template>
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
  name: "foodlist",
  components: {},
  data() {
    return {
      FoodListBody: {
        foodName: "",
        foodType: ""
      },
      options: [],
      pagesize: 10,
      currentPage: 1,
      count: 0,
      FoodList: [],
      foodcategorylist: []
    };
  },
  created() {},
  mounted() {
    this.foodcategoryQuery();
    this.getCommonFoodList();
  },
  methods: {
    foodcategoryQuery() {
      this.$network
        .post("/healthClub/hm/listFoodsCategory")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.foodcategorylist = res.data.foodcategory;
            for (let i = 0; i < res.data.foodcategory.length; i++) {
              var temp = {
                value: ""
              };
              temp.value = res.data.foodcategory[i].nameA;
              this.options.push(temp);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCommonFoodList() {
      var that = this;
      var body = {
        foodName: this.FoodListBody.foodName,
        foodType: this.FoodListBody.foodType,
        pageIndex: this.currentPage.toString(),
        pageSize: this.pagesize.toString()
      };
      this.$network.post("/healthClub/hm/getCommonFoodList", body).then(res => {
        console.log(res);
        if (res.code == 200) {
          for (let i = 0; i < res.data.foodList.length; i++) {
            var tempArry = that.foodcategorylist.filter(function(item) {
              return item.nameB == res.data.foodList[i].category;
            });
            console.log(tempArry);
            this.$set(res.data.foodList[i],'nameA')
            res.data.foodList[i].nameA=tempArry[0].nameA
          }
          this.count = res.data.count;
          this.FoodList = res.data.foodList;
        }
      });
    },
    goSubpage(page) {
      this.$router.push(page);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.currentPage = 1;
      this.getCommonFoodList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getCommonFoodList();
    },
    searchBtn() {
      this.currentPage = 1;
      this.getCommonFoodList();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>