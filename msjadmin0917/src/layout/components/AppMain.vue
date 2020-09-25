<template>
  <div>
    <section v-if="isshow" class="app-main1">
      <router-view :key="key"></router-view>
    </section>
    <section v-else class="app-main">
      <router-view :key="key"></router-view>
    </section>
  </div>

</template>

<script>
export default {
  name: "AppMain",
  components: {},
  data() {
    return {
      isshow: false
    };
  },
  mounted() {
   
    //负责展示所有右侧内容
    console.log("AppMain加载成功---右侧主要内容");
    console.log(this.$store.getters.getRoleInfo);
    if (this.$store.getters.getRoleInfo.AccountType == 2) {
      if (
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康东莞分公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "深圳分公司全国" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康深圳公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康南宁分公司" ||
        this.$store.getters.getRoleInfo.FromCompany == "美年大健康玉林分公司"
      ) {
        this.isshow = false;
        // this.isshow = true;
      } else {
        this.isshow = false;
      }
    } else {
      this.isshow = false;
    }
  },
  methods: {
    
  },
  computed:{
     key() {
      return this.$route.path;
    },
  }
};
</script>

<style>
</style>
