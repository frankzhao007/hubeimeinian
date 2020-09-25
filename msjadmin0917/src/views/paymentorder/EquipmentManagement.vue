<template>
  <div style="margin:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="设备编号：">
          <el-input v-model="seekobj.equipmentId" clearable placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="门店编号：">
          <el-input v-model="seekobj.storeNumber" clearable placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="门店名称：">
          <el-input v-model="seekobj.storeName" clearable placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="设备状态：">
          <el-select v-model="seekobj.online" placeholder="" style="width:200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="不在线" value="0"></el-option>
            <el-option label="在线" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="equimentExport">导 出</el-button>
          <el-button type="primary" @click="seekbtn" icon="el-icon-search">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="baseSearchBox" style="margin-top:10px">
      <div class="database">
        <span>设备数量</span>
        <br>
        <span style="font-size:24px">{{this.tableobj.total}}</span>
      </div>
    </div>

    <!-- 数据表格 -->
    <div style="margin-top:20px">
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="equipmentId" label="设备编号"></el-table-column>
        <el-table-column prop="storeNumber" label="门店编号"></el-table-column>
        <el-table-column prop="storeName" label="门店名称"></el-table-column>
        <el-table-column label="设备状态">
          <template slot-scope="scope">{{scope.row.online?'在线':'不在线'}}</template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="pagesizechange" @current-change="pageindexchange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  components: {},
  data() {
    return {
      seekobj: {
        equipmentId: "",
        storeNumber: "",
        storeName: "",
        online: "",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      }
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.getEquimentCount();
  },
  methods: {
    pagesizechange(val) {
      this.seekobj.pageindex = 1;
      this.seekobj.pagesize = val;
      this.getEquimentCount();
    },
    pageindexchange(val) {
      this.seekobj.pageindex = val;
      this.getEquimentCount();
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.getEquimentCount();
    },
    // 导出设备信息
    equimentExport() {
      this.$network4
        .get("/equimentExport")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            let a = document.createElement("a");
            a.href = "http://selfmachine.ihaozhuo.com/" + res.data; // href链接指向图片的地址
            a.download = "http://selfmachine.ihaozhuo.com/" + res.data; // 下载的图片的名称
            a.click(); // 触发a标签的单击事件
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //获取自助机设备列表
    getEquimentCount() {
      this.tableobj.loading = true;
      this.$network4
        .post("/getEquimentCount", {
          equipmentId: this.seekobj.equipmentId,
          storeNumber: this.seekobj.storeNumber,
          storeName: this.seekobj.storeName,
          online: this.seekobj.online,
          page: this.seekobj.pageindex,
          each: this.seekobj.pagesize
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj.loading = false;
            this.tableobj.list = res.data.equimentList;
            this.tableobj.total = res.data.count;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    }
  }
};
</script>
<style lang="scss">
.baseSearchBox {
  /* min-width: 900px; */
  /* margin-bottom: 20px; */
  min-height: 50px;
  font-size: 14px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}
.database {
  min-width: 225px;
  height: 80px;
  line-height: 40px;
  background-color: #5270c7;
  border-radius: 10px;
  margin-right: 20px;
  text-align: center;
  color: white;
}
</style>