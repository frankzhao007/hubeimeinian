<template>
  <div>
    <div class="DTtreebox" v-for="(item,index) in GetDepartmentTreeList" :key="index">
      <div class="DTtreebox_item DTtreebox_itembtn" @click="changeshow(item,index)">
        <div>
          <i class="el-icon-s-home"></i>
          <span>{{item.Name}}</span>
        </div>
        <div v-if="item.HasSon">
          <i v-if="item.isshow" class="el-icon-arrow-down"></i>
          <i v-else class="el-icon-arrow-up"></i>
        </div>
      </div>
      <transition name="fade">
        <div v-if="item.HasSon&&item.isshow">
          <List @selectdepartment="selectdepartment" :GetDepartmentTreeList="item.Son"></List>
        </div>
      </transition>
    </div>

  </div>
</template>
<script>
export default {
  name: "List",
  props: {
    GetDepartmentTreeList: Array
  },
  watch: {
    GetDepartmentTreeList() {
      this.pushisshow(this.GetDepartmentTreeList);
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.pushisshow(this.GetDepartmentTreeList);
    // this.GetDepartmentTreeList = Object.assign({}, this.GetDepartmentTreeList);
    console.log(this.GetDepartmentTreeList);
  },
  methods: {
    pushisshow(list) {
      list.forEach(item => {
        //循环向 a里面的每一个数据添加一个名为aa值为0的新属性
        if (item.HasSon) {
          if (!item.isshow) {
            this.$set(item, "isshow", false);
          }
          if (item.Son) {
            this.pushisshow(item.Son);
          }
        }
      });
    },
    selectdepartment(item) {
      this.$emit("selectdepartment", item);
    },
    changeshow(item, index) {
      console.log(item, index);
      this.$emit("selectdepartment", item);
      if (item.isshow != null) {
        item.isshow = !item.isshow;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.DTtreebox {
  padding-left: 10px;
  .DTtreebox_item {
    transition: height 0.28s;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .DTtreebox_itembtn {
    cursor: pointer;
  }
  .DTtreebox_itembtn:hover {
    background-color: #f0f2f5;
  }
  .el-icon-arrow-down:before {
    color: #000;
    font-size: 18px;
  }
}
</style>