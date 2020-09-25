<template>
  <div style="padding:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekenterprisecombo" label-position='right' label-width="120px" size="medium">
        <el-form-item label="所属销售：">
          <!-- <el-input v-model="seekenterprisecombo.filialeValue" placeholder="请填写" style="width:200px"></el-input> -->
          <el-select :disabled="$store.getters.getRoleInfo.AccountType==2" filterable v-model="seekenterprisecombo.filialeValue" style="width:200px" clearable placeholder="请选择销售" @change="filialechange">
            <el-option v-for="item in seekenterprisecombo.filialeList" :label="item.Name" :value="item.Name" :key="item.Mobile"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="seekenterprisecombo.goodsname" placeholder="商品名称" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="商品ID：">
          <el-input v-model="seekenterprisecombo.goodsid" placeholder="商品ID" style="width:200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="商品类型:">
          <el-select v-model="seekenterprisecombo.goodstype" placeholder="" style="width:200px">
            <el-option label="体检套餐" value="体检套餐"></el-option>
            <el-option label="虚拟商品" value="虚拟商品"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属企业:">
          <el-select v-model="seekenterprisecombo.company" placeholder="请选择企业" style="width:200px" filterable clearable>
            <el-option v-loading="seekenterprisecombo.loading" v-for="item in seekenterprisecombo.enterpriseList" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-search" :disabled="!Clickable.inquire" @click="seekbtn()">搜 索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addenterprisecomboBtn()" :disabled="!isedit||!Clickable.add">新 增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableenterprisecombo.enterprisecomboList" style="width: 100%" v-loading="tableenterprisecombo.loading">
        <el-table-column label="顺序" min-width="60px">
          <template slot-scope="scope">
            {{(tableenterprisecombo.currentPage-1)*tableenterprisecombo.pagesize+scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="goodid" label="商品ID" min-width="120px"></el-table-column>
        <el-table-column prop="goodname" label="商品名称" min-width="180px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodtype" label="商品类型" min-width="90px"></el-table-column>
        <el-table-column prop="saler" label="所属销售" min-width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="company" label="所属企业" min-width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodprice" label="门市价" min-width="90px"></el-table-column>
        <el-table-column label="入职套餐价格" min-width="110px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" style="font-size:14px;padding:0" @click="openupdatePrice(scope.row)" :disabled="!isedit||!Clickable.operating">{{scope.row.retailprice}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="delshopcombo(scope.row)" :disabled="!isedit||!Clickable.operating">删除</el-button>
            <el-button type="text" size="mini" @click="movecombo(scope.row,scope.$index,'up')" :disabled="!isedit||!Clickable.operating">上移</el-button>
            <el-button type="text" size="mini" @click="movecombo(scope.row,scope.$index,'down')" :disabled="!isedit||!Clickable.operating">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableenterprisecombo.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="tableenterprisecombo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableenterprisecombo.total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹出层 -->
    <div>
      <!-- 新增销售店铺套餐 -->
      <div>

        <el-dialog title="体检套餐" :visible.sync="addenterprisecombo.isshow" width="500px">
          <div style="padding:20px 60px" v-loading="addenterprisecombo.loading">
            <div><span>所属销售：</span>
              <el-select v-model="addenterprisecombo.Saler" placeholder='' style="width:200px" disabled>
              </el-select>
            </div>
            <div style="margin-top:20px"><span>选择套餐：</span>
              <el-select v-model="addenterprisecombo.GoodInfo" placeholder='' style="width:200px" placeholder="请选择套餐" @change="changegoodinfo">
                <el-option v-for="item in addenterprisecombo.allgoodslist" :label="item.goodname" :value="item.goodid" :key="item.goodid"></el-option>
              </el-select>
            </div>
            <div style="margin-top:20px" v-if="addenterprisecombo.Saler !='优健康自营' "><span>选择企业：</span>
              <el-button type="primary" @click="selectfindEntryGood()">选 择 （{{addenterprisecombo.Companys.length}}）</el-button>
            </div>
          </div>
          <el-dialog width="1200px" title="选择企业" :visible.sync="addenterprisecombo.bodyisshow" append-to-body>
            <div class="mybigtransfer">
              <el-transfer v-model="addenterprisecombo.selectEntryList" :data="addenterprisecombo.allEntryList" filterable v-loading="addenterprisecombo.loading" :titles="['未选企业', '已选企业']"></el-transfer>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addenterprisecombo.bodyisshow = false">取 消</el-button>
              <el-button type="primary" @click="confirmselectfindEntry()">确 定</el-button>
            </div>
          </el-dialog>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addenterprisecombo.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmfindEntry()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 修改散户金额 -->
      <div>
        <el-dialog title="修改入职套餐金额" :visible.sync="updatePricebox.isshow" width="500px">
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
  name: "enterpriseentry",
  components: {},
  data() {
    return {
      //权限
      isedit: false,
      //搜索栏数据
      seekenterprisecombo: {
        loading: false,
        enterpriseList: [],
        filialeList: [],
        filialeValue: "",
        goodsname: "",
        goodsid: "",
        goodstype: "体检套餐",
        company: ""
      },
      //数据表格
      tableenterprisecombo: {
        loading: false,
        enterprisecomboList: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      //新增企业入职套餐
      addenterprisecombo: {
        bodyisshow: false,
        loading: false,
        isshow: false,
        Saler: "", //销售
        GoodInfo: "", //套餐信息
        Companys: [], //企业信息
        allEntryList: [], //销售下所有企业
        selectEntryList: [] //选择的企业
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
    //权限
    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      this.seekenterprisecombo.filialeList = [
        {
          Name: "全部",
          Mobile: ""
        }
      ];
      console.log(this.$store.getters.getSalesMobile);
      console.log(this.$store.getters.getBranchOfficeMobile);
      console.log(this.$store.getters.getEnterprise);
      this.$store.getters.getSalesMobile.Name.map((item, index) => {
        var obj = {
          Name: item,
          Mobile: this.$store.getters.getSalesMobile.Mobile[index]
        };
        this.seekenterprisecombo.filialeList.push(obj);
      });
      this.seekenterprisecombo.enterpriseList = ["全部"];
      this.seekenterprisecombo.enterpriseList = this.seekenterprisecombo.enterpriseList.concat(
        this.$store.getters.getEnterprise
      ); // this.seekenterprisecombo.filialeList = this.$store.getters.getSalesMobile.Name;
      // this.seekenterprisecombo.company = "全部";
      this.addenterprisecombo.Saler = "优健康自营";
      //运营
      this.isedit = true;
    } else if (this.$store.getters.getRoleInfo.AccountType == "1"||this.$store.getters.getRoleInfo.AccountType == "7") {
      //分公司
      this.isedit = false;
      //查询销售
      this.$api
        .get("account/pullSonOrg", {
          mobile: this.$store.getters.getRoleInfo.Mobile
        })
        .then(res => {
          this.seekenterprisecombo.filialeList = [
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
                    this.seekenterprisecombo.filialeList.push(obj);
                  });
                  // this.seekenterprisecombo.filialeList = element.Name;
                }
              }
            } else {
              this.$message.warning("该分公司暂无销售");
              this.seekenterprisecombo.filialeList = [];
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
      this.seekenterprisecombo.filialeValue = this.$store.getters.getRoleInfo.AccountName;
      //查询企业
      this.$api
        .get("account/pullSonOrg", {
          mobile: this.$store.getters.getRoleInfo.Mobile
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            if (res.data.length != 0) {
              for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                if (element.AccountType == 3) {
                  this.seekenterprisecombo.enterpriseList = element.Name;
                }
              }
            } else {
              this.$message.warning("该销售暂无签约企业");
              this.seekenterprisecombo.enterpriseList = [];
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
      this.addenterprisecombo.Saler = this.seekenterprisecombo.filialeValue;
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
        filialeValue: this.seekenterprisecombo.filialeValue,
        goodsname: this.seekenterprisecombo.goodsname,
        goodsid: this.seekenterprisecombo.goodsid,
        goodstype: this.seekenterprisecombo.goodstype,
        company: this.seekenterprisecombo.company,
        currentPage: this.tableenterprisecombo.currentPage,
        pagesize: this.tableenterprisecombo.pagesize
      };
      console.log(body);
      this.$store.commit("setenterpriseentrymsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getenterpriseentrymsg;
      console.log(body);
      this.seekenterprisecombo.filialeValue = body.filialeValue || "";
      this.seekenterprisecombo.goodsname = body.goodsname || "";
      this.seekenterprisecombo.goodsid = body.goodsid || "";
      this.seekenterprisecombo.goodstype = body.goodstype || "体检套餐";
      this.seekenterprisecombo.company = body.company || "";
      this.tableenterprisecombo.currentPage = body.currentPage || 1;
      this.tableenterprisecombo.pagesize = body.pagesize || 10;
      console.log(body);
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
    // 005-更新企业和小企业的金额
    updatePrice(id, price) {
      this.$api
        .get("/manage/updateShopGoods", {
          type: "1",
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
    // 008-删除企业和小企业的数据
    deleteSalerShop(id) {
      this.$api
        .get("/manage/deleteShopGoods", {
          type: "1",
          id: id
        })
        .then(res => {
          if (
            this.tableenterprisecombo.enterprisecomboList.length == 1 &&
            this.tableenterprisecombo.currentPage != 1
          ) {
            this.tableenterprisecombo.currentPage -= 1;
          }
          this.querySalerShop();
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    movecombo(row, index, dir) {
      if (dir == "up") {
        // if (index != 0) {
        var obj = {
          type: "1",
          id: row.id,
          ofset: "1",
          saler: this.seekenterprisecombo.filialeValue,
          goodname: this.seekenterprisecombo.goodsname,
          goodid: this.seekenterprisecombo.goodsid,
          goodtype: this.seekenterprisecombo.goodstype
        };
        this.sortSalerShop(obj);
        // } else {
        //   this.$message.error("已在当前页第一项");
        // }
      } else if (dir == "down") {
        // if (index == this.tableenterprisecombo.enterprisecomboList.length - 1) {
        //   this.$message.error("已在当前页最后一项");
        //   return;
        // }
        var obj = {
          type: "1",
          id: row.id,
          ofset: "2",
          saler: this.seekenterprisecombo.filialeValue,
          goodname: this.seekenterprisecombo.goodsname,
          goodid: this.seekenterprisecombo.goodsid,
          goodtype: this.seekenterprisecombo.goodstype
        };
        this.sortSalerShop(obj);
      }
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
    seekbtn() {
      this.tableenterprisecombo.currentPage = 1;
      this.querySalerShop();
    },
    filialechange(e) {
      this.seekenterprisecombo.loading = true;
      console.log(e);
      console.log(this.$store.getters.getEnterprise);

      this.seekenterprisecombo.enterpriseList = [];
      if (!e || e == "" || e == "全部") {
        this.seekenterprisecombo.enterpriseList = ["全部"];
        this.seekenterprisecombo.enterpriseList = this.seekenterprisecombo.enterpriseList.concat(
          this.$store.getters.getEnterprise
        );
        this.seekenterprisecombo.company = "全部";
        this.seekenterprisecombo.loading = false;
        return;
      }
      this.seekenterprisecombo.company = "";
      var index = this.$store.getters.getSalesMobile.Name.indexOf(e);
      //查询企业
      this.$api
        .get("account/pullSonOrg", {
          mobile: this.$store.getters.getSalesMobile.Mobile[index]
        })
        .then(res => {
          console.log(res);
          this.seekenterprisecombo.loading = false;
          if (res.code == 200) {
            if (res.data.length != 0) {
              for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                if (element.AccountType == 3) {
                  this.seekenterprisecombo.enterpriseList = element.Name;
                }
              }
            } else {
              this.$message.warning("该销售暂无签约企业");
              this.seekenterprisecombo.enterpriseList = [];
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    // 001-查询企业和小企业数据
    querySalerShop() {
      this.tableenterprisecombo.loading = true;
      var body = {
        type: "1",
        company: this.seekenterprisecombo.company,
        saler: this.seekenterprisecombo.filialeValue,
        goodname: this.seekenterprisecombo.goodsname,
        goodid: this.seekenterprisecombo.goodsid,
        goodtype: this.seekenterprisecombo.goodstype,
        page: this.tableenterprisecombo.currentPage,
        pageSize: this.tableenterprisecombo.pagesize
      };
      if (body.company == "全部") {
        body.company = "";
      }
      if (body.saler == "全部") {
        body.saler = "";
      }
      this.$api
        .get("/manage/findShopGoods", body)
        .then(res => {
          this.tableenterprisecombo.loading = false;
          console.log(res);
          if (res.code == 200) {
            this.tableenterprisecombo.enterprisecomboList = res.data.data;
            this.tableenterprisecombo.total = res.data.count;
          }
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //004-查询入职企业的 企业数据
    insertQueryGoods() {
      this.addenterprisecombo.loading = true;
      this.$api
        .get("/manage/findQueryGoods", { type: "1" })
        .then(res => {
          console.log(res);
          this.addenterprisecombo.allgoodslist = res.data.data;
          this.addenterprisecombo.loading = false;
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    //添加入职体检套餐按钮
    addenterprisecomboBtn() {
      this.addenterprisecombo.GoodInfo = "";
      this.addenterprisecombo.Companys = [];
      this.addenterprisecombo.allEntryList = [];
      this.addenterprisecombo.selectEntryList = [];
      this.addenterprisecombo.isshow = true;
      this.insertQueryGoods();
    },
    //选择企业
    selectfindEntryGood() {
      if (
        !this.addenterprisecombo.GoodInfo ||
        this.addenterprisecombo.GoodInfo == ""
      ) {
        this.$message.error("请先选择入职体检套餐");
        return;
      }
      console.log(this.addenterprisecombo.GoodInfo);
      this.addenterprisecombo.bodyisshow = true;
      this.addenterprisecombo.allEntryList = [];
      this.addenterprisecombo.selectEntryList = [];
      this.$api
        .get("/manage/findEntryGood", {
          goodid: this.addenterprisecombo.GoodInfo
        })
        .then(res => {
          console.log(res);
          res.data.data.map(item => {
            var obj = item;
            obj.key = item.ID;
            obj.label = item.ID + " - " + item.Name;
            this.addenterprisecombo.allEntryList.push(obj);
          });
          this.addenterprisecombo.Companys.map(item => {
            res.data.data.map(res => {
              if (item == res.Name) {
                this.addenterprisecombo.selectEntryList.push(res.ID);
              }
            });
          });
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    //确认选择的企业
    confirmselectfindEntry() {
      this.addenterprisecombo.Companys = [];
      console.log(this.addenterprisecombo.selectEntryList);
      this.addenterprisecombo.selectEntryList.map(item => {
        this.addenterprisecombo.allEntryList.map(res => {
          if (item == res.ID) {
            this.addenterprisecombo.Companys.push(res.Name);
          }
        });
      });
      console.log(this.addenterprisecombo.Companys);

      this.addenterprisecombo.bodyisshow = false;
    },
    //确认配置体检套餐
    confirmfindEntry() {
      console.log(this.addenterprisecombo);
      if (
        !this.addenterprisecombo.GoodInfo ||
        this.addenterprisecombo.GoodInfo == ""
      ) {
        this.$message.error("请选择套餐");
        return;
      }
      if (this.addenterprisecombo.Saler != "优健康自营") {
        if (
          !this.addenterprisecombo.Companys ||
          this.addenterprisecombo.Companys.length <= 0
        ) {
          this.$message.error("请选择企业");
          return;
        }
      }

      var body = {
        Type: "1",
        GoodInfo: [],
        Saler: this.addenterprisecombo.Saler,
        Companys: this.addenterprisecombo.Companys
      };
      this.addenterprisecombo.allgoodslist.map(res => {
        if (res.goodid == this.addenterprisecombo.GoodInfo) {
          var obj = {
            GoodId: res.goodid,
            GoodName: res.goodname,
            GoodType: res.goodtype,
            GoodPrice: res.goodprice
          };
          body.GoodInfo.push(obj);
        }
      });
      // this.addenterprisecombo.GoodInfo.map(res=>{
      //   this.addenterprisecombo.
      // })
      this.$api
        .post("/manage/insertShopGoods", body)
        .then(res => {
          console.log(res);
          this.addenterprisecombo.isshow = false;
          this.$message.success(res.msg);
          this.querySalerShop();
        })
        .catch(res => {
          this.$message.error(res, msg);
        });
    },
    //体检套餐change
    changegoodinfo(e) {
      this.addenterprisecombo.Companys = [];
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableenterprisecombo.currentPage = 1;
      this.tableenterprisecombo.pagesize = val;
      this.querySalerShop();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableenterprisecombo.currentPage = val;
      this.querySalerShop();
    }
  },
  watch: {},
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("配置企业入职套餐");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
</style>