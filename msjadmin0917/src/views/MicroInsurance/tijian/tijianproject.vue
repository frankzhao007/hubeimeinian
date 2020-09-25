<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">一级类别：</div>
            <div class="grid_content">
              <el-select v-model="FirstTypeValue" placeholder="请选择" size="medium" style="width:100%;" clearable>
                <el-option v-for="item in FirstTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">二级类别：</div>
            <div class="grid_content">
              <el-select v-model="SecondTypevalue" :disabled="!FirstTypeValue||FirstTypeValue==''||FirstTypeValue=='全部'" filterable placeholder="选择一级类别后可选" size="medium" style="width:100%;" clearable>
                <el-option v-for="item in SecondTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">项目名称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="projectseek.projectname" clearable size="medium" style="width:100%;" clearable>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">性别：</div>
            <div class="grid_content">
              <el-select v-model="projectseek.sex" placeholder="请选择" size="medium" style="width:100%;" clearable>
                <el-option v-for="item in projectseeklist.sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <!-- <el-col :span="6">
            <div class="grid_lable">区域：</div>
            <div class="grid_content">
              <el-select :disabled="RoleInfo.AccountType==1" v-model="projectseek.ProjectArea" filterable placeholder="请选择" size="medium" style="width:100%;" clearable @change="areachangetocity()">
                <el-option v-for="item in branchOfficeRegionData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">区域项目代码：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="projectseek.ProjectAreaID" clearable size="medium" style="width:100%;" clearable>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">城市：</div>
            <div class="grid_content">
              <el-select :disabled="RoleInfo.AccountType==1||projectseek.ProjectArea==null||projectseek.ProjectArea==''" filterable v-model="projectseek.ProjectCity" filterable placeholder="选择区域后,可选城市" size="medium" style="width:100%;" clearable>
                <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col> -->
          <el-col :span="6">
            <div class="grid_lable">城市项目代码：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="projectseek.ProjectCityID" clearable size="medium" style="width:100%;" clearable>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">所属分公司：</div>
            <div class="grid_content">
              <el-select filterable clearable v-model="filialeValue" placeholder="请选择" size="medium" style="width:100%;" :disabled="FilialeList.length==0">
                <el-option v-for="item in FilialeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>

        </el-row>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <!--<el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" @click="exportexecl()">导出</el-button>-->
        <!--<el-button :disabled="!Clickable.import" class="grid_button" type="primary" size="medium" @click="ImportRecord()">导入记录</el-button>-->
        <!--<el-button :disabled="!Clickable.import" class="grid_button" type="primary" size="medium" @click="toleadisshow=true">导入</el-button>-->
        <el-button   class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="AddProjectBtn()">新增体检项目</el-button>
        <el-button   class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="ProjectListQuery()">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="projectList" style="width: 100%;" size="medium">
        <el-table-column label="所属分公司" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.instname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="城市项目代码" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.instcityid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="一级类别" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.checktypefirst }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二级类别" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.checktypesec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" min-width="280" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.checkname }}</div>
          </template>
        </el-table-column>
        <el-table-column label="详细描述" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.checkdescribe }}</div>
          </template>
        </el-table-column>
        <el-table-column label="核算价" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.checklowprice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门市价" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.checkprice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <el-button   size="small" @click="manageUpdateCheck(scope.row)">编辑</el-button>
            <el-button   size="small" type="danger" @click="manageDeleteCheck(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="projectcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="projectpageSize" layout="total, sizes, prev, pager, next, jumper" :total="projectCount">
      </el-pagination>
    </div>

    <!-- 批量发货上传 -->
    <el-dialog title="上传表格" :visible.sync="toleadisshow" width="800px">
      <div style="padding:30px">
        <el-button type="text" style="font-size:30px" @click="selectflie()">选择文件</el-button>
        <div>最大支持上传10MBExcel文件，必须严格按照模版内容填写信息，否则可能会出现导入异常 </div>
        <el-button type="text" style="font-size:30px;margin-top:20px" @click="downloadmoban()">下载文件模板</el-button>
        <div>单项导入需要一段时间，生成后会自动同步到单项列表请耐心等待</div>
      </div>
      <el-dialog width="90%" title="错误导入信息" :visible.sync="innerVisible" append-to-body>
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column label="区域">
            <template slot-scope="scope">
              <div v-if="scope.row.areaname=='区域为空'" style="color:#F56C6C;">
                {{scope.row.areaname}}
              </div>
              <div v-else> {{scope.row.areaname}}</div>
            </template>
          </el-table-column>
          <el-table-column label="区域代码">
            <template slot-scope="scope">
              <div v-if="scope.row.areanameid=='区域代码重复'" style="color:#F56C6C;">
                {{scope.row.areanameid}}
              </div>
              <div v-else> {{scope.row.areanameid}}</div>
            </template>
          </el-table-column>
          <el-table-column label="城市">
            <template slot-scope="scope">
              <div v-if="scope.row.instcity=='城市为空'" style="color:#F56C6C;">
                {{scope.row.instcity}}
              </div>
              <div v-else> {{scope.row.instcity}}</div>
            </template>
          </el-table-column> -->
          <el-table-column label="序号" prop="xuhao"></el-table-column>
          <el-table-column label="城市代码">
            <template slot-scope="scope">
              <div v-if="scope.row.instcityid=='城市代码重复'||scope.row.instcityid=='城市项目代码为空'" style="color:#F56C6C;">
                {{scope.row.instcityid}}
              </div>
              <div v-else> {{scope.row.instcityid}}</div>
            </template>
          </el-table-column>
          <el-table-column label="一级类别">
            <template slot-scope="scope">
              <div v-if="scope.row.checktypefirst=='第一类别为空'||scope.row.checktypefirst=='不存在此第一类别'" style="color:#F56C6C;">
                {{scope.row.checktypefirst}}
              </div>
              <div v-else> {{scope.row.checktypefirst}}</div>
            </template>
          </el-table-column>
          <el-table-column label="二级类别">
            <template slot-scope="scope">
              <div v-if="scope.row.checktypesec=='第二类别为空'||scope.row.checktypesec=='不存在此第二类别'" style="color:#F56C6C;">
                {{scope.row.checktypesec}}
              </div>
              <div v-else> {{scope.row.checktypesec}}</div>
            </template>
          </el-table-column>
          <el-table-column label="体检项目名称">
            <template slot-scope="scope">
              <div v-if="scope.row.checkname=='体检名称和详情描述同时重复'||scope.row.checkname=='体检项目名称为空'" style="color:#F56C6C;">
                {{scope.row.checkname}}
              </div>
              <div v-else> {{scope.row.checkname}}</div>
            </template>
          </el-table-column>
          <el-table-column label="详情描述">
            <template slot-scope="scope">
              <div v-if="scope.row.checkdescribe=='体检名称和详情描述同时重复'||scope.row.checkdescribe=='详情为空'" style="color:#F56C6C;">
                {{scope.row.checkdescribe}}
              </div>
              <div v-else> {{scope.row.checkdescribe}}</div>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <div v-if="scope.row.checkgender=='性别只能填“男”、“女”或者“通用”'" style="color:#F56C6C;">
                {{scope.row.checkgender}}
              </div>
              <div v-else> {{scope.row.checkgender}}</div>
            </template>
          </el-table-column>
          <el-table-column label="婚姻">
            <template slot-scope="scope">
              <div v-if="scope.row.checkmarstatus=='婚姻只能填写“已婚”、“未婚”或者“通用”'" style="color:#F56C6C;">
                {{scope.row.checkmarstatus}}
              </div>
              <div v-else> {{scope.row.checkmarstatus}}</div>
            </template>
          </el-table-column>
          <el-table-column label="门市价">
            <template slot-scope="scope">
              <!-- <div v-if="scope.row.checkprice=='0'" style="color:#F56C6C;">
                不可为空或0
              </div> -->
              <div v-if="scope.row.checkprice=='-1'" style="color:#F56C6C;">
                门市价必须大于或等于核算价
              </div>
              <div v-if="scope.row.checkprice!='-1'"> {{scope.row.checkprice}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="checklowprice" label="核算价">
            <template slot-scope="scope">
              <!-- <div v-if="scope.row.checklowprice=='0'" style="color:#F56C6C;">
                不可为空或0
              </div> -->
              <div v-if="scope.row.checklowprice=='-1'" style="color:#F56C6C;">
                门市价必须大于或等于核算价
              </div>
              <div v-if="scope.row.checklowprice!='-1'"> {{scope.row.checklowprice}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="checksignificance" label="临床意义">
          </el-table-column>
          <el-table-column prop="checkspecial" label="特殊说明">
          </el-table-column>
        </el-table>
        <div style="  text-align: center">
          <el-button type="primary" style="font-size:25px;margin:30px auto" @click="selectflie1()">重新上传</el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <a id="adownload" href="" download="" style="display:none">导出</a>

    <input ref="inputer" id="upload" style="display:none" type="file" @change="importfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
  </div>
</template>

<script>
import { formatDate } from "../../../api/formatDate.js";
export default {
  name: "projectlist",
  components: {},
  watch: {
    FirstTypeValue(nv, ov) {
      console.log(nv, ov);
      if (!nv || nv == "" || nv == "全部") {
        this.SecondTypevalue = "";
      } else {
        this.SecondTypevalue = "";
        this.queryAllCheckDirSec();
      }
    }
  },
  data() {
    return {
      tableData: [],
      innerVisible: false,
      toleadisshow: false,
      filialeValue: "",
      FilialeList: ["全部", "优健康自营"],
      projectList: [], //体检项目列表
      projectCount: 0, //体检项目总数
      FirstTypeList: [], //一级类别列表
      FirstTypeValue: "", //一级类别选择的值
      SecondTypeList: [], //二级类别列表，根据一级类别生成
      SecondTypevalue: "", //二级类别选择的值

      projectpageSize: 10, //每页条数
      projectcurrentPage: 1, //当前页

      //搜索栏属性(选择的)
      projectseek: {
        projectname: "",
        sex: "",
        ProjectArea: "",
        ProjectAreaID: "",
        ProjectCity: "",
        ProjectCityID: ""
      },
      //搜索栏属性列表
      projectseeklist: {
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
      //区域列表
      branchOfficeRegionData: [
        {
          value: "全国",
          label: "全国"
        },
        {
          value: "1",
          label: "华北"
        },
        {
          value: "2",
          label: "东北"
        },
        {
          value: "3",
          label: "华东"
        },
        {
          value: "4",
          label: "华中"
        },
        {
          value: "5",
          label: "华南"
        },
        {
          value: "6",
          label: "西南"
        },
        {
          value: "7",
          label: "西北"
        },
        {
          value: "8",
          label: "港澳台"
        }
      ],
      //城市列表
      cityList: []
    };
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
//    this.filialeValue = this.$store.getters.getRoleInfo.AccountName;
//  } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
//    //销售
//    this.FilialeList = [];
//    this.filialeValue = this.$store.getters.getRoleInfo.FromCompany;
//  }
    this.ProjectListQuery();
    this.queryAllCheckDirFir();
    // this.restaurants = this.loadAll();
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
    //保存数据
    copypagemsg() {
      var body = {
        filialeValue: this.filialeValue,
        FirstTypeValue: this.FirstTypeValue,
        SecondTypevalue: this.SecondTypevalue,
        projectname: this.projectseek.projectname,
        sex: this.projectseek.sex,
        ProjectCityID: this.projectseek.ProjectCityID,
        projectpageSize: this.projectpageSize,
        projectcurrentPage: this.projectcurrentPage
      };
      this.$store.commit("setprojectlistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getprojectlistmsg;
      console.log(body);
      this.filialeValue = body.filialeValue || "";
      this.FirstTypeValue = body.FirstTypeValue || "";
      this.SecondTypevalue = body.SecondTypevalue || "";
      this.projectseek.projectname = body.projectname || "";
      this.projectseek.sex = body.sex || "";
      this.projectseek.ProjectCityID = body.ProjectCityID || "";
      this.projectpageSize = body.projectpageSize || 10;
      this.projectcurrentPage = body.projectcurrentPage || 1;
    },
    //选择导入文件
    selectflie() {
      this.$refs.inputer.value = "";
      document.getElementById("upload").click();
    },
    //重新上传
    selectflie1() {
      this.innerVisible = false;
      this.$refs.inputer.value = "";
      document.getElementById("upload").click();
    },
    //导入记录
    ImportRecord() {
      this.$router.push("/vbmedicalexamination/projectimportrecord");
    },
    exportexecl() {
      var body = {
        checktypefirst: this.FirstTypeValue,
        checktypesec: this.SecondTypevalue,
        checkname: this.projectseek.projectname,
        checkgender: this.projectseek.sex,
        areaname: this.projectseek.ProjectArea,
        areanameid: this.projectseek.ProjectAreaID,
        instcity: this.projectseek.ProjectCity,
        instcityid: this.projectseek.ProjectCityID,
        // page: this.projectcurrentPage,
        // pagesize: this.projectpageSize,
        instname: this.filialeValue
      };
      this.$api
        .post("/manage/outputChecks", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            console.log(this.$parent.$parent.$parent.weburl + res.data);
            let a = document.createElement("a");
            // console.log(require("../assets/qrcode.png"));
            a.href = this.$parent.$parent.$parent.weburl + res.data; // href链接指向图片的地址
            a.download = this.$parent.$parent.$parent.weburl + res.data; // 下载的图片的名称
            a.click(); // 触发a标签的单击事件
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
     
    
    //新增体检项目按钮
    AddProjectBtn() {
      this.$router.push("/vbmedicalexamination/tijianprojectadd?ischange=false");
    },
    //区域转换
    changearea(str) {
      switch (str) {
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
    //查询体检项目列表
    ProjectListQuery() {
      var body = {
        checktypefirst: this.FirstTypeValue,
        checktypesec: this.SecondTypevalue,
        checkname: this.projectseek.projectname,
        checkgender: this.projectseek.sex,
        areaname: this.projectseek.ProjectArea,
        areanameid: this.projectseek.ProjectAreaID,
        instcity: this.projectseek.ProjectCity,
        instcityid: this.projectseek.ProjectCityID,
        page: this.projectcurrentPage,
        pagesize: this.projectpageSize,
        instname: this.filialeValue
      };
      this.$api.post("/manage/queryWeiBaoCheck", body).then(res => {
        if (res.code == "200") {
          this.projectList = res.data.data;
          this.projectCount = res.data.count;
        }
      });
    },
    //通过区域查询城市
    areachangetocity() {
      if (this.projectseek.ProjectArea == "全国") {
        this.$api
          .get("/city/pullCityNames")
          .then(res => {
            this.cityList = [
              {
                value: "全国",
                label: "全国"
              }
            ];
            this.projectseek.ProjectCity = "";
            console.log(res.data);
            if (res.code == "200") {
              res.data.map((item, index) => {
                let temp = {
                  value: item,
                  label: item
                };
                this.cityList.push(temp);
              });
            }
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        var body = {
          areaCode: this.projectseek.ProjectArea
        };
        this.$api
          .get("/city/pullCityByAreaCode", body)
          .then(res => {
            this.cityList = [];
            this.projectseek.ProjectCity = "";
            console.log(res.data);
            if (res.code == "200") {
              res.data.map((item, index) => {
                let temp = {
                  value: item,
                  label: item
                };
                this.cityList.push(temp);
              });
            }
          })
          .catch(err => {
            console.log("err", err);
          });
      }
    },
    //查询所有--一级类别
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
            this.FirstTypeList.push(temp);
          });
        }
      });
    },
    //查询所有--二级类别
    queryAllCheckDirSec() {
      this.SecondTypeList = [];
      this.$api
        .post("/manage/queryAllCheckDirSec", {
          checktypefirst: this.FirstTypeValue
        })
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            res.data.map(item => {
              var temp = {
                value: item.checktypesec,
                label: item.checktypesec
              };
              this.SecondTypeList.push(temp);
            });
          }
        });
    },
    //删除体检项目
    manageDeleteCheck(row) {
      this.$confirm("此操作将永久删除该体检项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var body = {
            checkid: row.checkid
          };
          this.$api.post("/manage/manageDeleteCheck", body).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.ProjectListQuery();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改体检项目
    manageUpdateCheck(row) {
      console.log(row);
      this.$router.push(
        "/vbmedicalexamination/tijianprojectadd?ischange=true&checkid=" + row.checkid
      );
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.projectpageSize = val;
      console.log(`每页 ${val} 条`);
      this.ProjectListQuery();
    },
    handleCurrentChange(val) {
      this.projectcurrentPage = val;
      console.log(`当前页: ${val}`);
      this.ProjectListQuery();
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("体检项目列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    },
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss">
</style>

