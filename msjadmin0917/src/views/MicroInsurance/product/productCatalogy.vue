<template>
  <div class="app-container">
    <div class="inquire">
      <el-row>
        <el-col :span="6">
          <div class="grid_lable">商品类型：</div>
          <div class="grid_content">
            <el-select v-model="commodityValue" placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in commodityList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid_lable">商品名称：</div>
          <div class="grid_content">
            <el-input placeholder="请输入内容" v-model="commodityName" clearable size="medium" style="width:100%;"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid_lable">商品ID：</div>
          <div class="grid_content">
            <el-input placeholder="请输入内容" v-model="commodityID" clearable size="medium" style="width:100%;"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid_lable">当前状态：</div>
          <div class="grid_content">
            <el-select v-model="statusValue" placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="inquire">
      <el-row>
        <el-col :span="6">
          <div class="grid_lable">所属分公司：</div>
          <div class="grid_content">
            <el-select filterable clearable v-model="filialeValue" placeholder="请选择" size="medium" style="width:100%;" :disabled="FilialeList.length==0">
              <el-option v-for="item in FilialeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid_lable">创建人：</div>
          <div class="grid_content">
            <el-select :disabled="!filialeValue||filialeValue=='全部'||filialeValue==''||filialeValue=='优健康自营'" filterable clearable v-model="creatpeopleval" placeholder="请选择" size="medium" style="width:100%;">
              <el-option v-for="item in creatpeoplelist" :key="item.creatpeoplename" :label="item.creatpeoplename" :value="item.creatpeoplename"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-button   class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="AddGoodsBtn()">新增商品</el-button>
        <el-button   class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="querygooodsbtn()">搜索</el-button>

      </el-row>
    </div>

    <!-- 信息列表 -->
    <div>
      <el-table :data="GoodSListData" style="width: 100%;" v-loading="goodsloading">
        <el-table-column fixed prop="instname" label="所属分公司"></el-table-column>
        <el-table-column prop="creatpeople" label="创建人"></el-table-column>
        <el-table-column prop="goodname" label="商品名称"></el-table-column>
        <el-table-column prop="goodid" label="商品ID"></el-table-column>
        <el-table-column prop="goodtype" label="商品类型"></el-table-column>
        <el-table-column prop="goodprice" label="售价"></el-table-column>
        <el-table-column label="当前状态" width="160" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="ChangeGoodsStatusBtn(scope.row)">{{scope.row.goodputaway}}</el-button> -->
            <div v-if="scope.row.goodputaway!='草稿'">
              <span>{{scope.row.goodputaway}}</span>
              <el-switch   style="height:30px;margin-left:10px" v-model="scope.row.goodputaway=='上架'" @change="ChangeGoodsStatusBtn(scope.row)">
              </el-switch>
            </div>
            <el-button v-else type="text" size="small" @click="editGoodsBtn(scope.row.goodid)">{{scope.row.goodputaway}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230" fixed="right">
          <template slot-scope="scope" fixed="right">
            <el-button   @click="editGoodsBtn1(scope.row.goodid)" size="small" type="text">复制</el-button>
            <el-button v-if="!iseditordel(scope.row)"   @click="editGoodsBtn(scope.row.goodid)" size="small">编辑</el-button>
            <el-button v-else   @click="editGoodsBtn2(scope.row.goodid)" size="small">查看</el-button>
            <el-button   @click="DeleteGoodsBtn(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="GoodscurrentPage!=0" :page-sizes="[10, 20, 30, 40]" :current-page.sync="GoodscurrentPage" :page-size="GoodspageSize" layout="total, sizes, prev, pager, next, jumper" :total="GoodsCount"></el-pagination>
    </div>

    <!-- 新增商品弹窗 -->
    <el-dialog title="商品信息" :visible.sync="AddGoods.isshow" width="600px">
      <el-form size="medium" status-icon :model="AddGoods.AddGoodsform" :rules="AddGoods.AddGoodsformrules" ref="AddGoodsform" label-width="150px">
        <el-form-item label="商品类型：" prop="AddGoodsType">
          <el-select v-model="AddGoods.AddGoodsform.AddGoodsType" placeholder="请选择商品类型" style="width:70%">
            <el-option   v-for="item in AddGoods.goodstypelist" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分公司：" prop="Filiale">
          <el-select filterable v-model="AddGoods.AddGoodsform.Filiale" placeholder="请选择分公司" style="width:70%" :disabled="FilialeList.length==0">
            <el-option v-if="item!='全部'" v-for="item in FilialeList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="AddGoodsName">
          <el-input v-model="AddGoods.AddGoodsform.AddGoodsName" style="width:70%" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddGoods.isshow = false">取 消</el-button>
        <el-button type="primary" @click="gotoGoodsMsgBtn()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "packagelist",
  components: {},
  watch: {
    filialeValue(nvl) {
      console.log(nvl);
      console.log(this.$store.getters);
      if (!nvl || nvl == "" || nvl == "全部" || nvl == "优健康自营") {
        this.creatpeopleval="全部"
      } else {
        this.$api
          .get("/account/pullOrg2", {
            AccountType: "1",
            AccountName: nvl
          })
          .then(res => {
            console.log(res);
            if (this.$store.getters.getRoleInfo.AccountType == 0) {
              this.creatpeoplelist = [
                { creatpeoplename: "全部", creatpeopletype: "0" },
                { creatpeoplename: "运营", creatpeopletype: "0" },
                { creatpeoplename: nvl, creatpeopletype: "1" }
              ];
            }
            if (this.$store.getters.getRoleInfo.AccountType == 1) {
              this.creatpeoplelist = [
                { creatpeoplename: "全部", creatpeopletype: "0" },
                // { creatpeoplename: "运营", creatpeopletype: "0" },
                { creatpeoplename: nvl, creatpeopletype: "1" }
              ];
            }
            if (this.$store.getters.getRoleInfo.AccountType == 2) {
              this.creatpeoplelist = [
                { creatpeoplename: "全部", creatpeopletype: "0" },
                { creatpeoplename: "运营", creatpeopletype: "0" },
                { creatpeoplename: nvl, creatpeopletype: "1" },
                {
                  creatpeoplename: this.$store.getters.getRoleInfo.AccountName,
                  creatpeopletype: "2"
                }
              ];
              return;
            }
            res.data.map(item => {
              if (item.AccountType == 2) {
                item.Name.map((temp, index) => {
                  var obj = {
                    creatpeoplename: temp,
                    creatpeopletype: "2"
                  };
                  this.creatpeoplelist.push(obj);
                });
              }
            });
            console.log(this.creatpeoplelist);
          })
          .catch(res => {
            console.log(res);
          });
      }
    }
  },
  data() {
    return {
      FilialeList: ["全部", "微保"],
      creatpeoplelist: [],

      //新增商品信息
      AddGoods: {
        isshow: false,
        AddGoodsform: {
          AddGoodsType: "",
          Filiale: "",
          AddGoodsName: ""
        },
        AddGoodsformrules: {
          AddGoodsType: [
            { required: true, message: "请选择商品类型", trigger: "change" }
          ],
          Filiale: [
            { required: true, message: "请选择分公司", trigger: "change" }
          ],
          AddGoodsName: [
            { required: true, message: "请输入商品名称", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: "长度在 1 到 20 个字符",
              trigger: "blur"
            }
          ]
        },
        goodstypelist: [
          {
            value: "体检套餐",
            label: "体检套餐"
          }
          // {
          //   value: "虚拟商品",
          //   label: "虚拟商品"
          // },
          // {
          //   value: "加项包",
          //   label: "加项包"
          // }
        ]
      },

      commodityList: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "体检套餐",
          label: "体检套餐"
        }
        // {
        //   value: "虚拟商品",
        //   label: "虚拟商品"
        // }
      ],
      statusList: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "上架",
          label: "上架"
        },
        {
          value: "下架",
          label: "下架"
        },
        {
          value: "草稿",
          label: "草稿"
        }
      ],
      GoodSListData: [],
      goodsloading: false,

      GoodsCount: 0, //体检项目总数
      GoodspageSize: 10, //每页条数
      GoodscurrentPage: 0, //当前页

      commodityValue: "全部", //商品类型
      statusValue: "全部", //当前状态
      filialeValue: "", //所属分公司
      commodityName: "", //商品名字
      commodityID: "", //商品ID
      creatpeopleval: "全部"
    };
  },
  created(){
     this.setpagemsg();
  },
  mounted() {
   
//  if (this.$store.getters.getRoleInfo.AccountType == "0") {
//    //运营
//    console.log(this.$store.getters.getBranchOffice);
//    this.FilialeList = this.FilialeList.concat(
//      this.$store.getters.getBranchOffice
//    );
//  } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
//    //分公司
//    console.log(this.$store.getters.getRoleInfo.AccountName);
//    this.FilialeList = [];
//    this.AddGoods.AddGoodsform.Filiale = this.$store.getters.getRoleInfo.AccountName;
//    this.filialeValue = this.$store.getters.getRoleInfo.AccountName;
//  } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
//    //销售
//    this.FilialeList = [];
//    this.AddGoods.AddGoodsform.Filiale = this.$store.getters.getRoleInfo.FromCompany;
//    this.filialeValue = this.$store.getters.getRoleInfo.FromCompany;
//  }

    this.GooodsQuertBtn();
  

    // this.pullSonOrg2();
  },
  beforeDestroy(){
     this.copypagemsg();
  },
  methods: {
    //保存商品列表页面数据
    copypagemsg() {
      var body = {
        commodityValue: this.commodityValue, //商品类型
        statusValue: this.statusValue, //当前状态
        filialeValue: this.filialeValue, //所属分公司
        commodityName: this.commodityName, //商品名字
        commodityID: this.commodityID, //商品ID
        creatpeopleval: this.creatpeopleval,
        GoodscurrentPage: this.GoodscurrentPage,
        GoodspageSize: this.GoodspageSize
      };
      this.$store.commit("setpackagelistmsg", body);
    },
    //赋值商品列表页面数据
    setpagemsg() {
      var body = this.$store.getters.getpackagelistmsg;
      console.log(body);
      this.commodityValue = body.commodityValue || "全部";
      this.statusValue = body.statusValue || "全部";
      this.filialeValue = body.filialeValue || "";
      this.commodityName = body.commodityName || "";
      this.commodityID = body.commodityID || "";
      this.creatpeopleval = body.creatpeopleval || "全部";
      this.GoodscurrentPage = body.GoodscurrentPage || 1;
      this.GoodspageSize = body.GoodspageSize || 10;
      this.GoodspageSize = body.GoodspageSize || 10;
      
    },
    //删除商品按钮
    DeleteGoodsBtn(value) {
      console.log(value);
      this.$confirm("确认要删除该商品吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$api
            .get("/manage/deleteWeiBaoGood", {
              goodid: value.goodid,
              creatpeople: value.creatpeople
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "已删除!"
                });
                this.GooodsQuertBtn();
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消。"
          });
        });
    },
    //改变商品状态按钮
    ChangeGoodsStatusBtn(value) {
      var goodsstatus = "";
      switch (value.goodputaway) {
        case "上架":
          goodsstatus = "下架";
          break;
        case "下架":
          goodsstatus = "上架";
          break;
        default:
          break;
      }
      this.$confirm("确认要" + goodsstatus + "吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/manage/putWayWeiBaoGood", {
              goodid: value.goodid,
              creatpeople: value.creatpeople,
              goodputaway: goodsstatus
            })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "修改成功！"
                });
                this.GooodsQuertBtn();
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消。"
          });
        });
    },
    //编辑商品按钮
    editGoodsBtn(val) {
    	console.log(val)
      this.copypagemsg();
      this.$router.push("/MicroInsurance/packListAdd?goodsid=" + val);
    },
    //复制a
    editGoodsBtn1(val) {
      this.copypagemsg();

      this.$router.push("/MicroInsurance/packListAdd?goodsid=" + val + "&copy=true");
    },
    //查看
    editGoodsBtn2(val) {
      this.copypagemsg();

      this.$router.push("/MicroInsurance/packListAdd?goodsid=" + val + "&look=true");
    },
    //新增商品按钮
    AddGoodsBtn() {
      this.AddGoods.isshow = true;
    },
    //跳转到商品详情
    gotoGoodsMsgBtn() {
      // this.$router.push("/commodity/goodsmsg");
      this.$refs["AddGoodsform"].validate(valid => {
        if (valid) {
          if (this.AddGoods.AddGoodsform.AddGoodsType == "体检套餐") {
            this.copypagemsg();

            this.$router.push(
              "/MicroInsurance/packListAdd?goodsname=" +
                this.AddGoods.AddGoodsform.AddGoodsName +
                "&Filiale=" +
                this.AddGoods.AddGoodsform.Filiale +
                "&type=" +
                this.AddGoods.AddGoodsform.AddGoodsType
            );
          } else if (this.AddGoods.AddGoodsform.AddGoodsType == "加项包") {
            this.copypagemsg();

            this.$router.push(
              "/MicroInsurance/packageadd?goodsname=" +
                this.AddGoods.AddGoodsform.AddGoodsName +
                "&Filiale=" +
                this.AddGoods.AddGoodsform.Filiale
            );
          }
        } else {
          return false;
        }
      });
    },
    //搜索按钮
    querygooodsbtn() {
      this.GoodscurrentPage = 1;
      this.GooodsQuertBtn();
    },
    //获取机构列表-账户id
    // pullSonOrg2() {
    //   this.$api
    //     .get("/account/pullOrg2")
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(res => {
    //       console.log(res);
    //     });
    // },
    //商品搜索按钮
    GooodsQuertBtn() {
      this.goodsloading = true;
      var body = {
        goodtype: this.commodityValue,
        goodname: this.commodityName,
        instname: this.filialeValue,
        goodputaway: this.statusValue,
        page: this.GoodscurrentPage,
        pagesize: this.GoodspageSize,
        goodid: this.commodityID,
        creatpeopletype: "",
        creatpeoplename: this.creatpeopleval
      };
      console.log(this.creatpeoplelist);
      
      this.creatpeoplelist.map(item => {
        if (item.creatpeoplename == this.creatpeopleval) {
          body.creatpeopletype = item.creatpeopletype;
        }
      });
      if (body.creatpeoplename == "全部") {
        body.creatpeoplename = "";
        body.creatpeopletype = "";
      }
      this.$api
        .post("/manage/weiBaoQueryGoods", body)
        .then(res => {
          this.goodsloading = false;
          console.log(res);
          if (res.code == "200") {
            this.GoodSListData = res.data.data;
            this.GoodsCount = res.data.count;
          }
        })
        .catch(res => {
          this.goodsloading = false;
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.GoodspageSize = val;
      this.GoodscurrentPage = 1;
      this.GooodsQuertBtn();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.GoodscurrentPage = val;
      this.GooodsQuertBtn();
    },
    //销售只能管理自己的套餐 不可删除或编辑别人的套餐
    iseditordel(row) {
      if (
        this.$store.getters.getRoleInfo.AccountType == "2" &&
        row.creatname != this.$store.getters.getRoleInfo.AccountName + "-销售"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
//  // 获取按钮权限信息
//  Clickable() {
//    var temp = this.$store.getters.getRoles("商品列表");
//    console.log("vuex中获取按钮权限*****************");
//    console.log("temp.rolesList", temp.rolesList);
//    return temp.rolesList;
//  },
//  // 获取个人权限信息
//  RoleInfo() {
//    console.log("vuex中获取个人信息");
//    console.log(this.$store.getters.getRoleInfo);
//    return this.$store.getters.getRoleInfo;
//  }
  }
};
</script>

<style lang="scss">
</style>

