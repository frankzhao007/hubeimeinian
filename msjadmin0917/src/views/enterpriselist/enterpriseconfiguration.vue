<template>
  <!-- 套餐配置 -->
  <div class="app-container">
    <div class="enterpriseconfiguration_wrap">
      <div>

        <div class="enterpriseconfiguration_header">
          <h3> <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i> 企业</h3>
          <el-divider></el-divider>
        </div>
        <el-form label-width="80px" size="medium">
          <el-form-item label="企业：">
            <span>{{enterpriseData.accountName}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div class="enterpriseconfiguration_header">
          <h3>关联套餐</h3>
          <el-divider></el-divider>
        </div>
        <!-- 关联套餐--------------------------------------------------------------------------------- -->
        <el-form label-width="180px" size="medium">
          <el-form-item label="套餐：">
            <el-button @click="dialogVisible = true" plain>关联套餐</el-button>
          </el-form-item>
          <el-form-item label="套餐原价是否显示：">
            <!-- IsHidden -->
            <el-switch v-model="IsHidden" @change="IsHiddenchange">
            </el-switch>
          </el-form-item>
          <el-form-item label="自费套餐是否配置：">
            <!-- IsToConfPk -->
            <el-switch v-model="IsToConfPk" @change="IsHiddenchange">
            </el-switch>
          </el-form-item>
          <el-form-item label="员工扫码加入是否审核：">
            <el-switch v-model="isAudit" @change="isAuditchange" :active-value='false' :inactive-value='true'>
            </el-switch>
          </el-form-item>

        </el-form>
        <!-- 套餐详情 -->
        <!-- {{enterMeal}} -->
        <!-- 数据表格 -->
        <div v-if="true">
          <el-table :data="enterMeal" style="width: 100%">
            <el-table-column label="序号" min-width="60px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="goodname" show-overflow-tooltip label="套餐名称" min-width="160px"></el-table-column>
            <el-table-column prop="GoodType" show-overflow-tooltip label="商品类型" min-width="160px"></el-table-column>
            <el-table-column label="付费方式" min-width="120px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.payMethod" placeholder="请选择" size="small" :disabled="scope.row.GoodType=='电子体检卡'">
                  <el-option label="公费" value="公费"></el-option>
                  <el-option label="自费" value="自费"></el-option>
                </el-select>
                <!-- <el-select v-model="scope.row.payMethod" placeholder="请选择" v-if="isNewOrEdit == 1" :disabled="scope.row.payMethod!=''" size="small">
                  <el-option label="公费" value="公费"></el-option>
                  <el-option label="自费" value="自费"></el-option>
                </el-select> -->
              </template>
            </el-table-column>
            <el-table-column prop="goodprice" label="门市价" min-width="120px"></el-table-column>
            <el-table-column label="企业内部价" min-width="120px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.internalprice" @input="CalculateDiscount(scope.$index)" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="折扣" min-width="60px">
              <template slot-scope="scope">
                {{TypeConversion(scope.$index)}}
              </template>
            </el-table-column>
            <el-table-column prop="soldOut" label="已售" min-width="60px"></el-table-column>
            <el-table-column label="套餐状态" min-width="85px">
              <template slot-scope="scope">
                <div v-if="scope.row.GoodType=='体检套餐'">
                  {{goodsvalid(scope.row.endTime)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="有效截止日期" min-width="200px">
              <template slot-scope="scope" v-if="scope.row.payMethod=='公费'">
                <!-- <el-input v-model="scope.row.termValidity" size="small"></el-input> -->
                <el-date-picker v-model="scope.row.endTime" align="right" size="small" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions" style="width:100%">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="160px">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="delPackage(scope.$index)">删除</el-button>
                <el-button type="text" size="small" :disabled="scope.$index==0" @click="upMealOfSet('up',scope.$index)">上移</el-button>
                <el-button type="text" size="small" :disabled="scope.$index==enterMeal.length-1" @click="upMealOfSet('down',scope.$index)">下移</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="false" class="enterpriseconfiguration_block">
          <div class="enterpriseconfiguration_form" v-for="(v,index) in enterMeal">
            <!-- 删除按钮 -->
            <div class="en_block_del">
              <el-button @click="delPackage(index)" class="en_block_del_button" type="danger" icon="el-icon-delete" circle size="medium"></el-button>
              <!-- <el-popover placement="top" width="160" trigger="click" v-model="v.visible">
                <p>确定要删除{{v.goodname}}套餐吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="small" type="text" @click="v.visible = false">取消</el-button>
                  <el-button type="primary" size="small" @click="delPackage(index)">确定</el-button>
                </div>
                <el-button slot="reference" class="en_block_del_button" type="danger" icon="el-icon-delete" circle size="medium"></el-button>
              </el-popover> -->
            </div>
            <div class="en_block_form">
              <el-form :model="v" :rules="packageFormRules" :ref="v.goodid" label-position="left" size="medium" label-width="120px" class="demo-ruleForm">
                <el-form-item label="套餐名称：" prop="goodname" size="medium">
                  <el-input v-model="v.goodname" disabled></el-input>
                </el-form-item>
                <el-form-item label="门市价：" prop="goodprice" size="medium">
                  <el-input disabled v-model="v.goodprice"></el-input>
                </el-form-item>
                <div class="en_block_payMethod">
                  <el-form-item label="付费方式：" prop="payMethod" size="medium">
                    <el-select v-model="v.payMethod" placeholder="请选择" v-if="isNewOrEdit == 0">
                      <el-option label="公费" value="公费"></el-option>
                      <el-option label="自费" value="自费"></el-option>
                    </el-select>
                    <el-select v-model="v.payMethod" placeholder="请选择" v-if="isNewOrEdit == 1" :disabled="v.payMethod!=''">
                      <el-option label="公费" value="公费"></el-option>
                      <el-option label="自费" value="自费"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="en_block_img">
                    <el-popover trigger="hover" placement="right">
                      <p>公费表示签约企业直接一 次性支付指定数</p>
                      <p>量套餐，后续员工可0元支付;</p>
                      <p>自费表示签约企业员工需要支付实际金额。</p>
                      <div slot="reference" class="name-wrapper">
                        <img src="../../assets/doubt.png" alt="">
                      </div>
                    </el-popover>
                  </div>
                </div>
                <el-form-item label="企业内部价：" prop="internalprice" size="medium">
                  <el-input v-model="v.internalprice" @input="CalculateDiscount(index)"></el-input>
                </el-form-item>
                <el-form-item label="折扣：" prop="goodsaleprice" size="medium">
                  {{TypeConversion(index)}}
                  <el-input v-show="true" disabled v-model="v.goodsaleprice" @input="TypeConversion(index)"></el-input>
                </el-form-item>
                <!-- <el-form-item v-if="v.payMethod=='公费'" label="库存：" prop="stock" size="medium">
                  <el-input v-model="v.stock"></el-input>
                </el-form-item> -->
                <el-form-item label="已售（件）：" size="medium">
                  <el-input v-model="v.soldOut" disabled></el-input>
                </el-form-item>
                <el-form-item v-if="v.payMethod=='公费'" label="有限期（月）：" size="medium">
                  <el-input v-model="v.termValidity"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="enterpriseconfiguration_footer">
      <el-button plain @click="$router.back(-1);">取 消</el-button>
      <el-button type="primary" @click="submitForm(enterMeal)">确认</el-button>
    </div>
    <!-- 弹窗 -->
    <!-- 套餐表格数据 -->
    <div>
      <el-dialog title="选择套餐" :visible.sync="dialogVisible" top="10vh" width="800px">
        <div v-if="dialogVisible">
          <!-- 套餐表格数据 -->
          <AssociatedPackage ref="AssociatedPackage" :editObj="editObj" :accountName="enterpriseData.accountName" :fromCompanyData="enterpriseData.fromCompany" v-on:getComponentsPackage="getComponentsPackage" />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ConfirmButton">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AssociatedPackage from "./components/AssociatedPackage";
export default {
  name: "enterpriseconfiguration",
  components: { AssociatedPackage },
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log("11231231233", rule, value);
      let myreg = /^[0-9]+(.[0-9]{2})?$/;
      if (myreg.test(value)) {
        if (Number(value) < 0 || Number(value) > 10) {
          callback(new Error("折扣值范围 0.0 ~ 10.0 之间"));
        } else {
          for (let i = 0; i < this.enterMeal.length; i++) {
            // let element = this.enterMeal[i];
            // console.log(i);
            // console.log(this.enterMeal[i].goodlowprice);
            // console.log(
            //   this.enterMeal[i].goodname,
            //   this.enterMeal[i].goodprice
            // );
            // console.log(
            //   "计算价格",
            //   this.enterMeal[i].goodname,
            //   Number(this.enterMeal[i].goodprice) * Number(value) * 0.1
            // );
            // console.log("最低价", this.enterMeal[i].goodlowprice);
            // console.log(
            //   "bool",
            //   this.enterMeal[i].goodprice * Number(value) * 0.1 <
            //     this.enterMeal[i].goodlowprice
            // );
            // console.log(
            //   "最终价格",
            //   Number(this.enterMeal[i].goodprice * Number(value) * 0.1).toFixed(
            //     2
            //   )
            // );
            // console.log("12312312312", Number(value));
            if (
              Number(
                this.enterMeal[i].goodprice *
                  Number(this.enterMeal[i].goodsaleprice) *
                  0.1
              ).toFixed(2) < this.enterMeal[i].goodlowprice
            ) {
              callback(new Error("折扣价低于核算价"));
            } else {
              callback();
            }
          }
        }
      } else {
        callback(new Error("请输入正确格式折扣 0.00 ~ 10.00"));
      }
    };
    var validateInternalprice = (rule, value, callback) => {
      console.log("rule:", rule);
      console.log("value:", value);
      if (!/^[0-9]+(.[0-9]{2})?$/.test(value)) {
        callback(new Error("请输入整数或保留两位小数"));
      }
      // if (value <= 0) {
      //   callback(new Error("企业内部价不能为零！"));
      // }

      for (let i = 0; i < this.enterMeal.length; i++) {
        if (
          Number(this.enterMeal[i].internalprice) >
          Number(this.enterMeal[i].goodprice)
        ) {
          callback(new Error("企业内部价不能低于门市价！"));
        } else {
          callback();
        }
      }
    };
    return {
      isAudit: false, //是否审核
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      // 企业数据
      enterpriseData: {
        accountName: "",
        mobile: "",
        fromCompany: "",
        id: ""
      },
      // 弹窗
      dialogVisible: false,
      packageForm: {
        instname: "", //	所属分公司
        goodid: "", //	产品id
        goodname: "", //	套餐名称
        goodprice: "", //		门市价,无合作企业时的售价
        goodlowprice: "", //		产品最低售价，仅内部核算用
        goodsaleprice: "", //	折扣
        payMethod: "", //	付费方式
        stock: "", //		库存
        soldOut: "", //		已售
        termValidity: "" //		有效期
      },
      // 套餐表单规则
      packageFormRules: {
        goodname: [
          { required: true, message: "请输入套餐名称", trigger: "blur" }
        ],
        goodprice: [
          { required: true, message: "请输入门市价", trigger: "blur" }
        ],
        payMethod: [
          { required: true, message: "请选择付费方式", trigger: "blur" }
        ],
        goodsaleprice: [
          { required: true, message: "请输入折扣", trigger: "change" },
          { validator: validatePass, trigger: "change" }
        ],
        internalprice: [
          { required: true, message: "请输入企业内部价", trigger: "blur" },
          { validator: validateInternalprice, trigger: "change" }
        ]
        // stock: [{ required: true, message: "请输入库存", trigger: "blur" }]
      },
      // 选中套餐数据
      IsHidden: false,
      IsToConfPk: false,
      enterMeal: [],
      goodsalepriceindex: "",
      isNewOrEdit: 0,
      editObj: [] //编辑临时保存的数据
    };
  },
  created() {
    // 传参赋值
    this.enterpriseData = {
      accountName: this.$route.query.accountName,
      mobile: this.$route.query.mobile,
      fromCompany: this.$route.query.fromCompany,
      id: this.$route.query.id
    };
    if (this.$route.query.type == 0) {
      this.isNewOrEdit = 0;
      console.log("新增");
    } else {
      console.log("编辑");
      this.isNewOrEdit = 1;
      this.findByIdEnterManage();
    }
  },
  mounted() {
    console.log(this.enterpriseData);
  },
  methods: {
    isAuditchange(val) {
      //是否审核

      var body = {
        id: this.$route.query.id,
        checked: this.isAudit
      };
      this.$api
        .post("/sales/updateChecked", body)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goodsvalid(endTime) {
      console.log(
        new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()
      );
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let day =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let nowdate = Number(
        new Date(new Date().getFullYear() + "-" + month + "-" + day)
      );
      let endtime = Number(new Date(endTime));

      if (nowdate > endtime) {
        return "失效";
      } else {
        return "有效";
      }
    },
    IsHiddenchange(val) {
      console.log(val);
      var body = {
        id: this.$route.query.id,
        IsHidden: "",
        IsToConfPk: ""
      };
      if (this.IsHidden) {
        body.IsHidden = "";
      } else {
        body.IsHidden = "1";
      }
      if (this.IsToConfPk) {
        body.IsToConfPk = "1";
      } else {
        body.IsToConfPk = "";
      }
      this.$api
        .post("/sales/updateEnterManageByHidden", body)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 接收组件传过来的套餐数据
    getComponentsPackage(val) {
      console.log("接收组件传过来的套餐数据", val);
      this.enterMeal = this.filterRepeat(val, "goodid");
      // this.enterMeal = val;
    },
    ConfirmButton() {
      this.$refs.AssociatedPackage.ChoosePackages();
      var templist = this.editObj; //已经选择的值
      this.editObj = this.enterMeal; //组件传过来的值
      console.log(this.editObj);
      console.log(this.enterMeal);

      this.editObj.map((item, index) => {
        templist.map((temp, index1) => {
          if (item.goodid == temp.goodid) {
            this.editObj[index] = templist[index1];
          }
        });
      });
      this.isNewOrEdit = 0;
      this.dialogVisible = false;
    },
    filterRepeat(arr, prop) {
      return arr.filter(function(element, index, self) {
        return self.findIndex(el => el[prop] == element[prop]) === index;
      });
    },
    findByIdEnterManage() {
      this.$api
        .post("/busines/findByIdEnterManage", {
          mobile: this.enterpriseData.mobile,
          id: this.$route.query.id
        })
        .then(res => {
          console.log(res);
          if (res.data.IsHidden == "1") {
            this.IsHidden = false;
          } else {
            this.IsHidden = true;
          }
          if (res.data.IsToConfPk == "1") {
            this.IsToConfPk = true;
          } else {
            this.IsToConfPk = false;
          }

          this.enterMeal = res.data.enterMeal; //渲染套餐数据的数据
          this.editObj = res.data.enterMeal; //编辑临时保存的数据
          this.isAudit = res.data.Checked;
          console.log("this.enterMeal", this.enterMeal);
          setTimeout(() => {
            this.enterMeal.map(item => {
              return this.$set(item, "isdisabled", true);
            });
          }, 1);
          console.log("this.enterMeal", this.enterMeal);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 删除套餐
    delPackage(index) {
      this.$confirm("此操作将删除该套餐, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(index);
          this.enterMeal.splice(index, 1);
          this.editObj = JSON.parse(JSON.stringify(this.enterMeal));
          console.log("删除套餐***************************************");
          console.log("this.enterMeal :", this.enterMeal);
          console.log("this.editObj :", this.editObj);
          console.log("删除后****************************************");
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 016-更新上下移动
    upMealOfSet(vector, index) {
      console.log(this.enterMeal);
      if (vector == "up") {
        var temp = this.enterMeal[index];
        this.enterMeal.splice(index, 1);
        console.log(this.enterMeal);
        this.enterMeal.splice(index - 1, 0, temp);
      } else {
        var temp = this.enterMeal[index];
        this.enterMeal.splice(index, 1);
        console.log(this.enterMeal);
        this.enterMeal.splice(index + 1, 0, temp);
      }

      // this.$api.post('/qrhealth/sales/upMealOfSet',body).then(res=>{

      // })
    },
    // 表单校验
    submitForm(formName) {
      console.log(formName);
      // if (this.enterMeal.length == 0) {
      //   this.$message.error("请选择套餐！");
      //   return;
      // }
      // 循环验证
      // var temp = this.enterMeal.length;
      // var tempArr = [];
      // for (let i = 0; i < formName.length; i++) {
      //   // console.log(this.$refs[formName[i].goodid][0]);
      //   this.$refs[formName[i].goodid][0].validate(valid => {
      //     if (valid) {
      //       tempArr.push(i);
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
      // }
      // if (temp == tempArr.length) {
      //   // 请求服务器
      //   this.updateEnterManage();
      // }
      var i = 0;
      // formName.forEach(element => {

      // });
      for (let i = 0; i < formName.length; i++) {
        var item = formName[i];
        if (
          !item.endTime ||
          item.endTime == "" ||
          // !item.internalprice ||
          item.internalprice === ""
        ) {
          console.log(item);

          this.$message.error("请检查信息是否填写完整");
          return;
        }
      }
      this.updateEnterManage();
    },
    updateEnterManage() {
      var temp = JSON.parse(JSON.stringify(this.enterMeal));
      temp.map((item, i) => {
        if (item.payMethod == "自费") {
          item.stock = 999999;
        } else {
          item.stock = Number(item.stock);
        }
        temp[i].internalprice = Number(item.internalprice);
        temp[i].goodsaleprice = Number(item.goodsaleprice);
        temp[i].termValidity = Number(item.termValidity);
        temp[i].soldOut = Number(item.soldOut);
        temp[i].sort = i + 1;
      });
      var body = {
        company: this.enterpriseData.accountName,
        id: this.enterpriseData.id,
        mobile: this.enterpriseData.mobile,
        enterMeal: temp
      };
      console.log("*****************************", body);
      this.$api
        .post("/busines/updateEnterManage", body)
        .then(res => {
          console.log(res);
          this.$message.success("配置成功！");
          this.$router.push("/enterprisemanagement/enterpriselist");
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    //重置表单数据和校验
    resetEnterpriseFrom() {
      console.log("enterpriseFrom重置表单数据和校验");
      this.$refs["enterpriseFrom"].resetFields();
    },
    TypeConversion(index) {
      this.enterMeal[index].goodsaleprice = Number(
        (this.enterMeal[index].internalprice /
          this.enterMeal[index].goodprice) *
          10
      ).toFixed(2);
      return this.enterMeal[index].goodsaleprice;
    },
    CalculateDiscount(index) {
      this.goodsalepriceindex = index;
      console.log("index", index);
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
.enterpriseconfiguration_wrap {
  // width: 400px;
  padding: 0 40px 40px 40px;
}
.enterpriseconfiguration_header {
  width: 150px;
  //   padding-bottom: 10px;
}
.enterpriseconfiguration_block {
  // display: flex;
  // flex-flow: wrap;
  // width: 1000px;
  .enterpriseconfiguration_form {
    margin-top: 40px;
    // margin-left: 20px;
    // padding: 40px 20px 20px 20px;
    width: 450px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 4px;

    .en_block_del {
      position: relative;
      .en_block_del_button {
        position: absolute;
        right: 15px;
        top: 15px;
      }
    }
    .en_block_form {
      padding: 40px 20px 20px 30px;
      width: 350px;
      .en_block_payMethod {
        position: relative;
        .en_block_img {
          cursor: pointer;
          position: absolute;
          right: -35px;
          top: 5px;
          img {
            width: 25px;
            height: 25px;
          }
        }
      }
    }
  }
}

.enterpriseconfiguration_footer {
  margin: 0 20px 20px 40px;
}
</style>
