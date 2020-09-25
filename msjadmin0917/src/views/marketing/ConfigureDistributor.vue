<template>
  <!-- 配置分销套餐 -->
  <div style="margin:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="分销员名称：">
          <el-input v-model="seekobj.saler" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="seekobj.name" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品ID：">
          <el-input v-model="seekobj.id" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品类型:">
          <el-select v-model="seekobj.type" placeholder="" style="width:200px" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="体检套餐" value="体检套餐"></el-option>
            <el-option label="虚拟商品" value="虚拟商品"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="seekbtn">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column label="顺序" min-width="50px">
          <template slot-scope="scope">
            {{(seekobj.page-1)*(seekobj.size)+(scope.$index+1)}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分销员" min-width="200px"></el-table-column>
        <el-table-column prop="gooddetail.goodid" label="商品ID" min-width="150px"></el-table-column>
        <el-table-column prop="gooddetail.goodname" label="商品名称" min-width="200px"></el-table-column>
        <el-table-column prop="gooddetail.goodtype" label="商品类型" min-width="100px"></el-table-column>
        <el-table-column prop="gooddetail.lineprice" label="门市价" min-width="100px"></el-table-column>
        <el-table-column  label="供应成本价" min-width="100px">
           <template slot-scope="scope">
            <el-button type="text" size="mini" @click="changesaleprice1(scope.row)">{{scope.row.gooddetail.costprice}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分销价格" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="changesaleprice(scope.row)">{{scope.row.gooddetail.saleprice}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;" >
        <el-pagination style="float:right" @size-change="tablesizechange" @current-change="tablepagechange" :current-page="seekobj.page" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.size" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <div>
      <!-- 修改价格弹窗 -->
      <div v-if="changesalepriceobj.isshow">
        <el-dialog title="修改分销价格" :visible.sync="changesalepriceobj.isshow" width="600px">
          <div>
            <span>原供应成本价： {{changesalepriceobj.costprice}}</span>
          </div>
          <div style="margin-top:10px">
            <span>原分销价：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{changesalepriceobj.saleprice}}</span>
          </div>
          <div style="margin-top:10px">
            <span>分销价修改为：</span>
            <el-input v-model="changesalepriceobj.price" style="width:200px" size="small" @input="priceinput()"></el-input>
            <span v-if="Number(changesalepriceobj.price) < Number( changesalepriceobj.costprice)" style="color:#F56C6C">分销价格不能低于供应成本价</span>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changesalepriceobj.isshow = false">取 消</el-button>
            <el-button type="primary" @click="adminUpdatePySaleGoodPrice()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 修改供应成本价弹窗 -->
      <div v-if="changesalepriceobj1.isshow">
        <el-dialog title="修改供应成本价格" :visible.sync="changesalepriceobj1.isshow" width="600px">
          <div>
            <span>原供应成本价： {{changesalepriceobj1.costprice}}</span>
          </div>
           <div style="margin-top:10px">
            <span>原分销价：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{changesalepriceobj1.saleprice}}</span>
          </div>
          <div style="margin-top:10px">
            <span>供应成本价修改为：</span>
            <el-input v-model="changesalepriceobj1.price" style="width:200px" size="small" @input="priceinput1()"></el-input>
            <span v-if="Number(changesalepriceobj1.price) > Number( changesalepriceobj1.saleprice)" style="color:#F56C6C">供应成本价不能大于当前分销价</span>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changesalepriceobj1.isshow = false">取 消</el-button>
            <el-button type="primary" @click="adminUpdatePySaleCostPrice()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      seekobj: {
        saler: "",
        name: "",
        id: "",
        type: "",
        page: 1,
        size: 10
      },
      tableobj: {
        loading: false,
        total: 0,
        list: []
      },
        changesalepriceobj: {
          isshow: false,
          obj: {},
          costprice: "",
          saleprice:"",
          price: "",
          goodsid: ""
        },
        changesalepriceobj1: {
          isshow: false,
          obj: {},
          costprice: "",
           saleprice:"",
          price: "",
          goodsid: ""
        }
    };
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  mounted() {
    this.adminQueryPySaleGood();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        saler: this.seekobj.saler,
        name: this.seekobj.name,
        id: this.seekobj.id,
        type: this.seekobj.type,
        page: this.seekobj.page,
        size: this.seekobj.size
      };
      this.$store.commit("setConfigureDistributormsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getConfigureDistributormsg;
      this.seekobj.saler = body.saler || "";
      this.seekobj.name = body.name || "";
      this.seekobj.id = body.id || "";
      this.seekobj.type = body.type || "";
      this.seekobj.page = body.page || 1;
      this.seekobj.size = body.size || 10;
    },
    tablesizechange(val) {
      this.seekobj.page = 1;
      this.seekobj.size = val;
      this.adminQueryPySaleGood();
    },
    tablepagechange(val) {
      this.seekobj.page = val;
      this.adminQueryPySaleGood();
    },
    adminUpdatePySaleGoodPrice() {
      if (
        Number(this.changesalepriceobj.price) <
        Number(this.changesalepriceobj.costprice)
      ) {
        this.$message.error("分销价格不能低于供应成本价");
        return;
      }
      this.$api
        .post("/manage/adminUpdatePySaleGoodPrice", {
          saler: this.changesalepriceobj.obj.id,
          price: Number(this.changesalepriceobj.price),
          id: this.changesalepriceobj.goodsid
        })
        .then(res => {
          console.log(res);
          this.changesalepriceobj.isshow=false;
           this.adminQueryPySaleGood();
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg)
        });
    },
    adminUpdatePySaleCostPrice() {
      if (
        Number(this.changesalepriceobj1.price) >
        Number(this.changesalepriceobj1.saleprice)
      ) {
        this.$message.error("供应成本价不能大于当前分销价");
        return;
      }
      this.$api
        .post("/manage/adminUpdatePySaleCostPrice", {
          saler: this.changesalepriceobj1.obj.id,
          price: Number(this.changesalepriceobj1.price),
          id: this.changesalepriceobj1.goodsid
        })
        .then(res => {
          console.log(res);
          this.changesalepriceobj1.isshow=false;
           this.adminQueryPySaleGood();
        })
        .catch(err => {
          console.log(err);
           this.$message.error(err.msg)
        });
    },
    priceinput() {
      this.changesalepriceobj.price = this.changesalepriceobj.price.replace(
        /[^\.\d]/g,
        ""
      );
      this.changesalepriceobj.price = this.changesalepriceobj.price.replace(
        ".",
        ""
      );
    },
    priceinput1() {
      this.changesalepriceobj1.price = this.changesalepriceobj1.price.replace(
        /[^\.\d]/g,
        ""
      );
      this.changesalepriceobj1.price = this.changesalepriceobj1.price.replace(
        ".",
        ""
      );
    },
    changesaleprice(row) {
      console.log(row);
      this.changesalepriceobj.obj = row;
      this.changesalepriceobj.costprice = row.gooddetail.costprice;
      this.changesalepriceobj.goodsid = row.gooddetail.goodid;
      this.changesalepriceobj.saleprice = row.gooddetail.saleprice;
      this.changesalepriceobj.price ='';
      this.changesalepriceobj.isshow = true;
      console.log(this.changesalepriceobj);
    },
    changesaleprice1(row) {
      console.log(row);
      this.changesalepriceobj1.obj = row;
      this.changesalepriceobj1.costprice = row.gooddetail.costprice;//分销成本价
      this.changesalepriceobj1.goodsid = row.gooddetail.goodid;//商品id
      this.changesalepriceobj1.saleprice = row.gooddetail.saleprice;//分销售价
      this.changesalepriceobj1.price ='';//分销售价
      this.changesalepriceobj1.isshow = true;
      console.log(this.changesalepriceobj1);
    },
    seekbtn() {
      this.seekobj.page = 1;
      this.adminQueryPySaleGood();
    },
    //后台配置分销店铺套餐查询
    adminQueryPySaleGood() {
      this.tableobj.loading = true;
      this.$api
        .post("/manage/adminQueryPySaleGood", this.seekobj)
        .then(res => {
          this.tableobj.loading = false;
          console.log(res);
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    }
  },
  watch: {}
};
</script>
<style>
</style>