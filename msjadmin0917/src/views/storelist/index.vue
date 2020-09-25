<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">门店名称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="seekobj.input" clearable size="medium" style="width:80%;">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">所在区域：</div>
            <div class="grid_content">
              <el-select v-model="seekobj.areaName" style="width:80%" clearable size="medium" @change="areaNamechange" filterable>
                <el-option v-for="item in areaNamelist" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">所在城市：</div>
            <div class="grid_content">
              <!-- <el-input placeholder="请输入内容" v-model="seekobj.cityName" clearable size="medium" style="width:80%;">
              </el-input> -->
              <el-select v-model="seekobj.cityName" style="width:80%" clearable size="medium" filterable>
                <el-option v-for="item in cityNamelist" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">门店编码：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="seekobj.localCenterCode" clearable size="medium" style="width:80%;">
              </el-input>
            </div>
          </el-col>
          <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="quertshopbtn()">搜索</el-button>
          <el-button :disabled="!Clickable.inquire" class="grid_button" type="primary" size="medium" @click="importexcel()">导出</el-button>
          <el-button :disabled="!Clickable.add" class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="newshopbtn(0)">新增门店</el-button>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="shoplist" style="width: 100%">
        <el-table-column prop="CenterName" label="体检中心名称" min-width="250px" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="LocalCenterCode" label="门店编码" min-width="110px">
        </el-table-column>
        <el-table-column prop="AreaName" label="所在区域" min-width="110px">
        </el-table-column>
        <el-table-column prop="CityName" label="所属城市" min-width="110px">
        </el-table-column>
        <el-table-column label="详细信息" min-width="110px">
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.preview" @click="Preview(scope.row,1)" type="text" size="small">点击预览</el-button>
          </template>
        </el-table-column min-width="110px">
        <el-table-column prop="Remark" label="备注" min-width="250px" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="UpdateTime" label="最后修改时间" min-width="150px" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="110px">
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.edit" @click="modify(scope.row,2)" type="text" size="small">修改</el-button>
            <el-button :disabled="!Clickable.edit" @click="delshop(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <!-- 新建门店弹窗 -->
    <div v-if="newshopisshow">
      <el-dialog title="美年门店信息" :visible.sync="newshopisshow" width="1000px" top="5vh">
        <div class="storelist_container">
          <el-container>
            <el-aside width="400px">
              <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" size="medium" style="margin-top: 25px;">
                <el-form-item label="门店名称：" prop="CenterName">
                  <el-input v-model="ruleForm.CenterName" placeholder="请输入门店名称" style="width:230px;" clearable></el-input>
                </el-form-item>
                <el-form-item label="地区：" prop="AreaName">
                  <el-select v-model="ruleForm.AreaName" :disabled="ButtonStatus ==1" filterable placeholder="请选择所在地区" style="width:230px;">
                    <el-option v-for="item in AreaNameData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="城市：" prop="CityName">
                  <el-select v-model="ruleForm.CityName" :disabled="ButtonStatus ==1" filterable placeholder="请选择所在城市" style="width:230px;">
                    <el-option v-for="item in CityNameData" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="体检中心编码：" prop="LocalCenterCode">
                  <el-input v-model="ruleForm.LocalCenterCode" placeholder="请输入体检中心编码" style="width:230px;" clearable></el-input>
                </el-form-item>
                <el-form-item label="门店地址：" prop="Address">
                  <el-input v-model="ruleForm.Address" placeholder="请输入门店地址" style="width:230px;" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="PhoneNumber">
                  <el-input v-model="ruleForm.PhoneNumber" placeholder="请输入联系电话" style="width:230px;" clearable></el-input>
                </el-form-item>
                <el-form-item label="营业时间：" prop="WorkTime">
                  <el-input v-model="ruleForm.WorkTime" placeholder="请输入营业时间" style="width:230px;" clearable></el-input>
                </el-form-item>
                <el-form-item label="经纬度：" prop="BaiDuMap">
                  <el-input v-model="ruleForm.BaiDuMap" placeholder="请输入经纬度" style="width:230px;" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注说明" prop="Remark">
                  <el-input type="textarea" v-model="ruleForm.Remark" placeholder="请输入备注说明" style="width:230px;" clearable></el-input>
                </el-form-item>
              </el-form>
            </el-aside>
            <el-main>
              <div id="storelist_baidu">
                <iframe src="https://api.map.baidu.com/lbsapi/getpoint/index.html" height="680" width="560" frameborder="0" scrolling="0"></iframe>
              </div>
            </el-main>
          </el-container>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newshopisshow = false">取 消</el-button>
          <el-button v-if="ButtonStatus == 0" type="primary" @click="submitForm('ruleForm')" :loading="loading">立即创建</el-button>
          <el-button v-if="ButtonStatus == 1" type="primary" @click="newshopisshow = false">确 定</el-button>
          <el-button v-if="ButtonStatus == 2" type="primary" @click="modifyPost">提交修改</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "storelist",
  components: {},
  watch: {},
  data() {
    return {
      loading: false,
      // 查询条件
      seekobj: {
        input: "",
        areaName: "",
        cityName: "",
        localCenterCode: ""
      },
      currentPage: 1,
      pagesize: 10,
      count: 0,
      // 表格
      shoplist: [],
      // 门店 城市下拉框
      // 门店所在区域选项
      AreaNameData: [
        {
          value: "1",
          label: "华北地区"
        },
        {
          value: "2",
          label: "东北地区"
        },
        {
          value: "3",
          label: "华东地区"
        },
        {
          value: "4",
          label: "华中地区"
        },
        {
          value: "5",
          label: "华南地区"
        },
        {
          value: "6",
          label: "西南地区"
        },
        {
          value: "7",
          label: "西北地区"
        },
        {
          value: "8",
          label: "港澳台地区"
        }
      ],
      CityNameData: [],
      // 弹窗
      newshopisshow: false,
      // 表单
      ruleForm: {
        CenterName: "", //门店名称
        AreaName: "", //区域名称
        CityName: "", //城市名称
        LocalCenterCode: "", //门店编码
        Address: "", //地址
        PhoneNumber: "", //手机号
        WorkTime: "", //营业时间
        BaiDuMap: "", //百度地图
        Remark: "" //备注
      },
      // 表单规则
      rules: {
        CenterName: [
          { required: true, message: "请输入门店名称", trigger: "change" }
        ],
        AreaName: [
          { required: true, message: "请选择所在地区", trigger: "change" }
        ],
        CityName: [
          { required: true, message: "请选择所在城市", trigger: "change" }
        ],
        LocalCenterCode: [
          { required: true, message: "请输入体检中心编码", trigger: "change" }
        ],
        Address: [
          { required: true, message: "请输入门店地址", trigger: "change" }
        ],
        PhoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "change" }
        ],
        WorkTime: [
          { required: true, message: "请输入营业时间", trigger: "change" }
        ],
        BaiDuMap: [
          { required: true, message: "请输入经纬度", trigger: "change" }
        ],
        Remark: [
          { required: true, message: "请输入备注说明", trigger: "change" }
        ]
      },
      update: {},
      // 按钮状态
      ButtonStatus: 0, //0 新增  1 预览  2 修改
      areaNamelist: [],
      cityNamelist: []
    };
  },
  created() {
    this.pullCityNames();
  },
  mounted() {
    this.shoppullAll();
    this.$api
      .get("/center/getStoreCascade")
      .then(res => {
        console.log(res);
        this.areaNamelist = ["全部"];
        this.areaNamelist = this.areaNamelist.concat(res.data.AreaName);
        this.cityNamelist = res.data.CityName;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    areaNamechange(val) {
      this.getStoreCascade(val, "");
    },
    getStoreCascade(areaName, cityName) {
      this.$api
        .get("/center/getStoreCascade", {
          areaName: areaName,
          cityName: cityName
        })
        .then(res => {
          console.log(res);
          // this.areaNamelist = res.data.AreaName;
          this.cityNamelist = res.data.CityName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    delshop(row) {
      this.$confirm("此操作将永久删除该门店, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .del("/center/delete", {
              id: row.Id
            })
            .then(res => {
              console.log(res);
              this.$message.success("删除成功！");
              this.shoppullAll();
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit", this.ruleForm);
          this.centerPushOne();
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增门店
    centerPushOne() {
      this.$api
        .post("/center/pushOne", this.ruleForm)
        .then(res => {
          console.log(res);
          this.newshopisshow = false;
          this.loading = false;
          this.$message.success("新增成功");
          this.shoppullAll();
        })
        .catch(err => {
          this.loading = false;
          console.log("err", err);
          this.$message.error(err.msg + "," + err.data);
        });
    },
    //搜索btn
    quertshopbtn() {
      this.currentPage = 1;
      this.shoppullAll();
    },
    // 城市
    pullCityNames() {
      this.$api
        .get("/city/pullCityNames")
        .then(res => {
          // console.log(res.data);
          this.CityNameData = res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    importexcel() {
      var body = {
        centerName: this.seekobj.input,
        localCenterCode: this.seekobj.localCenterCode,
        cityName: this.seekobj.cityName,
        areaName: this.seekobj.areaName,
        page: this.currentPage,
        pageSize: this.pagesize,
        isExcel: "1"
      };
      this.$api
        .get("/center/pullAll", body)
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            let a = document.createElement("a");
            // console.log(require("../assets/qrcode.png"));
            a.href = this.$parent.$parent.$parent.weburl + res.data.url; // href链接指向图片的地址
            a.download = this.$parent.$parent.$parent.weburl + res.data.url; // 下载的图片的名称
            a.click(); // 触发a标签的单击事件
            // this.shoplist = res.data.data;
            // this.count = res.data.count;
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    //门店查询接口
    shoppullAll() {
      var body = {
        centerName: this.seekobj.input,
        localCenterCode: this.seekobj.localCenterCode,
        cityName: this.seekobj.cityName,
        areaName: this.seekobj.areaName,
        page: this.currentPage,
        pageSize: this.pagesize
      };
      this.$api.get("/center/pullAll", body).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.shoplist = res.data.data;
          this.count = res.data.count;
        }
      });
    },
    //新建门店按钮
    newshopbtn(ButtonStatus) {
      this.ruleForm = {
        CenterName: "", //门店名称
        AreaName: "", //区域名称
        CityName: "", //城市名称
        LocalCenterCode: "", //门店编码
        Address: "", //地址
        PhoneNumber: "", //手机号
        WorkTime: "", //营业时间
        BaiDuMap: "", //百度地图
        Remark: "" //备注
      };
      this.ButtonStatus = ButtonStatus;
      this.newshopisshow = true;
    },
    // 预览
    Preview(val, ButtonStatus) {
      this.ButtonStatus = ButtonStatus;
      this.newshopisshow = true;
      console.log("预览", val);
      this.ruleForm = {
        CenterName: val.CenterName, //门店名称
        AreaName: val.AreaName, //区域名称
        CityName: val.CityName, //城市名称
        LocalCenterCode: val.LocalCenterCode, //门店编码
        Address: val.Address, //地址
        PhoneNumber: val.PhoneNumber, //手机号
        WorkTime: val.WorkTime, //营业时间
        BaiDuMap: val.BaiDuMap, //百度地图
        Remark: val.Remark //备注
      };
      // 给输入框赋值
    },
    // 修改
    modify(val, ButtonStatus) {
      this.ButtonStatus = ButtonStatus;
      this.newshopisshow = true;
      this.ruleForm = val;
      // this.update = val;
    },
    // 修改Post
    modifyPost() {
      console.log("修改Post", this.ruleForm);
      this.$api
        .post("/center/update", this.ruleForm)
        .then(res => {
          console.log(res);
          this.ruleForm = {
            CenterName: "", //门店名称
            AreaName: "", //区域名称
            CityName: "", //城市名称
            LocalCenterCode: "", //门店编码
            Address: "", //地址
            PhoneNumber: "", //手机号
            WorkTime: "", //营业时间
            BaiDuMap: "", //百度地图
            Remark: "" //备注
          };
          this.$message.success("修改成功");
          this.newshopisshow = false;
          this.shoppullAll();
        })
        .catch(err => {
          console.log("err", err);
          this.$message.error(err.data)
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.currentPage = 1;
      this.shoppullAll();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.shoppullAll();
    }
  },
  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("门店列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    }
  }
};
</script>

<style lang="scss">
.storelist_container {
  .el-main {
    padding: 0;
    margin-top: -15px;
  }
}
#storelist_baidu {
  width: 200px;
}
</style>


