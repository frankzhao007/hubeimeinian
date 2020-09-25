<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">所属分公司：</div>
            <div class="grid_content">
              <el-select filterable v-model="AddProjectCompany" placeholder="请选择" size="medium" style="width:100%;" :disabled="Filialelist1.length==0">
                <el-option v-for="item in Filialelist1" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">商品名称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="AddProjectName" clearable size="medium" style="width:100%;"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">类别：</div>
            <div class="grid_content">
              <el-select v-model="AddProjectType" placeholder="请选择" size="medium" style="width:100%;">
                <el-option label="全部" value="全部"></el-option>
                <el-option label="单项" value="单项"></el-option>
                <el-option label="多项" value="多项"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">当前状态：</div>
            <div class="grid_content">
              <el-select v-model="AddProjectStatus" placeholder="请选择" size="medium" style="width:100%;">
                <el-option label="全部" value="全部"></el-option>
                <el-option label="上架" value="上架"></el-option>
                <el-option label="下架" value="下架"></el-option>
                <el-option label="草稿" value="草稿"></el-option>
              </el-select>
            </div>
          </el-col>

        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid_lable">创建人：</div>
            <div class="grid_content">
              <el-select :disabled="!AddProjectCompany||AddProjectCompany=='全部'||AddProjectCompany==''||AddProjectCompany=='优健康自营'" filterable clearable v-model="creatpeople" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in creatpeoplelist" :key="item.creatpeopleid" :label="item.creatpeoplename" :value="item.creatpeopleid">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 按钮 -->
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="addAddPackageBtn()">新增加项包</el-button>
        <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="queryaddpackage()">搜索</el-button>
      </div>
      <!-- 信息列表 -->
      <div>
        <el-table :data="AddProjectList" style="width: 100%;" v-loading="tableloading">
          <el-table-column prop="instname" label="所属分公司" min-width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatpeople" label="创建人" min-width="160"></el-table-column>
          <el-table-column prop="goodtype" label="类别" min-width="60"></el-table-column>
          <el-table-column prop="goodname" label="商品名称" min-width="200"></el-table-column>
          <el-table-column prop="goodid" label="商品ID" min-width="160"></el-table-column>
          <el-table-column prop="goodprice" label="门市价" min-width="100"></el-table-column>
          <el-table-column prop="goodlowprice" label="核算价" min-width="100"></el-table-column>
          <el-table-column label="当前状态" min-width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.goodputaway!='草稿'">
                <span>{{scope.row.goodputaway}}</span>
                <el-switch style="height:30px;margin-left:10px" :disabled="iseditordel(scope.row)" v-model="scope.row.goodputaway=='上架'" @change="ChangeAddPackageStatusBtn(scope.row)">
                </el-switch>
              </div>
              <el-button v-else type="text" size="small" @click="editAddPackageBtn(scope.row.goodid)">{{scope.row.goodputaway}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="销售价" min-width='80'>
            <template slot-scope="scope">
              <el-button type="text" size="small" :disabled="iseditordel(scope.row)" v-if="scope.row.goodsaleprice===0" @click="settingDiscountBtn(scope.row)">未设置</el-button>
              <el-button type="text" size="small" :disabled="iseditordel(scope.row)" v-else @click="settingDiscountBtn(scope.row)">{{scope.row.goodsaleprice}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="折扣" min-width='80'>
            <template slot-scope="scope">
              <div v-if="scope.row.gooddiscount!=0">
                {{scope.row.gooddiscount}}折
              </div>
              <div v-else>
                未设置
              </div>
            </template>
          </el-table-column>
          <el-table-column label="关联加项包组" min-width='160'>
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="lookjiaxiangbaozu(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="240" fixed='right'>
            <template slot-scope="scope">
              <el-button type="text"  size="mini" @click="copyAddPackageBtn(scope.row.goodid)">复制</el-button>
              <el-button size="mini" :disabled="iseditordel(scope.row)" @click="editAddPackageBtn(scope.row.goodid)">编辑</el-button>
              <el-button size="mini" :disabled="iseditordel(scope.row)" type="danger" @click="DeleteAddPackageBtn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block" style="text-align: right;margin-top: 20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="AddProjectcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="AddProjectpageSize" layout="total, sizes, prev, pager, next, jumper" :total="AddProjectCount">
        </el-pagination>
      </div>
    </div>
    <!-- 折扣设置弹窗 -->
    <el-dialog title="销售价：" width="400px" :visible.sync='Discount.isshow'>
      <el-form size="medium" status-icon :model="Discount" :rules="Discountrules" label-width="80px" ref="Discount">
        <el-form-item label="销售价：" prop="DiscountPrice">
          <el-input v-model="Discount.DiscountPrice" style="width:80%" placeholder="" @input="DiscountPriceinput()"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Discount.isshow = false">取 消</el-button>
        <el-button type="primary" @click="ChangeAddProjectSetSalePrice()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "projectlist",
  components: {},
  watch: {
    AddProjectCompany(nvl) {
      console.log(nvl);
      console.log(this.$store.getters);
      if (!nvl || nvl == "" || nvl == "全部" || nvl == "优健康自营") {
      } else {
        this.$api
          .get("/account/pullOrg2", {
            AccountType: "1",
            AccountName: nvl
          })
          .then(res => {
            console.log(res);
            if (this.$store.getters.getRoleInfo.AccountType == 0) {
              //运营
              this.creatpeoplelist = [
                { creatpeoplename: "全部", creatpeopleid: "" },
                { creatpeoplename: "运营", creatpeopleid: "运营" }
                // { creatpeoplename: nvl, creatpeopleid: "1" }
              ];
            }
            if (this.$store.getters.getRoleInfo.AccountType == 1) {
              //分公司
              this.creatpeoplelist = [
                { creatpeoplename: "全部", creatpeopleid: "" }
                // { creatpeoplename: "运营", creatpeopleid: "运营" },
                // { creatpeoplename: nvl, creatpeopleid: "1" }
              ];
            }
            if (this.$store.getters.getRoleInfo.AccountType == 2) {
              //销售
              this.creatpeoplelist = [
                { creatpeoplename: "全部", creatpeopleid: "" },
                { creatpeoplename: "运营", creatpeopleid: "运营" },
                // { creatpeoplename: nvl, creatpeopleid: "1" },
                {
                  creatpeoplename: this.$store.getters.getRoleInfo.AccountName,
                  creatpeopleid: this.$store.getters.getRoleInfo.Id
                }
              ];
              res.data.map(item => {
                if (item.AccountType == 1) {
                  var obj = {
                    creatpeoplename: item.Name[0],
                    creatpeopleid: item.ID[0]
                  };
                  this.creatpeoplelist.push(obj);
                }
              });
              return;
            }
            res.data.map(item => {
              if (item.AccountType == 1) {
                var obj = {
                  creatpeoplename: item.Name[0],
                  creatpeopleid: item.ID[0]
                };
                this.creatpeoplelist.push(obj);
              }
              if (item.AccountType == 2) {
                item.Name.map((temp, index) => {
                  var obj = {
                    creatpeoplename: temp,
                    creatpeopleid: item.ID[index]
                  };
                  this.creatpeoplelist.push(obj);
                });
              }
            });
          })
          .catch(res => {
            console.log(res);
          });
        console.log(this.creatpeoplelist);
      }
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(rule, value);
      let myreg = /^[0-9]+(.[0-9]{1,2})?$/;
      if (myreg.test(value)) {
        if (Number(value) > Number(this.selectAddProjectobj.goodlowprice)) {
          callback(new Error("销售价不可大于核算价！"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入正确格式的销售价"));
      }
    };
    return {
      tableloading: false,
      Filialelist1: ["全部", "优健康自营"], //所属公司list
      AddProjectList: [],
      AddProjectCount: 0, //加项包总数
      selectAddProjectobj: "", //选择的加项包
      creatpeoplelist: [],

      AddProjectCompany: "", //所属公司
      AddProjectType: "", //类型
      AddProjectName: "", //加项名称
      AddProjectStatus: "", //当前状态
      creatpeople: "",
      AddProjectpageSize: 10, //每页条数
      AddProjectcurrentPage: 0, //当前页

      //设置折扣弹窗属性
      Discount: {
        isshow: false,
        DiscountPrice: ""
      },
      Discountrules: {
        DiscountPrice: [
          { validator: validatePass, trigger: ["blur", "change"] }
        ]
      },
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
      value: "",
      input: "",
      AccountType: "" //当前账号的权限
    };
  },
  created() {
    this.AccountType = this.$store.getters.getRoleInfo.AccountType;
    this.setpagemsg();
    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      console.log(this.$store.getters.getBranchOffice);
      this.Filialelist1 = this.Filialelist1.concat(
        this.$store.getters.getBranchOffice
      );
      console.log(this.Filialelist1);
    } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
      //分公司
      console.log(this.$store.getters.getRoleInfo.AccountName);
      this.Filialelist1 = [];
      this.AddProjectCompany =
        this.$store.getters.getRoleInfo.parentName ||
        this.$store.getters.getRoleInfo.AccountName;
    } else if (
      this.$store.getters.getRoleInfo.AccountType == "2" ||
      this.$store.getters.getRoleInfo.AccountType == "7"
    ) {
      //销售
      this.Filialelist1 = [];
      this.AddProjectCompany = this.$store.getters.getRoleInfo.FromCompany;
    }

    this.manageQueryAddPackIndex();
  },
  mounted() {},
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
    lookjiaxiangbaozu(row) {
      console.log(row);
      // this.QueryJiaXiangGroupByJiaXiangId(row.goodid);
      this.$router.push(
        `/commodity/addpackagecombo?jiaXiangName=${row.goodname}`
      );
    },
    //加项包列表-查询是否关联加项包组
    QueryJiaXiangGroupByJiaXiangId(id) {
      this.$api
        .get("/manage/QueryJiaXiangGroupByJiaXiangId", {
          goodid: id
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //销售只能管理自己的套餐 不可删除或编辑别人的套餐
    iseditordel(row) {
      if (
        this.$store.getters.getRoleInfo.AccountType == "2" &&
        row.creatpeople != this.$store.getters.getRoleInfo.AccountName
      ) {
        return true;
      } else {
        return false;
      }
    },
    //保存数据
    copypagemsg() {
      var body = {
        AddProjectCompany: this.AddProjectCompany,
        AddProjectType: this.AddProjectType,
        AddProjectName: this.AddProjectName,
        AddProjectStatus: this.AddProjectStatus,
        creatpeople: this.creatpeople,
        AddProjectpageSize: this.AddProjectpageSize,
        AddProjectcurrentPage: this.AddProjectcurrentPage
      };
      this.$store.commit("setaddttemlistmsg", body);
    },
    //赋值商品列表页面数据
    setpagemsg() {
      var body = this.$store.getters.getaddttemlistmsg;
      this.AddProjectCompany = body.AddProjectCompany || "";
      this.AddProjectType = body.AddProjectType || "";
      this.AddProjectName = body.AddProjectName || "";
      this.AddProjectStatus = body.AddProjectStatus || "";
      this.creatpeople = body.creatpeople || "";
      this.AddProjectpageSize = body.AddProjectpageSize || 10;
      this.AddProjectcurrentPage = body.AddProjectcurrentPage || 1;
      console.log(body);
    },
    switchchange(val) {
      console.log(val);
    },
    //设置折扣校验
    DiscountPriceinput() {
      this.Discount.DiscountPrice = this.Discount.DiscountPrice.replace(
        /[^\.\d]/g,
        ""
      );
      // this.Discount.DiscountPrice = this.Discount.DiscountPrice.replace(".", "");
    },
    //确认设置折扣价
    ChangeAddProjectSetSalePrice() {
      console.log(this.selectAddProjectobj);
      let myreg = /^[0-9]+(.[0-9]{1,2})?$/;
      if (myreg.test(this.Discount.DiscountPrice)) {
        if (
          Number(this.Discount.DiscountPrice) >
          Number(this.selectAddProjectobj.goodlowprice)
        ) {
          return;
        } else {
          // callback();
        }
      } else {
        return;
      }
      // let myreg = /^[0-9]+(.[0-9]{1})?$/;
      // if (!myreg.test(this.Discount.DiscountPrice)) {
      //   console.log("请输入正确格式折扣 0.0 ~ 10.0");
      //   return;
      // }
      // if (
      //   Number(this.Discount.DiscountPrice) < 0 ||
      //   Number(this.Discount.DiscountPrice) > 10
      // ) {
      //   console.log("折扣值范围 0.0 ~ 10.0 之间");
      //   return;
      // }
      // if (
      //   this.selectAddProjectobj.goodprice *
      //     Number(this.Discount.DiscountPrice) *
      //     0.1 <
      //   this.selectAddProjectobj.goodlowprice
      // ) {
      //   console.log("折扣价低于核算价");
      //   return;
      // }
      var body = {
        goodid: this.selectAddProjectobj.goodid,
        gooddiscount: Number(
          (
            (Number(this.Discount.DiscountPrice) /
              Number(this.selectAddProjectobj.goodprice)) *
            10
          ).toFixed(1)
        ),

        goodsaleprice: Number(this.Discount.DiscountPrice)
      };
      console.log(body);

      this.$api.post("/manage/manageSetSalePrice", body).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.Discount.isshow = false;
          this.manageQueryAddPackIndex();
        }
      });
    },
    //搜索列表
    queryaddpackage() {
      this.AddProjectcurrentPage = 1;
      this.manageQueryAddPackIndex();
    },
    //查询加项包列表
    manageQueryAddPackIndex() {
      this.tableloading = true;
      var body = {
        goodtype: this.AddProjectType,
        goodname: this.AddProjectName,
        instname: this.AddProjectCompany,
        goodputaway: this.AddProjectStatus,
        page: this.AddProjectcurrentPage,
        pagesize: this.AddProjectpageSize,
        creatpeople: this.creatpeople
      };
      this.$api.post("/manage/manageQueryAddPackIndex", body).then(res => {
        console.log(res);
        this.tableloading = false;
        if (res.code == "200") {
          this.AddProjectList = res.data.data;
          this.AddProjectCount = res.data.count;
        }
      });
    },
    //新增加项包按钮
    addAddPackageBtn() {
      this.$router.push("/commodity/addpackage");
    },
    //编辑加项包按钮
    editAddPackageBtn(val) {
      this.$router.push("/commodity/addpackage?goodsid=" + val);
    },
    //copy加项包按钮
    copyAddPackageBtn(val) {
      this.$router.push(
        "/commodity/addpackage?goodsid=" + val + "&isedit=false"
      );
    },
    //新增加项包确认
    manageInsertAddpackage() {
      var body = {};
      this.$api.post("/manage/manageInsertAddpackage", body);
    },
    //删除加项包按钮
    DeleteAddPackageBtn(value) {
      this.$api
        .get("/manage/QueryJiaXiangGroupByJiaXiangId", {
          goodid: value.goodid
        })
        .then(res => {
          console.log(res);
          if (res.data != 0) {
            this.$message.error(
              "加项包已关联加项包组，加项包组正在使用中，不能删除。若需要下架加项包需解除关联的加项包组"
            );
            return;
          }
          this.$confirm("确认要删除该加项包吗？", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error"
          })
            .then(() => {
              this.$api
                .post("/manage/manageDeleteAddpackage", {
                  goodid: value.goodid
                })
                .then(res => {
                  if (res.code == "200") {
                    this.$message({
                      type: "success",
                      message: "已删除!"
                    });
                    if (
                      this.AddProjectList.length == 1 &&
                      this.AddProjectcurrentPage > 1
                    ) {
                      this.AddProjectcurrentPage =
                        this.AddProjectcurrentPage - 1;
                    }
                    this.manageQueryAddPackIndex();
                  }
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消。"
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
      console.log(value);
    },
    //改变加项包状态
    ChangeAddPackageStatusBtn(value) {
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
      if (goodsstatus == "下架") {
        this.$api
          .get("/manage/QueryJiaXiangGroupByJiaXiangId", {
            goodid: value.goodid
          })
          .then(res => {
            if (res.data != 0) {
              this.$message.error(
                "加项包已关联加项包组，加项包组正在使用中，不能下架。若需要下架加项包需解除关联的加项包组"
              );
              return;
            }
            this.$confirm("确认要" + goodsstatus + "吗？", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$api
                  .post("/manage/managePutwayAddpackage", {
                    goodid: value.goodid,
                    goodputaway: goodsstatus
                  })
                  .then(res => {
                    if (res.code == "200") {
                      this.$message({
                        type: "success",
                        message: "修改成功！"
                      });
                      this.manageQueryAddPackIndex();
                    }
                  });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "取消。"
                });
              });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$confirm("确认要" + goodsstatus + "吗？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api
              .post("/manage/managePutwayAddpackage", {
                goodid: value.goodid,
                goodputaway: goodsstatus
              })
              .then(res => {
                if (res.code == "200") {
                  this.$message({
                    type: "success",
                    message: "修改成功！"
                  });
                  this.manageQueryAddPackIndex();
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消。"
            });
          });
      }
    },
    //设置折扣价
    settingDiscountBtn(row) {
      console.log(row);

      this.Discount.DiscountPrice = row.goodsaleprice || "";
      this.Discount.isshow = true;
      this.selectAddProjectobj = row;
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.AddProjectpageSize = val;
      this.AddProjectcurrentPage = 1;
      console.log(`每页 ${val} 条`);
      this.manageQueryAddPackIndex();
    },
    handleCurrentChange(val) {
      this.AddProjectcurrentPage = val;
      console.log(`当前页: ${val}`);
      this.manageQueryAddPackIndex();
    }
  },
  computed: {}
};
</script>

<style lang="scss">
</style>
