<template>
  <!-- 套餐配置 -->
  <div class="app-container">
    <div style="font-size: 20px; ">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>
    <div class="enterpriseconfiguration_wrap">
      <div>
        <div class="enterpriseconfiguration_header">
          <h3>企业基本信息</h3>
          <el-divider></el-divider>
        </div>
        <el-form label-width="150px" size="medium">
          <el-form-item label="企业名称：">
            <span>{{accountname}}</span>
          </el-form-item>
          <el-form-item label="创建时间：">
            <span>{{createtime}}</span>
          </el-form-item>
          <el-form-item label="当前员工数：">
            <span>{{count}}人</span>
          </el-form-item>
        </el-form>
      </div>

      <div class="enterpriseconfiguration_header">
        <h3>企业个性化设置</h3>
        <el-divider></el-divider>
      </div>
      <el-form label-width="200px" size="medium">
        <el-form-item label="企业福利金使用控制：">
          <el-button @click="welfareControl = true" type="primary">点击设置</el-button>
        </el-form-item>
        <el-form-item label="企业门店个性化：">
          <el-button type="primary" @click="goshop()">点击设置</el-button>
        </el-form-item>
        <el-form-item label="企业员工信息锁定：">
          <el-checkbox v-model="lockName" label="锁定名字" true-label="true" false-label="false" @change="affirmCertificate"></el-checkbox>
          <el-checkbox v-model="lockIDCard" label="锁定证件号" true-label="true" false-label="false" @change="affirmCertificate"></el-checkbox>
        </el-form-item>
        <el-form-item label="是否收集报告邮寄地址：">
          <el-switch v-model="isPostalSavings" active-color="#409eff" inactive-color="#DDDDDD" active-value="true" inactive-value="flase" @change="openMail"></el-switch>
          <el-button style="margin-left:10px" type="primary" @click="lookDetails()">查看详情</el-button>
        </el-form-item>
        <el-form-item label="企业短信模板设置：">
          <el-button @click="gotemplate" type="primary">点击设置</el-button>
        </el-form-item>
        <el-form-item label="员工是否可以自行退出：">
          <el-switch v-model="mail" active-color="#409eff" inactive-color="#DDDDDD" active-value="true" inactive-value="flase" @change="staffQuit"></el-switch>
          <span style="margin-left:10px;">开启表示可以自行退出，关闭表示不允许自行退出</span>
        </el-form-item>
        <el-form-item label="用户首次登录提示开关：">
          <el-switch v-model="yhsctsSwitch" active-color="#409eff" inactive-color="#DDDDDD" :active-value="true" :inactive-value="false" @change="firstTipsOnOffPost"></el-switch>
          <span style="margin-left:10px;"></span>
        </el-form-item>
        <el-form-item label="用户首次登录提示：" v-if="yhsctsSwitch">
          <el-input v-model.native.lazy="yhsctsMsg" @change="firstTipsPost" type="textarea" style="width:350px;" maxlength="50" show-word-limit></el-input>
        </el-form-item>

        <!-- <el-form-item label="是否强制修改密码：">
          <el-switch v-model="mail" active-color="#409eff" inactive-color="#DDDDDD" active-value="true" inactive-value="flase" @change="staffQuit"></el-switch>
          <span style="margin-left:10px;">开启表示用户首次登录时需强制修改密码，关闭表示用户首次登录时不需强制修改密码</span>
        </el-form-item>
        <el-form-item label="企业信息个性化：">
          <el-button type="primary" @click="isshop=true">点击设置</el-button>
        </el-form-item> -->
      </el-form>

      <el-dialog title="企业福利金控制" :visible.sync="welfareControl" top="10vh" width="600px">
        <el-form label-width="320px" size="medium">
          <el-form-item label="福利金使用是否默认必选：">
            <el-radio v-model="welfaredata.welfareUse" label="true">必选</el-radio>
            <el-radio v-model="welfaredata.welfareUse" label="false">非必选</el-radio>
          </el-form-item>
          <el-form-item label="福利金公费套餐加项包、加项包组是否可用：">
            <el-radio v-model="welfaredata.welfarePublicPack" label="false">不可用</el-radio>
            <el-radio v-model="welfaredata.welfarePublicPack" label="true">可用</el-radio>
          </el-form-item>
          <el-form-item label="福利金自费套餐是否可用：">
            <el-radio v-model="welfaredata.welfarePrivate" label="false">不可用</el-radio>
            <el-radio v-model="welfaredata.welfarePrivate" label="true">可用</el-radio>
          </el-form-item>
          <el-form-item label="福利金自费套餐加项包、加项包组是否可用：">
            <el-radio v-model="welfaredata.welfarePrivatePack" label="false">不可用</el-radio>
            <el-radio v-model="welfaredata.welfarePrivatePack" label="true">可用</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="welfareControl = false">取 消</el-button>
          <el-button type="primary" @click="affirmWelfare">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <el-dialog title="编辑企业信息" :visible.sync="welfareControl" top="10vh" width="600px">
        <div slot="footer" class="dialog-footer">
          <el-button @click="welfareControl = false">取 消</el-button>
          <el-button type="primary" @click="affirmWelfare">确 定</el-button>
        </div>
      </el-dialog> -->

      <el-dialog title="编辑门店信息" :visible.sync="isshop" top="10vh" width="600px">
        <div style="overflow:hidden;">
          <div style="width:180px;float:left;text-align: right;line-height:32px">门店名称（必填）：</div>
          <div style="float:left;margin-left:10px;width:calc(100% - 190px);line-height:32px">户撒大声道撒</div>
        </div>
        <div style="overflow:hidden;margin-top:10px;padding-top:10px;">
          <div style="width:180px;float:left;text-align: right;">门店照片（非必填）：</div>
          <div style="float:left;margin-left:10px;width:calc(100% - 190px);">
            <input style="display:none" type="file" id="commodityimage" accept=".jpg, .jpeg, .png" />
            <div v-for="(child,index) in goodimgs" :key="index" style="float:left;margin-bottom:15px;margin-right:15px; position: relative;">
              <img style="height:100px;width:100px;" :src="child" alt />
              <div style="position: absolute;right:-10px;top:-10px;  background: #000000; border-radius:50%;width:20px;height:20px" @click="deletePicture(index)">
                <img src="../../assets/img/close.png" style="width:20px;height:20px" />
              </div>
            </div>
            <div class="addimage" @click="getFileImg" v-if="goodimgs.length<6">
              <img src="../../assets/img/more.png" style="width:30px;height:30px;" />
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isshop = false">取 消</el-button>
          <el-button type="primary" @click="isshop=false">确 定</el-button>
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
    return {
      yhsctsSwitch: false,
      yhsctsMsg: "",
      accountname: "",
      count: "",
      createtime: "",
      goodimgs: [], //上传的图片
      isshop: false,

      isPostalSavings: "", //是否开启邮寄报告
      welfareControl: false, //福利金控制
      lockName: "false", //锁定姓名
      lockIDCard: "false", //锁定身份证号
      mail: "false", //员工是否可以自行退出
      welfaredata: {
        //福利金参数
        welfareUse: "true",
        welfarePublicPack: "false",
        welfarePrivate: "false",
        welfarePrivatePack: "false"
      },

      firmid: "" //企业id
    };
  },
  created() {},
  mounted() {
    this.firmid = this.$route.query.id;
    this.getmessage();
    this.getmessage1();
    this.casMidal();
    this.firstTipsGet();
    this.firstTipsOnOffGet();
  },
  methods: {
    firstTipsGet() {
      this.$api
        .get("/enterpriseMore/firstTips", {
          eId: this.firmid
        })
        .then(res => {
          console.log(res);
          this.yhsctsMsg = res.data.firstTipsContent;
        })
        .catch(err => {
          console.log(err);
          this.yhsctsMsg = "";
        });
    },
    firstTipsPost() {
      console.log(this.yhsctsMsg);
      this.$api
        .post("/enterpriseMore/firstTips", {
          eId: this.firmid,
          firstTipsContent: this.yhsctsMsg
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    firstTipsOnOffPost() {
      this.$api
        .post("/enterpriseMore/firstTipsOnOff", {
          eId: this.firmid,
          firstTipsOnOff: this.yhsctsSwitch ? 1 : 0 //1开启 0关闭
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    firstTipsOnOffGet() {
      this.$api
        .get("/enterpriseMore/firstTipsOnOff", {
          eId: this.firmid
        })
        .then(res => {
          console.log(res);
          this.yhsctsSwitch = res.data.firstTipsOnOff == 1 ? true : false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goshop() {
      //个性化设置
      this.$router.push(
        "/enterprisemanagement/setpersonalized?companyId=" + this.firmid
      );
    },
    staffQuit() {
      var body = {
        id: this.firmid,
        personnelOut: this.mail
      };
      this.$api
        .post("/enterpriseMore/personnelOut", body)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deletePicture(e) {
      //删除图片
      this.goodimgs.splice(e, 1);
    },

    getFileImg() {
      //选择图片
      //  var input = document.getElementById("imgTest");
      //    console.log(input);
      console.log("888888");
      document
        .getElementById("commodityimage")
        .addEventListener("change", this.imgChange); //把imgChange的事件绑定到input的change事件上
      document.getElementById("commodityimage").click(); //执行input事件
    },

    imgChange(e) {
      //转化图片
      console.log(e.target.files[0].size);

      var imageSize = e.target.files[0].size;
      if (imageSize > 2000000) {
        document.getElementById("commodityimage").value = null; //保证可用选择重复图片
        this.$message.error("图片大小不能超过2M");
      } else {
        var file = e.target.files[0];
        var fd = new FormData();
        fd.append("imgs", file);
        var body = {};
        this.$api
          .post("/manage/msjGoodsImgInsert", fd)
          .then(res => {
            console.log(res.data[0]);
            this.goodimgs.push(res.data[0]);
            document.getElementById("commodityimage").value = null; //保证可用选择重复图片
          })
          .catch(res => {});
      }
    },

    modification() {
      //修改
      this.isshop = true;
    },

    goback() {
      //返回
      this.$router.go(-1);
    },
    getmessage1() {
      var body = {
        companyId: this.firmid
      };
      this.$api
        .get("/employee/getGenMemberSum", body)
        .then(res => {
          console.log(res);

          this.accountname = res.data.accountname;
          this.count = res.data.count;
          this.createtime = res.data.createtime;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openMail() {
      //开启邮寄报告
      var body = {
        id: this.firmid,
        orderExpressDelivery: this.isPostalSavings
      };
      this.$api
        .post("/orderExpressDelivery/orderExpressDeliverySwitch", body)
        .then(res => {
          console.log(res);
          this.casMidal();
        })
        .catch(err => {
          console.log(err);
        });
    },

    casMidal() {
      //查询邮寄报告
      var body = {
        id: this.firmid
      };
      this.$api
        .post("/orderExpressDelivery/queryOrderExpressDeliverySwitch", body)
        .then(res => {
          console.log(res);
          this.isPostalSavings = res.data.re;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getmessage() {
      var body = {
        id: this.firmid
      };
      this.$api
        .post("/enterpriseMore/queryEnterpriseMore", body)
        .then(res => {
          this.welfaredata.welfareUse = res.data.welfareUse;
          this.welfaredata.welfarePublicPack = res.data.welfarePublicPack;
          this.welfaredata.welfarePrivate = res.data.welfarePrivate;
          this.welfaredata.welfarePrivatePack = res.data.welfarePrivatePack;
          this.lockName = res.data.LockName;
          this.lockIDCard = res.data.LockIDCard;
          this.mail = res.data.personnelOut;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotemplate() {
      this.$router.push(
        "/enterprisemanagement/selectTemplate?firmid=" + this.firmid
      );
    },
    lookDetails() {
      console.log("232132132");
      this.$router.push(
        "/enterprisemanagement/mailReport?companyId=" + this.firmid
      );
    },
    affirmWelfare() {},
    affirmWelfare() {
      //确认福利金控制
      var body = {
        id: this.firmid,
        welfareUse: this.welfaredata.welfareUse,
        welfarePublicPack: this.welfaredata.welfarePublicPack,
        welfarePrivate: this.welfaredata.welfarePrivate,
        welfarePrivatePack: this.welfaredata.welfarePrivatePack
      };

      this.$api
        .post("/enterpriseMore/welfare", body)
        .then(res => {
          this.welfareControl = false;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    affirmCertificate() {
      //确认锁定的身份
      var body = {
        id: this.firmid,
        lockName: this.lockName,
        lockIDCard: this.lockIDCard
      };
      this.$api
        .post("/enterpriseMore/enterprisePersonnel", body)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
.addimage {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 2px dashed #dddddd;
  float: left;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
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
