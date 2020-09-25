<template>
  <div>
    <!-- <div style="min-width: 1200px;padding-top:20px;box-sizing:border-box;">
      <el-row>
        <el-col :span="2.5" style="margin-top: 4px;">
          <div class="grid_lable">手机号：</div>
        </el-col>
        <el-col :span="5">
          <div class="grid_content">
            <el-input placeholder="请输入手机号码" @blur="phoneConfirm" @input="phoneConfirm_input" maxlength="11" v-model="phone" clearable size="medium" style="width:100%;"></el-input>
          </div>
        </el-col>

        <el-col :span="2.5" style="margin-top: 4px;margin-left: 30px;">
          <div class="grid_lable">权益名称：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid_content">
            <el-input placeholder="请输入内容" v-model="commodityName" clearable size="medium" style="width:100%;"></el-input>
          </div>
        </el-col>
        <el-col :span="2.5" style="margin-top: 4px;margin-left: 30px;">
          <div class="grid_lable">权益状态：</div>

        </el-col>
        <el-col :span="4">
          <div class="grid_content" style="margin-left:0">
            <el-select v-model="quanyiValue" placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in quanyiStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="min-width: 1300px;">
      <el-row style="margin-top: 20px;">
        <el-col :span="2.5" style="margin-top: 6px;">
          <div class="grid_lable">注册时间：</div>
        </el-col>
        <el-col :span="7">
          <div >
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="time1" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="2.5" style="margin-top: 6px;margin-left:30px;">
          <div class="grid_lable">权益领取时间：</div>
        </el-col>

        <el-col :span="7">
          <div>
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="time2" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-col>

        <el-col :span="2.5" style="float: right;margin-right: 30px;margin-top:30px">
          <el-button @click="EmployeeExport()" type="primary" size="medium">员工导出</el-button>
        </el-col>

        <el-col :span="2.5" style="float: right;margin-right: 30px;margin-top:30px">
          <el-button @click="sousuo()" class="grid_button" type="primary" size="medium" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </div> -->

    <div style="padding-top:20px;">
      <el-form :inline="true" label-position='right' label-width="120px" size="medium">
        <el-form-item label="手机号：">
          <el-input placeholder="请输入手机号码" @blur="phoneConfirm" @input="phoneConfirm_input" maxlength="11" v-model="phone" clearable size="medium" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="权益名称：">
          <el-input placeholder="请输入内容" v-model="commodityName" clearable size="medium" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="权益状态：">
          <el-select v-model="quanyiValue" placeholder="请选择" size="medium" style="width:200px;">
            <el-option v-for="item in quanyiStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="time1" type="datetimerange" range-separator="-" style="width:380px" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="权益领取时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="time2" type="datetimerange" range-separator="-" style="width:380px" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button @click="EmployeeExport()" type="primary" size="medium">导出</el-button>
          <el-button @click="sousuo()" class="grid_button" type="primary" size="medium" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 信息列表 -->
    <div style="margin:0 20px;">
      <el-table :data="personListData" height="600" :header-cell-style="{background:'#F2F2F2',color:'#353535'}" style="width: 100%;" v-loading="goodsloading">
        <el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间"></el-table-column>
        <el-table-column prop="effectiveTime" label="权益领取时间"></el-table-column>
        <el-table-column prop="giftName" label="权益名称"></el-table-column>
        <el-table-column prop="offerId" label="券码ID"></el-table-column>
        <el-table-column prop="orderId" label="订单ID"></el-table-column>
        <el-table-column prop="giftType" label="权益状态"></el-table-column>

      </el-table>
    </div>

    <div class="GMfenlelan">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="sumpage"></el-pagination>
    </div>

    <a id="adownload" href download style="display:none">导出</a>
  </div>
</template>

