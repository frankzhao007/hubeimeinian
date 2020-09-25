<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">城市：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="seek.CityName" clearable size="medium" style="width:80%;">
              </el-input>
            </div>
          </el-col>
          <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="querycity()">搜索</el-button>
          <el-button :disabled="!Clickable.add" class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="newCitybtn()">新增城市</el-button>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="CityList" style="width: 100%">
        <el-table-column prop="CityName" label="城市">
        </el-table-column>
        <el-table-column label="区域">
          <template slot-scope="scope">
            {{AreaCodetransition(scope.row.AreaCode)}}
          </template>
        </el-table-column>
        <el-table-column prop="FirstChar" label="首字母">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.edit" @click="editCity(scope.row)" size="small">编辑</el-button>
            <el-button :disabled="!Clickable.delete" @click="delCity(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <!-- 新建城市弹窗 -->
    <div v-if="newCityisshow">
      <el-dialog title="新建城市" :visible.sync="newCityisshow" width="500px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
          <el-form-item label="城市名称：" prop="CityName">
            <el-input v-model="ruleForm.CityName" placeholder="请输入城市" style="width:250px;" maxlength="15" clearable @change="citynamechange"></el-input>
          </el-form-item>
          <el-form-item label="所在地区：" prop="AreaCode">
            <el-select v-model="ruleForm.AreaCode" placeholder="请选择所在地区" filterable style="width:250px;">
              <el-option v-for="item in arealist" :key="item.id" :label="item.area" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市首字母：" prop="FirstChar">
            <el-select v-model="ruleForm.FirstChar" placeholder="自动填充" filterable style="width:250px;" disabled>
              <el-option v-for="item in firstcharlist" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在省份：" prop="Province">
            <el-input v-model="ruleForm.Province" placeholder="请输入城市所在省份" style="width:250px;" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newCityisshow = false">取 消</el-button>
          <el-button v-if="!isedit" type="primary" @click="confirmnewCity()">确 定</el-button>
          <el-button v-else type="primary" @click="confirmchengecity()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Mtils from "mtils";
export default {
  name: "citylist",
  components: {},
  watch: {},
  data() {
    return {
      isedit: false,
      seek: {
        CityName: ""
      },
      ruleForm: {
        CityName: "",
        AreaCode: "",
        FirstChar: "",
        Province: ""
      },
      rules: {
        CityName: [{ required: true, message: "请选择城市", trigger: "blur" }],
        AreaCode: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        FirstChar: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        Province: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ]
      },
      arealist: [
        {
          area: "华北",
          id: "1"
        },
        {
          area: "东北",
          id: "2"
        },
        {
          area: "华东 ",
          id: "3"
        },
        {
          area: "华中 ",
          id: "4"
        },
        {
          area: "华南",
          id: "5"
        },
        {
          area: "西南",
          id: "6"
        },
        {
          area: "西北",
          id: "7"
        },
        {
          area: "港澳台",
          id: "8"
        }
      ],
      firstcharlist: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      newCityisshow: false,
      CityList: [],
      currentPage: 1,
      pagesize: 10,
      count: 0
    };
  },
  mounted() {
    this.citypullAll();
  },
  methods: {
    //区域编码转换成区域
    AreaCodetransition(index) {
      switch (index) {
        case "1":
          return "华北";
          break;
        case "2":
          return "东北";
          break;
        case "3":
          return "华东";
          break;
        case "4":
          return "华中";
          break;
        case "5":
          return "华南";
          break;
        case "6":
          return "西南";
          break;
        case "7":
          return "西北";
          break;
        case "8":
          return "港澳台";
          break;

        default:
          break;
      }
    },
    //搜索bun
    querycity() {
      this.currentPage = 1;
      this.citypullAll();
    },
    //查询城市
    citypullAll() {
      var body = {
        cityName: this.seek.CityName,
        page: this.currentPage,
        pageSize: this.pagesize
      };
      this.$api.get("city/pullAll", body).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.CityList = res.data.data;
          this.count = res.data.count;
        }
      });
    },
    //确认新增城市
    confirmnewCity() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          var body = {
            CityName: this.ruleForm.CityName,
            AreaCode: this.ruleForm.AreaCode,
            FirstChar: this.ruleForm.FirstChar,
            Province: this.ruleForm.Province
          };
          this.$api.post("/city/pushOne", body).then(res => {
            console.log(res);
            if (res.code == "200") {
              this.newCityisshow = false;
              this.citypullAll();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新建城市按钮
    newCitybtn() {
      this.ruleForm = {
        CityName: "",
        AreaCode: "",
        FirstChar: "",
        Province: ""
      };
      this.newCityisshow = true;
      this.isedit = false;
    },
    //编辑城市按钮
    editCity(obj) {
      this.ruleForm = {
        CityName: obj.CityName,
        AreaCode: obj.AreaCode,
        FirstChar: obj.FirstChar,
        Province: obj.Province
      };
      this.newCityisshow = true;
      this.isedit = true;
      this.editobj = obj;
    },
    //确认修改城市
    confirmchengecity() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.editobj.CityName = this.ruleForm.CityName;
          this.editobj.AreaCode = this.ruleForm.AreaCode;
          this.editobj.FirstChar = this.ruleForm.FirstChar;
          this.editobj.Province = this.ruleForm.Province;
          var body = this.editobj;
          this.$api.post("/city/update", body).then(res => {
            console.log(res);
            if (res.code == "200") {
              this.newCityisshow = false;
              this.citypullAll();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除城市
    delCity(obj) {
      console.log(obj);
      this.$confirm("确认要删除该城市吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .del("/city/delete", { cityCode: obj.CityCode })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "已删除!"
                });
                this.citypullAll();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消此操作。"
          });
        });
    },
    //城市选择change
    citynamechange() {
      console.log(this.ruleForm.CityName);
      console.log(Mtils.utils.makePy(this.ruleForm.CityName, true));
      var makePy = Mtils.utils
        .makePy(this.ruleForm.CityName, true)
        .toString()
        .substr(0, 1);
      console.log(makePy);
      this.ruleForm.FirstChar = makePy;

      // this.query(this.ruleForm.CityName.toPing);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pagesize = val;
      this.citypullAll();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.citypullAll();
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("城市列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
</style>


