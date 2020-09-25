<template>
  <div style="margin:30px">

    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="套餐名称：">
          <el-input v-model="seekobj.GROUPNAME" placeholder="请填写" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="seekobj.XB" placeholder="" style="width:200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
            <el-option label="全部" value=0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚否：">
          <el-select v-model="seekobj.HYZK" placeholder="" style="width:200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="已婚" value="01"></el-option>
            <el-option label="未婚" value="02"></el-option>
            <el-option label="通用" value="03"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="">重 置</el-button>
          <el-button type="primary" @click="seekbtn">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-bottom:10px;">
      <el-button type="primary" @click="Addpackagetemplatebtn()">新增套餐模板</el-button>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
        <el-table-column prop="GROUPNAME" label="套餐名称"></el-table-column>
        <el-table-column prop="XB" label="性别">
          <template slot-scope="scope">
            {{sexchange(scope.row.XB) }}
          </template>
        </el-table-column>
        <el-table-column prop="HYZK" label="婚否">
          <template slot-scope="scope">
            {{HYZKchange(scope.row.HYZK) }}
          </template>
        </el-table-column>
        <el-table-column prop="PRICE" label="价格"></el-table-column>
        <el-table-column prop="CREATETIME" label="创建时间"></el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editpackagebtn(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="delpackagebtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="seekobj.pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>

    <!-- 新增套餐模板 -->
    <div>
      <el-dialog title="新增套餐模板" :visible.sync="Addpackagetemplateobj.isshow" width="450px">
        <el-form :model="Addpackagetemplateobj" label-position='right' label-width="120px" size="medium">
          <el-form-item label="套餐名称：">
            <el-input v-model="Addpackagetemplateobj.GROUPNAME" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select v-model="Addpackagetemplateobj.XB" placeholder="请选择性别" style="width:200px">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚否：">
            <el-select v-model="Addpackagetemplateobj.HYZK" placeholder="请选择婚否" style="width:200px">
              <el-option label="已婚" value="01"></el-option>
              <el-option label="未婚" value="02"></el-option>
              <el-option label="通用" value="03"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自选项否：">
            <el-select v-model="Addpackagetemplateobj.PREFERENCES" placeholder="请选择自选项否" style="width:200px">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="2"></el-option>
              <el-option label="检验阳性" :value="3"></el-option>
              <el-option label="检验阴性" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Addpackagetemplateobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmaddpackage()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      seekobj: {
        GROUPNAME: "",
        XB: "",
        HYZK: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      },
      Addpackagetemplateobj: {
        isshow: false,
        GROUPNAME: "",
        XB: "",
        HYZK: "",
        PREFERENCES: ""
      }
    };
  },
  watch: {},
  mounted() {
    this.FindSetmeals();
  },
  methods: {
    delpackagebtn(row) {
      this.$confirm("确认删除该套餐吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$network3
            .get("/mnoracle/setmeal/DELSetmeal", {
              SETMEALID: row.SETMEALID
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("删除成功");
                this.FindSetmeals();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
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
    editpackagebtn(row) {
      console.log(row);
      var obj = {
        GROUPNAME: row.GROUPNAME,
        XB: row.XB,
        HYZK: row.HYZK,
        PREFERENCES: row.PREFERENCES,
        PRICE: row.PRICE
      };
      this.$router.push(
        "/DataManagement/PackageSettingmsg"+
          "?isadd=false" +
          "&SETMEALID=" +
          row.SETMEALID
      );
    },
    confirmaddpackage() {
      if (!this.Addpackagetemplateobj.GROUPNAME) {
        this.$message.error("请填写套餐名称！");
        return;
      }
      if (!this.Addpackagetemplateobj.XB) {
        this.$message.error("请选择性别！");
        return;
      }
      if (!this.Addpackagetemplateobj.HYZK) {
        this.$message.error("请选择婚姻状态！");
        return;
      }
      if (!this.Addpackagetemplateobj.PREFERENCES) {
        this.$message.error("请选择自选项否！");
        return;
      }
      this.$router.push(
        "/DataManagement/PackageSettingmsg?msgobj=" +
          JSON.stringify(this.Addpackagetemplateobj) +
          "&isadd=true"
      );
    },
    Addpackagetemplatebtn() {
      this.Addpackagetemplateobj = {
        isshow: true,
        GROUPNAME: "",
        XB: "",
        HYZK: "",
        PREFERENCES: ""
      };
    },
    sexchange(xb) {
      switch (xb) {
        case "2":
          return "女";
          break;
        case "1":
          return "男";
          break;
        case "0":
          return "全部";
          break;
        default:
          break;
      }
    },
    HYZKchange(HYZK) {
      switch (HYZK) {
        case "01":
          return "已婚";
          break;
        case "02":
          return "未婚";
          break;
        case "03":
          return "通用";
          break;
        default:
          break;
      }
    },
    seekbtn() {
      this.seekobj.pageIndex = 1;
      this.FindSetmeals();
    },
    FindSetmeals() {
      this.$network3
        .get("/mnoracle/setmeal/FindSetmeals", {
          GROUPNAME: this.seekobj.GROUPNAME,
          XB: this.seekobj.XB,
          HYZK: this.seekobj.HYZK,
          pageIndex: this.seekobj.pageIndex,
          pageSize: this.seekobj.pageSize
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj.list = res.data.SETMEALlist;
            this.tableobj.total = res.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {}
};
</script>
<style lang="scss" >
</style>