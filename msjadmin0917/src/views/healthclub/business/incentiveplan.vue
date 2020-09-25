<template>
  <div class="app-container">
    <div style="font-size:20px">
      <i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp激励方案</span>
    </div>
    <div>
      <el-button style="float:right" type="primary" icon="el-icon-plus" @click="addStimulateBtn()">新增激励</el-button>
    </div>
    <!-- 数据表格 -->

    <div style="padding-top:60px">
      <el-table :data="tableStimulate.StimulateList" style="width: 100%" v-loading="tableStimulate.loading">
        <el-table-column prop="name" label="激励名称" min-width="160px"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="160px">
        </el-table-column>
        <el-table-column prop="executionCycle" label="完成周期" min-width="80px">
          <template slot-scope="scope">
            {{scope.row.executionCycle}}天
          </template>
        </el-table-column>
        <el-table-column prop="accumulativeBeans" label="累计获取健康豆" min-width="120px"></el-table-column>
        <el-table-column prop="detail" label="获得奖励明细" show-overflow-tooltip min-width="160px"></el-table-column>
        <el-table-column prop="explain" label="说明" show-overflow-tooltip min-width="160px"></el-table-column>
        <el-table-column prop="completeNumber" label="完成人数" min-width="80px"></el-table-column>
        <el-table-column label="状态" min-width="65px">
          <template slot-scope="scope">
            {{stachange(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.status==0" type="text" size="mini" @click="editStimulateBtn(scope.row)">编辑</el-button>
            <el-button :disabled="scope.row.status==0" type="text" size="mini" @click="delStimulateBtn(scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableStimulate.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tableStimulate.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableStimulate.total">
        </el-pagination>
      </div>
    </div>

    <!-- 激励弹窗 -->
    <div>
      <el-dialog title="新增/编辑激励活动" :visible.sync="addStimulate.isshow" width="600px">
        <div>
          <el-form :model="addStimulate" label-position='right' label-width="180px" size="medium">
            <el-form-item label="激励活动名称：">
              <el-input v-model="addStimulate.name" placeholder="跑步..." maxlength="10" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="完成周期：">
              <el-input :disabled="addStimulate.isedit" @input="executionCycleinput()" maxlength="8" v-model="addStimulate.executionCycle" placeholder="400" style="width:150px"></el-input> 天
            </el-form-item>
            <el-form-item label="累计获得健康豆：">
              <el-input :disabled="addStimulate.isedit" @input="accumulativeBeansinput()" maxlength="8" v-model="addStimulate.accumulativeBeans" placeholder="400" style="width:150px"></el-input> 个
            </el-form-item>
            <el-form-item label="获得奖励明细：">
              <el-input v-model="addStimulate.detail" placeholder="请填写" style="width:300px" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="说明：">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-model="addStimulate.explain" placeholder="限制100字" maxlength="100" show-word-limit style="width:300px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addStimulate.isshow = false">取 消</el-button>
          <el-button v-if="!addStimulate.isedit" type="primary" @click="confirmaddStimulate()">确 定</el-button>
          <el-button v-if="addStimulate.isedit" type="primary" @click="confirmupdataStimulate()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "incentiveplan",
  components: {},
  data() {
    return {
      tableStimulate: {
        loading: false,
        StimulateList: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      addStimulate: {
        isedit: false,
        isshow: false,
        updataobj: "",
        name: "",
        executionCycle: "",
        accumulativeBeans: "",
        detail: "",
        explain: ""
      }
    };
  },
  created() {},
  mounted() {
    this.getStimulate();
  },
  methods: {
    executionCycleinput() {
      this.addStimulate.executionCycle = this.addStimulate.executionCycle.replace(
        /[^\.\d]/g,
        ""
      );
      this.addStimulate.executionCycle = this.addStimulate.executionCycle.replace(
        ".",
        ""
      );
    },
    accumulativeBeansinput() {
      this.addStimulate.accumulativeBeans = this.addStimulate.accumulativeBeans.replace(
        /[^\.\d]/g,
        ""
      );
      this.addStimulate.accumulativeBeans = this.addStimulate.accumulativeBeans.replace(
        ".",
        ""
      );
    },
    stachange(sta) {
      switch (sta) {
        case "1":
          return "在线";
          break;
        case "0":
          return "已删除";
          break;

        default:
          break;
      }
    },
    // 获取激励套餐列表
    getStimulate() {
      this.tableStimulate.loading = true;
      this.$network
        .post("/healthClub/getStimulate", {
          id: this.$route.query.id,
          page: this.tableStimulate.currentPage,
          each: this.tableStimulate.pagesize
        })
        .then(res => {
          console.log(res);
          this.tableStimulate.loading = false;
          this.tableStimulate.total = res.data.count;
          this.tableStimulate.StimulateList = res.data.stimulateList;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 添加激励套餐
    addStimulatefun() {
      this.$network
        .post("/healthClub/addStimulate", {
          id: this.$route.query.id,
          name: this.addStimulate.name,
          executionCycle: this.addStimulate.executionCycle,
          accumulativeBeans: this.addStimulate.accumulativeBeans,
          detail: this.addStimulate.detail,
          explain: this.addStimulate.explain
        })
        .then(res => {
          console.log(res);
          this.addStimulate.isshow = false;
          this.$message.success("添加成功");
          this.getStimulate();
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    addStimulateBtn() {
      this.addStimulate.isedit = false;
      this.addStimulate.name = "";
      this.addStimulate.executionCycle = "";
      this.addStimulate.accumulativeBeans = "";
      this.addStimulate.detail = "";
      this.addStimulate.explain = "";
      this.addStimulate.isshow = true;
    },
    Stimulateobjcheck() {
      if (!this.addStimulate.name || this.addStimulate.name == "") {
        this.$message.error("请输入激励活动名称");
        return false;
      }
      if (
        !this.addStimulate.executionCycle ||
        this.addStimulate.executionCycle == ""
      ) {
        this.$message.error("请输入完成周期");
        return false;
      }
      if (
        !this.addStimulate.accumulativeBeans ||
        this.addStimulate.accumulativeBeans == ""
      ) {
        this.$message.error("请输入累计获得健康豆");
        return false;
      }
      if (!this.addStimulate.detail || this.addStimulate.detail == "") {
        this.$message.error("请输入获得奖励明细");
        return false;
      }
      if (!this.addStimulate.explain || this.addStimulate.explain == "") {
        this.$message.error("请输入说明");
        return false;
      }
      return true;
    },
    confirmaddStimulate() {
      if (this.Stimulateobjcheck()) {
        this.addStimulatefun();
      }
    },
    delStimulateBtn(row) {
      console.log(row);
      this.$confirm("此操作将删除该活动，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$network
            .post("/healthClub/deleteStimulate", {
              id: this.$route.query.id,
              sId: row.id
            })
            .then(res => {
              this.getStimulate();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editStimulateBtn(row) {
      console.log(row);
      this.addStimulate.isedit = true;
      this.addStimulate.name = row.name;
      this.addStimulate.executionCycle = row.executionCycle;
      this.addStimulate.accumulativeBeans = row.accumulativeBeans;
      this.addStimulate.detail = row.detail;
      this.addStimulate.explain = row.explain;
      this.addStimulate.updataobj = row;
      this.addStimulate.isshow = true;
    },
    confirmupdataStimulate() {
      if (this.Stimulateobjcheck()) {
        this.$network
          .post("/healthClub/alterStimulate", {
            id: this.$route.query.id,
            sId: this.addStimulate.updataobj.id,
            name: this.addStimulate.name,
            detail: this.addStimulate.detail,
            explain: this.addStimulate.explain
          })
          .then(res => {
            console.log();
            this.$message.success("修改成功");
            this.getStimulate();
            this.addStimulate.isshow = false;
          })
          .catch(res => {
            this, $message.error(res.msg);
          });
      }
    },
    goback() {
      window.history.go(-1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableStimulate.currentPage = 1;
      this.tableStimulate.pagesize = val;
      this.getStimulate();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableStimulate.currentPage = val;
      this.getStimulate();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>