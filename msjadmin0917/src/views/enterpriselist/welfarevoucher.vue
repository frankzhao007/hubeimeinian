<template>
  <div class="app-container">
    <!-- welfarevoucher -->
    <el-page-header @back="goBack" content="福利劵金额配置">
    </el-page-header>

    <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium" style="margin-top:20px">
      <el-form-item label="内容：">
        <el-input v-model="seekobj.content" placeholder="请填写" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="时间范围：">
        <!-- <el-input v-model="seekobj.timer" placeholder="请填写" style="width:200px"></el-input> -->
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekobj.timer" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="seekbtn()" type="primary" size="medium">搜索</el-button>
        <el-button @click="Add()" type="primary" size="medium">添加福利券金额</el-button>
        <el-button @click="Clear()" size="medium">清空福利券金额</el-button>
      </el-form-item>
    </el-form>
    <div class="welfarevoucher_table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="updateTime" label="操作日期" width="">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="">
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.amount>0" style="color:#67C23A;">+{{scope.row.amount/100}}</span>
            <span v-else-if="scope.row.amount==0">{{scope.row.amount}}</span>
            <span v-else-if="scope.row.amount<0" style="color:#F56C6C;">{{scope.row.amount/100}}</span>
          </template>
        </el-table-column>
        <el-table-column label="累计消耗金额" width="">
          <template slot-scope="scope">
            {{scope.row.useUpAmount/100}}
          </template>
        </el-table-column>
        <el-table-column label="累计增加金额" width="">
          <template slot-scope="scope">
            {{scope.row.addUpAmount/100}}
          </template>
        </el-table-column>
        <el-table-column label="剩余金额" width="">
          <template slot-scope="scope">
            {{scope.row.surplusAmount/100}}
          </template>
        </el-table-column>
        <el-table-column prop="updatePeople" label="操作账号" width="">
        </el-table-column>
      </el-table>
    </div>
    <div class="welfarevoucher_pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <div v-if="dialogFormVisible" class="welfarevoucher_amount_dialog">
      <el-dialog title="添加福利券金额" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form" :rules="formrules" ref="form" size="medium" class="demo-ruleForm">
          <el-form-item label="" prop="Amount">
            <el-input v-model="form.Amount" maxlength="15" show-word-limit></el-input>
          </el-form-item>
          <el-form-item v-if="form.Amount!=''">
            {{changeMoneyToChinese(form.Amount)}}
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "welfarevoucher",
  components: {},
  data() {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("金额不能为空"));
      }
      if (!/^[0-9]+(.[0-9]{2})?$/.test(value)) {
        return callback(new Error("请输入整数或保留两位小数的数字！"));
      }
      if (value == 0) {
        return callback(new Error("添加金额必须大于0！"));
      }
      if (value.length > 15) {
        return callback(new Error("不能超过15位字符"));
      } else {
        callback();
      }
    };
    return {
      seekobj: {
        content: "",
        timer: []
      },
      page: 1,
      pageSize: 10,
      count: 0,
      tableData: [],
      dialogFormVisible: false,
      form: {
        Amount: ""
      },
      formrules: {
        Amount: [{ required: true, validator: check, trigger: "change" }]
      }
    };
  },
  created() {
    this.getWelfareVoucher();
  },
  mounted() {
    console.log("this.$route.query.id", this.$route.query.id);
  },
  methods: {
    seekbtn(){
      this.page=1;
      this.getWelfareVoucher();
    },
    getWelfareVoucher() {
      var body = {
        type: "1110111",
        id: this.$route.query.id,
        content: this.seekobj.content,
        page: this.page,
        pageSize: this.pageSize,
        startDate: "",
        endDate: ""
      };
      if (this.seekobj.timer&&Array.isArray(this.seekobj.timer)&&this.seekobj.timer.length>1) {
        body.startDate=this.seekobj.timer[0];
        body.endDate=this.seekobj.timer[1];
      }
      
      
      this.$api
        .get("/sales/findWelfareVoucher", body)
        .then(res => {
          this.tableData = res.data.data;
          this.count = res.data.count;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    Add() {
      console.log("Add");
      this.form.Amount = "";
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addPost(this.form.Amount);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    inputValidator(val) {
      if (!/^[0-9]+(.[0-9]{2})?$/.test(val)) {
        return "请输入整数或保留两位小数的数字！";
      }
      if (val == 0) {
        return "添加金额必须大于0！";
      }
    },
    Clear() {
      this.$confirm("此操作将清空福利券金额, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.clearPost();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空"
          });
        });
      console.log("Clear");
    },
    addPost(val) {
      console.log("addPost(val)", val);
      this.$api
        .post("/sales/insertWelfareVoucher", {
          type: "11010101",
          id: this.$route.query.id,
          amountF: Number(val)
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.getWelfareVoucher();
          this.dialogFormVisible = false;
        })
        .catch(err => {
          this.$message.error(err.msg);
          console.log("err", err);
        });
    },
    clearPost() {
      console.log("clearPost(val)");
      this.$api
        .post("/sales/insertWelfareVoucher", {
          type: "10000001",
          id: this.$route.query.id
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "清空成功!"
          });
          this.getWelfareVoucher();
        })
        .catch(err => {
          this.$message.error(err.msg);
          console.log("err", err);
        });
    },
    goBack() {
      this.$router.go(-1);
      console.log("go back");
    },
    handleSizeChange(val) {
      this.page = 1;
      this.pageSize = val;
      this.getWelfareVoucher();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getWelfareVoucher();
      console.log(`当前页: ${val}`);
    },
    // 数字转大写汉字
    changeMoneyToChinese(money) {
      var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      ); //汉字的数字
      var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
      var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
      var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
      //var cnInteger = "整"; //整数金额时后面跟的字符
      var cnIntLast = "元"; //整型完以后的单位
      var maxNum = 999999999999999.9999; //最大处理的数字
      var IntegerNum; //金额整数部分
      var DecimalNum; //金额小数部分
      var ChineseStr = ""; //输出的中文金额字符串
      var parts; //分离金额后用的数组，预定义
      var zeroCount;
      var IntLen;
      var decLen;
      if (money == "") {
        return "";
      }
      money = parseFloat(money);
      if (money >= maxNum) {
        $.alert("超出最大处理数字");
        return "";
      }
      if (money == 0) {
        //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
        ChineseStr = cnNums[0] + cnIntLast;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
      }
      money = money.toString(); //转换为字符串
      if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = "";
      } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
      }
      if (parseInt(IntegerNum, 10) > 0) {
        //获取整型部分转换
        zeroCount = 0;
        IntLen = IntegerNum.length;
        for (var i = 0; i < IntLen; i++) {
          var n = IntegerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              ChineseStr += cnNums[0];
            }
            zeroCount = 0; //归零
            ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            ChineseStr += cnIntUnits[q];
          }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
      }
      if (DecimalNum != "") {
        //小数部分
        decLen = DecimalNum.length;
        for (i = 0; i < decLen; i++) {
          n = DecimalNum.substr(i, 1);
          if (n != "0") {
            ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (ChineseStr == "") {
        //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
        ChineseStr += cnNums[0] + cnIntLast;
      } /* else if( DecimalNum == '' ){ 
        ChineseStr += cnInteger; 
        ChineseStr += cnInteger; 
    } */
      return ChineseStr;
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
.welfarevoucher_buttons {
  overflow: hidden;
}
.welfarevoucher_button {
  float: right;
  margin-left: 40px;
  width: 140px;
}
.welfarevoucher_table {
  margin-top: 20px;
}
.welfarevoucher_pagination {
  margin-top: 20px;
  text-align: right;
}
.welfarevoucher_amount_dialog {
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
}
</style>