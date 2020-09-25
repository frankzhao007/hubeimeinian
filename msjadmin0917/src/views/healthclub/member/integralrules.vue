<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 积分规则 --- integralrules -->
    <!-- 健康俱乐部 --- 积分规则 --- integralrules -->
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableintegrationRules.integrationRulesList" style="width: 100%" v-loading="tableintegrationRules.loading">
        <el-table-column prop="behaviour" label="行为" min-width="100px"></el-table-column>
        <el-table-column prop="getBean" label="获得健康豆" min-width="100px"></el-table-column>
        <el-table-column prop="limiting" label="限制" min-width="100px"></el-table-column>
        <el-table-column prop="effectiveTime" label="有效时机" min-width="100px"></el-table-column>
        <el-table-column prop="taskSpecification" label="任务说明" min-width="200px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date" label="发布设置" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openupdataintegrationRules(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableintegrationRules.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tableintegrationRules.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableintegrationRules.total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹窗 -->
    <div>
      <el-dialog title="发布设置" :visible.sync="updataintegrationRules.isshow" width="500px">
        <div>
          <el-form :inline="true" :model="updataintegrationRules" label-position='right' label-width="120px" size="medium">
            <el-form-item label="获得健康豆：">
              <el-input v-model="updataintegrationRules.getBean" placeholder="请输入健康豆" style="width:250px" @input="inputgetBean"></el-input>
            </el-form-item>
            <el-form-item label="任务说明：">
              <el-input v-model="updataintegrationRules.taskSpecification" type="textarea" placeholder="请输入任务说明" style="width:250px" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updataintegrationRules.isshow = false">取 消</el-button>
          <el-button type="primary" @click="updateIntegrationRule">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "integralrules",
  components: {},
  data() {
    return {
      tableintegrationRules: {
        integrationRulesList: [],
        loading: false,
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      updataintegrationRules: {
        isshow: false,
        getBean: "",
        taskSpecification: ""
      }
    };
  },
  created() {},
  mounted() {
    this.findIntegrationRulesByPaging();
  },
  methods: {
    inputgetBean() {
      this.updataintegrationRules.getBean = this.updataintegrationRules.getBean.replace(
        /[^\.\d]/g,
        ""
      );
      this.updataintegrationRules.getBean = this.updataintegrationRules.getBean.replace(
        ".",
        ""
      );
    },
    openupdataintegrationRules(row) {
      this.updataintegrationRules.isshow = true;
      this.updataintegrationRules.obj = row;
      this.updataintegrationRules.getBean = row.getBean;
      this.updataintegrationRules.taskSpecification = row.taskSpecification;
    },
    updateIntegrationRule() {
      if (
        !this.updataintegrationRules.getBean ||
        this.updataintegrationRules.getBean == ""
      ) {
        this.$message.error("请输入健康豆");
        return;
      }
      if (
        !this.updataintegrationRules.taskSpecification ||
        this.updataintegrationRules.taskSpecification == ""
      ) {
        this.$message.error("请输入任务说明");
        return;
      }
      this.$network
        .post("/healthClub/healthBeans/updateIntegrationRule", {
          behaviour: this.updataintegrationRules.obj.behaviour,
          getBean: Number(this.updataintegrationRules.getBean),
          limiting: this.updataintegrationRules.obj.limiting,
          effectiveTime: this.updataintegrationRules.obj.effectiveTime,
          taskSpecification: this.updataintegrationRules.taskSpecification,
          integrationRuleId: this.updataintegrationRules.obj.integrationRuleId
        })
        .then(res => {
          console.log(res);
          this.updataintegrationRules.isshow = false;
          this.findIntegrationRulesByPaging();
          this.$message.success("设置成功");
        })
        .catch(res => {
          console.log(res);
          this.$message.success("设置失败");
        });
    },
    findIntegrationRulesByPaging() {
      this.$network
        .get("/healthClub/healthBeans/findIntegrationRulesByPaging", {
          pageIndex: this.tableintegrationRules.currentPage,
          pageSize: this.tableintegrationRules.pagesize
        })
        .then(res => {
          console.log(res);
          this.tableintegrationRules.integrationRulesList =
            res.data.integrationRules;
          this.tableintegrationRules.total = res.data.count;
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableintegrationRules.currentPage = 1;
      this.tableintegrationRules.pagesize = val;
      this.findIntegrationRulesByPaging();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableintegrationRules.currentPage = val;
      this.findIntegrationRulesByPaging();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>