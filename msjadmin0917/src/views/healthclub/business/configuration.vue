<template>
  <div class="app-container">
    <div style="font-size:20px">
      <i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp企业配置</span>
    </div>
    <!-- 健康俱乐部 --- 企业列表子页面 --- 企业配置 -->
    <!-- 健康俱乐部 --- 企业列表子页面 --- 企业配置 --- configuration -->
    <div style="line-height:40px">
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">企业名称：</div>
        </el-col>
        <el-col :span="18">{{DeployInfo.name}}</el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">首页顶部显示名称：</div>
        </el-col>
        <el-col :span="18">
          <el-input style="width:250px" :placeholder="DeployInfo.name" v-model="DeployInfo.indexTitle" clearable></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">健康管理模块标题：</div>
        </el-col>
        <el-col :span="18">
          <el-input style="width:250px" placeholder="健康管理" maxlength="30" v-model="DeployInfo.healthTitle" clearable></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">是否有套餐推荐模块：</div>
        </el-col>
        <el-col :span="18">
          <el-switch v-model="DeployInfo.isPackage" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0">
          </el-switch>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">套餐模块链接：</div>
        </el-col>
        <el-col :span="18">
          <el-input style="width:250px" :disabled="DeployInfo.isPackage==0" placeholder="请输入描述" v-model="DeployInfo.packageUrl" clearable></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">是否有查看报告模块：</div>
        </el-col>
        <el-col :span="18">
          <el-switch v-model="DeployInfo.isReport" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0">
          </el-switch>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">是否有健康管理模块：</div>
        </el-col>
        <el-col :span="18">
          <el-switch v-model="DeployInfo.isHealth" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0">
          </el-switch>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">是否有签到积分模块：</div>
        </el-col>
        <el-col :span="18">
          <el-switch v-model="DeployInfo.isIntegrate" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0">
          </el-switch>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">签到押金金额：</div>
        </el-col>
        <el-col :span="18">
          <el-input :disabled="DeployInfo.isIntegrate==0" v-model="DeployInfo.cashPledge" style="width:80px" maxlength="8" @input="inputcashPledge"></el-input>&nbsp&nbsp&nbsp元
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4">
          <div style="float:right">完成规则：</div>
        </el-col>
        <el-col :span="18">
          <div style="display:inline-block;width:106px">持续打卡</div>
          <el-input v-model="DeployInfo.continueDay" style="width:80px" maxlength="8" @input="inputcontinueDay" placeholder="请输入"></el-input> <span>天</span>
          <div style="margin-top:10px"></div>
          <div style="display:inline-block;width:106px">每日领取健康豆≥</div>
          <el-input v-model="DeployInfo.claimBeansDay" style="width:80px" maxlength="8" @input="inputclaimBeansDay" placeholder="请输入"></el-input> <span>个</span>
        </el-col>
      </el-row>
    </div>

    <div style="float:right;margin-right:50px">
      <el-button @click="goback()">取 消</el-button>
      <el-button type="primary" @click="updataDeploy()">保 存</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "configuration",
  components: {},
  data() {
    return {
      DeployInfo: {}
    };
  },
  created() {},
  mounted() {
    console.log(this.$route.query);
    this.getDeploy();
  },
  methods: {
    goback() {
      window.history.go(-1);
    },
    // 获取企业配置
    getDeploy() {
      this.$network
        .post("/healthClub/getDeploy", {
          id: this.$route.query.id
        })
        .then(res => {
          console.log(res);
          this.DeployInfo = res.data;
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    // 设置企业配置
    updataDeploy() {
      if (!this.DeployInfo.indexTitle || this.DeployInfo.indexTitle == "") {
        this.$message.error("请输入首页顶部显示名称");
        return;
      }
      if (
        (this.DeployInfo.isPackage == 1 && !this.DeployInfo.packageUrl) ||
        (this.DeployInfo.isPackage == 1 && this.DeployInfo.packageUrl == "")
      ) {
        this.$message.error("请输入套餐模块链接");
        return;
      }
      if (!this.DeployInfo.healthTitle || this.DeployInfo.healthTitle == "") {
        this.$message.error("请输入健康管理模块标题");
        return;
      }
      if (
        this.DeployInfo.cashPledge !== 0 &&
        this.DeployInfo.cashPledge === ""
      ) {
        this.$message.error("请输入押金金额");
        return;
      }
      if (!this.DeployInfo.continueDay || this.DeployInfo.continueDay == "") {
        this.$message.error("请输入打卡天数");
        return;
      }
      if (
        !this.DeployInfo.claimBeansDay ||
        this.DeployInfo.claimBeansDay == ""
      ) {
        this.$message.error("请输入每日领取健康豆");
        return;
      }
      this.DeployInfo.id = this.$route.query.id;
      this.$network
        .post("/healthClub/setDeploy", this.DeployInfo)
        .then(res => {
          console.log(res);
          this.$message.success("保存成功");
          this.$router.go(-1);
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.data);
        });
    },
    inputcashPledge() {
      this.DeployInfo.cashPledge = this.DeployInfo.cashPledge.replace(
        /[^\.\d]/g,
        ""
      );
      this.DeployInfo.cashPledge = this.DeployInfo.cashPledge.replace(".", "");
    },
    inputcontinueDay() {
      this.DeployInfo.continueDay = this.DeployInfo.continueDay.replace(
        /[^\.\d]/g,
        ""
      );
      this.DeployInfo.continueDay = this.DeployInfo.continueDay.replace(
        ".",
        ""
      );
    },
    inputclaimBeansDay() {
      this.DeployInfo.claimBeansDay = this.DeployInfo.claimBeansDay.replace(
        /[^\.\d]/g,
        ""
      );
      this.DeployInfo.claimBeansDay = this.DeployInfo.claimBeansDay.replace(
        ".",
        ""
      );
    }
  },
  watch: {
    "DeployInfo.isHealth": {
      handler(nvl, ovl) {
        if (this.DeployInfo.isIntegrate != nvl) {
          this.DeployInfo.isIntegrate = nvl;
        }
      },
      deep: true,
      immediate: true
    },

    "DeployInfo.isIntegrate": {
      handler(nvl, ovl) {
        if (this.DeployInfo.isHealth != nvl) {
          this.DeployInfo.isHealth = nvl;
        }
        if (nvl == 0) {
          this.DeployInfo.cashPledge = 0;
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {}
};
</script>

<style lang="scss">
</style>