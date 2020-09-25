<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 企业列表 --- businesslist -->
    <!-- 健康俱乐部 --- 企业列表 --- businesslist11111
    <el-button @click="goSubpage('/healthclub/configuration')">企业配置</el-button>
    <el-button @click="goSubpage('/healthclub/incentiveplan')">激励方案</el-button> -->
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekBusinessbox" label-position='right' label-width="120px" size="medium">
        <el-form-item label="企业名称：">
          <el-select v-model="seekBusinessbox.BusinessName" placeholder="" style="width:200px" filterable clearable placeholder="请选择企业">
            <el-option v-for="item in seekBusinessbox.AllBusinessList" :key="item.accountname" :label="item.accountname" :value="item.accountname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-search" @click="seekbtn()">搜 索</el-button>
          <el-button type="primary" @click="addBusinessBoxBtn()">新增企业</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableBusinessbox.BusinessList" style="width: 100%" v-loading="tableBusinessbox.loading">
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="companyNumber" label="员工数"></el-table-column>
        <el-table-column label="企业配置">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="goSubpage('/healthclub/configuration?id='+scope.row.id)">配置详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="押金金额">
          <template slot-scope="scope">
            {{scope.row.cashPledge/100}}元
          </template>
        </el-table-column>
        <el-table-column label="激励方案">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="goSubpage('/healthclub/incentiveplan?id='+scope.row.id)">配置详情</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="activity" label="企业活动位">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="">{{scope.row.activity}}</el-button>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delBusiness()">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableBusinessbox.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tableBusinessbox.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableBusinessbox.total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹出层 -->
    <div>
      <div>
        <el-dialog title="新增企业" :visible.sync="addBusinessBox.isshow" width="500px">
          <div style="margin:0 20px">
            <span>企业名称：</span>
            <el-select v-model="addBusinessBox.BusinessName" placeholder="" style="width:200px" filterable clearable placeholder="请选择企业">
              <el-option v-for="item in seekBusinessbox.AllBusinessList" :key="item.accountname" :label="item.accountname" :value="item.accountname"></el-option>
            </el-select>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addBusinessBox.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmaddBusiness()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
//  import network from '../../../api/network'
export default {
  name: "businesslist",
  components: {},
  data() {
    return {
      //搜索栏属性
      seekBusinessbox: {
        BusinessName: "全部",
        AllBusinessList: []
      },
      //数据表格
      tableBusinessbox: {
        loading: false,
        BusinessList: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      addBusinessBox: {
        isshow: false,
        BusinessName: ""
      }
    };
  },
  created() {},
  mounted() {
    console.log(this.$root.$data);
    this.getEnterpriseList();
    this.getEnterpriseMsg();
  },
  methods: {
    goSubpage(page) {
      this.$router.push(page);
    },
    //搜索btn
    seekbtn() {
      this.tableBusinessbox.currentPage = 1;
      this.getEnterpriseMsg();
    },
    // 获取企业列表
    getEnterpriseList() {
      this.seekBusinessbox.AllBusinessList = [{ accountname: "全部" }];
      this.$network
        .post("/healthClub/getEnterpriseList")
        .then(res => {
          console.log(res);
          this.seekBusinessbox.AllBusinessList = this.seekBusinessbox.AllBusinessList.concat(
            res.data
          );
        })
        .catch(res => {
          console.error(res);
          this.$message.error(res.msg);
        });
    },
    // 获取已经添加的企业列表
    getEnterpriseMsg() {
      this.tableBusinessbox.loading = true;
      var body = {
        company: this.seekBusinessbox.BusinessName,
        page: this.tableBusinessbox.currentPage,
        each: this.tableBusinessbox.pagesize
      };
      if (body.company=='全部') {
        body.company=''
      }
      this.$network
        .post("/healthClub/getEnterpriseMsg", body)
        .then(res => {
          this.tableBusinessbox.loading = false;
          console.log(res);
          this.tableBusinessbox.BusinessList = res.data.companyList;
          this.tableBusinessbox.total = res.data.count;
        })
        .catch(res => {
          console.error(res);
          this.$message.error(res.msg);
        });
    },
    //新增企业弹窗
    addBusinessBoxBtn() {
      this.addBusinessBox.isshow = true;
      this.addBusinessBox.BusinessName = "";
    },
    //确认添加企业
    confirmaddBusiness() {
      if (
        !this.addBusinessBox.BusinessName ||
        this.addBusinessBox.BusinessName == ""
      ) {
        this.$message.error("请选择企业");
        return;
      }
      this.$network
        .post("/healthClub/addEnterprise", {
          company: this.addBusinessBox.BusinessName
        })
        .then(res => {
          console.log(res);
          this.addBusinessBox.isshow = false;
          this.getEnterpriseMsg();
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    //删除企业
    delBusiness() {
      this.$confirm("删除活动后不可恢复，请确认后操作！", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
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
      this.tableBusinessbox.currentPage = 1;
      this.tableBusinessbox.pagesize = val;
      this.getEnterpriseMsg();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableBusinessbox.currentPage = val;
      this.getEnterpriseMsg();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>