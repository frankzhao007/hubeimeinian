<template>
  <div class="app-container">
    <div style=" font-size: 20px;">
      <i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp{{typename}} <span style="font-size:16px"> 二级类别管理</span></span>
    </div>
    <div style="float:right">
      <!--<el-button type="primary" @click="AddSecondTypeBtn()">新增二级类别</el-button>-->
    </div>
    <div style="padding-top:60px">
      <el-table :data="SecondTypeList" style="width: 100%;">
        <el-table-column prop="checktypesec" label="二级类别">
        </el-table-column>
        <el-table-column prop="checkattentionsec" label="备注">
        </el-table-column>
        <!--<el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="DeleteSecondTypeBtn(scope.row.checktypesecid)">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <!-- 新建/编辑二级级类别 弹窗 -->
    <el-dialog :visible.sync="ProjectTypePop.isshow" width="500px">
      <el-form size="medium" status-icon :model="ProjectTypePop.ProjectType" :rules="ProjectTypePop.ProjectTyperRules" label-width="120px" ref="ProjectTypePop.ProjectType" style="margin-top:20px">
        <el-form-item label="二级类别：" prop="ProjectType_Name">
          <el-input v-model="ProjectTypePop.ProjectType.ProjectType_Name" style="width:250px" maxlength="10" placeholder="最多可输入10个汉字"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="ProjectType_Msgs">
          <el-input type="textarea" show-word-limit v-model="ProjectTypePop.ProjectType.ProjectType_Msg" maxlength="20" placeholder="最多可输入20个汉字" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ProjectTypePop.isshow = false">取 消</el-button>
        <el-button v-if="ProjectTypePop.isedit" type="primary" @click="EditProjectTypePopBtn()">确 定</el-button>
        <el-button v-else type="primary" @click="AddProjectTypePopBtn()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "secondarycategorylist",
  components: {},
  watch: {},
  data() {
    return {
      typename: "",
      checkid: "", //一级类别按钮
      editcheckid: "", //编辑的二级类别
      SecondTypeList: [],
      ProjectTypePop: {
        isshow: false,
        isedit: false,
        ProjectType: {
          ProjectType_Name: "",
          ProjectType_Msg: ""
        },
        ProjectTyperRules: {
          ProjectType_Name: [
            { required: true, message: "请填写二级类别", trigger: "blur" },
            {
              min: 1,
              max: 10,
              message: "长度在 1 到 10 个字符",
              trigger: "blur"
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.checkid = this.$route.query.checkid;
    console.log(this.checkid);
    this.queryAllCheckDirSec();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //根据一级类目查询二级类目
    queryAllCheckDirSec() {
      var body = {
        checkid: this.checkid
      };
      this.$api.post("/manage/queryCheckDirSec", body).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.typename = res.data.checktypefirst;
          this.SecondTypeList = res.data.checksec;
        }
      });
    },
    //新建二级类别按钮
    AddSecondTypeBtn() {
      this.ProjectTypePop.ProjectType = {
        ProjectType_Name: "",
        ProjectType_Msg: ""
      };
      this.ProjectTypePop.isshow = true;
      this.ProjectTypePop.isedit = false;
    },
    //新建二级类别确认按钮
    AddProjectTypePopBtn() {
      if (!this.ProjectTypePop.ProjectType.ProjectType_Name) {
        this.$message.error("请输入二级类别名称");
        return;
      }
  
      var body = {
        checkid: this.checkid,
        checksec: [
          {
            checktypesec: this.ProjectTypePop.ProjectType.ProjectType_Name,
            checkattentionsec: this.ProjectTypePop.ProjectType.ProjectType_Msg
          }
        ]
      };
      this.$api.post("/manage/insertCheckDirSec", body).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.$message({
            message: "成功添加二级类别",
            type: "success"
          });
          this.ProjectTypePop.isshow = false;
          this.queryAllCheckDirSec();
        }
      });
    },
    //编辑二级类别按钮
    handleEdit(row) {
      console.log(row);
      this.editcheckid = row.checktypesecid;
      this.ProjectTypePop.ProjectType = {
        ProjectType_Name: row.checktypesec,
        ProjectType_Msg: row.checkattentionsec
      };
      this.ProjectTypePop.isshow = true;
      this.ProjectTypePop.isedit = true;
    },
    //编辑二级类别确认按钮
    EditProjectTypePopBtn(row) {
      if (!this.ProjectTypePop.ProjectType.ProjectType_Name) {
        this.$message.error("请输入二级类别名称");
        return;
      }
    
      var body = {
        checkid: this.checkid,
        checksec: [
          {
            checktypesec: this.ProjectTypePop.ProjectType.ProjectType_Name,
            checkattentionsec: this.ProjectTypePop.ProjectType.ProjectType_Msg,
            checktypesecid: this.editcheckid
          }
        ]
      };
      this.$api.post("/manage/updateCheckDirSec", body).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.$message({
            message: "成功修改二级类别",
            type: "success"
          });
          this.ProjectTypePop.isshow = false;
          this.queryAllCheckDirSec();
        }
      });
    },
    //删除二级类别按钮
    DeleteSecondTypeBtn(row) {
      this.$confirm("确认要删除该项目类别吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          var body = {
            checkid: this.checkid,
            checksec: [{ checktypesecid: row }]
          };
          this.$api.post("/manage/deleteCheckDirSec", body).then(res => {
            if (res.code == "200") {
              this.$message({
                type: "success",
                message: "已删除!"
              });
              this.queryAllCheckDirSec();
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
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
