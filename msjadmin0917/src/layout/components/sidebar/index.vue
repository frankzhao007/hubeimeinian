<template>
  <div>
    <div class="menu-wrapper-img">
      <img src="../../../assets/img/logo.png" alt>
    </div>
    <el-menu mode="vertical" :ollapse-transition="ollapse_transition" @select="selecthandle" :default-active="$route.path" text-color="#fff" active-text-color="#fff" :unique-opened="unique_opened">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>

    
  </div>

</template>

<script>
import sidebarItem from "./sidebarItem";
import router from "../../../router/index.js";
export default {
  components: { sidebarItem },
  data() {
    return {
      ollapse_transition: false,
      unique_opened: true
    };
  },
  mounted() {
    // console.log("左侧菜单栏加载成功");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selecthandle(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
    }
  },
  computed: {
    routes() {
      return global.antRouter;
    },
    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  },
  watch: {}
};
</script>
<style lang="scss">
.menu-wrapper-img {
  text-align: center;
  padding: 20px 0;
}
.menu-wrapper-img img {
  width: 50px;
  height: 50px;
}
</style>

