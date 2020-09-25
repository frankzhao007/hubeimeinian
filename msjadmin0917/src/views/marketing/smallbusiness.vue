<template>
  <div style="padding:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seeksmallshopcombo" label-position='right' label-width="120px" size="medium">
        <el-form-item label="所属销售：">
          <!-- <el-input v-model="seeksmallshopcombo.filialeValue" placeholder="请填写" style="width:200px" clearable></el-input> -->
          <el-select filterable :disabled="isedit" v-model="seeksmallshopcombo.filialeValue" style="width:200px" clearable placeholder="请选择销售">
            <el-option v-for="item in seeksmallshopcombo.filialeList" :label="item.Name" :value="item.Name" :key="item.Mobile"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="seeksmallshopcombo.goodsname" placeholder="商品名称" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品ID：">
          <el-input v-model="seeksmallshopcombo.goodsid" placeholder="商品ID" style="width:200px" clearable></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="商品类型：">
          <el-select v-model="seeksmallshopcombo.goodstype" placeholder="" style="width:200px" clearable placeholder="请选择套餐类型">
            <el-option label="体检套餐" value="体检套餐"></el-option>
            <el-option label="虚拟商品" value="虚拟商品"></el-option>
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
      <el-table :data="tablesmallshopcombo.smallshopcomboList" style="width: 100%" v-loading="tablesmallshopcombo.loading">
        <el-table-column label="顺序" min-width="60px">
          <template slot-scope="scope">
            {{(tablesmallshopcombo.currentPage-1)*tablesmallshopcombo.pagesize+scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="saler" label="所属销售" min-width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodid" label="商品ID" min-width="120px"></el-table-column>
        <el-table-column prop="goodname" label="商品名称" min-width="180px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodtype" label="商品类型" min-width="90px"></el-table-column>
        <el-table-column prop="goodprice" label="门市价" min-width="90px"></el-table-column>
        <el-table-column label="小企业价格" min-width="90px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" style="font-size:14px;padding:0" @click="openupdatePrice(scope.row)" :disabled="!isedit||!Clickable.operating">{{scope.row.retailprice}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" min-width="150px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="delshopcombo(scope.row)" :disabled="!isedit||!Clickable.operating">删除</el-button>
            <el-button type="text" size="mini" @click="movecombo(scope.row,scope.$index,'up')" :disabled="!isedit||!Clickable.operating">上移</el-button>
            <el-button type="text" size="mini" @click="movecombo(scope.row,scope.$index,'down')" :disabled="!isedit||!Clickable.operating">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablesmallshopcombo.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tablesmallshopcombo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tablesmallshopcombo.total">
        </el-pagination>
      </div>
    </div>
    <!-- 弹出层 -->
    <div>
      <!-- 新增小企业套餐 -->
      <div>
        <!-- 弹窗+穿梭框 -->
        <el-dialog title="体检套餐" :visible.sync="addsmallshopcombo.isshow" width="1200px">
          <div class="mybigtransfer">
            <el-transfer v-model="addsmallshopcombo.selectsmallshopcomboList" :data="addsmallshopcombo.allgoodslist" filterable v-loading="addsmallshopcombo.loading" :titles="['未选套餐', '已选套餐']"></el-transfer>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addsmallshopcombo.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmaddshopcomboBtn()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 修改散户金额 -->
      <div>
        <el-dialog title="修改小企业金额" :visible.sync="updatePricebox.isshow" width="500px">
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
  name: "smallbusiness",
  components: {},
  data() {
    return {
      //权限
      isedit: false,
      //搜索栏数据
      seeksmallshopcombo: {
        filialeList: [],
        filialeValue: "",
        goodsname: "",
        goodsid: "",
        goodstype: "体检套餐"
      },
      //数据表格
      tablesmallshopcombo: {
        loading: false,
        smallshopcomboList: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      //新增销售店铺套餐
      addsmallshopcombo: {
        loading: false,
        isshow: false,
        selectsmallshopcomboList: [],
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
    console.log(
      "1111111111111111111111111111",
      this.$store.getters.getRoleInfo
    );

    //权限
    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      //运营
      // this.seeksmallshopcombo.filialeList = this.$store.getters.getSalesMobile.Name;
      this.seeksmallshopcombo.filialeList = [
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
        this.seeksmallshopcombo.filialeList.push(obj);
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
          this.seeksmallshopcombo.filialeList = [
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
                  // this.seeksmallshopcombo.filialeList = element.Name;
                  element.Name.map((item, index) => {
                    var obj = {
                      Name: item,
                      Mobile: element.Mobile[index]
                    };
                    this.seeksmallshopcombo.filialeList.push(obj);
                  });
                  console.log(this.seeksmallshopcombo.filialeList);
                }
              }
            } else {
              this.$message.warning("该分公司暂无销售");
              this.seeksmallshopcombo.filialeList = [];
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
      this.seeksmallshopcombo.filialeValue = this.$store.getters.getRoleInfo.AccountName;
      this.isedit = true;
    } else {
      this.isedit = false;
    }
    this.querySalerShop();
  },
  beforeDestroy(){
    this.copypagemsg();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        filialeValue: this.seeksmallshopcombo.filialeValue,
        goodsname: this.seeksmallshopcombo.goodsname,
        goodsid: this.seeksmallshopcombo.goodsid,
        goodstype: this.seeksmallshopcombo.goodstype,
        currentPage: this.tablesmallshopcombo.currentPage,
        pagesize: this.tablesmallshopcombo.pagesize
      };
      this.$store.commit("setsmallbusinessmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getsmallbusinessmsg;
      this.seeksmallshopcombo.filialeValue = body.filialeValue || "";
      this.seeksmallshopcombo.goodsname = body.goodsname || "";
      this.seeksmallshopcombo.goodsid = body.goodsid || "";
      this.seeksmallshopcombo.goodstype = body.goodstype || "体检套餐";
      this.tablesmallshopcombo.currentPage = body.currentPage || 1;
      this.tablesmallshopcombo.pagesize = body.pagesize || 10;
      console.log(body);
    },
    //搜索按钮
    seekbtn() {
      this.tablesmallshopcombo.currentPage = 1;
      this.querySalerShop();
    },
    // 001-查询企业和小企业数据
    querySalerShop() {
      this.tablesmallshopcombo.loading = true;
      var body = {
        type: "2",
        saler: this.seeksmallshopcombo.filialeValue,
        goodname: this.seeksmallshopcombo.goodsname,
        goodid: this.seeksmallshopcombo.goodsid,
        goodtype: this.seeksmallshopcombo.goodstype,
        page: this.tablesmallshopcombo.currentPage,
        pageSize: this.tablesmallshopcombo.pagesize
      };
      if (body.saler == "全部") {
        body.saler = "";
      }
      this.$api
        .get("/manage/findShopGoods", body)
        .then(res => {
          this.tablesmallshopcombo.loading = false;
          console.log(res);
          if (res.code == 200) {
            this.tablesmallshopcombo.smallshopcomboList = res.data.data;
            this.tablesmallshopcombo.total = res.data.count;
          }
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    // 005-更新企业和小企业的金额
    updatePrice(id, price) {
      this.$api
        .get("/manage/updateShopGoods", {
          type: "2",
          id: id,
          retailprice: Number(price)
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
    // 008-删除企业和小企业的数据
    deleteSalerShop(id) {
      this.$api
        .get("/manage/deleteShopGoods", {
          type: "2",
          id: id
        })
        .then(res => {
          if (
            this.tablesmallshopcombo.smallshopcomboList.length == 1 &&
            this.tablesmallshopcombo.currentPage != 1
          ) {
            this.tablesmallshopcombo.currentPage -= 1;
          }
          this.querySalerShop();
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    // 006-更新企业和小企业的上下移动
    sortSalerShop(obj) {
      this.$api
        .get("/manage/updateShopGoodsOfset", obj)
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
    //002-添加企业和小企业的数据
    insertSalerShop(ids) {
      console.log(ids);
      console.log(this.addsmallshopcombo.allgoodslist);

      var body = {
        Type: "2",
        GoodInfo: [],
        Saler: this.$store.getters.getRoleInfo.AccountName
      };
      ids.map(res => {
        this.addsmallshopcombo.allgoodslist.map(item => {
          if (item.goodid == res) {
            var obj = {
              GoodId: item.goodid,
              GoodName: item.goodname,
              GoodType: item.goodtype,
              GoodPrice: item.goodprice
            };
            body.GoodInfo.push(obj);
          }
        });
      });
      this.$api
        .post("/manage/insertShopGoods", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.addsmallshopcombo.isshow = false;
            this.querySalerShop();
          }
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //003-查询企业和小企业套餐
    insertQueryGoods() {
      this.addsmallshopcombo.loading = true;
      this.$api
        .get("/manage/findQueryGoods", { type: "2" })
        .then(res => {
          this.addsmallshopcombo.loading = false;
          console.log(res);
          res.data.data.map(item => {
            var obj = item;
            obj.key = item.goodid;
            obj.label =
              item.goodname + " - " + item.goodtype + " - " + item.goodprice;
            this.addsmallshopcombo.allgoodslist.push(obj);
          });
          // this.addsmallshopcombo.allgoodslist
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //新增销售店铺套餐Btn
    addshopcomboBtn() {
      this.addsmallshopcombo.selectsmallshopcomboList = [];
      this.addsmallshopcombo.allgoodslist = [];
      this.addsmallshopcombo.isshow = true;
      this.insertQueryGoods();
    },
    //新增销售店铺套餐确认Btn
    confirmaddshopcomboBtn() {
      console.log(this.addsmallshopcombo.selectsmallshopcomboList);
      this.insertSalerShop(this.addsmallshopcombo.selectsmallshopcomboList);
    },
    //删除销售店铺套餐Btn
    delshopcombo(row) {
      this.$confirm("此操作将永久删除该体检套餐，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSalerShop(row.id);
          this.$message.success("删除成功！");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    movecombo(row, index, dir) {
      if (dir == "up") {
        // if (index != 0) {
        var obj = {
          type: "2",
          id: row.id,
          ofset: "1",
          saler: this.seeksmallshopcombo.filialeValue,
          goodname: this.seeksmallshopcombo.goodsname,
          goodid: this.seeksmallshopcombo.goodsid,
          goodtype: this.seeksmallshopcombo.goodstype
        };
        this.sortSalerShop(obj);
        // } else {
        //   this.$message.error("已在当前页第一项");
        // }
      } else if (dir == "down") {
        // if (index == this.tablesmallshopcombo.smallshopcomboList.length - 1) {
        //   this.$message.error("已在当前页最后一项");
        //   return;
        // }
        var obj = {
          type: "2",
          id: row.id,
          ofset: "2",
          saler: this.seeksmallshopcombo.filialeValue,
          goodname: this.seeksmallshopcombo.goodsname,
          goodid: this.seeksmallshopcombo.goodsid,
          goodtype: this.seeksmallshopcombo.goodstype
        };
        this.sortSalerShop(obj);
      }
    },
    //修改散户价格弹窗
    openupdatePrice(row) {
      this.updatePricebox.selectobj = row;
      this.updatePricebox.updatePrice = row.retailprice;
      this.updatePricebox.isshow = true;
    },
    //确认修改散户价格
    confirmupdataprice() {
      this.updatePrice(
        this.updatePricebox.selectobj.id,
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
      this.tablesmallshopcombo.currentPage = 1;
      this.tablesmallshopcombo.pagesize = val;
      this.querySalerShop();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tablesmallshopcombo.currentPage = val;
      this.querySalerShop();
    }
  },
  watch: {},
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("配置小企业套餐");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
</style>