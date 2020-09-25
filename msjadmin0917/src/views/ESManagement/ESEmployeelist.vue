<template>
  <div class="app-container">
    <el-row style="margin-top:3%">
      <el-col :span="8">
        <div class="grid_lable">姓名：</div>
        <div class="grid_content">
          <el-input
            placeholder="请输入内容"
            v-model="name"
            clearable
            size="medium"
            style="width:100%;"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid_lable">性别：</div>
        <div class="grid_content">
          <el-select v-model="value" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid_lable">联系电话：</div>
        <div class="grid_content">
          <el-input
          maxlength="11"
            placeholder="请输入内容"
            v-model="phone"
            clearable
            size="medium"
            style="width:100%;"
          ></el-input>
        </div>
      </el-col>
    </el-row>

    <!-- 时间范围 -->
    <el-row style="margin-top:3%">
      <el-col :span="8">
        <div class="grid_lable">时间范围：</div>
        <div class="grid_content">
          <el-date-picker
            v-model="timeSelect"
            size="medium"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="timechange"
          ></el-date-picker>
        </div>
      </el-col>

      <el-col :span="8">
        <div>
          <el-button class="grid_button" type="primary" size="medium"
          @click="get_info('搜索')"
            >搜索</el-button
          >
          <el-button
            class="grid_button"
            type="primary"
            size="medium"
            @click="clear_input()"
            >重置</el-button
          >

          <!-- <el-button
            class="grid_button"
            type="primary"
            size="medium"
            @click="jump()"
            >跳转</el-button
          > -->

        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%; margin-top:3%; " v-loading="tableDataLoading">
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="creattime" label="最近提交时间"></el-table-column>
        <el-table-column label="自测结果">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="lookOption(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      page: 1,
      pageSize: 10,
      name: "",
      phone: "",
      timeSelect: [],
      tableDataLoading:false,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      value: "",
      tableData: []
    };
  },
  mounted() {
    this.get_info();
  },

  methods: {
    //跳转详情
    jump(e){
       this.$router.push(
        "/ESManagement/ESEmployeedetails"
      );
    },
    //查询员工信息
    get_info(val) {
      var that = this;
       if (val == "搜索") {
        this.page = 1;
      }
   
        this.tableDataLoading = true;
      var page = that.page
       var size = that.pageSize
       var name=that.name
       var gender=that.value
       var  phone=that.phone
       var time=that.timeSelect

      
      var body = {
        page,
        size,
        name,
        gender,
        phone,
        time,

      };
  
      console.log(body);
      this.$api
        .post("/manage/HrQueryAllEmploy", body)
        .then(res => {
          console.log(res.data);
          this.tableData=res.data.data
          this.count=res.data.count
            this.tableDataLoading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.msg);
            this.tableDataLoading = false;
        });
    },

    lookOption(e) {
      console.log(e)
         this.$router.push(
        "/ESManagement/ESEmployeedetails?userid="+e.userid+"&name="+e.name+"&sex="+e.sex+"&phone="+e.phone
      );
    },
    timechange(val) {
      console.log(val);
      this.timeSelect=val
    },
    handleClick(row) {
      console.log(row);
    },
    //点击重置输入框
    clear_input() {
      this.timeSelect = [];
      this.name = "";
      this.phone = "";
      this.value="";
       this.get_info();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.get_info();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.get_info();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="sass" scoped>

</style>

