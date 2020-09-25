<template>
  <!-- 员工名单详情 -->
  <div style="margin:20px">
    <div style=" font-size: 20px;">
      <i @click="$router.go(-1)" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp员工名单详情</span>
    </div>
    <!-- 搜索栏 -->
    <div style="margin-top:20px">
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="员工姓名：">
          <el-input v-model="seekobj.name" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="seekobj.phone" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="seekbtn()">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据列表 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="Name" label="员工姓名" min-width="250px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Phone" label="手机号码" min-width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Reward" label="奖励详情" min-width="450px" show-overflow-tooltip></el-table-column>
        <el-table-column label="赠送记录" min-width="100px" v-if="$route.query.type ==1">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openfindActReceiveInfoByUser(scope.row.UserId)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="使用记录" min-width="100px" v-if="$route.query.type ==2">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openfindActReceiveInfoByUser(scope.row.UserId)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" :disabled="nodel" @click="delemp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="tablesizechange" @current-change="tablecurrentchange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹窗 -->
    <div>
      <el-dialog :title="$route.query.type==1? '赠送记录':'使用记录'" :visible.sync="openByUserinfo.isshow" width="800px" center>
        <div v-loading="openByUserinfo.loading">
          <div v-if="openByUserinfo.listinfo.length>0">
            <div v-for="item in openByUserinfo.listinfo" style=" display: flex;align-items: center;justify-content: center;">
              <div style="min-width:200px;text-align: center">{{item.CreateDate}}</div>
              <div style="min-width:200px;text-align: center" v-if="$route.query.type==1"><span> 赠送给：{{item.Phone}} </span> </div>
              <div style="min-width:200px;text-align: center"><span v-if="item.OrderNum&&item.OrderNum!=''">订单号：{{item.OrderNum}}</span> </div>
              <div style="min-width:200px;text-align: center" v-if="$route.query.type==2">
                <span v-if="item.OrderStatrs<0">消耗次数</span> 
                <span v-else>退回次数</span> 
                <span>{{item.OrderStatrs}}</span>                 
              </div>
            </div>
          </div>
          <div v-else style="text-align:center">  
            暂无记录
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openByUserinfo.isshow = false">取 消</el-button>
          <el-button type="primary" @click="openByUserinfo.isshow = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodel: false,
      openByUserinfo: {
        isshow: false,
        listinfo: [],
        loading: false
      },
      seekobj: {
        name: "",
        phone: "",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      }
    };
  },
  watch: {},
  mounted() {
    this.findActReceiveInfo();
    if (this.$route.query.type == 1) {
      var url = "/familyBenef/findActivityById";
    } else if (this.$route.query.type == 2) {
      var url = "/activityConfig/findEmpFreePhysicalById";
    }
    this.$api.get(url, { id: this.$route.query.id }).then(res => {
      if (res.code == 200) {
        console.log(res);
        if (res.data.Employee.IsAll == "1") {
          this.nodel = true;
        } else {
          this.nodel = false;
        }
      }
    });
  },
  methods: {
    delemp(row) {
      console.log(row);
      this.$confirm(
        "员工删除后不可恢复，已赠送家属福利金不可撤销，请确认后删除！",
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if (this.$route.query.type == 1) {
            var url = "/familyBenef/updateActivityEmp";
          } else if (this.$route.query.type == 2) {
            var url = "/activityConfig/updateFpActivityEmp";
          }
          this.$api
            .post(url, {
              id: this.$route.query.id,
              Status: "-",
              IsAll: "2",
              Usids: [row.UserId]
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("删除成功！");
              }
              this.findActReceiveInfo();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openfindActReceiveInfoByUser(uid) {
      this.openByUserinfo.isshow = true;
      this.openByUserinfo.loading = true;
      if (this.$route.query.type == 1) {
        var url = "/familyBenef/findActReceiveInfoByUser";
      } else if (this.$route.query.type == 2) {
        var url = "/activityConfig/findActEmpReceiveInfoByUser";
      }

      this.$api
        .get(url, {
          id: this.$route.query.id,
          userid: uid
        })
        .then(res => {
          console.log(res);
          this.openByUserinfo.loading = false;
          if (this.$route.query.type == 1) {
            this.openByUserinfo.listinfo = res.data;
          } else if (this.$route.query.type == 2) {
            if (res.data.OrderInfo) {
              this.openByUserinfo.listinfo = res.data.OrderInfo;
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    tablesizechange(val) {
      this.seekobj.pageindex = 1;
      this.seekobj.pagesize = val;
      this.findActReceiveInfo();
    },
    tablecurrentchange(val) {
      this.seekobj.pageindex = val;
      this.findActReceiveInfo();
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.findActReceiveInfo();
    },
    findActReceiveInfo() {
      if (this.$route.query.type == 1) {
        var url = "/familyBenef/findActReceiveInfo";
      } else if (this.$route.query.type == 2) {
        var url = "/activityConfig/findActiveEmpInfo";
      }
      this.$api
        .get(url, {
          id: this.$route.query.id,
          name: this.seekobj.name,
          phone: this.seekobj.phone,
          page: this.seekobj.pageindex,
          pageSize: this.seekobj.pagesize
        })
        .then(res => {
          console.log(res);
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
        })
        .catch(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
    }
  }
};
</script>
<style  scoped>
</style>