<template>
  <!-- 分销员列表 -->
  <div style="margin:20px" class="DLobj">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="所属分公司：">
          <!-- <el-input v-model="seekobj.instname" placeholder="请填写" style="width:200px"></el-input> -->
          <el-select v-model="seekobj.instname" :disabled="SubsidiaryOptions.length == 0" filterable placeholder="（支持搜索）" size="medium" style="width:100%;">
            <el-option v-for="(item,index) in SubsidiaryOptions" :key="item.ID" :label="item.Name" :value="item.Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="seekobj.name" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="seekobj.phone" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" icon="el-icon-search" @click="seekbtn()">搜 索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="openaddPySale()">新 增</el-button>
          <el-button type="primary" @click="openmangage()">开放管理</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="instname" label="所属分公司" show-overflow-tooltip min-width="140px"></el-table-column>
        <el-table-column prop="salename" label="名称" show-overflow-tooltip min-width="140px"></el-table-column>
        <el-table-column prop="name" label="联系人" show-overflow-tooltip min-width="140px"></el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="140px"></el-table-column>
        <el-table-column label="店铺二维码" min-width="140px">
          <template slot-scope="scope">
            <img class="enterpriselist_QRcode" src="../../assets/erweima.png" alt @click="qrcodeFun(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="creattime" label="创建时间" min-width="170px"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="adminDeletePySaleById(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="tablesizechange" @current-change="tablepagechange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹窗 -->
    <div>
      <!-- 开放管理弹窗 -->
      <div>
        <el-dialog title="资格开放管理" :visible.sync="openmanaageobj.isshow" width="1200px">
          <!-- {{allfiliale}} -->
          <div v-loading="openmanaageobj.loading">
            <div>
              <span>选择需要开放的分公司</span>
              <el-button style="margin-left:20px" @click="alladd()">全部添加</el-button>
            </div>
            <div>
              <el-row style="margin-top:20px">
                <el-col :span="8" class="DLleftbox">
                  <div style="margin:10px">
                    <el-input v-model="seekopenobj.all" style="width:250px" clearable></el-input>
                    <el-button>搜 索</el-button>
                  </div>
                  <div v-for="(item,index) in fuzzyQuery(allfiliale,seekopenobj.all) " style="position: relative;">
                    <div @click="selectfilialebtn(item)" style="width:80%;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left:20px;margin-top:10px;cursor: pointer;">
                      {{item.AccountName}}
                    </div>
                    <div style="position: absolute;right:20px;top:0px;cursor: pointer;" @click="selectfilialebtn(item)">
                      →
                    </div>
                  </div>
                </el-col>
                <el-col :span="15" class="DLrightbox">
                  <div style="margin:10px">
                    <el-input v-model="seekopenobj.select" style="width:250px" clearable></el-input>
                    <el-button>搜 索</el-button>
                  </div>
                  <div style="height:20px;margin-left:270px;display: flex;align-items: center;" v-if="fuzzyQuery(selectfiliale,seekopenobj.select).length>0">
                    <el-checkbox v-model="IsSellindeterminateval" :indeterminate="IsSellindeterminate" @change="allclickcheckbox1">全选</el-checkbox>
                    <el-checkbox v-model="IsCompanyindeterminateval" :indeterminate="IsCompanyindeterminate" @change="allclickcheckbox2">全选</el-checkbox>
                    <el-checkbox v-model="IsStaffindeterminateval" :indeterminate="IsStaffindeterminate" @change="allclickcheckbox3">全选</el-checkbox>
                  </div>
                  <div v-for="(item,index) in fuzzyQuery(selectfiliale,seekopenobj.select)" :key="index" style="display: flex;align-items: center;height:40px">
                    <div style="width:250px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-left:20px;">
                      {{item.AccountName}}
                    </div>
                    <el-checkbox v-model="item.IsSell" @change="clickcheckbox(item)">销售</el-checkbox>
                    <el-checkbox v-model="item.IsCompany" @change="clickcheckbox(item)">HR&nbsp&nbsp</el-checkbox>
                    <el-checkbox v-model="item.IsStaff" @change="clickcheckbox(item)">员工</el-checkbox>
                    <el-button type="danger" size="mini" style="margin-left:30px" @click="delselectSales(item)">删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="openmanaageobj.isshow = false">取 消</el-button> -->
            <el-button type="primary" @click="UpdateSales()" :loading="confirmloading">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 新增分销员 -->
      <div>
        <el-dialog title="新增分销员" :visible.sync="addPySaleobj.isshow" width="500px">
          <el-form :model="addPySaleobj" label-position='right' label-width="120px" size="medium">
            <el-form-item label="名称：">
              <el-input v-model="addPySaleobj.salename" placeholder="请填写" maxlength="20" style="width:200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input v-model="addPySaleobj.name" placeholder="请填写" maxlength="20" style="width:200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input v-model="addPySaleobj.phone" placeholder="请填写" style="width:200px" @input="phonechange" clearable maxlength="11"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="addPySaleobj.isshow = false">取 消</el-button> -->
            <el-button type="primary" @click="adminInsertPySale()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 二维码弹窗 -->
      <div>
        <el-dialog title="二维码" :visible.sync="QRCodeDialog" width="450px" top="5vh" center @close="qrcodeFun(1)" center>
          <div id="imgcanvas1">
          </div>
          <div class="bgbox" id="imgcanvas">
            <div class="bgbox1">
              <div class="text1">{{config.obj.salename}}</div>
              <div class="text2">{{config.obj.instname}}</div>
              <div class="accountlist_QR_code">
                <div id="qrcode" ref="qrcode"></div>
                <img class="logoimg" src="../../../src/assets/logo.png" alt="">
              </div>
              <div class="text3">用微信扫二维码/长按识别</div>
            </div>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      SubsidiaryOptions: [],
      QRCodeDialog: false,
      config: {
        obj: "",
        value: "", //显示的值、跳转的地址
        imagePath: require("../../../src/assets/logo.png") //中间logo的地址
      },
      confirmloading: false,
      seekobj: {
        instname: "",
        phone: "",
        name: "",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      },
      openmanaageobj: {
        isshow: false,
        loading: false
      },
      allfiliale: [],
      selectfiliale: [],
      IsSellindeterminate: false,
      IsCompanyindeterminate: false,
      IsStaffindeterminate: false,
      IsSellindeterminateval: false,
      IsCompanyindeterminateval: false,
      IsStaffindeterminateval: false,
      seekopenobj: {
        all: "",
        select: ""
      },
      addPySaleobj: {
        isshow: false,
        name: "",
        phone: "",
        salename: ""
      }
    };
  },
  watch: {
    selectfiliale(val) {
      console.log(val);
      let IsSellnum = 0;
      let IsCompanynum = 0;
      let IsStaffnum = 0;
      val.map(item => {
        if (item.IsSell) {
          IsSellnum++;
        }
        if (item.IsCompany) {
          IsCompanynum++;
        }
        if (item.IsStaff) {
          IsStaffnum++;
        }
      });
      if (IsSellnum == 0) {
        this.IsSellindeterminate = false;
        this.IsSellindeterminateval = false;
      } else {
        if (IsSellnum == this.selectfiliale.length) {
          this.IsSellindeterminate = false;
          this.IsSellindeterminateval = true;
        } else {
          this.IsSellindeterminate = true;
          this.IsSellindeterminateval = false;
        }
      }
      if (IsCompanynum == 0) {
        this.IsCompanyindeterminate = false;
        this.IsCompanyindeterminateval = false;
      } else {
        if (IsCompanynum == this.selectfiliale.length) {
          this.IsCompanyindeterminate = false;
          this.IsCompanyindeterminateval = true;
        } else {
          this.IsCompanyindeterminate = true;
          this.IsCompanyindeterminateval = false;
        }
      }
      if (IsStaffnum == 0) {
        this.IsStaffindeterminate = false;
        this.IsStaffindeterminateval = false;
      } else {
        if (IsStaffnum == this.selectfiliale.length) {
          this.IsStaffindeterminate = false;
          this.IsStaffindeterminateval = true;
        } else {
          this.IsStaffindeterminate = true;
          this.IsStaffindeterminateval = false;
        }
      }
    }
  },
  mounted() {
    this.adminQueryAllPysales();
    this.getSubsidiaryOptions();
  },
  methods: {
    alladd() {
      this.selectfiliale = this.selectfiliale.concat(this.allfiliale);
      this.allfiliale = [];
    },
    phonechange() {
      this.addPySaleobj.phone = this.addPySaleobj.phone.replace(/[^\.\d]/g, "");
      this.addPySaleobj.phone = this.addPySaleobj.phone.replace(".", "");
    },
    getSubsidiaryOptions() {
      this.SubsidiaryOptions = [{ Name: "全部", ID: "" }];
      this.$api
        .get("/account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log();
          res.data.map(item => {
            if (item.AccountType == "1") {
              item.Name.map((temp, index) => {
                var obj = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.SubsidiaryOptions.push(obj);
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //图片转二维码
    qrcodeFun(row) {
      console.log(row);

      this.config.value = row.qrpath;
      this.config.obj = row;
      if (row != 1) {
        this.QRCodeDialog = true;
        setTimeout(() => {
          var qrcode = new QRCode(this.$refs.qrcode, {
            width: 200,
            height: 200,
            text: row.qrpath, // 二维码地址
            colorDark: "#1B449D"
          });
        }, 1);
        setTimeout(() => {
          html2canvas(document.getElementById("imgcanvas"), {
            allowTaint: true, //允许污染
            taintTest: true, //在渲染前测试图片(没整明白有啥用)
            useCORS: true //使用跨域(当allowTaint为true时这段代码没什么用)
          }).then(canvas => {
            document.getElementById("imgcanvas1").appendChild(canvas);
          });
        }, 100);
      } else {
        this.$refs.qrcode.innerHTML = "";
        document.getElementById("imgcanvas1").innerHTML = "";
        this.QRCodeDialog = false;
      }
    },
    tablesizechange(val) {
      this.seekobj.pageindex = 1;
      this.seekobj.pagesize = val;
      this.adminQueryAllPysales();
    },
    tablepagechange(val) {
      this.seekobj.pageindex = val;
      this.adminQueryAllPysales();
    },
    openaddPySale() {
      this.addPySaleobj = {
        isshow: true,
        name: "",
        phone: "",
        salename: ""
      };
    },
    adminInsertPySale() {
      if (!this.addPySaleobj.salename || this.addPySaleobj.salename == "") {
        this.$message.error("请填写名称");
        return;
      }
      if (!this.addPySaleobj.name || this.addPySaleobj.name == "") {
        this.$message.error("请填写联系人");
        return;
      }
      if (!this.addPySaleobj.phone || this.addPySaleobj.phone == "") {
        this.$message.error("请填写手机号");
        return;
      }
      this.$api
        .post("/manage/adminInsertPySale", {
          name: this.addPySaleobj.name,
          phone: this.addPySaleobj.phone,
          salename: this.addPySaleobj.salename
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.addPySaleobj.isshow = false;
            this.adminQueryAllPysales();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.adminQueryAllPysales();
    },
    adminDeletePySaleById(row) {
      this.$confirm("此操作将删除该分销员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .get("/manage/adminDeletePySaleById", { id: row.id })
            .then(res => {
              console.log(res);
              this.$message.success(res.msg);
              this.adminQueryAllPysales();
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查询分销数据
    adminQueryAllPysales() {
      this.tableobj.loading = true;
      var body = {
        instname: this.seekobj.instname,
        phone: this.seekobj.phone,
        name: this.seekobj.name,
        page: this.seekobj.pageindex,
        size: this.seekobj.pagesize
      };
      if (body.instname == "全部") {
        body.instname = "";
      }
      this.$api
        .post("/manage/adminQueryAllPysales", body)
        .then(res => {
          this.tableobj.loading = false;
          console.log(res);
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    UpdateSales() {
      this.confirmloading = true;
      this.$api
        .post("/account/UpdateSales", this.selectfiliale)
        .then(res => {
          console.log(res);
          this.confirmloading = false;
          this.openmanaageobj.isshow = false;
          //刷新
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    allclickcheckbox1(val) {
      console.log(val);
      if (val) {
        this.selectfiliale.map((item, index) => {
          this.selectfiliale[index].IsSell = true;
        });
      } else {
        this.selectfiliale.map((item, index) => {
          this.selectfiliale[index].IsSell = false;
        });
      }
      this.IsSellindeterminate = false;
    },
    allclickcheckbox2(val) {
      console.log(val);
      if (val) {
        this.selectfiliale.map((item, index) => {
          this.selectfiliale[index].IsCompany = true;
        });
      } else {
        this.selectfiliale.map((item, index) => {
          this.selectfiliale[index].IsCompany = false;
        });
      }
      this.IsCompanyindeterminate = false;
    },
    allclickcheckbox3(val) {
      console.log(val);
      if (val) {
        this.selectfiliale.map((item, index) => {
          this.selectfiliale[index].IsStaff = true;
        });
      } else {
        this.selectfiliale.map((item, index) => {
          this.selectfiliale[index].IsStaff = false;
        });
      }
      this.IsStaffindeterminate = false;
    },
    delselectSales(item) {
      console.log(item);
      this.openmanaageobj.loading = true;
      this.$api
        .del("/account/DelSales", {
          id: item.Id
        })
        .then(res => {
          console.log(res);
          var length = this.selectfiliale.length;
          for (let i = 0; i < length; i++) {
            console.log(i);
            if (item.Id == this.selectfiliale[i].Id) {
              this.selectfiliale.splice(i, 1);
              let obj = {
                AccountName: item.AccountName,
                Id: item.Id
              };
              this.allfiliale.unshift(obj);
              break;
            }
          }
          this.openmanaageobj.loading = false;
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    },
    clickcheckbox(item) {
      console.log(item);
      console.log(this.selectfiliale);
      let IsSellnum = 0;
      let IsCompanynum = 0;
      let IsStaffnum = 0;
      this.selectfiliale.map(item => {
        if (item.IsSell) {
          IsSellnum++;
        }
        if (item.IsCompany) {
          IsCompanynum++;
        }
        if (item.IsStaff) {
          IsStaffnum++;
        }
      });
      console.log(IsSellnum);
      console.log(IsCompanynum);
      console.log(IsStaffnum);

      if (IsSellnum == 0) {
        this.IsSellindeterminate = false;
        this.IsSellindeterminateval = false;
      } else {
        if (IsSellnum == this.selectfiliale.length) {
          this.IsSellindeterminate = false;
          this.IsSellindeterminateval = true;
        } else {
          this.IsSellindeterminate = true;
          this.IsSellindeterminateval = false;
        }
      }
      if (IsCompanynum == 0) {
        this.IsCompanyindeterminate = false;
        this.IsCompanyindeterminateval = false;
      } else {
        if (IsCompanynum == this.selectfiliale.length) {
          this.IsCompanyindeterminate = false;
          this.IsCompanyindeterminateval = true;
        } else {
          this.IsCompanyindeterminate = true;
          this.IsCompanyindeterminateval = false;
        }
      }
      if (IsStaffnum == 0) {
        this.IsStaffindeterminate = false;
        this.IsStaffindeterminateval = false;
      } else {
        if (IsStaffnum == this.selectfiliale.length) {
          this.IsStaffindeterminate = false;
          this.IsStaffindeterminateval = true;
        } else {
          this.IsStaffindeterminate = true;
          this.IsStaffindeterminateval = false;
        }
      }
    },
    fuzzyQuery(list, keyWord) {
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].AccountName.indexOf(keyWord) >= 0) {
          arr.push(list[i]);
        }
      }
      return arr;
    },

    selectfilialebtn(item) {
      var obj = item;
      this.$set(obj, "IsSell", false);
      this.$set(obj, "IsCompany", false);
      this.$set(obj, "IsStaff", false);
      console.log(obj);
      var length = this.allfiliale.length;
      for (let i = 0; i < length; i++) {
        console.log(i);
        if (obj.Id == this.allfiliale[i].Id) {
          this.allfiliale.splice(i, 1);
          break;
        }
      }
      // console.log(index);
      // this.allfiliale.splice(index, 1);
      this.selectfiliale.push(obj);
    },
    openmangage() {
      this.openmanaageobj.isshow = true;
      this.openmanaageobj.loading = true;
      this.selectfiliale = [];
      this.allfiliale = [];
      this.pullorg2();
    },
    //   01-获取分销列表
    GetSales() {
      this.$api
        .get("/account/GetSales")
        .then(res => {
          if (res.code == 200) {
            this.selectfiliale = res.data || [];
            var arr1count = this.selectfiliale.length;
            var arr2count = this.allfiliale.length;
            console.log(this.selectfiliale);
            console.log(this.allfiliale);
            let arr1Ids = this.selectfiliale.map(item => item.Id);
            this.allfiliale = this.allfiliale.filter(item => {
              return !arr1Ids.includes(item.Id);
            });
            console.log(this.allfiliale);
          }
          this.openmanaageobj.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //获取所有分公司
    pullorg2() {
      this.$api
        .get("/account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log(res);
          this.allfiliale = [];
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "1") {
              item.Name.map((temp, index) => {
                let obj = {
                  AccountName: temp,
                  Id: item.ID[index]
                };

                this.allfiliale.push(obj);
              });
              console.log(this.allfiliale);
            }
          });
          this.GetSales();
        })
        .catch(err => {
          console.log(err);
          this.$message.error(res.msg);
        });
    }
  }
};
</script>
<style lang="scss">
#imgcanvas1 {
  text-align: center;
}
.bgbox {
  width: 375px;
  height: 667px;
  background-image: url(../../assets/qrcodebg.jpg);
  background-size: cover;
  margin: 0% auto;
  border: 1px solid #ffffff;
  position: absolute;
  top: -9999px;
  left: -9999px;
  .bgbox1 {
    background: #ffffff;
    border-radius: 8px;
    margin: 140px 40px 0 40px;
    text-align: center;
    .accountlist_QR_code {
      text-align: center;
      position: relative;
      // width: 132px;
      img {
        margin: 0 auto;
      }
      .logoimg {
        position: absolute;
        width: 60px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .text1 {
      font-size: 18px;
      color: #333333;
      padding-top: 40px;
    }
    .text2 {
      font-size: 14px;
      color: #666666;
      padding-top: 5px;
      padding-bottom: 15px;
    }
    .text3 {
      font-size: 14px;
      color: #333333;
      padding-top: 20px;
      padding-bottom: 60px;
    }
  }
}
.enterpriselist_QRcode {
  margin: 0 2px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    line-height: 37px;
  }
}
.DLobj {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
.DLleftbox {
  height: 500px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  overflow-y: auto;
}
.DLrightbox {
  height: 500px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin-left: 20px;
  overflow-y: auto;
}
</style>