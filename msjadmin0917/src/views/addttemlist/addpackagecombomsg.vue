<template>
  <div style="margin:20px">
    <div style="font-size: 20px;margin-bottom:20px">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp加项包组详情</span>
    </div>
    <el-form :model="addpackagecombomsg" label-position='right' label-width="120px" size="medium">
      <el-form-item label="加项包组名称：">
        <el-input v-model="addpackagecombomsg.name" placeholder="请填写" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="适用性别：">
        <el-select v-model="addpackagecombomsg.gender" placeholder="请选择适用性别" @change="genderchange" style="width:350px">
          <el-option label="通用" value="通用"></el-option>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状况：">
        <el-select v-model="addpackagecombomsg.marital" placeholder="请选择婚姻状况" @change="maritalchange" style="width:350px">
          <el-option label="通用" value="通用"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
          <el-option label="未婚" value="未婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" maxlength="30" v-model="addpackagecombomsg.describe" placeholder="请填写" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="限制条件：">
        可免费选择的数量&nbsp;&nbsp;*
        <el-input type="" v-model="addpackagecombomsg.numForFree" placeholder="请填写" style="width:100px"></el-input> 个
        <div style="height:10px"></div>
        可选数量上限 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*
        <el-input v-model="addpackagecombomsg.number" placeholder="请填写" style="width:100px"></el-input> 个
      </el-form-item>
      <el-form-item label="支持加项包：">
        <el-button type="primary" @click="addpackagePopBtn()">增加加项包</el-button>
        <!-- <el-switch style="margin-left:20px" v-model="addpackagecombomsg.isDisplayPrice" ></el-switch> 加项包价格是否展示 -->
        <div style="height:10px"></div>
        <el-table :data="addpackagecombomsg.jiaXiangGroup" style="width: 100%" size="mini" border max-height="500px">
          <el-table-column prop="jiaXiangName" label="加项包名称">
            <template slot-scope="scope">{{scope.row.jiaXiangName||scope.row.goodname}}</template>
          </el-table-column>
          <el-table-column prop="jiaXiangId" label="加项包ID">
            <template slot-scope="scope">{{scope.row.jiaXiangId||scope.row.goodid}}</template>
          </el-table-column>
          <el-table-column prop="gender" label="适用性别">
          </el-table-column>
          <el-table-column prop="marital" label="婚姻状况">
          </el-table-column>
          <el-table-column prop="price" label="售卖价">
            <template slot-scope="scope">{{scope.row.price||scope.row.goodsaleprice}}</template>
          </el-table-column>
          <el-table-column label="是否必选">
            <template slot-scope="scope">
              <el-select v-model="scope.row.isChoice" size="mini">
                <el-option label="必选" :value="true"></el-option>
                <el-option label="非必选" :value="false"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="delaAddPackage(scope.$index)">删除</el-button>
              <el-button type="text" size="mini" @click="ToppingBtn(scope.row,scope.$index)">置顶</el-button>
              <!-- <el-button type="text" size="mini">查看详情</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div>
          备注：“必选”是指用户直接0元购买，不需要扣除福利金及现金支付，请谨慎使用
        </div>
      </el-form-item>
    </el-form>
    <div style="float:right;padding-bottom:10px">
      <el-button @click="$router.go(-1)">取 消</el-button>
      <el-button type="primary" @click="confirmBtn">确 定</el-button>
    </div>
    <!-- 增加加项包弹窗 -->
    <div>
      <el-dialog title="选择加项包" :visible.sync="addpackagePopObj.isshow" width="800px">
        <div class="projectmytransfer">
          <el-transfer :props="{ key: 'goodid'}" :button-texts="['到上边', '到下边']" v-model="addpackagePopObj.selectList" :data="addpackagePopObj.allList" filterable v-loading="addpackagePopObj.loading" :titles="['未选加项', '已选加项']"></el-transfer>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addpackagePopObj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddpackageBtn()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { deepcopy } from "@/utils/util.js";
