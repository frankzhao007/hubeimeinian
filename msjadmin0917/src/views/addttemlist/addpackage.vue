<template>
  <div class="app-container">
    <div class="addpackagetitle">
      <i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp加项包详情</span>
    </div>
    <el-form :inline="true" size="medium" status-icon :model="AddPackagemsg" :rules="AddPackagemsgrules" label-width="120px" ref="AddGoodsmsg" style="margin-top:30px">
      <el-form-item label="商品类型：" prop="AddPackageType">
        <el-select v-model="AddPackagemsg. AddPackageType" placeholder="请选择商品类型" style="width:200px" disabled>
          <el-option label="加项包" value="加项包">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分公司：" prop="Filiale">
        <el-select v-model="AddPackagemsg.Filiale" filterable placeholder="请选择分公司" style="width:200px" :disabled="isedit||Filialelist.length==0||isgoedit">
          <el-option v-for="item in Filialelist" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称：" prop="AddPackageName">
        <el-input v-model="AddPackagemsg.AddPackageName" placeholder="商品名称最多20字" style="width:200px" maxlength="20"></el-input>
      </el-form-item>
      <div></div>
      <el-form-item label="商品ID：" prop="AddPackageID">
        <el-input v-model="AddPackagemsg. AddPackageID" placeholder="完成创建时系统自动生成" style="width:200px" disabled></el-input>
      </el-form-item>
      <el-form-item label="类别：" prop="AddPackageSort">
        <el-select v-model="AddPackagemsg.AddPackageSort" placeholder="请选择类别" style="width:200px" @change="AddPackageSortchange()">
          <el-option label="单项" value="单项"></el-option>
          <el-option label="多项" value="多项"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加项包编码：" prop="goodcode">
        <el-input v-model="AddPackagemsg.goodcode" placeholder="" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="适用性别：" prop="gender">
        <el-select v-model="AddPackagemsg.gender" placeholder="请选择适用性别" style="width:200px">
          <el-option label="通用" value="通用"></el-option>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状况：" prop="marital">
        <el-select v-model="AddPackagemsg.marital" placeholder="请选择婚姻状况" style="width:200px">
          <el-option label="通用" value="通用"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
          <el-option label="未婚" value="未婚"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 体检项目 -->
    <div>
      <div style="margin-top:20px;">
        <span class="cityboxtitle">
          <span style="color:#F56C6C;">*</span>
          <span>体检项目</span>
        </span>
        <el-button size="medium" @click="selectPhysicalBtn()">选择体检项目</el-button>
        <span style="margin-left:20px">共计：{{confirmProjectList.length}}项</span>
      </div>
      <div class="cityselectbox">
        <el-table :data="confirmProjectList" style="width: 100%;" size="medium" :border="true">
          <el-table-column label="项目代码" prop="instcityid" width="100"></el-table-column>
          <el-table-column label="单项名称" prop="checkname" width="310"></el-table-column>
          <el-table-column label="详细描述" class="alinehidden" min-width="300">
            <template slot-scope="scope">
              <div class="alinehidden">
                {{scope.row.checkdescribe}}</div>
            </template>
          </el-table-column>
          <el-table-column label="性别" prop="checkgender" min-width="100"></el-table-column>
          <el-table-column label="门市价" prop="checkprice" min-width="100"></el-table-column>
          <el-table-column label="核算价" prop="checklowprice" min-width="100"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="delconfirmproject(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-form size="medium" :inline="true" status-icon :model="AddPackagemsg" :rules="AddPackagemsgrules" label-width="120px" ref="AddGoodsmsg1" style="margin-top:30px">
      <el-form-item label="门市价：" prop="AddPackagePrice">
        <el-input v-model="AddPackagemsg.AddPackagePrice" placeholder="加项包应售价格" disabled style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="核算价：" prop="AddPackagePrice">
        <el-input v-model="AddPackagemsg.AddPackageLowPrice" placeholder="核算价用于成本核算，利润分析等，不会展示给用户" disabled style="width:400px"></el-input>
      </el-form-item>
      <div></div>
      <el-form-item label="售卖价：" prop="Addpackagegoodsaleprice">
        <el-input :disabled="AddPackagemsg.AddPackagePrice==''" v-model="AddPackagemsg.Addpackagegoodsaleprice" placeholder="加项包实售价格" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="折扣：">
        <el-input :disabled="AddPackagemsg.AddPackagePrice==''" v-model="AddPackagemsg.AddPackageDiscount" disabled placeholder="自动计算" style="width:200px"></el-input>
      </el-form-item>
    </el-form>
    <!-- 推荐理由 -->
    <div>
      <div style="margin-top:40px;">
        <span class="cityboxtitle">
          <span>推荐理由：</span>
        </span>
        <el-input show-word-limit type="textarea" style="width:75%" maxlength="100" :autosize="{ minRows: 3, maxRows: 4}" placeholder="点击输入，限制100个" v-model="AddPackagemsg.AddPackagecommended"></el-input>
      </div>
    </div>
    <!-- 按钮 -->
    <div style="float:right;margin:50px 0 20px 0">
      <el-button @click="goback()">取 消</el-button>
      <el-button type="primary" v-if="isedit" @click="manageUpdateAddpackae('草稿')">保存草稿</el-button>
      <el-button type="primary" v-else @click="manageInsertAddpackage('草稿')">保存草稿</el-button>
      <el-button type="primary" v-if="isedit" @click="manageUpdateAddpackae('上架')">确 认</el-button>
      <el-button type="primary" v-else @click="manageInsertAddpackage('上架')">确 认</el-button>
    </div>
    <!-- 选择体检项目弹窗 -->
    <el-dialog title=" 选择体检项目" :visible.sync='selectPhysical.isshow' width="1300px">
      <el-row style="line-height:32px;">
        <el-col :span="2">
          <div style="float:right">一级类别：</div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="selectPhysical.FirstTypeValue" placeholder="请选择" size="small" style="width:100%;" clearable>
            <el-option v-for="item in selectPhysical.FirstTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <div style="float:right">二级类别：</div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="selectPhysical.SecondTypevalue" :disabled="!selectPhysical.FirstTypeValue||selectPhysical.FirstTypeValue==''||selectPhysical.FirstTypeValue=='全部'" filterable placeholder="选择一级类别后可选" size="small" style="width:100%;" clearable>
            <el-option v-for="item in selectPhysical.SecondTypeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <div style="float:right">项目名称：</div>
        </el-col>
        <el-col :span="3">
          <el-input size="small" style="width:100%;" placeholder="点击输入" v-model="selectPhysical.seekPackageName" clearable></el-input>
        </el-col>
        <el-col :span="2">
          <div style="float:right">性别：</div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="selectPhysical.seeksex" placeholder="请选择" size="small" style="width:100%;" clearable>
            <el-option v-for="item in selectPhysical.AddPackageseeklist.sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-button size="small" style="float:right" @click="ProjectListQuery('1')">搜 索</el-button>
        </el-col>
      </el-row>

      <el-row style="line-height:32px;margin-top:10px">
        <el-col :span="2">
          <div style="float:right">项目代码：</div>
        </el-col>
        <el-col :span="3">
          <el-input size="small" style="width:100%;" placeholder="点击输入" v-model="selectPhysical.instcityid" clearable></el-input>
        </el-col>
      </el-row>
      <div style="margin:30px">
        <div style="margin:30px;text-align: center;color:#F56C6C" v-if="selectPhysical.projectCount==0">分公司未创建该类型体检项目，请先创建体检项目!</div>
        <div v-else>
          <div v-show="isshowtable">
            <el-table :row-key="getRowKeys" ref="ProjectRef" :data="selectPhysical.projectList" style="width: 100%;  position: relative;" size="medium" @selection-change="handleSelectionChange" @select="userChoose" @select-all="selectall">
              <el-table-column type="selection" :reserve-selection="true" width="55">
              </el-table-column>
              <el-table-column label="一级类目">
                <template slot-scope="scope">
                  <span>{{ scope.row.checktypefirst }}</span>
                </template>
              </el-table-column>

              <el-table-column label="二级类目">
                <template slot-scope="scope">
                  <span>{{ scope.row.checktypesec }}</span>
                </template>
              </el-table-column>
              <el-table-column label="项目代码">
                <template slot-scope="scope">
                  <span>{{ scope.row.instcityid }}</span>
                </template>
              </el-table-column>
              <el-table-column label="项目名称">
                <template slot-scope="scope">
                  <div class="alinehidden">{{ scope.row.checkname }}</div>
                </template>
              </el-table-column>
              <el-table-column label="详细描述">
                <template slot-scope="scope">
                  <div class="alinehidden">{{ scope.row.checkdescribe }}</div>
                </template>
              </el-table-column>
              <el-table-column label="性别" width="100">
                <template slot-scope="scope">
                  <div>{{ scope.row.checkgender }}</div>
                </template>
              </el-table-column>
              <el-table-column label="门市价" width="100">
                <template slot-scope="scope">
                  <div>{{ scope.row.checkprice}}</div>
                </template>
              </el-table-column>
              <el-table-column label="核算价" width="100">
                <template slot-scope="scope">
                  <div>{{ scope.row.checklowprice}}</div>
                </template>
              </el-table-column>
            </el-table>
            <div v-if="AddPackagemsg.AddPackageSort=='单项'" class="zindex"></div>
          </div>

          <!-- 分页 -->
          <div class="block" style="text-align: right;margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="selectPhysical.projectcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="selectPhysical.projectpageSize" layout="total, sizes, prev, pager, next, jumper" :total="selectPhysical.projectCount">
            </el-pagination>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectPhysical.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmProjectBtn()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "addpackage",
  components: {},
  watch: {
    "selectPhysical.FirstTypeValue": {
      handler(nv) {
        if (!nv || nv == "" || nv == "全部") {
          this.selectPhysical.SecondTypevalue = "";
        } else {
          this.selectPhysical.SecondTypevalue = "";
          this.queryAllCheckDirSec();
        }
      },
      deep: true,
      immediate: true
    },
    "AddPackagemsg.Addpackagegoodsaleprice": {
      handler(nv) {
        if (!nv || nv == "" || nv == "全部") {
          this.AddPackagemsg.AddPackageDiscount = "";
        } else {
          this.AddPackagemsg.AddPackageDiscount = Number(
            (Number(nv) / Number(this.AddPackagemsg.AddPackagePrice)) * 10
          ).toFixed(1);
        }
      },
      deep: true,
      immediate: true
    },
    // "AddPackagemsg.AddPackageSort": {
    //   handler(nv) {
    //     console.log(nv)
    //     this.confirmProjectList = [];
    //   },
    //   deep: false,
    //   immediate: true
    // },
    confirmProjectList(nv) {
      let Price = 0;
      let Price1 = 0;
      nv.map(item => {
        Price += item.checkprice;
        Price1 += item.checklowprice;
      });
      if (Price == 0) {
        this.AddPackagemsg.AddPackagePrice = "";
        this.AddPackagemsg.AddPackageLowPrice = "";
        this.AddPackagemsg.Addpackagegoodsaleprice = "";
        this.AddPackagemsg.AddPackageDiscount = "";
        this.DiscountTest = "请先选择体检套餐";
      } else {
        this.AddPackagemsg.AddPackagePrice = Price;
        this.AddPackagemsg.AddPackageLowPrice = Price1;
        this.AddPackagemsg.AddPackageDiscount = Number(
          (Number(this.AddPackagemsg.Addpackagegoodsaleprice) /
            Number(this.AddPackagemsg.AddPackagePrice)) *
            10
        ).toFixed(1);
        // this.DiscountTest = "点击输入0.0 ~ 10.0";
      }
    }
  },
  data() {
    //折扣输入校验
    var validatePass = (rule, value, callback) => {
      console.log(rule, value);
      let myreg = /^[0-9]+(.[0-9]{1})?$/;
      if (myreg.test(value)) {
        if (Number(value) < 0 || Number(value) > 10) {
          callback(new Error("折扣值范围 0.0 ~ 10.0 之间"));
        } else {
          // if (
          //   this.AddPackagemsg.AddPackagePrice * Number(value) * 0.1 <
          //   this.AddPackagemsg.AddPackageLowPrice
          // ) {
          //   callback(new Error("折扣价低于核算价"));
          // }
          //  else {
          callback();
          // }
        }
      } else {
        callback(new Error("请输入正确格式折扣 0.0 ~ 10.0"));
      }
    };
    //售卖价输入校验
    var validatePasssaleprice = (rule, value, callback) => {
      console.log(rule, value);
      let myreg = /^[0-9]+(.[0-9]{1,2})?$/;
      if (myreg.test(value)) {
        if (Number(value) > Number(this.AddPackagemsg.AddPackageLowPrice)) {
          callback(new Error("售卖价不可大于核算价"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入正确售卖价"));
      }
    };

    return {
      Filialelist: ["优健康自营"], //所属公司list
      isgoedit: false, //是否为上页带过来的数据
      isedit: false, //是否为编辑
      editobj: "",
      getRowKeys(row) {
        return row.checkid;
      },
      DiscountTest: "请先选择体检套餐",
      //体检项目弹窗属性
      selectPhysical: {
        isshow: false,
        FirstTypeList: [], //一级类别列表
        FirstTypeValue: "", //一级类别选择的值
        SecondTypeList: [], //二级类别列表，根据一级类别生成
        SecondTypevalue: "", //二级类别选择的值
        seeksex: "", //搜索框性别
        seekPackageName: "", //搜索栏项目名称
        instcityid: "", //项目代码
        //搜索栏属性列表
        AddPackageseeklist: {
          sex: [
            {
              value: "通用",
              label: "通用"
            },
            {
              value: "男",
              label: "男"
            },
            {
              value: "女",
              label: "女"
            }
          ]
        },
        projectList: [], //体检项目列表
        projectCount: 0, //体检项目总数
        projectpageSize: 10, //每页条数
        projectcurrentPage: 1 //当前页
      },
      //新增体检项目属性
      AddPackagemsg: {
        AddPackageType: "加项包",
        Filiale: "",
        AddPackageName: "",
        AddPackageID: "",
        AddPackageSort: "单项",
        AddPackagePrice: "",
        AddPackageLowPrice: "",
        AddPackageDiscount: "",
        AddPackagecommended: "",
        Addpackagegoodsaleprice: "",
        goodcode: "",
        gender: "通用",
        marital: "通用"
      },
      //新增体检属性校验
      AddPackagemsgrules: {
        AddPackageType: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        gender: [
          { required: true, message: "请选择适用性别", trigger: "change" }
        ],
        marital: [
          { required: true, message: "请选择婚姻状况", trigger: "change" }
        ],
        Filiale: [
          { required: true, message: "请选择分公司", trigger: "change" }
        ],
        AddPackageName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        AddPackageID: [
          { required: true, message: "请输入商品ID", trigger: "blur" }
        ],

        AddPackagePrice: [
          { required: true, message: "请输入门市价", trigger: "blur" }
        ],
        // AddPackageDiscount: [
        //   { required: true, message: "请输入折扣", trigger: "blur" },
        //   { validator: validatePass, trigger: "change" }
        // ],
        AddPackageSort: [
          { required: true, message: "请选择类别", trigger: "blur" }
        ],
        Addpackagegoodsaleprice: [
          { required: true, message: "请输入售卖价", trigger: "blur" },
          { validator: validatePasssaleprice, trigger: ["change", "blur"] }
        ]
      },
      //已选择的体检项目
      selectProjectList: [],
      //确认选择的体检项目
      confirmProjectList: [],
      isshowtable: false //控制同步显示table
    };
  },
  mounted() {
    console.log(this.$route.query);

    if (this.$store.getters.getRoleInfo.AccountType == "0") {
      console.log(this.$store.getters.getBranchOffice);
      this.Filialelist = this.Filialelist.concat(
        this.$store.getters.getBranchOffice
      );
      console.log(this.Filialelist);
    } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
      //分公司
      console.log(this.$store.getters.getRoleInfo.AccountName);
      this.Filialelist = [];
      this.AddPackagemsg.Filiale = this.$store.getters.getRoleInfo.AccountName;
    } else if (
      this.$store.getters.getRoleInfo.AccountType == "2" ||
      this.$store.getters.getRoleInfo.AccountType == "7"
    ) {
      //销售
      this.Filialelist = [];
      this.AddPackagemsg.Filiale = this.$store.getters.getRoleInfo.FromCompany;
    }

    if (this.$route.query && this.$route.query.goodsid) {
      console.log(this.$route.query);
      this.manageQueryAddpackageById(this.$route.query.goodsid);
      if (this.$route.query && this.$route.query.isedit == "false") {
        this.isedit = false;
      } else {
        this.isedit = true;
      }
    } else {
      this.isedit = false;
    }
    if (this.$route.query.goodsname && this.$route.query.Filiale) {
      //商品页面带过来的数据
      this.AddPackagemsg.AddPackageName = this.$route.query.goodsname;
      this.AddPackagemsg.Filiale = this.$route.query.Filiale;
      this.isgoedit = true;
    } else {
      this.isgoedit = false;
    }
    this.queryAllCheckDirFir(); //查询一级类目
  },
  methods: {
    delconfirmproject(index) {
      console.log(index);
      this.confirmProjectList.splice(index, 1);
    },
    AddPackageSortchange() {
      //切换类别 单项多项
      console.log(this.AddPackagemsg.AddPackageSort);
      this.confirmProjectList = [];
    },
    //设置折扣校验
    DiscountPriceinput() {
      this.Discount.DiscountPrice = this.Discount.DiscountPrice.replace(
        /[^\.\d]/g,
        ""
      );
      // this.Discount.DiscountPrice = this.Discount.DiscountPrice.replace(".", "");
    },
    goback() {
      this.$router.go(-1);
    },
    //id查询加项包
    manageQueryAddpackageById(val) {
      this.$api
        .post("/manage/manageQueryAddpackageById", { goodid: val })
        .then(res => {
          if (res.code == "200") {
            console.log(res);
            this.AddPackagemsg = {
              AddPackageType: "加项包",
              Filiale: res.data.instname,
              AddPackageName: res.data.goodname,
              AddPackageID: res.data.goodid,
              AddPackageSort: res.data.goodtype,
              AddPackagePrice: res.data.goodprice,
              AddPackageLowPrice: res.data.goodlowprice,
              AddPackageDiscount: res.data.gooddiscount,
              AddPackagecommended: res.data.goodcheckrecommended,
              Addpackagegoodsaleprice: res.data.goodsaleprice,
              goodcode: res.data.goodcode,
              marital: res.data.marital,
              gender: res.data.gender
            };
            this.confirmProjectList = res.data.goodchecktypes;
            this.editobj = res.data;
            console.log(this.confirmProjectList);
          }
        });
    },
    //查询所有--一级类目
    queryAllCheckDirFir() {
      this.FirstTypeList = [
        {
          value: "全部",
          label: "全部"
        }
      ];
      this.$api.post("/manage/queryAllCheckDirFir").then(res => {
        console.log(res);
        if (res.code == "200") {
          res.data.map(item => {
            var temp = {
              value: item.checktypefirst,
              label: item.checktypefirst
            };
            this.selectPhysical.FirstTypeList.push(temp);
          });
        }
      });
    },
    //查询所有--二级类目
    queryAllCheckDirSec() {
      this.selectPhysical.SecondTypeList = [];
      this.$api
        .post("/manage/queryAllCheckDirSec", {
          checktypefirst: this.selectPhysical.FirstTypeValue
        })
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            res.data.map(item => {
              var temp = {
                value: item.checktypesec,
                label: item.checktypesec
              };
              this.selectPhysical.SecondTypeList.push(temp);
            });
          }
        });
    },
    //查询体检项目列表
    ProjectListQuery(bool) {
      console.log(this.selectPhysical.SecondTypevalue);

      var body = {
        checktypefirst: this.selectPhysical.FirstTypeValue,
        checktypesec: this.selectPhysical.SecondTypevalue,
        checkname: this.selectPhysical.seekPackageName,
        checkgender: this.selectPhysical.seeksex,
        instcityid: this.selectPhysical.instcityid,
        page: this.selectPhysical.projectcurrentPage,
        pagesize: this.selectPhysical.projectpageSize
      };
      this.$api.post("/manage/managequerychecks2", body).then(res => {
        if (res.code == "200") {
          this.selectPhysical.projectList = res.data.data;
          this.selectPhysical.projectCount = res.data.count;
          console.log(this.selectPhysical.projectList);
          if (bool == "1") {
            this.selectPhysical.isshow = true;
            if (this.selectPhysical.projectCount > 0) {
              setTimeout(() => {
                this.$refs.ProjectRef.clearSelection();
                setTimeout(() => {
                  this.isshowtable = true;
                }, 0);
                // this.confirmProjectList.map(element => {
                //   this.selectPhysical.projectList.map((item, info) => {
                //     if (item.checkid == element.checkid) {
                //       this.$refs.ProjectRef.toggleRowSelection(item);
                //     }
                //   });
                // });
              }, 0);
            }
          }
        }
      });
    },
    //选择体检项目按钮
    selectPhysicalBtn() {
      this.isshowtable = false;
      this.selectPhysical.projectList = [];
      this.selectPhysical.projectcurrentPage = 1;
      this.selectPhysical.FirstTypeValue = "";
      this.selectPhysical.SecondTypevalue = "";
      this.ProjectListQuery("1"); //查询体检项目
      // 清楚保留数据 或者 勾选 已选择存在数据
    },
    //确认选择的体检项目btn
    confirmProjectBtn() {
      console.log(this.selectProjectList);
      console.log(this.confirmProjectList);
      //
      if (this.AddPackagemsg.AddPackageSort == "单项") {
        this.confirmProjectList = this.selectProjectList;
      } else {
        var arr1 = this.selectProjectList;
        var arr2 = this.confirmProjectList;
        var length1 = arr1.length;
        var length2 = arr2.length;
        for (var i = 0; i < length1; i++) {
          for (var j = 0; j < length2; j++) {
            //判断添加的数组是否为空了
            if (arr1.length > 0) {
              if (arr1[i].checkid === arr2[j].checkid) {
                arr1.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
                length1--;
              }
            }
          }
        }
        console.log(arr1);
        if (arr1.length > 0) {
          this.confirmProjectList = this.confirmProjectList.concat(arr1);
        }
      }

      this.selectPhysical.isshow = false;
    },
    handleSizeChange(val) {
      this.selectPhysical.projectpageSize = val;
      console.log(`每页 ${val} 条`);
      this.ProjectListQuery("2");
    },
    handleCurrentChange(val) {
      this.selectPhysical.projectcurrentPage = val;
      console.log(`当前页: ${val}`);
      this.ProjectListQuery("2");
    },
    handleSelectionChange(val) {
      console.log(val);
      if (this.AddPackagemsg.AddPackageSort != "单项") {
        this.selectProjectList = val;
      }
    },
    userChoose(selection, row) {
      console.log(selection);
      console.log(row);

      if (this.AddPackagemsg.AddPackageSort == "单项") {
        //clearSelection：用于多选表格，清空用户的选择
        //此时所有的checkbox处于未勾选，当用户第一次点击的时候，selectio为一个数组，里面存放的为当前这一行的数据
        this.$refs.ProjectRef.clearSelection();
        //此时selection仍然有值 ，只是勾选状态不显示了。
        if (selection.length === 0) {
          return;
        }
        //这这里将这行的状态又变为了勾选
        this.$refs.ProjectRef.toggleRowSelection(row, true);
        this.selectProjectList = [row];
        console.log(selection);

        //用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
      }
    },

    // handleClose(tag) {
    //   console.log(tag);
    //   console.log(this.selectProjectList);
    //   console.log(this.selectProjectList.indexOf(tag));
    //   this.selectProjectList.map((item, index) => {
    //     if (item == tag) {
    //       this.selectProjectList.splice(index, 1);
    //     }
    //   });
    // },
    selectall() {
      if (this.AddPackagemsg.AddPackageSort == "单项") {
        this.$refs.ProjectRef.clearSelection();
        this.$message.error("单项模式下无法使用全选功能！");
      }
    },
    //添加加项包确认按钮
    manageInsertAddpackage(str) {
      // this.$refs["AddGoodsmsg"].validate(valid => {
      //   if (valid) {
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      // this.$refs["AddGoodsmsg1"].validate(valid => {
      //   if (valid) {
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      if (!this.AddPackagemsg.Filiale) {
        this.$message.error("请选择所属分公司");
        return;
      }
      if (!this.AddPackagemsg.AddPackageName) {
        this.$message.error("请输入项目名称");
        return;
      }
      if (!this.AddPackagemsg.gender) {
        this.$message.error("请选择适用性别");
        return;
      }
      if (!this.AddPackagemsg.marital) {
        this.$message.error("请选择婚姻状况");
        return;
      }
      if (!this.confirmProjectList || this.confirmProjectList.length <= 0) {
        this.$message.error("请选择体检项目");
        return;
      }
      if (!this.AddPackagemsg.Addpackagegoodsaleprice) {
        this.$message.error("请输入售卖价");
        return;
      }
      if (
        Number(this.AddPackagemsg.Addpackagegoodsaleprice) >
        Number(this.AddPackagemsg.AddPackageLowPrice)
      ) {
        this.$message.error("售卖价不可大于核算价");
        return;
      }
      // if (!this.AddPackagemsg.AddPackageDiscount) {
      //   this.$message.error("请输入折扣");
      //   return;
      // }
      // let myreg = /^[0-9]+(.[0-9]{1})?$/;
      // if (!myreg.test(this.AddPackagemsg.AddPackageDiscount)) {
      //   this.$message.error("请输入正确格式折扣 0.0 ~ 10.0");
      //   return;
      // }
      // if (
      //   Number(this.AddPackagemsg.AddPackageDiscount) < 0 ||
      //   Number(this.AddPackagemsg.AddPackageDiscount) > 10
      // ) {
      //   this.$message.error("折扣值范围 0.0 ~ 10.0 之间");
      //   return;
      // }
      // if (
      //   this.AddPackagemsg.AddPackagePrice *
      //     Number(this.AddPackagemsg.AddPackageDiscount) *
      //     0.1 <
      //   this.AddPackagemsg.AddPackageLowPrice
      // ) {
      //   this.$message.error("折扣价低于核算价");
      //   return;
      // }

      var body = {
        goodtype: this.AddPackagemsg.AddPackageSort, //单项多项
        goodname: this.AddPackagemsg.AddPackageName, //加项包名称
        instname: this.AddPackagemsg.Filiale, //所属分公司
        goodprice: this.AddPackagemsg.AddPackagePrice, //门店价
        goodlowprice: this.AddPackagemsg.AddPackageLowPrice, //核算价
        goodsaleprice: Number(this.AddPackagemsg.Addpackagegoodsaleprice), //最终价
        gooddiscount: Number(this.AddPackagemsg.AddPackageDiscount), //折扣
        goodcheckrecommended: this.AddPackagemsg.AddPackagecommended, //推荐理由
        goodcode: this.AddPackagemsg.goodcode, //加项包编码
        gender: this.AddPackagemsg.gender, //加项包适用性别
        marital: this.AddPackagemsg.marital, //加项包适用婚姻状态
        goodputaway: str
      };
      body.goodchecktypes = [];
      this.confirmProjectList.map(item => {
        let temp = {
          checkid: item.checkid,
          checktypefirst: item.checktypefirst,
          checktypesec: item.checktypesec,
          checkname: item.checkname,
          checkdescribe: item.checkdescribe,
          checkgender: item.checkgender,
          checklowprice: item.checklowprice,
          checkprice: item.checkprice,
          checksignificance: item.checksignificance
        };
        body.goodchecktypes.push(temp);
      });
      console.log(body);
      this.$api
        .post("/manage/manageInsertAddpackage", body)
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            this.$router.push("/commodity/addttemlist");
            this.$message.success("新建成功！");
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    //修改加项包
    manageUpdateAddpackae(str) {
      this.$refs["AddGoodsmsg"].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.$refs["AddGoodsmsg1"].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      if (!this.AddPackagemsg.gender) {
        this.$message.error("请选择适用性别");
        return;
      }
      if (!this.AddPackagemsg.marital) {
        this.$message.error("请选择婚姻状况");
        return;
      }
      if (!this.confirmProjectList || this.confirmProjectList.length <= 0) {
        this.$message.error("请选择体检项目");
        return;
      }
      if (
        this.AddPackagemsg.Addpackagegoodsaleprice == null ||
        this.AddPackagemsg.Addpackagegoodsaleprice === ""
      ) {
        this.$message.error("请输入售卖价");
        return;
      }
      if (
        Number(this.AddPackagemsg.Addpackagegoodsaleprice) >
        Number(this.AddPackagemsg.AddPackageLowPrice)
      ) {
        this.$message.error("售卖价不可大于核算价");
        return;
      }
      // if (!this.AddPackagemsg.AddPackageDiscount) {
      //   this.$message.error("请输入折扣");
      //   return;
      // }
      // let myreg = /^[0-9]+(.[0-9]{1})?$/;
      // if (!myreg.test(this.AddPackagemsg.AddPackageDiscount)) {
      //   this.$message.error("请输入正确格式折扣 0.0 ~ 10.0");
      //   return;
      // }
      // if (
      //   Number(this.AddPackagemsg.AddPackageDiscount) < 0 ||
      //   Number(this.AddPackagemsg.AddPackageDiscount) > 10
      // ) {
      //   this.$message.error("折扣值范围 0.0 ~ 10.0 之间");
      //   return;
      // }
      // if (
      //   this.AddPackagemsg.AddPackagePrice *
      //     Number(this.AddPackagemsg.AddPackageDiscount) *
      //     0.1 <
      //   this.AddPackagemsg.AddPackageLowPrice
      // ) {
      //   this.$message.error("折扣价低于核算价");
      //   return;
      // }
      let obj = this.editobj;
      obj.gender = this.AddPackagemsg.gender; //加项包适用性别
      obj.marital = this.AddPackagemsg.marital; //加项包适用婚姻状态
      obj.goodname = this.AddPackagemsg.AddPackageName; //加项包名称
      obj.goodtype = this.AddPackagemsg.AddPackageSort; //单项多项
      obj.gooddiscount = Number(this.AddPackagemsg.AddPackageDiscount); //折扣
      obj.goodprice = this.AddPackagemsg.AddPackagePrice;
      obj.goodlowprice = this.AddPackagemsg.AddPackageLowPrice;
      obj.goodsaleprice = Number(this.AddPackagemsg.Addpackagegoodsaleprice); //最终价
      obj.goodcheckrecommended = this.AddPackagemsg.AddPackagecommended; //推荐理由
      obj.goodcode = this.AddPackagemsg.goodcode; //加项包编码
      obj.goodputaway = str;
      obj.goodchecktypes = [];
      var body = obj;
      body.goodchecktypes = [];
      this.confirmProjectList.map(item => {
        let temp = {
          checkid: item.checkid,
          checktypefirst: item.checktypefirst,
          checktypesec: item.checktypesec,
          checkname: item.checkname,
          checkdescribe: item.checkdescribe,
          checkgender: item.checkgender,
          checklowprice: item.checklowprice,
          checkprice: item.checkprice,
          checksignificance: item.checksignificance
        };
        body.goodchecktypes.push(temp);
      });
      console.log(body);
      this.$api
        .post("/manage/manageUpdateAddpackae", body)
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            this.$router.push("/commodity/addttemlist");
            this.$message.success("修改成功！");
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.addpackagetitle {
  font-size: 20px;
}
.cityboxtitle {
  width: 120px;
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.cityselectbox {
  min-height: 100px;
  margin: 20px 20px 20px 120px;
  border: none;
}
.cityitembox {
  margin: 10px 0px 10px 20px;
}
.zindex {
  background-color: rgb(245, 245, 245);
  position: absolute;
  width: 40px;
  height: 40px;
  top: 190px;
  left: 55px;
  z-index: 100;
}
.tagtext {
  color: #aaa;
}
</style>
