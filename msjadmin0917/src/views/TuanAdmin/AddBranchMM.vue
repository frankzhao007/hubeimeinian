<template>
  <div style="margin: 20px">
    <div style="font-size: 20px">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp新增/编辑分院</span>
    </div>

    <el-form
      :inline="true"
      :model="seekobj"
      style="margin-top: 20px"
      label-position="right"
      label-width="120px"
      size="medium"
    >
      <div>
        <el-form-item label="分院代码：">
          <el-input v-model="seekobj.FYDM" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="分院名称：">
          <el-input v-model="seekobj.FYMC" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <div style="float: left; margin-top: 50px">
      <el-button type="primary" @click="submitForm()">保存</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddBranchMM",
  components: {},
  data() {
    return {
      seekobj: {
        FYDM: "",
        FYMC: "",
        pageindex: 1,
        pagesize: 10,
      },
      tableobj: {
        list: [],
        loading: "",
        total: 0,
      },

      current_chang: "",
    };
  },
  mounted() {
    if (this.$route.query.FYDM) {
      this.seekobj = {
        FYDM: this.$route.query.FYDM,
        FYMC: this.$route.query.FYMC,
      };
    }
  },
 
  methods: {
    submitForm() {
      if (this.$route.query.FYDM) {
        console.log("编辑");
      } else {
        console.log("新增");
        if (this.seekobj.FYDM != "") {
          if (this.seekobj.FYMC != "") {
            var body = {
              hospitalCode: this.seekobj.FYDM,
              hospitalName: this.seekobj.FYMC,
            };
            this.$network3
              .post("/mnoracle/schedule/CreateHospital", body)
              .then((res) => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "保存成功!",
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.$message.error("分院名称不能为空！");
          }
        } else {
          this.$message.error("分院代码不能为空！");
        }
      }
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped>
</style>