export default {
  data() {
    return {
      isNew: Boolean,
      addpackagecombomsg: {
        name: "",
        describe: "",
        numForFree: "",
        number: "",
        gender: "",
        marital: "",
        isDisplayPrice: true,
        jiaXiangGroup: []
      },
      addpackagePopObj: {
        isshow: false,
        selectList: [],
        allList: [],
        loading: false
      }
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.isNew = false;
      this.QueryJiaXiangGroupById();
    } else {
      this.isNew = true;
    }
  },
  methods: {
    genderchange() {
      this.addpackagecombomsg.jiaXiangGroup = [];
    },
    maritalchange() {
      this.addpackagecombomsg.jiaXiangGroup = [];
    },
    //置顶btn
    ToppingBtn(row, index) {
      this.addpackagecombomsg.jiaXiangGroup.splice(index, 1);
      this.addpackagecombomsg.jiaXiangGroup.unshift(row);
    },
    //删除加项包
    delaAddPackage(index) {
      console.log(index);
      this.addpackagecombomsg.jiaXiangGroup.splice(index, 1);
    },
    //确认增加加项包btn
    confirmAddpackageBtn() {
      console.log(this.addpackagePopObj.selectList);
      this.addpackagePopObj.isshow = false;
      this.addpackagecombomsg.jiaXiangGroup = [];
      this.addpackagePopObj.allList.forEach(element => {
        if (this.addpackagePopObj.selectList.indexOf(element.goodid) >= 0) {
          this.addpackagecombomsg.jiaXiangGroup.push(element);
        }
      });
    },
    //增加加项包btn
    addpackagePopBtn() {
      console.log(this.addpackagecombomsg);
      console.log(this.$store.getters);
      if (!this.addpackagecombomsg.gender) {
        this.$message.error("请选选择适用性别！");
        return;
      }
      if (!this.addpackagecombomsg.marital) {
        this.$message.error("请选选择婚姻状态！");
        return;
      }
      this.addpackagePopObj.allList = [];
      this.addpackagePopObj.isshow = true;
      this.addpackagePopObj.loading = true;
      this.addpackagePopObj.selectList = [];
      this.addpackagecombomsg.jiaXiangGroup.forEach(element => {
        this.addpackagePopObj.selectList.push(
          element.jiaXiangId || element.goodid
        );
      });
      var body = {
        instname: this.addpackagecombomsg.instName,
        gender: this.addpackagecombomsg.gender,
        marital: this.addpackagecombomsg.marital,
        goodputaway: "上架",
        page: 1,
        pagesize: 99999
      };
      if (this.$store.getters.getRoleInfo.AccountType == 0) {
        body.instname = "优健康自营";
      } else if (!this.addpackagecombomsg.instName) {
        body.instname = this.$store.getters.getRoleInfo.FromCompany;
      }
      this.$api
        .post("manage/ManageQueryAllAddPackForJX", body)
        .then(res => {
          this.addpackagePopObj.loading = false;
          console.log(res);
          if (res.code == 200) {
            res.data.data.map(item => {
              return (item.label = `${item.goodid} - ${item.gender} - ${item.marital} -  ${item.goodname} `);
            });
            this.addpackagePopObj.allList = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
      // addpackagePopObj.allList
      // console.log(res);
    },
    //数据校验
    checkData() {
      if (!this.addpackagecombomsg.name) {
        this.$message.error("请输入加项包名称！");
        return false;
      }
      if (this.addpackagecombomsg.numForFree === "") {
        this.$message.error("请输入可免费选择的数量！");
        return false;
      }
      if (this.addpackagecombomsg.number === "") {
        this.$message.error("请输入可选数量上限！");
        return false;
      }
      if (
        !this.addpackagecombomsg.jiaXiangGroup ||
        this.addpackagecombomsg.jiaXiangGroup.length <= 0
      ) {
        this.$message.error("请选择支持的加项包！");
        return false;
      }
      if (
        Number(this.addpackagecombomsg.number) >
        this.addpackagecombomsg.jiaXiangGroup.length
      ) {
        this.$message.error("可选数量上限最多为支持加项包总数");
        return false;
      }
      if (
        Number(this.addpackagecombomsg.numForFree) >
        Number(this.addpackagecombomsg.number)
      ) {
        this.$message.error("可选数量上限必须大于等于免费选择的数量");
        return false;
      }
      var genderlist = [];
      var maritallist = [];
      this.addpackagecombomsg.jiaXiangGroup.forEach(element => {
        if (genderlist.indexOf(element.gender) == -1) {
          genderlist.push(element.gender);
        }
        if (maritallist.indexOf(element.marital) == -1) {
          maritallist.push(element.marital);
        }
      });
      if (genderlist.indexOf("男") >= 0 && genderlist.indexOf("女") >= 0) {
        this.$message.error("不可选用性别互斥的加项包");
        return false;
      }
      if (
        maritallist.indexOf("未婚") >= 0 &&
        maritallist.indexOf("已婚") >= 0
      ) {
        this.$message.error("不可选用婚姻互斥的加项包");
        return false;
      }

      return true;
    },
    //确认按钮
    confirmBtn() {
      if (this.checkData()) {
        if (this.isNew) {
          //新增
          this.InsertJiaXiangGroup();
        } else {
          //编辑
          this.UpdateJiaXiangGroup();
        }
      }
    },
    //07-加项包组列表-新增加项包组
    InsertJiaXiangGroup() {
      var body = {
        name: this.addpackagecombomsg.name,
        describe: this.addpackagecombomsg.describe,
        numForFree: this.addpackagecombomsg.numForFree,
        gender: this.addpackagecombomsg.gender,
        marital: this.addpackagecombomsg.marital,
        number: this.addpackagecombomsg.number || 0,
        isDisplayPrice: this.addpackagecombomsg.isDisplayPrice,
        jiaXiangGroup: []
      };
      this.addpackagecombomsg.jiaXiangGroup.forEach(element => {
        body.jiaXiangGroup.push({
          jiaXiangId: element.goodid,
          isChoice: element.isChoice
        });
      });
      body.numForFree = parseInt(body.numForFree);
      body.number = Number(body.number) || 0;
      this.$api
        .post("manage/InsertJiaXiangGroup", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$router.go(-1);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //09-加项包组列表-编辑加项包组
    UpdateJiaXiangGroup() {
      var body = deepcopy(this.addpackagecombomsg);
      body.jiaXiangGroup = this.addpackagecombomsg.jiaXiangGroup.map(item => {
        return {
          jiaXiangId: item.goodid || item.jiaXiangId,
          isChoice: item.isChoice
        };
      });
      body.numForFree = parseInt(body.numForFree);
      body.number = parseInt(body.number);
      this.$api
        .post("manage/UpdateJiaXiangGroup", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$router.go(-1);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //06-加项包组列表-查询详情
    QueryJiaXiangGroupById() {
      this.$api
        .get("manage/QueryJiaXiangGroupById", {
          id: this.$route.query.id
        })
        .then(res => {
          console.log(res);
          this.addpackagecombomsg = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {}
};
</script>