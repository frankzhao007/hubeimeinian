<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <el-submenu :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.name"></sidebar-item>
          <!-- <router-link v-else :to="item.path+'/'+child.path" :key="child.name"> -->
          <router-link v-else-if="AccessControl(child.meta.title)" :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <i :class="child.meta.icon"></i>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {
    // console.log("******************* :", this.routes);
  },
  methods: {
    //权限筛选
    AccessControl(name) {
      if (name == "分销员列表" || name == "配置分销员套餐") {
        if (this.$store.getters.getRoleInfo.AccountName == "优健康分公司") {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      // if (isExternal(routePath)) {
      //   return routePath
      // }
      // if (isExternal(this.basePath)) {
      //   return this.basePath
      // }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>