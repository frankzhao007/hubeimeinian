<template>
  <div class="app-container">
    <!-- <el-button type="primary" @click="go">首页</el-button>
    <el-button type="primary" @click="testPost">登录</el-button>
    <el-button type="primary" @click="zhanghao">账号列表</el-button> -->
  </div>
</template>

<script>
export default {
  name: "dashboard",
  components: {},
  watch: {},
  data() {
    return {
      a: "11"
    };
  },
  mounted() {
    this.go();
  },
  methods: {
    go() {
      this.$router.push("/");
    },
    zhanghao() {
      var body = {
        phoneNumber: "15327168996",
        password: "123456"
      };
      this.$api
        .get("/account/pullAll", body)
        .then(res => {
          // 获取数据成功后的其他操作
          console.log(this.a);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    testPost() {
      var body = {
        phoneNumber: "15327168996",
        password: "123456"
      };
      this.$api
        .post("/login", body)
        .then(res => {
          // 获取数据成功后的其他操作
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss"></style>
