<template>
  <div style="padding:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekshopcombo" label-position='right' label-width="120px" size="medium">
        <el-form-item label="所属销售：">
          <!-- <el-input :disabled="isedit" v-model="seekshopcombo.filialeValue" placeholder="请填写" style="width:200px" clearable></el-input> -->
          <el-select :disabled="isedit" v-model="seekshopcombo.filialeValue" style="width:200px" clearable placeholder="请选择销售" filterable>
            <el-option v-for="item in seekshopcombo.filialeList" :label="item.Name" :value="item.Name" :key="item.Mobile"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="seekshopcombo.goodsname" placeholder="商品名称" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品ID：">
          <el-input v-model="seekshopcombo.goodsid" placeholder="商品ID" style="width:200px" clearable></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="商品类型：">
          <el-select v-model="seekshopcombo.goodstype" style="width:200px" clearable placeholder="请选择套餐类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="体检套餐" value="体检套餐"></el-option>
            <!-- <el-option label="虚拟商品" value="虚拟商品"></el-option> -->
            <el-option label="电子体检卡" value="电子体检卡"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-search" :disabled="!Clickable.inquire" @click="seekbtn()">搜 索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addshopcomboBtn()" :disabled="!isedit||!Clickable.add">新 增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableshopcombo.shopcomboList" style="width: 100%" v-loading="tableshopcombo.loading">
        <el-table-column label="顺序" min-width="60px">
          <template slot-scope="scope">
            {{(tableshopcombo.currentPage-1)*tableshopcombo.pagesize+scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="salerid" label="所属销售" min-width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodid" label="商品ID" min-width="120px"></el-table-column>
        <el-table-column prop="goodname" label="商品名称" min-width="180px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodtype" label="商品类型" min-width="90px"></el-table-column>
        <el-table-column prop="goodlineprice" label="门市价" min-width="90px"></el-table-column>
        <el-table-column label="散户价格" min-width="90px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openupdatePrice(scope.row)" :disabled="!isedit||!Clickable.operating">{{scope.row.goodprice}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" min-width="150px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="delshopcombo(scope.row)" :disabled="!isedit||!Clickable.operating">删除</el-button>
            <el-button type="text" size="mini" @click="movecombo(scope.$index,'up')" :disabled="!isedit||!Clickable.operating">上移</el-button>
            <el-button type="text" size="mini" @click="movecombo(scope.$index,'down')" :disabled="!isedit||!Clickable.operating">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableshopcombo.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tableshopcombo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableshopcombo.total">
        </el-pagination>
      </div>
    </div>
    <!-- 弹出层 -->
    <div>
      <!-- 新增销售店铺套餐 -->
      <div>
        <!-- 弹窗+穿梭框 -->
        <el-dialog title="体检套餐" :visible.sync="addshopcombo.isshow" width="1200px">
          <div class="mybigtransfer">
            <el-transfer v-model="addshopcombo.selectshopcomboList" :data="addshopcombo.allgoodslist" filterable v-loading="addshopcombo.loading" :titles="['未选套餐', '已选套餐']"></el-transfer>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addshopcombo.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmaddshopcomboBtn()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 修改散户金额 -->
      <div>
        <el-dialog title="修改散户金额" :visible.sync="updatePricebox.isshow" width="500px">
          <div style="margin:0 20px">
            <div>
              <span>原售价：</span> <span>{{updatePricebox.selectobj.goodprice}}</span>
            </div>
            <div style="margin-top:20px">
              <span>修改售价：</span>
              <el-input style="width:200px" size="small" v-model="updatePricebox.updatePrice" placeholder="请输入修改价格" @input="inputtest()"></el-input>
            </div>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="updatePricebox.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmupdataprice()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "salesshop",
  components: {},
  data() {
    return {
      //权限
      isedit: false,
      //搜索栏数据
      seekshopcombo: {
        filialeList: [],
        filialeValue: "全部",
        goodsname: "",
        goodsid: "",
        goodstype: ""
      },
      //数据表格
      tableshopcombo: {
        loading: false,
        shopcomboList: [],
        currentPage: 0,
        pagesize: 10,
        total: 0
      },
      //新增销售店铺套餐
      addshopcombo: {
        loading: false,
        isshow: false,
        selectshopcomboList: [],
        allgoodslist: []
      },
      updatePricebox: {
        isshow: false,
        selectobj: "",
        updatePrice: ""
      }
    };
  },
  created() {
    this.setpagemsg();
  },
  mounted() {
    console.log(this.$store.getters.getRoleInfo);

    //权限
    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      //运营
      // this.seekshopcombo.filialeList = [];
      this.seekshopcombo.filialeList = [
        {
          Name: "全部",
          Mobile: ""
        }
      ];
      console.log(this.$store.getters.getSalesMobile);
      this.$store.getters.getSalesMobile.Name.map((item, index) => {
        var obj = {
          Name: item,
          Mobile: this.$store.getters.getSalesMobile.Mobile[index]
        };
        this.seekshopcombo.filialeList.push(obj);
      });
      this.isedit = false;
    } else if (this.$store.getters.getRoleInfo.AccountType == "1"||this.$store.getters.getRoleInfo.AccountType == "7") {
      //分公司
      this.isedit = false;
      //查询销售
      this.$api
        .get("account/pullSonOrg", {
          mobile: this.$store.getters.getRoleInfo.Mobile
        })
        .then(res => {
          this.seekshopcombo.filialeList = [
            {
              Name: "全部",
              Mobile: ""
            }
          ];
          console.log(res);
          if (res.code == 200) {
            if (res.data.length != 0) {
              for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                if (element.AccountType == 2) {
                  element.Name.map((item, index) => {
                    var obj = {
                      Name: item,
                      Mobile: element.Mobile[index]
                    };
                    this.seekshopcombo.filialeList.push(obj);
                  });
                  console.log(this.seekshopcombo.filialeList);
                }
              }
            } else {
              this.$message.warning("该分公司暂无销售");
              this.seekshopcombo.filialeList = [];
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
      //销售
      this.seekshopcombo.filialeValue = this.$store.getters.getRoleInfo.AccountName;
      this.isedit = true;
    } else {
      this.isedit = false;
    }
    this.querySalerShop();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        filialeValue: this.seekshopcombo.filialeValue,
        goodsname: this.seekshopcombo.goodsname,
        goodsid: this.seekshopcombo.goodsid,
        goodstype: this.seekshopcombo.goodstype,

        currentPage: this.tableshopcombo.currentPage,
        pagesize: this.tableshopcombo.pagesize
      };
      this.$store.commit("setsalesshopmsg", body);
    },
    //赋值商品列表页面数据
    setpagemsg() {
      var body = this.$store.getters.getsalesshopmsg;
      console.log(body);
      this.seekshopcombo.filialeValue = body.filialeValue || "全部";
      this.seekshopcombo.goodsname = body.goodsname || "";
      this.seekshopcombo.goodsid = body.goodsid || "";
      this.seekshopcombo.goodstype = body.goodstype || "";
      this.tableshopcombo.currentPage = body.currentPage || 1;
      this.tableshopcombo.pagesize = body.pagesize || 10;
    },
    //搜索按钮
    seekbtn() {
      this.tableshopcombo.currentPage = 1;
      this.querySalerShop();
    },
    // 01-首页查询所有套餐
    querySalerShop() {
      this.tableshopcombo.loading = true;
      this.$api
        .post("/manage/querySalerShop", {
          salername: this.seekshopcombo.filialeValue,
          goodname: this.seekshopcombo.goodsname,
          goodid: this.seekshopcombo.goodsid,
          goodtype: this.seekshopcombo.goodstype,
          page: this.tableshopcombo.currentPage,
          size: this.tableshopcombo.pagesize
        })
        .then(res => {
          this.tableshopcombo.loading = false;
          console.log(res);
          if (res.code == 200) {
            this.tableshopcombo.shopcomboList = res.data.data;
            this.tableshopcombo.total = res.data.count;
          }
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    // 03-修改散户价格
    updatePrice(goodid, price) {
      this.$api
        .post("/manage/updatePrice", {
          goodid: goodid,
          price: Number(price)
        })
        .then(res => {
          console.log(res);
          this.updatePricebox.isshow = false;
          this.querySalerShop();
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    // 02-删除套餐
    deleteSalerShop(goodid) {
      this.$api
        .post("/manage/deleteSalerShop", {
          goodid: goodid
        })
        .then(res => {
          if (
            this.tableshopcombo.shopcomboList.length == 1 &&
            this.tableshopcombo.currentPage != 1
          ) {
            this.tableshopcombo.currentPage -= 1;
          }
          this.querySalerShop();
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    // 04-上移下移排序
    sortSalerShop(obj) {
      this.$api
        .post("/manage/sortSalerShop", obj)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.querySalerShop();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //05-新增-确认
    insertSalerShop(ids) {
      this.$api
        .post("/manage/insertSalerShop", ids)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.addshopcombo.isshow = false;
            this.querySalerShop();
          }
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //06-新增-查询套餐
    insertQueryGoods() {
      this.addshopcombo.loading = true;
      this.$api
        .post("/manage/insertQueryGoods", {})
        .then(res => {
          this.addshopcombo.loading = false;
          console.log(res);
          res.data.data.map(item => {
            var obj = item;
            obj.key = item.goodid;
            obj.label =
              item.goodname + " - " + item.goodtype + " - " + item.goodprice;
            this.addshopcombo.allgoodslist.push(obj);
          });
          // this.addshopcombo.allgoodslist
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //新增销售店铺套餐Btn
    addshopcomboBtn() {
      this.addshopcombo.selectshopcomboList = [];
      this.addshopcombo.allgoodslist = [];
      this.addshopcombo.isshow = true;
      this.insertQueryGoods();
    },
    //新增销售店铺套餐确认Btn
    confirmaddshopcomboBtn() {
      console.log(this.addshopcombo.selectshopcomboList);
      this.insertSalerShop(this.addshopcombo.selectshopcomboList);
    },
    //删除销售店铺套餐Btn
    delshopcombo(row) {
      this.$confirm("此操作将永久删除该体检套餐，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSalerShop(row.goodid);
          this.$message.success("删除成功！");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    movecombo(index, dir) {
      if (dir == "up") {
        // if (index != 0) {
        var obj = {
          goodid: this.seekshopcombo.goodsid,
          sort: this.tableshopcombo.shopcomboList[index].sort,
          move: "1",
          goodname: this.seekshopcombo.goodsname,
          goodtype: this.seekshopcombo.goodstype
        };
        this.sortSalerShop(obj);
        // } else {
        //   this.$message.error("已在当前页第一项");
        // }
      } else if (dir == "down") {
        // if (index == this.tableshopcombo.shopcomboList.length - 1) {
        //   this.$message.error("已在当前页最后一项");
        //   return;
        // }
        var obj = {
          goodid: this.seekshopcombo.goodsid,
          sort: this.tableshopcombo.shopcomboList[index].sort,
          move: "2",
          goodname: this.seekshopcombo.goodsname,
          goodtype: this.seekshopcombo.goodstype
        };
        this.sortSalerShop(obj);
      }
    },
    //修改散户价格弹窗
    openupdatePrice(row) {
      this.updatePricebox.selectobj = row;
      this.updatePricebox.updatePrice = row.goodprice;
      this.updatePricebox.isshow = true;
    },
    //确认修改散户价格
    confirmupdataprice() {
      this.updatePrice(
        this.updatePricebox.selectobj.goodid,
        this.updatePricebox.updatePrice
      );
    },
    //修改金额输入验证
    inputtest() {
      this.updatePricebox.updatePrice = this.updatePricebox.updatePrice.replace(
        /[^\.\d]/g,
        ""
      );
      this.updatePricebox.updatePrice = this.updatePricebox.updatePrice.replace(
        ".",
        ""
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableshopcombo.currentPage = 1;
      this.tableshopcombo.pagesize = val;
      this.querySalerShop();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableshopcombo.currentPage = val;
      this.querySalerShop();
    }
  },
  watch: {},
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("配置销售店铺套餐");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
</style>