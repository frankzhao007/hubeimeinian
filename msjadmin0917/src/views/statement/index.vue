<template>
  <div class="app-container">
   
  </div>
</template>

<script>
export default {
  name: "statement",
  components: {},
  watch: {},
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      tableData: [
        {
          name: "周杰伦",
          enterprise: "北京五八到家",
          department: "运营部",
          Tel: "17699999999",
          auditStatus: "待审核",
          combo: "未配置"
        },
        {
          name: "周杰伦",
          enterprise: "北京五八到家",
          department: "运营部",
          Tel: "17699999999",
          auditStatus: "待审核",
          combo: "未配置"
        },
        {
          name: "周杰伦",
          enterprise: "北京五八到家",
          department: "运营部",
          Tel: "17699999999",
          auditStatus: "待审核",
          combo: "未配置"
        },
        {
          name: "周杰伦",
          enterprise: "北京五八到家",
          department: "运营部",
          Tel: "17699999999",
          auditStatus: "待审核",
          combo: "未配置"
        },
        {
          name: "周杰伦",
          enterprise: "北京五八到家",
          department: "运营部",
          Tel: "17699999999",
          auditStatus: "待审核",
          combo: "未配置"
        },
        {
          name: "周杰伦",
          enterprise: "北京五八到家",
          department: "运营部",
          Tel: "17699999999",
          auditStatus: "待审核",
          combo: "未配置"
        }
      ],
      value: "",
      input: ""
    };
  },
  mounted() {},
  methods: {
    handleSelectionChange() {},
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  computed: {}
};
</script>

<style lang="scss">

</style>