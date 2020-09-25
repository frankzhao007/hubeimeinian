<template>
  <div style="padding:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="短信类型：">
          <el-select v-model="seekobj.SMSType" placeholder="" style="width:200px" clearable>
            <el-option label="注册通知" :value="1"></el-option>
            <el-option label="商品订单" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="短信发送时机：">
          <el-select v-model="seekobj.SendTime" placeholder="" style="width:200px" clearable>
            <el-option label="1、员工后台创建成功短信" :value="1"></el-option>
            <el-option label="2、企业后台创建成功短信" :value="2"></el-option>
            <el-option label="3、销售后台创建成功短信" :value="3"></el-option>
            <el-option label="4、分公司后台创建成功短信" :value="4"></el-option>
            <el-option label="5、扫企业二维码成为员工审核通过后短信" :value="5"></el-option>
            <el-option label="6、扫企业二维码成为员工审核不通过后短信" :value="6"></el-option>
            <el-option label="7、扫销售二维码成为HR审核通过后短信" :value="7"></el-option>
            <el-option label="8、扫销售二维码成为HR审核不通过后短信：" :value="8"></el-option>
            <el-option label="9、扫分公二维码成为销售审核通过后短信：" :value="9"></el-option>
            <el-option label="10、扫分公二维码成为销售审核不通过后短信：" :value="10"></el-option>
            <el-option label="11、销售订单提醒" :value="11"></el-option>
            <el-option label="12、商品购买成功通知" :value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="GetAll">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="ID" label="短信模板ID" min-width="" min-width="100px"></el-table-column>
        <el-table-column label="短信类型" min-width="80px">
          <template slot-scope="scope">
            {{smstypechange(scope.row.SMSType)}}
          </template>
        </el-table-column>
        <el-table-column prop="SendTime" label="发送时机" min-width="200px">
          <template slot-scope="scope">
            {{SendTimechange(scope.row.SendTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="Content" label="内容" min-width="300px"></el-table-column>
        <el-table-column prop="Remark" label="备注" min-width="100px">
          <template slot-scope="scope">
            {{scope.row.Remark||"暂无备注"}}
          </template>
        </el-table-column>
        <el-table-column label="是否默认" min-width="100px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IsDefault" @change="IsDefaultchange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openeditwindow(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <div>
      <!-- 编辑弹窗 -->
      <div>
        <el-dialog title="短信模板" :visible.sync="editwindow.isshow" width="600px">
          <el-form :model="editwindow" label-position='right' label-width="120px" size="medium">
            <el-form-item label="短信模板ID：">
              <el-input v-model="editwindow.ID" placeholder="请填写" style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="短信类型：">
              {{smstypechange(editwindow.SMSType)}}
            </el-form-item>
            <el-form-item label="发送时机：">
              {{SendTimechange(editwindow.SendTime)}}
            </el-form-item>
            <div></div>
            <el-form-item label="是否默认：">
              <el-switch v-model="editwindow.IsDefault">
              </el-switch>
            </el-form-item>
            <el-form-item label="内容：">
              <el-input type="textarea" style="width:300px" v-model="editwindow.Content" maxlength="64" :autosize="{ minRows: 4, maxRows: 5}"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input maxlength="10" placeholder="非必填，最多10字" v-model="editwindow.Remark" style="width:300px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editwindow.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmedit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seekobj: {
        SMSType: "",
        SendTime: "",
        page: "",
        pageSize: ""
      },
      tableobj: {
        loading: false,
        list: []
      },
      editwindow: {
        isshow: false,
        ID: "",
        SMSType: "",
        SendTime: "",
        Content: "",
        Remark: "",
        IsDefault: ""
      }
    };
  },
  mounted() {
    this.GetAll();
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
        SMSType: this.seekobj.SMSType,
        SendTime: this.seekobj.SendTime
      };
      this.$store.commit("setmessagetemplatemsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getmessagetemplatemsg;
      console.log(body);
      this.seekobj.SMSType = body.SMSType || "";
      this.seekobj.SendTime = body.SendTime || "";
      console.log(body);
    },
    confirmedit() {
      if (!this.editwindow.Content || this.editwindow.Content == "") {
        this.$message.error("请输入短信发送内容");
        return;
      }
      var body = {
        ID: this.editwindow.ID,
        SMSType: this.editwindow.SMSType,
        SendTime: this.editwindow.SendTime,
        Content: this.editwindow.Content,
        Remark: this.editwindow.Remark,
        IsDefault: this.editwindow.IsDefault
      };

      this.UpdateByID(body);
    },
    IsDefaultchange(row) {
      console.log(row);
      this.UpdateByID(row);
    },
    // 02-更新短信模板
    UpdateByID(row) {
      this.$api
        .post("/SMS/UpdateByID", row)
        .then(res => {
          this.GetAll();
          this.$message.success(res.msg);
          this.editwindow.isshow = false;
        })
        .catch(res => {
          this.GetAll();
          this.$message.error(res.msg);
        });
    },
    openeditwindow(row) {
      console.log(row);
      this.editwindow.isshow = true;
      this.editwindow.ID = row.ID;
      this.editwindow.SMSType = row.SMSType;
      this.editwindow.SendTime = row.SendTime;
      this.editwindow.Content = row.Content;
      this.editwindow.Remark = row.Remark;
      this.editwindow.IsDefault = row.IsDefault;
    },
    smstypechange(val) {
      switch (val) {
        case 1:
          return "注册通知";
          break;
        case 2:
          return "商品订单";
          break;
        default:
          break;
      }
    },
    SendTimechange(val) {
      switch (val) {
        case 1:
          return "员工后台创建成功短信";
          break;
        case 2:
          return "企业后台创建成功短信";
          break;
        case 3:
          return "销售后台创建成功短信";
          break;
        case 4:
          return "分公司后台创建成功短信";
          break;
        case 5:
          return "扫企业二维码成为员工审核通过后短信";
          break;
        case 6:
          return "扫企业二维码成为员工审核不通过后短信";
          break;
        case 7:
          return "扫销售二维码成为HR审核通过后短信";
          break;
        case 8:
          return "扫销售二维码成为HR审核不通过后短信：";
          break;
        case 9:
          return "扫分公二维码成为销售审核通过后短信：";
          break;
        case 10:
          return "扫分公二维码成为销售审核不通过后短信：";
          break;
        case 11:
          return "销售订单提醒";
          break;
        case 12:
          return "商品购买成功通知";
          break;

        default:
          break;
      }
    },
    GetAll() {
      this.tableobj.loading = true;
      this.$api
        .get("/SMS/GetAll", {
          SMSType: this.seekobj.SMSType,
          SendTime: this.seekobj.SendTime,
          page: this.seekobj.page,
          pageSize: this.seekobj.pageSize
        })
        .then(res => {
          this.tableobj.loading = false;
          this.tableobj.list = res.data.data;
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    }
  },
  watch: {
    "editwindow.Content": {
      handler(nvl, ovl) {
        console.log();
        if (this.editwindow.isshow) {
          if (this.editwindow.ID == "dx100012") {
            if (
              String(nvl).substring(0, 23) !=
              "【码上检】您购买的{商品名称}商品已经支付成功"
            ) {
              this.editwindow.Content = ovl;
              this.$message.error("头部固定内容不可编辑,请勿修改！");
            }
          } else {
            if (String(nvl).substring(0, 5) != "【码上检】") {
              this.editwindow.Content = ovl;
              this.$message.error("头部固定内容不可编辑,请勿修改！");
            }
          }
        }
      },
      // deep: true,
      immediate: true
    }
  },
  computed: {}
};
</script>
<style lang="scss">
</style>