<script>
export default {
  name: "packagelist",
  components: {},
  watch: {},
  data() {
    return {
      weburl: "https://whiot.ihaozhuo.com/qrhealth", //武汉测试
      time1: "",
      time2: "",
      //分页栏属性
      pageNum: 10,

      currentPage: 1, //当前页
      pagesize: 10, //单页条数
      sumpage: 10, //总条数

      phone: "",
      goodsloading: false,
      commodityName: "", //商品名字
      quanyiValue: "全部", //商品类型
      quanyiStatus: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "待预约",
          label: "待预约"
        },
        {
          value: "待支付",
          label: "待支付"
        },
        {
          value: "待审核",
          label: "待审核"
        },
        {
          value: "待体检",
          label: "待体检"
        },
        {
          value: "已到检",
          label: "已到检"
        },
        {
          value: "已出报告",
          label: "已出报告"
        },
        {
          value: "已过期",
          label: "已过期"
        },
        {
          value: "取消中",
          label: "取消中"
        }
      ],
      personListData: []
    };
  },
  created() {},
  mounted() {
    this.getAllPerson();
  },
  methods: {
    //员工导出
    EmployeeExport() {
      var that = this;
      var body = {};
      this.$api
        .get("weibao/ExportScUserList", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            const adownload = document.getElementById("adownload");
            adownload.setAttribute("download", res.data); // download属性
            adownload.setAttribute("href", res.data); // href链接
            adownload.click();
          }
          // window.location=res.data
        })
        .catch(res => {
          console.log(res);
          this.$message.error("导出失败");
        });
    },
    reset() {},
    sousuo() {
      var that = this;
      this.currentPage = 1;
      var body = {
        mobile: this.phone,
        giftName: this.commodityName,
        giftType: this.quanyiValue,
        startRegisterTime: this.time1[0],
        endRegisterTime: this.time1[1],
        startGiftReceiveTime: this.time2[0],
        endGiftReceiveTime: this.time2[1],
        page: this.currentPage,
        pagesize: this.pagesize
      };
      this.$api
        .get("weibao/QueryScUserList", body)
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            this.personListData = res.data.data;
            this.sumpage = res.data.count;
            console.log(111);
          }
        })
        .catch(res => {
          this.goodsloading = false;
        });
    },
    //请求默认散户列表
    getAllPerson() {
      var that = this;
      var body = {
        mobile: this.phone,
        giftName: "",
        giftType: "",
        startRegisterTime: "",
        endRegisterTime: "",
        startGiftReceiveTime: "",
        endGiftReceiveTime: "",
        page: this.currentPage,
        pagesize: this.pagesize
      };
      this.$api
        .get("weibao/QueryScUserList", body)
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            this.personListData = res.data.data;
            this.sumpage = res.data.count;
          }
        })
        .catch(res => {
          this.goodsloading = false;
        });
    },
    phoneConfirm_input() {
      console.log(this.phone);
      this.phone = this.phone.replace(/[^0-9]/g, "");
      this.getAllPerson();
    },
    phoneConfirm() {
      var that = this;
      console.log(this.phone);
      this.phone = this.phone.replace(/\s+/g, ""); //去空格
      if (that.phone.length == 11) {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        console.log(myreg.test(that.phone));
        if (myreg.test(that.phone)) {
          this.sousuo();
        } else {
          // this.phone = "";
          // that.$notify({
          //   title: "提示",
          //   message: "请输入正确格式的手机号码",
          //   type: "warning"
          // });
        }
      } else {
        // this.phone = "";
        // that.$notify({
        //   title: "提示",
        //   message: "请输入11位数手机号码",
        //   type: "warning"
        // });
      }
    },
    handleSizeChange(val) {
      console.log(454545455);
      console.log(`每页 ${val} 条`);

      this.currentPage = 1;
      this.pagesize = val;
      this.getAllPerson();
      console.log(this.isSousuo);
      // if (that.isSousuo == true) {
      //   that.sousuo();
      // } else {

      // }
    },
    handleCurrentChange(val) {
      var that = this;
      this.currentPage = val;
      this.getAllPerson();
      console.log(val);
      // if (that.isSousuo == true) {
      //   that.sousuo();
      // } else {

      // }
    }
  },
  computed: {}
};
</script>

<style>
.GMfenlelan {
  text-align: center;
  margin-top: 20px;
}
</style>