<template>
  <div class="app-container" v-loading="approvaContent_loading">
    <el-button class="approvaContent_Export" type="primary" icon="el-icon-download" @click="ExportPdf" :loading="ExportPdfloading">导出PDF</el-button>
    <div class="approvaContent_wrap" id="approvaContent_pdf">
      <div :style="{height:topsize+'px'}" ref="topwrap">
        <div style="width: 200px;margin-left: 100px;text-align: center;padding-top:30px;">
          <div class="approvaContent_title">
            <h4>体检预约审核</h4>
          </div>
          <div class="approvaContent_enterprise">
            <div style="margin-top:15px;">
              {{theFirst.insComp}}
            </div>
            <div style="margin-top:15px;">
              结算金额
            </div>
          </div>
          <div class="approvaContent_Amount">
            ￥{{theFirst.paytotalAmount}}
          </div>
        </div>
        <div style="margin-left: 100px;">
          <div class="approvaContent_form">
            <el-form label-width="130px" label-position="left">
              <el-form-item label="发单城市：">
                {{theFirst.issuingCity}}
              </el-form-item>
              <el-form-item label="体检方式：">
                {{theFirst.phyExaminatMode}}
              </el-form-item>
              <el-form-item label="付款方式：">
                {{theFirst.payMethod}}
              </el-form-item>
              <el-form-item label="挂帐截止日期：">
                {{theFirst.deadlRegist}}
              </el-form-item>
              <el-form-item label="受检单位负责人：">
                {{theFirst.headUnit}}
              </el-form-item>
              <el-form-item label="手机号：">
                {{theFirst.contactMum}}
              </el-form-item>
              <el-form-item label="签约日期：">
                {{theFirst.contractDate}}
              </el-form-item>
              <el-form-item label="查报告方式：">
                {{theFirst.qyReportMethod}}
              </el-form-item>
              <el-form-item label="详细说明：">
                {{theFirst.detailedDescrip}}
              </el-form-item>
              <el-form-item label="图片：">
                <div class="approvaContent_image" v-if="isapprovaContent_image">
                  <div class="approvaContent_images" v-for="(fit,index) in imgUrlArr" :key="index">
                    <div @click="openImage(fit)">
                      <el-image style="width: 100px; height: 100px" :src="fit"></el-image>
                    </div>
                  </div>
                </div>
                <!-- <div class="approvaContent_image" v-if="isapprovaContent_image">
                  <div class="approvaContent_images" v-for="fit in theFirst.picture" :key="fit.pictureUrl">
                    <el-image style="width: 100px; height: 100px" :src="fit.pictureUrl"></el-image>
                  </div>
                </div> -->
              </el-form-item>
              <el-form-item label="提交日期：">
                {{theFirst.subDate}}
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <el-timeline>
            <el-timeline-item placement="top" style="width: 500px;">
              <el-card>
                <h4>发起申请</h4>
                <p>{{submitter}} <span style="float: right;">{{theFirst.subDate}}</span> </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item v-for="v in activities" :key="v.approver" placement="top" style="width: 500px;">
              <el-card>
                <h4 v-if="v.approverStatus == 1">审核中</h4>
                <h4 v-if="v.approverStatus == 2">审核通过</h4>
                <h4 v-if="v.approverStatus == 3">审核未通过</h4>
                <p> <span>{{v.approver}}</span> <span style="float: right;">{{v.subDate}}</span></p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div style=" margin-left: 100px;">
        <div style="font-size: 20px;margin-top: 15px;text-align: center;width: 400px;">套餐名称： {{theSecond.goodname}}</div>
        <div style="font-size: 20px;margin-top: 15px;text-align: center;width: 400px;">
          折扣价： ￥{{theSecond.price}}
        </div>
      </div>
      <div style="margin: 20px;width: 600px;">
        <el-table :data="theSecond.liRe" border show-summary style="width: 100%">
          <el-table-column prop="cityid" label="项目代码">
          </el-table-column>
          <el-table-column prop="checkname" label="单项名称">
          </el-table-column>
          <el-table-column label="详细描述">
            <template slot-scope="scope">
              {{scope.row.checkdescribe}}
            </template>
          </el-table-column>
          <el-table-column prop="checkprice" label="门市价（元）" width="110">
          </el-table-column>
        </el-table>
      </div>
      <div v-if="theFirst.phyExaminatMode != '分散体检'">
        <div style="margin: 40px;">
          <h4>体检城市：</h4>
          <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 4px;">
            <el-tag color="#ffffff" style="margin: 10px;" type="info" v-for="v in theSecond.appoCity" :key="v">{{v}}</el-tag>
          </div>
        </div>
        <div style="margin: 40px;">
          <h4>体检分院：</h4>
          <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 4px;">
            <el-tag color="#ffffff" style="margin: 10px;" type="info" v-for="v in theSecond.appoShop" :key="v">{{v}}</el-tag>
          </div>
        </div>
        <div class="approvaContent_collapse" style="margin: 40px;" v-for="(v,index) in theThird">
          <div style="margin: 10px 0;">{{v.letter}}</div>
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item,index) in v.figure" :key="index" :name="index">
              <template slot="title">
                <div>{{item.appoTime}} ({{item.examinaPerson.length}}人)</div>
              </template>
              <div v-for="(items,index) in item.examinaPerson">
                <p>{{items.medicalPeople}} {{items.gender}} {{items.marriage}}<span style="float: right;">{{items.phoneNumber}}</span> </p>
                <p>{{items.identity}}</p>
                <el-divider v-if="index != item.examinaPerson.length-1"></el-divider>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div>
      <el-dialog title="查看图片" :visible.sync="ImageDialog" width="800" top="10vh">
        <el-image :src="tempImageUrl"></el-image>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ImageDialog = false">取 消</el-button>
          <el-button type="primary" @click="ImageDialog = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  name: "approvaContent",
  components: {},
  data() {
    return {
      activeNames: [],
      // 查询数据
      Inquire: {
        fromCompany: "全部", //	所属分公司
        orderStatus: "全部", //	审核状态
        subApprover: "", //	审批提交人
        orderId: "", // 审批编号单ID
        subDate: "", //	提交时间
        endDate: "", //结束世间
        page: 1, //
        pageSize: 10 //
      },
      submitter: "",
      theFirst: [],
      theSecond: [],
      theThird: [],
      reverse: true,
      activities: [],
      isapprovaContent_image: true,
      executioncode: false,
      ExportPdfloading: false,
      approvaContent_loading: false,
      topsize: "",
      topwrapHeight: "",
      imgUrlArr: [],
      tempImageUrl: "",
      ImageDialog: false
    };
  },
  created() {
    this.approvaContent_loading = true;
    this.Inquire.orderId = this.$route.query.orderId;
    this.findApprovals();
    this.findPhyExamPackInfo();
    this.findPhyExamInfo();
    this.findApprovalImg();
  },
  mounted() {},
  methods: {
    openImage(url) {
      this.tempImageUrl = url;
      this.ImageDialog = true;
    },
    findApprovalImg() {
      this.$api
        .get("/approval/findApprovalImg", { orderId: this.Inquire.orderId })
        .then(res => {
          console.log(res.data);
          if (res.data) {
            this.imgUrlArr = res.data.imgList;
          }else{
            this.imgUrlArr=[]
          }
          this.approvaContent_loading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.approvaContent_loading = false;
        });
    },
    ExportPdf() {
      this.ExportPdfloading = true;
      var temp = [];
      // if (Array.isArray(this.theThird)) {
        this.theThird.map(i => {
          i.figure.map((j, m) => {
            console.log("m :", m);
            temp.push(m);
          });
        });
      // }
      this.activeNames = temp;
      this.executioncode = true;
      if (this.executioncode == false) {
        return;
      }
      console.log("this.theFirst.picture", this.theFirst.picture.length);
      if (this.theFirst.picture.length > 0) {
        // this.isapprovaContent_image = false;
      }

      // setTimeout(() => {
      //   let Height = this.$refs.topwrap.offsetHeight;
      //   console.log("Height :", Height);
      //   this.topwrapHeight = Height;
      //   this.topsize = Height + 150;
      // }, 10);

      setTimeout(() => {
        this.pdf();
      }, 1000);
    },
    pdf() {
      var title = this.Inquire.orderId;
      html2Canvas(document.querySelector("#approvaContent_pdf"), {
        allowTaint: true,
        dpi: 400
      }).then(function(canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        // 592.28  841.89
        let pageHeight = (contentWidth / 400) * 841.89;
        let leftHeight = contentHeight;
        let position = 30;
        let imgWidth = 400;
        let imgHeight = (400 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        console.log("pageData", pageData);
        let PDF = new JsPDF("", "pt", "a4");
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        PDF.save(title + ".pdf");
      });
      this.isapprovaContent_image = true;
      this.ExportPdfloading = false;
    },
    findApprovals() {
      this.$api
        .get("/approval/findApprovals", this.Inquire)
        .then(res => {
          // console.log(res.data);
          this.theFirst = res.data.data[0];
          console.log("theFirst", this.theFirst);
          this.submitter = this.theFirst.submitters.submitter;
          this.activities = this.theFirst.Approver;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    findPhyExamPackInfo() {
      this.$api
        .get("/approval/findPhyExamPackInfo", { orderId: this.Inquire.orderId })
        .then(res => {
          // console.log(res.data);
          this.theSecond = res.data;
          if (!this.theSecond.liRe) {
            this.theSecond.liRe=[]
          }
          console.log("theSecond", this.theSecond);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    findPhyExamInfo() {
      this.$api
        .get("/approval/findPhyExamInfo", { orderId: this.Inquire.orderId })
        .then(res => {
          // console.log(res.data);
          this.theThird = res.data;
          console.log("theThird", this.theThird);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.approvaContent_wrap {
  width: 600px;
  // border: 1px solid #464687;
  .approvaContent_title {
    font-size: 24px;
  }
  .approvaContent_enterprise {
    font-size: 16px;
  }
  .approvaContent_Amount {
    font-size: 24px;
    margin-top: 15px;
  }
  .approvaContent_form {
    margin-top: 10px;
    width: 400px;
    font-size: 18px;
    .el-form-item {
      margin: 0;
      word-wrap: break-word;
    }
    .approvaContent_image {
      display: flex;
      flex-flow: wrap;
      width: 400px;
      .approvaContent_images {
        height: auto;
        padding: 10px 10px 10px 0;
      }
      img {
        // width: 100px;
        height: 100px;
      }
    }
  }
}
.approvaContent_collapse {
  .el-collapse-item__wrap {
    .el-collapse-item__content {
      padding: 0;
    }
  }

  .el-divider {
    margin: 0;
  }
}
.approvaContent_Export {
  margin-bottom: 20px;
}
</style>
