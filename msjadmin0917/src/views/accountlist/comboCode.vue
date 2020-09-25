<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
    <div style="font-size: 20px; ">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp返回</span>
    </div>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%;margin-top:20px" v-loading="loadings">
      <el-table-column prop="packageCode" label="套餐编码" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="packageName" label="套餐名称" min-width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="genderName" label="套餐支持性别" min-width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="maritalStatusID" label="婚否" min-width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.maritalStatusID=='0'" type="text" size="medium">未知</el-button>
          <el-button v-if="scope.row.maritalStatusID=='1'" type="text" size="medium">已婚</el-button>
          <el-button v-if="scope.row.maritalStatusID=='2'" type="text" size="medium">未婚</el-button>
        </template>

      </el-table-column>
      <el-table-column prop="orderBeginCheckDate" label="订单开始时间" min-width="100" show-overflow-tooltip> </el-table-column>

      <el-table-column prop="orderEndCheckDate" label="订单结束时间" min-width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column label="套餐支持门店" min-width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="mendianExport(scope.row)" type="text" size="medium">下载</el-button>
        </template>
      </el-table-column>
      <!--<el-table-column prop="data" label="套餐支持加项包" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="looknote(scope.row)" type="text" size="medium">查看</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <el-dialog width="800px" title="套餐支持加项包" :visible.sync="isAdditem" append-to-body>
      <el-table :data="tableData" style="width: 100%;" v-loading="loadings">
        <el-table-column prop="packageCode" label="加项包编码" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="packageName" label="加项包名称" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="genderName" label="套餐支持性别" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="maritalStatusID" label="婚否" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="orderBeginCheckDate" label="订单开始时间" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="orderEndCheckDate" label="订单结束时间" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column label="支持门店" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="mendianExport(scope.row)" type="text" size="medium">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableselectenterMeal.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableselectenterMeal.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableselectenterMeal.total"></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAdditem= false">取 消</el-button>
        <el-button type="primary" @click="isAdditem = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div style="height:30px;margin-top:20px;">
      <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableselectenterMeal.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableselectenterMeal.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableselectenterMeal.total"></el-pagination>
    </div>
  </div>

</template>
<script>
import network from "../../api/network";
export default {
  data() {
    return {
      companyId: "",
      judgeMsg: {
        secretKey: [],
        islook: false, //是否为查看
        isedit: false, //是否为编辑
        isshow: false, //新增或编辑弹窗
        ActivityName: "",
        CompanyId: "",
        ConfStatus: "1"
      },

      appkey: "",
      isAdditem: false,
      seekList: {
        name: "",
        area: "",
        city: "",
        coding: ""
      },

      tableselectenterMeal: {
        //分页
        pageindex: 1,
        pagesize: 10,
        total: 0
      },

      tableData: [], //列表
      loadings: false
    };
  },
  components: {},
  mounted() {
    console.log(this.$route.query);
    this.appkey = this.$route.query.appkey;
    var judgeMsg = this.$route.query.judgeMsg;
    var secretKey = this.$route.query.secretKey;
    var secretKeyParse = JSON.parse(secretKey);
    var judgeMsgParse = JSON.parse(judgeMsg);
    this.judgeMsg.secretKey = secretKeyParse;
    this.judgeMsg.islook = judgeMsgParse.islook;
    this.judgeMsg.isedit = judgeMsgParse.isedit;
    this.judgeMsg.isshow = judgeMsgParse.isshow;
    this.judgeMsg.ActivityName = judgeMsgParse.ActivityName;
    this.judgeMsg.CompanyId = judgeMsgParse.CompanyId;
    this.judgeMsg.ConfStatus = judgeMsgParse.ConfStatus;

    console.log(this.judgeMsg);
    if (this.appkey) {
      this.getmessage();
    }
    if (this.$route.query.companyId) {
      this.companyId = this.$route.query.companyId;
    }
  },
  methods: {
    getmessage() {
      var that = this;
      console.log(this.appkey);
      var body = {
        size: this.tableselectenterMeal.pagesize,
        page: this.tableselectenterMeal.pageindex,
        appkey: this.appkey
      };
      this.$network1
        .get("/appointment/findPackages", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            that.tableselectenterMeal.total = res.data.count;
            that.tableData = res.data.data.data;
            console.log(that.tableData);
            //            tableData
            //            this.findEnterParamConfs();
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    // 门店导出
    mendianExport(e) {
      var that = this;
      console.log(e);

      var body = {
        companyId: this.companyId,
        packageCode: e.packageCode
      };
      this.$network1
        .get("/appointment/storeExported", body)
        .then(res => {
          console.log(res.data);
          //  window.open(this.$parent.$parent.$parent.weburl  + res.data.url);
          let a = document.createElement("a");
          //  console.log(require("../assets/qrcode.png"));
          a.href = res.data; // href链接指向的地址
          a.download = res.data; // 下载的的名称
          a.click(); // 触发a标签的单击事件
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    looknote(val) {
      this.isAdditem = true;
    },

    scheduleSet() {
      this.$router.push("/enterprisemanagement/setschedule");
    },
    getPackage() {
      var that = this;
      console.log(this.appkey);
      var body = {
        appkey: this.appkey
      };
      this.$network1
        .get("/appointment/findPackages", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            that.tableselectenterMeal.total = res.count;
            that.tableData = res.data;
            console.log(that.tableData);
            //            tableData
            //            this.findEnterParamConfs();
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    goback() {
      //  	judgeMsg:{
      //  		secretKey:[],
      //  		islook: false, //是否为查看
      //      isedit: false, //是否为编辑
      //      isshow: false, //新增或编辑弹窗
      //  	},

      //返回
      var judgeMsg = {
        islook: this.judgeMsg.islook,
        isedit: this.judgeMsg.isedit,
        isshow: this.judgeMsg.isshow,
        ActivityName: this.judgeMsg.ActivityName,
        CompanyId: this.judgeMsg.CompanyId,
        ConfStatus: this.judgeMsg.ConfStatus
      };
      var judgeMsgString = JSON.stringify(judgeMsg);
      var secretKeyString = encodeURIComponent(
        JSON.stringify(this.judgeMsg.secretKey)
      );
      console.log(judgeMsg);
      this.$router.push(
        "/accountmanagement/EnterpriseOption?judgeMsg=" +
          judgeMsgString +
          "&&secretKey=" +
          secretKeyString
      );
    },

    handleSizeChange(val) {
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;
      this.getmessage();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      this.getmessage();
      console.log(`当前页: ${val}`);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.addimage {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 2px dashed #dddddd;
  float: left;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>




