<template>
  <div style="margin:30px">
    <div style="font-size:20px">
      <i @click="gotoback" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp新增/编辑单位</span>
    </div>
    <div style="margin-top:20px">
      <el-form :model="dwmsgobj" ref="myrules" :rules="dwmsgobjrules" label-position='right' label-width="120px">
        <el-form-item label="单位代码：" prop="DWDM">
          <el-input v-model="dwmsgobj.DWDM" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="单位名称：" prop="DWMC">
          <el-input v-model="dwmsgobj.DWMC" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="单位地址：" prop="DWDZ">
          <el-input v-model="dwmsgobj.DWDZ" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码：" prop="YZBM">
          <el-input v-model="dwmsgobj.YZBM" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="LXR">
          <el-input v-model="dwmsgobj.LXR" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="LXDH">
          <el-input v-model="dwmsgobj.LXDH" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="登记人：" prop="DJR">
          <el-input v-model="dwmsgobj.DJR" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="业务员代码：" prop="YWYDM">
          <el-input v-model="dwmsgobj.YWYDM" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="单位密码：" prop="DW_PASSWORD">
          <el-input v-model="dwmsgobj.DW_PASSWORD" placeholder="请填写" style="width:240px"></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button @click="gotoback">取 消</el-button>
          <el-button type="primary" @click="savebtn">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    "dwmsgobj.DWDM": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.DWMC": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.DWDZ": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.YZBM": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.LXR": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.LXDH": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.DJR": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.YWYDM": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    },
    "dwmsgobj.DW_PASSWORD": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.ischange = true;
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      ischange: false,
      dwmsgobj: {
        DWDM: "",
        DWMC: "",
        DWDZ: "",
        YZBM: "",
        LXR: "",
        LXDH: "",
        DJR: "",
        YWYDM: "",
        DW_PASSWORD: ""
      },
      dwmsgobjrules: {
        DWDM: [
          { required: true, message: "请输入单位代码！", trigger: "blur" }
        ],
        DWMC: [
          { required: true, message: "请输入单位名称！", trigger: "blur" }
        ],
        // DWDZ: [
        //   { required: true, message: "请输入单位地址！", trigger: "blur" }
        // ],
        // YZBM: [
        //   { required: true, message: "请输入邮政编码！", trigger: "blur" }
        // ],
        // LXR: [{ required: true, message: "请输入联系人！", trigger: "blur" }],
        // LXDH: [
        //   { required: true, message: "请输入联系电话！", trigger: "blur" }
        // ],
        // DJR: [{ required: true, message: "请输入登记人！", trigger: "blur" }],
        YWYDM: [
          { required: true, message: "请输入业务员代码！", trigger: "blur" }
        ],
        DW_PASSWORD: [
          { required: true, message: "请输入单位密码！", trigger: "blur" }
        ]
      },
      isadd: false
    };
  },
  mounted() {
    if (this.$route.query.isadd == "true") {
      this.isadd = true;
    } else {
      this.isadd = false;
      if (this.$route.query.DWDM) {
        this.dwmsgobj.DWDM = this.$route.query.DWDM;
        this.findFirmMn();
      }
    }
    this.ischange = false;
  },
  methods: {
    //查询美年单位信息
    findFirmMn() {
      this.$network3
        .get("/mnoracle/msj/findFirmMn", {
          DWDM: this.dwmsgobj.DWDM
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.dwmsgobj.DWDM = res.data[0].DWDM;
            this.dwmsgobj.DWMC = res.data[0].DWMC;
            this.dwmsgobj.DWDZ = res.data[0].DWDZ;
            this.dwmsgobj.YZBM = res.data[0].YZBM;
            this.dwmsgobj.LXR = res.data[0].LXR;
            this.dwmsgobj.LXDH = res.data[0].LXDH;
            this.dwmsgobj.DJR = res.data[0].DJR;
            this.dwmsgobj.YWYDM = res.data[0].YWYDM;
            this.dwmsgobj.DW_PASSWORD = res.data[0].DW_PASSWORD;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    savebtn() {
      this.$refs["myrules"].validate(valid => {
        if (valid) {
          if (this.isadd) {
            this.addFirmMn();
          } else {
            this.updateFirmMn();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加美年单位信息
    addFirmMn() {
      var body = {
        DWDM: this.dwmsgobj.DWDM,
        DWMC: this.dwmsgobj.DWMC,
        DWDZ: this.dwmsgobj.DWDZ,
        YZBM: this.dwmsgobj.YZBM,
        LXR: this.dwmsgobj.LXR,
        LXDH: this.dwmsgobj.LXDH,
        DJR: this.dwmsgobj.DJR,
        YWYDM: this.dwmsgobj.YWYDM,
        DW_PASSWORD: this.dwmsgobj.DW_PASSWORD
      };
      this.$network3
        .post("/mnoracle/msj/addFirmMn", [body])
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("新增单位成功!");
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
    //更新单位信息
    updateFirmMn() {
      var body = {
        DWDM: this.dwmsgobj.DWDM,
        DWMC: this.dwmsgobj.DWMC,
        DWDZ: this.dwmsgobj.DWDZ,
        YZBM: this.dwmsgobj.YZBM,
        LXR: this.dwmsgobj.LXR,
        LXDH: this.dwmsgobj.LXDH,
        DJR: this.dwmsgobj.DJR,
        YWYDM: this.dwmsgobj.YWYDM,
        DW_PASSWORD: this.dwmsgobj.DW_PASSWORD
      };
      this.$network3
        .post("/mnoracle/msj/updateFirmMn", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("更新单位成功!");
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
    gotoback() {
      if (this.ischange) {
        console.log("++++++++++++++++++");
        this.$confirm("您还未保存，离开将不保存该数据", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.go(-1);
          })
          .catch(() => {});
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>