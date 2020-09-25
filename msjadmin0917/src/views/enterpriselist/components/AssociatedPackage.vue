<template>
  <div>
    <!-- 查询 -->
    <div>
      <el-row style="line-height:32px;">
        <el-col :span="3">
          <div style="float:right">所属分公司：</div>
        </el-col>
        <el-col :span="6">
          <el-select v-model="Inquire.fromCompany" disabled placeholder="请选择" size="small" style="width:100%;">
            <el-option v-for="(item,index) in SubsidiaryOptions" :key="item" :label="item.index" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <div style="float:right">套餐名称：</div>
        </el-col>
        <el-col :span="6">
          <el-input size="small" style="width:100%;" placeholder="点击输入" v-model="Inquire.goodname" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-button size="small" style="float:right" @click="findEnterMeal()">搜 索</el-button>
        </el-col>
      </el-row>
      <el-row style="line-height:32px; margin-top:10px">
        <el-col :span="3">
          <div style="float:right">商品类型：</div>
        </el-col>
        <el-col :span="6">
          <el-select v-model="Inquire.goodtype" placeholder="请选择" size="small" style="width:100%;">
            <el-option label="体检套餐" value="体检套餐"></el-option>
            <el-option label="电子体检卡" value="电子体检卡"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <div class="AssociatedPackage_table">
      <el-table :row-key="getRowKeys" height="500px" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :reserve-selection="true" width="55">
        </el-table-column>
        <el-table-column label="所属分公司">
          <template slot-scope="scope">{{Inquire.fromCompany}}</template>
        </el-table-column>
        <el-table-column prop="GoodType" label="商品类型">
        </el-table-column>
        <el-table-column prop="CreateBy" label="创建人"></el-table-column>
        <el-table-column prop="goodname" label="套餐名称">
        </el-table-column>
        <el-table-column prop="goodprice" label="售价" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Inquire.page" :page-sizes="[4, 20, 50, 100]" :page-size=Inquire.pageSize layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: ["editObj", "accountName", "fromCompanyData"],
  watch: {},
  data() {
    return {
      Inquire: {
        fromCompany: this.fromCompanyData,
        accountName: this.accountName,
        goodname: "",
        goodtype: "",
        page: 1,
        pageSize: 999999999
      },
      count: 0,
      //   所属分公司数据
      SubsidiaryOptions: ["全部"],
      // 表格数据
      tableData: [],
      //  选中数据
      multipleSelection: [],
      getRowKeys(row) {
        return row.goodid;
      }
    };
  },
  created() {
    // 获取套餐数据
    this.findEnterMeal();
  },
  mounted() {},
  methods: {
    ChoosePackages() {
      console.log("this.multipleSelection", this.multipleSelection);
      var temp = [];
      for (let i = 0; i < this.editObj.length; i++) {
        const n = this.editObj[i];
        for (let j = 0; j < this.multipleSelection.length; j++) {
          const m = this.multipleSelection[j];
          if (n.goodid == m.goodid) {
            temp.push({
              GoodType: n.GoodType, //	商品类型
              instname: n.instname, //	所属分公司
              goodid: n.goodid, //	产品id
              goodname: n.goodname, //	套餐名称
              goodprice: n.goodprice, //		门市价,无合作企业时的售价
              goodlowprice: n.goodlowprice, //		产品最低售价，仅内部核算用
              goodsaleprice: n.goodsaleprice, //	折扣
              // 企业内部价
              internalprice: n.goodprice,
              payMethod: n.payMethod, //	付费方式
              stock: n.stock, //		库存
              soldOut: n.soldOut, //		已售
              termValidity: n.termValidity, //		有效期
              CreateBy: n.CreateBy,
              CreateId: n.CreateId
            });
            // console.log("相等");
          } else {
            // console.log("不等");
          }
        }
      }
      for (let i = 0; i < temp.length; i++) {
        const n = temp[i];
        this.multipleSelection = this.multipleSelection.filter(
          item => item.goodid != n.goodid
        );
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        const element = this.multipleSelection[i];
        let body = {
          GoodType: element.GoodType,
          instname: element.instname, //	所属分公司
          goodid: element.goodid, //	产品id
          goodname: element.goodname, //	套餐名称
          goodprice: element.goodprice, //		门市价,无合作企业时的售价
          goodlowprice: element.goodlowprice, //		产品最低售价，仅内部核算用
          // goodsaleprice: element.goodsaleprice, //	折扣
          // 企业内部价
          internalprice: element.goodprice,
          goodsaleprice: "", //	折扣
          payMethod: "公费", //	付费方式
          stock: "", //		库存
          soldOut: element.soldOut, //		已售
          termValidity: 12, //		有效期
          endTime: this.getNowFormatDate(),
          startTime: this.getNowFormatDate1(),
          CreateBy: element.CreateBy,
          CreateId: element.CreateId
        };
        if (body.GoodType == "电子体检卡") {
          body.payMethod = "自费";
        }
        temp.push(body);
      }
      console.log("temp:", temp);
      this.$emit("getComponentsPackage", temp);
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear() + 1;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getNowFormatDate1() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 获取套餐数据
    findEnterMeal() {
      //
      this.$api
        .get("/busines/findEnterMeal", this.Inquire)
        .then(res => {
          console.log(res.data);
          this.count = res.data.count;
          this.tableData = res.data.data;
          var temp = [];
          for (let i = 0; i < this.editObj.length; i++) {
            const elementI = this.editObj[i];
            for (let j = 0; j < res.data.data.length; j++) {
              const elementJ = res.data.data[j];
              if (elementI.goodid == elementJ.goodid) {
                temp.push(j);
              }
            }
          }
          console.log(temp);
          this.$refs.multipleTable.clearSelection();
          setTimeout(() => {
            temp.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(this.tableData[row]);
            });
          }, 1);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("选中的数据", this.multipleSelection);
    },
    handleSizeChange(val) {
      this.Inquire.pageSize = val;
      this.findEnterMeal();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findEnterMeal();
      console.log(`当前页: ${val}`);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.AssociatedPackage_table {
  padding-top: 20px;
}
</style>
