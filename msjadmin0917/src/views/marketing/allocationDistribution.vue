<template>
  <div style="margin:20px">
    <div style=" font-size: 20px;">
      <el-form
        :inline="true"
        :model="seekshopcombo"
        label-position="right"
        label-width="120px"
        size="medium"
      >
        <el-form-item label="商品类型:">
          <el-select v-model="seekshopcombo.GoodType" placeholder style="width:200px">
            <el-option label="全部" value></el-option>
         
            <el-option label="电子体检卡" value="电子体检卡"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称：">
          <el-input v-model="seekshopcombo.GoodName" placeholder="请填写" style="width:200px" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="商品ID：">
          <el-input v-model="seekshopcombo.GoodID" placeholder="请填写" style="width:200px" maxlength="30"></el-input>
        </el-form-item>

        <el-form-item style="float:right">
          <el-button type="primary" @click="search"  icon="el-icon-search">搜 索</el-button>
          <el-button type="primary" @click="addWeight" icon="el-icon-plus">新 增</el-button>
        </el-form-item>
      </el-form>

      <!-- 列表 -->
      <el-table
        :data="tableshopcombo.shopcomboList"
        style="width: 100%"
        v-loading="tableshopcombo.loading"
      >
        <el-table-column label="权重" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="amendweight(scope.row)">{{scope.row.Weight}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="goodid" label="商品ID" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodname" label="商品名称" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodtype" label="商品类型" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodprice" label="套餐原价" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column label="分销售价" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="participation(scope.row)">{{scope.row.DsbPrice}}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="分红金额" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="participation(scope.row)">{{scope.row.DsbMoney}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分红比例" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="participation(scope.row)">{{scope.row.MoneyScale}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="goodputaway" label="上架状态" min-width="100px" show-overflow-tooltip></el-table-column>
         <!-- 上架状态与可用状态不关联 -->
        <el-table-column label="可用状态" width="100px" fixed="right">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Usable"
              :active-value="1"
              :inactive-value="2"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              @change="upState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteCombo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 修改权重弹窗 -->
    <el-dialog title="修改权重" :visible.sync="windowsManage.isweight" width="500px">
      <div style="overflow:hidden;line-height:40px;">
        <div style="float:left;">请输入需要修改的值</div>
        <el-input
          type="input"
          placeholder="请输入内容"
          v-model="amendmoney.amendValue"
          @input="ModifyTheWeight"
          maxlength="4"
          style="float:left;width:320px;margin-left:10px"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="windowsManage.isweight = false">取 消</el-button> -->
        <el-button type="primary" @click="affirmweight">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改权重弹窗 -->
    <el-dialog title="修改分销售价" :visible.sync="windowsManage.isdistribution" width="540px">
      <div style="line-height:40px;overflow:hidden;margin-left:20px">
        <div style="float:left;">套餐原价：</div>
        <div style="float:left">{{amendmoney.goodprice}}元</div>
      </div>
      <div style="line-height:40px;overflow:hidden;margin-top:10px;margin-left:40px;">
        <div style="float:left;">分销售价：</div>
        <el-input
          type="input"
          placeholder="请输入内容"
          v-model="amendmoney.moneyValue"
          style="float:left;width:200px;"
          @input="sellingPrice"
          maxlength="8"
        ></el-input>
        <span style="margin-left:20px">元</span>
      </div>
      <div style="line-height:40px;overflow:hidden;margin-top:10px;margin-left:40px">
        <div style="float:left;">分红金额：</div>
        <el-input
          type="input"
          placeholder="请输入内容"
          v-model="amendmoney.moneys"
          style="float:left;width:200px;"
          @input="participationinput"
          maxlength="8"
        ></el-input>
        <span style="margin-left:20px">元</span>
      </div>
      <div style="line-height:40px;overflow:hidden;margin-top:10px;margin-left:40px">
        <div style="float:left;">分红比例：</div>
        <el-input
          type="input"
          placeholder="请输入内容"
          v-model="amendmoney.proportion"
          style="float:left;width:200px;"
          @input="proportioninput"
        ></el-input>
        <span style="margin-left:20px">%</span>
      </div>

      <div  style="color: #f56c6c;font-size: 12px; text-align: center;;width:100%;margin-top:20px" v-if="amendmoney.hiti">{{amendmoney.hiti}}</div>
       
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowsManage.isdistribution = false">取 消</el-button>
        <el-button type="primary" @click="amendDistributionCosts">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增套餐弹窗 -->
    <el-dialog title="新增套餐" :visible.sync="windowsManage.isaddweight" width="1200px">
      <div class="mybigtransfer" style="margin-left:80px">
        <el-transfer
          filterable
          :filter-method="filterMethod"
          :titles="['选择加入的套餐', '已选套餐']"
          filter-placeholder="请输入"
          v-loading="combomessage.loading"
          v-model="combomessage.selectcombo"
          :data="arrags"
        ></el-transfer>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="windowsManage.isaddweight = false">取 消</el-button>
        <el-button type="primary" @click="addCombo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <div style="height:30px;margin-top:20px;">
      <el-pagination
        style="float:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableselectenterMeal.pageindex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableselectenterMeal.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableselectenterMeal.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrags: [], //所有套餐
      combomessage: {
        //新增套餐的信息
        selectcombo: [], //选择的套餐
        loading: false //
      },
      seekshopcombo: {
        //搜索的信息
        GoodType: "", //商品类型
        GoodName: "", //商品名称
        GoodID: "" //商品id
      },
      tableshopcombo: {
        //列表
        loading: false,
        shopcomboList: []
      },

      windowsManage: {
        //弹窗管理
        isweight: false,
        isdistribution: false,
        isaddweight: false
      },
      tableselectenterMeal: {
        //分页
        pageindex: 1,
        pagesize: 10,
        total: 0
      },
      amendmoney: {
        //修改分销售价
        goodprice: "", //分销售价
        selectgoodid: "", //选择的套餐id
        moneyValue: "",//分销售价
        moneys: "",//分销金额
        proportion: "",//分红比例
        amendValue: "" ,//修改权重的值
        hiti:"",//提示
      }
    };
  },
  watch: {},
  created() {
    this.setpagemsg();
  },

  beforeDestroy() {
    this.copypagemsg();
  },
  mounted() {
    // console.log(this.$store.getters)
    // console.log(this.$store.getters.getpackagelistmsg.GoodspageSize)
    this.getmessage();
  },
  methods: {

   copypagemsg() { 
      var body = {
        GoodType: this.seekshopcombo.GoodType, //商品类型
        GoodName: this.seekshopcombo.GoodName,  //商品名称
        GoodID: this.seekshopcombo.GoodID, //商品id
        pagesize: this.tableselectenterMeal.pagesize,
        pageindex: this.tableselectenterMeal.pageindex,  
      };
    console.log(body)
      this.$store.commit("setDistributionlist", body);
    },

  setpagemsg() {
      var body = this.$store.getters.getDistributionlist;
      console.log(body)
      this.seekshopcombo.GoodType= body.GoodType || "";
      this.seekshopcombo.GoodName= body.GoodName || "";
      this.seekshopcombo.GoodID= body.GoodID || "";
      this.tableselectenterMeal.pageindex = body.pageindex || 1;
      this.tableselectenterMeal.pagesize= body.pagesize || 10;
  },


    search() {
      //搜索
      this.tableselectenterMeal.pageindex=1
      console.log(this.seekshopcombo.GoodType);
      this.getmessage();
    },
    upState(e) {
      //修改可用状态
      console.log(e);
      var body = {
        goodId: e.goodid,
        Usable: Number(e.Usable)
      };
      this.$api
        .post("/account/UpdateDSBUsable", body)
        .then(res => {
          if (res.code == 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
              this.getmessage();
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    getmessage() {
      //获取列表
  
      // this.tableshopcombo.shopcomboList=[]
      // this.tableshopcombo.loading=true
      var body = {
        GoodType: this.seekshopcombo.GoodType,
        GoodName: this.seekshopcombo.GoodName,
        GoodID: this.seekshopcombo.GoodID,
        page: this.tableselectenterMeal.pageindex,
        pageSize: this.tableselectenterMeal.pagesize
      };
      this.$api.get("/account/FindDistributeGoods", body).then(res => {
        this.tableselectenterMeal.total = res.data.count;
        console.log(res);
        this.tableshopcombo.shopcomboList = res.data.data;

        
        // this.tableshopcombo.loading=false
      });
    },
    getallCombo() {
      //获取所有套餐
      this.combomessage.loading = true;
      var body = {};
      this.$api.get("/account/FindSaleGoods", body).then(res => {
        console.log(res);
        this.combomessage.loading = false;
        if (res.code == 200 && res.data) {
          var obj1 = res.data;
          // this.arrags = obj1.map((item, index) => {
          //   return { label: item.goodname, key: item.goodid };
          // });
          this. combomessage.selectcombo=[]
          this.arrags=[]
          obj1.map((item, index) => {
            if(item.Usable==0){
               var arr= { label: item.goodname, key: item.goodid }
               this.arrags.push(arr)
            }         
          });
        } else {
          this.arrags = [];
        }
        console.log(this.arrags);
      });
    },
    addCombo() {
      //添加套餐
      console.log(this.combomessage.selectcombo);
      var body = {
        goodIds: this.combomessage.selectcombo
      };

      this.$api.post("/account/AddSaleGoods", body).then(res => {
        this.windowsManage.isaddweight = false;
        console.log(res);
        this.getmessage();
      });
    },
    filterMethod(query, item) {
      //商品搜索规则
      return item.label.indexOf(query) > -1;
    },

    sellingPrice(e) {
      //输入分销售价

      this.amendmoney.moneyValue = this.inputva(this.amendmoney.moneyValue);
      if (this.amendmoney.moneyValue && this.amendmoney.moneys) {
        this.amendmoney.proportion = (
          (this.amendmoney.moneys / this.amendmoney.moneyValue) *
          100
        ).toFixed(2);
      } else if (this.amendmoney.moneyValue && this.amendmoney.proportion) {
        this.amendmoney.moneys = (
          (this.amendmoney.proportion * this.amendmoney.moneyValue) /
          100
        ).toFixed(0);
      }
    },
    participationinput(e) {
      //输入分红金额
      this.amendmoney.moneys = this.inputva(this.amendmoney.moneys);
      if (this.amendmoney.moneyValue && this.amendmoney.moneys) {
        this.amendmoney.proportion = (
          (this.amendmoney.moneys / this.amendmoney.moneyValue) *
          100
        ).toFixed(2);
      } else {
        this.amendmoney.proportion = "";
      }
    },

    proportioninput(e) {
      //输入分红比例
      this.amendmoney.proportion = this.amendmoney.proportion.replace(/^\./g,"");//第一位不能为小数点
      this.amendmoney.proportion = this.amendmoney.proportion.replace( /[^\d.]/g,""); //只能输入数字和小数
      this.amendmoney.proportion = this.amendmoney.proportion.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
      this.amendmoney.proportion = this.amendmoney.proportion.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      this.amendmoney.proportion = this.amendmoney.proportion.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3"); //只能输入两个小数
      if (this.amendmoney.proportion >= 100000000) {
        //只能输入小于100000000的整数
        this.amendmoney.proportion = this.amendmoney.proportion.substring(0, 8);
      }
    
    
      if (this.amendmoney.moneyValue && this.amendmoney.proportion) {
        this.amendmoney.moneys = (
          (this.amendmoney.proportion * this.amendmoney.moneyValue) /
          100
        ).toFixed(0);
      } else {
        this.amendmoney.moneys = "";
      }
    },
    amendweight(e) {
      //修改权重
      console.log(e);
      //      amendmoney: {
      //   //修改分销售价
      //   goodprice: "", //分销售价
      //   selectgoodid: "", //选择的套餐id
      //   moneyValue: "",//分销售价
      //   moneys: "",//分销金额
      //   proportion: "",//分红比例
      //   amendValue: "" ,//修改权重的值
      //   hiti:"",//提示
      // }
        //       DsbPrice: parseFloat(this.amendmoney.moneyValue),
        // DsbMoney:parseFloat(this.amendmoney.moneys),
        // MoneyScale:this.amendmoney.proportion+"%",
      this.windowsManage.isweight = true;
      this.amendmoney.selectgoodid = e.goodid;
      this.amendmoney.amendValue = e.Weight;
    },
    ModifyTheWeight(e) {
      //输入权重
      this.amendmoney.amendValue = this.inputva(this.amendmoney.amendValue);
    },

    affirmweight() {
      //确认权重
      if(this.amendmoney.amendValue){
           var body = {
        goodId: this.amendmoney.selectgoodid,
        Weight: Number(this.amendmoney.amendValue)
      };
      this.$api
        .post("/account/UpdateDSBWeight", body)
        .then(res => {
          if (res.code == 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.getmessage();
            this.windowsManage.isweight = false;
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
      }else{
         this.$message.error('请输入权重值');
      }
   
    },

    inputva(int) {
      //只能输入正整数
      if (int > 0) {
        return int.replace(/[^0-9]/g, "");
      } else {
        return int.replace(/[^1-9]/g, "");
      }
    },
    addWeight(e) {
      //新增套餐
      this.windowsManage.isaddweight = true;
      this.getallCombo();
    },

    participation(e) {
      //分销售价
      console.log(e)
      this.amendmoney.hiti=""
      this.windowsManage.isdistribution = true;
      this.amendmoney.goodprice = e.goodprice;
      this.amendmoney.selectgoodid = e.goodid;

      this.amendmoney.moneyValue=e.DsbPrice;
      this.amendmoney.moneys=e.DsbMoney;
      this.amendmoney.proportion=e.MoneyScale.replace(/%/g,'');
      console.log(this.amendmoney.proportion)
    },
    amendDistributionCosts() { //确认分销售价
      //  moneyValue: "",//分销售价
      //   moneys: "",//分销金额
      //   proportion: "",//分红比例

      if(!this.amendmoney.moneyValue){
        this.amendmoney.hiti="分销售价不能为空"
      }else if(!this.amendmoney.moneys){
        this.amendmoney.hiti="分销金额不能为空"
      }else if(!this.amendmoney.proportion){
        this.amendmoney.hiti="分红比例不能为空"
      }else if(this.amendmoney.proportion<0.01){
        this.amendmoney.hiti="分红比例不能小于0.01"
      }else if(this.amendmoney.moneyValue>this.amendmoney.goodprice){
        this.amendmoney.hiti="分销售价不能高于商品原价"
      }else if(this.amendmoney.moneys>this.amendmoney.moneyValue){
        this.amendmoney.hiti="分红金额不能高于分销售价"
      }else{
      var ratio=parseFloat(this.amendmoney.proportion).toFixed(2)
  
      var body = {
        goodId: this.amendmoney.selectgoodid,
        DsbPrice: parseFloat(this.amendmoney.moneyValue),
        DsbMoney:parseFloat(this.amendmoney.moneys),
        MoneyScale:ratio+"%",
      };
      this.$api
        .post("/account/UpdateSaleGoodsMoney", body)
        .then(res => {
          if (res.code == 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.getmessage();
            this.windowsManage.isdistribution=false
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
        
      }
     
    },

    deleteCombo(e){//删除套餐\


      this.$confirm('是否删除该套餐?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      var body = {
        goodId: e.goodid,
        Usable:0
      };
      this.$api
        .post("/account/UpdateDSBUsable", body)
        .then(res => {
          if (res.code == 200) {
            if(this.tableshopcombo.shopcomboList.length<=1&&this.tableselectenterMeal.pageindex>1){
                this.tableselectenterMeal.pageindex=this.tableselectenterMeal.pageindex-1
            }  
            this.getmessage();

            this.$message({
              message: "成功",
              type: "success"
            });
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


 
    },

    handleSizeChange(val) {
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;
      this.getmessage();

      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      this.getmessage();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style  scoped>
.ss {
}
</style>